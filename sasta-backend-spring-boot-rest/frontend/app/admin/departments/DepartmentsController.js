app.controller('DepartmentsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','departmentsfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,departmentsfactory){

		$scope.departmentsfactory = departmentsfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	AddDeptTitle : "Add Departments",
	    	EditDeptTitle : "Edit departments"
	    };


        $scope.kaddWindowOptions = {
            content: 'admin/departments/add.html',
            title: $scope.modelDialogTitle.AddDeptTitle,
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
		        $($scope.AddDepartmentsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddDepartmentsFormName); 
            }
        };

        $scope.AddDepartmentsFormName = '#frmAddDepartments';
        $scope.EditDepartmentsFormName = '#frmEditDepartments';    

        $scope.keditWindowOptions = {
            content: 'admin/departments/edit.html',
            title: $scope.modelDialogTitle.EditDeptTitle,
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
		        $($scope.EditDepartmentsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditDepartmentsFormName);            	
            }
        };

        $scope.OpenAddDepartmentsWindow = function(){
        	$scope.addDepartmentsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addDepartmentsWindow.center().open();
        }

        $scope.CloseAddDepartmentsWindow = function(){
        	$scope.doReset();
            $scope.addDepartmentsWindow.close();
        }

        $scope.OpenEditDepartmentsWindow= function(){
			$scope.editDepartmentsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editDepartmentsWindow.center().open();
        }

        $scope.CloseEditDepartmentsWindow = function(){
        	$scope.doReset();
            $scope.editDepartmentsWindow.close();
        }

        $scope.doReset = function(){
        	$scope.departments = $scope.defaultOptions;
        	$scope.editdepartments =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "id": 1,
	      "name": "",
	      "description": "",
	      "status": true,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "createdDate": null,
	      "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null
	    };

	    $scope.departments = {
	      "id": 1,
	      "name": "",
	      "description": "",
	      "status": true,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "createdDate": null,
	      "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = departmentsfactory.doSubmitData($scope.departments);
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
						$scope.CloseAddDepartmentsWindow();
				        $scope.doReset();
			  		}else{
			  			notify({
				            messageTemplate: '<span>Unable to add departments!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });	
			  		}
				}).error(function(error,status){
		  			notify({
			            messageTemplate: '<span>Unable to add departments!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
				});
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = departmentsfactory.doUpdateData($scope.editdepartments);
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
					$scope.CloseEditDepartmentsWindow();
			        $scope.doReset();
		  		}else{
		  			notify({
			            messageTemplate: '<span>Unable to update departments!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to update departments!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	    	
	    }

	    $scope.Update = function(){
	    	if($scope.editjQueryValidator.doValidate()){
	    		DoUpdate();
	    	}
	    }

	    $scope.EditData = function(data){
	    	$scope.editdepartments = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.OpenEditDepartmentsWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editdepartments = {
		    		id : data.id,
					createdBy : $rootScope.sessionConfig.userId,
					description: data.description || '',
					modifiedBy : $rootScope.sessionConfig.userId,
					name : data.name,
					status: false
		    	};
		    	DoUpdate();
	    	}
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
				         url: $scope.crudServiceBaseUrl + '/departments/getlist',
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
}]);

app.factory('departmentsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/departments/create';

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
            url : crudServiceBaseUrl + '/departments/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});