app.controller('DistrictsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','districtsfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,districtsfactory,exDialog){

		$scope.districtsfactory = districtsfactory;
		$scope.districts = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Districts",
	    	edit : "Edit Districts"
	    };

	    /*$scope.countries = [];
	    $scope.selectedCountry = {
				    "value": 0,
				    "text": "Select"
		};*/
		$scope.states = [];
		// default selected states
		$scope.defaultStates = {
				    "value": 0,
				    "text": "Select"
		};
	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/districts/add.html',
	            controller: 'DistrictsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.districts = {
	      "id": null,
	      "name": "",
	      "stateName": "",
	      "description": "",
	      "createByName": null,
	      "status": null,
	      "shortName": "",
	      "districtID": null,
	      "statusName": "",
	      "createdDate": null,
	      "modifiedDate": null,
	      "auditStateId": $scope.defaultStates.value,
	      "districtCode": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "modifyByName": null
	    };

	    $scope.Submit = function(){
	    	$scope.districts.auditStateId = $scope.defaultStates.value;
	    	var responseText = districtsfactory.doSubmitData($scope.districts);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add districts!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add districts!");
			});	    	
	    }

	    $scope.Update = function(){
	    	$scope.editdistricts.auditStateId = $scope.editdefaultOptions.value;
	    	var responseText = districtsfactory.doUpdateData($scope.editdistricts);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update districts!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update districts!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.states, function( n, i ) {
				if(data.auditStateId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultOptions;
			}
	    	$scope.editdistricts = {
	    		districtID : data.districtID,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				auditStateId : $scope.editdefaultOptions.value,
				districtCode : data.districtCode,
				shortName : data.shortName,
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/districts/edit.html',
	            controller: 'DistrictsController',
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
		        		{ field: "districtID", title:'ID', hidden: true, editable : false },
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
				         url: $scope.crudServiceBaseUrl + '/districts/getlist'
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

	    $scope.GetStates = function(){
	    	var obj = $scope.selectedCountry;
	    	GetLookupValues(3);
	    }

	    function GetLookupValues(type){
	    	districtsfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.states.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.states.push(result[i]);
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

		GetLookupValues(3);
}]);

app.factory('districtsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/districts/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

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
            url : crudServiceBaseUrl + '/districts/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});