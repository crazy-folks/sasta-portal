app.controller('DepartmentsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','departmentsfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,departmentsfactory,exDialog){

		$scope.departmentsfactory = departmentsfactory;
		$scope.departments = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Departments",
	    	edit : "Edit departments"
	    };

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/departments/add.html',
	            controller: 'DepartmentsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.departments =     {
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
	    	var responseText = departmentsfactory.doSubmitData($scope.departments);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add departments!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add departments!");
			});	    	
	    }

	    $scope.Update = function(){
	    	var responseText = departmentsfactory.doUpdateData($scope.editdepartments);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update departments!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update departments!");
			});	    	
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
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/departments/edit.html',
	            controller: 'DepartmentsController',
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
				         url: $scope.crudServiceBaseUrl + '/departments/getlist'
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