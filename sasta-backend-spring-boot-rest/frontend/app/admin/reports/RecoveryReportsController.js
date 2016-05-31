 app.controller('RecoveryReportsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','recoveryreportfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,recoveryreportfactory,$q){
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
		$scope.defaultSearchReq = {
		  "referenceId": null,
		  "roundId": null,
		  "districtId": null,
		  "blockId": null,
		  "villageId": null
		};

		$scope.reportTitle = "Recovery Report";

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
		}


	    $scope.gridOptions = {
			toolbar: ["excel"],
			excel: {
                fileName: "recovery-entries"+new Date().getTime()+".xlsx",
                proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
                allPages: true
            },	    	
          columns: [ 
                { field: "id", title:'Id', menu:false, hidden: true, editable : false },
                { field: "financialYear", locked: true, groupable:true,width: '80px', title:'FY'},
                { field: "roundName", locked: true, groupable:true,width: '90px', title:'Round'},
                { field: "districtName", locked: true, groupable:true,width: '90px', title:'District'},
                { field: "blockName", locked: true, groupable:true,width: '90px', title:'Block'},
                { field: "vpName", locked: true, groupable:true,width: '100px', title:'Panchayat'},
                {
                  title : "Total No of paras",
                  columns :[
                    { field: "parasCount",headerTemplate: "No", title : "Paras No",width: '130px', groupable:false  },
                    { field: "parasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Paras Amount",width: '130px', groupable:false },
                  ]
                },
                {
                  title : "No of paras setteled in GS",
                  columns :[
                    { field: "settledParasGsCount",headerTemplate: "No", title : "Paras setteled in GS No",width: '130px', groupable:false  },
                    { field: "settledParasGsAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Paras setteled in GS Amount",width: '130px', groupable:false },
                  ]
                },
                { field: "recoveredAmount", title : "Amount Recovered In GS ", groupable:false,width: '130px'  },
                {
                  title : "Paras Setteled So Far",
                  columns :[
                    { field: "setteledParasCount",headerTemplate: "No", title : "Settled Paras No",width: '130px', groupable:false  },
                    { field: "setteledParasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Settled Paras Amount",width: '130px', groupable:false },
                  ]
                }, 
                {
                  title : "Pending Paras",
                  columns :[
                    { field: "pendingParasCount",headerTemplate: "No", title : "Pending Paras Count",width: '130px', groupable:false  },
                    { field: "pendingParasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Pending Paras Amount",width: '130px', groupable:false },
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
					itemsPerPage: "Special Grama Sabha",
	                display: "{0}-{1} from {2} Special Grama Sabha's",
	                empty: "No data",
	                allPages: "Show All",                	
	                refresh: "Refresh Special Grama Sabha"
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
				         url: $scope.crudServiceBaseUrl + '/recovery/recoveryreports',
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
	           }/*,
				schema:{
                    model: {
                        fields: {
                            nameOfPersonRecordedMinutes: { type: "string" },
                            totalPopulation: { type: "number" },
                            totalFamiliesInVpts: { type: "number" },
                            noOfFamiliesRegistered: { type: "number" },
                            totalJcsInVpts: { type: "number" },
                            noOfPplAttentedSgs: { type: "number" },
                            nameOfPersonHeadSgs: { type: "string" },
                            totalParasPlacedInSgs: { type: "number" },
                            parasSetteled: { type: "number" },
                            saReportsUploaded: { type: "boolean" },
                            atrsUploaded: { type: "boolean" }
                        }
                    }
                },
                group:{
                	field :"roundName",aggregates: [
		                { field: "totalPopulation", aggregate: "sum" },
						{ field: "totalFamiliesInVpts", aggregate: "sum"},
		        		{ field: "noOfFamiliesRegistered", aggregate: "sum"},
		        		{ field: "totalJcsInVpts", aggregate: "sum"},
		        		{ field: "noOfPplAttentedSgs", aggregate: "sum"},
		        		{ field: "totalParasPlacedInSgs", aggregate: "sum"},
		        		{ field: "parasSetteled", aggregate: "sum"},
		        		{ field: "amountRecoveredDuringSgs", aggregate: "sum"}
                    ]
                },
	            aggregate: [
		                { field: "totalPopulation", aggregate: "sum" },
						{ field: "totalFamiliesInVpts", aggregate: "sum"},
		        		{ field: "noOfFamiliesRegistered", aggregate: "sum"},
		        		{ field: "totalJcsInVpts", aggregate: "sum"},
		        		{ field: "noOfPplAttentedSgs", aggregate: "sum"},
		        		{ field: "totalParasPlacedInSgs", aggregate: "sum"},
		        		{ field: "parasSetteled", aggregate: "sum"},
		        		{ field: "amountRecoveredDuringSgs", aggregate: "sum"}                
	            ]*/	           
	        }
	    }

}]);

app.factory("recoveryreportfactory",function($http,$q,$rootScope){

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