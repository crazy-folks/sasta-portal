app.controller('MisappropriationController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','misappropriationfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,misappropriationfactory){
		$scope.aufactory = misappropriationfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditMisappropriationTitle : "Add Audit Misappropriation",
	    	EditAuditMisappropriationTitle : "Edit Audit Misappropriation"
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
            content: 'admin/misappropriation/add.html',
            title: $scope.modelDialogTitle.AddAuditMisappropriationTitle,
            height: '400px',
            width: '800px',            
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

        $scope.AddAuditFormName = '#frmAddAuditMisappropriation';
        $scope.EditAuditFormName = '#frmEditAuditMisappropriation';    

        $scope.keditWindowOptions = {
            content: 'admin/misappropriation/edit.html',
            title: $scope.modelDialogTitle.EditAuditMisappropriationTitle,
            height: '400px',
            width: '800px',
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
        }

        $scope.OpenEditAuditWindow = function(){
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editAuditWindow.center().open();
        }

        $scope.CloseEditAuditWindow = function(){
            $scope.editAuditWindow.close();
        }

        $scope.doReset = function(){
        	$scope.misappropriation = angular.copy($scope.defaultOptions);
        	$scope.editmisappropriation =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
	    	   	 "id" : 0,
				 "createdByName" : null,
				 "modifiedByName" : null,
				 "createdDate" : null,
				 "auditDistrictId" : null,
				 "modifiedDate" : null,
				 "financialDescription" : null,
				 "financialYear" : null,
				 "status" : null,
				 "misappropriationByVPTSecretoryCount" : null,
				 "wagesCreditedWrongAccountsCount" : null,
				 "misappropriationByVPTSecretoryAmt" : null,
				 "wagesDrawnMoreThanActualWorkingDayAmt" : null,
				 "missingMgnregaComponentGHAmt" : null,
				 "bogusEntriesFTOCorretingFluidAmt" : null,
				 "missingMgnregaComponentIAYAmt" : null,
				 "wagesCreditedWrongAccountsAmt" : null,
				 "missingMgnregaComponentGHCount" : null,
				 "misappropriationByVPTPresidentCount" : null,
				 "misappropriationByVPTPresidentAmt" : null,
				 "missingMgnregaComponentIAYCount" : null,
				 "wagesDisbursedPrevConstructedIHHLSCount" : null,
				 "multipleJcIssuedWorkersCount" : null,
				 "wagesDisbursedPrevConstructedIHHLSAmt" : null,
				 "bogusEntriesFTOCorretingFluidCount" : null,
				 "wagesDrawnMoreThanActualWorkingDayCount" : null,
				 "wagesNonExistentAmt" : null,
				 "wagesMigratedAmt" : null,
				 "doubleWagessCount" : null,
				 "wagedToDeadAmt" : null,
				 "multipleJcIssuedWorkersAmt" : null,
				 "doubleWagesAmt" : null,
				 "wagesPaidToNotWorkedAmt" : null,
				 "doubleWagesWSFAmt" : null,
				 "inclusionBogousFTOCount" : null,
				 "roundDescription" : null,
				 "districtName" : null,
				 "wagesNonExistentCount" : null,
				 "wagedToDeadCount" : null,
				 "wagesMigratedCount" : null,
				 "wagesPaidToNotWorkedCount" : null,
				 "doubleWagesWSFCount" : null,
				 "inclusionBogousFTOAmt" : null,
				 "wagesPaidSameAccCount" : null,
				 "wagesPaidSameAccAmt" : null,
				 "missingTanksEriCount" : null,
				 "machineryUsedAmt" : null,
				 "missingPoultryAmt" : null,
				 "amountDrawnSameWorkAmt" : null,
				 "missingRoadsCount" : null,
				 "missingCattleShedAmt" : null,
				 "missingCanalAmt" : null,
				 "workDoneByContractorsCount" : null,
				 "missingCattleShedCount" : null,
				 "roundStartDate" : null,
				 "missingTanksEriAmt" : null,
				 "missingRoadsAmt" : null,
				 "amountDrawnSameWorkCount" : null,
				 "missingFarmPondAmt" : null,
				 "missingIHHLSAmt" : null,
				 "roundEndDate" : null,
				 "missingGoatShedAmt" : null,
				 "missingPoultryCount" : null,
				 "missingIHHLSCount" : null,
				 "missingPlantationsAmt" : null,
				 "workDoneByContractorsAmt" : null,
				 "machineryUsedCount" : null,
				 "missingPlantationsCount" : null,
				 "missingCanalCount" : null,
				 "missingFarmPondCount" : null,
				 "missingGoatShedCount" : null,
				 "createdBy" : null,
				 "roundId" : null,
				 "roundName" : null,
				 "vpName" : null,
				 "modifiedBy" : null,
				 "blockName" : null,
				 "auditId" : null,
				 "blockId" : null,
				 "vpId" : null
	    };

	    $scope.misappropriation = {
	    	   	 "id" : 0,
				 "createdByName" : null,
				 "modifiedByName" : null,
				 "createdDate" : null,
				 "auditDistrictId" : null,
				 "modifiedDate" : null,
				 "financialDescription" : null,
				 "financialYear" : null,
				 "status" : null,
				 "misappropriationByVPTSecretoryCount" : null,
				 "wagesCreditedWrongAccountsCount" : null,
				 "misappropriationByVPTSecretoryAmt" : null,
				 "wagesDrawnMoreThanActualWorkingDayAmt" : null,
				 "missingMgnregaComponentGHAmt" : null,
				 "bogusEntriesFTOCorretingFluidAmt" : null,
				 "missingMgnregaComponentIAYAmt" : null,
				 "wagesCreditedWrongAccountsAmt" : null,
				 "missingMgnregaComponentGHCount" : null,
				 "misappropriationByVPTPresidentCount" : null,
				 "misappropriationByVPTPresidentAmt" : null,
				 "missingMgnregaComponentIAYCount" : null,
				 "wagesDisbursedPrevConstructedIHHLSCount" : null,
				 "multipleJcIssuedWorkersCount" : null,
				 "wagesDisbursedPrevConstructedIHHLSAmt" : null,
				 "bogusEntriesFTOCorretingFluidCount" : null,
				 "wagesDrawnMoreThanActualWorkingDayCount" : null,
				 "wagesNonExistentAmt" : null,
				 "wagesMigratedAmt" : null,
				 "doubleWagessCount" : null,
				 "wagedToDeadAmt" : null,
				 "multipleJcIssuedWorkersAmt" : null,
				 "doubleWagesAmt" : null,
				 "wagesPaidToNotWorkedAmt" : null,
				 "doubleWagesWSFAmt" : null,
				 "inclusionBogousFTOCount" : null,
				 "roundDescription" : null,
				 "districtName" : null,
				 "wagesNonExistentCount" : null,
				 "wagedToDeadCount" : null,
				 "wagesMigratedCount" : null,
				 "wagesPaidToNotWorkedCount" : null,
				 "doubleWagesWSFCount" : null,
				 "inclusionBogousFTOAmt" : null,
				 "wagesPaidSameAccCount" : null,
				 "wagesPaidSameAccAmt" : null,
				 "missingTanksEriCount" : null,
				 "machineryUsedAmt" : null,
				 "missingPoultryAmt" : null,
				 "amountDrawnSameWorkAmt" : null,
				 "missingRoadsCount" : null,
				 "missingCattleShedAmt" : null,
				 "missingCanalAmt" : null,
				 "workDoneByContractorsCount" : null,
				 "missingCattleShedCount" : null,
				 "roundStartDate" : null,
				 "missingTanksEriAmt" : null,
				 "missingRoadsAmt" : null,
				 "amountDrawnSameWorkCount" : null,
				 "missingFarmPondAmt" : null,
				 "missingIHHLSAmt" : null,
				 "roundEndDate" : null,
				 "missingGoatShedAmt" : null,
				 "missingPoultryCount" : null,
				 "missingIHHLSCount" : null,
				 "missingPlantationsAmt" : null,
				 "workDoneByContractorsAmt" : null,
				 "machineryUsedCount" : null,
				 "missingPlantationsCount" : null,
				 "missingCanalCount" : null,
				 "missingFarmPondCount" : null,
				 "missingGoatShedCount" : null,
				 "createdBy" : null,
				 "roundId" : null,
				 "roundName" : null,
				 "vpName" : null,
				 "modifiedBy" : null,
				 "blockName" : null,
				 "auditId" : null,
				 "blockId" : null,
				 "vpId" : null

	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	
		    	$scope.misappropriation.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = misappropriationfactory.doSubmitData($scope.misappropriation);
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
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add misappropriation!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add misappropriation!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editmisappropriation = {
				  	id: data.id,
					createdByName: data.createdByName,
					modifiedByName: data.modifiedByName,
					createdDate: data.createdDate,
					auditDistrictId: data.auditDistrictId,
					modifiedDate: data.modifiedDate,
					financialDescription: data.financialDescription,
					financialYear: data.financialYear,
					status: false,
					misappropriationByVPTSecretoryCount: data.misappropriationByVPTSecretoryCount,
					wagesCreditedWrongAccountsCount: data.wagesCreditedWrongAccountsCount,
					misappropriationByVPTSecretoryAmt: data.misappropriationByVPTSecretoryAmt,
					wagesDrawnMoreThanActualWorkingDayAmt: data.wagesDrawnMoreThanActualWorkingDayAmt,
					missingMgnregaComponentGHAmt: data.missingMgnregaComponentGHAmt,
					bogusEntriesFTOCorretingFluidAmt: data.bogusEntriesFTOCorretingFluidAmt,
					missingMgnregaComponentIAYAmt: data.missingMgnregaComponentIAYAmt,
					wagesCreditedWrongAccountsAmt: data.wagesCreditedWrongAccountsAmt,
					missingMgnregaComponentGHCount: data.missingMgnregaComponentGHCount,
					misappropriationByVPTPresidentCount: data.misappropriationByVPTPresidentCount,
					misappropriationByVPTPresidentAmt: data.misappropriationByVPTPresidentAmt,
					missingMgnregaComponentIAYCount: data.missingMgnregaComponentIAYCount,
					wagesDisbursedPrevConstructedIHHLSCount: data.wagesDisbursedPrevConstructedIHHLSCount,
					multipleJcIssuedWorkersCount: data.multipleJcIssuedWorkersCount,
					wagesDisbursedPrevConstructedIHHLSAmt: data.wagesDisbursedPrevConstructedIHHLSAmt,
					bogusEntriesFTOCorretingFluidCount: data.bogusEntriesFTOCorretingFluidCount,
					wagesDrawnMoreThanActualWorkingDayCount: data.wagesDrawnMoreThanActualWorkingDayCount,
					wagesNonExistentAmt: data.wagesNonExistentAmt,
					wagesMigratedAmt: data.wagesMigratedAmt,
					doubleWagessCount: data.doubleWagessCount,
					wagedToDeadAmt: data.wagedToDeadAmt,
					multipleJcIssuedWorkersAmt: data.multipleJcIssuedWorkersAmt,
					doubleWagesAmt: data.doubleWagesAmt,
					wagesPaidToNotWorkedAmt: data.wagesPaidToNotWorkedAmt,
					doubleWagesWSFAmt: data.doubleWagesWSFAmt,
					inclusionBogousFTOCount: data.inclusionBogousFTOCount,
					roundDescription: data.roundDescription,
					districtName: data.districtName,
					wagesNonExistentCount: data.wagesNonExistentCount,
					wagedToDeadCount: data.wagedToDeadCount,
					wagesMigratedCount: data.wagesMigratedCount,
					wagesPaidToNotWorkedCount: data.wagesPaidToNotWorkedCount,
					doubleWagesWSFCount: data.doubleWagesWSFCount,
					inclusionBogousFTOAmt: data.inclusionBogousFTOAmt,
					wagesPaidSameAccCount: data.wagesPaidSameAccCount,
					wagesPaidSameAccAmt: data.wagesPaidSameAccAmt,
					missingTanksEriCount: data.missingTanksEriCount,
					machineryUsedAmt: data.machineryUsedAmt,
					missingPoultryAmt: data.missingPoultryAmt,
					amountDrawnSameWorkAmt: data.amountDrawnSameWorkAmt,
					missingRoadsCount: data.missingRoadsCount,
					missingCattleShedAmt: data.missingCattleShedAmt,
					missingCanalAmt: data.missingCanalAmt,
					workDoneByContractorsCount: data.workDoneByContractorsCount,
					missingCattleShedCount: data.missingCattleShedCount,
					roundStartDate: data.roundStartDate,
					missingTanksEriAmt: data.missingTanksEriAmt,
					missingRoadsAmt: data.missingRoadsAmt,
					amountDrawnSameWorkCount: data.amountDrawnSameWorkCount,
					missingFarmPondAmt: data.missingFarmPondAmt,
					missingIHHLSAmt: data.missingIHHLSAmt,
					roundEndDate: data.roundEndDate,
					missingGoatShedAmt: data.missingGoatShedAmt,
					missingPoultryCount: data.missingPoultryCount,
					missingIHHLSCount: data.missingIHHLSCount,
					missingPlantationsAmt: data.missingPlantationsAmt,
					workDoneByContractorsAmt: data.workDoneByContractorsAmt,
					machineryUsedCount: data.machineryUsedCount,
					missingPlantationsCount: data.missingPlantationsCount,
					missingCanalCount: data.missingCanalCount,
					missingFarmPondCount: data.missingFarmPondCount,
					missingGoatShedCount: data.missingGoatShedCount,
					createdBy: $rootScope.sessionConfig.userId,
					roundId: data.roundId,
					roundName: data.roundName,
					vpName: data.vpName,
					modifiedBy: $rootScope.sessionConfig.userId,
					blockName: data.blockName,
					auditId: data.auditId,
					blockId: data.blockId,
					vpId: data.vpId
		    	};
		    	DoUpdate(); 
	    	}
	    }

	    function DoUpdate () {
	    	var responseText = misappropriationfactory.doUpdateData($scope.editmisappropriation);
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
			            messageTemplate: '<span>Unable to update misappropriation!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update misappropriation!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	 
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
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
	    	$scope.editmisappropriation = {
			  	id: data.id,
				createdByName: data.createdByName,
				modifiedByName: data.modifiedByName,
				createdDate: data.createdDate,
				auditDistrictId: data.auditDistrictId,
				modifiedDate: data.modifiedDate,
				financialDescription: data.financialDescription,
				financialYear: data.financialYear,
				status: data.status,
				misappropriationByVPTSecretoryCount: data.misappropriationByVPTSecretoryCount,
				wagesCreditedWrongAccountsCount: data.wagesCreditedWrongAccountsCount,
				misappropriationByVPTSecretoryAmt: data.misappropriationByVPTSecretoryAmt,
				wagesDrawnMoreThanActualWorkingDayAmt: data.wagesDrawnMoreThanActualWorkingDayAmt,
				missingMgnregaComponentGHAmt: data.missingMgnregaComponentGHAmt,
				bogusEntriesFTOCorretingFluidAmt: data.bogusEntriesFTOCorretingFluidAmt,
				missingMgnregaComponentIAYAmt: data.missingMgnregaComponentIAYAmt,
				wagesCreditedWrongAccountsAmt: data.wagesCreditedWrongAccountsAmt,
				missingMgnregaComponentGHCount: data.missingMgnregaComponentGHCount,
				misappropriationByVPTPresidentCount: data.misappropriationByVPTPresidentCount,
				misappropriationByVPTPresidentAmt: data.misappropriationByVPTPresidentAmt,
				missingMgnregaComponentIAYCount: data.missingMgnregaComponentIAYCount,
				wagesDisbursedPrevConstructedIHHLSCount: data.wagesDisbursedPrevConstructedIHHLSCount,
				multipleJcIssuedWorkersCount: data.multipleJcIssuedWorkersCount,
				wagesDisbursedPrevConstructedIHHLSAmt: data.wagesDisbursedPrevConstructedIHHLSAmt,
				bogusEntriesFTOCorretingFluidCount: data.bogusEntriesFTOCorretingFluidCount,
				wagesDrawnMoreThanActualWorkingDayCount: data.wagesDrawnMoreThanActualWorkingDayCount,
				wagesNonExistentAmt: data.wagesNonExistentAmt,
				wagesMigratedAmt: data.wagesMigratedAmt,
				doubleWagessCount: data.doubleWagessCount,
				wagedToDeadAmt: data.wagedToDeadAmt,
				multipleJcIssuedWorkersAmt: data.multipleJcIssuedWorkersAmt,
				doubleWagesAmt: data.doubleWagesAmt,
				wagesPaidToNotWorkedAmt: data.wagesPaidToNotWorkedAmt,
				doubleWagesWSFAmt: data.doubleWagesWSFAmt,
				inclusionBogousFTOCount: data.inclusionBogousFTOCount,
				roundDescription: data.roundDescription,
				districtName: data.districtName,
				wagesNonExistentCount: data.wagesNonExistentCount,
				wagedToDeadCount: data.wagedToDeadCount,
				wagesMigratedCount: data.wagesMigratedCount,
				wagesPaidToNotWorkedCount: data.wagesPaidToNotWorkedCount,
				doubleWagesWSFCount: data.doubleWagesWSFCount,
				inclusionBogousFTOAmt: data.inclusionBogousFTOAmt,
				wagesPaidSameAccCount: data.wagesPaidSameAccCount,
				wagesPaidSameAccAmt: data.wagesPaidSameAccAmt,
				missingTanksEriCount: data.missingTanksEriCount,
				machineryUsedAmt: data.machineryUsedAmt,
				missingPoultryAmt: data.missingPoultryAmt,
				amountDrawnSameWorkAmt: data.amountDrawnSameWorkAmt,
				missingRoadsCount: data.missingRoadsCount,
				missingCattleShedAmt: data.missingCattleShedAmt,
				missingCanalAmt: data.missingCanalAmt,
				workDoneByContractorsCount: data.workDoneByContractorsCount,
				missingCattleShedCount: data.missingCattleShedCount,
				roundStartDate: data.roundStartDate,
				missingTanksEriAmt: data.missingTanksEriAmt,
				missingRoadsAmt: data.missingRoadsAmt,
				amountDrawnSameWorkCount: data.amountDrawnSameWorkCount,
				missingFarmPondAmt: data.missingFarmPondAmt,
				missingIHHLSAmt: data.missingIHHLSAmt,
				roundEndDate: data.roundEndDate,
				missingGoatShedAmt: data.missingGoatShedAmt,
				missingPoultryCount: data.missingPoultryCount,
				missingIHHLSCount: data.missingIHHLSCount,
				missingPlantationsAmt: data.missingPlantationsAmt,
				workDoneByContractorsAmt: data.workDoneByContractorsAmt,
				machineryUsedCount: data.machineryUsedCount,
				missingPlantationsCount: data.missingPlantationsCount,
				missingCanalCount: data.missingCanalCount,
				missingFarmPondCount: data.missingFarmPondCount,
				missingGoatShedCount: data.missingGoatShedCount,
				createdBy: $rootScope.sessionConfig.userId,
				roundId: data.roundId,
				roundName: data.roundName,
				vpName: data.vpName,
				modifiedBy: $rootScope.sessionConfig.userId,
				blockName: data.blockName,
				auditId: data.auditId,
				blockId: data.blockId,
				vpId: data.vpId
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
		        		{
		        			title : "Mulitple JC",
		        			columns :[
		        				{ field: "multipleJcIssuedWorkersCount",headerTemplate: "No", title : "Mulitple JC No",width: '130px', groupable:false },
		        				{ field: "multipleJcIssuedWorkersAmt",format: '{0:n0}',headerTemplate : "Amount", title : "Mulitple JC Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to dead",
		        			columns :[
		        				{ field: "wagedToDeadCount",headerTemplate: "No", title : "Wages to dead No",width: '130px', groupable:false },
		        				{ field: "wagedToDeadAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to dead Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to non-existent",
		        			columns :[
		        				{ field: "wagesNonExistentCount",headerTemplate: "No", title : "Wages to non-existent No",width: '130px', groupable:false },
		        				{ field: "wagesNonExistentAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to non-existent Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to migrated",
		        			columns :[
		        				{ field: "wagesMigratedCount",headerTemplate: "No", title : "Wages to migrated No",width: '130px', groupable:false },
		        				{ field: "wagesMigratedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to migrated Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to wrong account",
		        			columns :[
		        				{ field: "wagesCreditedWrongAccountsCount",headerTemplate: "No", title : "Wages to wrong account No",width: '130px', groupable:false },
		        				{ field: "wagesCreditedWrongAccountsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to wrong account Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Double Wages",
		        			columns :[
		        				{ field: "doubleWagessCount",headerTemplate: "No", title : "Double Wages No",width: '130px', groupable:false },
		        				{ field: "doubleWagesAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Double Wages Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to people who didn't work",
		        			columns :[
		        				{ field: "wagesPaidToNotWorkedCount",headerTemplate: "No", title : "Wages to people who didn't work No",width: '130px', groupable:false },
		        				{ field: "wagesPaidToNotWorkedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to people who didn't work Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Double Wages to WSF",
		        			columns :[
		        				{ field: "doubleWagesWSFCount",headerTemplate: "No", title : "Double Wages to WSF No",width: '130px', groupable:false },
		        				{ field: "doubleWagesWSFAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Double Wages to WSF Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages same A/C",
		        			columns :[
		        				{ field: "wagesPaidSameAccCount",headerTemplate: "No", title : "Wages same A/C No",width: '130px', groupable:false },
		        				{ field: "wagesPaidSameAccAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages same A/C Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Bogus names in FTO",
		        			columns :[
		        				{ field: "inclusionBogousFTOCount",headerTemplate: "No", title : "Bogus names in FTO No",width: '130px', groupable:false },
		        				{ field: "inclusionBogousFTOAmt", headerTemplate : "Amount", title : "Bogus names in FTO Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Tank / Eri",
		        			columns :[
		        				{ field: "missingTanksEriCount",headerTemplate: "No", title : "Missing Tank / Eri No",width: '130px', groupable:false },
		        				{ field: "missingTanksEriAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Tank / Eri Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Canals",
		        			columns :[
		        				{ field: "missingCanalCount",headerTemplate: "No", title : "Missing Canals No",width: '130px', groupable:false },
		        				{ field: "missingCanalAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Canals Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Roads",
		        			columns :[
		        				{ field: "missingRoadsCount",headerTemplate: "No", title : "Missing Roads No",width: '130px', groupable:false },
		        				{ field: "missingRoadsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Roads Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Plantations",
		        			columns :[
		        				{ field: "missingPlantationsCount",headerTemplate: "No", title : "Missing Plantations No",width: '130px', groupable:false },
		        				{ field: "missingPlantationsAmt", headerTemplate : "Amount", title : "Missing Plantations Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing IHHLs",
		        			columns :[
		        				{ field: "missingIHHLSCount",headerTemplate: "No", title : "Missing IHHLs No",width: '130px', groupable:false },
		        				{ field: "missingIHHLSAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing IHHLs Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Farm Pond",
		        			columns :[
		        				{ field: "missingFarmPondCount",headerTemplate: "No", title : "Missing Farm Pond No",width: '130px', groupable:false },
		        				{ field: "missingFarmPondAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Farm Pond Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Cattle shed",
		        			columns :[
		        				{ field: "missingCattleShedCount",headerTemplate: "No", title : "Missing Cattle shed No",width: '130px', groupable:false },
		        				{ field: "missingCattleShedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Cattle shed Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing Goat shed",
		        			columns :[
		        				{ field: "missingGoatShedCount",headerTemplate: "No", title : "Missing Goat shed No",width: '130px', groupable:false },
		        				{ field: "missingGoatShedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing Goat shed Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing poultry",
		        			columns :[
		        				{ field: "missingPoultryCount",headerTemplate: "No", title : "Missing poultry No",width: '130px', groupable:false },
		        				{ field: "missingPoultryAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing poultry Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing MGNREGA Component in IAY",
		        			columns :[
		        				{ field: "missingMgnregaComponentIAYCount",headerTemplate: "No", title : "Missing IAY No",width: '130px', groupable:false },
		        				{ field: "missingMgnregaComponentIAYAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing IAY Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Missing MGNREGA Component in GH",
		        			columns :[
		        				{ field: "missingMgnregaComponentGHCount",headerTemplate: "No", title : "Missing GH No",width: '130px', groupable:false },
		        				{ field: "missingMgnregaComponentGHAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Missing GH Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Misapprop. by VPt President",
		        			columns :[
		        				{ field: "misappropriationByVPTPresidentCount",headerTemplate: "No", title : "Misapprop. by VPt President No",width: '130px', groupable:false },
		        				{ field: "misappropriationByVPTPresidentAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Misapprop. by VPt President Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Misapprop. by VPt Secretary",
		        			columns :[
		        				{ field: "misappropriationByVPTSecretoryCount",headerTemplate: "No", title : "Misapprop. by VPt Secretary No",width: '130px', groupable:false },
		        				{ field: "misappropriationByVPTSecretoryAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Misapprop. by VPt Secretary Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Amount Drawn twice same work",
		        			columns :[
		        				{ field: "amountDrawnSameWorkCount",headerTemplate: "No", title : "Amount Drawn twice No",width: '130px', groupable:false },
		        				{ field: "amountDrawnSameWorkAmt",format: '{0:n0}', headerTemplate : "Amount", title : " Amount Drawn twice Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages to old IHHLs",
		        			columns :[
		        				{ field: "wagesDisbursedPrevConstructedIHHLSCount",headerTemplate: "No", title : "Wages to old IHHLs No",width: '130px', groupable:false },
		        				{ field: "wagesDisbursedPrevConstructedIHHLSAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages to o ldIHHLs Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Bogus entries in FTO",
		        			columns :[
		        				{ field: "bogusEntriesFTOCorretingFluidCount",headerTemplate: "No", title : "Bogus entries in FTO No",width: '130px', groupable:false },
		        				{ field: "bogusEntriesFTOCorretingFluidAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Bogus entries in FTO Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Machinery",
		        			columns :[
		        				{ field: "machineryUsedCount",headerTemplate: "No", title : "Machinery No",width: '130px', groupable:false },
		        				{ field: "machineryUsedAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Machinery Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Wages more than actual days",
		        			columns :[
		        				{ field: "wagesDrawnMoreThanActualWorkingDayCount",headerTemplate: "No", title : "Wages more than actual days No",width: '130px', groupable:false },
		        				{ field: "wagesDrawnMoreThanActualWorkingDayAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Wages more than actual days Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Work by contrators",
		        			columns :[
		        				{ field: "workDoneByContractorsCount",headerTemplate: "No", title : "Work by contrators No",width: '130px', groupable:false },
		        				{ field: "workDoneByContractorsAmt",format: '{0:n0}', headerTemplate : "Amount", title : "Work by contrators Amount",width: '130px', groupable:false  }
		        			]
		        		},{
		        			title : "Total",
		        			columns :[
		        				{ field: "TotalNo",headerTemplate: "No", title : "No",width: '130px', groupable:false },
		        				{ field: "TotalAmt",format: '{0:n0}',headerTemplate : "Amount", title : "Amount",width: '130px', groupable:false  }
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
	        selectable: true,
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
	                	'/misappropriation/getlist?key='+encodeURIComponent($location.search().aid);
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
						      multipleJcIssuedWorkersAmt: { type: "number" },
						      wagedToDeadCount: { type: "number" },
						      wagedToDeadAmt: { type: "number" },
						      wagesNonExistentCount: { type: "number" },
						      wagesNonExistentAmt: { type: "number" },
						      wagesMigratedCount: { type: "number" },
						      wagesMigratedAmt:  { type: "number" },
						      doubleWagessCount: { type: "number" },
						      doubleWagesAmt: { type: "number" },
						      wagesPaidToNotWorkedCount:  { type: "number" },
						      wagesPaidToNotWorkedAmt:  { type: "number" },
						      doubleWagesWSFCount: { type: "number" },
						      doubleWagesWSFAmt: { type: "number" },
						      wagesPaidSameAccCount: { type: "number" },
						      wagesPaidSameAccAmt: { type: "number" },
						      inclusionBogousFTOCount: { type: "number" },
						      inclusionBogousFTOAmt: { type: "number" },
						      missingTanksEriCount: { type: "number" },
						      missingTanksEriAmt: { type: "number" },
						      missingCanalCount: { type: "number" },
						      missingCanalAmt: { type: "number" },
						      missingRoadsCount: { type: "number" },
						      missingRoadsAmt: { type: "number" },
						      missingPlantationsCount:  { type: "number" },
						      missingPlantationsAmt:  { type: "number" },
						      missingIHHLSCount: { type: "number" },
						      missingIHHLSAmt:  { type: "number" },
						      missingFarmPondCount:  { type: "number" },
						      missingFarmPondAmt:  { type: "number" },
						      missingCattleShedCount: { type: "number" },
						      missingCattleShedAmt: { type: "number" },
						      missingGoatShedCount: { type: "number" },
						      missingGoatShedAmt: { type: "number" },
						      missingPoultryCount: { type: "number" },
						      missingPoultryAmt: { type: "number" },
						      amountDrawnSameWorkCount: { type: "number" },
						      amountDrawnSameWorkAmt: { type: "number" },
						      machineryUsedCount: { type: "number" },
						      machineryUsedAmt: { type: "number" },
						      workDoneByContractorsCount: { type: "number" },
						      workDoneByContractorsAmt: { type: "number" },
						      multipleJcIssuedWorkersCount: { type: "number" },
						      wagesCreditedWrongAccountsCount: { type: "number" },
						      wagesCreditedWrongAccountsAmt: { type: "number" },
						      missingMgnregaComponentIAYCount: { type: "number" },
						      missingMgnregaComponentIAYAmt: { type: "number" },
						      missingMgnregaComponentGHCount: { type: "number" },
						      missingMgnregaComponentGHAmt: { type: "number" },
						      misappropriationByVPTPresidentCount: { type: "number" },
						      misappropriationByVPTPresidentAmt: { type: "number" },
						      misappropriationByVPTSecretoryCount: { type: "number" },
						      misappropriationByVPTSecretoryAmt: { type: "number" },
						      wagesDisbursedPrevConstructedIHHLSCount: { type: "number" },
						      wagesDisbursedPrevConstructedIHHLSAmt: { type: "number" },
						      bogusEntriesFTOCorretingFluidCount: { type: "number" },
						      bogusEntriesFTOCorretingFluidAmt: { type: "number" },
						      wagesDrawnMoreThanActualWorkingDayCount: { type: "number" },
						      wagesDrawnMoreThanActualWorkingDayAmt: { type: "number" },
						      TotalNo: { type: "number" },
						      TotalAmt: { type: "number" }
                        }
                    },
				    parse : function (d) {
				        $.each(d, function(idx, elem) {
				            elem.TotalAmt = (elem.multipleJcIssuedWorkersAmt|| 0 )+
							(elem.wagedToDeadAmt|| 0 )+
							(elem.wagesNonExistentAmt|| 0 )+
							(elem.wagesMigratedAmt|| 0 )+
							(elem.doubleWagesAmt|| 0 )+
							(elem.wagesPaidToNotWorkedAmt|| 0 )+
							(elem.doubleWagesWSFAmt|| 0 )+
							(elem.wagesPaidSameAccAmt|| 0 )+
							(elem.inclusionBogousFTOAmt|| 0 )+
							(elem.missingTanksEriAmt|| 0 )+
							(elem.missingCanalAmt|| 0 )+
							(elem.missingRoadsAmt|| 0 )+
							(elem.missingPlantationsAmt|| 0 )+
							(elem.missingIHHLSAmt|| 0 )+
							(elem.missingFarmPondAmt|| 0 )+
							(elem.missingCattleShedAmt|| 0 )+
							(elem.missingGoatShedAmt|| 0 )+
							(elem.missingPoultryAmt|| 0 )+
							(elem.amountDrawnSameWorkAmt|| 0 )+
							(elem.machineryUsedAmt|| 0 )+
							(elem.workDoneByContractorsAmt|| 0 )+
							(elem.wagesCreditedWrongAccountsAmt|| 0 )+
							(elem.missingMgnregaComponentIAYAmt|| 0 )+
							(elem.missingMgnregaComponentGHAmt|| 0 )+
							(elem.misappropriationByVPTPresidentAmt|| 0 )+
							(elem.misappropriationByVPTSecretoryAmt|| 0 )+
							(elem.wagesDisbursedPrevConstructedIHHLSAmt|| 0 )+
							(elem.bogusEntriesFTOCorretingFluidAmt|| 0 )+
							(elem.wagesDrawnMoreThanActualWorkingDayAmt|| 0 );

						elem.TotalNo =   (elem.wagedToDeadCount|| 0 )+
							  (elem.wagesNonExistentCount|| 0 )+
							  (elem.wagesMigratedCount|| 0 )+
							  (elem.doubleWagessCount|| 0 )+
							  (elem.wagesPaidToNotWorkedCount|| 0 )+
							  (elem.doubleWagesWSFCount|| 0 )+
							  (elem.wagesPaidSameAccCount|| 0 )+
							  (elem.inclusionBogousFTOCount|| 0 )+
							  (elem.missingTanksEriCount|| 0 )+
							  (elem.missingCanalCount|| 0 )+
							  (elem.missingRoadsCount|| 0 )+
							  (elem.missingPlantationsCount|| 0 )+
							  (elem.missingIHHLSCount|| 0 )+
							  (elem.missingFarmPondCount|| 0 )+
							  (elem.missingCattleShedCount|| 0 )+
							  (elem.missingGoatShedCount|| 0 )+
							  (elem.missingPoultryCount|| 0 )+
							  (elem.amountDrawnSameWorkCount|| 0 )+
							  (elem.machineryUsedCount|| 0 )+
							  (elem.workDoneByContractorsCount|| 0 )+
							  (elem.multipleJcIssuedWorkersCount|| 0 )+
							  (elem.wagesCreditedWrongAccountsCount|| 0 )+
							  (elem.missingMgnregaComponentIAYCount|| 0 )+
							  (elem.missingMgnregaComponentGHCount|| 0 )+
							  (elem.misappropriationByVPTPresidentCount|| 0 )+
							  (elem.misappropriationByVPTSecretoryCount|| 0 )+
							  (elem.wagesDisbursedPrevConstructedIHHLSCount|| 0 )+
							  (elem.bogusEntriesFTOCorretingFluidCount|| 0 )+
							  (elem.wagesDrawnMoreThanActualWorkingDayCount|| 0 );
				        });
				        return d;
				    }
                }
	        }
	    }

	    function GetAudit(id,type)
	    {
	    	var deffered = jQuery.Deferred();
	    	misappropriationfactory.getAudit(id).success(function(result){
	    		

		    		$scope.misappropriation.auditId= result.data.auditId;
		    		$scope.misappropriation.roundId =result.data.roundId;
			    	$scope.misappropriation.auditDistrictId =result.data.auditDistrictId;
			    	$scope.misappropriation.blockId =result.data.auditBlockId;
			    	$scope.misappropriation.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	misappropriationfactory.getLookupValues(type).success(function(result){
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

app.factory('misappropriationfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/misappropriation/create';

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
            url : crudServiceBaseUrl + '/misappropriation/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});