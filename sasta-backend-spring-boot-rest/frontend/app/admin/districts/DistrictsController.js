app.controller('DistrictsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','districtsfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,districtsfactory){

		$scope.districtsfactory = districtsfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	AddDistrictsTitle : "Add Districts",
	    	EditDistrictsTitle : "Edit Districts"
	    };

		$scope.states = [];
		// default selected states
		$scope.defaultStates = {
		    "value": 0,
		    "text": "Select"
		};

        $scope.kaddWindowOptions = {
            content: 'admin/districts/add.html',
            title: $scope.modelDialogTitle.AddDistrictsTitle,
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
		        $($scope.AddDistrictsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddDistrictsFormName); 
            }
        };

        $scope.AddDistrictsFormName = '#frmAddDistricts';
        $scope.EditDistrictsFormName = '#frmEditDistricts';    

        $scope.keditWindowOptions = {
            content: 'admin/districts/edit.html',
            title: $scope.modelDialogTitle.EditDistrictsTitle,
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
		        $($scope.EditDistrictsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditDistrictsFormName);            	
            }
        };

        $scope.OpenAddDistrictsWindow = function(){
        	$scope.addDistrictsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addDistrictsWindow.center().open();
        }

        $scope.CloseAddDistrictsWindow = function(){
        	$scope.doReset();
            $scope.addDistrictsWindow.close();
        }

        $scope.OpenEditDistrictsWindow= function(){
			$scope.editDistrictsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editDistrictsWindow.center().open();
        }

        $scope.CloseEditDistrictsWindow = function(){
        	$scope.doReset();
            $scope.editDistrictsWindow.close();
        }

        $scope.doReset = function(){
        	$scope.districts = $scope.defaultOptions;
        	$scope.editdistricts =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "id": null,
	      "name": "",
	      "stateName": "",
	      "description": "",
	      "createByName": null,
	      "status": null,
	      "shortName": "",
	      "districtID": null,
	      "statusName": "",
	      "createdDate": null,
	      "modifiedDate": null,
	      "auditStateId": $scope.defaultStates.value,
	      "districtCode": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "modifyByName": null
	    };

	    $scope.districts = {
	      "id": null,
	      "name": "",
	      "stateName": "",
	      "description": "",
	      "createByName": null,
	      "status": null,
	      "shortName": "",
	      "districtID": null,
	      "statusName": "",
	      "createdDate": null,
	      "modifiedDate": null,
	      "auditStateId": $scope.defaultStates.value,
	      "districtCode": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "modifyByName": null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.districts.auditStateId = $scope.defaultStates.value;
		    	var responseText = districtsfactory.doSubmitData($scope.districts);
				responseText.success(function(result){
					if(result.status){
			  			notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
	  					$scope.grid.dataSource.fetch();
						$scope.CloseAddDistrictsWindow();
				        $scope.doReset();
			  		}else{
			  			notify({
				            messageTemplate: '<span>Unable to add districts!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
		  			notify({
			            messageTemplate: '<span>Unable to add districts!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = districtsfactory.doUpdateData($scope.editdistricts);
			responseText.success(function(result){
					if(result.status){
			  			notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });								
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
	  					$scope.grid.dataSource.fetch();
						$scope.CloseEditDistrictsWindow();
				        $scope.doReset();
			  		}else{
			  			notify({
				            messageTemplate: '<span>Unable to update districts!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}	    	
		    });
		}

	    $scope.Update = function(){
	    	if($scope.editjQueryValidator.doValidate()){
		    	$scope.editdistricts.auditStateId = $scope.editdefaultOptions.value;
		    	DoUpdate();
	    	}
	    }

	    $scope.OnSelectedValue = function(defaultStates){
	    	$scope.defaultStates = defaultStates;
	    }

	    $scope.OnEditSelectedValue = function(defaultStates){
	    	$scope.editdefaultOptions = defaultStates;
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.states, function( n, i ) {
				if(data.auditStateId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultOptions;
			}
	    	$scope.editdistricts = {
	    		districtID : data.districtID,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				auditStateId : $scope.editdefaultOptions.value,
				districtCode : data.districtCode,
				shortName : data.shortName,
				status: true
	    	};
	    	$scope.OpenEditDistrictsWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
	    		$scope.editdistricts = {
		    		districtID : data.districtID,
					createdBy : $rootScope.sessionConfig.userId,
					description: data.description || '',
					modifiedBy : $rootScope.sessionConfig.userId,
					name : data.name,
					auditStateId : data.auditStateId,
					districtCode : data.districtCode,
					shortName : data.shortName,
					status: false
		    	};
		    	DoUpdate();	  
	    	}
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "districtID", title:'ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{
 							title : "",
		                    width: '30px',
		                    template: kendo.template($("#toggle-template").html())
		                }
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
				         url: $scope.crudServiceBaseUrl + '/districts/getlist',
				         cache : false
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
	    	districtsfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.states.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.states.push(result[i]);
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

		GetLookupValues(3);
}]);

app.factory('districtsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/districts/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createbankUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/districts/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});