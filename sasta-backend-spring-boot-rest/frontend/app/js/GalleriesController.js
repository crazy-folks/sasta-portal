app.controller('PublicGalleriesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','publicGlFactory',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage,publicGlFactory){


        $scope.rounds = [];
        $scope.fy = [];
        $scope.selectedcalender = '';
        $scope.defaultfyid = '';
        $scope.galleries = [];
        $scope.UpdateFy = function(id){
            $scope.defaultfyid = id;
            angular.forEach($scope.fy,function(i,k){
                if(id !== i.value ){
                    i.checked = false;
                }else{
                    $scope.selectedcalender = i.text;
                }
            });
            $scope.GetRound($scope.defaultfyid);
        }

        $scope.GetRound = function(id){
            $scope.rounds = [];
            GetLookupValues($rootScope.appConfig.lookupTypes.Rounds,id);
        }

        $scope.UpdateRound = function(id){
            $scope.defaultroundid = id;
            angular.forEach($scope.rounds,function(i,k){
                if(id !== i.value ){
                    i.checked = false;
                }
            });
            $scope.GetGalleriesList($scope.defaultfyid,$scope.defaultroundid);
        }

        $scope.GetGalleriesList = function(fyid,rndid){
            var response = publicGlFactory.GetGalleriesList(fyid,rndid);
            response.success(function(result){
                if(result.status){
                    $scope.galleries = result.data;
                }
                else
                    notify({
                        messageTemplate: '<span>Unable to read galleries!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>Unable to read galleries!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            });
        }

        function GetLookupValues(type,id){
            var deffered = jQuery.Deferred();
            publicGlFactory.getLookupValues(type,id).success(function(result){

                if(result instanceof Array){
                    if(type==$rootScope.appConfig.lookupTypes.Rounds){
                        for (var i=0; i<result.length; i++){
                            result[i].checked = false;
                            $scope.rounds.push(result[i]);
                        }
                    }else if(  type === $rootScope.appConfig.lookupTypes.FinancialYear ){
                        for (var i=0; i<result.length; i++){
                            result[i].checked = false;
                            $scope.fy.push(result[i]);
                        }

                    }
                }else{
                    notify({
                        messageTemplate: '<span>Unable to read look up values!!!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }
                return deffered.resolve('Ok');
            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>Unable to read look up values!!!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            })
            return deffered.promise();
        }

        GetLookupValues($rootScope.appConfig.lookupTypes.FinancialYear);
}]);


app.factory('publicGlFactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id,filter){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + (filter?filter:'')
        });
    }

    service.GetGalleriesList = function(fyid,rndid){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/gallaries/publicgallaries?fyid='+(fyid||'')+'&auditid='+(rndid||''),
            cache : false
        });
    }

    return service;

});