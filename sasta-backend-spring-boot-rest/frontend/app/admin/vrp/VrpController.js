app.controller('VrpController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','vrpfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,vrpfactory,$q){

		$scope.aufactory = vrpfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add VRP",
	    	EditAuditTitle : "Edit VRP"
	    };

		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];
		$scope.grades = [];
		$scope.payments = [];
		$scope.qualifications = [];
		$scope.communities = [];
		$scope.banks = [];
		$scope.genders = [];

		$scope.getVillagePanchayat = function(id){
			id = id || '';
			var returnValue  = '';
			if(!id){
				var dt = jQuery.map( $scope.villages, function( n, i ) {
					if(id === n.value)
				  		return n;
				});	
				if(dt.length>0){
					returnValue = dt[0].text;
				}
			}
			return returnValue;
		}

		$scope.defaultSelections = {
		    "value": 0,
		    "text": "Select"
		};

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

		$scope.defaultgrades = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultbanks = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultcommunities = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultqualifications = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultpayments = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Cash"
	        }, {
	            "value": 2,
	            "text": "Cheque"
	        }, {
	            "value": 3,
	            "text": "DD"
	        }];

		$scope.defaultgender = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Male"
	        }, {
	            "value": 2,
	            "text": "Female"
	        }];
		$scope.genders = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Male"
	        }, {
	            "value": 2,
	            "text": "Female"
	        }];

		$scope.payments = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Cash"
	        }, {
	            "value": 2,
	            "text": "Cheque"
	        }, {
	            "value": 3,
	            "text": "DD"
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
	    	$scope.defaultpayments = defaultpayments;
	    }

	    $scope.OnVillageSelectedValue = function(defaultvillages){
	    	$scope.defaultvillages = defaultvillages;
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

		        //$scope.genders.push($scope.defaultgender);
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
			$scope.EditVrpAuditWindow.center().open();            
        }

        $scope.CloseEditVrpAuditWindow = function(){
            $scope.EditVrpAuditWindow.close();
            $scope.doReset();
            if($scope.edit1jQueryValidator)
            	$scope.edit1jQueryValidator.doReset();
        }

        $scope.doFillLookup = function(data)
        {
        	if(data != null)
        		$scope.editvrp.villagePanchayatId = data.villagePanchayatId;

    	    $q.when(true).then(function(value) {
		        return GetAudit(decodeURIComponent($location.search().aid)); // Will be resolved (1)
		    }).then(function(value) { 
		    	$scope.villages = [];       
		        return GetLookupValues(14,$scope.vrp.auditBlockId);
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
        	//$scope.defaultvillages = [];
        	$scope.defaultrounds = angular.copy($scope.defaultSelections);
        	$scope.defaultgender = angular.copy($scope.defaultSelections);
        	$scope.defaultqualifications= angular.copy($scope.defaultSelections);
        	$scope.defaultpayments= angular.copy($scope.defaultSelections);
        	$scope.defaultcommunities= angular.copy($scope.defaultSelections);
        	$scope.defaultgrades= angular.copy($scope.defaultSelections);
        	$scope.defaultvillages = angular.copy($scope.defaultSelections);
        	$scope.villages = [];

			var ba = jQuery.map( $scope.banks, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  

			if(ba instanceof Array){
				$scope.defaultbanks =  ba[0];
			}else{
				$scope.defaultbanks = $scope.defaultbanks;
			}	   

			var c = jQuery.map( $scope.communities, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  

			if(c instanceof Array){
				$scope.defaultcommunities =  c[0];
			}else{
				$scope.defaultcommunities = $scope.defaultcommunities;
			}	 	

			var q = jQuery.map( $scope.qualifications, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  

			if(q instanceof Array){
				$scope.defaultqualifications =  q[0];
			}else{
				$scope.defaultqualifications = $scope.defaultqualifications;
			}

			var g = jQuery.map( $scope.grades, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  

			if(g instanceof Array){
				$scope.defaultgrades =  g[0];
			}else{
				$scope.defaultgrades = $scope.defaultgrades;
			}	

			var p = jQuery.map( $scope.payments, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	 

			if(p instanceof Array){
				$scope.defaultpayments =  p[0];
			}else{
				$scope.defaultpayments = $scope.defaultpayments;
			}
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
				$scope.vrp.bankId = $scope.defaultbanks.value;
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
						$scope.CloseAddVrpAuditWindow();
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
					$scope.CloseEditVrpAuditWindow();
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
		    	$scope.editvrp.villagePanchayatId = $scope.defaultvillages.value;
				$scope.editvrp.communityId = $scope.defaultcommunities.value;
				$scope.editvrp.genderId = $scope.defaultgender.value;
				$scope.editvrp.bankId = $scope.defaultbanks.value;
				$scope.editvrp.gradeId = $scope.defaultgrades.value;
				$scope.editvrp.payMode = $scope.defaultpayments.value;
				$scope.editvrp.qualificationId = $scope.defaultqualifications.value;
				DoUpdate();
			}
	    }

	    $scope.EditData = function(data){
	    	$scope.doReset();
	    	$scope.doFillLookup(data);
	    		var v = jQuery.map( $scope.villages, function( n, i ) {
					if(data.villagePanchayatId === n.value)
				  		return n;
				});

				if(v instanceof Array){
					$scope.defaultvillages =  v[0];
				}else{
					$scope.defaultvillages = $scope.defaultvillages;
				}
	    	
	    	var r = jQuery.map( $scope.rounds, function( n, i ) {
				if(data.roundId === n.value)
			  		return n;
			});	

			if(r instanceof Array){
				$scope.defaultrounds =  r[0];
			}else{
				$scope.defaultrounds = $scope.defaultrounds;
			}

			var d = jQuery.map( $scope.districts, function( n, i ) {
				if(data.auditDistrictId === n.value)
			  		return n;
			});

			if(d instanceof Array){
				$scope.defaultdistricts =  d[0];
			}else{
				$scope.defaultdistricts = $scope.defaultdistricts;
			}

			var b = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});	

			if(b instanceof Array){
				$scope.defaultblocks =  b[0];
			}else{
				$scope.defaultblocks = $scope.defaultblocks;
			}	   
				

			var ba = jQuery.map( $scope.banks, function( n, i ) {
				if(data.bankId === n.value)
			  		return n;
			});	

			if(ba instanceof Array){
				$scope.defaultbanks =  ba[0];
			}else{
				$scope.defaultbanks = $scope.defaultbanks;
			}	

			var c = jQuery.map( $scope.communities, function( n, i ) {
				if(data.communityId === n.value)
			  		return n;
			});	

			if(c instanceof Array){
				$scope.defaultcommunities =  c[0];
			}else{
				$scope.defaultcommunities = $scope.defaultcommunities;
			}	

			var q = jQuery.map( $scope.qualifications, function( n, i ) {
				if(data.qualificationId === n.value)
			  		return n;
			});	

			if(q instanceof Array){
				$scope.defaultqualifications =  q[0];
			}else{
				$scope.defaultqualifications = $scope.defaultqualifications;
			}

			var g = jQuery.map( $scope.grades, function( n, i ) {
				if(data.gradeId === n.value)
			  		return n;
			});

			if(g instanceof Array){
				$scope.defaultgrades =  g[0];
			}else{
				$scope.defaultgrades = $scope.defaultgrades;
			}

			var p = jQuery.map( $scope.payments, function( n, i ) {
				if(data.payMode === n.value)
			  		return n;
			});

			if(p instanceof Array){
				$scope.defaultpayments =  p[0];
			}else{
				$scope.defaultpayments = $scope.defaultpayments;
			}

			var ge = jQuery.map( $scope.genders, function( n, i ) {
				if(data.genderId === n.value)
			  		return n;
			});	

			if(ge instanceof Array){
				$scope.defaultgender =  ge[0];
			}else{
				$scope.defaultgender = $scope.defaultgender;
			}	

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
				createdBy : data.createdBy,
				roundId : data.roundId,
				roundName : data.roundName,
				modifiedBy : data.modifiedBy,
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
	    	$scope.OpenEditVrpAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "genderId", title:'Gender',template:"#=(((genderId||'')=='')?'':((genderId==1)?'Male':'Female'))#"},
		        		{ field: "jobCardNumber", title : "Job Card Number"},
		        		{ field: "guardianName", title : "Father / Husband Name"},
		        		{ field: "contactNumber", title:'Contact No'},
		        		{ field: "totalDays", title : "No. of days worked"},
		        		{ field: "guardianName", title : "Amount Paid"},
		        		{ field: "accountNumber", title:'A/c No.'},
		        		{ field: "ifscCode", title : "IFS Code"},
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
				         url: $scope.crudServiceBaseUrl + '/vrp/getvrpdetailslist'
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

	    function GetLookupValues(type,id){
	    	var deffered = jQuery.Deferred();
	    	vrpfactory.getLookupValues(type,id).success(function(result){
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
					else if(type==6){
						$scope.communities.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.communities.push(result[i]);
						}	
					}
					else if(type==4)
					{
						$scope.banks.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.banks.push(result[i]);
						}	
					}
					else if(type==10)
					{
						$scope.grades.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.grades.push(result[i]);
						}	
					}
					else if(type==12)
					{
						$scope.qualifications.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.qualifications.push(result[i]);
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

		GetLookupValues(13); 
		GetLookupValues(2); 
		GetLookupValues(1); 
		GetLookupValues(6); 
		GetLookupValues(10); 
		GetLookupValues(12); 
		GetLookupValues(4); 

}]);

app.factory('vrpfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/vrp/create';

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
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