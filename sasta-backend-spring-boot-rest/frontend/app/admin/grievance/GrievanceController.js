app.controller('GrievanceController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','grievancefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,grievancefactory){

		$scope.aufactory = grievancefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditGrievanceTitle : "Add Grievance",
	    	EditAuditGrievanceTitle : "Edit Grievance"
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
            content: 'admin/grievance/add.html',
            title: $scope.modelDialogTitle.AddAuditGrievanceTitle,
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
		        $($scope.AddAuditGrievanceFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditGrievanceFormName); 
            }
        };

        $scope.AddAuditGrievanceFormName = '#frmAddAuditGrievance';
        $scope.EditAuditGrievanceFormName = '#frmEditAuditGrievance';    

        $scope.keditWindowOptions = {
            content: 'admin/grievance/edit.html',
            title: $scope.modelDialogTitle.EditAuditGrievanceTitle,
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
		        $($scope.EditAuditGrievanceFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditGrievanceFormName);            	
            }
        };

        $scope.OpenAddAuditGrievanceWindow = function($event){
        	$scope.AddAuditGrievanceWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
        	$scope.doReset();
   			$scope.AddItemHVGSTotal = (($scope.grievance.totalReceivedGrievancesHF||0) +
			($scope.grievance.totalReceivedGrievancesMeeting||0));
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){            	
            	$scope.AddAuditGrievanceWindow.center().open();
        	});
        }

        $scope.CloseAddAuditGrievanceWindow  = function(){
        	$scope.doReset();
            $scope.AddAuditGrievanceWindow.close();
            if($scope.addjQueryValidator)
            	$scope.addjQueryValidator.doReset();
        }

        $scope.OpenEditAuditGrievanceWindow = function(){
			$scope.EditAuditGrievanceWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
			$scope.EditItemHVGSTotal =  (($scope.editgrievance.totalReceivedGrievancesHF||0)  + 
			($scope.editgrievance.totalReceivedGrievancesMeeting||0));			
            $scope.EditAuditGrievanceWindow.center().open();
        }

        $scope.CloseEditAuditGrievanceWindow = function(){
        	$scope.doReset();
            $scope.EditAuditGrievanceWindow.close();
            if($scope.editjQueryValidator)
            	$scope.editjQueryValidator.doReset();
        }

        $scope.doReset = function(){
        	$scope.grievance = angular.copy($scope.defaultOptions);
        	$scope.editgrievance =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
	      	    "id" : 0,
				"others" : null,
				"status" : null,
				"roundId" : null,
				"createdBy" : null,
				"auditId" : 1,
				"modifiedBy" : null,
				"blockName" : null,
				"wagesNotPaidWorkersActuallyWorkedCount" : null,
				"transportAllowanceNotGivenCount" : null,
				"demandForIndividualBenefitScheme" : null,
				"totalReceivedGrievancesMeeting" : null,
				"complaintsAgainstUnionOverseer" : null,
				"complaintsAgainstVPSecretory" : null,
				"wagesDrawnLessThanActualNoDaysCount" : null,
				"wagesDrawnLessThanActualNoDaysAmt" : null,
				"wagesNotPaidWorkersActuallyWorkedAmt" : null,
				"noCompensationInjuredAtWorksiteAmt" : null,
				"nonProvisionOfWorkSiteFacilities" : null,
				"noCompensationDeadAtWorksiteCount" : null,
				"reqPaymentCompletedIHHLWorkCount" : null,
				"fullEntitlementNotGivenCount" : null,
				"complaintsAgainstVPPresident" : null,
				"complaintAgainstBankingCorrespondent" : null,
				"lessPaymentValueRecordedMBookAmt" : null,
				"transportAllowanceNotGivenAmt" : null,
				"complaintsAgainstWorksiteFacilidator" : null,
				"lessPaymentValueRecordedMBookCount" : null,
				"noCompensationDeadAtWorksiteAmt" : null,
				"reqPaymentCompletedIHHLWorkAmt" : null,
				"reqForConstructionCattleShelter" : null,
				"noCompensationInjuredAtWorksiteCount" : null,
				"auditDistrictId" : null,
				"totalReceivedGrievancesHF" : null,
				"reqForNewJc" : null,
				"reqForConstructionIAYHouse" : null,
				"demandForLibraryBuilding" : null,
				"reqForConstructionIHHL" : null,
				"demandForWork" : null,
				"reqForMoreThan100Days" : null,
				"demandForPds" : null,
				"demandForWagesIncrease" : null,
				"fullEntitlementNotGivenAmt" : null,
				"oapnotProvidedWork" : null,
				"delayWagesPaymentCount" : null,
				"oapnotProvidedJc" : null,
				"complaintsAgainstBDOVP" : null,
				"demandForRenewelJc" : null,
				"delayWagesPaymentAmt" : null,
				"createdDate" : null,
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

	    $scope.grievance = {
	    	   	"id" : 0,
				"others" : null,
				"status" : null,
				"roundId" : null,
				"createdBy" : null,
				"auditId" : 1,
				"modifiedBy" : null,
				"blockName" : null,
				"wagesNotPaidWorkersActuallyWorkedCount" : null,
				"transportAllowanceNotGivenCount" : null,
				"demandForIndividualBenefitScheme" : null,
				"totalReceivedGrievancesMeeting" : null,
				"complaintsAgainstUnionOverseer" : null,
				"complaintsAgainstVPSecretory" : null,
				"wagesDrawnLessThanActualNoDaysCount" : null,
				"wagesDrawnLessThanActualNoDaysAmt" : null,
				"wagesNotPaidWorkersActuallyWorkedAmt" : null,
				"noCompensationInjuredAtWorksiteAmt" : null,
				"nonProvisionOfWorkSiteFacilities" : null,
				"noCompensationDeadAtWorksiteCount" : null,
				"reqPaymentCompletedIHHLWorkCount" : null,
				"fullEntitlementNotGivenCount" : null,
				"complaintsAgainstVPPresident" : null,
				"complaintAgainstBankingCorrespondent" : null,
				"lessPaymentValueRecordedMBookAmt" : null,
				"transportAllowanceNotGivenAmt" : null,
				"complaintsAgainstWorksiteFacilidator" : null,
				"lessPaymentValueRecordedMBookCount" : null,
				"noCompensationDeadAtWorksiteAmt" : null,
				"reqPaymentCompletedIHHLWorkAmt" : null,
				"reqForConstructionCattleShelter" : null,
				"noCompensationInjuredAtWorksiteCount" : null,
				"auditDistrictId" : null,
				"totalReceivedGrievancesHF" : null,
				"reqForNewJc" : null,
				"reqForConstructionIAYHouse" : null,
				"demandForLibraryBuilding" : null,
				"reqForConstructionIHHL" : null,
				"demandForWork" : null,
				"reqForMoreThan100Days" : null,
				"demandForPds" : null,
				"demandForWagesIncrease" : null,
				"fullEntitlementNotGivenAmt" : null,
				"oapnotProvidedWork" : null,
				"delayWagesPaymentCount" : null,
				"oapnotProvidedJc" : null,
				"complaintsAgainstBDOVP" : null,
				"demandForRenewelJc" : null,
				"delayWagesPaymentAmt" : null,
				"createdDate" : null,
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
		    	
		    	$scope.grievance.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = grievancefactory.doSubmitData($scope.grievance);
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
						$scope.CloseAddAuditGrievanceWindow();
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
		    	$scope.editgrievance = {
			  		id : data.id,
					others : data.others,
					status : false,
					roundId : data.roundId,
					createdBy : data.createdBy,
					auditId : data.auditId,
					modifiedBy : data.modifiedBy,
					blockName : data.blockName,
					wagesNotPaidWorkersActuallyWorkedCount : data.wagesNotPaidWorkersActuallyWorkedCount,
					transportAllowanceNotGivenCount : data.transportAllowanceNotGivenCount,
					demandForIndividualBenefitScheme : data.demandForIndividualBenefitScheme,
					totalReceivedGrievancesMeeting : data.totalReceivedGrievancesMeeting,
					complaintsAgainstUnionOverseer : data.complaintsAgainstUnionOverseer,
					complaintsAgainstVPSecretory : data.complaintsAgainstVPSecretory,
					wagesDrawnLessThanActualNoDaysCount : data.wagesDrawnLessThanActualNoDaysCount,
					wagesDrawnLessThanActualNoDaysAmt : data.wagesDrawnLessThanActualNoDaysAmt,
					wagesNotPaidWorkersActuallyWorkedAmt : data.wagesNotPaidWorkersActuallyWorkedAmt,
					noCompensationInjuredAtWorksiteAmt : data.noCompensationInjuredAtWorksiteAmt,
					nonProvisionOfWorkSiteFacilities : data.nonProvisionOfWorkSiteFacilities,
					noCompensationDeadAtWorksiteCount : data.noCompensationDeadAtWorksiteCount,
					reqPaymentCompletedIHHLWorkCount : data.reqPaymentCompletedIHHLWorkCount,
					fullEntitlementNotGivenCount : data.fullEntitlementNotGivenCount,
					complaintsAgainstVPPresident : data.complaintsAgainstVPPresident,
					complaintAgainstBankingCorrespondent : data.complaintAgainstBankingCorrespondent,
					lessPaymentValueRecordedMBookAmt : data.lessPaymentValueRecordedMBookAmt,
					transportAllowanceNotGivenAmt : data.transportAllowanceNotGivenAmt,
					complaintsAgainstWorksiteFacilidator : data.complaintsAgainstWorksiteFacilidator,
					lessPaymentValueRecordedMBookCount : data.lessPaymentValueRecordedMBookCount,
					noCompensationDeadAtWorksiteAmt : data.noCompensationDeadAtWorksiteAmt,
					reqPaymentCompletedIHHLWorkAmt : data.reqPaymentCompletedIHHLWorkAmt,
					reqForConstructionCattleShelter : data.reqForConstructionCattleShelter,
					noCompensationInjuredAtWorksiteCount : data.noCompensationInjuredAtWorksiteCount,
					auditDistrictId : data.auditDistrictId,
					totalReceivedGrievancesHF : data.totalReceivedGrievancesHF,
					reqForNewJc : data.reqForNewJc,
					reqForConstructionIAYHouse : data.reqForConstructionIAYHouse,
					demandForLibraryBuilding : data.demandForLibraryBuilding,
					reqForConstructionIHHL : data.reqForConstructionIHHL,
					demandForWork : data.demandForWork,
					reqForMoreThan100Days : data.reqForMoreThan100Days,
					demandForPds : data.demandForPds,
					demandForWagesIncrease : data.demandForWagesIncrease,
					fullEntitlementNotGivenAmt : data.fullEntitlementNotGivenAmt,
					oapnotProvidedWork : data.oapnotProvidedWork,
					delayWagesPaymentCount : data.delayWagesPaymentCount,
					oapnotProvidedJc : data.oapnotProvidedJc,
					complaintsAgainstBDOVP : data.complaintsAgainstBDOVP,
					demandForRenewelJc : data.demandForRenewelJc,
					delayWagesPaymentAmt : data.delayWagesPaymentAmt,
					createdDate : data.createdDate,
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
	    	var responseText = grievancefactory.doUpdateData($scope.editgrievance);
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
					$scope.CloseEditAuditGrievanceWindow();				        
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update audit Grievance!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update audit Grievance!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.grievance.modifiedBy = $rootScope.sessionConfig.userId;
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

	    	$scope.editgrievance = {
		  		id : data.id,
				others : data.others,
				status : data.status,
				roundId : data.roundId,
				createdBy : data.createdBy,
				auditId : data.auditId,
				modifiedBy : data.modifiedBy,
				blockName : data.blockName,
				wagesNotPaidWorkersActuallyWorkedCount : data.wagesNotPaidWorkersActuallyWorkedCount,
				transportAllowanceNotGivenCount : data.transportAllowanceNotGivenCount,
				demandForIndividualBenefitScheme : data.demandForIndividualBenefitScheme,
				totalReceivedGrievancesMeeting : data.totalReceivedGrievancesMeeting,
				complaintsAgainstUnionOverseer : data.complaintsAgainstUnionOverseer,
				complaintsAgainstVPSecretory : data.complaintsAgainstVPSecretory,
				wagesDrawnLessThanActualNoDaysCount : data.wagesDrawnLessThanActualNoDaysCount,
				wagesDrawnLessThanActualNoDaysAmt : data.wagesDrawnLessThanActualNoDaysAmt,
				wagesNotPaidWorkersActuallyWorkedAmt : data.wagesNotPaidWorkersActuallyWorkedAmt,
				noCompensationInjuredAtWorksiteAmt : data.noCompensationInjuredAtWorksiteAmt,
				nonProvisionOfWorkSiteFacilities : data.nonProvisionOfWorkSiteFacilities,
				noCompensationDeadAtWorksiteCount : data.noCompensationDeadAtWorksiteCount,
				reqPaymentCompletedIHHLWorkCount : data.reqPaymentCompletedIHHLWorkCount,
				fullEntitlementNotGivenCount : data.fullEntitlementNotGivenCount,
				complaintsAgainstVPPresident : data.complaintsAgainstVPPresident,
				complaintAgainstBankingCorrespondent : data.complaintAgainstBankingCorrespondent,
				lessPaymentValueRecordedMBookAmt : data.lessPaymentValueRecordedMBookAmt,
				transportAllowanceNotGivenAmt : data.transportAllowanceNotGivenAmt,
				complaintsAgainstWorksiteFacilidator : data.complaintsAgainstWorksiteFacilidator,
				lessPaymentValueRecordedMBookCount : data.lessPaymentValueRecordedMBookCount,
				noCompensationDeadAtWorksiteAmt : data.noCompensationDeadAtWorksiteAmt,
				reqPaymentCompletedIHHLWorkAmt : data.reqPaymentCompletedIHHLWorkAmt,
				reqForConstructionCattleShelter : data.reqForConstructionCattleShelter,
				noCompensationInjuredAtWorksiteCount : data.noCompensationInjuredAtWorksiteCount,
				auditDistrictId : data.auditDistrictId,
				totalReceivedGrievancesHF : data.totalReceivedGrievancesHF,
				reqForNewJc : data.reqForNewJc,
				reqForConstructionIAYHouse : data.reqForConstructionIAYHouse,
				demandForLibraryBuilding : data.demandForLibraryBuilding,
				reqForConstructionIHHL : data.reqForConstructionIHHL,
				demandForWork : data.demandForWork,
				reqForMoreThan100Days : data.reqForMoreThan100Days,
				demandForPds : data.demandForPds,
				demandForWagesIncrease : data.demandForWagesIncrease,
				fullEntitlementNotGivenAmt : data.fullEntitlementNotGivenAmt,
				oapnotProvidedWork : data.oapnotProvidedWork,
				delayWagesPaymentCount : data.delayWagesPaymentCount,
				oapnotProvidedJc : data.oapnotProvidedJc,
				complaintsAgainstBDOVP : data.complaintsAgainstBDOVP,
				demandForRenewelJc : data.demandForRenewelJc,
				delayWagesPaymentAmt : data.delayWagesPaymentAmt,
				createdDate : data.createdDate,
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
	    	$scope.OpenEditAuditGrievanceWindow();
	    }

	    $scope.gridOptions = {
			columns: [
				{ field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
				{ field: "financialYear", locked: true, groupable:true,width: '80px', title:'FY', footerTemplate: "Total :"},
				{ field: "roundName", locked: true, groupable:true,width: '90px', title:'Round'},
				{ field: "districtName", locked: true, groupable:true,width: '90px', title:'District'},
				{ field: "blockName", locked: true, groupable:true,width: '90px', title:'Block'},
				{ field: "vpName", locked: true, groupable:true,width: '120px', title:'Panchayat'},
				{ field: "totalReceivedGrievancesHF", title:'Grievances received during Household verification', groupable:false,width: '250px' },
				{ field: "totalReceivedGrievancesMeeting", title:'Grievances received during GS meeting', groupable:false,width: '140px' },
				{ field: "hfTotal",title: 'Total',groupable:false,width: '140px'},
				{ field: "reqForNewJc", title:'Request for new Job card', groupable:false,width: '130px' },
				{ field: "reqForMoreThan100Days", title : "Request for work for more than 100 days", groupable:false,width: '200px' },
				{ field: "reqForConstructionIHHL", title : "Request for constructions of IHHL", groupable:false,width: '150px' },
				{ field: "reqForConstructionIAYHouse", title : "Request for construction of IAY house", groupable:false,width: '150px' },
				{ field: "reqForConstructionCattleShelter", title : "Request for the construction of cattle shelter", groupable:false,width: '150px' },
				{ field: "demandForWork", title : "Demand for MNREGA work", groupable:false,width: '150px' },
				{ field: "demandForRenewelJc", title : "Demand for renewal of job card", groupable:false,width: '150px' },
				{ field: "demandForIndividualBenefitScheme", title : "Demand for individual benefit schemes", groupable:false,width: '180px' },
				{ field: "demandForWagesIncrease", title : "Demand for Wage increase", groupable:false,width: '150px' },

				{ field: "demandForPds", title : "Demand for PDS", groupable:false,width: '130px' },
				{ field: "demandForLibraryBuilding", title : "Demand for library building", groupable:false,width: '130px' },
				{ field: "nonProvisionOfWorkSiteFacilities", title : "Non provision of work site facilities", groupable:false,width: '130px' },
				{ field: "complaintAgainstBankingCorrespondent", title : "Complaint against Banking correspondent", groupable:false,width: '130px' },
				{ field: "oapnotProvidedJc", title : "OAP not provided job card", groupable:false,width: '130px' },
				{ field: "oapnotProvidedWork", title : "OAP not provided work", groupable:false,width: '130px' },
				{ field: "complaintsAgainstWorksiteFacilidator", title : "Complaints against worksite facilitator", groupable:false,width: '130px' },
				{ field: "complaintsAgainstVPPresident", title : "Complaints against VP president", groupable:false,width: '130px' },
				{ field: "complaintsAgainstUnionOverseer", title : "Complaints against Union Overseer", groupable:false,width: '130px' },
				{ field: "complaintsAgainstBDOVP", title : "Complaint against BDO VP", groupable:false,width: '130px' },
				{ field: "complaintsAgainstVPSecretory", title : "Complaint against VP Secretary", groupable:false,width: '130px' },
				{ field: "others", title : "Others", groupable:false,width: '130px' },
				{
					title : "Delay in wage payment",
					columns :[
						{ field: "delayWagesPaymentCount",headerTemplate: "No", title : "Delay in wage payment No",width: '130px', groupable:false },
						{ field: "delayWagesPaymentAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Delay in wage payment Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Full entitlement not given to differently abled",
					columns :[
						{ field: "fullEntitlementNotGivenCount", headerTemplate : "No", title : "Full entitlement not given to differently abled No",width: '130px', groupable:false },
						{ field: "fullEntitlementNotGivenAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Full entitlement not given to differently abled Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Less than payment value recorded in M-Book",
					columns :[
						{ field: "lessPaymentValueRecordedMBookCount", headerTemplate : "No", title : "Less than payment value recorded in M-Book No",width: '130px', groupable:false },
						{ field: "lessPaymentValueRecordedMBookAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Less than payment value recorded in M-Book Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Wages drawn for days less than actual no of days worked",
					columns :[
						{ field: "wagesDrawnLessThanActualNoDaysCount", headerTemplate : "No", title:"Wages drawn for days less than actual no of days worked No",width: '130px', groupable:false },
						{ field: "wagesDrawnLessThanActualNoDaysAmt",format: '{0:n0}', headerTemplate : "Amount", title:"Wages drawn for days less than actual no of days worked Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Wages not paid to workers who actually worked",
					columns :[
						{ field: "wagesNotPaidWorkersActuallyWorkedCount", headerTemplate : "No",title : "Wages not paid to workers who actually worked No",width: '130px', groupable:false },
						{ field: "wagesNotPaidWorkersActuallyWorkedAmt",format: '{0:n0}', headerTemplate : "Amount",title : "Wages not paid to workers who actually worked Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Transport allowance not given",
					columns :[
						{ field: "transportAllowanceNotGivenCount", headerTemplate : "No",title : "Transport allowance not given No",width: '130px', groupable:false },
						{ field: "transportAllowanceNotGivenAmt",format: '{0:n0}', headerTemplate : "Amount",title : "Transport allowance not given Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "No compensation for injured at worksite",
					columns :[
						{ field: "noCompensationInjuredAtWorksiteCount", headerTemplate : "No", title : "No compensation for injured at worksite No",width: '130px', groupable:false },
						{ field: "noCompensationInjuredAtWorksiteAmt",format: '{0:n0}', headerTemplate : "Amount", title : "No compensation for injured at worksite Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "No compensation for death at worksite",
					columns :[
						{ field: "noCompensationDeadAtWorksiteCount", headerTemplate : "No", title : "No compensation for death at worksite No",width: '130px', groupable:false },
						{ field: "noCompensationDeadAtWorksiteAmt",format: '{0:n0}', headerTemplate : "Amount", title : "No compensation for death at worksite Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "No of requests for payment of completed IHHL work",
					columns :[
						{ field: "reqPaymentCompletedIHHLWorkCount", headerTemplate : "No",title: "No of requests for payment of completed IHHL work No",width: '130px', groupable:false },
						{ field: "reqPaymentCompletedIHHLWorkAmt",format: '{0:n0}', headerTemplate : "Amount",title: "No of requests for payment of completed IHHL work Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "Total",
					columns :[
						{ field: "TotalNo", headerTemplate : "No",title: "Total No",width: '130px', groupable:false },
						{ field: "TotalAmt",format: '{0:n0}', headerTemplate : "Amount",title: "Total Amount",width: '130px', groupable:false },
					]
				},
				{
					title : "",
					width: '60px',
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
                    refresh: "Refresh Grievances"
                }
            },	        
	        dataSource: {
	        	pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var baseUrl = $scope.crudServiceBaseUrl + 
	                	'/grievances/getlist?key='+encodeURIComponent($location.search().aid);
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
                            totalReceivedGrievancesHF: { type: "number" },
                            totalReceivedGrievancesMeeting: { type: "number" },
                            hfTotal: { type: "number" },
                            reqForNewJc: { type: "number" },
                            reqForMoreThan100Days: { type: "number" },
                            reqForConstructionIHHL: { type: "number" },
                            reqForConstructionIAYHouse: { type: "number" },
                            reqForConstructionCattleShelter: { type: "number" },
                            demandForWork: { type: "number" },
                            demandForRenewelJc: { type: "number" },
                            demandForIndividualBenefitScheme: { type: "number" },
                            demandForWagesIncrease: { type: "number" },
                            demandForPds: { type: "number" },
                            demandForLibraryBuilding: { type: "number" },
                            nonProvisionOfWorkSiteFacilities: { type: "number" },
                            complaintAgainstBankingCorrespondent: { type: "number" },
                            oapnotProvidedJc: { type: "number" },
                            oapnotProvidedWork: { type: "number" },
                            complaintsAgainstVPPresident: { type: "number" },
                            complaintsAgainstUnionOverseer: { type: "number" },
                            complaintsAgainstBDOVP: { type: "number" },
                            complaintsAgainstWorksiteFacilidator: { type: "number" },
                            complaintsAgainstVPSecretory: { type: "number" },
                            others: { type: "number" },
                            delayWagesPaymentCount: { type: "number" },
                            delayWagesPaymentAmt: { type: "number" },
                            fullEntitlementNotGivenCount: { type: "number" },
                            fullEntitlementNotGivenAmt: { type: "number" },
                            lessPaymentValueRecordedMBookCount: { type: "number" },
                            lessPaymentValueRecordedMBookAmt: { type: "number" },
                            wagesDrawnLessThanActualNoDaysCount: { type: "number" },
                            wagesDrawnLessThanActualNoDaysAmt: { type: "number" },
                            wagesNotPaidWorkersActuallyWorkedCount: { type: "number" },
                            wagesNotPaidWorkersActuallyWorkedAmt: { type: "number" },
                            transportAllowanceNotGivenCount: { type: "number" },
                            transportAllowanceNotGivenAmt: { type: "number" },
                            noCompensationInjuredAtWorksiteCount: { type: "number" },
                            noCompensationInjuredAtWorksiteAmt: { type: "number" },
                            noCompensationDeadAtWorksiteCount: { type: "number" },
                            noCompensationDeadAtWorksiteAmt: { type: "number" },
                            reqPaymentCompletedIHHLWorkCount: { type: "number" },
                            reqPaymentCompletedIHHLWorkAmt: { type: "number" },
                            TotalNo: { type: "number" },
                            TotalAmt: { type: "number" }  
                        }
                    },
				    parse : function (d) {
				        $.each(d, function(idx, elem) {
				            elem.hfTotal = (elem.totalReceivedGrievancesHF || 0) + (elem.totalReceivedGrievancesMeeting||0);
				            elem.TotalNo =  ( elem.reqForNewJc || 0) + 
											( elem.reqForMoreThan100Days || 0) + 
											( elem.reqForConstructionIHHL || 0) + 
											( elem.reqForConstructionIAYHouse || 0) + 
											( elem.reqForConstructionCattleShelter || 0) + 
											( elem.demandForWork || 0) + 
											( elem.demandForRenewelJc || 0) + 
											( elem.demandForIndividualBenefitScheme || 0) + 
											( elem.demandForWagesIncrease || 0) + 
											( elem.demandForPds || 0) + 
											( elem.demandForLibraryBuilding || 0) + 
											( elem.nonProvisionOfWorkSiteFacilities || 0) + 
											( elem.complaintAgainstBankingCorrespondent || 0) + 
											( elem.oapnotProvidedJc || 0) + 
											( elem.oapnotProvidedWork || 0) + 
											( elem.complaintsAgainstVPPresident || 0) + 
											( elem.complaintsAgainstUnionOverseer || 0) + 
											( elem.complaintsAgainstBDOVP || 0) + 
											( elem.complaintsAgainstWorksiteFacilidator || 0) + 
											( elem.complaintsAgainstVPSecretory || 0) + 
											( elem.others || 0) + 
											(elem.delayWagesPaymentCount || 0) + 
											(elem.fullEntitlementNotGivenCount||0)+
											(elem.lessPaymentValueRecordedMBookCount||0)+
											(elem.wagesDrawnLessThanActualNoDaysCount||0)+
											(elem.wagesNotPaidWorkersActuallyWorkedCount||0)+
											(elem.transportAllowanceNotGivenCount||0)+
											(elem.noCompensationInjuredAtWorksiteCount||0)+
											(elem.noCompensationDeadAtWorksiteCount||0)+
											(elem.reqPaymentCompletedIHHLWorkCount||0);
				            elem.TotalAmt = (elem.delayWagesPaymentAmt || 0) + 
				            				(elem.fullEntitlementNotGivenAmt||0)+
				            				(elem.lessPaymentValueRecordedMBookAmt||0)+
				            				(elem.wagesDrawnLessThanActualNoDaysAmt||0)+
				            				(elem.wagesNotPaidWorkersActuallyWorkedAmt||0)+
				            				(elem.transportAllowanceNotGivenAmt||0)+
				            				(elem.noCompensationInjuredAtWorksiteAmt||0)+
				            				(elem.noCompensationDeadAtWorksiteAmt||0)+
				            				(elem.reqPaymentCompletedIHHLWorkAmt||0);
				        });
				        return d;
				    }
                }
	        }
	    }

	    function GetAudit(id)
	    {
	    	var deffered = jQuery.Deferred();
	    	grievancefactory.getAudit(id).success(function(result){

		    		$scope.grievance.auditId= result.data.auditId;
		    		$scope.grievance.roundId =result.data.roundId;
			    	$scope.grievance.auditDistrictId =result.data.auditDistrictId;
			    	$scope.grievance.blockId =result.data.auditBlockId;
			    	$scope.grievance.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	grievancefactory.getLookupValues(type).success(function(result){
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

		GetLookupValues(13); 
		GetLookupValues(2); 
		GetLookupValues(1); 
		GetLookupValues(14); 
}]);

app.factory('grievancefactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/grievances/create';

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
            url : crudServiceBaseUrl + '/grievances/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});