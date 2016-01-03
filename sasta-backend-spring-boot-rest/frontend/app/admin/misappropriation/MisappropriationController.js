app.controller('MisappropriationController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','misappropriationfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,misappropriationfactory){

		$scope.aufactory = misappropriationfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add Audit",
	    	EditAuditTitle : "Edit Audit"
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
		        $scope.addjQueryValidator = new Validator($scope.AddAuditFormName); 
            }
        };

        $scope.AddAuditFormName = '#frmAddAuditMisappropriation';
        $scope.EditAuditFormName = '#frmEditAuditMisappropriation';    

        $scope.keditWindowOptions = {
            content: 'admin/misappropriation/edit.html',
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
		    	//$scope.misappropriation.roundId = $scope.defaultrounds.value;
		    	//$scope.misappropriation.auditDistrictId = $scope.defaultdistricts.value;
		    	//$scope.misappropriation.blockId = $scope.defaultblocks.value;
		    	//$scope.misappropriation.vpId = $scope.defaultvillages.value;

		    	//$scope.misappropriation.roundStartDate = '2015-12-25';
		    	//$scope.misappropriation.roundEndDate = '2015-12-25';
		    	
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
						$scope.CloseAuditWindow();
				        $scope.doReset();
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

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	//$scope.editmisappropriation.roundid = $scope.editdefaultrounds.value;
		    	//$scope.editmisappropriation.districtid = $scope.editdefaultdistricts.value;
		    	//$scope.editmisappropriation.blockid = $scope.editdefaultblocks.value;
		    	//$scope.editmisappropriation.panchayatid = $scope.editdefaultvillages.value;

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
					createdBy: data.createdBy,
					roundId: data.roundId,
					roundName: data.roundName,
					vpName: data.vpName,
					modifiedBy: data.modifiedBy,
					blockName: data.blockName,
					auditId: data.auditId,
					blockId: data.blockId,
					vpId: data.vpId
	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "roundName", title:'Round', editable : false  },
		        		{ field: "roundStartDate", title:'Start Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundStartDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "roundEndDate", title:'End Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundEndDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "districtName", title : "District", editable : false},
		        		{ field: "blockName", title : "Block", editable : false },
		        		{ field: "vpName", title : "Village", editable : false},
		        		{ title : "", template: "<button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"EditData(dataItem);\">Edit</button>&nbsp;<button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"Delet(dataItem);\">Delete</button>" }
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
				         url: $scope.crudServiceBaseUrl + '/misappropriation/getlist'
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