app.controller('BankController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','bankfactory','$sce',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,bankfactory,$sce){

		$scope.bkfactory = bankfactory;
		$scope.banks = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;

	    //Action of clicking product name link.
        $scope.modelDialogTitle = {
            addbankTitle : "Add Bank",
            editbankTitle : "Edit Bank"
        };

        $scope.kaddWindowOptions = {
            content: 'admin/banks/add.html',
            title: $scope.modelDialogTitle.addbankTitle,
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
		        $($scope.addbankformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.addbankformName); 
            }
        };

        $scope.addbankformName = '#frmaddbanks';
        $scope.editbankformName = '#frmeditBank';    

        $scope.keditWindowOptions = {
            content: 'admin/banks/edit.html',
            title: $scope.modelDialogTitle.editbankTitle,
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
		        $($scope.editbankformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.editbankformName);            	
            }
        };

        $scope.addBankWindow = function($event){
        	$scope.addbankMeWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addbankMeWindow.center().open();
        }

        $scope.CloseaddBankWindow = function(){
            $scope.addbankMeWindow.close();
        }

        $scope.editBankWindow = function(){
			$scope.editbankMeWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editbankMeWindow.center().open();
        }

        $scope.CloseEditBankWindow = function(){
            $scope.editbankMeWindow.close();
        }

        $scope.doReset = function(){
        	$scope.bank = $scope.defaultOptions;
        	$scope.editbank =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "bankId": 0,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};

	    $scope.bank = {
		  "id": null,
		  "name": "",
		  "description": "",
		  "status": true,
		  "createdDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "bankId": 0,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "modifiedDate": null
		};

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = bankfactory.doSubmitData($scope.bank);
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
						$scope.CloseaddBankWindow();
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
	    	var responseText = bankfactory.doUpdateData($scope.editbank);
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
					$scope.CloseEditBankWindow();
			        $scope.doReset();	  					
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update bank!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });			  			
		  		}
			}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to update bank!</span>',
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
	    	$scope.editbank = {
	    		bankId : data.bankId,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.editBankWindow();
	    }
	   
	   	$scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editbank = {
		    		bankId : data.bankId,
					createdBy : $rootScope.sessionConfig.userId,
					description: data.description || '',
					modifiedBy : $rootScope.sessionConfig.userId,
					name : data.name,
					status: false
		    	}
		   		DoUpdate();
	    	}
	   	}

		$scope.GenerateTools = function(){
            var htmlString = "<div class='icon-settings' slide-toggle=\"#slider\">";
            htmlString += "<ul id=\"slider\" class=\"slideable\"><li><a href='javascript:void(0)' ng-click=\"EditData(dataItem);\">Edit Bank</a></li>";
            htmlString += "<li><a href='javascript:void(0)'  ng-click=\"OnDelete(dataItem);\">Delete Bank</a></li>";
            htmlString += "</ul></div>";
            return $sce.trustAsHtml(htmlString);			
		}
		
	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "bankId", title:'Bank ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'dd/MM/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'dd/MM/yyyy') #" },
		        		//{ title : "", template: "<button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"EditData(dataItem);\">Edit</button>&nbsp;<button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"OnDelete(dataItem);\">Delete</button>" }
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
				         url: $scope.crudServiceBaseUrl + '/bank/getlist',
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

app.factory('bankfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/bank/create';

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
            url : crudServiceBaseUrl + '/bank/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});