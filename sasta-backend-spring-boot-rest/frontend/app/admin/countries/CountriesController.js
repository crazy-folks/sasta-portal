app.controller('CountriesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','countriesfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,countriesfactory,exDialog){

		$scope.countriesfactory = countriesfactory;
		$scope.banks = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Countries",
	    	edit : "Edit Countries"
	    };

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/countries/add.html',
	            controller: 'CountriesController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
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
	    	var responseText = countriesfactory.doSubmitData($scope.countries);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add Countries!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add Countries!");
			});	    	
	    }

	    $scope.Update = function(){
	    	var responseText = countriesfactory.doUpdateData($scope.editcountries);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update Countries!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update Countries!");
			});	    	
	    }

	    $scope.EditData = function(data){debugger;
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
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/countries/edit.html',
	            controller: 'CountriesController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    }

	    $scope.Cancel = function() {
	      $scope.closeThisDialog("close");
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
				         url: $scope.crudServiceBaseUrl + '/countries/getlist'
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