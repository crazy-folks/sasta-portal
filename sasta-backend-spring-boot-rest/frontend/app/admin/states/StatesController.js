app.controller('StatesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','statesfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,statesfactory){

		$scope.statesfactory = statesfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddStateTitle : "Add States",
	    	EditStateTitle : "Edit States"
	    };

	    $scope.countries = [];
	    $scope.defaultCountries = {
		    "value": 0,
		    "text": "Select"
		};


        $scope.kaddWindowOptions = {
            content: 'admin/states/add.html',
            title: $scope.modelDialogTitle.AddStateTitle,
            iframe: false,
            draggable: true,
            modal: true,
            resizable: true,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function() {
		        $($scope.AddStatesFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddStatesFormName); 
            }
        };

        $scope.AddStatesFormName = '#frmAddStates';
        $scope.EditStatesFormName = '#frmEditStates';    

        $scope.keditWindowOptions = {
            content: 'admin/states/edit.html',
            title: $scope.modelDialogTitle.EditStateTitle,
            iframe: false,
            draggable: true,
            modal: true,
            resizable: false,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function(){
		        $($scope.EditStatesFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditStatesFormName);            	
            }
        };

        $scope.OpenAddStatesWindow = function($event){
        	$scope.addSatesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addSatesWindow.center().open();
        }

        $scope.CloseAddStatesWindow  = function(){
        	$scope.doReset();
            $scope.addSatesWindow.close();
        }

        $scope.OpenEditStatesWindow = function(){
			$scope.editSatesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editSatesWindow.center().open();
        }

        $scope.CloseEditStatesWindow = function(){
        	$scope.doReset();
            $scope.editSatesWindow.close();
        }

        $scope.doReset = function(){
        	$scope.states = $scope.defaultOptions;
        	$scope.editstates =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "id": null,
	      "name": "",
	      "description": "",
	      "countryId": null,
	      "status": true,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "stateCode": null,
	      "stateId": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": "",
	      "shortName": "",
	      "coutryName": ""
	    };

	    $scope.states = {
	      "id": null,
	      "name": "",
	      "description": "",
	      "countryId": null,
	      "status": true,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "stateCode": null,
	      "stateId": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": "",
	      "shortName": "",
	      "coutryName": ""
	    };

	    $scope.OnSelectedValue = function(defaultCountries){
	    	$scope.defaultCountries = defaultCountries;
	    }

	    $scope.OnEditSelectedValue = function(defaultDistricts){
	    	$scope.defaultDistricts = defaultDistricts;
	    }

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.states.countryId = $scope.defaultCountries.value;
		    	var responseText = statesfactory.doSubmitData($scope.states);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });						
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseAddStatesWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add states!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add states!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	 	    		
	    	}
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editstates.countryId = $scope.editdefaultOptions.value;
		    	var responseText = statesfactory.doUpdateData($scope.editstates);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });								
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseEditStatesWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to update states!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to update states!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});					
			}
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.countries, function( n, i ) {
				if(data.countryId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultOptions;
			}
	    	$scope.editstates = {
	    		countryId : $scope.editdefaultOptions.value,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				stateId : data.stateId,
				stateCode : data.stateCode,
				shortName : data.shortName,
				status: true
	    	};
	    	$scope.OpenEditStatesWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "stateId", title:'ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ title : "", template: "<button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"EditData(dataItem);\">Edit</button>&nbsp;<button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"Delet(dataItem);\">Delete</button>" }
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        dataSource: {
	            pageSize: 5,
	            transport: {
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/states/getlist'
				      }).
	                  success(function(data, status, headers, config) {
	                  	if(data.status)
	                      e.success(data.data)
	                  }).
	                  error(function(data, status, headers, config) {
	                  });
	              }
	           }
	        }
	    }

	    $scope.GetStates = function(){
	    	var obj = $scope.selectedCountry;
	    	GetLookupValues(3);
	    }

	    function GetLookupValues(type){
	    	statesfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.countries.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.countries.push(result[i]);
					}						
		  		}else{
		  			notify({
			            messageTemplate: '<span>Unable to read look up values!!!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
		        	});
		  		}
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
		}

		GetLookupValues(7);
}]);

app.factory('statesfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createStatesUrl = '/states/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createStatesUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/states/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});