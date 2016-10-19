app.controller('DeviationRecordProducedReportsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','deviationReportfactory','$q',
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

        $scope.reportTitle = "Deviation Record Produced Reports";

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
                fileName: "deviations"+new Date().getTime()+".xlsx",
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
                    title : "Job cards misused by others",
                    columns :[
                        { field: "jcMisusedByOthersCount",headerTemplate: "No", title : "Job cards misused by others No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "jcMisusedByOthersAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Job cards misused by others Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Wages paid to workers without job cards",
                    columns :[
                        { field: "wagesPaidWorkersWithoutJcCount",headerTemplate: "No", title : "Wages paid to workers without job cards No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "wagesPaidWorkersWithoutJcAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid to workers without job cards Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Wages paid without recording measurements",
                    columns :[
                        { field: "wagesPaidWithoutRecordMesurementCount",headerTemplate: "No", title : "Wages paid without recording measurements No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "wagesPaidWithoutRecordMesurementAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid without recording measurements Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Wages paid in excess of M-Book value",
                    columns :[
                        { field: "wagesPaidExcessMBooksValueCount",headerTemplate: "No", title : "Wages paid in excess of M-Book value No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "wagesPaidExcessMBooksValueAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid in excess of M-Book value Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Variations in signatures between NMR & Register I",
                    columns :[
                        { field: "variationsBetweenNMRRegisterCount",headerTemplate: "No", title : "Variations in signatures between NMR & Register I No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "variationsBetweenNMRRegisterAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Variations in signatures between NMR & Register I Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "NMR Overwriting",
                    columns :[
                        { field: "nmroverWritingCorrectionsCount",headerTemplate: "No", title : "NMR Overwriting No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "nmroverWritingCorrectionsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "NMR Overwriting Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Ineligible workers including under 18 years",
                    columns :[
                        { field: "inEligibleWorkersIncludeUnder18Count",headerTemplate: "No", title : "Ineligible workers including under 18 years No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "inEligibleWorkersIncludeUnder18Amt",format: '{0:n0}', headerTemplate : "Amount", title : "Ineligible workers including under 18 years Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Difference between online NMR & physical NMR",
                    columns :[
                        { field: "diffOnlineNMRPhysicalNMRCount",headerTemplate: "No", title : "Difference between online NMR & physical NMR No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "diffOnlineNMRPhysicalNMRAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Difference between online NMR & physical NMR Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "WSF Payment from scheme amount",
                    columns :[
                        { field: "wagesPaymentFromSchemeCount",headerTemplate: "No", title : "WSF Payment No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "wagesPaymentFromSchemeAmt",format: '{0:n0}', headerTemplate : "Amount", title : "WSF Payment Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Amount more than NMR in FTO",
                    columns :[
                        { field: "amountMoreThanNMRFTOCount",headerTemplate: "No", title : "Amount more than NMR in FTO No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "amountMoreThanNMRFTOAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Amount more than NMR in FTO Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "NMR Not Produced For Audit",
                    columns :[
                        { field: "nmrnotProducedForAuditCount",headerTemplate: "No", title : "NMR Not Produced For Audit No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "nmrnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "NMR Not Produced For Audit Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "M Books Not Produced For Audit",
                    columns :[
                        { field: "mbooksNotProducedForAuditCount",headerTemplate: "No", title : "M Books Not Produced For Audit No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "mbooksNotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "M Books Not Produced For Audit Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Shortage In Measurements",
                    columns :[
                        { field: "shortageMeasurementsCount",headerTemplate: "No", title : "Shortage In Measurements No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "shortageMeasurementsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Shortage In Measurements Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Non Adoption Of Schedule Of Rate",
                    columns :[
                        { field: "noneAdoptionOfScheduleRateCount",headerTemplate: "No", title : "Non Adoption Of Schedule No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "noneAdoptionOfScheduleRateAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Non Adoption Of Schedule Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
                    ]
                },
                {
                    title : "Total",
                    columns :[
                        { field: "totalCount",headerTemplate: "No", title : "Total Count",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
                        { field: "totalAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Total Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
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
                    itemsPerPage: "Deviations Record Produced",
                    display: "{0}-{1} from {2} Record Produced",
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
                            url: $scope.crudServiceBaseUrl + '/deviation/deviationrecordproducedreports',
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
                            jcMisusedByOthersCount: { type: "number" },
                            jcMisusedByOthersAmt: { type: "number" },
                            wagesPaymentFromSchemeAmt: { type: "number" },
                            amountMoreThanNMRFTOCount: { type: "number" },
                            amountMoreThanNMRFTOAmt: { type: "number" },
                            nmrnotProducedForAuditAmt: { type: "number" },
                            shortageMeasurementsCount: { type: "number" },
                            shortageMeasurementsAmt: { type: "number" },
                            wagesPaidWorkersWithoutJcCount: { type: "number" },
                            wagesPaidWithoutRecordMesurementCount: { type: "number" },
                            wagesPaidWithoutRecordMesurementAmt: { type: "number" },
                            wagesPaidExcessMBooksValueCount: { type: "number" },
                            wagesPaidExcessMBooksValueAmt: { type: "number" },
                            variationsBetweenNMRRegisterCount: { type: "number" },
                            variationsBetweenNMRRegisterAmt: { type: "number" },
                            nmroverWritingCorrectionsCount: { type: "number" },
                            nmroverWritingCorrectionsAmt: { type: "number" },
                            inEligibleWorkersIncludeUnder18Count: { type: "number" },
                            inEligibleWorkersIncludeUnder18Amt: { type: "number" },
                            diffOnlineNMRPhysicalNMRCount: { type: "number" },
                            diffOnlineNMRPhysicalNMRAmt: { type: "number" },
                            wagesPaymentFromSchemeCount: { type: "number" },
                            nmrnotProducedForAuditCount: { type: "number" },
                            mbooksNotProducedForAuditCount: { type: "number" },
                            mbooksNotProducedForAuditAmt: { type: "number" },
                            noneAdoptionOfScheduleRateCount: { type: "number" },
                            noneAdoptionOfScheduleRateAmt: { type: "number" },
                            wagesPaidWorkersWithoutJcAmt: { type: "number" }
                        }
                    },
                    parse : function(d){
                        $.each(d, function(idx, elem) {
                            /*Total Amount*/
                            elem.totalAmount = (elem.jcMisusedByOthersAmt||0)+
                                (elem.wagesPaymentFromSchemeAmt||0)+
                                (elem.amountMoreThanNMRFTOAmt||0)+
                                (elem.nmrnotProducedForAuditAmt||0)+
                                (elem.shortageMeasurementsAmt||0)+
                                (elem.wagesPaidWithoutRecordMesurementAmt||0)+
                                (elem.wagesPaidExcessMBooksValueAmt||0)+
                                (elem.variationsBetweenNMRRegisterAmt||0)+
                                (elem.nmroverWritingCorrectionsAmt||0)+
                                (elem.inEligibleWorkersIncludeUnder18Amt||0)+
                                (elem.diffOnlineNMRPhysicalNMRAmt||0)+
                                (elem.mbooksNotProducedForAuditAmt||0)+
                                (elem.noneAdoptionOfScheduleRateAmt||0)+
                                (elem.wagesPaidWorkersWithoutJcAmt||0);

                            /*Total Count*/
                            elem.totalCount = (elem.jcMisusedByOthersCount||0)+
                                (elem.amountMoreThanNMRFTOCount||0)+
                                (elem.shortageMeasurementsCount||0)+
                                (elem.wagesPaidWorkersWithoutJcCount||0)+
                                (elem.wagesPaidWithoutRecordMesurementCount||0)+
                                (elem.wagesPaidExcessMBooksValueCount||0)+
                                (elem.variationsBetweenNMRRegisterCount||0)+
                                (elem.nmroverWritingCorrectionsCount||0)+
                                (elem.inEligibleWorkersIncludeUnder18Count||0)+
                                (elem.diffOnlineNMRPhysicalNMRCount||0)+
                                (elem.wagesPaymentFromSchemeCount||0)+
                                (elem.nmrnotProducedForAuditCount||0)+
                                (elem.mbooksNotProducedForAuditCount||0)+
                                (elem.noneAdoptionOfScheduleRateCount||0);

                        });
                        return d;
                    }
                },
                group:{
                    field :"roundName",aggregates: [
                        { field: "jcMisusedByOthersCount", aggregate: "sum" },
                        { field: "jcMisusedByOthersAmt", aggregate: "sum" },
                        { field: "wagesPaymentFromSchemeAmt", aggregate: "sum" },
                        { field: "amountMoreThanNMRFTOCount", aggregate: "sum" },
                        { field: "amountMoreThanNMRFTOAmt", aggregate: "sum" },
                        { field: "nmrnotProducedForAuditAmt", aggregate: "sum" },
                        { field: "shortageMeasurementsCount", aggregate: "sum" },
                        { field: "shortageMeasurementsAmt", aggregate: "sum" },
                        { field: "wagesPaidWorkersWithoutJcCount", aggregate: "sum" },
                        { field: "wagesPaidWithoutRecordMesurementCount", aggregate: "sum" },
                        { field: "wagesPaidWithoutRecordMesurementAmt", aggregate: "sum" },
                        { field: "wagesPaidExcessMBooksValueCount", aggregate: "sum" },
                        { field: "wagesPaidExcessMBooksValueAmt", aggregate: "sum" },
                        { field: "variationsBetweenNMRRegisterCount", aggregate: "sum" },
                        { field: "variationsBetweenNMRRegisterAmt", aggregate: "sum" },
                        { field: "nmroverWritingCorrectionsCount", aggregate: "sum" },
                        { field: "nmroverWritingCorrectionsAmt", aggregate: "sum" },
                        { field: "inEligibleWorkersIncludeUnder18Count", aggregate: "sum" },
                        { field: "inEligibleWorkersIncludeUnder18Amt", aggregate: "sum" },
                        { field: "diffOnlineNMRPhysicalNMRCount", aggregate: "sum" },
                        { field: "diffOnlineNMRPhysicalNMRAmt", aggregate: "sum" },
                        { field: "wagesPaymentFromSchemeCount", aggregate: "sum" },
                        { field: "nmrnotProducedForAuditCount", aggregate: "sum" },
                        { field: "mbooksNotProducedForAuditCount", aggregate: "sum" },
                        { field: "mbooksNotProducedForAuditAmt", aggregate: "sum" },
                        { field: "noneAdoptionOfScheduleRateCount", aggregate: "sum" },
                        { field: "noneAdoptionOfScheduleRateAmt", aggregate: "sum" },
                        { field: "wagesPaidWorkersWithoutJcAmt", aggregate: "sum" },
                        { field: "totalCount", aggregate: "sum"},
                        { field: "totalAmount", aggregate: "sum"}
                    ]
                },
                aggregate: [
                    { field: "jcMisusedByOthersCount", aggregate: "sum" },
                    { field: "jcMisusedByOthersAmt", aggregate: "sum" },
                    { field: "wagesPaymentFromSchemeAmt", aggregate: "sum" },
                    { field: "amountMoreThanNMRFTOCount", aggregate: "sum" },
                    { field: "amountMoreThanNMRFTOAmt", aggregate: "sum" },
                    { field: "nmrnotProducedForAuditAmt", aggregate: "sum" },
                    { field: "shortageMeasurementsCount", aggregate: "sum" },
                    { field: "shortageMeasurementsAmt", aggregate: "sum" },
                    { field: "wagesPaidWorkersWithoutJcCount", aggregate: "sum" },
                    { field: "wagesPaidWithoutRecordMesurementCount", aggregate: "sum" },
                    { field: "wagesPaidWithoutRecordMesurementAmt", aggregate: "sum" },
                    { field: "wagesPaidExcessMBooksValueCount", aggregate: "sum" },
                    { field: "wagesPaidExcessMBooksValueAmt", aggregate: "sum" },
                    { field: "variationsBetweenNMRRegisterCount", aggregate: "sum" },
                    { field: "variationsBetweenNMRRegisterAmt", aggregate: "sum" },
                    { field: "nmroverWritingCorrectionsCount", aggregate: "sum" },
                    { field: "nmroverWritingCorrectionsAmt", aggregate: "sum" },
                    { field: "inEligibleWorkersIncludeUnder18Count", aggregate: "sum" },
                    { field: "inEligibleWorkersIncludeUnder18Amt", aggregate: "sum" },
                    { field: "diffOnlineNMRPhysicalNMRCount", aggregate: "sum" },
                    { field: "diffOnlineNMRPhysicalNMRAmt", aggregate: "sum" },
                    { field: "wagesPaymentFromSchemeCount", aggregate: "sum" },
                    { field: "nmrnotProducedForAuditCount", aggregate: "sum" },
                    { field: "mbooksNotProducedForAuditCount", aggregate: "sum" },
                    { field: "mbooksNotProducedForAuditAmt", aggregate: "sum" },
                    { field: "noneAdoptionOfScheduleRateCount", aggregate: "sum" },
                    { field: "noneAdoptionOfScheduleRateAmt", aggregate: "sum" },
                    { field: "wagesPaidWorkersWithoutJcAmt", aggregate: "sum" },
                    { field: "totalCount", aggregate: "sum"},
                    { field: "totalAmount", aggregate: "sum"}
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