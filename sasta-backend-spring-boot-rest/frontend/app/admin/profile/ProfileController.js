app.controller('ProfileController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','profilefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,profilefactory){

        // Users list
        $scope.user = [];
        $scope.formName = '#userForm';
        $scope.basicProfielForm = '#basicProfielForm';
        $scope.dateOptions = {
            format: 'yyyy-MM-dd'
        };
        $($scope.formName).validationEngine('attach', {
            promptPosition: "topLeft",
            scroll: true
        });

        $scope.jQueryValidator = new Validator($scope.formName);
        $scope.viewMode = $location.search().mode === 'view' ? true : false;
        // lookup data
        $scope.countries = [];
        $scope.states = [];
        $scope.departments = [];
        $scope.reportingto = [];
        $scope.allotteddistricts = [];
        $scope.allottedblocks = [];
        $scope.bloodGroups = [];
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
        $scope.defaultOptions = {
            "value": 0,
            "text": "Select"
        };

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
       $scope.defaultBloodGroups = {
            "value": 0,
            "text": "Select"
        };        

       $scope.allottedDefaultBlocks = {
            "value": 0,
            "text": "Select"
        };   
       $scope.allottedDefaultDistricts = {
            "value": 0,
            "text": "Select"
        };

        //Action of clicking product name link.
        $scope.modelDialogTitle = {
            aboumeTitle : "About Me",
            basicProfileTitle : 'Basic Profile'
        };

        $scope.basicProfieValidator = new Validator($scope.basicProfielForm);

        $scope.kWindowOptions = {
            content: 'admin/profile/aboutme.html',
            title: $scope.modelDialogTitle.aboumeTitle,
            width : '90%',
            iframe: false,
            draggable: true,
            modal: true,
            resizable: false,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            }
        };

        $scope.OpenAboutMe = function($event){
            $scope.aboutMeWindow.center().open();
        }

        $scope.Close = function(){
            $scope.aboutMeWindow.close();
        }

        $scope.sendProfileDescription = function(){
            var model = {
                image : $scope.user.imageName,
                description : $scope.user.description,
                userId : $location.search().id||$rootScope.sessionConfig.userId
            };
            var resp = profilefactory.UploadProfileDescription(model);
            resp.success(function(result){
                if(result.status){
                    notify({
                        messageTemplate: '<span>'+result.data+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });                    
                    GetProfileInformation();
                    $state.reload();
                }
            }).error(function(error,status){
                notify({
                    messageTemplate: error,
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            }); 
        }

        $scope.EditBasicProfile = function(){
            $scope.defaultBloodGroups.value = $scope.user.bloodGroupId || 0;
            $scope.basicProfileWindow.center().open();
        }

        $scope.CloseEditBasicProfile = function(){
            $scope.basicProfileWindow.close();
        }

        $scope.fileChanged = function(e) {          
        
            var files = e.target.files;
        
            var fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);     
            
            fileReader.onload = function(e) {
                $scope.imgSrc = this.result;
                $scope.$apply();
            };            
        }       
       
        $scope.clear = function() {
             $scope.imageCropStep = 1;
             delete $scope.imgSrc;
             delete $scope.result;
             delete $scope.resultBlob;
        };


        $scope.OnSelectedGendersValue = function(v){
            $scope.defaultGenders = v;
        }

        $scope.OnSelectedEntityGroupsValue = function(v){
            $scope.defaultEntityGroups = v;
        }

        $scope.OnSelectedEntityGroupsValue = function(v){
            $scope.defaultEntityGroups = v;
        }

        $scope.OnSelectedBloodGroupValue = function(defaultBloodGroups){
            $scope.defaultBloodGroups = defaultBloodGroups;
        }

        $scope.OnSelectedDistrictValue = function(v){
            $scope.allottedDefaultDistricts = v;
        }

        $scope.OnSelectedBlockValue = function(v){
            $scope.allottedDefaultBlocks = v;
        }

        $scope.OnSelectedRecruitementTypeValue = function(v){
            $scope.defaultRecruitementType = v;
        }

        $scope.OnSelectedReportingToValue = function(v){
            $scope.defaultReportingTo = v;
        }

        $scope.OnSelectedDepartmentsValue = function(v){
            $scope.defaultDepartments = v;
        }

        $scope.onchange = function($event){
            if($($event.target).val().length>0){
                $($event.target).addClass('validate[custom[email]]');
            }
        }

        $scope.SubmitBasicProfile = function(){
            if($scope.basicProfieValidator.doValidate()){
                
                var model = {
                  "experience": $scope.user.experience,
                  "gmailId": $scope.user.gmailId,
                  "skypeName": $scope.user.skypeName,
                  "communicationAddress": $scope.user.communicationAddress,
                  "dateOfBirth": $scope.user.dateOfBirth,
                  "previousExperience": $scope.user.previousExperience,
                  "businessEmail": $scope.user.businessEmail,
                  "personalEmail": $scope.user.personalEmail,
                  "bloodGroupId": $scope.defaultBloodGroups.value,
                  "mobileNumber": $scope.user.mobileNumber,
                  "landLineNumber": $scope.user.landLineNumber,
                  "personalUrl": null,
                  "isAddressSame": true,
                  "presentAddress": $scope.user.permanentAddress,
                  "userId": $location.search().id||$rootScope.sessionConfig.userId
                };
                var resp = profilefactory.UpdateBasicProfile(model);
                resp.success(function(result){
                    notify({
                        messageTemplate: '<span>'+result.data+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });                     
                    GetProfileInformation();
                    $state.reload();
                }).error(function(error,status){
                    notify({
                        messageTemplate: error,
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                });                
            }    
        }

        $scope.UpdateUser = function(){
            if($scope.jQueryValidator.doValidate()){
                $scope.defaultUser.reportingId = parseInt($scope.defaultReportingTo.value,10);
                $scope.defaultUser.recruitmentId = $scope.defaultRecruitementType.value;
                $scope.defaultUser.allottedDistrict = $scope.allottedDefaultDistricts.value;
                $scope.defaultUser.allottedBlock = $scope.allottedDefaultBlocks.value;
                $scope.defaultUser.genderId = $scope.defaultGenders.value;
                $scope.defaultUser.departmentId = $scope.defaultDepartments.value;
                $scope.defaultUser.stateId = $scope.defaultStates.value;
                $scope.defaultUser.countryId = $scope.defaultCountries.value;
                $scope.defaultUser.userGroupId = $scope.defaultEntityGroups.value;

                var dt = kendo.parseDate($scope.user.dateOfJoining,'yyyy-mm-dd');
                $scope.defaultUser.dateOfJoining = kendo.toString(dt,"yyyy-MM-ddTHH:mm:ssZ");
                dt = kendo.parseDate($scope.user.dateOfBirth,'yyyy-mm-dd');
                $scope.defaultUser.dateOfBirth = kendo.toString(dt,"yyyy-MM-ddTHH:mm:ssZ");
                $scope.defaultUser.firstName = $scope.user.firstName;
                $scope.defaultUser.lastName = $scope.user.lastName;
                $scope.defaultUser.screenName = $scope.user.screenName;
                $scope.defaultUser.email = $scope.user.email;
                $scope.defaultUser.jobTitle  = $scope.user.jobTitle;
                $scope.defaultUser.teamName  = $scope.user.teamName;
                $scope.defaultUser.employeeId  = $scope.user.employeeId;
                $scope.defaultUser.id = $scope.user.id;

                var response = profilefactory.Update($scope.defaultUser);
                response.success(function(result){
                    if(result.status){
                        notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });
                        $scope.Reset();
                    }else{
                        notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });
                    }
                }).error(function(error,status){
                    notify({
                        messageTemplate: '<span>'+error+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                });
            }
        }

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
        $scope.dummy =  angular.copy($scope.user);
        $scope.defaultUser = angular.copy($scope.user);

        $scope.Reset = function(){
            $scope.defaultUser = angular.copy($scope.dummy);
            $scope.user = angular.copy($scope.dummy);
            $scope.defaultUser = angular.copy($scope.dummy);
            $scope.allottedDefaultBlocks = angular.copy($scope.defaultOptions);
            $scope.defaultStates = angular.copy($scope.defaultOptions);
            $scope.defaultCountries = angular.copy($scope.defaultOptions);
            $scope.defaultRecruitementType = angular.copy($scope.defaultOptions);
            $scope.defaultBlocks = angular.copy($scope.defaultOptions);
            $scope.defaultDistricts = angular.copy($scope.defaultOptions);
            $scope.defaultReportingTo = angular.copy($scope.defaultOptions);
            $scope.defaultDepartments = angular.copy($scope.defaultOptions);
            $scope.defaultEntityGroups = angular.copy($scope.defaultOptions);
            $scope.defaultGenders = angular.copy($scope.defaultOptions);
            $scope.defaultBloodGroups = angular.copy($scope.defaultOptions);
            $scope.allottedDefaultBlocks = angular.copy($scope.defaultOptions);
            $scope.allottedDefaultDistricts  = angular.copy($scope.defaultOptions);
            // Get Profile Information
            GetProfileInformation();
        }

        function GetProfileInformation(){
            var response = profilefactory.GetUsers($location.search().id||$rootScope.sessionConfig.userId);
            response.success(function(result){
                if(result instanceof Array){
                    $scope.user = $.extend($scope.user,result[0]);
                    $scope.defaultGenders.value = $scope.user.genderId||0;
                    $scope.defaultStates.value = $scope.user.stateId||0;
                    $scope.defaultCountries.value = $scope.user.countryId||0;
                    $scope.defaultEntityGroups.value = $scope.user.userGroupId||0;
                    $scope.defaultDepartments.value = $scope.user.departmentId||0;
                    $scope.defaultReportingTo.value = $scope.user.reportingId||0;
                    $scope.allottedDefaultBlocks.value = $scope.user.allottedBlock||0;
                    $scope.allottedDefaultDistricts.value = $scope.user.allottedDistrict||0;
                    $scope.defaultRecruitementType.value = $scope.user.recruitmentId||0;
                    $scope.defaultBloodGroups.value = $scope.user.bloodGroupId||0;
                }else{
                    var messageTemplate = '<span>'+result.data+'</span>';
                    notify({
                        messageTemplate: messageTemplate,
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }
            }).error(function(error,status){
                notify({
                    messageTemplate: 'unable to read profile information!.',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            });
        }

        function GetLookupValues(type){
            profilefactory.getLookupValues(type).success(function(result){

                if(result instanceof Array){
                    if(type === 7){ // countries
                        $scope.countries.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.countries.push(result[i]);
                        }
                    }else if(type === 1){ // blocks
                        $scope.allottedblocks.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.allottedblocks.push(result[i]);
                        }
                    }else if(type === 3){//states
                         $scope.states.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.states.push(result[i]);
                        }
                    }else if(type === 8){//departments
                         $scope.departments.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.departments.push(result[i]);
                        }
                    }else if(type === 15){//reportingto
                         $scope.reportingto.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.reportingto.push(result[i]);
                        }
                    }else if(type === 2){//districts
                         $scope.allotteddistricts.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.allotteddistricts.push(result[i]);
                        }
                    }else if(type === 5){//blood groups
                         $scope.bloodGroups.push($scope.defaultOptions);
                        for (var i=0; i<result.length; i++){
                            $scope.bloodGroups.push(result[i]);
                        }
                    }else if(type === 16){//blood groups
                         $scope.entityGroups.push($scope.defaultOptions);
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
        GetLookupValues(5);
        GetLookupValues(16);

        // Get Profile Information
        GetProfileInformation();
}]);

app.factory('profilefactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id,
            cache : false
        });
    }

    service.UploadProfileDescription = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/uploadavatarimages',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    service.Update = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/create',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    service.UpdateBasicProfile = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/user/updatebasicprofile',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } 

    service.GetUsers = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/user/getlist?id='+id,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }   

    return service;

});