app.controller('GrievanceController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','grievancefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,grievancefactory){

		$scope.aufactory = grievancefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
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
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "totalReceivedGrievancesHF", width:"130px", title:'Total No of Grievances received during Household Verification'},
		        		{ field: "totalReceivedGrievancesMeeting", width:"130px", title:'Job Total No of grievances received during GS meeting'},
		        		{ field: "reqForNewJc", width:"130px", title:'Request for New Job Card'},
		        		{ field: "reqForMoreThan100Days", width:"130px", title : "Request for work for more than 100 days"},
		        		{ field: "reqForConstructionIHHL", width:"130px", title : "Request for Constructions of IHHL"},
		        		{ field: "reqForConstructionIAYHouse", width:"130px", title : "Request for Construction of IAY house"},
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
				         url: $scope.crudServiceBaseUrl + '/grievances/getlist'
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