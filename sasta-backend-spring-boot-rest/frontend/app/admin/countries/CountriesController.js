app.controller('CountriesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','countriesfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,countriesfactory){

		$scope.countriesfactory = countriesfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	AddCountriesTitle : "Add Countries",
	    	EditCountriesTitle : "Edit Countries"
	    };


        $scope.kaddWindowOptions = {
            content: 'admin/countries/add.html',
            title: $scope.modelDialogTitle.AddCountriesTitle,
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
		        $($scope.AddCountriesFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddCountriesFormName); 
            }
        };

        $scope.AddCountriesFormName = '#frmAddCountries';
        $scope.EditCountriesFormName = '#frmEditCountries';    

        $scope.keditWindowOptions = {
            content: 'admin/countries/edit.html',
            title: $scope.modelDialogTitle.EditCountriesTitle,
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
		        $($scope.EditCountriesFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditCountriesFormName);            	
            }
        };

        $scope.OpenAddCountriesWindow = function(){
        	$scope.addCountriesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addCountriesWindow.center().open();
        }

        $scope.CloseAddCountriesWindow = function(){
        	$scope.doReset();
            $scope.addCountriesWindow.close();
        }

        $scope.OpenEditCountriesWindow= function(){
			$scope.editCountriesWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editCountriesWindow.center().open();
        }

        $scope.CloseEditCountriesWindow = function(){
        	$scope.doReset();
            $scope.editCountriesWindow.close();
        }

        $scope.doReset = function(){
        	$scope.countries = $scope.defaultOptions;
        	$scope.editcountries =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "id": null,
	      "name": "",
	      "description": "",
	      "status": true,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "countryCode": null,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "countryId": "",
	      "shortName": ""
	    };

	    $scope.countries = {
	      "id": null,
	      "name": "",
	      "description": "",
	      "status": true,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "countryCode": null,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "countryId": "",
	      "shortName": ""
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	var responseText = countriesfactory.doSubmitData($scope.countries);
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
						$scope.CloseAddCountriesWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add Countries!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add Countries!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});	
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = countriesfactory.doUpdateData($scope.editcountries);
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
					$scope.CloseEditCountriesWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update Countries!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update Countries!</span>',
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
	    	$scope.editcountries = {
			    name: data.name,
			    description: data.description,
			    status: true,
			    countryCode: data.countryCode,
			    modifiedBy: $rootScope.sessionConfig.userId,
			    createdBy: $rootScope.sessionConfig.userId,
			    countryId: data.countryId,
			    shortName: data.shortName
	    	};
	    	$scope.OpenEditCountriesWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editcountries = {
				    name: data.name,
				    description: data.description,
				    status: false,
				    countryCode: data.countryCode,
				    modifiedBy: $rootScope.sessionConfig.userId,
				    createdBy: $rootScope.sessionConfig.userId,
				    countryId: data.countryId,
				    shortName: data.shortName
		    	};
		    	DoUpdate();
	    	}
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "countryId", title:'ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "shortName", title:'Short Name'  },
		        		{ field: "countryCode", title:'Country Code'  },
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
				         url: $scope.crudServiceBaseUrl + '/countries/getlist',
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

app.factory('countriesfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/countries/create';

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
            url : crudServiceBaseUrl + '/countries/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});