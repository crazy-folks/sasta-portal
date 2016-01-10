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
        $scope.entityGroups = [{
            "value": 0,
            "text": "Select"
        },{
            "value": 1,
            "text": "Admin"
        },{
            "value": 2,
            "text": "Users"
        }];

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
        "id": null,
        "email": null,
        "password": null,
        "description": null,
        "experience": null,
        "modifiedBy": $rootScope.sessionConfig.userId,
        "createdBy":  $rootScope.sessionConfig.userId,
        "countryId":  null,
        "stateId": null,
        "bloodGroupId": 1,
        "screenName": null,
        "firstName": null,
        "lastName": null,
        "genderId": null,
        "jobTitle": null,
        "teamName": null,
        "employeeId": null,
        "imageName": null,
        "imageId": null,
        "gmailId": null,
        "skypeName": null,
        "fatherName": null,
        "isLocked": false,
        "isActive": true,
        "createDate": null,
        "stateName": null,
        "deptName": null,
        "modifiedDate": null,
        "createdByName": null,
        "modifiedByName": null,
        "hasReadTermsAndCondtion": true,
        "userGroupId": null,
        "dateOfJoining": null,
        "departmentId": null,
        "reportingId": null,
        "allottedDistrict": null,
        "allottedBlock": null,
        "recruitmentId": null,
        "communicationAddress": null,
        "permanentAddress": null,
        "sameAddress": false,
        "dateOfBirth": null,
        "previousExperience": null,
        "businessEmail": null,
        "personalEmail": null,
        "birthProofId": null,
        "validationCode": null,
        "visibleFields": null,
        "mobileNumber": null,
        "landLineNumber": null,
        "personalUrl": null,
        "failedLoginAttempts": null,
        "lastLoginDate": null,
        "countryName": null,
        "reportingTo": null,
        "bloodGroupName": null,
        "recruitementName": null,
        "birthProofName": null
      };

    $scope.CreateUser = function(){
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
                    $scope.$emit("ShowSuccess","Successfully added a user!");
                    $scope.Reset();
                }else{
                    $scope.$emit("ShowError","Unable to update states!");
                }
            }).error(function(error,status){
                $scope.$emit("ShowError","Unable to update states!");
            });           
        }
    };

    $scope.Reset = function(){
        $scope.jQueryValidator.doReset();
        $($scope.formName)[0].reset();
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
}]);

app.factory('userfactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
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