app.controller('DeviationRecordNotProducedReportsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','deviationReportfactory','$q',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage,deviationReportfactory,$q){
        $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

        $scope.defaultSearchReq = {
            "referenceId": null,
            "roundId": null,
            "districtId": null,
            "blockId": null,
            "villageId": null,
            "isConsolidate": false,
            "userId":null
        };

        $scope.reportTitle = "Deviation Record Not Produced Reports";

        $scope.searchReq =  angular.copy($scope.defaultSearchReq);


        $scope.selectedFy = [];
        $scope.selectedRounds = [];
        $scope.selectedDistricts = [];
        $scope.selectedBlocks = [];
        $scope.selectedVps = [];
        $scope.selectedusers = [];
        $scope.selectedIsConsolidateRpt = false;

        $scope.$watch('selectedIsConsolidateRpt', function(newValue,oldValue){
            $scope.stateChanged(newValue);
        });

        $scope.selectFyOptions = {
            placeholder: "Select Year...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            dataSource: {
                transport:{
                    read: function (e) {
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.FinancialYear
                        }).success(function(data, status, headers, config) {
                            data&&e.success(data)
                        });
                    }
                }
            },
            change: function(){
                $scope.multiSelectddlRounds.options.initialLoad = false;
                $scope.multiSelectddlRounds.dataSource.read();
            }
        };

        $scope.selectRoundOptions = {
            placeholder: "Select Round...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            initialLoad : true,
            dataSource: {
                transport:{
                    read: function (e) {
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Rounds+((($scope.selectedFy)?"&where="+$scope.selectedFy.join(','):''))
                        }).success(function(data, status, headers, config) {
                            if(!$scope.multiSelectddlRounds.options.initialLoad)
                                data&&e.success(data);
                            else
                                e.success([]);
                        });
                    }
                }
            },
            change: function(){
                $scope.selectedIsConsolidateRpt &&($scope.stateChanged($scope.selectedIsConsolidateRpt));
            }
        };

        $scope.selectDistrictOptions = {
            placeholder: "Select District...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            dataSource: {
                transport:{
                    read: function (e) {
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Districts
                        }).success(function(data, status, headers, config) {
                            if( $rootScope.sessionConfig.isDistrictLevelPerson){
                                var v = $.map(data,function(key,obj){
                                    if(($rootScope.sessionConfig.allottedDistrict === key.value))
                                        return  key;
                                });
                                (v.length>0)&&(data = v);
                            }
                            data&&e.success(data);
                        });
                    }
                }
            },
            change: function(){
                $scope.multiSelectddlBlocks.options.initialLoad = false;
                $scope.multiSelectddlUsers.options.initialLoad = false;
                $scope.multiSelectddlBlocks.dataSource.read();
                $scope.multiSelectddlUsers.dataSource.read();
            }
        };

        $scope.selectBlocksOptions = {
            placeholder: "Select Block...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            initialLoad : true,
            dataSource: {
                transport:{
                    read: function (e) {
                        var temp = '';
                        $scope.selectedDistricts&&(temp=$scope.selectedDistricts.join(','));
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Blocks+'&where='+temp
                        }).success(function(data, status, headers, config) {
                            if(!$scope.multiSelectddlBlocks.options.initialLoad)
                                data&&e.success(data);
                            else
                                e.success([]);
                        });
                    }
                }
            },
            change: function(){
                $scope.multiSelectddlVps.options.initialLoad = false;
                $scope.multiSelectddlVps.dataSource.read();
            }
        };

        $scope.selectPanchayatsOptions = {
            placeholder: "Select Panchayat...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            initialLoad : true,
            dataSource: {
                transport:{
                    read: function (e) {
                        var temp = '';
                        $scope.selectedBlocks&&(temp=$scope.selectedBlocks.join(','));
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.VillagePanchayats+'&where='+temp
                        }).success(function(data, status, headers, config) {
                            if(!$scope.multiSelectddlVps.options.initialLoad)
                                data&&e.success(data);
                            else
                                e.success([]);
                        });
                    }
                }
            },
            change: function(){
                //$scope.multiSelectddlFy.dataSource.read();
            }
        };

        $scope.selectUsersOptions = {
            placeholder: "Select User...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
            tagMode: "single",
            initialLoad : true,
            dataSource: {
                transport:{
                    read: function (e) {
                        var temp = '';
                        $scope.selectedDistricts&&(temp=$scope.selectedDistricts.join(','));
                        $http({
                            method: 'GET',
                            url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Users+'&where='+temp
                        }).success(function(data, status, headers, config) {
                            if(!$scope.multiSelectddlUsers.options.initialLoad)
                                data&&e.success(data);
                            else
                                e.success([]);
                        });
                    }
                }
            },
            change: function(){
                //$scope.multiSelectddlFy.dataSource.read();
            }
        };

        $scope.stateChanged = function(state){
            $scope.grid.showColumn('roundName');
            $scope.grid.showColumn('blockName');
            $scope.grid.showColumn('vpName');
            if(state){
                $scope.grid.hideColumn('roundName');
                $scope.grid.hideColumn('blockName');
                $scope.grid.hideColumn('vpName');
            }
        }

        $scope.OnReset = function(){
            $scope.selectedFy = [];
            $scope.selectedRounds = [];
            $scope.selectedDistricts = [];
            $scope.selectedBlocks = [];
            $scope.selectedVps = [];
            $scope.selectedusers = [];
            $scope.searchReq =  angular.copy($scope.defaultSearchReq);
            $scope.selectedIsConsolidateRpt = false;
        }

        $scope.doSearch = function(){
            $scope.searchReq = {
                "referenceId": (($scope.selectedFy)?$scope.selectedFy.join(','):null),
                "roundId": (($scope.selectedRounds)?$scope.selectedRounds.join(','):null),
                "districtId": (($scope.selectedDistricts)?$scope.selectedDistricts.join(','):null),
                "blockId": (($scope.selectedBlocks)?$scope.selectedBlocks.join(','):null),
                "villageId": (($scope.selectedVps)?$scope.selectedVps.join(','):null),
                "isConsolidate": $scope.selectedIsConsolidateRpt,
                "userId":  (($scope.selectedusers)?$scope.selectedusers.join(','):null),
            };
            $scope.grid.dataSource.read();
            $scope.grid.dataSource.page(1);
        }

        $scope.gridOptions = {
            toolbar: ["excel"],
            excel: {
                fileName: "deviations-not-prdodcued"+new Date().getTime()+".xlsx",
                proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
                allPages: true
            },
            columns: [
                { field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
                { field: "financialYear", locked: true, groupable:true,width: '130px', title:'FY', footerTemplate: "Total :"},
                { field: "roundName", locked: true, groupable:true,width: '130px', title:'Round'},
                { field: "districtName", locked: true, groupable:true,width: '130px', title:'District'},
                { field: "blockName", locked: true, groupable:true,width: '130px', title:'Block'},
                { field: "vpName", locked: true, groupable:true,width: '130px', title:'Panchayat'},
                {
                    title : "Works without GS approval",
                    columns :[
                        { field: "worksTakenUpWithoutGbApprovalCount",headerTemplate: "No", title : "Works without GS approval No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "worksTakenUpWithoutGbApprovalAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Works without GS approval Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Estimates Not Produced For Audit",
                    columns :[
                        { field: "estimatesNotProducedForAuditCount",headerTemplate: "No", title : "Estimates Not Produced For Audit No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "estimatesNotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Estimates Not Produced For Audit Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "AS Not Produced For Audit",
                    columns :[
                        { field: "asnotProducedForAuditCount",headerTemplate: "No", title : "AS Not Produced For Audit No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "asnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "AS Not Produced For Audit Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "TS Not Produced For Audit",
                    columns :[
                        { field: "tsnotProducedForAuditCount",headerTemplate: "No", title : "TS Not Produced For Audit No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "tsnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "TS Not Produced For Audit Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Others",
                    columns :[
                        { field: "othersCount",headerTemplate: "Others No", title : "Others No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "othersAmount",format: '{0:n0}',headerTemplate : "Others Amount", title : "Others Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS EST AS TS",
                    columns :[
                        { field: "GS_EST_AS_TS_COUNT",headerTemplate: "GS EST AS TS No", title : "GS EST AS TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_EST_AS_TS_AMT",format: '{0:n0}',headerTemplate : "GS EST AS TS Amount", title : "GS EST AS TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS EST AS",
                    columns :[
                        { field: "GS_EST_AS_COUNT",headerTemplate: "GS EST AS No", title : "GS EST AS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_EST_AS_AMT",format: '{0:n0}',headerTemplate : "GS EST AS Amount", title : "GS EST AS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS EST TS",
                    columns :[
                        { field: "GS_EST_TS_COUNT",headerTemplate: "GS EST TS No", title : "GS EST TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_EST_TS_AMT",format: '{0:n0}',headerTemplate : "GS EST TS Amount", title : "GS EST TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS AS TS",
                    columns :[
                        { field: "GS_AS_TS_COUNT",headerTemplate: "GS AS TS No", title : "GS AS TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_AS_TS_AMT",format: '{0:n0}',headerTemplate : "GS AS TS Amount", title : "GS AS TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "EST AS TS",
                    columns :[
                        { field: "EST_AS_TS_COUNT",headerTemplate: "EST AS TS No", title : "EST AS TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "EST_AS_TS_AMT",format: '{0:n0}',headerTemplate : "EST AS TS Amount", title : "EST AS TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "EST AS",
                    columns :[
                        { field: "EST_AS_COUNT",headerTemplate: "EST AS No", title : "EST AS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "EST_AS_AMT",format: '{0:n0}',headerTemplate : "EST AS Amount", title : "EST AS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "EST TS",
                    columns :[
                        { field: "EST_TS_COUNT",headerTemplate: "EST TS No", title : "EST TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "EST_TS_AMT",format: '{0:n0}',headerTemplate : "EST TS Amount", title : "EST TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS EST",
                    columns :[
                        { field: "GS_EST_COUNT",headerTemplate: "GS EST No", title : "GS EST No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_EST_AMT",format: '{0:n0}',headerTemplate : "GS EST Amount", title : "GS EST Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS AS",
                    columns :[
                        { field: "GS_AS_COUNT",headerTemplate: "GS AS No", title : "GS AS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_AS_AMT",format: '{0:n0}',headerTemplate : "GS AS Amount", title : "GS AS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "GS TS",
                    columns :[
                        { field: "GS_TS_AMT",headerTemplate: "GS TS No", title : "GS TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "GS_TS_COUNT",format: '{0:n0}',headerTemplate : "GS TS Amount", title : "GS TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "AS TS",
                    columns :[
                        { field: "AS_TS_COUNT",headerTemplate: "AS TS No", title : "AS TS No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "AS_TS_AMT",format: '{0:n0}',headerTemplate : "AS TS Amount", title : "AS TS Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                }
            ],
            pageable: true,
            filterable :true,
            groupable : true,
            sortable: true,
            scrollable: true,
            columnMenu: true,
            reorderable: true,
            resizable: true,
            pageSize: 10,
            autoBind : false,
            pageable: {
                refresh: true,
                pageSizes: [10, 25, 50, 100, "All"],
                messages: {
                    itemsPerPage: "Deviations Not Produced",
                    display: "{0}-{1} from {2} Deviations Not Produced",
                    empty: "No data",
                    allPages: "Show All",
                    refresh: "Refresh Deviations"
                }
            },
            dataSource: {
                pageSize: 10,
                transport: {
                    read: function (e) {
                        if( $rootScope.sessionConfig.isDistrictLevelPerson)
                            $scope.searchReq.districtId = $rootScope.sessionConfig.allottedDistrict;
                        $http({
                            method: 'POST',
                            url: $scope.crudServiceBaseUrl + '/deviation/deviationrecordnotproducedreports',
                            data : JSON.stringify($scope.searchReq)
                        }).
                            success(function(data, status, headers, config) {
                                if(data.status)
                                    e.success(data.data)
                            }).
                            error(function(data, status, headers, config) {
                            });
                    }
                },
                schema:{
                    model: {
                        fields: {
                            worksTakenUpWithoutGbApprovalCount: { type: "number" },
                            worksTakenUpWithoutGbApprovalAmt: { type: "number" },
                            estimatesNotProducedForAuditCount: { type: "number" },
                            estimatesNotProducedForAuditAmt: { type: "number" },

                            asnotProducedForAuditCount: { type: "number" },
                            asnotProducedForAuditAmt: { type: "number" },
                            tsnotProducedForAuditCount: { type: "number" },
                            tsnotProducedForAuditAmt: { type: "number" },

                            othersCount: { type: "number" },
                            othersAmount: { type: "number" }
                        }
                    },
                    parse : function(d){
                        $.each(d, function(idx, elem) {
                            /* GS EST AS TS Amount*/
                            elem.GS_EST_AS_TS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*GS EST AS TS Count*/
                            elem.GS_EST_AS_TS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* GS EST AS Amount*/
                            elem.GS_EST_AS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 ) ;

                            /*GS EST AS Count*/
                            elem.GS_EST_AS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 );

                            /* GS EST TS Amount*/
                            elem.GS_EST_TS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*GS EST AS TS Count*/
                            elem.GS_EST_TS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* GS AS TS Amount*/
                            elem.GS_AS_TS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*GS AS TS Count*/
                            elem.GS_AS_TS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* EST AS TS Amount*/
                            elem.EST_AS_TS_AMT = (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*EST AS TS Count*/
                            elem.EST_AS_TS_COUNT = (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* GS EST AS TS Amount*/
                            elem.EST_AS_AMT = (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 );

                            /*GS EST AS Count*/
                            elem.EST_AS_COUNT = (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 );

                            /* EST TS Amount*/
                            elem.EST_TS_AMT = (elem.estimatesNotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /* EST TS Count*/
                            elem.EST_TS_COUNT = (elem.estimatesNotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* GS EST Amount*/
                            elem.GS_EST_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.estimatesNotProducedForAuditAmt || 0 );

                            /*GS EST Count*/
                            elem.GS_EST_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.estimatesNotProducedForAuditCount || 0 );

                            /* GS AS Amount*/
                            elem.GS_AS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.asnotProducedForAuditAmt || 0 );

                            /*GS AS Count*/
                            elem.GS_AS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.asnotProducedForAuditCount || 0 );

                            /* GS TS Amount*/
                            elem.GS_TS_AMT = (elem.worksTakenUpWithoutGbApprovalAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*GS TS Count*/
                            elem.GS_TS_COUNT = (elem.worksTakenUpWithoutGbApprovalCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );

                            /* AS TS Amount*/
                            elem.AS_TS_AMT = (elem.asnotProducedForAuditAmt || 0 ) +
                                (elem.tsnotProducedForAuditAmt || 0 );

                            /*AS TS Count*/
                            elem.AS_TS_COUNT = (elem.asnotProducedForAuditCount || 0 )+
                                (elem.tsnotProducedForAuditCount || 0 );


                        });
                        return d;
                    }
                },
                group:{
                    field :"roundName",aggregates: [
                        { field: "worksTakenUpWithoutGbApprovalCount", aggregate: "sum"},
                        { field: "worksTakenUpWithoutGbApprovalAmt", aggregate: "sum"},
                        { field: "estimatesNotProducedForAuditCount", aggregate: "sum"},
                        { field: "estimatesNotProducedForAuditAmt", aggregate: "sum"},
                        { field: "asnotProducedForAuditCount", aggregate: "sum"},
                        { field: "asnotProducedForAuditAmt", aggregate: "sum"},
                        { field: "tsnotProducedForAuditCount", aggregate: "sum"},
                        { field: "tsnotProducedForAuditAmt", aggregate: "sum"},
                        { field: "othersCount", aggregate: "sum"},
                        { field: "othersAmount", aggregate: "sum"},

                        { field: "GS_EST_AS_TS_AMT", aggregate: "sum"},
                        { field: "GS_EST_AS_TS_COUNT", aggregate: "sum"},
                        { field: "GS_EST_AS_AMT", aggregate: "sum"},
                        { field: "GS_EST_AS_COUNT", aggregate: "sum"},
                        { field: "GS_EST_TS_AMT", aggregate: "sum"},
                        { field: "GS_EST_TS_COUNT", aggregate: "sum"},
                        { field: "GS_AS_TS_AMT", aggregate: "sum"},
                        { field: "GS_AS_TS_COUNT", aggregate: "sum"},
                        { field: "EST_AS_TS_AMT", aggregate: "sum"},
                        { field: "EST_AS_TS_COUNT", aggregate: "sum"},
                        { field: "EST_AS_AMT", aggregate: "sum"},
                        { field: "EST_AS_COUNT", aggregate: "sum"},
                        { field: "EST_TS_AMT", aggregate: "sum"},
                        { field: "EST_TS_COUNT", aggregate: "sum"},
                        { field: "GS_EST_AMT", aggregate: "sum"},
                        { field: "GS_EST_COUNT", aggregate: "sum"},
                        { field: "GS_AS_AMT", aggregate: "sum"},
                        { field: "GS_AS_COUNT", aggregate: "sum"},
                        { field: "GS_TS_AMT", aggregate: "sum"},
                        { field: "GS_TS_COUNT", aggregate: "sum"},
                        { field: "AS_TS_AMT", aggregate: "sum"},
                        { field: "AS_TS_COUNT", aggregate: "sum"}

                    ]
                },
                aggregate: [
                    { field: "worksTakenUpWithoutGbApprovalCount", aggregate: "sum"},
                    { field: "worksTakenUpWithoutGbApprovalAmt", aggregate: "sum"},
                    { field: "estimatesNotProducedForAuditCount", aggregate: "sum"},
                    { field: "estimatesNotProducedForAuditAmt", aggregate: "sum"},
                    { field: "asnotProducedForAuditCount", aggregate: "sum"},
                    { field: "asnotProducedForAuditAmt", aggregate: "sum"},
                    { field: "tsnotProducedForAuditCount", aggregate: "sum"},
                    { field: "tsnotProducedForAuditAmt", aggregate: "sum"},
                    { field: "othersCount", aggregate: "sum"},
                    { field: "othersAmount", aggregate: "sum"},

                    { field: "GS_EST_AS_TS_AMT", aggregate: "sum"},
                    { field: "GS_EST_AS_TS_COUNT", aggregate: "sum"},
                    { field: "GS_EST_AS_AMT", aggregate: "sum"},
                    { field: "GS_EST_AS_COUNT", aggregate: "sum"},
                    { field: "GS_EST_TS_AMT", aggregate: "sum"},
                    { field: "GS_EST_TS_COUNT", aggregate: "sum"},
                    { field: "GS_AS_TS_AMT", aggregate: "sum"},
                    { field: "GS_AS_TS_COUNT", aggregate: "sum"},
                    { field: "EST_AS_TS_AMT", aggregate: "sum"},
                    { field: "EST_AS_TS_COUNT", aggregate: "sum"},
                    { field: "EST_AS_AMT", aggregate: "sum"},
                    { field: "EST_AS_COUNT", aggregate: "sum"},
                    { field: "EST_TS_AMT", aggregate: "sum"},
                    { field: "EST_TS_COUNT", aggregate: "sum"},
                    { field: "GS_EST_AMT", aggregate: "sum"},
                    { field: "GS_EST_COUNT", aggregate: "sum"},
                    { field: "GS_AS_AMT", aggregate: "sum"},
                    { field: "GS_AS_COUNT", aggregate: "sum"},
                    { field: "GS_TS_AMT", aggregate: "sum"},
                    { field: "GS_TS_COUNT", aggregate: "sum"},
                    { field: "AS_TS_AMT", aggregate: "sum"},
                    { field: "AS_TS_COUNT", aggregate: "sum"}
                ]
            }
        }
    }]);

app.factory("deviationReportfactory",function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.getLookupValues = function(id,w){
        w = w || '';
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + (w ? w : '')
        });
    }

    return service;
});