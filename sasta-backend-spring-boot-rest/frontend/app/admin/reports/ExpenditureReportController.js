app.controller('ExpenditureReportController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','expreportfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,expreportfactory,$q){
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
		
		$scope.defaultSearchReq = {
		  "referenceId": null,
		  "roundId": null,
		  "districtId": null,
		  "blockId": null,
		  "villageId": null
		};

		$scope.reportTitle = "Expenditures Report";

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
                fileName: "audit-entries"+new Date().getTime()+".xlsx",
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
		        		{ field: "visitedVillageCount", groupable:false,width: '130px', title:'VP Visited', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        		{ field: "appReceivedCount", groupable:false,width: '130px', title:'Applications', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        		{ field: "attendedAppCount", groupable:false,width: '130px', title:'Attended Exam', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        		{ field: "refreshmentCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Refreshment", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "selectedVrpCount",  groupable:false,width: '130px', title : "VRP's Selected", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        		{ field: "paidedAmount", format: '{0:n0}', groupable:false,width: '180px', title : "Amount Paid To VRP's", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "photographyCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Photography", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "videosCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Video", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "ppleafLets", format: '{0:n0}', groupable:false,width: '130px', title : "Publicity", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "stationary", format: '{0:n0}', groupable:false,width: '110px', title : "Stationary", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ field: "others", format: '{0:n0}', groupable:false,width: '90px', title : "Others", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
		        		{ 
		        			title : "Total Exp",
		        			groupable:false,
		        			width: '150px',
		        			format: '{0:n0}',
		        			field : 'Total', 
		        			aggregates: 'sum',
		        			footerTemplate: "#=kendo.toString(sum,\"n0\")#", 
		        			groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#"
		        		}	
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        sortable: true,
	        columnMenu: true,
            reorderable: true,
            scrollable: true,
            resizable: true,	        
	        pageSize: 10,
	        autoBind : false,
            pageable: {
                refresh: true,
                pageSizes: [10, 25, 50, 100, "All"],
                messages: {
					itemsPerPage: "Expenditures",
	                display: "{0}-{1} from {2} Expenditures",
	                empty: "No data",
	                allPages: "Show All",                	
	                refresh: "Refresh Expenditures"
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
				         url: $scope.crudServiceBaseUrl + '/expenditure/expenditurereports',
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
                            visitedVillageCount: { type: "number" },
                            appReceivedCount: { type: "number" },
                            attendedAppCount: { type: "number" },
                            refreshmentCharges: { type: "number" },
                            selectedVrpCount: { type: "number" },
                            paidedAmount: { type: "number" },
                            photographyCharges: { type: "number" },
                            videosCharges: { type: "number" },
                            ppleafLets: { type: "number" },
                            stationary: { type: "number" },
                            others: { type: "number" }
                        }
                    },
				    parse : function (d) {
				        $.each(d, function(idx, elem) {
				            elem.Total = (elem.refreshmentCharges||0) +
				             (elem.paidedAmount||0)+
				             (elem.photographyCharges||0)+
				             (elem.videosCharges||0)+
				             (elem.ppleafLets||0)+
				             (elem.stationary||0)+
				             (elem.others||0);
				        });
				        return d;
				    }
                },
                group:{
                	field :"roundName",aggregates: [
		                { field: "visitedVillageCount", aggregate: "sum" },
						{ field: "appReceivedCount", aggregate: "sum"},
		        		{ field: "attendedAppCount", aggregate: "sum"},
		        		{ field: "refreshmentCharges", aggregate: "sum"},
		        		{ field: "selectedVrpCount", aggregate: "sum"},
		        		{ field: "paidedAmount", aggregate: "sum"},
		        		{ field: "photographyCharges", aggregate: "sum"},
		        		{ field: "videosCharges", aggregate: "sum"},
		        		{ field: "ppleafLets", aggregate: "sum"},
		        		{ field: "stationary", aggregate: "sum"},
		        		{ field: "others", aggregate: "sum"},
		        		{ field: "Total", aggregate: "sum"}
                    ]
                },
	            aggregate: [
		                { field: "visitedVillageCount", aggregate: "sum" },
						{ field: "appReceivedCount", aggregate: "sum"},
		        		{ field: "attendedAppCount", aggregate: "sum"},
		        		{ field: "refreshmentCharges", aggregate: "sum"},
		        		{ field: "selectedVrpCount", aggregate: "sum"},
		        		{ field: "paidedAmount", aggregate: "sum"},
		        		{ field: "photographyCharges", aggregate: "sum"},
		        		{ field: "videosCharges", aggregate: "sum"},
		        		{ field: "ppleafLets", aggregate: "sum"},
		        		{ field: "stationary", aggregate: "sum"},
		        		{ field: "others", aggregate: "sum"}	,
		        		{ field: "Total", aggregate: "sum"}                
	            ]	           
	        }
	    }
}]);

app.factory("expreportfactory",function($http,$q,$rootScope){

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