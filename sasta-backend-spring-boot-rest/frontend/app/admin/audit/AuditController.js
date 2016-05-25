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
	        content: 'frontend/admin/audit/add.html',
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
	        content: 'frontend/admin/audit/edit.html',
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
			$state.go('entries.vrp',{aid:data.key});
    	}

    	$scope.ExpenData = function(data){
			$state.go('entries.expenditure',{aid:data.key});
    	}

    	$scope.DeviationData = function(data){
			$state.go('entries.deviation',{aid:data.key});
    	}

    	$scope.GrievanceData = function(data){
			$state.go('entries.grievance',{aid:data.key});
    	}

    	$scope.MissappropriationData = function(data){
			$state.go('entries.misappropriation',{aid:data.key});
    	}

    	$scope.MgnregaData = function(data){
			$state.go('entries.mgnrega',{aid:data.key});
    	}

    	$scope.HlcommitteeData = function(data){
			$state.go('entries.hlcommittee',{aid:data.key});
    	}

    	$scope.sgm = function(data){
			$state.go('entries.sgm',{aid:data.key});
    	}    	

    	$scope.recovery = function(data){
			$state.go('entries.recovery',{aid:data.key});
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
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 30],
                messages: {
                    refresh: "Refresh Audit"
                }
            },	        
	        dataSource: {
	            pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var auditReq =  {
						  "districtId":  null,
						  "blockId":  null,
						  "financialId": null,
						  "userId": null
						};
	                	if($.inArray($rootScope.sessionConfig.userGroupId, $rootScope.appConfig.blockLevelGroups)>-1){	 
							auditReq.userId =  $rootScope.sessionConfig.userId;       		
	                	}else if($.inArray($rootScope.sessionConfig.userGroupId, $rootScope.appConfig.districtLevelGroups)>-1){
							auditReq.districtId = $rootScope.sessionConfig.allottedDistrict;
	                	}
	                  $http({
				         method: 'POST',
				         url: $scope.crudServiceBaseUrl + '/audit/getlist',
				         data : JSON.stringify(auditReq),
				         cache: false			         
				      }).
	                  success(function(data, status, headers, config) {
	                  	if(data.status)
	                      e.success(data.data)
	                  }).
	                  error(function(data, status, headers, config) {
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
