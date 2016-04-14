 app.controller('SearchController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','searchfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,searchfactory){

		writeDefaultOptions();
		$scope.search = {
		  "emailId": null,
		  "contactNo": null,
		  "allottedBlockId": null,
		  "allottedDistrictId": null,
		  "userGroupId": null,
		  "departmentId": null,
		  "firstName": null,
		  "lastName": null,
		  "jobTitle": null,
		  "employeeId": null,
		  "reportingId": null,
		  "isActive": true
		};

		$scope.blocks = [];
		$scope.districts = [];
		$scope.usergroups = [];

		$scope.departments = [];
		$scope.reportingto = [];
		$scope.activelist = [{
            "value": 1,
            "text": "Active"
		},{
            "value": 2,
            "text": "In Active"
		}];


	function writeDefaultOptions(){

        $scope.defaultAcOptions = {
            "value": 1,
            "text": "Active"
        };	

        $scope.defaultBlocks = {
            "value": 0,
            "text": "Select"
        };

       $scope.defaultDistricts = {
            "value": 0,
            "text": "Select"
        };	
          
       $scope.defaultUserGroups = {
            "value": 0,
            "text": "Select"
        };        

        $scope.defaultDepartments = {
            "value": 0,
            "text": "Select"
        };	

        $scope.defaultReportingto = {
            "value": 0,
            "text": "Select"
        };		
	}

	$scope.deferredList = [];
	$scope.deferred = null;

	$scope.SearchUsers = function(){
        $scope.search.allottedBlockId = $scope.defaultBlocks.value || null;
        $scope.search.allottedDistrictId = $scope.defaultDistricts.value || null;
        $scope.search.userGroupId = $scope.defaultUserGroups.value || null;
        $scope.search.reportingId = $scope.defaultReportingto.value || null;
        $scope.search.departmentId = $scope.defaultDepartments.value || null;
        $scope.search.isActive = $scope.defaultAcOptions.value;
        searchfactory.GetUsers($scope.search).success(function(result){
            $scope.dataSource = new kendo.data.DataSource({
                data: result.data,
                pageSize: 15
            });
        }).error(function(error,status){
            notify({
                messageTemplate: '<span>Unable to read user list!!!</span>',
                position: $rootScope.appConfig.notifyConfig.position,
                scope:$scope
            });
        });    
	}

    $scope.doReset = function(){
        writeDefaultOptions();
        $scope.search.emailId = null;
        $scope.search.contactNo =  null;
        $scope.search.firstName = null;
        $scope.search.lastName = null;
        $scope.search.jobTitle = null;
    }

    function GetLookupValues(type){
    	$scope.deferred = jQuery.Deferred();
        searchfactory.getLookupValues(type).success(function(result){
            var defaultOptions = {
                "value": 0,
                "text": "Select"
            };
            if(result instanceof Array){
                if(type === 1){ // blocks
                    $scope.blocks.push(defaultOptions);
                    for (var i=0; i<result.length; i++){
                        $scope.blocks.push(result[i]);
                    } 
                }else if(type === 8){//departments
                     $scope.departments.push(defaultOptions);
                    for (var i=0; i<result.length; i++){
                        $scope.departments.push(result[i]);
                    }                    
                }else if(type === 15){//reportingto
                     $scope.reportingto.push(defaultOptions);
                    for (var i=0; i<result.length; i++){
                        $scope.reportingto.push(result[i]);
                    }                    
                }else if(type === 2){//districts
                     $scope.districts.push(defaultOptions);
                    for (var i=0; i<result.length; i++){
                        $scope.districts.push(result[i]);
                    }                    
                }else if(type === 16){//districts
                     $scope.usergroups.push(defaultOptions);
                    for (var i=0; i<result.length; i++){
                        $scope.usergroups.push(result[i]);
                    }                    
                }
                return $scope.deferred.resolve('Ok');
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
        });
        return $scope.deferred.promise();
    }

    GetLookupValues(2); // Districts
    GetLookupValues(15); // Reporting To Users
    GetLookupValues(8); // Departments
    GetLookupValues(1); // Blocks
    GetLookupValues(16); // Blocks
    //$scope.SearchUsers();
}]);

app.factory('searchfactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
    }

    service.GetUsers = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/search',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }   

    return service;

});