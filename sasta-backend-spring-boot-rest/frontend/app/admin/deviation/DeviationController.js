app.controller('DeviationController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','deviationfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,deviationfactory){

		$scope.aufactory = deviationfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add Deviation",
	    	EditAuditTitle : "Edit Deviation"
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
            content: 'admin/deviation/add.html',
            title: $scope.modelDialogTitle.AddAuditTitle,
            iframe: false,
            width : '800px',
            height:'400px',
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
		        $($scope.AddAuditDeviationFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditDeviationFormName); 
            }
        };

        $scope.AddAuditDeviationFormName = '#frmAddAuditDeviation';
        $scope.EditAuditDeviationFormName = '#frmEditAuditDeviation';    

        $scope.keditWindowOptions = {
            content: 'admin/deviation/edit.html',
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
		        $($scope.EditAuditDeviationFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditDeviationFormName);            	
            }
        };

        $scope.OpenAddDeviationWindow = function($event){
        	$scope.addDeviationWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	
            	$scope.addDeviationWindow.center().open();
        	});
        }


        $scope.CloseAddDeviationWindow  = function(){
            $scope.addDeviationWindow.close();
            $scope.doReset();
            if($scope.addjQueryValidator){
            	$scope.addjQueryValidator.doReset();            
        	}
        }

        $scope.OpenEditDeviationWindow = function(){
			$scope.editDeviationWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editDeviationWindow.center().open();
            
        }

        $scope.CloseEditDeviationWindow = function(){
            $scope.editDeviationWindow.close();
            $scope.doReset();
            if($scope.editjQueryValidator){
            	$scope.editjQueryValidator.doReset();            
        	}
        }

        $scope.doReset = function(){
        	$scope.deviation = angular.copy($scope.defaultOptions);
        	$scope.editdeviation =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
	    	   	"id" : 0,
				"status" : null,
				"roundId" : null,
				"createdBy" : null,
				"auditId" : 1,
				"modifiedBy" : null,
				"blockName" : null,
				"nmroverWritingCorrectionsAmt" : null,
				"estimatesNotProducedForAuditCount" : null,
				"worksTakenUpWithoutGbApprovalCount" : null,
				"noneAdoptionOfScheduleRateAmt" : null,
				"nmroverWritingCorrectionsCount" : null,
				"worksTakenUpWithoutGbApprovalAmt" : null,
				"noneAdoptionOfScheduleRateCount" : null,
				"wagesPaidExcessMBooksValueCount" : null,
				"wagesPaidWithoutRecordMesurementAmt" : null,
				"estimatesNotProducedForAuditAmt" : null,
				"wagesPaidWithoutRecordMesurementCount" : null,
				"mbooksNotProducedForAuditAmt" : null,
				"diffOnlineNMRPhysicalNMRAmt" : null,
				"wagesPaidExcessMBooksValueAmt" : null,
				"wagesPaymentFromSchemeCount" : null,
				"wagesPaidWorkersWithoutJcCount" : null,
				"variationsBetweenNMRRegisterCount" : null,
				"nmrnotProducedForAuditCount" : null,
				"diffOnlineNMRPhysicalNMRCount" : null,
				"variationsBetweenNMRRegisterAmt" : null,
				"inEligibleWorkersIncludeUnder18Count" : null,
				"inEligibleWorkersIncludeUnder18Amt" : null,
				"mbooksNotProducedForAuditCount" : null,
				"auditDistrictId" : null,
				"wagesPaymentFromSchemeAmt" : null,
				"amountMoreThanNMRFTOCount" : null,
				"amountMoreThanNMRFTOAmt" : null,
				"jcMisusedByOthersCount" : null,
				"tsnotProducedForAuditCount" : null,
				"asnotProducedForAuditAmt" : null,
				"jcMisusedByOthersAmt" : null,
				"shortageMeasurementsAmt" : null,
				"nmrnotProducedForAuditAmt" : null,
				"shortageMeasurementsCount" : null,
				"asnotProducedForAuditCount" : null,
				"tsnotProducedForAuditAmt" : null,
				"createdDate" : null,
				"wagesPaidWorkersWithoutJcAmt" : null,
				"modifiedByName" : null,
				"roundDescription" : null,
				"createdByName" : null,
				"financialYear" : null,
				"financialDescription" : null,
				"districtName" : null,
				"modifiedDate" : null,
				"roundEndDate" : null,
				"roundStartDate" : null,
				"roundName" : null,
				"vpName" : null,
				"blockId" : null,
				"vpId" : null
	    };

	    $scope.deviation = {
	    	   	"id" : 0,
				"status" : null,
				"roundId" : null,
				"createdBy" : null,
				"auditId" : 1,
				"modifiedBy" : null,
				"blockName" : null,
				"nmroverWritingCorrectionsAmt" : null,
				"estimatesNotProducedForAuditCount" : null,
				"worksTakenUpWithoutGbApprovalCount" : null,
				"noneAdoptionOfScheduleRateAmt" : null,
				"nmroverWritingCorrectionsCount" : null,
				"worksTakenUpWithoutGbApprovalAmt" : null,
				"noneAdoptionOfScheduleRateCount" : null,
				"wagesPaidExcessMBooksValueCount" : null,
				"wagesPaidWithoutRecordMesurementAmt" : null,
				"estimatesNotProducedForAuditAmt" : null,
				"wagesPaidWithoutRecordMesurementCount" : null,
				"mbooksNotProducedForAuditAmt" : null,
				"diffOnlineNMRPhysicalNMRAmt" : null,
				"wagesPaidExcessMBooksValueAmt" : null,
				"wagesPaymentFromSchemeCount" : null,
				"wagesPaidWorkersWithoutJcCount" : null,
				"variationsBetweenNMRRegisterCount" : null,
				"nmrnotProducedForAuditCount" : null,
				"diffOnlineNMRPhysicalNMRCount" : null,
				"variationsBetweenNMRRegisterAmt" : null,
				"inEligibleWorkersIncludeUnder18Count" : null,
				"inEligibleWorkersIncludeUnder18Amt" : null,
				"mbooksNotProducedForAuditCount" : null,
				"auditDistrictId" : null,
				"wagesPaymentFromSchemeAmt" : null,
				"amountMoreThanNMRFTOCount" : null,
				"amountMoreThanNMRFTOAmt" : null,
				"jcMisusedByOthersCount" : null,
				"tsnotProducedForAuditCount" : null,
				"asnotProducedForAuditAmt" : null,
				"jcMisusedByOthersAmt" : null,
				"shortageMeasurementsAmt" : null,
				"nmrnotProducedForAuditAmt" : null,
				"shortageMeasurementsCount" : null,
				"asnotProducedForAuditCount" : null,
				"tsnotProducedForAuditAmt" : null,
				"createdDate" : null,
				"wagesPaidWorkersWithoutJcAmt" : null,
				"modifiedByName" : null,
				"roundDescription" : null,
				"createdByName" : null,
				"financialYear" : null,
				"financialDescription" : null,
				"districtName" : null,
				"modifiedDate" : null,
				"roundEndDate" : null,
				"roundStartDate" : null,
				"roundName" : null,
				"vpName" : null,
				"blockId" : null,
				"vpId" : null

	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	
		    	$scope.deviation.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = deviationfactory.doSubmitData($scope.deviation);
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
					   $scope.CloseAddDeviationWindow();
				       $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add deviation!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add deviation!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editdeviation = {
					  	id : data.id,
						status : false,
						roundId : data.roundId,
						createdBy : data.createdBy,
						auditId : data.auditId,
						modifiedBy : data.modifiedBy,
						blockName : data.blockName,
						nmroverWritingCorrectionsAmt : data.nmroverWritingCorrectionsAmt,
						estimatesNotProducedForAuditCount : data.estimatesNotProducedForAuditCount,
						worksTakenUpWithoutGbApprovalCount : data.worksTakenUpWithoutGbApprovalCount,
						noneAdoptionOfScheduleRateAmt : data.noneAdoptionOfScheduleRateAmt,
						nmroverWritingCorrectionsCount : data.nmroverWritingCorrectionsCount,
						worksTakenUpWithoutGbApprovalAmt : data.worksTakenUpWithoutGbApprovalAmt,
						noneAdoptionOfScheduleRateCount : data.noneAdoptionOfScheduleRateCount,
						wagesPaidExcessMBooksValueCount : data.wagesPaidExcessMBooksValueCount,
						wagesPaidWithoutRecordMesurementAmt : data.wagesPaidWithoutRecordMesurementAmt,
						estimatesNotProducedForAuditAmt : data.estimatesNotProducedForAuditAmt,
						wagesPaidWithoutRecordMesurementCount : data.wagesPaidWithoutRecordMesurementCount,
						mbooksNotProducedForAuditAmt : data.mbooksNotProducedForAuditAmt,
						diffOnlineNMRPhysicalNMRAmt : data.diffOnlineNMRPhysicalNMRAmt,
						wagesPaidExcessMBooksValueAmt : data.wagesPaidExcessMBooksValueAmt,
						wagesPaymentFromSchemeCount : data.wagesPaymentFromSchemeCount,
						wagesPaidWorkersWithoutJcCount : data.wagesPaidWorkersWithoutJcCount,
						variationsBetweenNMRRegisterCount : data.variationsBetweenNMRRegisterCount,
						nmrnotProducedForAuditCount : data.nmrnotProducedForAuditCount,
						diffOnlineNMRPhysicalNMRCount : data.diffOnlineNMRPhysicalNMRCount,
						variationsBetweenNMRRegisterAmt : data.variationsBetweenNMRRegisterAmt,
						inEligibleWorkersIncludeUnder18Count : data.inEligibleWorkersIncludeUnder18Count,
						inEligibleWorkersIncludeUnder18Amt : data.inEligibleWorkersIncludeUnder18Amt,
						mbooksNotProducedForAuditCount : data.mbooksNotProducedForAuditCount,
						auditDistrictId : data.auditDistrictId,
						wagesPaymentFromSchemeAmt : data.wagesPaymentFromSchemeAmt,
						amountMoreThanNMRFTOCount : data.amountMoreThanNMRFTOCount,
						amountMoreThanNMRFTOAmt : data.amountMoreThanNMRFTOAmt,
						jcMisusedByOthersCount : data.jcMisusedByOthersCount,
						tsnotProducedForAuditCount : data.tsnotProducedForAuditCount,
						asnotProducedForAuditAmt : data.asnotProducedForAuditAmt,
						jcMisusedByOthersAmt : data.jcMisusedByOthersAmt,
						shortageMeasurementsAmt : data.shortageMeasurementsAmt,
						nmrnotProducedForAuditAmt : data.nmrnotProducedForAuditAmt,
						shortageMeasurementsCount : data.shortageMeasurementsCount,
						asnotProducedForAuditCount : data.asnotProducedForAuditCount,
						tsnotProducedForAuditAmt : data.tsnotProducedForAuditAmt,
						createdDate : data.createdDate,
						wagesPaidWorkersWithoutJcAmt : data.wagesPaidWorkersWithoutJcAmt,
						modifiedByName : data.modifiedByName,
						roundDescription : data.roundDescription,
						createdByName : data.createdByName,
						financialYear : data.financialYear,
						financialDescription : data.financialDescription,
						districtName : data.districtName,
						modifiedDate : data.modifiedDate,
						roundEndDate : data.roundEndDate,
						roundStartDate : data.roundStartDate,
						roundName : data.roundName,
						vpName : data.vpName,
						blockId : data.blockId,
						vpId : data.vpId
		    	};
		    	DoUpdate();
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = deviationfactory.doUpdateData($scope.editdeviation);
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
					$scope.CloseEditDeviationWindow();
			        $scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update deviation!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update deviation!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	    	
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editdeviation.modifiedBy = $rootScope.sessionConfig.userId;
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
	    	$scope.editdeviation = {
				  	id : data.id,
					status : data.status,
					roundId : data.roundId,
					createdBy : data.createdBy,
					auditId : data.auditId,
					modifiedBy : data.modifiedBy,
					blockName : data.blockName,
					nmroverWritingCorrectionsAmt : data.nmroverWritingCorrectionsAmt,
					estimatesNotProducedForAuditCount : data.estimatesNotProducedForAuditCount,
					worksTakenUpWithoutGbApprovalCount : data.worksTakenUpWithoutGbApprovalCount,
					noneAdoptionOfScheduleRateAmt : data.noneAdoptionOfScheduleRateAmt,
					nmroverWritingCorrectionsCount : data.nmroverWritingCorrectionsCount,
					worksTakenUpWithoutGbApprovalAmt : data.worksTakenUpWithoutGbApprovalAmt,
					noneAdoptionOfScheduleRateCount : data.noneAdoptionOfScheduleRateCount,
					wagesPaidExcessMBooksValueCount : data.wagesPaidExcessMBooksValueCount,
					wagesPaidWithoutRecordMesurementAmt : data.wagesPaidWithoutRecordMesurementAmt,
					estimatesNotProducedForAuditAmt : data.estimatesNotProducedForAuditAmt,
					wagesPaidWithoutRecordMesurementCount : data.wagesPaidWithoutRecordMesurementCount,
					mbooksNotProducedForAuditAmt : data.mbooksNotProducedForAuditAmt,
					diffOnlineNMRPhysicalNMRAmt : data.diffOnlineNMRPhysicalNMRAmt,
					wagesPaidExcessMBooksValueAmt : data.wagesPaidExcessMBooksValueAmt,
					wagesPaymentFromSchemeCount : data.wagesPaymentFromSchemeCount,
					wagesPaidWorkersWithoutJcCount : data.wagesPaidWorkersWithoutJcCount,
					variationsBetweenNMRRegisterCount : data.variationsBetweenNMRRegisterCount,
					nmrnotProducedForAuditCount : data.nmrnotProducedForAuditCount,
					diffOnlineNMRPhysicalNMRCount : data.diffOnlineNMRPhysicalNMRCount,
					variationsBetweenNMRRegisterAmt : data.variationsBetweenNMRRegisterAmt,
					inEligibleWorkersIncludeUnder18Count : data.inEligibleWorkersIncludeUnder18Count,
					inEligibleWorkersIncludeUnder18Amt : data.inEligibleWorkersIncludeUnder18Amt,
					mbooksNotProducedForAuditCount : data.mbooksNotProducedForAuditCount,
					auditDistrictId : data.auditDistrictId,
					wagesPaymentFromSchemeAmt : data.wagesPaymentFromSchemeAmt,
					amountMoreThanNMRFTOCount : data.amountMoreThanNMRFTOCount,
					amountMoreThanNMRFTOAmt : data.amountMoreThanNMRFTOAmt,
					jcMisusedByOthersCount : data.jcMisusedByOthersCount,
					tsnotProducedForAuditCount : data.tsnotProducedForAuditCount,
					asnotProducedForAuditAmt : data.asnotProducedForAuditAmt,
					jcMisusedByOthersAmt : data.jcMisusedByOthersAmt,
					shortageMeasurementsAmt : data.shortageMeasurementsAmt,
					nmrnotProducedForAuditAmt : data.nmrnotProducedForAuditAmt,
					shortageMeasurementsCount : data.shortageMeasurementsCount,
					asnotProducedForAuditCount : data.asnotProducedForAuditCount,
					tsnotProducedForAuditAmt : data.tsnotProducedForAuditAmt,
					createdDate : data.createdDate,
					wagesPaidWorkersWithoutJcAmt : data.wagesPaidWorkersWithoutJcAmt,
					modifiedByName : data.modifiedByName,
					roundDescription : data.roundDescription,
					createdByName : data.createdByName,
					financialYear : data.financialYear,
					financialDescription : data.financialDescription,
					districtName : data.districtName,
					modifiedDate : data.modifiedDate,
					roundEndDate : data.roundEndDate,
					roundStartDate : data.roundStartDate,
					roundName : data.roundName,
					vpName : data.vpName,
					blockId : data.blockId,
					vpId : data.vpId
	    	};
	    	$scope.OpenEditDeviationWindow();
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
		        			title : "JC Misused",
		        			columns :[
		        				{ field: "jcMisusedByOthersCount",headerTemplate: "No", title : "JC Misused No",width: '130px', groupable:false  },
		        				{ field: "jcMisusedByOthersAmt",format: '{0:n0}', headerTemplate : "Amount", title : "JC Misused Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Payment witout JC",
		        			columns :[
		        				{ field: "wagesPaidWorkersWithoutJcCount",headerTemplate: "No", title : "Payment witout JC No",width: '130px', groupable:false  },
		        				{ field: "wagesPaidWorkersWithoutJcAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Payment witout JC Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Wages paid without measurement",
		        			columns :[
		        				{ field: "wagesPaidWithoutRecordMesurementCount",headerTemplate: "No", title : "Wages paid without measurement No",width: '130px', groupable:false  },
		        				{ field: "wagesPaidWithoutRecordMesurementAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid without measurement Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Wages paid in excess of M Book",
		        			columns :[
		        				{ field: "wagesPaidExcessMBooksValueCount",headerTemplate: "No", title : "Wages paid in excess of M Book No",width: '130px', groupable:false  },
		        				{ field: "wagesPaidExcessMBooksValueAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages paid in excess of M Book Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Signature Variation NMR and Register I",
		        			columns :[
		        				{ field: "variationsBetweenNMRRegisterCount",headerTemplate: "No", title : "Signature Variation No",width: '130px', groupable:false  },
		        				{ field: "variationsBetweenNMRRegisterAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Signature Variation Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "NMR Overwriting",
		        			columns :[
		        				{ field: "nmroverWritingCorrectionsCount",headerTemplate: "No", title : "NMR Overwriting No",width: '130px', groupable:false  },
		        				{ field: "nmroverWritingCorrectionsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "NMR Overwriting Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Ineligible Workers",
		        			columns :[
		        				{ field: "inEligibleWorkersIncludeUnder18Count",headerTemplate: "No", title : "Ineligible Workers No",width: '130px', groupable:false  },
		        				{ field: "inEligibleWorkersIncludeUnder18Amt",format: '{0:n0}', headerTemplate : "Amount", title : "Ineligible Workers Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Diff online NMR & Physical NMR",
		        			columns :[
		        				{ field: "diffOnlineNMRPhysicalNMRCount",headerTemplate: "No", title : "Diff online NMR & Physical NMR No",width: '130px', groupable:false  },
		        				{ field: "diffOnlineNMRPhysicalNMRAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Diff online NMR & Physical NMR Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "WSF Payment from scheme amount",
		        			columns :[
		        				{ field: "wagesPaymentFromSchemeCount",headerTemplate: "No", title : "WSF Payment No",width: '130px', groupable:false  },
		        				{ field: "wagesPaymentFromSchemeAmt",format: '{0:n0}', headerTemplate : "Amount", title : "WSF Payment Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "FTO Amount more than NMR",
		        			columns :[
		        				{ field: "amountMoreThanNMRFTOCount",headerTemplate: "No", title : "FTO NMR No",width: '130px', groupable:false  },
		        				{ field: "amountMoreThanNMRFTOAmt",format: '{0:n0}', headerTemplate : "Amount", title : "FTO NMR Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "NMR Not Produced For Audit",
		        			columns :[
		        				{ field: "nmrnotProducedForAuditCount",headerTemplate: "No", title : "NMR Not Produced For Audit No",width: '130px', groupable:false  },
		        				{ field: "nmrnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "NMR Not Produced For Audit Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "M Books Not Produced For Audit",
		        			columns :[
		        				{ field: "mbooksNotProducedForAuditCount",headerTemplate: "No", title : "M Books Not Produced For Audit No",width: '130px', groupable:false  },
		        				{ field: "mbooksNotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "M Books Not Produced For Audit Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Shortage In Measurements",
		        			columns :[
		        				{ field: "shortageMeasurementsCount",headerTemplate: "No", title : "Shortage In Measurements No",width: '130px', groupable:false  },
		        				{ field: "shortageMeasurementsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Shortage In Measurements Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Works without GS approval",
		        			columns :[
		        				{ field: "worksTakenUpWithoutGbApprovalCount",headerTemplate: "No", title : "Works without GS approval No",width: '130px', groupable:false  },
		        				{ field: "worksTakenUpWithoutGbApprovalAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Works without GS approval Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Estimates Not Produced For Audit",
		        			columns :[
		        				{ field: "estimatesNotProducedForAuditCount",headerTemplate: "No", title : "Estimates Not Produced For Audit No",width: '130px', groupable:false  },
		        				{ field: "estimatesNotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Estimates Not Produced For Audit Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "AS Not Produced For Audit",
		        			columns :[
		        				{ field: "asnotProducedForAuditCount",headerTemplate: "No", title : "AS Not Produced For Audit No",width: '130px', groupable:false  },
		        				{ field: "asnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "AS Not Produced For Audit Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "TS Not Produced For Audit",
		        			columns :[
		        				{ field: "tsnotProducedForAuditCount",headerTemplate: "No", title : "TS Not Produced For Audit No",width: '130px', groupable:false  },
		        				{ field: "tsnotProducedForAuditAmt",format: '{0:n0}', headerTemplate : "Amount", title : "TS Not Produced For Audit Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Non Adoption Of Schedule Of Rate",
		        			columns :[
		        				{ field: "noneAdoptionOfScheduleRateCount",headerTemplate: "No", title : "Non Adoption Of Schedule No",width: '130px', groupable:false  },
		        				{ field: "noneAdoptionOfScheduleRateAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Non Adoption Of Schedule Amount",width: '130px', groupable:false  },
		        			]
		        		},
		        		{
		        			title : "Total",
		        			columns :[
		        				{ field: "totalCount",headerTemplate: "No", title : "Total Count",width: '130px', groupable:false  },
		        				{ field: "totalAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Total Amount",width: '130px', groupable:false  },
		        			]
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
                    refresh: "Refresh Deviations"
                }
            },	        
	        dataSource: {
	        	pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var baseUrl = $scope.crudServiceBaseUrl + 
	                	'/deviation/getlist?key='+decodeURIComponent($location.search().aid);
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
                }
	        }
	    }

	    function GetAudit(id)
	    {
	    	var deffered = jQuery.Deferred();
	    	deviationfactory.getAudit(id).success(function(result){



		    		$scope.deviation.auditId= result.data.auditId;
		    		$scope.deviation.roundId =result.data.roundId;
			    	$scope.deviation.auditDistrictId =result.data.auditDistrictId;
			    	$scope.deviation.blockId =result.data.auditBlockId;
			    	$scope.deviation.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	deviationfactory.getLookupValues(type).success(function(result){
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

app.factory('deviationfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/deviation/create';

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
            url : crudServiceBaseUrl + '/deviation/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});