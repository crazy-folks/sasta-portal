app.controller('DeviationReportController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','deviationReportfactory','$q',
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

		$scope.reportTitle = "Deviations Report";

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
				         url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Rounds
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
			$scope.grid.showColumn(2);
			$scope.grid.showColumn(4);
			$scope.grid.showColumn(5);			
			if(state){
				$scope.grid.hideColumn(2);
				$scope.grid.hideColumn(4);
				$scope.grid.hideColumn(5);
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
		        		{ field: "financialYear", groupable:true,width: '130px', title:'FY', footerTemplate: "Total :"},
		        		{ field: "roundName", groupable:true,width: '130px', title:'Round'},
		        		{ field: "districtName", groupable:true,width: '130px', title:'District'},
		        		{ field: "blockName", groupable:true,width: '130px', title:'Block'},
		        		{ field: "vpName", groupable:true,width: '130px', title:'Panchayat'},
		        		{
		        			title : "JC Misused",
		        			columns :[
		        				{ field: "jcMisusedByOthersCount",headerTemplate: "No", title : "JC Misused No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "jcMisusedByOthersAmt",format: '{0:n0}', headerTemplate : "Amount", title : "JC Misused Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        			]
		        		},
		        		{
		        			title : "Payment witout JC",
		        			columns :[
		        				{ field: "wagesPaidWorkersWithoutJcCount",headerTemplate: "No", title : "Payment witout JC No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesPaidWorkersWithoutJcAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Payment witout JC Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        			]
		        		},
		        		{
		        			title : "Wages paid without measurement",
		        			columns :[
		        				{ field: "wagesPaidWithoutRecordMesurementCount",headerTemplate: "No", title : "Wages paid without measurement No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesPaidWithoutRecordMesurementAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid without measurement Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        			]
		        		},
		        		{
		        			title : "Wages paid in excess of M Book",
		        			columns :[
		        				{ field: "wagesPaidExcessMBooksValueCount",headerTemplate: "No", title : "Wages paid in excess of M Book No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesPaidExcessMBooksValueAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid in excess of M Book Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        			]
		        		},
		        		{
		        			title : "Signature Variation NMR and Register I",
		        			columns :[
		        				{ field: "variationsBetweenNMRRegisterCount",headerTemplate: "No", title : "Signature Variation No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "variationsBetweenNMRRegisterAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Signature Variation Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
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
		        			title : "Ineligible Workers",
		        			columns :[
		        				{ field: "inEligibleWorkersIncludeUnder18Count",headerTemplate: "No", title : "Ineligible Workers No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "inEligibleWorkersIncludeUnder18Amt",format: '{0:n0}', headerTemplate : "Amount", title : "Ineligible Workers Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        			]
		        		},
		        		{
		        			title : "Diff online NMR & Physical NMR",
		        			columns :[
		        				{ field: "diffOnlineNMRPhysicalNMRCount",headerTemplate: "No", title : "Diff online NMR & Physical NMR No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "diffOnlineNMRPhysicalNMRAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Diff online NMR & Physical NMR Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
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
		        			title : "FTO Amount more than NMR",
		        			columns :[
		        				{ field: "amountMoreThanNMRFTOCount",headerTemplate: "No", title : "FTO NMR No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "amountMoreThanNMRFTOAmt",format: '{0:n0}', headerTemplate : "Amount", title : "FTO NMR Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
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
	        columnMenu: true,
            reorderable: true,
            resizable: true,	        
	        pageSize: 10,
	        autoBind : false,
            pageable: {
                refresh: true,
                pageSizes: [10, 25, 50, 100, "All"],
                messages: {
					itemsPerPage: "Deviations",
	                display: "{0}-{1} from {2} Deviations",
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
					         url: $scope.crudServiceBaseUrl + '/deviation/deviationsreports',
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
							  asnotProducedForAuditCount: { type: "number" },
							  asnotProducedForAuditAmt: { type: "number" },
							  tsnotProducedForAuditCount: { type: "number" },
							  tsnotProducedForAuditAmt: { type: "number" },
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
							  worksTakenUpWithoutGbApprovalCount: { type: "number" },
							  worksTakenUpWithoutGbApprovalAmt: { type: "number" },
							  estimatesNotProducedForAuditCount: { type: "number" },
							  estimatesNotProducedForAuditAmt: { type: "number" },
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
				            (elem.asnotProducedForAuditAmt||0)+
				            (elem.tsnotProducedForAuditAmt||0)+
				            (elem.wagesPaidWithoutRecordMesurementAmt||0)+
				            (elem.wagesPaidExcessMBooksValueAmt||0)+
				            (elem.variationsBetweenNMRRegisterAmt||0)+
				            (elem.nmroverWritingCorrectionsAmt||0)+
				            (elem.inEligibleWorkersIncludeUnder18Amt||0)+
				            (elem.diffOnlineNMRPhysicalNMRAmt||0)+
				            (elem.mbooksNotProducedForAuditAmt||0)+
				            (elem.worksTakenUpWithoutGbApprovalAmt||0)+
				            (elem.estimatesNotProducedForAuditAmt||0)+
				            (elem.noneAdoptionOfScheduleRateAmt||0)+
				            (elem.wagesPaidWorkersWithoutJcAmt||0);
				            /*Total Count*/
				            elem.totalCount = (elem.jcMisusedByOthersCount||0)+
				            (elem.amountMoreThanNMRFTOCount||0)+
				            (elem.shortageMeasurementsCount||0)+
				            (elem.asnotProducedForAuditCount||0)+
				            (elem.tsnotProducedForAuditCount||0)+
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
				            (elem.worksTakenUpWithoutGbApprovalCount||0)+
				            (elem.estimatesNotProducedForAuditCount||0)+
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
						{ field: "asnotProducedForAuditCount", aggregate: "sum" },
						{ field: "asnotProducedForAuditAmt", aggregate: "sum" },
						{ field: "tsnotProducedForAuditCount", aggregate: "sum" },
						{ field: "tsnotProducedForAuditAmt", aggregate: "sum" },
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
						{ field: "worksTakenUpWithoutGbApprovalCount", aggregate: "sum" },
						{ field: "worksTakenUpWithoutGbApprovalAmt", aggregate: "sum" },
						{ field: "estimatesNotProducedForAuditCount", aggregate: "sum" },
						{ field: "estimatesNotProducedForAuditAmt", aggregate: "sum" },
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
					{ field: "asnotProducedForAuditCount", aggregate: "sum" },
					{ field: "asnotProducedForAuditAmt", aggregate: "sum" },
					{ field: "tsnotProducedForAuditCount", aggregate: "sum" },
					{ field: "tsnotProducedForAuditAmt", aggregate: "sum" },
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
					{ field: "worksTakenUpWithoutGbApprovalCount", aggregate: "sum" },
					{ field: "worksTakenUpWithoutGbApprovalAmt", aggregate: "sum" },
					{ field: "estimatesNotProducedForAuditCount", aggregate: "sum" },
					{ field: "estimatesNotProducedForAuditAmt", aggregate: "sum" },
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