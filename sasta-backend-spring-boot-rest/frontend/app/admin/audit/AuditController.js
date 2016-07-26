app.controller('AuditController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','auditfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,auditfactory){

		$scope.aufactory = auditfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;

		$scope.dateOptions = {
		    format: 'yyyy-MM-dd'
		};

	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add Audit",
	    	EditAuditTitle : "Edit Audit"
	    };

	    $scope.fy = [];
		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];
		$scope.emptyLsit = [];

		$scope.defaultdpOptions = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected financial years
		$scope.defaultfy = angular.copy($scope.defaultdpOptions);

		// default selected rounds
		$scope.defaultrounds = angular.copy($scope.defaultdpOptions);

		// default selected rounds
		$scope.defaultdistricts = angular.copy($scope.defaultdpOptions);

		// default selected rounds
		$scope.defaultblocks = angular.copy($scope.defaultdpOptions);

		// default selected rounds
		$scope.defaultvillages = angular.copy($scope.defaultdpOptions);

		$scope.kaddWindowOptions = {
	        content: 'admin/audit/add.html',
	        title: $scope.modelDialogTitle.AddAuditTitle,
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
		        $scope.jQueryAddAuditValidator = new Validator($scope.AddAuditFormName); 
	        }
	    };

	    $scope.jQueryAddAuditValidator = null;
	    $scope.jQueryEditAuditValidator = null;
	    $scope.AddAuditFormName = '#frmAddAudit';
	    $scope.EditAuditFormName = '#frmEditAudit';    

	    $scope.keditWindowOptions = {
	        content: 'admin/audit/edit.html',
	        title: $scope.modelDialogTitle.EditAuditTitle,
	        iframe: false,
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
		        $scope.jQueryEditAuditValidator = new Validator($scope.EditAuditFormName);            	
	        }
	    };

	    $scope.OpenAuditWindow = function($event){
			$scope.fy = angular.copy($scope.emptyLsit);
			GetLookupValues($rootScope.appConfig.lookupTypes.FinancialYear)
			.done(function(result){	
				//$scope.defaultfy = angular.copy($scope.defaultdpOptions);			
	    	});
	    	$scope.addAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");	    	
	        $scope.addAuditWindow.center().open();
	    }

	    $scope.CloseAuditWindow  = function(){
	        $scope.doReset();
	        $scope.jQueryAddAuditValidator.doReset();
	        $scope.addAuditWindow.close();
	    }

	    $scope.OpenEditAuditWindow = function(){
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
	        $scope.editAuditWindow.center().open();
	    }

	    $scope.CloseEditAuditWindow = function(){
	        $scope.editAuditWindow.close();
	        $scope.doReset();
	        $scope.jQueryEditAuditValidator.doReset();
	    }

	    $scope.doReset = function(){
	    	$scope.audit = angular.copy($scope.defaultOptions);
	    	$scope.editaudit =  angular.copy($scope.defaultOptions);

			// default selected financial years
			$scope.defaultfy = angular.copy($scope.defaultdpOptions);

			// default selected rounds
			$scope.defaultrounds = angular.copy($scope.defaultdpOptions);

			// default selected rounds
			$scope.defaultdistricts = angular.copy($scope.defaultdpOptions);

			// default selected rounds
			$scope.defaultblocks = angular.copy($scope.defaultdpOptions);

			// default selected rounds
			$scope.defaultvillages = angular.copy($scope.defaultdpOptions);

	    	$scope.villages = angular.copy($scope.emptyLsit);
	    	$scope.districts = angular.copy($scope.emptyLsit);
	    	$scope.rounds = angular.copy($scope.emptyLsit);
	    	$scope.blocks = angular.copy($scope.emptyLsit);
	    	$scope.fy = angular.copy($scope.emptyLsit);
	    }

		$scope.OnFinancialYearSelectionChanged = function(selection){
			if(selection){
				$scope.defaultfy = selection;
				$scope.rounds = angular.copy($scope.emptyLsit);
				GetLookupValues($rootScope.appConfig.lookupTypes.Rounds,
					selection.value).done(function(result){
					$scope.defaultrounds = angular.copy($scope.defaultdpOptions);
		    	});				
			}
		}

		$scope.OnRoundSelectedValue = function(selection){
			if(selection){
				$scope.defaultrounds = selection;
				$scope.districts = angular.copy($scope.emptyLsit);
				GetLookupValues($rootScope.appConfig.lookupTypes.Districts)
				.done(function(result){
					$scope.defaultdistricts = angular.copy($scope.defaultdpOptions);
		    	});
			}
		}

	    $scope.OnDistrictsSelectedValue = function(defaultdistricts){
	    	if(defaultdistricts){
	    		$scope.defaultdistricts = defaultdistricts;
		    	$scope.blocks = angular.copy($scope.emptyLsit);
		    	GetLookupValues($rootScope.appConfig.lookupTypes.Blocks,
		    		defaultdistricts.value).done(function(result){
					$scope.defaultblocks = angular.copy($scope.defaultdpOptions);
		    	});
	    	}
	    }

	    $scope.OnBlocksSelectedValue = function(defaultblocks){
	    	$scope.villages= angular.copy($scope.emptyLsit);
	    	defaultblocks&&(($scope.defaultblocks = defaultblocks),
	    	GetLookupValues(14,defaultblocks.value).done(function(result){
	    		$scope.defaultvillages = angular.copy($scope.defaultdpOptions);
	    	}));
	    }

	    $scope.OnVillagesSelectedValue = function(defaultvillages){
	    	$scope.defaultvillages = defaultvillages;
	    }

	    $scope.OnEditRoundSelectedValue = function(editdefaultrounds){
	    	$scope.editdefaultrounds = editdefaultrounds;
	    }

	    $scope.OnEditDistrictsSelectedValue = function(editdefaultdistricts){
	    	$scope.blocks = [];
	    	editdefaultdistricts&&(
	    	GetLookupValues(1,editdefaultdistricts.value).done(function(result){
	    		$scope.editdefaultdistricts = editdefaultdistricts;
	    	}));
	    }

	    $scope.OnEditBlocksSelectedValue = function(editdefaultblocks){
	    	$scope.villages=[];
	    	editdefaultblocks&&(
	    	GetLookupValues(14,editdefaultblocks.value).done(function(result){
	    		$scope.editdefaultblocks = editdefaultblocks;
	    	}));
	    }

	    $scope.OnEditVillagesSelectedValue = function(editdefaultvillages){
	    	$scope.editdefaultvillages = editdefaultvillages;
	    }

	    $scope.defaultOptions =  {
		  "key": "",
		  "status": true,
		  "gramaSabhaDate": "",
		  "auditDistrictId": null,
		  "auditBlockId": null,
		  "villagePanchayatId": null,
		  "createdDate": null,
		  "roundId": null,
		  "startDate": "2016-01-05T22:23:28.513Z",
		  "createdBy": $rootScope.sessionConfig.userId,
		  "auditId":  0,
		  "modifiedBy":  $rootScope.sessionConfig.userId,
		  "blockName":  null,
		  "modifiedDate": null,
		  "createdByName":  null,
		  "modifiedByName":  null,
		  "financialDescription":  null,
		  "financialYear":  null,
		  "roundDescription":  null,
		  "districtName":  null,
		  "roundName":  null,
		  "endDate": "2016-01-05T22:23:28.513Z",
		  "vpName":  null
		};

	    $scope.audit = {
		  "key": "",
		  "status": true,
		  "gramaSabhaDate": "",
		  "auditDistrictId": null,
		  "auditBlockId": null,
		  "villagePanchayatId": null,
		  "createdDate": null,
		  "roundId": null,
		  "startDate": "2016-01-05T22:23:28.513Z",
		  "createdBy": $rootScope.sessionConfig.userId,
		  "auditId":  0,
		  "modifiedBy":  $rootScope.sessionConfig.userId,
		  "blockName":  null,
		  "modifiedDate": null,
		  "createdByName":  null,
		  "modifiedByName":  null,
		  "financialDescription":  null,
		  "financialYear":  null,
		  "roundDescription":  null,
		  "districtName":  null,
		  "roundName":  null,
		  "endDate": "2016-01-05T22:23:28.513Z",
		  "vpName":  null
		};

	    $scope.Submit = function(){
		    if($scope.jQueryAddAuditValidator.doValidate()){
		       $scope.audit.roundId = $scope.defaultrounds.value;
		       $scope.audit.auditDistrictId = $scope.defaultdistricts.value;
		       $scope.audit.auditBlockId = $scope.defaultblocks.value;
		       $scope.audit.villagePanchayatId = $scope.defaultvillages.value;
		       $scope.audit.createdBy = $rootScope.sessionConfig.userId;
		       var auditEntry = auditfactory.getAudit($scope.audit.roundId,$scope.audit.auditDistrictId,$scope.audit.auditBlockId,$scope.audit.villagePanchayatId);
		       auditEntry.success(function(r){
			       	if(r!=null){
			       		if(!r.status){
					       var responseText = auditfactory.doSubmitData($scope.audit);
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
							               messageTemplate: '<span>Unable to process your request!</span>',
							               position: $rootScope.appConfig.notifyConfig.position,
							               scope:$scope
							        });						    	
						    });
			       		}else{
				       		notify({
				               messageTemplate: '<span>'+r.data+'!</span>',
				               position: $rootScope.appConfig.notifyConfig.position,
				               scope:$scope
				           });
			       		}
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

		function DoUpdate(){
	       var responseText = auditfactory.doUpdateData($scope.editaudit);
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
		   if($scope.jQueryEditAuditValidator.doValidate()){
		       $scope.editaudit.roundId = $scope.editdefaultrounds.value;
		       $scope.editaudit.auditDistrictId = $scope.editdefaultdistricts.value;
		       $scope.editaudit.auditBlockId = $scope.editdefaultblocks.value;
		       $scope.editaudit.villagePanchayatId = $scope.editdefaultvillages.value;
		    
		       $scope.editaudit.startDate = null;
		       $scope.editaudit.endDate = null ;
		       $scope.editaudit.modifiedBy = $rootScope.sessionConfig.userId;
		       DoUpdate();    
			}
	    }

    	$scope.VrpData = function(data){
			$state.go('entries.vrp',
			{
				aid:data.key,
				fyid: $scope.searchReq.referenceId||null,
				round: $scope.searchReq.roundId||null,
				districtId: $scope.searchReq.districtId||null,
				blockId: $scope.searchReq.blockId||null,
				villageId: $scope.searchReq.villageId||null,
				userId: $scope.searchReq.userId||null
			});
    	}

		$scope.Galleries = function(data){
			$state.go('entries.galleries',{aid:data.auditId});
		}

    	$scope.ExpenData = function(data){
			$state.go('entries.expenditure',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.DeviationData = function(data){
			$state.go('entries.deviation',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.GrievanceData = function(data){
			$state.go('entries.grievance',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.MissappropriationData = function(data){
			$state.go('entries.misappropriation',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.MgnregaData = function(data){
			$state.go('entries.mgnrega',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.HlcommitteeData = function(data){
			$state.go('entries.hlcommittee',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}

    	$scope.sgm = function(data){
			$state.go('entries.sgm',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}    	

    	$scope.recovery = function(data){
			$state.go('entries.recovery',
				{
					aid:data.key,
					fyid: $scope.searchReq.referenceId||null,
					round: $scope.searchReq.roundId||null,
					districtId: $scope.searchReq.districtId||null,
					blockId: $scope.searchReq.blockId||null,
					villageId: $scope.searchReq.villageId||null,
					userId: $scope.searchReq.userId||null
				});
    	}  

	    $scope.EditData = function(data){
	    	$scope.editaudit = angular.copy($scope.defaultOptions);
	    	$scope.editdefaultblocks = angular.copy($scope.defaultdpOptions);;
	    	$scope.editdefaultrounds = angular.copy($scope.defaultdpOptions);;
	    	$scope.editdefaultdistricts = angular.copy($scope.defaultdpOptions);;
	    	$scope.editdefaultvillages = angular.copy($scope.defaultdpOptions);;
	    	$scope.editfy = angular.copy($scope.defaultdpOptions);;
	    	$scope.blocks = [];	    	

  			GetLookupValues($rootScope.appConfig.lookupTypes.FinancialYear).done(function(result){
		    	var r = jQuery.map( $scope.fy, function( n, i ) {
					if(data.financialId === n.value)
				  		return n;
				});

				if(r instanceof Array){
					$scope.editfy =  r[0];
				}else{
					$scope.editfy = $scope.defaultfy;
				}	  	    		
	    	});
			
  			GetLookupValues($rootScope.appConfig.lookupTypes.Rounds,
  				($rootScope.appConfig.lookupTypes.FinancialYear||0)).done(function(result){
		    	var r = jQuery.map( $scope.rounds, function( n, i ) {
					if(data.roundId === n.value)
				  		return n;
				});

				if(r instanceof Array){
					$scope.editdefaultrounds =  r[0];
				}else{
					$scope.editdefaultrounds = $scope.defaultrounds;
				}	  	    		
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Districts).done(function(result){
				var d = jQuery.map( $scope.districts, function( n, i ) {
					if(data.auditDistrictId === n.value)
				  		return n;
				});	  

				if(d instanceof Array){
					$scope.editdefaultdistricts =  d[0];
				}else{
					$scope.editdefaultdistricts = $scope.defaultdistricts;
				}			    		
	    	});
	   

			GetLookupValues($rootScope.appConfig.lookupTypes.Blocks,
				data.auditDistrictId).done(function(result){
				var b = jQuery.map( $scope.blocks, function( n, i ) {
					if(data.auditBlockId === n.value)
				  		return n;
				});

				if(b instanceof Array){
					$scope.editdefaultblocks =  b[0];
				}else{
					$scope.editdefaultblocks = $scope.defaultblocks;
				}		    		
	    	});
	   

			GetLookupValues($rootScope.appConfig.lookupTypes.VillagePanchayats,
				data.auditBlockId).done(function(result){
				var v = jQuery.map( $scope.villages, function( n, i ) {
					if(data.villagePanchayatId === n.value)
				  		return n;
				});	  

				if(v instanceof Array){
					$scope.editdefaultvillages =  v[0];
				}else{
					$scope.editdefaultvillages = $scope.defaultvillages;
				}
			});	    	

	    	$scope.editaudit = {
	    		auditId : data.auditId,
	    		roundId : data.roundId,
	    		auditDistrictId : data.auditDistrictId,
	    		auditBlockId : data.auditBlockId,
	    		villagePanchayatId : data.villagePanchayatId,
				modifiedBy : $rootScope.sessionConfig.userId,
				startDate : data.startDate,
				endDate : data.endDate,
				gramaSabhaDate : data.gramaSabhaDate,
				status : true,
				createdByName : data.createdByName,
				modifiedByName : data.modifiedByName,
				createdDate : data.createdDate	,
				modifiedDate : data.modifiedDate	,
				gramaSabhaDate : data.gramaSabhaDate,
				financialDescription : data.financialDescription,
				financialYear : data.financialYear,
				roundDescription : data.roundDescription,
				districtName : data.districtName,
				createdBy : data.createdBy,
				roundName : data.roundName,
				vpName : data.vpName,
				blockName : data.blockName,
				key : data.key
	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editaudit = {
		    		auditId : data.auditId,
		    		roundId : data.roundId,
		    		auditDistrictId : data.auditDistrictId,
		    		auditBlockId : data.auditBlockId,
		    		villagePanchayatId : data.villagePanchayatId,
					modifiedBy : $rootScope.sessionConfig.userId,
					startDate : data.startDate,
					endDate : data.endDate,
					gramaSabhaDate : data.gramaSabhaDate,
					status : false,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					createdDate : data.createdDate	,
					modifiedDate : data.modifiedDate	,
					gramaSabhaDate : data.gramaSabhaDate,
					financialDescription : data.financialDescription,
					financialYear : data.financialYear,
					roundDescription : data.roundDescription,
					districtName : data.districtName,
					createdBy : data.createdBy,
					roundName : data.roundName,
					vpName : data.vpName,
					blockName : data.blockName,
					key : data.key
		    	};
		    	DoUpdate();	  
	    	}  	
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
				{ field: "auditId", title:'Audit ID', hidden: true },
				{field : "financialYear",title:'FY'},
				{ field: "roundName", title:'Round'},
				{ field: "gramaSabhaDate", title:'GS Date',template: "#= kendo.toString(kendo.parseDate(new Date(gramaSabhaDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
				{ field: "startDate", title:'St. Date',template: "#= kendo.toString(kendo.parseDate(new Date(startDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
				{ field: "endDtate", title:'End Date',template: "#= kendo.toString(kendo.parseDate(new Date(endDtate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
				{ field: "districtName", title : "District"},
				{ field: "blockName", title : "Block" },
				{ field: "vpName", title : "VP"},
				{ field: "createdByName", title : "Created By"},
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
            autosync: true,
			autoBind : false,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 30],
                messages: {
                    refresh: "Refresh Audit"
                }
            },
			dataSource: {
				pageSize: 10,
				transport: {
					read: function (e) {
						if ($rootScope.sessionConfig.isDistrictLevelPerson)
							$scope.searchReq.districtId = $rootScope.sessionConfig.allottedDistrict;

						$http({
							method: 'POST',//POST /api/audit/auditentriesreports
							url: $scope.crudServiceBaseUrl + '/audit/auditentriesreports',
							data: JSON.stringify($scope.searchReq)
						}).
							success(function (data, status, headers, config) {
								if (data.status)
									e.success(data.data)
							}).
							error(function (data, status, headers, config) {
							});
					}
				}
			}
	    }

	    function GetLookupValues(type,id){
	    	var deffered = jQuery.Deferred();
	    	auditfactory.getLookupValues(type,id).success(function(result){

				if(result instanceof Array){
					if(type==$rootScope.appConfig.lookupTypes.Rounds){
						for (var i=0; i<result.length; i++){
						    $scope.rounds.push(result[i]);
						}	
					}else if(  type === $rootScope.appConfig.lookupTypes.FinancialYear ){
						for (var i=0; i<result.length; i++)
						    $scope.fy.push(result[i]);
					}
					else if(type==$rootScope.appConfig.lookupTypes.Districts)
					{
						for (var i=0; i<result.length; i++){
						    $scope.districts.push(result[i]);
						}	
					}
					else if(type==$rootScope.appConfig.lookupTypes.Blocks)
					{						
						for (var i=0; i<result.length; i++){
						    $scope.blocks.push(result[i]);
						}
					}
					else if(type==$rootScope.appConfig.lookupTypes.VillagePanchayats)
					{
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

		$scope.defaultSearchReq = {
			"referenceId": null,
			"roundId": null,
			"districtId": null,
			"blockId": null,
			"villageId": null,
			"userId":null
		};
		$scope.searchReq =  angular.copy($scope.defaultSearchReq);
		$scope.selectedFy = [];
		$scope.selectedRounds = [];
		$scope.selectedDistricts = [];
		$scope.selectedBlocks = [];
		$scope.selectedVps = [];
		$scope.selectedusers = [];

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
							url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.DistrictsVillagePanchayats+'&where='+temp
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
			if($rootScope.sessionConfig.isBlockLevelPerson){
				$scope.searchReq ={
					"referenceId": null,
					"roundId": null,
					"districtId": null,
					"blockId": null,
					"villageId": null,
					"userId":$rootScope.sessionConfig.userId
				}
			}else{
				$scope.searchReq = {
					"referenceId": (($scope.selectedFy)?$scope.selectedFy.join(','):null),
					"roundId": (($scope.selectedRounds)?$scope.selectedRounds.join(','):null),
					"districtId": (($scope.selectedDistricts)?$scope.selectedDistricts.join(','):null),
					"blockId": (($scope.selectedBlocks)?$scope.selectedBlocks.join(','):null),
					"villageId": (($scope.selectedVps)?$scope.selectedVps.join(','):null),
					"isConsolidate": $scope.selectedIsConsolidateRpt,
					"userId":  (($scope.selectedusers)?$scope.selectedusers.join(','):null),
				};
			}

			$scope.grid.dataSource.read();
		}

		if($location.search().fyid){
			$scope.selectedFy = ($location.search().fyid.indexOf(',')>-1) ? $location.search().fyid.split(','):[$location.search().fyid];
		}

		if($location.search().round){
			$scope.selectedRounds = ($location.search().round.indexOf(',')>-1) ? $location.search().round.split(','):[$location.search().round];
		}

		if($location.search().districtId){
			$scope.selectedDistricts = ($location.search().districtId.indexOf(',')>-1) ? $location.search().districtId.split(','):[$location.search().districtId];
		}

		if($location.search().blockId){
			$scope.selectedBlocks = ($location.search().blockId.indexOf(',')>-1) ? $location.search().blockId.split(','):[$location.search().blockId];
		}

		if($location.search().villageId){
			$scope.selectedVps = ($location.search().villageId.indexOf(',')>-1) ? $location.search().villageId.split(','):[$location.search().villageId];
		}

		if($location.search().userId){
			$scope.selectedusers = ($location.search().userId.indexOf(',')>-1) ? $location.search().userId.split(','):[$location.search().userId];
		}

		$scope.$on("kendoWidgetCreated", function(event, widget){
			// the event is emitted for every widget; if we have multiple
			// widgets in this controller, we need to check that the event
			// is for the one we're interested in.
			if (widget === $scope.multiSelectddlRounds) {
				$scope.multiSelectddlRounds.options.initialLoad= false;
				$scope.multiSelectddlRounds.dataSource.read();
			}

			if (widget === $scope.multiSelectddlBlocks) {
				$scope.multiSelectddlBlocks.options.initialLoad= false;
				$scope.multiSelectddlBlocks.dataSource.read();
			}

			if (widget === $scope.multiSelectddlVps) {
				$scope.multiSelectddlVps.options.initialLoad= false;
				$scope.multiSelectddlVps.dataSource.read();
			}

			if (widget === $scope.multiSelectddlUsers) {
				$scope.multiSelectddlUsers.options.initialLoad= false;
				$scope.multiSelectddlUsers.dataSource.read();
			}

			if (widget === $scope.grid) {
				if($location.search().fyid || $location.search().round || $location.search().districtId || $location.search().blockId || $location.search().villageId || $location.search().userId){
					$scope.doSearch();
				}
			}

		});

}]);

app.factory('auditfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/audit/create';


	service.getLookupValues = function(id,filter){		
		return $http({
        	method : 'GET',
        	url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + (filter?filter:'')
    	});
    }

	service.getAudit = function(roundId,districtId,blockId,panchayatId){		
		return $http({
        	method : 'GET',
        	url : crudServiceBaseUrl + '/audit/doesexistaudit?rounid=' + roundId + '&districtid=' + districtId + '&blockid=' +  blockId + '&panchayatid=' + panchayatId
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
            url : crudServiceBaseUrl + '/audit/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}
	return service;
});
