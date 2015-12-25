app.controller('VillagePanchayatController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','villagefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,villagefactory){


		$scope.villagefactory = villagefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	    //Pop up Page Titles
	    $scope.modelDialogTitle = {
	    	AddVPTitle : "Add Village Panchayat",
	    	EditVPTitle : "Edit Village Panchayat"
	    };

	    $scope.blocks = [];
	    $scope.defaultStateOptions = {
		    "value": 0,
		    "text": "Select"
		};


        $scope.kaddWindowOptions = {
            content: 'admin/village/add.html',
            title: $scope.modelDialogTitle.AddVPTitle,
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
		        $($scope.AddVillageFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddVillageFormName); 
            }
        };

        $scope.AddVillageFormName = '#frmAddVillage';
        $scope.EditVillageFormName = '#frmEditVillage';    

        $scope.keditWindowOptions = {
            content: 'admin/village/edit.html',
            title: $scope.modelDialogTitle.EditVPTitle,
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
		        $($scope.EditVillageFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditVillageFormName);            	
            }
        };

        $scope.OpenAddVpWindow = function($event){
        	$scope.addVpWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addVpWindow.center().open();
        }

        $scope.CloseAddVpWindow  = function(){
            $scope.addVpWindow.close();
        }

        $scope.OpenEditVpWindow = function(){
			$scope.editVpWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editVpWindow.center().open();
        }

        $scope.CloseEditVpWindow = function(){
            $scope.editVpWindow.close();
        }

        $scope.doReset = function(){
        	$scope.panchayat = $scope.defaultOptions;
        	$scope.editvillage =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "id": null,
	      "name": "",
	      "description": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": null,
	      "auditBlockId": null,
	      "status": true,
	      "vpCode": null,
	      "modifiedBy":  $rootScope.sessionConfig.userId,
	      "createdBy":  $rootScope.sessionConfig.userId
	    };


	    $scope.panchayat = {
	      "id": null,
	      "name": "",
	      "description": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": null,
	      "auditBlockId": null,
	      "status": true,
	      "vpCode": null,
	      "modifiedBy":  $rootScope.sessionConfig.userId,
	      "createdBy":  $rootScope.sessionConfig.userId
	    };

	    $scope.OnSelectedValue = function(defaultStateOptions){
	    	$scope.defaultStateOptions = defaultStateOptions;
	    }

	    $scope.OnEditSelectedValue = function(defaultStateOptions){
	    	$scope.defaultStateOptions = defaultStateOptions;
	    }	    

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.panchayat.auditBlockId = $scope.defaultStateOptions.value;
		    	var responseText = villagefactory.doSubmitData($scope.panchayat);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseAddVpWindow();
				        $scope.doReset();		  					
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add village panchayat!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add village panchayat!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	 
	    	}
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editvillage.auditBlockId = $scope.editdefaultStatesOptions.value;
		    	var responseText = villagefactory.doUpdateData($scope.editvillage);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });								
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseEditVpWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to update village panchayat!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to update village panchayat!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
			}
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultStatesOptions =  s[0];
			}else{
				$scope.editdefaultStatesOptions = $scope.defaultStateOptions;
			}
	    	$scope.editvillage = {
	    		auditBlockId : $scope.editdefaultStatesOptions.value,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				vpCode:data.vpCode,
				id : data.id,
				status: true
	    	};
	    	$scope.OpenEditVpWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "vpCode", title:'Code'  },
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
				         url: $scope.crudServiceBaseUrl + '/vp/vplist'
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
	    	villagefactory.getLookupValues(type).success(function(result){
	    		var defOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.blocks.push(defOptions);
					for (var i=0; i<result.length; i++){
					    $scope.blocks.push(result[i]);
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

		GetLookupValues(14);

}]);

app.factory('villagefactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createvillageUrl = '/vp/addvillagepanchayat';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createvillageUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/vp/updatevillagepanchayat',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});