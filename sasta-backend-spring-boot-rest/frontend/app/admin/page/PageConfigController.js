/**
 * Created by Sarvaratchagan on 7/20/2016.
 */

app.controller('PageConfigController',PageConfigController);

function PageConfigController($http,$window,$scope,$rootScope,notify,$location,$state,storage,pageconfigfactory){

    $scope.pageconfigfactory = pageconfigfactory;
    $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    $scope.defaultOptions = {
        "name": "",
        "value": "",
        "label": "",
        "modifyBy": $rootScope.sessionConfig.userId,
        "createBy": $rootScope.sessionConfig.userId,
        "createdDate": null,
        "modifiedByName": "",
        "modifiedDate": null,
        "createdByName": "",
        "allowEdit": true
    };

    $scope.jQueryAddForm = null;

    $scope.dummyOptions = angular.copy($scope.defaultOptions);

    $scope.doReset = function(){
        $scope.defaultOptions = $scope.dummyOptions;
        $scope.mode = 1;
        $scope.pageTitle = "Add Page Configuration";
    }

    function parseOptions(o){
        var option = angular.copy(o);
        delete option.uid;
        delete option._handlers;
        delete option._events;
        delete option.parent;
        return option;
    }

    $scope.EditData = function(dataItem){
        $scope.defaultOptions = parseOptions(dataItem);
        $scope.mode = 2;
        $scope.pageTitle = "Edit Page Configuration";
    }

    $scope.OnDisableEdit = function(dataItem) {
        $scope.defaultOptions = parseOptions(dataItem);
        $scope.defaultOptions.allowEdit = false;
        $scope.UpdatePageConfig();
    }

    function validateContent(value){
        value = $.trim(value);
        if(!value){
            notify({
                messageTemplate: '<span>value should not be empty!</span>',
                position: $rootScope.appConfig.notifyConfig.position,
                scope: $scope
            });
            return false;
        }
        return true;
    }


    $scope.UpdatePageConfig  = function() {
        var content = ($scope.defaultOptions.value||'').replace(/<(?:.|\n)*?>/gm, '');
        if(validateContent(content)){
            $scope.defaultOptions.modifyBy = $rootScope.sessionConfig.userId;
            var response = $scope.pageconfigfactory.doUpdateData($scope.defaultOptions)
            response.success(function (result) {
                var index = result.data.indexOf('Duplicate entry');
                if (result.status) {
                    notify({
                        messageTemplate: '<span>' + result.data + '</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope: $scope
                    });
                    $scope.grid.dataSource.read();
                    $scope.doReset();
                }
                else {
                    var message = "<span>Unable to update page configuration!</span>";
                    if (index > 0) {
                        message = "<span>duplicate entries not allowed!</span>";
                    }
                    notify({
                        messageTemplate: message,
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope: $scope
                    });
                }

            }).error(function (error, status) {
                notify({
                    messageTemplate: '<span>Unable to update page configuration!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope: $scope
                });
            });
        }

    }

    $scope.addPageConfig = function(){
        var content = ($scope.defaultOptions.value||'').replace(/<(?:.|\n)*?>/gm, '');
        if(validateContent(content)){
            var response = $scope.pageconfigfactory.doSubmitData($scope.defaultOptions)
            response.success(function(result){
                var index = result.data.indexOf('Duplicate entry');
                if(result.status){
                    notify({
                        messageTemplate: '<span>'+result.data+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                    $scope.grid.dataSource.read();
                    $scope.doReset();
                }
                else{
                    var message = "<span>Unable to add page configuration!</span>";
                    if(index>0){
                        message = "<span>duplicate entries not allowed!</span>";
                    }
                    notify({
                        messageTemplate: message,
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }

            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>Unable to add page configuration!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            });
        }
    }

    $scope.gridOptions = {
        columns: [
            { field: "id", title:'ID', hidden: true, editable : false },
            { field: "name", title:'Name',width:'100px'  },
            { field: "label", title:'Label',width:'100px'   },
            { field: "createdByName", title:'Created By',width:'100px'   },
            { field: "modifiedByName", title:'Modified By',width:'100px'   },
            { field: "createdDate", title : "Created Date",width:'60px' , template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
            { field: "modifiedDate", title : "Modified Date",width:'60px', template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
            {
                title : "&nbsp;",
                width: '60px',
                template: kendo.template($("#toggle-template").html())
            }
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
                        url: $scope.crudServiceBaseUrl + '/pageconfig/getlist',
                        cache : false
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

    if($location.search().mode === 'list'){
        $scope.mode = 1;
        $scope.pageTitle = "Page Configurations"
    }

    $scope.addformName = "#frmAddPageConfig";

    $scope.$on('$viewContentLoaded', function(){
        //Here your view content is fully loaded !!
        $($scope.addformName).validationEngine('attach', {
            promptPosition: "topLeft",
            scroll: true
        });
        $scope.addjQueryValidator = new Validator($scope.addformName);
    });

}

app.factory('pageconfigfactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
    var createbankUrl = '/pageconfig/create';

    service.doSubmitData = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createbankUrl,
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    service.doUpdateData = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/pageconfig/update',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return service;

});