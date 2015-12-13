app.controller('ConfigSystemController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','configsystemfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,configsystemfactory,exDialog){

		$scope.configsystemfactory = configsystemfactory;
		$scope.banks = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Config System",
	    	edit : "Edit Config System"
	    };

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/configsystem/add.html',
	            controller: 'ConfigSystemController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
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
	    	var responseText = configsystemfactory.doSubmitData($scope.configsystem);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add  Config System!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add  Config System!");
			});	    	
	    }

	    $scope.Update = function(){
	    	var responseText = configsystemfactory.doUpdateData($scope.editconfigsystem);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update Config System!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update  Config System!");
			});	    	
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
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/configsystem/edit.html',
	            controller: 'ConfigSystemController',
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
		        		{ field: "label", title:'Label'  },
		        		{ field: "value", title:'Value'  },
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
				         url: $scope.crudServiceBaseUrl + '/configsystem/getlist'
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