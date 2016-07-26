app.controller('VrpController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','vrpfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,vrpfactory,$q){

		var session = storage.recall();
		$scope.aufactory = vrpfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    /* Popup Titles */
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add VRP",
	    	EditAuditTitle : "Edit VRP"
	    };

		/* Defaults */
   		$scope.emptyList = [];
		$scope.defaultSelections = {
		    "value": 0,
		    "text": "Select"
		};

		/*drop down list initialization*/
		$scope.rounds = angular.copy($scope.emptyList);
		$scope.districts = angular.copy($scope.emptyList);
		$scope.blocks = angular.copy($scope.emptyList);
		$scope.villages = angular.copy($scope.emptyList);
		$scope.grades = angular.copy($scope.emptyList);
		$scope.payments = angular.copy($scope.emptyList);
		$scope.qualifications = angular.copy($scope.emptyList);
		$scope.communities = angular.copy($scope.emptyList);
		$scope.banks = angular.copy($scope.emptyList);
		$scope.genders = angular.copy($scope.emptyList);		

		/* default selected rounds */
		$scope.defaultrounds = angular.copy($scope.defaultSelections);
		/* default selected districts */
		$scope.defaultdistricts = angular.copy($scope.defaultSelections);
		/* default selected blocks */
		$scope.defaultblocks = angular.copy($scope.defaultSelections);
		/* default selected villages */
		$scope.defaultvillages = angular.copy($scope.defaultSelections);
		/* default selected grades */
		$scope.defaultgrades = angular.copy($scope.defaultSelections);
		/* default selected banks  */
		$scope.defaultbanks = angular.copy($scope.defaultSelections);
		/* default selected communities */
		$scope.defaultcommunities = angular.copy($scope.defaultSelections);
		/* default selected qualifications */
		$scope.defaultqualifications = angular.copy($scope.defaultSelections);
		/* default selected payments */
		$scope.defaultpayments = angular.copy($scope.defaultSelections);
		/* default selected gender */
		$scope.defaultgender = angular.copy($scope.defaultSelections);
		/* default payments list */
		$scope.defaultpaymentsList = [{
	            "value": 1,
	            "text": "Cash"
	        }, {
	            "value": 2,
	            "text": "Cheque"
	        }, {
	            "value": 3,
	            "text": "DD"
	        },{
	        	"value": 4,
	            "text": "ECS"
	        }];
	    /* default gender list */
		$scope.defaultgenderList = [ {
	            "value": 1,
	            "text": "Male"
	        }, {
	            "value": 2,
	            "text": "Female"
	        }];

        $scope.OnGradeSelectedValue = function(defaultgrades){
	    	$scope.defaultgrades = defaultgrades;
	    }

	    $scope.OnBankSelectedValue = function(defaultbanks){
	    	$scope.defaultbanks = defaultbanks;
	    }

	    $scope.OnCommunitySelectedValue = function(defaultcommunities){
	    	$scope.defaultcommunities = defaultcommunities;
	    }

	    $scope.OnQualificationSelectedValue = function(defaultqualifications){
	    	$scope.defaultqualifications = defaultqualifications;
	    }

	    $scope.OnGenderSelectedValue = function(defaultgender){
	    	$scope.defaultgender = defaultgender;
	    }

	    $scope.OnPaymentSelectedValue = function(defaultpayments){
	    	if(defaultpayments){
		    	$scope.defaultpayments = defaultpayments;
		    	if(defaultpayments.value === 1){
		    		$('#accountNumber,#txtIFSCCode').val('');
			        $('#selBanks,#accountNumber,#txtIFSCCode').hide();
			        $('#selBanks,#accountNumber,#txtIFSCCode').parents('.form-group').hide();
			    }else{
			    	$('#selBanks,#accountNumber,#txtIFSCCode').show();
			    	$('#selBanks,#accountNumber,#txtIFSCCode').parents('.form-group').show();
			    }	    		
	    	}
	    }

	    $scope.OnVillageSelectedValue = function(defaultvillages){
	    	$scope.defaultvillages = defaultvillages;
	    }


        $scope.OnEditGradeSelectedValue = function(editdefaultgrades){
	    	$scope.editdefaultgrades = editdefaultgrades;
	    }

	    $scope.OnEditBankSelectedValue = function(editdefaultbanks){
	    	$scope.editdefaultbanks = editdefaultbanks;
	    }

	    $scope.OnEditCommunitySelectedValue = function(editdefaultcommunities){
	    	$scope.editdefaultcommunities = editdefaultcommunities;
	    }

	    $scope.OnEditQualificationSelectedValue = function(editdefaultqualifications){
	    	$scope.editdefaultqualifications = editdefaultqualifications;
	    }

	    $scope.OnEditGenderSelectedValue = function(editdefaultgender){
	    	$scope.editdefaultgender = editdefaultgender;
	    }

	    $scope.OnEditPaymentSelectedValue = function(editdefaultpayments){
	    	if(editdefaultpayments){
		    	$scope.editdefaultpayments = editdefaultpayments;
		    	if(editdefaultpayments.value === 1){
		    		$('#accountNumber,#txtIFSCCode').val('');
			        $('#selBanks,#accountNumber,#txtIFSCCode').hide();
			        $('#selBanks,#accountNumber,#txtIFSCCode').parents('.form-group').hide();
			    }else{
			    	$('#selBanks,#accountNumber,#txtIFSCCode').show();
			    	$('#selBanks,#accountNumber,#txtIFSCCode').parents('.form-group').show();
			    }	    		
	    	}
	    }

	    $scope.OnEditVillageSelectedValue = function(editdefaultvillages){
	    	$scope.editdefaultvillages = editdefaultvillages;
	    }


        $scope.kaddWindowOptions = {
            content: 'admin/vrp/add.html',
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
		        $($scope.AddVrpFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.add1jQueryValidator = new Validator($scope.AddVrpFormName);
            }
        };

        $scope.add1jQueryValidator = null;
        $scope.edit1jQueryValidator = null;


        $scope.AddVrpFormName = '#frmAddVrp';
        $scope.EditVrpFormName = '#frmEditVrp';    

        $scope.keditWindowOptions = {
            content: 'admin/vrp/edit.html',
            title: $scope.modelDialogTitle.EditAuditTitle,
            width : '800px',
            height:'400px',            
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
		        $($scope.EditVrpFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.edit1jQueryValidator = new Validator($scope.EditVrpFormName);            	
            }
        };

        $scope.OpenAddVrpAuditWindow = function($event){
        	$scope.AddVrpAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
            $scope.genders = angular.copy($scope.defaultgenderList);
			$scope.payments = angular.copy($scope.defaultpaymentsList);
			GetLookupValues($rootScope.appConfig.lookupTypes.Rounds); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Districts); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Blocks); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Communities); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Grades); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Qualifications); 
			GetLookupValues($rootScope.appConfig.lookupTypes.Bank);			
            $scope.doFillLookup();
        	$scope.AddVrpAuditWindow.center().open();
        }

        $scope.CloseAddVrpAuditWindow  = function(){
            $scope.AddVrpAuditWindow.close();
            $scope.doReset();
            if($scope.add1jQueryValidator)
            	$scope.add1jQueryValidator.doReset();
        }

        $scope.OpenEditVrpAuditWindow = function(){
			$scope.EditVrpAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin"); 
			$scope.doReset();		
			$scope.EditVrpAuditWindow.center().open();            
        }

        $scope.CloseEditVrpAuditWindow = function(){
            $scope.EditVrpAuditWindow.close();
            $scope.doReset();
            if($scope.edit1jQueryValidator)
            	$scope.edit1jQueryValidator.doReset();
        }

        $scope.doFillLookup = function(data){
        	if(data != null)
        		$scope.editvrp.villagePanchayatId = data.villagePanchayatId;
    	    $q.when(true).then(function(value) {
		        return GetAudit(decodeURIComponent($location.search().aid)); // Will be resolved (1)
		    }).then(function(value) { 
		    	$scope.villages = [];  
		        return GetLookupValues($rootScope.appConfig.lookupTypes.DistrictsVillagePanchayats,(($scope.vrp.auditDistrictId )?$scope.vrp.auditDistrictId :(session.allottedDistrict?session.allottedDistrict:'')));
		    }).then(function(value) {
			       var vid = 0;
			       if($scope.editvrp.villagePanchayatId != null)
			       {
			       		vid=$scope.editvrp.villagePanchayatId;
			       }
	        		var v = jQuery.map( $scope.villages, function( n, i ) {
						if(vid === n.value)
							return n;
						
					});	  
					if(v instanceof Array){
						$scope.defaultvillages =  v[0];
					}else{
						$scope.defaultvillages = $scope.defaultvillages;
					}
		    });
        }

        $scope.doReset = function(){
        	$scope.vrp = angular.copy($scope.defaultOptions);
        	$scope.editvrp =  angular.copy($scope.defaultOptions);
        	$scope.defaultdistricts = angular.copy($scope.defaultSelections);
        	$scope.defaultblocks = angular.copy($scope.defaultSelections);
        	$scope.defaultrounds = angular.copy($scope.defaultSelections);
        	$scope.defaultgender = angular.copy($scope.defaultSelections);
        	$scope.defaultqualifications= angular.copy($scope.defaultSelections);
        	$scope.defaultpayments= angular.copy($scope.defaultSelections);
        	$scope.defaultcommunities= angular.copy($scope.defaultSelections);
        	$scope.defaultgrades= angular.copy($scope.defaultSelections);
        	$scope.defaultvillages = angular.copy($scope.defaultSelections);
			$scope.editdefaultdistricts = angular.copy($scope.defaultSelections);
        	$scope.editdefaultblocks = angular.copy($scope.defaultSelections);
        	$scope.editdefaultrounds = angular.copy($scope.defaultSelections);
        	$scope.editdefaultgender = angular.copy($scope.defaultSelections);
        	$scope.editdefaultqualifications= angular.copy($scope.defaultSelections);
        	$scope.editdefaultpayments= angular.copy($scope.defaultSelections);
        	$scope.editdefaultcommunities= angular.copy($scope.defaultSelections);
        	$scope.editdefaultgrades= angular.copy($scope.defaultSelections);
        	$scope.editdefaultvillages = angular.copy($scope.defaultSelections);        	
			$scope.villages = angular.copy($scope.emptyList);
			$scope.grades = angular.copy($scope.emptyList);
			$scope.payments = angular.copy($scope.emptyList);
			$scope.qualifications = angular.copy($scope.emptyList);
			$scope.communities = angular.copy($scope.emptyList);
			$scope.banks = angular.copy($scope.emptyList);
			$scope.genders = angular.copy($scope.emptyList); 	
        }

        $scope.defaultOptions = {
      		"id" : 0,
			"name" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"auditBlockId" : null,
			"villagePanchayatId" : null,
			"modifiedDate" : null,
			"status" : null,
			"roundDescription" : null,
			"roundStartDate" : null,
			"roundEndDate" : null,
			"qualificationId" : null,
			"vrpGradeName" : null,
			"auditDistrictName" : null,
			"auditFinancialYear" : null,
			"vrpQualificationName" : null,
			"jobCardNumber" : null,
			"auditBlockName" : null,
			"vrpBankName" : null,
			"contactNumber" : null,
			"auditVpName" : null,
			"auditFinancialDescription" : null,
			"accountNumber" : null,
			"vrpPanchayatName" : null,
			"communityId" : null,
			"guardianName" : null,
			"vrpCommunityName" : null,
			"createdBy" : null,
			"roundId" : null,
			"roundName" : null,
			"modifiedBy" : null,
			"auditId" : null,
			"bankId" : null,
			"genderId" : null,
			"ifscCode" : null,
			"active" : null,
			"auditVpId" : null,
			"payMode" : null,
			"gradeId" : null,
			"paidAmount" : null,
			"totalDays" : null
	    };

	    $scope.vrp = {
      		"id" : 0,
			"name" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"auditBlockId" : null,
			"villagePanchayatId" : null,
			"modifiedDate" : null,
			"status" : null,
			"roundDescription" : null,
			"roundStartDate" : null,
			"roundEndDate" : null,
			"qualificationId" : null,
			"vrpGradeName" : null,
			"auditDistrictName" : null,
			"auditFinancialYear" : null,
			"vrpQualificationName" : null,
			"jobCardNumber" : null,
			"auditBlockName" : null,
			"vrpBankName" : null,
			"contactNumber" : null,
			"auditVpName" : null,
			"auditFinancialDescription" : null,
			"accountNumber" : null,
			"vrpPanchayatName" : null,
			"communityId" : null,
			"guardianName" : null,
			"vrpCommunityName" : null,
			"createdBy" : null,
			"roundId" : null,
			"roundName" : null,
			"modifiedBy" : null,
			"auditId" : null,
			"bankId" : null,
			"genderId" : null,
			"ifscCode" : null,
			"active" : null,
			"auditVpId" : null,
			"payMode" : null,
			"gradeId" : null,
			"paidAmount" : null,
			"totalDays" : null
	    };

	    $scope.Submit = function(){
	    	if($scope.add1jQueryValidator.doValidate()){
		    	$scope.vrp.villagePanchayatId = $scope.defaultvillages.value;
				$scope.vrp.communityId = $scope.defaultcommunities.value;
				$scope.vrp.genderId = $scope.defaultgender.value;
				$scope.defaultbanks&& ($scope.vrp.bankId = $scope.defaultbanks.value);
				$scope.vrp.gradeId = $scope.defaultgrades.value;
				$scope.vrp.payMode = $scope.defaultpayments.value;
				$scope.vrp.qualificationId = $scope.defaultqualifications.value;

		    	$scope.vrp.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = vrpfactory.doSubmitData($scope.vrp);
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
						$scope.CloseAddVrpAuditWindow();
						$window.location.reload();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add VRP!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add VRP!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editvrp = {
					id : data.id,
					name : data.name,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					auditBlockId : data.auditBlockId,
					villagePanchayatId : data.villagePanchayatId,
					modifiedDate : data.modifiedDate,
					active : data.status,
					roundDescription : data.roundDescription,
					roundStartDate : data.roundStartDate,
					roundEndDate : data.roundEndDate,
					qualificationId : data.qualificationId,
					vrpGradeName : data.vrpGradeName,
					auditDistrictName : data.auditDistrictName,
					auditFinancialYear : data.auditFinancialYear,
					vrpQualificationName : data.vrpQualificationName,
					jobCardNumber : data.jobCardNumber,
					auditBlockName : data.auditBlockName,
					vrpBankName : data.vrpBankName,
					contactNumber : data.contactNumber,
					auditVpName : data.auditVpName,
					auditFinancialDescription : data.auditFinancialDescription,
					accountNumber : data.accountNumber,
					vrpPanchayatName : data.vrpPanchayatName,
					communityId : data.communityId,
					guardianName : data.guardianName,
					vrpCommunityName : data.vrpCommunityName,
					createdBy : data.createdBy,
					roundId : data.roundId,
					roundName : data.roundName,
					modifiedBy : data.modifiedBy,
					auditId : data.auditId,
					bankId : data.bankId,
					genderId : data.genderId,
					ifscCode : data.ifscCode,
					active : false,
					auditVpId : data.auditVpId,
					payMode : data.payMode,
					gradeId : data.gradeId,
					paidAmount : data.paidAmount,
					totalDays : data.totalDays
		    	};
		    	DoUpdate();	    		
	    	}	
	    }

	    function DoUpdate(){
	    	var responseText = vrpfactory.doUpdateData($scope.editvrp);
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
					$scope.CloseEditVrpAuditWindow();
					$window.location.reload();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update VRP!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update VRP!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	 	    	
	    }

	    $scope.Update = function(){
			if($scope.edit1jQueryValidator.doValidate()){
		    	$scope.editvrp.villagePanchayatId = $scope.editdefaultvillages.value;
				$scope.editvrp.communityId = $scope.editdefaultcommunities.value;
				$scope.editvrp.genderId = $scope.editdefaultgender.value;
				$scope.editdefaultbanks&&($scope.editvrp.bankId = $scope.editdefaultbanks.value);
				$scope.editvrp.gradeId = $scope.editdefaultgrades.value;
				$scope.editvrp.payMode = $scope.editdefaultpayments.value;
				$scope.editvrp.qualificationId = $scope.editdefaultqualifications.value;
				DoUpdate();
			}
	    }

	    $scope.EditData = function(data){
	    	$scope.doReset();
			GetLookupValues($rootScope.appConfig.lookupTypes.Rounds).done(function(result){
		    	var r = jQuery.map( $scope.rounds, function( n, i ) {
					if(data.roundId === n.value)
				  		return n;
				});
				if(r instanceof Array)
					$scope.editdefaultrounds =  r[0];
				else
					$scope.editdefaultrounds = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Districts).done(function(result){
				var d = jQuery.map( $scope.districts, function( n, i ) {
					if(data.auditDistrictId === n.value)
				  		return n;
				});
				if(d instanceof Array)
					$scope.editdefaultdistricts =  d[0];
				else
					$scope.editdefaultdistricts = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Blocks).done(function(result){
				var b = jQuery.map( $scope.blocks, function( n, i ) {
					if(data.auditBlockId === n.value)
				  		return n;
				});
				if(b instanceof Array)
					$scope.editdefaultblocks =  b[0];
				else
					$scope.editdefaultblocks = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Communities).done(function(result){
				var c = jQuery.map( $scope.communities, function( n, i ) {
					if(data.communityId === n.value)
				  		return n;
				});
				if(c instanceof Array)
					$scope.editdefaultcommunities =  c[0];
				else
					$scope.editdefaultcommunities = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Grades).done(function(result){
				var g = jQuery.map( $scope.grades, function( n, i ) {
					if(data.gradeId === n.value)
				  		return n;
				});
				if(g instanceof Array)
					$scope.editdefaultgrades =  g[0];
				else
					$scope.editdefaultgrades = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.Qualifications).done(function(result){
				var q = jQuery.map( $scope.qualifications, function( n, i ) {
					if(data.qualificationId === n.value)
				  		return n;
				});
				if(q instanceof Array)
					$scope.editdefaultqualifications =  q[0];
				else
					$scope.editdefaultqualifications = angular.copy($scope.defaultSelections);
	    	});

			GetLookupValues($rootScope.appConfig.lookupTypes.DistrictsVillagePanchayats,((data.auditDistrictId)?data.auditDistrictId:(session.allottedDistrict?session.allottedDistrict:''))).done(function(result){
	        		var v = jQuery.map( $scope.villages, function( n, i ) {
						if(data.villagePanchayatId === n.value)
							return n;						
					});	  
					if(v instanceof Array){
						$scope.editdefaultvillages =  v[0];
					}else{
						$scope.editdefaultvillages = angular.copy($scope.defaultSelections);
					}
	    	});

	    	GetLookupValues($rootScope.appConfig.lookupTypes.Bank).done(function(result){
				var ba = jQuery.map( $scope.banks, function( n, i ) {
					if(data.bankId === n.value)
				  		return n;
				});	

				if(ba instanceof Array){
					$scope.editdefaultbanks =  ba[0];
				}else{
					$scope.editdefaultbanks = angular.copy($scope.defaultSelections);
				}

	            $scope.genders = angular.copy($scope.defaultgenderList);
				$scope.payments = angular.copy($scope.defaultpaymentsList);

				var p = jQuery.map( $scope.payments, function( n, i ) {
					if(data.payMode === n.value)
				  		return n;
				});

				if(p instanceof Array){
					$scope.editdefaultpayments =  p[0];
				}else{
					$scope.editdefaultpayments = angular.copy($scope.defaultSelections);
				}

				var ge = jQuery.map( $scope.genders, function( n, i ) {
					if(data.genderId === n.value)
				  		return n;
				});	

				if(ge instanceof Array){
					$scope.editdefaultgender =  ge[0];
				}else{
					$scope.editdefaultgender = angular.copy($scope.defaultSelections);
				}

				$scope.OnPaymentSelectedValue($scope.editdefaultpayments);

		    	$scope.editvrp = {
					id : data.id,
					name : data.name,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					auditBlockId : data.auditBlockId,
					villagePanchayatId : data.villagePanchayatId,
					modifiedDate : data.modifiedDate,
					status : data.status,
					roundDescription : data.roundDescription,
					roundStartDate : data.roundStartDate,
					roundEndDate : data.roundEndDate,
					qualificationId : data.qualificationId,
					vrpGradeName : data.vrpGradeName,
					auditDistrictName : data.auditDistrictName,
					auditFinancialYear : data.auditFinancialYear,
					vrpQualificationName : data.vrpQualificationName,
					jobCardNumber : data.jobCardNumber,
					auditBlockName : data.auditBlockName,
					vrpBankName : data.vrpBankName,
					contactNumber : data.contactNumber,
					auditVpName : data.auditVpName,
					auditFinancialDescription : data.auditFinancialDescription,
					accountNumber : data.accountNumber,
					vrpPanchayatName : data.vrpPanchayatName,
					communityId : data.communityId,
					guardianName : data.guardianName,
					vrpCommunityName : data.vrpCommunityName,
					createdBy : $rootScope.sessionConfig.userId,
					roundId : data.roundId,
					roundName : data.roundName,
					modifiedBy : $rootScope.sessionConfig.userId,
					auditId : data.auditId,
					bankId : data.bankId,
					genderId : data.genderId,
					ifscCode : data.ifscCode,
					active : data.active,
					auditVpId : data.auditVpId,
					payMode : data.payMode,
					gradeId : data.gradeId,
					paidAmount : data.paidAmount,
					totalDays : data.totalDays
		    	};

	    	});	

	    	$scope.OpenEditVrpAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
		        		{ field: "auditFinancialYear", groupable:true,width: '130px', title:'FY'},
		        		{ field: "roundName", groupable:true,width: '130px', title:'Round'},
		        		{ field: "auditDistrictName", groupable:true,width: '130px', title:'District'},
		        		{ field: "auditBlockName", groupable:true,width: '130px', title:'Block'},
		        		{ field: "auditVpName", groupable:true,width: '130px', title:'Panchayat'},
		        		{ field: "name", width:'130px', title:'Name'  },
		        		{ field: "genderId", width:'130px', title:'M/F',template:"#=(((genderId||'')=='')?'':((genderId==1)?'Male':'Female'))#"},
		        		{ field: "vrpPanchayatName", width:'130px', title : "Panchayat Name"},
		        		{ field: "jobCardNumber", width:'130px', title : "JC No"},
		        		{ field: "guardianName", width:'130px', title : "F / H"},
		        		{ field: "vrpQualificationName", width:'130px', title : "Qualification"},
		        		{ field: "vrpCommunityName", width:'130px', title : "Community"},
		        		{ field: "contactNumber", width:'130px', title:'Phone'},
		        		{ field: "totalDays", width:'130px', title : "Days Worked"},
		        		{ field: "paidAmount", width:'130px', title : "Amount Paid"},
		        		{ field: "payModeName", width:'130px', title : "Pay Mode"},
		        		{ field: "vrpBankName", width:'130px', title : "Bank"},
		        		{ field: "accountNumber", width:'130px', title:'A/c'},
		        		{ field: "ifscCode", width:'130px', title : "IFSC"},
		        		{ field: "vrpGradeName", width:'130px', title : "Grade"},
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
                    refresh: "Refresh Grievances"
                }
            },		        
	        dataSource: {
	            pageSize: 30,
	            transport: {
	                read: function (e) {
	                	var baseUrl = $scope.crudServiceBaseUrl + 
	                	'/vrp/getvrpdetailslist?key='+$location.search().aid;
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
	           }
	        }
	    }

	    function GetAudit(id,type){
	    	var deffered = jQuery.Deferred();
	    	vrpfactory.getAudit(id).success(function(result){	    		
	    		$scope.vrp.auditId= result.data.auditId;
	    		$scope.vrp.roundId =result.data.roundId;
		    	$scope.vrp.auditDistrictId =result.data.districtId;
		    	$scope.vrp.auditBlockId =result.data.blockId;
		    	$scope.vrp.auditVpId =result.data.panchayatId;
				$scope.vrp.roundId =result.data.roundId;
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

	    function GetLookupValues(type,id){
	    	var deffered = jQuery.Deferred();
	    	vrpfactory.getLookupValues(type,id).success(function(result){
	    		//var defaultOptions = {
				//    "value": 0,
				//    "text": "Select"
				//};
				if(result instanceof Array){
					if( type == $rootScope.appConfig.lookupTypes.Rounds ){ 
						//$scope.rounds.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.rounds.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.Districts )
					{
						//$scope.districts.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.districts.push(result[i]);
					}
					else if( type ==  $rootScope.appConfig.lookupTypes.Blocks)
					{
						//$scope.blocks.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.blocks.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.DistrictsVillagePanchayats )
					{
						//$scope.villages.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.villages.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.Communities ){
						//$scope.communities.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.communities.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.Bank )
					{
						//$scope.banks.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.banks.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.Grades )
					{
						//$scope.grades.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.grades.push(result[i]);
					}
					else if( type == $rootScope.appConfig.lookupTypes.Qualifications )
					{
						//$scope.qualifications.push(defaultOptions);
						for (var i=0; i<result.length; i++)
						    $scope.qualifications.push(result[i]);
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
			});
			return deffered.promise();
		}
}]);

app.factory('vrpfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/vrp/create';

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + encodeURIComponent(id)
        });
	}

	service.getLookupValues = function(id,w){
		if(w != undefined)
		{
			return $http({
	            method : 'GET',
	            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + w
	        });
		}
		else
		{
			return $http({
	            method : 'GET',
	            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' 
	        });
		}
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
            url : crudServiceBaseUrl + '/vrp/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});