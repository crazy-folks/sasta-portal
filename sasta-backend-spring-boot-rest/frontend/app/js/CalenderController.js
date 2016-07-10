app.controller('PublicCalenderController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','calenderfactory',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage,calenderfactory){

        $scope.calenderfactory = calenderfactory;
        $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
        $scope.calenders = [];
        $scope.selectedcalender = '';

        $scope.UpdateCalenders = function(id){
            $scope.calenderid = id;
            angular.forEach($scope.calenders,function(i,k){
                if(id !== i.id ){
                    i.checked = false;
                }else{
                    $scope.selectedcalender = i.financialName;
                }
            });
            $scope.grid.dataSource.read();
        }

        $scope.bindCalenders = function(){
                $scope.gridOptions = {
                    columns: [
                        { field: "id", title:'Detailed Calender ID', hidden: true, editable : false },
                        { field: "roundNo", title:'Round No', width: "100px"  },
                        { field: "startDate", title:'Start Date', width: "100px" , template :"#=kendo.toString(startDate,'yyyy-MM-dd')#"  },
                        { field: "endDate", title:'End Date' , width: "100px" , template :"#=kendo.toString(endDate,'yyyy-MM-dd')#" },
                        { field: "gsDate", title:'GS Date', width: "100px" , template :"#=kendo.toString(gsDate,'yyyy-MM-dd')#"  },
                        { field: "remarks", title:'Remarks', width: "200px"   }
                    ],
                    pageable: false,
                    resizable: true,
                    dataSource : {
                        transport: {
                            read:  function (e) {
                                $http({
                                    method: 'GET',
                                    url: $scope.crudServiceBaseUrl + '/calender/detailedsastacalender?id='+($scope.calenderid||''),
                                    cache:false
                                }).
                                    success(function(data, status, headers, config) {
                                        var ds = [];
                                        if(data.status)
                                            ds = data.data||[];
                                        angular.forEach(ds,function(o,k){
                                            o.gsDate &&(o.gsDate = new Date(o.gsDate));
                                            o.startDate &&(o.startDate = new Date(o.startDate));
                                            o.endDate &&(o.endDate = new Date(o.endDate));
                                        });
                                        e.success(ds);

                                    }).
                                    error(function(data, status, headers, config) {
                                    });
                            }
                        }
                    }
                }
        }

        $scope.GetCalenders = function(){
            var response = calenderfactory.GetSastaCalender();
            response.success(function(result){
                if(result.status){
                    $scope.calenders = result.data;
                    angular.forEach($scope.calenders,function(i,k){
                        i.checked = false;
                    });
                }
                else
                    notify({
                        messageTemplate: '<span>Unable to read messages!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>Unable to read messages!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            });
        }

        $scope.GetCalenders();
        $scope.bindCalenders();

}]);

app.factory('calenderfactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.GetSastaCalender = function(){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/calender/sastacalenderlist',
            cache : false
        });
    }

    return service;

});