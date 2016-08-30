app.controller('BloodGroupsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','bloodgroupfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,bloodgroupfactory){

		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
        $scope.addbloodgroupformName = '#frmaddBloodGroup';
        $scope.editbloodgroupformName = '#frmeditBank'; 
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
        $scope.modelDialogTitle = {
            addbloodgroupTitle : "Add Blood Group",
            editbloodgroupTitle : "Edit Blood Group"
        };

        $scope.kaddWindowOptions = {
            content: 'admin/bloodgroups/add.html',
            title: $scope.modelDialogTitle.addbloodgroupTitle,
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
		        $($scope.addbloodgroupformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.addbloodgroupformName); 
            }
        };        

        $scope.keditWindowOptions = {
            content: 'admin/bloodgroups/edit.html',
            title: $scope.modelDialogTitle.editbloodgroupTitle,
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
		        $($scope.editbloodgroupformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.editbloodgroupformName);            	
            }
        };

        $scope.OpenAddBloodGroupWindow = function($event){
        	$scope.addBloodGroupWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addBloodGroupWindow.center().open();
        }

        $scope.CloseAddBloodGroupWindow = function(){
            $scope.addBloodGroupWindow.close();
        }

        $scope.OpenEditBloodGroupWindow = function(){
            $scope.editBloodGroupWindow.center().open();
        }

        $scope.CloseEditBloodGroupWindow  = function(){
			$scope.editBloodGroupWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editBloodGroupWindow.close();
        }

        $scope.doReset = function(){
        	$scope.bloodgroups = $scope.defaultOptions;
        	$scope.editbloodgroups =  $scope.defaultOptions;
        }

        $scope.defaultOptions =  {
	      "id": 0,
	      "name": "",
	      "description": "",
	      "status": true,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "modifiedDate": null,
	      "createdDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "bloodGroupId": null
	    };

	    $scope.bloodgroups = {
	      "id": 0,
	      "name": "",
	      "description": "",
	      "status": true,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "modifiedDate": null,
	      "createdDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "bloodGroupId": null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = bloodgroupfactory.doSubmitData($scope.bloodgroups);
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
						$scope.CloseAddBloodGroupWindow();
				        $scope.doReset();	  					
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add bank!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add bank!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	    		
	    	}
	    }

		function DoUpdate(){
	    	var responseText = bloodgroupfactory.doUpdateData($scope.editbloodgroups);
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
					$scope.CloseEditBloodGroupWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update Blood Group!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update Blood Group!</span>',
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
	    	$scope.editbloodgroups = {
	    		bloodGroupId : data.bloodGroupId,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
			$scope.OpenEditBloodGroupWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editbloodgroups = {
		    		bloodGroupId : data.bloodGroupId,
					createdBy : $rootScope.sessionConfig.userId,
					description: data.description || '',
					modifiedBy : $rootScope.sessionConfig.userId,
					name : data.name,
					status: false
		    	}	    	
		    	DoUpdate();
	    	}
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "bloodGroupId", title:'Blood Group Id', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
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
				         url: $scope.crudServiceBaseUrl + '/bloodgroup/getlist',
				         cache:false
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


app.factory('bloodgroupfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/bloodgroup/create',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/bloodgroup/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});