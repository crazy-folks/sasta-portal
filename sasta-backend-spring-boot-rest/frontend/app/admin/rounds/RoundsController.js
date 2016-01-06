app.controller('RoundsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','roundsfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,roundsfactory){

		$scope.roundsfactory = roundsfactory;
		$scope.rounds = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddRoundsTitle : "Add Rounds",
	    	EditRoundsTitle : "Edit Rounds"
	    };

	    $scope.dateOptions = {
		    format: 'yyyy-MM-dd'
		};

		$scope.years = [];
		// default selected years
		$scope.defaultyears = {
		    "value": 0,
		    "text": "Select"
		};

        $scope.kaddWindowOptions = {
            content: 'admin/rounds/add.html',
            title: $scope.modelDialogTitle.AddRoundsTitle,
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
		        $($scope.addRoundsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.addRoundsFormName); 
            },
            close : function(){
            	
            }
        };

        $scope.addRoundsFormName = '#frmAddRound';
        $scope.editRoundsFormName = '#frmEditRound';    
        $scope.keditWindowOptionsOpened = false;
        $scope.keditWindowOptions = {
            content: 'admin/rounds/edit.html',
            title: $scope.modelDialogTitle.EditRoundsTitle,
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
		        $($scope.editRoundsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.editRoundsFormName);            	
            },
            close : function(){
            }
        };

        $scope.OpenAddRoundWindow = function($event){
        	$scope.addRoundsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addRoundsWindow.center().open();
        }

        $scope.CloseAddRoundWindow = function(){
        	$scope.doReset();
            $scope.addRoundsWindow.close();
        }

        $scope.OpenEditRoundWindow = function(){
			$scope.editRoundsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editRoundsWindow.center().open();
        }

        $scope.CloseEditRoundWindow = function(){
        	$scope.doReset();
            $scope.editRoundsWindow.close();
        }

        $scope.doReset = function(){
        	$scope.round = $scope.defaultOptions;
        	$scope.editround =  $scope.defaultOptions;
        }

        $scope.defaultOptions =	{
	      "id": null,
	      "name": '',
	      "description": '',
	      "status": true,
	      "referenceId": null,
	      "financialYear": '',
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": null,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "startDate": null,
	      "endDate": null
	    };

	    $scope.round = 	{
	      "id": null,
	      "name": '',
	      "description": '',
	      "status": true,
	      "referenceId": null,
	      "financialYear": '',
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": null,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "startDate": null,
	      "endDate": null
	    };

        $scope.startChange = function() {
            var startDate = $scope.startDateObject.value(),
            endDate = $scope.endDateObject.value();

            if (startDate) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
                $scope.endDateObject.min(startDate);
            } else if (endDate) {
                $scope.startDateObject.max(new Date(endDate));
            } else {
                endDate = new Date();
                $scope.startDateObject.max(endDate);
                $scope.endDateObject.min(endDate);
            }
        }

        $scope.endChange = function() {
            var endDate = $scope.endDateObject.value(),
            startDate = $scope.startDateObject.value();

            if (endDate) {
                endDate = new Date(endDate);
                endDate.setDate(endDate.getDate());
                $scope.startDateObject.max(endDate);
            } else if (startDate) {
                $scope.endDateObject.min(new Date(startDate));
            } else {
                endDate = new Date();
                $scope.startDateObject.max(endDate);
                $scope.endDateObject.min(endDate);
            }
        } 

	    $scope.OnSelectedValue = function(defaultyears){
	    	$scope.defaultyears = defaultyears;
	    }
	    $scope.OnEditSelectedValue = function(editdefaultOptions){
	    	$scope.editdefaultOptions = editdefaultOptions;
	    }	    

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.round.referenceId = $scope.defaultyears.value;
		    	$scope.round.financialYear = $scope.defaultyears.text;
		    	var responseText = roundsfactory.doSubmitData($scope.round);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseAddRoundWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add round!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add round!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	 
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = roundsfactory.doUpdateData($scope.editround);
			responseText.success(function(result){
				if(result.status){
			  		notify({
			            messageTemplate: '<span>'+result.data+'</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });							
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.CloseEditRoundWindow();
			        $scope.doReset();	
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update round!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update round!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
			});		    	
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){	
		    	$scope.editround.referenceId = $scope.editdefaultOptions.value;
		    	DoUpdate();
			}
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.years, function( n, i ) {
				if(data.referenceId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultyears;
			}	    	
	    	$scope.editround = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				referenceId : data.referenceId,
			    startDate: data.startDate,
			    endDate: data.endDate,				
				status: true
	    	};
	    	$scope.OpenEditRoundWindow();
	    }

	    $scope.OnDelete = function(data){
	    	$scope.editround = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				referenceId : data.referenceId,
			    startDate: data.startDate,
			    endDate: data.endDate,				
				status: false
	    	};
	    	DoUpdate();   	
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Rounds ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "financialYear", title:'Financial Year'  },
		        		{ field: "startDate", title : "Start Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(startDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "endDate", title : "End Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(endDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
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
				         url: $scope.crudServiceBaseUrl + '/rounds/getlist'
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

	    function GetLookupValues(type){
	    	roundsfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.years.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.years.push(result[i]);
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

		GetLookupValues(9); // Look up for financial years

}]);

app.factory('roundsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createroundsUrl = '/rounds/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}


	service.doTestSubmission = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createroundsUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createroundsUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/rounds/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});