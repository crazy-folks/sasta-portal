app.controller('FinancialYearController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','financialyearfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,financialyearfactory){

		$scope.financialyear = financialyearfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	AddFinancialYearTitle : "Add Financial Year",
	    	EditFinancialYearTitle : "Edit Financial Year"
	    };


        $scope.kaddWindowOptions = {
            content: 'admin/financialyear/add.html',
            title: $scope.modelDialogTitle.AddFinancialYearTitle,
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
		        $($scope.AddFinancialYearFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddFinancialYearFormName); 
            }
        };

        $scope.AddFinancialYearFormName = '#frmAddFinancialYear';
        $scope.EditFinancialYearFormName = '#frmEditFinancialYear';    

        $scope.keditWindowOptions = {
            content: 'admin/financialyear/edit.html',
            title: $scope.modelDialogTitle.EditFinancialYearTitle,
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
		        $($scope.EditFinancialYearFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditFinancialYearFormName);            	
            }
        };

        $scope.OpenFinancialYearWindow = function($event){
        	$scope.addFinancialYearWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addFinancialYearWindow.center().open();
        }

        $scope.CloseFinancialYearWindow = function(){
        	$scope.doReset();
            $scope.addFinancialYearWindow.close();
        }

        $scope.OpenEditFinancialYearWindow = function(){
			$scope.editFinancialYearWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editFinancialYearWindow.center().open();
        }

        $scope.CloseEditFinancialYearWindow  = function(){
        	$scope.doReset();
            $scope.editFinancialYearWindow.close();
        }

        $scope.doReset = function(){
        	$scope.financialyear = $scope.defaultOptions;
        	$scope.editfinancialyear =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialyearId": 0,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};


	    $scope.financialyear = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialyearId": 0,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = financialyearfactory.doSubmitData($scope.financialyear);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseFinancialYearWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add financial year!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add financial year!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	  
	    	}
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	var responseText = financialyearfactory.doUpdateData($scope.editfinancialyear);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });						
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseEditFinancialYearWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to update financial year!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to update financial year!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	
			}
	    }

	    $scope.EditData = function(data){
	    	$scope.editfinancialyear = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.OpenEditFinancialYearWindow();
	    }

	    $scope.Cancel = function() {
	      $scope.closeThisDialog("close");
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'ID', hidden: true, editable : false },
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
				         url: $scope.crudServiceBaseUrl + '/financialyear/getlist'
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
}]);

app.factory('financialyearfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createfinancialyearUrl = '/financialyear/create';

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createfinancialyearUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/financialyear/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});