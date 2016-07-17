app.controller('CalenderController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage){


        $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
        /* show  Context menu*/
        $scope.showContextMenu = Util.showContextMenu;


        $scope.defaultClOptions = {
            "id": null,
            "title": "",
            "isActive": true,
            "createdBy": $rootScope.sessionConfig.userId,
            "modifiedBy": $rootScope.sessionConfig.userId,
            "createdByName": "",
            "modifiedByName": "",
            "createdDate": null,
            "modifiedDate": null,
            "financialName": "",
            "financialId": null
        };

        $scope.defaultDclOptions = {
            "id": null,
            "remarks": "",
            "title": "",
            "isActive": true,
            "startDate":null,
            "createdBy": $rootScope.sessionConfig.userId,
            "modifiedBy": $rootScope.sessionConfig.userId,
            "calenderId": null,
            "gsDate": null,
            "roundNo": "",
            "endDate": null,
            "createdByName": "",
            "modifiedByName": "",
            "createdDate": null,
            "modifiedDate": null,
            "financialYearId": null,
            "financialYearName": ""
        }


        $scope.bindCalenders = function(){
            $scope.gridOptions = {
                columns: [
                    { field: "id", title:'Calender ID', hidden: true, editable : false },
                    { field: "title", title:'Title', width:"150px"  },
                    { field: "financialId", title:'Financial Name', width:"150px", editor: fyDropDownEditor },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "150px" },
                    {
                        title : "&nbsp;",
                        width: '150px',
                        template: kendo.template($("#toggle-template").html())
                    }
                ],
                pageable: true,
                filterable :true,
                groupable : true,
                toolbar: ["create"],
                editable: "inline",
                save: function (e) {

                var that = this;
                e.model.createdBy =  $rootScope.sessionConfig.userId;
                e.model.modifiedBy = $rootScope.sessionConfig.userId;
                $.ajax({

                    url: $scope.crudServiceBaseUrl + (e.model.id == null ? '/calender/createsastacalender':'/calender/updatesastacalender'),
                    type: e.model.id == null ? 'POST' : 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(e.model),
                    success: function (result) {
                        if(result.status){
                            notify({
                                messageTemplate: '<span>'+result.data+'</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope
                            });
                            // scope.grid is the widget reference
                            $scope.grid.dataSource.read();
                            $scope.grid.dataSource.fetch();
                        }else{
                            notify({
                                messageTemplate: '<span>Unable to update data!</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope
                            });
                        }
                    },
                    error: function (data) {
                        //  Alertify.log.error(data);
                        console.log('no datasaved');
                        that.cancelRow();

                    }

                });

            },
                dataSource: {
                    transport: {
                        read: function (e) {
                            $http({
                                method: 'GET',
                                url: $scope.crudServiceBaseUrl + '/calender/sastacalenderlist',
                                cache:false
                            }).
                            success(function(data, status, headers, config) {
                                    var ds = [];
                                if(data.status)
                                    ds = data.data||[];
                                e.success(ds);
                            }).
                            error(function(data, status, headers, config) {
                            });
                        },
                        update:  function (e) {
                             return true;
                        },
                        destroy: function (e) {
                            if(e.data.models[0]){
                                $http({
                                    method: 'GET',
                                    url: $scope.crudServiceBaseUrl + '/calender/deletesastacalender?id='+e.data.models[0].id,
                                    cache:false
                                }).
                                    success(function(result, status, headers, config) {
                                        if(result.status){
                                            notify({
                                                messageTemplate: '<span>'+result.data+'</span>',
                                                position: $rootScope.appConfig.notifyConfig.position,
                                                scope:$scope
                                            });
                                            // scope.grid is the widget reference
                                            $scope.grid.dataSource.read();
                                            $scope.grid.dataSource.fetch();
                                        }else{
                                            notify({
                                                messageTemplate: '<span>Unable to update data!</span>',
                                                position: $rootScope.appConfig.notifyConfig.position,
                                                scope:$scope
                                            });
                                        }
                                        e.success(result.status);
                                    }).
                                    error(function(data, status, headers, config) {
                                    });
                            }else{
                                return true;
                            }

                        },
                        create: {
                            url: $scope.crudServiceBaseUrl + "/calender/createsastacalender",
                            dataType: "json"
                        },
                        parameterMap: function(options, operation) {debugger;
                            if (operation !== "read" && options.models) {
                                return {models: kendo.stringify(options.models)};
                            }
                        }
                    },
                    batch: true,
                    pageSize: 30,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { editable: false, nullable: true },
                                title: { type: "string", validation: { required: true } },
                                financialId: {type : "number", validation: { required: true } }
                            }
                        }
                    }
                }
            }


            function fyDropDownEditor(container, options) {
                $('<input required data-text-field="text" data-value-field="value" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataSource: {
                            type: "json",
                            transport: {
                                read: $scope.crudServiceBaseUrl + '/lookup/getlookup?id=9'
                            }
                        }
                    });
            }

        }

        $scope.AddDetiledCalenders= function (dt) {
            var model = {mode: ((dt.id === null) ? "add" : "edit") };
            (dt.id)&&(model.calenderid = dt.id);
            $state.go("admin.managecalenders",model);
        }

        $scope.manageCalender = function(){
            $scope.gridOptions = {
                columns: [
                    { field: "id", title:'Detailed Calender ID', hidden: true, editable : false },
                    { field: "roundNo", title:'Round No'  },
                    { field: "startDate", title:'Start Date', template :"#=kendo.toString(startDate,'dd-MM-yyyy')#"  },
                    { field: "endDate", title:'End Date' , template :"#=kendo.toString(endDate,'dd-MM-yyyy')#" },
                    { field: "gsDate", title:'GS Date', template :"#=kendo.toString(gsDate,'dd-MM-yyyy')#"  },
                    { field: "remarks", title:'Remarks'  },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
                ],
                pageable: true,
                filterable :true,
                groupable : true,
                toolbar: ["create"],
                editable: "inline",
                save: function (e) {

                    var that = this;
                    e.model.createdBy =  $rootScope.sessionConfig.userId;
                    e.model.modifiedBy = $rootScope.sessionConfig.userId;
                    e.model.calenderId = parseInt($scope.calenderid,10);
                    var m = angular.copy(e.model);
                    delete m.uid;
                    delete m._handlers;
                    delete m._events;
                    delete m.parent;
                    $.ajax({

                        url: $scope.crudServiceBaseUrl + (e.model.id == null ? '/calender/createdetailedsastacalender':'/calender/updatedetailedsastacalender'),
                        type: e.model.id == null ? 'POST' : 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(m),
                        cache:false,
                        success: function (result) {
                            if(result.status){
                                notify({
                                    messageTemplate: '<span>'+result.data+'</span>',
                                    position: $rootScope.appConfig.notifyConfig.position,
                                    scope:$scope
                                });
                                // scope.grid is the widget reference
                                $scope.grid.dataSource.read();
                                $scope.grid.dataSource.fetch();
                            }else{
                                notify({
                                    messageTemplate: '<span>Unable to update data!</span>',
                                    position: $rootScope.appConfig.notifyConfig.position,
                                    scope:$scope
                                });
                            }
                        },
                        error: function (data) {
                            //  Alertify.log.error(data);
                            console.log('no datasaved');
                            that.cancelRow();
                        }
                    });

                },
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
                        },
                        update:  function (e) {
                            return true;
                        },
                        destroy: function (e) {
                            if(e.data.models[0]){
                                $http({
                                    method: 'GET',
                                    url: $scope.crudServiceBaseUrl + '/calender/deletedetailedsastacalender?id='+e.data.models[0].id,
                                    cache:false
                                }).
                                    success(function(result, status, headers, config) {
                                        if(result.status){
                                            notify({
                                                messageTemplate: '<span>'+result.data+'</span>',
                                                position: $rootScope.appConfig.notifyConfig.position,
                                                scope:$scope
                                            });
                                            // scope.grid is the widget reference
                                            $scope.grid.dataSource.read();
                                            $scope.grid.dataSource.fetch();
                                        }else{
                                            notify({
                                                messageTemplate: '<span>Unable to update data!</span>',
                                                position: $rootScope.appConfig.notifyConfig.position,
                                                scope:$scope
                                            });
                                        }
                                        e.success(result.status);
                                    }).
                                    error(function(data, status, headers, config) {
                                    });
                            }else{
                                return true;
                            }

                        },
                        create: {
                            url: $scope.crudServiceBaseUrl + "/calender/CreateDetailedSastaCalender",
                            dataType: "json"
                        },
                        parameterMap: function(options, operation) {
                            if (operation !== "read" && options.models) {
                                return {models: kendo.stringify(options.models)};
                            }
                        }
                    },
                    batch: true,
                    pageSize: 30,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { editable: false, nullable: true  },
                                roundNo: { type: "string", validation: { required: true } },
                                startDate: {type : "date", validation: { required: true } },
                                endDate: { type: "date", validation: { required: true} },
                                gsDate: { type: "date", validation: { required: true }  },
                                remarks: { type: "string" }
                            }
                        }
                    }
                }
            }
        }

        if($location.search().mode === 'list'){
            $scope.mode = 1;
            $scope.pageTitle = "Calenders"
            $scope.bindCalenders();
        }else if($location.search().mode === 'add'){
            $scope.mode = 2;
            $scope.pageTitle = "Add Calenders";
            $scope.calenderid = $location.search().calenderid;
            $scope.manageCalender();
        }else if($location.search().mode === 'edit'){
            $scope.mode = 3;
            $scope.calenderid = $location.search().calenderid;
            $scope.pageTitle = "Edit Calenders";
            $scope.manageCalender();
        }

}]);