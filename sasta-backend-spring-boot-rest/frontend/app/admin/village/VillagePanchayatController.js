app.controller('VillagePanchayatController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','villagefactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,villagefactory,exDialog){


		$scope.villagefactory = villagefactory;
		$scope.panchayats = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Village Panchayat",
	    	edit : "Edit Village Panchayat"
	    };

	    $scope.blocks = [];
	    $scope.defaultOptions = {
				    "value": 0,
				    "text": "Select"
		};

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/village/add.html',
	            controller: 'VillagePanchayatController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.panchayat =     {
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

	    $scope.Submit = function(){
	    	$scope.panchayat.auditBlockId = $scope.defaultOptions.value;
	    	var responseText = villagefactory.doSubmitData($scope.panchayat);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add village panchayat!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add village panchayat!");
			});	    	
	    }

	    $scope.Update = function(){
	    	$scope.editvillage.auditBlockId = $scope.editdefaultOptions.value;
	    	var responseText = villagefactory.doUpdateData($scope.editvillage);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update village panchayat!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update village panchayat!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultOptions;
			}
	    	$scope.editvillage = {
	    		auditBlockId : $scope.editdefaultOptions.value,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				vpCode:data.vpCode,
				id : data.id,
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/village/edit.html',
	            controller: 'VillagePanchayatController',
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
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.blocks.push(defaultOptions);
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