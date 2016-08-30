  app.controller('UsersController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','userfactory',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage,userfactory){


        // Users list
        $scope.user = [];
        $scope.formName = '#userForm';

        $($scope.formName).validationEngine('attach', {
            promptPosition: "topLeft",
            scroll: true
        });

        $scope.jQueryValidator = new Validator($scope.formName);

        // lookup data
        $scope.countries = [];
        $scope.states = [];
        $scope.departments = [];
        $scope.reportingto = [];
        $scope.allotteddistricts = [];
        $scope.allottedblocks = [];
        $scope.entityGroups = [];

        $scope.recruitementType = [{
            "value": 0,
            "text": "Select"
        },{
            "value": 1,
            "text": "Direct"
        },{
            "value": 2,
            "text": "Retired"
        }];

        $scope.Genders = [{
            "value": 0,
            "text": "Select"
        },{
            "value": 1,
            "text": "Male"
        },{
            "value": 2,
            "text": "Female"
        }];        
        // default options

        $scope.defaultStates = {
            "value": 0,
            "text": "Select"
        };
        $scope.defaultCountries = {
            "value": 0,
            "text": "Select"
        };        
        $scope.defaultRecruitementType ={
            "value": 0,
            "text": "Select"
        };
        $scope.defaultBlocks = {
            "value": 0,
            "text": "Select"
        };   
       $scope.defaultDistricts = {
            "value": 0,
            "text": "Select"
        };
       $scope.defaultReportingTo = {
            "value": 0,
            "text": "Select"
        };
       $scope.defaultDepartments = {
            "value": 0,
            "text": "Select"
        };
       $scope.defaultEntityGroups = {
            "value": 0,
            "text": "Select"
        }; 
       $scope.defaultGenders = {
            "value": 0,
            "text": "Select"
        };      
        // user info
        $scope.user = {
            "id": 0,
            "email": "",
            "password": "",
            "description": "",
            "experience": "",
            "stateName": "",
            "jobTitle": "",
            "genderId": 0,
            "fatherName": "",
            "gmailId": "",
            "isLocked": true,
            "createDate": null,
            "skypeName": "",
            "lastName": "",
            "teamName": "",
            "deptName": "",
            "subCaste": "",
            "employeeId": "",
            "firstName": "",
            "bloodGroupId": 0,
            "recruitmentName": "",
            "communicationAddress": "",
            "birthProofId": 0,
            "allottedDistrict": 0,
            "lastLoginDate": null,
            "landLineNumber": "",
            "birthProofName": "",
            "physicallyChallanged": true,
            "personalEmail": "",
            "bloodGroupName": "",
            "visibleFields": "",
            "allottedBlock": 0,
            "personalUrl": "",
            "sameAddress": true,
            "hasReadTermsAndCondtion": true,
            "validationCode": "",
            "previousExperience": "",
            "allottedDistrictName": "",
            "permanentAddress": "",
            "departmentId": 0,
            "recruitmentId": 0,
            "mobileNumber": "",
            "countryName": "",
            "dateOfBirth": "2016-07-17T14:36:55.412Z",
            "allottedBlockName": "",
            "reportingTo": "",
            "dateOfJoining": "2016-07-17T14:36:55.412Z",
            "businessEmail": "",
            "failedLoginAttempts": 0,
            "modifiedDate": null,
            "createdByName": "",
            "modifiedByName": "",
            "imageId": 0,
            "stateId": 0,
            "isActive": true,
            "createdBy": 0,
            "modifiedBy": 0,
            "countryId": 0,
            "imageName": "",
            "screenName": "",
            "userGroupId": 0,
            "reportingId": 0
        };

        $scope.CreateUser = function(){

            if(!$rootScope.sessionConfig.canAdd){
                notify({
                    messageTemplate: '<span>'+$rootScope.appConfig.messages.addException+'</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope,
                    type :'error'
                });
                return;
            }else{
                if($scope.jQueryValidator.doValidate()){
                    $scope.user.reportingId = $scope.defaultReportingTo.value;
                    $scope.user.recruitmentId = $scope.defaultRecruitementType.value;
                    $scope.user.allottedDistrict = $scope.defaultDistricts.value;
                    $scope.user.allottedBlock = $scope.defaultBlocks.value;
                    $scope.user.genderId = $scope.defaultGenders.value;
                    $scope.user.departmentId = $scope.defaultDepartments.value;
                    $scope.user.stateId = $scope.defaultStates.value;
                    $scope.user.countryId = $scope.defaultCountries.value;
                    $scope.user.userGroupId = $scope.defaultEntityGroups.value;
                    var response = userfactory.AddBasicUserDetails($scope.user);
                    response.success(function(result){
                        if(result.status){
                            notify({
                                messageTemplate: '<span>Successfully created a user!</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope,
                                type : 'success'
                            });
                            $scope.Reset();
                        }else{
                            notify({
                                messageTemplate: '<span>'+result.data+'</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope,
                                type : 'error'
                            });
                        }
                    }).error(function(error,status){
                        notify({
                            messageTemplate: '<span>unable to add user!</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope,
                            type : 'error'
                        });
                    });
                }
            }
        };

        $scope.Reset = function(){

            $scope.jQueryValidator.doReset();
            $($scope.formName)[0].reset();
            var defaultOptions = {
                "value": 0,
                "text": "Select"
            };
            $scope.defaultStates = angular.copy(defaultOptions);
            $scope.defaultCountries = angular.copy(defaultOptions);
            $scope.defaultRecruitementType = angular.copy(defaultOptions);
            $scope.defaultBlocks = angular.copy(defaultOptions);
            $scope.defaultDistricts = angular.copy(defaultOptions);
            $scope.defaultReportingTo = angular.copy(defaultOptions);
            $scope.defaultDepartments = angular.copy(defaultOptions);
            $scope.defaultEntityGroups = angular.copy(defaultOptions);
            $scope.defaultGenders = angular.copy(defaultOptions);
        }

        function GetLookupValues(type){
            userfactory.getLookupValues(type).success(function(result){
                var defaultOptions = {
                    "value": 0,
                    "text": "Select"
                };
                if(result instanceof Array){
                    if(type === 7){ // countries
                        $scope.countries.push(defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.countries.push(result[i]);
                        }
                    }else if(type === 1){ // blocks
                        $scope.allottedblocks.push(defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.allottedblocks.push(result[i]);
                        }
                    }else if(type === 3){//states
                         $scope.states.push(defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.states.push(result[i]);
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
                         $scope.allotteddistricts.push(defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.allotteddistricts.push(result[i]);
                        }
                    }else if(type === 16){//user groups
                         $scope.entityGroups.push(defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.entityGroups.push(result[i]);
                        }
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

        GetLookupValues(2);
        GetLookupValues(15);
        GetLookupValues(8);
        GetLookupValues(3);
        GetLookupValues(1);
        GetLookupValues(7);
        GetLookupValues(16); // Blocks
}]);

app.factory('userfactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id,
            cache : false
        });
    }


    service.AddBasicUserDetails = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/create',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    service.GetUsers = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/getlist',
            params : model,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }   

    return service;

});