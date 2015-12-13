app.controller('FinancialYearController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','financialyearfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,financialyearfactory,exDialog){

		$scope.financialyear = financialyearfactory;
		$scope.financialyears = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Financial Year",
	    	edit : "Edit Financial Year"
	    };

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/financialyear/add.html',
	            controller: 'FinancialYearController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
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
	    	var responseText = financialyearfactory.doSubmitData($scope.financialyear);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add financial year!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add financial year!");
			});	    	
	    }

	    $scope.Update = function(){
	    	var responseText = financialyearfactory.doUpdateData($scope.editfinancialyear);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update financial year!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update financial year!");
			});	    	
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
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/financialyear/edit.html',
	            controller: 'FinancialYearController',
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