app.controller('ConfigSystemController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','configsystemfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,configsystemfactory){

		$scope.configsystemfactory = configsystemfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	AddConfigTitle : "Add Config System",
	    	EditConfigTitle : "Edit Config System"
	    };


        $scope.kaddWindowOptions = {
            content: 'admin/configsystem/add.html',
            title: $scope.modelDialogTitle.AddConfigTitle,
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
		        $($scope.addCommunitiesformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.addCommunitiesformName); 
            }
        };

        $scope.addCommunitiesformName = '#frmAddCommunities';
        $scope.editCommunitiesformName = '#frmEditCommunities';    

        $scope.keditWindowOptions = {
            content: 'admin/configsystem/edit.html',
            title: $scope.modelDialogTitle.EditConfigTitle,
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
		        $($scope.editCommunitiesformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.editCommunitiesformName);            	
            }
        };

        $scope.OpenAddConfigSystemWindow = function(){
        	$scope.addConfigSystemWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addConfigSystemWindow.center().open();
        }

        $scope.CloseAddConfigSystemWindow = function(){
            $scope.addConfigSystemWindow.close();
        }

        $scope.OpenEditConfigSystemWindow = function(){
			$scope.editConfigSystemWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editConfigSystemWindow.center().open();
        }

        $scope.CloseEditConfigSystemWindow = function(){
            $scope.editConfigSystemWindow.close();
        }

        $scope.doReset = function(){
        	$scope.configsystem = $scope.defaultOptions;
        	$scope.editconfigsystem =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "name": "",
	      "value": "",
	      "label": "",
	      "createdDate": null,
	      "allowEdit": true,
	      "createBy": $rootScope.sessionConfig.userId,
	      "modifyBy": $rootScope.sessionConfig.userId,
	      "modifiedDate": null
	    };

	    $scope.configsystem = {
	      "name": "",
	      "value": "",
	      "label": "",
	      "createdDate": null,
	      "allowEdit": true,
	      "createBy": $rootScope.sessionConfig.userId,
	      "modifyBy": $rootScope.sessionConfig.userId,
	      "modifiedDate": null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = configsystemfactory.doSubmitData($scope.configsystem);
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
						$scope.CloseAddConfigSystemWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add  Config System!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add  Config System!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	 
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = configsystemfactory.doUpdateData($scope.editconfigsystem);
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
					$scope.CloseEditConfigSystemWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update Config System!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update Config System!</span>',
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
	    	$scope.editconfigsystem = {
	    		id : data.id,
				createBy : $rootScope.sessionConfig.userId,
				label: data.label || '',
				createBy : $rootScope.sessionConfig.userId,
				name : data.name,
				value : data.value || '',
				allowEdit: true
	    	};
	    	$scope.OpenEditConfigSystemWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editconfigsystem = {
		    		id : data.id,
					createBy : $rootScope.sessionConfig.userId,
					label: data.label || '',
					createBy : $rootScope.sessionConfig.userId,
					name : data.name,
					value : data.value || '',
					allowEdit: true
		    	};
		    	DoUpdate();
	    	}
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "label", title:'Label'  },
		        		{ field: "value", title:'Value'  },
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
				         url: $scope.crudServiceBaseUrl + '/configsystem/getlist',
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

app.factory('configsystemfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/configsystem/create';

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
            url : crudServiceBaseUrl + '/configsystem/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});