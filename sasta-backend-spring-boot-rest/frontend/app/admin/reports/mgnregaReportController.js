app.controller('mgnregaReportController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','expreportfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,expreportfactory,$q){
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
		$scope.defaultSearchReq = {
		  "referenceId": null,
		  "roundId": null,
		  "districtId": null,
		  "blockId": null,
		  "villageId": null
		};

		$scope.reportTitle = "MGNREGA Works Report";

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
                fileName: "mgnrega-works-entries"+new Date().getTime()+".xlsx",
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
		        			title : "Completed Works",
		        			headerAttributes : {
		        				style: "text-align: center;"
		        			},
		        			columns:[
								{ field: "totalWorksExecutedDuringFY", groupable:false,width: '150px', title:'Total Works in FY', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "noOfWorksCompleted", groupable:false,width: '150px', title:'No. Completed', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "noOfPendingWorks", groupable:false,width: '150px', title:'No. Pending', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "unskilledWagesForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Unskilled Wages", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "skilledWagesForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Skilled Wages", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "materialExpForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Material Exp", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "administrativeExpForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Admin Exp", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "completedTotalEx",format: '{0:n0}', groupable:false,width: '150px', title : "Completed Total Ex", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "noOfCompletedWorksEvaluatedBySA", groupable:false,width: '150px', title : "No. Evaluated", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "expIncurredForCompletedWorks", groupable:false,width: '150px', title : "Exp. Incurred", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },				        		
				        		{ field: "valueOfCompletedWorksEvaluatedBySATeam", groupable:false,width: '150px', title : "Value By SA", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "completedDiffValue", groupable:false,width: '150px', title : "Completed Diff Value", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
		        			]
		        		},{
		        			title : "On Going Works",
		        			headerAttributes : {
		        				style: "text-align: center;"
		        			},
		        			columns:[
								{ field: "noOfOnGoingWorks", groupable:false,width: '150px',title: "", title: "OnGoing Total Works", headerTemplate:'Total Works', aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "unSkilledWagesForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Unskilled Wages", headerTemplate : "Unskilled Wages", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "skilledWagesForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Skilled Wages", headerTemplate : "Skilled Wages", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "materialExpForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Material Exp", headerTemplate : "Material Exp", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "administrativeExpForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Admin Exp", headerTemplate : "Admin Exp", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "onGoingTotalEx",format: '{0:n0}', groupable:false,width: '150px', title : "On Going Total Ex", aggregates: ["sum"] ,footerTemplate: "#=kendo.toString(sum,\"n0\")#", groupFooterTemplate: "#=kendo.toString(sum,\"n0\")#" },
				        		{ field: "noOfOnGoingWorksEvaluatedBySATeam", groupable:false,width: '150px', title: "OnGoing No. Evaluated", headerTemplate : "No. Evaluated", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "expIncurredForOnGoingWorks", groupable:false,width: '150px', title: "OnGoing Exp. Incurred", headerTemplate : "Exp. Incurred", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },				        		
				        		{ field: "valueOfOnGoingWorksEvaluatedBySATeam", groupable:false,width: '150px', title: "OnGoing Value By SA", headerTemplate : "Value By SA", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
				        		{ field: "onGoingDiffValue", groupable:false,width: '150px', title : "On Going Diff Value", aggregates: ["sum"] ,footerTemplate: "#=sum#", groupFooterTemplate: "#=sum#" },
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
					itemsPerPage: "MGNREGA Works",
	                display: "{0}-{1} from {2} MGNREGA Works",
	                empty: "No data",
	                allPages: "Show All",                	
	                refresh: "Refresh MGNREGA Works"
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
				         url: $scope.crudServiceBaseUrl + '/mgnregaworks/mgnregaworksreports',
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
							unskilledWagesForCompletedWorks: { type: "number" },
							skilledWagesForCompletedWorks: { type: "number" },
							materialExpForCompletedWorks: { type: "number" },
							administrativeExpForCompletedWorks: { type: "number" },
							completedTotalEx : { type: "number" },
							noOfCompletedWorksEvaluatedBySA: { type: "number" },
							expIncurredForCompletedWorks: { type: "number" },
							valueOfCompletedWorksEvaluatedBySATeam: { type: "number" },
							completedDiffValue : { type: "number" },
							unSkilledWagesForOnGoingWorks: { type: "number" },
							skilledWagesForOnGoingWorks: { type: "number" },
							administrativeExpForOnGoingWorks: { type: "number" },
							onGoingTotalEx: { type: "number" },
							noOfOnGoingWorksEvaluatedBySATeam: { type: "number" },
							valueOfOnGoingWorksEvaluatedBySATeam: { type: "number" },
							onGoingDiffValue: { type: "number" },
							totalWorksExecutedDuringFY: { type: "number" },
							noOfWorksCompleted: { type: "number" },
							noOfPendingWorks: { type: "number" },
							noOfOnGoingWorks: { type: "number" },
							materialExpForOnGoingWorks: { type: "number" },
							expIncurredForOnGoingWorks: { type: "number" }
                        }
                    },
				    parse : function (d) {
				        $.each(d, function(idx, elem) {
				            elem.completedTotalEx = ((elem.unskilledWagesForCompletedWorks||0)+
				            	(elem.skilledWagesForCompletedWorks||0)+
				            	(elem.materialExpForCompletedWorks||0)+
				            	(elem.administrativeExpForCompletedWorks||0));
				            elem.completedDiffValue = ((elem.expIncurredForCompletedWorks||0)-
				            	(elem.valueOfCompletedWorksEvaluatedBySATeam||0));
				            elem.onGoingTotalEx = ((elem.unSkilledWagesForOnGoingWorks||0)+
				            	(elem.skilledWagesForOnGoingWorks||0)+
				            	(elem.administrativeExpForOnGoingWorks||0)+
				            	(elem.materialExpForOnGoingWorks||0));
				            elem.onGoingDiffValue = ((elem.expIncurredForOnGoingWorks||0)-
				            	(elem.valueOfOnGoingWorksEvaluatedBySATeam||0));
				        });
				        return d;
				    }
                },
                group:{
                	field :"roundName",aggregates: [
							{ field: "unskilledWagesForCompletedWorks", aggregate: "sum" },
							{ field: "skilledWagesForCompletedWorks", aggregate: "sum" },
							{ field: "materialExpForCompletedWorks", aggregate: "sum" },
							{ field: "administrativeExpForCompletedWorks", aggregate: "sum" },
							{ field: "completedTotalEx", aggregate: "sum" },
							{ field: "noOfCompletedWorksEvaluatedBySA", aggregate: "sum" },
							{ field: "expIncurredForCompletedWorks", aggregate: "sum" },
							{ field: "completedDiffValue", aggregate: "sum" },
							{ field: "valueOfCompletedWorksEvaluatedBySATeam", aggregate: "sum" },
							{ field: "unSkilledWagesForOnGoingWorks", aggregate: "sum" },
							{ field: "skilledWagesForOnGoingWorks", aggregate: "sum" },
							{ field: "administrativeExpForOnGoingWorks", aggregate: "sum" },
							{ field: "onGoingTotalEx", aggregate: "sum" },
							{ field: "noOfOnGoingWorksEvaluatedBySATeam", aggregate: "sum" },
							{ field: "valueOfOnGoingWorksEvaluatedBySATeam", aggregate: "sum" },
							{ field: "onGoingDiffValue", aggregate: "sum" },
							{ field: "totalWorksExecutedDuringFY", aggregate: "sum" },
							{ field: "noOfWorksCompleted", aggregate: "sum" },
							{ field: "noOfPendingWorks", aggregate: "sum" },
							{ field: "noOfOnGoingWorks", aggregate: "sum" },
							{ field: "materialExpForOnGoingWorks", aggregate: "sum" },
							{ field: "expIncurredForOnGoingWorks", aggregate: "sum" }
                    ]
                },
	            aggregate: [
					{ field: "unskilledWagesForCompletedWorks", aggregate: "sum" },
					{ field: "skilledWagesForCompletedWorks", aggregate: "sum" },
					{ field: "materialExpForCompletedWorks", aggregate: "sum" },
					{ field: "administrativeExpForCompletedWorks", aggregate: "sum" },
					{ field: "completedTotalEx", aggregate: "sum" },
					{ field: "noOfCompletedWorksEvaluatedBySA", aggregate: "sum" },
					{ field: "expIncurredForCompletedWorks", aggregate: "sum" },
					{ field: "completedDiffValue", aggregate: "sum" },
					{ field: "valueOfCompletedWorksEvaluatedBySATeam", aggregate: "sum" },
					{ field: "unSkilledWagesForOnGoingWorks", aggregate: "sum" },
					{ field: "skilledWagesForOnGoingWorks", aggregate: "sum" },
					{ field: "administrativeExpForOnGoingWorks", aggregate: "sum" },
					{ field: "onGoingTotalEx", aggregate: "sum" },
					{ field: "noOfOnGoingWorksEvaluatedBySATeam", aggregate: "sum" },
					{ field: "valueOfOnGoingWorksEvaluatedBySATeam", aggregate: "sum" },
					{ field: "onGoingDiffValue", aggregate: "sum" },
					{ field: "totalWorksExecutedDuringFY", aggregate: "sum" },
					{ field: "noOfWorksCompleted", aggregate: "sum" },
					{ field: "noOfPendingWorks", aggregate: "sum" },
					{ field: "noOfOnGoingWorks", aggregate: "sum" },
					{ field: "materialExpForOnGoingWorks", aggregate: "sum" },
					{ field: "expIncurredForOnGoingWorks", aggregate: "sum" }                
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