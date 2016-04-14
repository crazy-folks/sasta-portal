app.controller('CommunitiesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','communitiesfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,communitiesfactory){

		$scope.communitiesfactory = communitiesfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking product name link.
        $scope.modelDialogTitle = {
            addCommunitiesTitle : "Add Communities",
            editCommunitiesTitle : "Edit Communities"
        };

        $scope.kaddWindowOptions = {
            content: 'admin/communities/add.html',
            title: $scope.modelDialogTitle.addCommunitiesTitle,
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
            content: 'admin/communities/edit.html',
            title: $scope.modelDialogTitle.editCommunitiesTitle,
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

        $scope.OpenAddCommunitiesWindow = function($event){
        	$scope.addCommunitesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addCommunitesWindow.center().open();
        }

        $scope.CloseAddCommunitiesWindow = function(){
            $scope.addCommunitesWindow.close();
        }

        $scope.OpenEditCommunitiesWindow = function(){
			$scope.editCommunitesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editCommunitesWindow.center().open();
        }

        $scope.CloseEditCommunitiesWindow = function(){
            $scope.editCommunitesWindow.close();
        }

        $scope.doReset = function(){
        	$scope.communities = $scope.defaultOptions;
        	$scope.editcommunities =  $scope.defaultOptions;
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


	    $scope.communities = {
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
		    	var responseText = communitiesfactory.doSubmitData($scope.communities);
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
						$scope.CloseAddCommunitiesWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add comminities!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add comminities!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	    		
	    	}	    	
	    	
	    }

	    function DoUpdate(){
	    	var responseText = communitiesfactory.doUpdateData($scope.editcommunities);
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
					$scope.CloseEditCommunitiesWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update communities!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update communities!</span>',
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
	    	$scope.editcommunities = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.OpenEditCommunitiesWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editcommunities = {
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
		        		{ field: "id", title:'Communities ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
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
				         url: $scope.crudServiceBaseUrl + '/communities/getlist',
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

app.factory('communitiesfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/communities/create';

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
            url : crudServiceBaseUrl + '/communities/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});