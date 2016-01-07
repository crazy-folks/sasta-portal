app.controller('DeviationController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','deviationfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,deviationfactory){

		$scope.aufactory = deviationfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
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
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "jcMisusedByOthersCount",width: '130px', title:'Job Cards Mis-Used By Others No'},
		        		{ field: "jcMisusedByOthersAmt",width: '130px', title:'Job Cards Mis-Used By Others Amt'},
		        		{ field: "wagesPaidWorkersWithoutJcCount",width: '130px', title:'Wages Paid To Workers Without Job Cards No'},
		        		{ field: "wagesPaidWorkersWithoutJcAmt",width: '130px', title : "Wages Paid To Workers Without Job Cards Amt"},
		        		{ field: "wagesPaidWithoutRecordMesurementCount",width: '130px', title : "Wages Paid Without Recording Measurements No"},
		        		{ field: "wagesPaidWithoutRecordMesurementAmt",width: '130px', title : "Wages Paid Without Recording Measurements Amt"},
		        		{ field: "wagesPaidExcessMBooksValueCount",width: '130px', title : "Wages Paid In Excess Of M-Book Value No"},
		        		{ field: "wagesPaidExcessMBooksValueAmt",width: '130px', title : "Wages Paid In Excess Of M-Book Value Amt"},
		        		{ field: "variationsBetweenNMRRegisterCount",width: '130px', title : "Variations In Signatures Between NMR & Register-I No"},
		        		{ field: "variationsBetweenNMRRegisterAmt",width: '130px', title : "Variations In Signatures Between NMR & Register I Amt"},
		        		{ field: "nmroverWritingCorrectionsCount",width: '130px', title : "NMR Over Writing Corrections No"},
		        		{ field: "nmroverWritingCorrectionsAmt",width: '130px', title:'NMR Over Writing Corrections Amt'},
		        		{ field: "inEligibleWorkersIncludeUnder18Count",width: '130px', title:'Ineligible Workers Including Under 18 Years No'},
		        		{ field: "inEligibleWorkersIncludeUnder18Amt",width: '130px', title:'Ineligible Workers Including Under 18 Years Amt'},
		        		{ field: "diffOnlineNMRPhysicalNMRCount",width: '130px', title : "Difference Between Online NMR & Physical NMR No"},
		        		{ field: "diffOnlineNMRPhysicalNMRAmt",width: '130px', title : "Difference Between Online NMR & Physical NMR Amt"},
		        		{ field: "wagesPaymentFromSchemeCount",width: '130px', title : "WSF Payment From Scheme Amount No"},
		        		{ field: "wagesPaymentFromSchemeAmt",width: '130px', title : "WSF Payment From Scheme Amount"},
		        		{ field: "amountMoreThanNMRFTOCount",width: '130px', title : "Amount More Than NMR In FTO No"},
		        		{ field: "amountMoreThanNMRFTOAmt",width: '130px', title : "Amount More Than NMR In FTO Amt"},
		        		{ field: "nmrnotProducedForAuditCount",width: '130px', title : "NMRs Not Produced For Audit No"},
		        		{ field: "nmrnotProducedForAuditAmt",width: '130px', title : "NMRs Not Produced For Audit Amt"},


		        		{ field: "mbooksNotProducedForAuditCount",width: '130px', title:'M-Books Not Produced For Audit No'},
		        		{ field: "mbooksNotProducedForAuditAmt",width: '130px', title:'M-Books Not Produced For Audit Amt'},
		        		{ field: "shortageMeasurementsCount",width: '130px', title:'hortage In Measurements No'},
		        		{ field: "shortageMeasurementsAmt",width: '130px', title : "Shortage In Measurements Amt"},
		        		{ field: "worksTakenUpWithoutGbApprovalCount",width: '130px', title : "Works Taken Up Without Grama Sabha Approval No"},
		        		{ field: "worksTakenUpWithoutGbApprovalAmt",width: '130px', title : "Works Taken Up Without Grama Sabha Approval Amt"},
		        		{ field: "estimatesNotProducedForAuditCount",width: '130px', title : "Estimates Not Produced For Audit No"},
		        		{ field: "estimatesNotProducedForAuditAmt",width: '130px', title : "Estimates Not Produced For Audit Amt"},
		        		{ field: "asnotProducedForAuditCount",width: '130px', title : "AS Not Produced For Audit No"},
		        		{ field: "asnotProducedForAuditAmt",width: '130px', title : "AS not produced for Audit Amt"},
		        		{ field: "tsnotProducedForAuditCount",width: '130px', title : "TS Not Produced For Audit No"},
		        		{ field: "tsnotProducedForAuditAmt",width: '130px', title:'TS Not Produced For Audit Amt'},
		        		{ field: "noneAdoptionOfScheduleRateCount",width: '130px', title:'n Adoption Of Schedule Of Rate No'},
		        		{ field: "noneAdoptionOfScheduleRateAmt",width: '130px', title:'Non Adoption Of Schedule Of Rate Amt'},
		        		{
 							title : "",
		                    width: '30px',
		                    template: kendo.template($("#toggle-template").html())
		                }
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        dataSource: {
	            pageSize: 5,
	            transport: {
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/deviation/getlist'
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