app.controller('EntityGroupsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','entitygroupsfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,entitygroupsfactory){

		$scope.entitygroupsfactory = entitygroupsfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking Add name link.
	    $scope.modelDialogTitle = {
	    	AddEntityGroupTitle : "Add User Groups",
	    	EditEntityGroupTitle : "Edit User Groups"
	    };

        $scope.kaddWindowOptions = {
            content: 'admin/entitygroups/add.html',
            title: $scope.modelDialogTitle.AddEntityGroupTitle,
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
		        $($scope.AddEntityGroupsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddEntityGroupsFormName); 
            }
        };

        $scope.AddEntityGroupsFormName = '#frmAddEntityGroups';
        $scope.EditEntityGroupsFormName = '#frmEditEntityGroups';    

        $scope.keditWindowOptions = {
            content: 'admin/entitygroups/edit.html',
            title: $scope.modelDialogTitle.EditEntityGroupTitle,
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
		        $($scope.EditEntityGroupsFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditEntityGroupsFormName);            	
            }
        };

        $scope.OpenAddEntityGroupsWindow = function($event){
        	$scope.addEntityGroupsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addEntityGroupsWindow.center().open();
        }

        $scope.CloseAddEntityGroupsWindow = function(){
        	$scope.doReset();
            $scope.addEntityGroupsWindow.close();
        }

        $scope.OpenEditEntityGroupsWindow = function(){
			$scope.editEntityGroupsWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editEntityGroupsWindow.center().open();
        }

        $scope.CloseEditEntityGroupsWindow = function(){
        	$scope.doReset();
            $scope.editEntityGroupsWindow.close();
        }

        $scope.doReset = function(){
        	$scope.entitygroups = $scope.defaultOptions;
        	$scope.editentitygroups =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};


	    $scope.entitygroups = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = entitygroupsfactory.doSubmitData($scope.entitygroups);
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
						$scope.CloseAddEntityGroupsWindow();
				        $scope.doReset();	
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add user group!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add user group!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = entitygroupsfactory.doUpdateData($scope.editentitygroups);
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
					$scope.CloseEditEntityGroupsWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update user group!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update user group!</span>',
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
	    	$scope.editentitygroups = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.OpenEditEntityGroupsWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
	    		$scope.editentitygroups = {
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
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'dd/MM/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'dd/MM/yyyy') #" },
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
				         url: $scope.crudServiceBaseUrl + '/entitygroups/getlist',
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

app.factory('entitygroupsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/entitygroups/create';

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
            url : crudServiceBaseUrl + '/entitygroups/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});