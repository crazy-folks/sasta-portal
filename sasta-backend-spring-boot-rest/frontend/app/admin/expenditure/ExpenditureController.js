app.controller('ExpenditureController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','expenditurefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,expenditurefactory){

		$scope.aufactory = expenditurefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add Expenditure",
	    	EditAuditTitle : "Edit Expenditure"
	    };

		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];

		// default selected rounds
		$scope.defaultrounds = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultdistricts = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultblocks = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultvillages = {
		    "value": 0,
		    "text": "Select"
		};

        $scope.kaddWindowOptions = {
            content: 'admin/expenditure/add.html',
            title: $scope.modelDialogTitle.AddAuditTitle,
            width : '800px',
            height:'400px',
            iframe: false,
            draggable: true,
            modal: true,
            resizable: true,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function() {
		        $($scope.AddAuditFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditFormName); 
            }
        };

        $scope.AddAuditFormName = '#frmAddAuditExpenditure';
        $scope.EditAuditFormName = '#frmEditAuditExpenditure';    

        $scope.keditWindowOptions = {
            content: 'admin/expenditure/edit.html',
            title: $scope.modelDialogTitle.EditAuditTitle,
            iframe: false,
            width : '800px',
            height:'400px',            
            draggable: true,
            modal: true,
            resizable: false,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function(){
		        $($scope.EditAuditFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditFormName);            	
            }
        };

        $scope.OpenAuditWindow = function($event){
        	$scope.addAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
            GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	$scope.addAuditWindow.center().open();
        	});
        }

        $scope.CloseAuditWindow  = function(){
            $scope.addAuditWindow.close();
            $scope.doReset();
            $scope.addjQueryValidator.doReset();
        }

        $scope.OpenEditAuditWindow = function(){
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editAuditWindow.center().open();
        }

        $scope.CloseEditAuditWindow = function(){
            $scope.editAuditWindow.close();
			$scope.doReset();
            $scope.editjQueryValidator.doReset();            
        }

        $scope.doReset = function(){
        	$scope.expenditure = angular.copy($scope.defaultOptions);
        	$scope.editexpenditure =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
	      "id" :  null,
			"stationary" :  null,
			"others" :  null,
			"createdByName" :  null,
			"modifiedByName" :  null,
			"createdDate" :  null,
			"auditDistrictId" :  null,
			"modifiedDate" :  null,
			"financialDescription" :  null,
			"financialYear" :  null,
			"status" :  null,
			"roundDescription" :  null,
			"districtName" :  null,
			"roundStartDate" :  null,
			"roundEndDate" :  null,
			"appReceivedCount" :  null,
			"attendedAppCount" :  null,
			"refreshmentCharges" :  null,
			"selectedVrpCount" :  null,
			"photographyCharges" :  null,
			"paidedAmount" :  null,
			"visitedVillageCount" :  null,
			"videosCharges" :  null,
			"createdBy" :  null,
			"roundId" :  null,
			"roundName" :  null,
			"vpName" :  null,
			"modifiedBy" :  null,
			"blockName" :  null,
			"auditId" :  1,
			"blockId" :  null,
			"vpId" :  null,
			"ppleafLets" :  null
	    };

	    $scope.expenditure = {
	      	"id" :  null,
			"stationary" :  null,
			"others" :  null,
			"createdByName" :  null,
			"modifiedByName" :  null,
			"createdDate" :  null,
			"auditDistrictId" :  null,
			"modifiedDate" :  null,
			"financialDescription" :  null,
			"financialYear" :  null,
			"status" :  null,
			"roundDescription" :  null,
			"districtName" :  null,
			"roundStartDate" :  null,
			"roundEndDate" :  null,
			"appReceivedCount" :  null,
			"attendedAppCount" :  null,
			"refreshmentCharges" :  null,
			"selectedVrpCount" :  null,
			"photographyCharges" :  null,
			"paidedAmount" :  null,
			"visitedVillageCount" :  null,
			"videosCharges" :  null,
			"createdBy" :  null,
			"roundId" :  null,
			"roundName" :  null,
			"vpName" :  null,
			"modifiedBy" :  null,
			"blockName" :  null,
			"auditId" :  1,
			"blockId" :  null,
			"vpId" :  null,
			"ppleafLets" :  null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.expenditure.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = expenditurefactory.doSubmitData($scope.expenditure);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
			      	   $scope.grid.dataSource.read();
				       $scope.grid.dataSource.fetch();
						$scope.CloseAuditWindow();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add audit!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add audit!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editexpenditure = {
					id : data.id,
					stationary : data.stationary,
					others : data.others,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					modifiedDate : data.modifiedDate,
					financialDescription : data.financialDescription,
					financialYear : data.financialYear,
					status : false,
					roundDescription : data.roundDescription,
					districtName : data.districtName,
					roundStartDate : data.roundStartDate,
					roundEndDate : data.roundEndDate,
					appReceivedCount : data.appReceivedCount,
					attendedAppCount : data.attendedAppCount,
					refreshmentCharges : data.refreshmentCharges,
					selectedVrpCount : data.selectedVrpCount,
					photographyCharges : data.photographyCharges,
					paidedAmount : data.paidedAmount,
					visitedVillageCount : data.visitedVillageCount,
					videosCharges : data.videosCharges,
					createdBy : data.createdBy,
					roundId : data.roundId,
					roundName : data.roundName,
					vpName : data.vpName,
					modifiedBy : data.modifiedBy,
					blockName : data.blockName,
					auditId : data.auditId,
					blockId : data.blockId,
					vpId : data.vpId,
					ppleafLets : data.ppleafLets

		    	};
		    	DoUpdate();
	    	}
	    }


	    function DoUpdate(){
	    	var responseText = expenditurefactory.doUpdateData($scope.editexpenditure);
			responseText.success(function(result){
				if(result.status){
			  		notify({
			            messageTemplate: '<span>'+result.data+'</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });							
					// scope.grid is the widget reference
		      	    $scope.grid.dataSource.read();
			        $scope.grid.dataSource.fetch();
					$scope.CloseEditAuditWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update audit!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update audit!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
				$scope.editexpenditure.modifiedBy = $rootScope.sessionConfig.userId;
				DoUpdate();
			}
	    }

	    $scope.EditData = function(data){

	    	var r = jQuery.map( $scope.rounds, function( n, i ) {
				if(data.roundId === n.value)
			  		return n;
			});

			if(r instanceof Array){
				$scope.editdefaultrounds =  r[0];
			}else{
				$scope.editdefaultrounds = $scope.defaultrounds;
			}

			var d = jQuery.map( $scope.districts, function( n, i ) {
				if(data.auditDistrictId === n.value)
			  		return n;
			});	

			if(d instanceof Array){
				$scope.editdefaultdistricts =  d[0];
			}else{
				$scope.editdefaultdistricts = $scope.defaultdistricts;
			}

			var b = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});

			if(b instanceof Array){
				$scope.editdefaultblocks =  b[0];
			}else{
				$scope.editdefaultblocks = $scope.defaultblocks;
			}

			var v = jQuery.map( $scope.villages, function( n, i ) {
				if(data.villagePanchayatId === n.value)
			  		return n;
			});

			if(v instanceof Array){
				$scope.editdefaultvillages =  v[0];
			}else{
				$scope.editdefaultvillages = $scope.defaultvillages;
			}

	    	$scope.editexpenditure = {
				id : data.id,
				stationary : data.stationary,
				others : data.others,
				createdByName : data.createdByName,
				modifiedByName : data.modifiedByName,
				createdDate : data.createdDate,
				auditDistrictId : data.auditDistrictId,
				modifiedDate : data.modifiedDate,
				financialDescription : data.financialDescription,
				financialYear : data.financialYear,
				status : data.status,
				roundDescription : data.roundDescription,
				districtName : data.districtName,
				roundStartDate : data.roundStartDate,
				roundEndDate : data.roundEndDate,
				appReceivedCount : data.appReceivedCount,
				attendedAppCount : data.attendedAppCount,
				refreshmentCharges : data.refreshmentCharges,
				selectedVrpCount : data.selectedVrpCount,
				photographyCharges : data.photographyCharges,
				paidedAmount : data.paidedAmount,
				visitedVillageCount : data.visitedVillageCount,
				videosCharges : data.videosCharges,
				createdBy : data.createdBy,
				roundId : data.roundId,
				roundName : data.roundName,
				vpName : data.vpName,
				modifiedBy : data.modifiedBy,
				blockName : data.blockName,
				auditId : data.auditId,
				blockId : data.blockId,
				vpId : data.vpId,
				ppleafLets : data.ppleafLets

	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
		        		{ field: "financialYear", groupable:true,width: '130px', title:'FY'},
		        		{ field: "roundName", groupable:true,width: '130px', title:'Round'},
		        		{ field: "districtName", groupable:true,width: '130px', title:'District'},
		        		{ field: "blockName", groupable:true,width: '130px', title:'Block'},
		        		{ field: "vpName", groupable:true,width: '130px', title:'Panchayat'},
		        		{ field: "visitedVillageCount", groupable:false,width: '130px', title:'VP Visited'},
		        		{ field: "appReceivedCount", groupable:false,width: '130px', title:'Applications'},
		        		{ field: "attendedAppCount", groupable:false,width: '130px', title:'Attended Exam'},
		        		{ field: "refreshmentCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Refreshment"},
		        		{ field: "selectedVrpCount", groupable:false,width: '130px', title : "VRP's Selected"},
		        		{ field: "paidedAmount",format: '{0:n0}', groupable:false,width: '180px', title : "Amount Paid To VRP's"},
		        		{ field: "photographyCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Photography" },
		        		{ field: "videosCharges",format: '{0:n0}', groupable:false,width: '130px', title : "Video"},
		        		{ field: "ppleafLets",format: '{0:n0}', groupable:false,width: '130px', title : "Publicity"},
		        		{ field: "stationary",format: '{0:n0}', groupable:false,width: '110px', title : "Stationary"},
		        		{ field: "others",format: '{0:n0}', groupable:false,width: '90px', title : "Others"},
		        		{ 
		        			title : "Total Exp", 
		        			groupable:false,
		        			width: '150px',
		        			format: '{0:n0}',
		        			field : 'Total'
		        		},		        		
		        		{
 							title : "",
		                    width: '30px',
		                    template: kendo.template($("#toggle-template").html())
		                }
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        pageSize: 30,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 30],
                messages: {
                    refresh: "Refresh Expenditures"
                }
            },
	        dataSource: {
	        	pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var baseUrl = $scope.crudServiceBaseUrl + 
	                	'/expenditure/getlist?key='+encodeURIComponent($location.search().aid);
	                	if($.inArray($rootScope.sessionConfig.userGroupId, $rootScope.appConfig.blockLevelGroups)>-1){
	                		baseUrl = baseUrl + '&userid='+$rootScope.sessionConfig.userId;
	                	}	                	
	                  $http({
				         method: 'GET',
				         url: baseUrl,
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
                }
	        }
	    }

	    function GetAudit(id,type){
	    	var deffered = jQuery.Deferred();
	    	expenditurefactory.getAudit(id).success(function(result){
		    		$scope.expenditure.auditId = result.data.auditId;
		    		$scope.expenditure.roundId = result.data.roundId;
			    	$scope.expenditure.auditDistrictId = result.data.auditDistrictId;
			    	$scope.expenditure.blockId = result.data.auditBlockId;
			    	$scope.expenditure.vpId = result.data.villagePanchayatId;
		  		return deffered.resolve('Ok');
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
			return deffered.promise();
	    }

	    function GetLookupValues(type){
	    	expenditurefactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					if(type==13){
						$scope.rounds.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.rounds.push(result[i]);
						}	
					}
					else if(type==2)
					{
						$scope.districts.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.districts.push(result[i]);
						}	
					}
					else if(type==1)
					{
						$scope.blocks.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.blocks.push(result[i]);
						}	
					}
					else if(type==14)
					{
						$scope.villages.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.villages.push(result[i]);
						}	
					}
										
		  		}else{
		  			notify({
			            messageTemplate: '<span>Unable to read look up values!!!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
		        	});
		  		}
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
		}

		$scope.OnBack = function(){
			$state.go('entries.audit',
			{
				fyid: $location.search().fyid||null,
				round: $location.search().round||null,
				districtId: $location.search().districtId||null,
				blockId: $location.search().blockId||null,
				villageId: $location.search().villageId||null,
				userId: $location.search().userId||null
			});
		}
}]);

app.factory('expenditurefactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/expenditure/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
        });
	}

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
            url : crudServiceBaseUrl + '/expenditure/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});