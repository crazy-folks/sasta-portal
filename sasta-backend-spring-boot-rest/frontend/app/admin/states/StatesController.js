app.controller('StatesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','statesfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,statesfactory,exDialog){

		$scope.statesfactory = statesfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add States",
	    	edit : "Edit States"
	    };

	    $scope.countries = [];
	    $scope.defaultCountries = {
				    "value": 0,
				    "text": "Select"
		};

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/states/add.html',
	            controller: 'StatesController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.states = {
	      "id": null,
	      "name": "",
	      "description": "",
	      "countryId": null,
	      "status": true,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
	      "stateCode": null,
	      "stateId": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": "",
	      "shortName": "",
	      "coutryName": ""
	    };

	    $scope.Submit = function(){
	    	$scope.states.countryId = $scope.defaultCountries.value;
	    	var responseText = statesfactory.doSubmitData($scope.states);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add states!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add states!");
			});	    	
	    }

	    $scope.Update = function(){
	    	$scope.editstates.countryId = $scope.editdefaultOptions.value;
	    	var responseText = statesfactory.doUpdateData($scope.editstates);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update states!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update states!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.countries, function( n, i ) {
				if(data.countryId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultOptions;
			}
	    	$scope.editstates = {
	    		countryId : $scope.editdefaultOptions.value,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				stateId : data.stateId,
				stateCode : data.stateCode,
				shortName : data.shortName,
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/states/edit.html',
	            controller: 'StatesController',
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
		        		{ field: "stateId", title:'ID', hidden: true, editable : false },
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
				         url: $scope.crudServiceBaseUrl + '/states/getlist'
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
	    	statesfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.countries.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.countries.push(result[i]);
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

		GetLookupValues(7);
}]);

app.factory('statesfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createStatesUrl = '/states/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createStatesUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/states/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});