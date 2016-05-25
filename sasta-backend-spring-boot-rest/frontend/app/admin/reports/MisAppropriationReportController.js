app.controller('MisAppropriationReportController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','misappropriationReportfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,misappropriationReportfactory,$q){
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
		$scope.defaultSearchReq = {
		  "referenceId": null,
		  "roundId": null,
		  "districtId": null,
		  "blockId": null,
		  "villageId": null
		};

		$scope.reportTitle = "MisAppropriations Report";

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
                fileName: "mis-appropriations"+new Date().getTime()+".xlsx",
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
		        			title : "Mulitple JC",
		        			columns :[
		        				{ field: "multipleJcIssuedWorkersCount",headerTemplate: "No", title : "Mulitple JC No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "multipleJcIssuedWorkersAmt",format: '{0:n0}',headerTemplate : "Amount", title : "Mulitple JC Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to dead",
		        			columns :[
		        				{ field: "wagedToDeadCount",headerTemplate: "No", title : "Wages to dead No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagedToDeadAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to dead Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to non-existent",
		        			columns :[
		        				{ field: "wagesNonExistentCount",headerTemplate: "No", title : "Wages to non-existent No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesNonExistentAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to non-existent Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to migrated",
		        			columns :[
		        				{ field: "wagesMigratedCount",headerTemplate: "No", title : "Wages to migrated No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesMigratedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to migrated Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to wrong account",
		        			columns :[
		        				{ field: "wagesCreditedWrongAccountsCount",headerTemplate: "No", title : "Wages to wrong account No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesCreditedWrongAccountsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to wrong account Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Double Wages",
		        			columns :[
		        				{ field: "doubleWagessCount",headerTemplate: "No", title : "Double Wages No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "doubleWagesAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Double Wages Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to people who didn't work",
		        			columns :[
		        				{ field: "wagesPaidToNotWorkedCount",headerTemplate: "No", title : "Wages to people who didn't work No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesPaidToNotWorkedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to people who didn't work Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Double Wages to WSF",
		        			columns :[
		        				{ field: "doubleWagesWSFCount",headerTemplate: "No", title : "Double Wages to WSF No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "doubleWagesWSFAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Double Wages to WSF Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages same A/C",
		        			columns :[
		        				{ field: "wagesPaidSameAccCount",headerTemplate: "No", title : "Wages same A/C No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesPaidSameAccAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages same A/C Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Bogus names in FTO",
		        			columns :[
		        				{ field: "inclusionBogousFTOCount",headerTemplate: "No", title : "Bogus names in FTO No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "inclusionBogousFTOAmt", headerTemplate : "Amount", title : "Bogus names in FTO Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Tank / Eri",
		        			columns :[
		        				{ field: "missingTanksEriCount",headerTemplate: "No", title : "Missing Tank / Eri No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingTanksEriAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Tank / Eri Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Canals",
		        			columns :[
		        				{ field: "missingCanalCount",headerTemplate: "No", title : "Missing Canals No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingCanalAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Canals Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Roads",
		        			columns :[
		        				{ field: "missingRoadsCount",headerTemplate: "No", title : "Missing Roads No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingRoadsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Roads Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Plantations",
		        			columns :[
		        				{ field: "missingPlantationsCount",headerTemplate: "No", title : "Missing Plantations No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingPlantationsAmt", headerTemplate : "Amount", title : "Missing Plantations Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing IHHLs",
		        			columns :[
		        				{ field: "missingIHHLSCount",headerTemplate: "No", title : "Missing IHHLs No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingIHHLSAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing IHHLs Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Farm Pond",
		        			columns :[
		        				{ field: "missingFarmPondCount",headerTemplate: "No", title : "Missing Farm Pond No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingFarmPondAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Farm Pond Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Cattle shed",
		        			columns :[
		        				{ field: "missingCattleShedCount",headerTemplate: "No", title : "Missing Cattle shed No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingCattleShedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Cattle shed Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing Goat shed",
		        			columns :[
		        				{ field: "missingGoatShedCount",headerTemplate: "No", title : "Missing Goat shed No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingGoatShedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Goat shed Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing poultry",
		        			columns :[
		        				{ field: "missingPoultryCount",headerTemplate: "No", title : "Missing poultry No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingPoultryAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing poultry Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing MGNREGA Component in IAY",
		        			columns :[
		        				{ field: "missingMgnregaComponentIAYCount",headerTemplate: "No", title : "Missing IAY No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingMgnregaComponentIAYAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing IAY Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Missing MGNREGA Component in GH",
		        			columns :[
		        				{ field: "missingMgnregaComponentGHCount",headerTemplate: "No", title : "Missing GH No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "missingMgnregaComponentGHAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing GH Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Misapprop. by VPt President",
		        			columns :[
		        				{ field: "misappropriationByVPTPresidentCount",headerTemplate: "No", title : "Misapprop. by VPt President No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "misappropriationByVPTPresidentAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Misapprop. by VPt President Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Misapprop. by VPt Secretary",
		        			columns :[
		        				{ field: "misappropriationByVPTSecretoryCount",headerTemplate: "No", title : "Misapprop. by VPt Secretary No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "misappropriationByVPTSecretoryAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Misapprop. by VPt Secretary Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Amount Drawn twice same work",
		        			columns :[
		        				{ field: "amountDrawnSameWorkCount",headerTemplate: "No", title : "Amount Drawn twice No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "amountDrawnSameWorkAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Amount Drawn twice Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages to old IHHLs",
		        			columns :[
		        				{ field: "wagesDisbursedPrevConstructedIHHLSCount",headerTemplate: "No", title : "Wages to old IHHLs No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesDisbursedPrevConstructedIHHLSAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to o ldIHHLs Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Bogus entries in FTO",
		        			columns :[
		        				{ field: "bogusEntriesFTOCorretingFluidCount",headerTemplate: "No", title : "Bogus entries in FTO No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "bogusEntriesFTOCorretingFluidAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Bogus entries in FTO Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Machinery",
		        			columns :[
		        				{ field: "machineryUsedCount",headerTemplate: "No", title : "Machinery No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "machineryUsedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Machinery Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Wages more than actual days",
		        			columns :[
		        				{ field: "wagesDrawnMoreThanActualWorkingDayCount",headerTemplate: "No", title : "Wages more than actual days No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "wagesDrawnMoreThanActualWorkingDayAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages more than actual days Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Work by contrators",
		        			columns :[
		        				{ field: "workDoneByContractorsCount",headerTemplate: "No", title : "Work by contrators No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "workDoneByContractorsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Work by contrators Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		},{
		        			title : "Total",
		        			columns :[
		        				{ field: "TotalNo",headerTemplate: "No", title : "No",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        				{ field: "TotalAmt",format: '{0:n0}',headerTemplate : "Amount", title : "Amount",width: '130px', groupable:false, aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" }
		        			]
		        		}
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        sortable: true,
	        columnMenu: true,
            reorderable: true,
            selectable: true,
            resizable: true,	        
	        pageSize: 10,
	        autoBind : false,
            pageable: {
                refresh: true,
                pageSizes: [10, 25, 50, 100, "All"],
                messages: {
					itemsPerPage: "Mis-Appropriations",
	                display: "{0}-{1} from {2} Mis-Appropriations",
	                empty: "No data",
	                allPages: "Show All",                	
	                refresh: "Refresh Mis-Appropriations"
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
				         url: $scope.crudServiceBaseUrl + '/misappropriation/misappropriationsreports',
				         data : JSON.stringify($scope.searchReq),
				         cache : false         
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
						      multipleJcIssuedWorkersAmt: { type: "number" },
						      wagedToDeadCount: { type: "number" },
						      wagedToDeadAmt: { type: "number" },
						      wagesNonExistentCount: { type: "number" },
						      wagesNonExistentAmt: { type: "number" },
						      wagesMigratedCount: { type: "number" },
						      wagesMigratedAmt:  { type: "number" },
						      doubleWagessCount: { type: "number" },
						      doubleWagesAmt: { type: "number" },
						      wagesPaidToNotWorkedCount:  { type: "number" },
						      wagesPaidToNotWorkedAmt:  { type: "number" },
						      doubleWagesWSFCount: { type: "number" },
						      doubleWagesWSFAmt: { type: "number" },
						      wagesPaidSameAccCount: { type: "number" },
						      wagesPaidSameAccAmt: { type: "number" },
						      inclusionBogousFTOCount: { type: "number" },
						      inclusionBogousFTOAmt: { type: "number" },
						      missingTanksEriCount: { type: "number" },
						      missingTanksEriAmt: { type: "number" },
						      missingCanalCount: { type: "number" },
						      missingCanalAmt: { type: "number" },
						      missingRoadsCount: { type: "number" },
						      missingRoadsAmt: { type: "number" },
						      missingPlantationsCount:  { type: "number" },
						      missingPlantationsAmt:  { type: "number" },
						      missingIHHLSCount: { type: "number" },
						      missingIHHLSAmt:  { type: "number" },
						      missingFarmPondCount:  { type: "number" },
						      missingFarmPondAmt:  { type: "number" },
						      missingCattleShedCount: { type: "number" },
						      missingCattleShedAmt: { type: "number" },
						      missingGoatShedCount: { type: "number" },
						      missingGoatShedAmt: { type: "number" },
						      missingPoultryCount: { type: "number" },
						      missingPoultryAmt: { type: "number" },
						      amountDrawnSameWorkCount: { type: "number" },
						      amountDrawnSameWorkAmt: { type: "number" },
						      machineryUsedCount: { type: "number" },
						      machineryUsedAmt: { type: "number" },
						      workDoneByContractorsCount: { type: "number" },
						      workDoneByContractorsAmt: { type: "number" },
						      multipleJcIssuedWorkersCount: { type: "number" },
						      wagesCreditedWrongAccountsCount: { type: "number" },
						      wagesCreditedWrongAccountsAmt: { type: "number" },
						      missingMgnregaComponentIAYCount: { type: "number" },
						      missingMgnregaComponentIAYAmt: { type: "number" },
						      missingMgnregaComponentGHCount: { type: "number" },
						      missingMgnregaComponentGHAmt: { type: "number" },
						      misappropriationByVPTPresidentCount: { type: "number" },
						      misappropriationByVPTPresidentAmt: { type: "number" },
						      misappropriationByVPTSecretoryCount: { type: "number" },
						      misappropriationByVPTSecretoryAmt: { type: "number" },
						      wagesDisbursedPrevConstructedIHHLSCount: { type: "number" },
						      wagesDisbursedPrevConstructedIHHLSAmt: { type: "number" },
						      bogusEntriesFTOCorretingFluidCount: { type: "number" },
						      bogusEntriesFTOCorretingFluidAmt: { type: "number" },
						      wagesDrawnMoreThanActualWorkingDayCount: { type: "number" },
						      wagesDrawnMoreThanActualWorkingDayAmt: { type: "number" },
						      TotalNo: { type: "number" },
						      TotalAmt: { type: "number" }
                        }
                    },
				    parse : function (d) {
				        $.each(d, function(idx, elem) {
				            elem.TotalAmt = (elem.multipleJcIssuedWorkersAmt|| 0 )+
							(elem.wagedToDeadAmt|| 0 )+
							(elem.wagesNonExistentAmt|| 0 )+
							(elem.wagesMigratedAmt|| 0 )+
							(elem.doubleWagesAmt|| 0 )+
							(elem.wagesPaidToNotWorkedAmt|| 0 )+
							(elem.doubleWagesWSFAmt|| 0 )+
							(elem.wagesPaidSameAccAmt|| 0 )+
							(elem.inclusionBogousFTOAmt|| 0 )+
							(elem.missingTanksEriAmt|| 0 )+
							(elem.missingCanalAmt|| 0 )+
							(elem.missingRoadsAmt|| 0 )+
							(elem.missingPlantationsAmt|| 0 )+
							(elem.missingIHHLSAmt|| 0 )+
							(elem.missingFarmPondAmt|| 0 )+
							(elem.missingCattleShedAmt|| 0 )+
							(elem.missingGoatShedAmt|| 0 )+
							(elem.missingPoultryAmt|| 0 )+
							(elem.amountDrawnSameWorkAmt|| 0 )+
							(elem.machineryUsedAmt|| 0 )+
							(elem.workDoneByContractorsAmt|| 0 )+
							(elem.wagesCreditedWrongAccountsAmt|| 0 )+
							(elem.missingMgnregaComponentIAYAmt|| 0 )+
							(elem.missingMgnregaComponentGHAmt|| 0 )+
							(elem.misappropriationByVPTPresidentAmt|| 0 )+
							(elem.misappropriationByVPTSecretoryAmt|| 0 )+
							(elem.wagesDisbursedPrevConstructedIHHLSAmt|| 0 )+
							(elem.bogusEntriesFTOCorretingFluidAmt|| 0 )+
							(elem.wagesDrawnMoreThanActualWorkingDayAmt|| 0 );

						elem.TotalNo =   (elem.wagedToDeadCount|| 0 )+
							  (elem.wagesNonExistentCount|| 0 )+
							  (elem.wagesMigratedCount|| 0 )+
							  (elem.doubleWagessCount|| 0 )+
							  (elem.wagesPaidToNotWorkedCount|| 0 )+
							  (elem.doubleWagesWSFCount|| 0 )+
							  (elem.wagesPaidSameAccCount|| 0 )+
							  (elem.inclusionBogousFTOCount|| 0 )+
							  (elem.missingTanksEriCount|| 0 )+
							  (elem.missingCanalCount|| 0 )+
							  (elem.missingRoadsCount|| 0 )+
							  (elem.missingPlantationsCount|| 0 )+
							  (elem.missingIHHLSCount|| 0 )+
							  (elem.missingFarmPondCount|| 0 )+
							  (elem.missingCattleShedCount|| 0 )+
							  (elem.missingGoatShedCount|| 0 )+
							  (elem.missingPoultryCount|| 0 )+
							  (elem.amountDrawnSameWorkCount|| 0 )+
							  (elem.machineryUsedCount|| 0 )+
							  (elem.workDoneByContractorsCount|| 0 )+
							  (elem.multipleJcIssuedWorkersCount|| 0 )+
							  (elem.wagesCreditedWrongAccountsCount|| 0 )+
							  (elem.missingMgnregaComponentIAYCount|| 0 )+
							  (elem.missingMgnregaComponentGHCount|| 0 )+
							  (elem.misappropriationByVPTPresidentCount|| 0 )+
							  (elem.misappropriationByVPTSecretoryCount|| 0 )+
							  (elem.wagesDisbursedPrevConstructedIHHLSCount|| 0 )+
							  (elem.bogusEntriesFTOCorretingFluidCount|| 0 )+
							  (elem.wagesDrawnMoreThanActualWorkingDayCount|| 0 );
				        });
				        return d;
				    }
                },
                group:{
                	field :"roundName",aggregates: [
						{ field: "multipleJcIssuedWorkersAmt", aggregate: "sum" },
						{ field: "wagedToDeadCount", aggregate: "sum" },
						{ field: "wagedToDeadAmt", aggregate: "sum" },
						{ field: "wagesNonExistentCount", aggregate: "sum" },
						{ field: "wagesNonExistentAmt", aggregate: "sum" },
						{ field: "wagesMigratedCount", aggregate: "sum" },
						{ field: "wagesMigratedAmt", aggregate: "sum" },
						{ field: "doubleWagessCount", aggregate: "sum" },
						{ field: "doubleWagesAmt", aggregate: "sum" },
						{ field: "wagesPaidToNotWorkedCount", aggregate: "sum" },
						{ field: "wagesPaidToNotWorkedAmt", aggregate: "sum" },
						{ field: "doubleWagesWSFCount", aggregate: "sum" },
						{ field: "doubleWagesWSFAmt", aggregate: "sum" },
						{ field: "wagesPaidSameAccCount", aggregate: "sum" },
						{ field: "wagesPaidSameAccAmt", aggregate: "sum" },
						{ field: "inclusionBogousFTOCount", aggregate: "sum" },
						{ field: "inclusionBogousFTOAmt", aggregate: "sum" },
						{ field: "missingTanksEriCount", aggregate: "sum" },
						{ field: "missingTanksEriAmt", aggregate: "sum" },
						{ field: "missingCanalCount", aggregate: "sum" },
						{ field: "missingCanalAmt", aggregate: "sum" },
						{ field: "missingRoadsCount", aggregate: "sum" },
						{ field: "missingRoadsAmt", aggregate: "sum" },
						{ field: "missingPlantationsCount", aggregate: "sum" },
						{ field: "missingPlantationsAmt", aggregate: "sum" },
						{ field: "missingIHHLSCount", aggregate: "sum" },
						{ field: "missingIHHLSAmt", aggregate: "sum" },
						{ field: "missingFarmPondCount", aggregate: "sum" },
						{ field: "missingFarmPondAmt", aggregate: "sum" },
						{ field: "missingCattleShedCount", aggregate: "sum" },
						{ field: "missingCattleShedAmt", aggregate: "sum" },
						{ field: "missingGoatShedCount", aggregate: "sum" },
						{ field: "missingGoatShedAmt", aggregate: "sum" },
						{ field: "missingPoultryCount", aggregate: "sum" },
						{ field: "missingPoultryAmt", aggregate: "sum" },
						{ field: "amountDrawnSameWorkCount", aggregate: "sum" },
						{ field: "amountDrawnSameWorkAmt", aggregate: "sum" },
						{ field: "machineryUsedCount", aggregate: "sum" },
						{ field: "machineryUsedAmt", aggregate: "sum" },
						{ field: "workDoneByContractorsCount", aggregate: "sum" },
						{ field: "workDoneByContractorsAmt", aggregate: "sum" },
						{ field: "multipleJcIssuedWorkersCount", aggregate: "sum" },
						{ field: "wagesCreditedWrongAccountsCount", aggregate: "sum" },
						{ field: "wagesCreditedWrongAccountsAmt", aggregate: "sum" },
						{ field: "missingMgnregaComponentIAYCount", aggregate: "sum" },
						{ field: "missingMgnregaComponentIAYAmt", aggregate: "sum" },
						{ field: "missingMgnregaComponentGHCount", aggregate: "sum" },
						{ field: "missingMgnregaComponentGHAmt", aggregate: "sum" },
						{ field: "misappropriationByVPTPresidentCount", aggregate: "sum" },
						{ field: "misappropriationByVPTPresidentAmt", aggregate: "sum" },
						{ field: "misappropriationByVPTSecretoryCount", aggregate: "sum" },
						{ field: "misappropriationByVPTSecretoryAmt", aggregate: "sum" },
						{ field: "wagesDisbursedPrevConstructedIHHLSCount", aggregate: "sum" },
						{ field: "wagesDisbursedPrevConstructedIHHLSAmt", aggregate: "sum" },
						{ field: "bogusEntriesFTOCorretingFluidCount", aggregate: "sum" },
						{ field: "bogusEntriesFTOCorretingFluidAmt", aggregate: "sum" },
						{ field: "wagesDrawnMoreThanActualWorkingDayCount", aggregate: "sum" },
						{ field: "wagesDrawnMoreThanActualWorkingDayAmt", aggregate: "sum" },
						{ field: "TotalNo", aggregate: "sum" },
						{ field: "TotalAmt", aggregate: "sum" }
                    ]
                },
	            aggregate: [
					{ field: "multipleJcIssuedWorkersAmt", aggregate: "sum" },
					{ field: "wagedToDeadCount", aggregate: "sum" },
					{ field: "wagedToDeadAmt", aggregate: "sum" },
					{ field: "wagesNonExistentCount", aggregate: "sum" },
					{ field: "wagesNonExistentAmt", aggregate: "sum" },
					{ field: "wagesMigratedCount", aggregate: "sum" },
					{ field: "wagesMigratedAmt", aggregate: "sum" },
					{ field: "doubleWagessCount", aggregate: "sum" },
					{ field: "doubleWagesAmt", aggregate: "sum" },
					{ field: "wagesPaidToNotWorkedCount", aggregate: "sum" },
					{ field: "wagesPaidToNotWorkedAmt", aggregate: "sum" },
					{ field: "doubleWagesWSFCount", aggregate: "sum" },
					{ field: "doubleWagesWSFAmt", aggregate: "sum" },
					{ field: "wagesPaidSameAccCount", aggregate: "sum" },
					{ field: "wagesPaidSameAccAmt", aggregate: "sum" },
					{ field: "inclusionBogousFTOCount", aggregate: "sum" },
					{ field: "inclusionBogousFTOAmt", aggregate: "sum" },
					{ field: "missingTanksEriCount", aggregate: "sum" },
					{ field: "missingTanksEriAmt", aggregate: "sum" },
					{ field: "missingCanalCount", aggregate: "sum" },
					{ field: "missingCanalAmt", aggregate: "sum" },
					{ field: "missingRoadsCount", aggregate: "sum" },
					{ field: "missingRoadsAmt", aggregate: "sum" },
					{ field: "missingPlantationsCount", aggregate: "sum" },
					{ field: "missingPlantationsAmt", aggregate: "sum" },
					{ field: "missingIHHLSCount", aggregate: "sum" },
					{ field: "missingIHHLSAmt", aggregate: "sum" },
					{ field: "missingFarmPondCount", aggregate: "sum" },
					{ field: "missingFarmPondAmt", aggregate: "sum" },
					{ field: "missingCattleShedCount", aggregate: "sum" },
					{ field: "missingCattleShedAmt", aggregate: "sum" },
					{ field: "missingGoatShedCount", aggregate: "sum" },
					{ field: "missingGoatShedAmt", aggregate: "sum" },
					{ field: "missingPoultryCount", aggregate: "sum" },
					{ field: "missingPoultryAmt", aggregate: "sum" },
					{ field: "amountDrawnSameWorkCount", aggregate: "sum" },
					{ field: "amountDrawnSameWorkAmt", aggregate: "sum" },
					{ field: "machineryUsedCount", aggregate: "sum" },
					{ field: "machineryUsedAmt", aggregate: "sum" },
					{ field: "workDoneByContractorsCount", aggregate: "sum" },
					{ field: "workDoneByContractorsAmt", aggregate: "sum" },
					{ field: "multipleJcIssuedWorkersCount", aggregate: "sum" },
					{ field: "wagesCreditedWrongAccountsCount", aggregate: "sum" },
					{ field: "wagesCreditedWrongAccountsAmt", aggregate: "sum" },
					{ field: "missingMgnregaComponentIAYCount", aggregate: "sum" },
					{ field: "missingMgnregaComponentIAYAmt", aggregate: "sum" },
					{ field: "missingMgnregaComponentGHCount", aggregate: "sum" },
					{ field: "missingMgnregaComponentGHAmt", aggregate: "sum" },
					{ field: "misappropriationByVPTPresidentCount", aggregate: "sum" },
					{ field: "misappropriationByVPTPresidentAmt", aggregate: "sum" },
					{ field: "misappropriationByVPTSecretoryCount", aggregate: "sum" },
					{ field: "misappropriationByVPTSecretoryAmt", aggregate: "sum" },
					{ field: "wagesDisbursedPrevConstructedIHHLSCount", aggregate: "sum" },
					{ field: "wagesDisbursedPrevConstructedIHHLSAmt", aggregate: "sum" },
					{ field: "bogusEntriesFTOCorretingFluidCount", aggregate: "sum" },
					{ field: "bogusEntriesFTOCorretingFluidAmt", aggregate: "sum" },
					{ field: "wagesDrawnMoreThanActualWorkingDayCount", aggregate: "sum" },
					{ field: "wagesDrawnMoreThanActualWorkingDayAmt", aggregate: "sum" },
					{ field: "TotalNo", aggregate: "sum" },
					{ field: "TotalAmt", aggregate: "sum" }
	            ]	           
	        }
	    }

}]);

app.factory("misappropriationReportfactory",function($http,$q,$rootScope){

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