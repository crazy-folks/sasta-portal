app.controller('MgnregaController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','mgnregafactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,mgnregafactory){

		$scope.aufactory = mgnregafactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditMgnregaTitle : "Add Mgnrega",
	    	EditAuditMgnregaTitle : "Edit Mgnrega"
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
            content: 'admin/mgnrega/add.html',
            title: $scope.modelDialogTitle.AddAuditMgnregaTitle,
            height:"400px",
            width:"800px",            
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
		        $($scope.AddAuditMgnregaFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditMgnregaFormName); 
            }
        };

        $scope.AddAuditMgnregaFormName = '#frmAddAuditMgnrega';
        $scope.EditAuditMgnregaFormName = '#frmEditAuditMgnrega';    

        $scope.keditWindowOptions = {
            content: 'admin/mgnrega/edit.html',
            title: $scope.modelDialogTitle.EditAuditMgnregaTitle,
            height:"400px",
            width:"800px",
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
		        $($scope.EditAuditMgnregaFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditMgnregaFormName);            	
            }
        };

        $scope.OpenAddAuditMgnregaWindow = function($event){
        	$scope.AddAuditMgnregaWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	$scope.AddAuditMgnregaWindow.center().open();
        	});
        }


        $scope.CloseAddAuditMgnregaWindow  = function(){
            $scope.AddAuditMgnregaWindow.close();
            if($scope.addjQueryValidator)
            	$scope.addjQueryValidator.doReset();
            $scope.doReset();
        }

        $scope.OpenEditAuditMgnregaWindow = function(){
			$scope.EditAuditMgnregaWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.EditAuditMgnregaWindow.center().open();            
        }

        $scope.CloseEditAuditMgnregaWindow  = function(){
            $scope.EditAuditMgnregaWindow.close();
            if($scope.editjQueryValidator)
            	$scope.editjQueryValidator.doReset();
            $scope.doReset();            
        }

        $scope.doReset = function(){
        	$scope.mgnrega = angular.copy($scope.defaultOptions);
        	$scope.editmgnrega =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
		  "id": null,
		  "createdBy": null,
		  "modifiedBy": null,
		  "auditId": null,
		  "roundId": null,
		  "roundName": null,
		  "vpName": null,
		  "blockName": null,
		  "blockId": null,
		  "vpId": null,
		  "totalWorksExecutedDuringFY": null,
		  "noOfWorksCompleted": null,
		  "noOfPendingWorks": null,
		  "noOfOnGoingWorks": null,
		  "materialExpForOnGoingWorks": null,
		  "expIncurredForOnGoingWorks": null,
		  "auditDistrictId": null,
		  "status": true,
		  "unskilledWagesForCompletedWorks": null,
		  "skilledWagesForCompletedWorks": null,
		  "materialExpForCompletedWorks": null,
		  "administrativeExpForCompletedWorks": null,
		  "noOfCompletedWorksEvaluatedBySA": null,
		  "expIncurredForCompletedWorks": null,
		  "valueOfCompletedWorksEvaluatedBySATeam": null,
		  "unSkilledWagesForOnGoingWorks": null,
		  "skilledWagesForOnGoingWorks": null,
		  "administrativeExpForOnGoingWorks": null,
		  "noOfOnGoingWorksEvaluatedBySATeam": null,
		  "valueOfOnGoingWorksEvaluatedBySATeam": null,
		  "createdDate": null,
		  "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialDescription": null,
		  "financialYear": null,
		  "roundDescription": null,
		  "districtName": null,
		  "roundStartDate": null,
		  "roundEndDate": null
		};

	    $scope.mgnrega = {
		  "id": null,
		  "createdBy": null,
		  "modifiedBy": null,
		  "auditId": null,
		  "roundId": null,
		  "roundName": null,
		  "vpName": null,
		  "blockName": null,
		  "blockId": null,
		  "vpId": null,
		  "totalWorksExecutedDuringFY": null,
		  "noOfWorksCompleted": null,
		  "noOfPendingWorks": null,
		  "noOfOnGoingWorks": null,
		  "materialExpForOnGoingWorks": null,
		  "expIncurredForOnGoingWorks": null,
		  "auditDistrictId": null,
		  "status": true,
		  "unskilledWagesForCompletedWorks": null,
		  "skilledWagesForCompletedWorks": null,
		  "materialExpForCompletedWorks": null,
		  "administrativeExpForCompletedWorks": null,
		  "noOfCompletedWorksEvaluatedBySA": null,
		  "expIncurredForCompletedWorks": null,
		  "valueOfCompletedWorksEvaluatedBySATeam": null,
		  "unSkilledWagesForOnGoingWorks": null,
		  "skilledWagesForOnGoingWorks": null,
		  "administrativeExpForOnGoingWorks": null,
		  "noOfOnGoingWorksEvaluatedBySATeam": null,
		  "valueOfOnGoingWorksEvaluatedBySATeam": null,
		  "createdDate": null,
		  "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialDescription": null,
		  "financialYear": null,
		  "roundDescription": null,
		  "districtName": null,
		  "roundStartDate": null,
		  "roundEndDate": null
		};

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){		    	
		    	$scope.mgnrega.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = mgnregafactory.doSubmitData($scope.mgnrega);
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
						$scope.CloseAddAuditMgnregaWindow();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add mgnrega!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add mgnrega!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editmgnrega = {
					id:data.id,
					createdBy:data.createdBy,
					modifiedBy:data.modifiedBy,
					auditId:data.auditId,
					roundId:data.roundId,
					roundName:data.roundName,
					vpName:data.vpName,
					blockName:data.blockName,
					blockId:data.blockId,
					vpId:data.vpId,
					totalWorksExecutedDuringFY:data.totalWorksExecutedDuringFY,
					noOfWorksCompleted:data.noOfWorksCompleted,
					noOfPendingWorks:data.noOfPendingWorks,
					noOfOnGoingWorks:data.noOfOnGoingWorks,
					materialExpForOnGoingWorks:data.materialExpForOnGoingWorks,
					expIncurredForOnGoingWorks:data.expIncurredForOnGoingWorks,
					auditDistrictId:data.auditDistrictId,
					status:false,
					unskilledWagesForCompletedWorks:data.unskilledWagesForCompletedWorks,
					skilledWagesForCompletedWorks:data.skilledWagesForCompletedWorks,
					materialExpForCompletedWorks:data.materialExpForCompletedWorks,
					administrativeExpForCompletedWorks:data.administrativeExpForCompletedWorks,
					noOfCompletedWorksEvaluatedBySA:data.noOfCompletedWorksEvaluatedBySA,
					expIncurredForCompletedWorks:data.expIncurredForCompletedWorks,
					valueOfCompletedWorksEvaluatedBySATeam:data.valueOfCompletedWorksEvaluatedBySATeam,
					unSkilledWagesForOnGoingWorks:data.unSkilledWagesForOnGoingWorks,
					skilledWagesForOnGoingWorks:data.skilledWagesForOnGoingWorks,
					administrativeExpForOnGoingWorks:data.administrativeExpForOnGoingWorks,
					noOfOnGoingWorksEvaluatedBySATeam:data.noOfOnGoingWorksEvaluatedBySATeam,
					valueOfOnGoingWorksEvaluatedBySATeam:data.valueOfOnGoingWorksEvaluatedBySATeam,
					createdDate:data.createdDate,
					modifiedDate:data.modifiedDate,
					createdByName:data.createdByName,
					modifiedByName:data.modifiedByName,
					financialDescription:data.financialDescription,
					financialYear:data.financialYear,
					roundDescription:data.roundDescription,
					districtName:data.districtName,
					roundStartDate:data.roundStartDate,
					roundEndDate:data.roundEndDate
		    	};
		    	DoUpdate();
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = mgnregafactory.doUpdateData($scope.editmgnrega);
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
					$scope.CloseEditAuditMgnregaWindow();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update mgnrega!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update mgnrega!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	 	    	
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editmgnrega.modifiedBy = $rootScope.sessionConfig.userId;
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

	    	$scope.editmgnrega = {
				id:data.id,
				createdBy:data.createdBy,
				modifiedBy:data.modifiedBy,
				auditId:data.auditId,
				roundId:data.roundId,
				roundName:data.roundName,
				vpName:data.vpName,
				blockName:data.blockName,
				blockId:data.blockId,
				vpId:data.vpId,
				totalWorksExecutedDuringFY:data.totalWorksExecutedDuringFY,
				noOfWorksCompleted:data.noOfWorksCompleted,
				noOfPendingWorks:data.noOfPendingWorks,
				noOfOnGoingWorks:data.noOfOnGoingWorks,
				materialExpForOnGoingWorks:data.materialExpForOnGoingWorks,
				expIncurredForOnGoingWorks:data.expIncurredForOnGoingWorks,
				auditDistrictId:data.auditDistrictId,
				status:data.status,
				unskilledWagesForCompletedWorks:data.unskilledWagesForCompletedWorks,
				skilledWagesForCompletedWorks:data.skilledWagesForCompletedWorks,
				materialExpForCompletedWorks:data.materialExpForCompletedWorks,
				administrativeExpForCompletedWorks:data.administrativeExpForCompletedWorks,
				noOfCompletedWorksEvaluatedBySA:data.noOfCompletedWorksEvaluatedBySA,
				expIncurredForCompletedWorks:data.expIncurredForCompletedWorks,
				valueOfCompletedWorksEvaluatedBySATeam:data.valueOfCompletedWorksEvaluatedBySATeam,
				unSkilledWagesForOnGoingWorks:data.unSkilledWagesForOnGoingWorks,
				skilledWagesForOnGoingWorks:data.skilledWagesForOnGoingWorks,
				administrativeExpForOnGoingWorks:data.administrativeExpForOnGoingWorks,
				noOfOnGoingWorksEvaluatedBySATeam:data.noOfOnGoingWorksEvaluatedBySATeam,
				valueOfOnGoingWorksEvaluatedBySATeam:data.valueOfOnGoingWorksEvaluatedBySATeam,
				createdDate:data.createdDate,
				modifiedDate:data.modifiedDate,
				createdByName:data.createdByName,
				modifiedByName:data.modifiedByName,
				financialDescription:data.financialDescription,
				financialYear:data.financialYear,
				roundDescription:data.roundDescription,
				districtName:data.districtName,
				roundStartDate:data.roundStartDate,
				roundEndDate:data.roundEndDate
	    	};
	    	$scope.OpenEditAuditMgnregaWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
        		{ field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
		        		{ field: "financialYear", groupable:true,width: '130px', title:'FY'},
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
								{ field: "totalWorksExecutedDuringFY", groupable:false,width: '150px', title:'Total Works in FY'  },
				        		{ field: "noOfWorksCompleted", groupable:false,width: '150px', title:'No. Completed'  },
				        		{ field: "noOfPendingWorks", groupable:false,width: '150px', title:'No. Pending'  },
				        		{ field: "unskilledWagesForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Unskilled Wages" },
				        		{ field: "skilledWagesForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Skilled Wages" },
				        		{ field: "materialExpForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Material Exp" },
				        		{ field: "administrativeExpForCompletedWorks",format: '{0:n0}', groupable:false,width: '150px', title : "Admin Exp" },
				        		{ field: "completedTotalEx",format: '{0:n0}', groupable:false,width: '150px', title : "Completed Total Ex" },
				        		{ field: "noOfCompletedWorksEvaluatedBySA", groupable:false,width: '150px', title : "No. Evaluated"  },
				        		{ field: "expIncurredForCompletedWorks", groupable:false,width: '150px', title : "Exp. Incurred"  },				        		
				        		{ field: "valueOfCompletedWorksEvaluatedBySATeam", groupable:false,width: '150px', title : "Value By SA"  },
				        		{ field: "completedDiffValue", groupable:false,width: '150px', title : "Completed Diff Value"  },
		        			]
		        		},{
		        			title : "On Going Works",
		        			headerAttributes : {
		        				style: "text-align: center;"
		        			},
		        			columns:[
								{ field: "noOfOnGoingWorks", groupable:false,width: '150px',title: "", title: "OnGoing Total Works", headerTemplate:'Total Works'  },
				        		{ field: "unSkilledWagesForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Unskilled Wages", headerTemplate : "Unskilled Wages" },
				        		{ field: "skilledWagesForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Skilled Wages", headerTemplate : "Skilled Wages" },
				        		{ field: "materialExpForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Material Exp", headerTemplate : "Material Exp" },
				        		{ field: "administrativeExpForOnGoingWorks",format: '{0:n0}', groupable:false,width: '150px', title: "OnGoing Admin Exp", headerTemplate : "Admin Exp" },
				        		{ field: "onGoingTotalEx",format: '{0:n0}', groupable:false,width: '150px', title : "On Going Total Ex" },
				        		{ field: "noOfOnGoingWorksEvaluatedBySATeam", groupable:false,width: '150px', title: "OnGoing No. Evaluated", headerTemplate : "No. Evaluated"  },
				        		{ field: "expIncurredForOnGoingWorks", groupable:false,width: '150px', title: "OnGoing Exp. Incurred", headerTemplate : "Exp. Incurred"  },				        		
				        		{ field: "valueOfOnGoingWorksEvaluatedBySATeam", groupable:false,width: '150px', title: "OnGoing Value By SA", headerTemplate : "Value By SA"  },
				        		{ field: "onGoingDiffValue", groupable:false,width: '150px', title : "On Going Diff Value"  },
		        			]
		        		},{
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
                    refresh: "Refresh MGNREGA Works"
                }
            },	        
	        dataSource: {
	            pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var baseUrl = $scope.crudServiceBaseUrl + 
	                	'/mgnregaworks/getlist?key='+encodeURIComponent($location.search().aid);
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
                }
	        }
	    }

	    function GetAudit(id)
	    {
	    	var deffered = jQuery.Deferred();
	    	mgnregafactory.getAudit(id).success(function(result){



		    		$scope.mgnrega.auditId= result.data.auditId;
		    		$scope.mgnrega.roundId =result.data.roundId;
			    	$scope.mgnrega.auditDistrictId =result.data.auditDistrictId;
			    	$scope.mgnrega.blockId =result.data.auditBlockId;
			    	$scope.mgnrega.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	mgnregafactory.getLookupValues(type).success(function(result){
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

		GetLookupValues(13); 
		GetLookupValues(2); 
		GetLookupValues(1); 
		GetLookupValues(14); 
}]);

app.factory('mgnregafactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/mgnregaworks/create';

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
        });
	}

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
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
            url : crudServiceBaseUrl + '/mgnregaworks/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});