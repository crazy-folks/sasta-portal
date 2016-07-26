app.controller('SgmController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','sgmfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,sgmfactory){

		$scope.aufactory = sgmfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add Special Grama Shaba",
	    	EditAuditTitle : "Edit Special Grama Shaba"
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
            content: 'admin/sgm/add.html',
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
		        $($scope.AddAuditFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditFormName); 
            }
        };

        $scope.AddAuditFormName = '#frmAddAuditExpenditure';
        $scope.EditAuditFormName = '#frmEditAuditExpenditure';    

        $scope.keditWindowOptions = {
            content: 'admin/sgm/edit.html',
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
            $scope.doReset();
            $scope.addjQueryValidator.doReset();
        }

        $scope.OpenEditAuditWindow = function(){
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editAuditWindow.center().open();
        }

        $scope.CloseEditAuditWindow = function(){
            $scope.editAuditWindow.close();
			$scope.doReset();
            $scope.editjQueryValidator.doReset();            
        }

        $scope.doReset = function(){
        	$scope.sgm = angular.copy($scope.defaultOptions);
        	$scope.editsgm =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
	      "id" : null,
			"status" : null,
			"nameOfPersonRecordedMinutes" : null,
			"auditId" : null,
			"createdBy" : null,
			"roundId" : null,
			"modifiedBy" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"amountRecoveredDuringSgs" : null,
			"noOfFamiliesRegistered" : null,
			"totalFamiliesInVpts" : null,
			"parasSetteled" : null,
			"saReportsUploaded" : null,
			"nameOfPersonHeadSgs" : null,
			"atrsUploaded" : null,
			"totalParasPlacedInSgs" : null,
			"totalPopulation" : null,
			"totalJcsInVpts" : null,
			"noOfPplAttentedSgs" : null,
			"roundName" : null,
			"vpName" : null,
			"blockName" : null,
			"blockId" : null,
			"vpId" : null,
			"modifiedByName" : null,
			"createdByName" : null,
			"modifiedDate" : null,
			"financialDescription" : null,
			"districtName" : null,
			"financialYear" : null,
			"roundDescription" : null,
			"roundStartDate" : null,
			"roundEndDate" : null

	    };

	    $scope.sgm = {
	      	"id" : 0,
			"status" : null,
			"nameOfPersonRecordedMinutes" : null,
			"auditId" : null,
			"createdBy" : null,
			"roundId" : null,
			"modifiedBy" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"amountRecoveredDuringSgs" : null,
			"noOfFamiliesRegistered" : null,
			"totalFamiliesInVpts" : null,
			"parasSetteled" : null,
			"saReportsUploaded" : null,
			"nameOfPersonHeadSgs" : null,
			"atrsUploaded" : null,
			"totalParasPlacedInSgs" : null,
			"totalPopulation" : null,
			"totalJcsInVpts" : null,
			"noOfPplAttentedSgs" : null,
			"roundName" : null,
			"vpName" : null,
			"blockName" : null,
			"blockId" : null,
			"vpId" : null,
			"modifiedByName" : null,
			"createdByName" : null,
			"modifiedDate" : null,
			"financialDescription" : null,
			"districtName" : null,
			"financialYear" : null,
			"roundDescription" : null,
			"roundStartDate" : null,
			"roundEndDate" : null

	    };

	    $scope.Submit = function(){
	    	$('#txtparasSetteled').validationEngine('showPrompt');
	    	if(!($scope.sgm.parasSetteled <= $scope.sgm.totalParasPlacedInSgs)){
	    		$('#txtparasSetteled').validationEngine(
	    			'showPrompt', 'Settled para\'s should be less than or equal to placed para\'s!', 
	    			'error'
	    		);
	    		return false;
	    	}
	    	$('#txtparasSetteled').validationEngine('showPrompt', 'This is an example', 'error');
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.sgm.createdBy = $rootScope.sessionConfig.userId;
		    	var responseText = sgmfactory.doSubmitData($scope.sgm);
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
				            messageTemplate: '<span>Unable to add Special Gram Shaba!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add Special Gram Shaba!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	if(confirm('Are you sure want to delete?')){
		    	$scope.editsgm = {
					id : data.id,
					status : false,
					nameOfPersonRecordedMinutes : data.nameOfPersonRecordedMinutes,
					auditId : data.auditId,
					createdBy : data.createdBy,
					roundId : data.roundId,
					modifiedBy : data.modifiedBy,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					amountRecoveredDuringSgs : data.amountRecoveredDuringSgs,
					noOfFamiliesRegistered : data.noOfFamiliesRegistered,
					totalFamiliesInVpts : data.totalFamiliesInVpts,
					parasSetteled : data.parasSetteled,
					saReportsUploaded : data.saReportsUploaded,
					nameOfPersonHeadSgs : data.nameOfPersonHeadSgs,
					atrsUploaded : data.atrsUploaded,
					totalParasPlacedInSgs : data.totalParasPlacedInSgs,
					totalPopulation : data.totalPopulation,
					totalJcsInVpts : data.totalJcsInVpts,
					noOfPplAttentedSgs : data.noOfPplAttentedSgs,
					roundName : data.roundName,
					vpName : data.vpName,
					blockName : data.blockName,
					blockId : data.blockId,
					vpId : data.vpId,
					modifiedByName : data.modifiedByName,
					createdByName : data.createdByName,
					modifiedDate : data.modifiedDate,
					financialDescription : data.financialDescription,
					districtName : data.districtName,
					financialYear : data.financialYear,
					roundDescription : data.roundDescription,
					roundStartDate : data.roundStartDate,
					roundEndDate : data.roundEndDate
		    	};
		    	DoUpdate();
	    	}
	    }


	    function DoUpdate(){		    	
	    	var responseText = sgmfactory.doUpdateData($scope.editsgm);
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
			            messageTemplate: '<span>Unable to update Special Gram Shaba!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update Special Gram Shaba!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
				$scope.editsgm.modifiedBy = $rootScope.sessionConfig.userId;
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

	    	$scope.editsgm = {
				id : data.id,
				status : data.status,
				nameOfPersonRecordedMinutes : data.nameOfPersonRecordedMinutes,
				auditId : data.auditId,
				createdBy : data.createdBy,
				roundId : data.roundId,
				modifiedBy : data.modifiedBy,
				createdDate : data.createdDate,
				auditDistrictId : data.auditDistrictId,
				amountRecoveredDuringSgs : data.amountRecoveredDuringSgs,
				noOfFamiliesRegistered : data.noOfFamiliesRegistered,
				totalFamiliesInVpts : data.totalFamiliesInVpts,
				parasSetteled : data.parasSetteled,
				saReportsUploaded : data.saReportsUploaded,
				nameOfPersonHeadSgs : data.nameOfPersonHeadSgs,
				atrsUploaded : data.atrsUploaded,
				totalParasPlacedInSgs : data.totalParasPlacedInSgs,
				totalPopulation : data.totalPopulation,
				totalJcsInVpts : data.totalJcsInVpts,
				noOfPplAttentedSgs : data.noOfPplAttentedSgs,
				roundName : data.roundName,
				vpName : data.vpName,
				blockNHame : data.blockNHame,
				blockId : data.blockId,
				vpId : data.vpId,
				modifiedByName : data.modifiedByName,
				createdByName : data.createdByName,
				modifiedDate : data.modifiedDate,
				financialDescription : data.financialDescription,
				districtName : data.districtName,
				financialYear : data.financialYear,
				roundDescription : data.roundDescription,
				roundStartDate : data.roundStartDate,
				roundEndDate : data.roundEndDate
	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "totalPopulation",width: '130px', title:'Total Population'},
		        		{ field: "totalFamiliesInVpts",width: '130px', title:'Total no.of families in Village Pts'},
		        		{ field: "noOfFamiliesRegistered",width: '130px', title:'No.of families registered'},
		        		{ field: "totalJcsInVpts",width: '130px', title : "No.of JCs in Village panchayat"},
		        		{ field: "noOfPplAttentedSgs",width: '130px', title:'No.of people attended SGS'},
		        		{ field: "nameOfPersonHeadSgs",width: '130px', title:'Name of the person who headed in SGS'},
		        		{ field: "nameOfPersonRecordedMinutes",width: '130px', title:'Name of the person who recorded SGS minutes'},
		        		{ field: "totalParasPlacedInSgs",width: '130px', title : "Total no. of paras placed in SGS"},
		        		{ field: "noOfPplAttentedSgs",width: '130px', title:'No.of people attended SGS'},

		        		{ field: "parasSetteled",width: '130px', title:'Paras settled in SGS'},
		        		{ field: "amountRecoveredDuringSgs",width: '130px', title:'Amount recovered during SGS'},
		        		{ field: "saReportsUploaded",width: '130px', title : "SA reports uploaded in MGNREGA website",template:"#=((!saReportsUploaded)?'No':'Yes')#"},
		        		{ field: "atrsUploaded",width: '130px', title : "ATRs uploaded in MGNREGA website",template:"#=((!atrsUploaded)?'No':'Yes')#"},
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
	                	'/specialgramasabha/getlist?key='+encodeURIComponent($location.search().aid);
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

	    function GetAudit(id,type)
	    {
	    	var deffered = jQuery.Deferred();
	    	sgmfactory.getAudit(id).success(function(result){
	    		

		    		$scope.sgm.auditId= result.data.auditId;
		    		$scope.sgm.roundId =result.data.roundId;
			    	$scope.sgm.auditDistrictId =result.data.auditDistrictId;
			    	$scope.sgm.blockId =result.data.auditBlockId;
			    	$scope.sgm.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	sgmfactory.getLookupValues(type).success(function(result){
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
}]);

app.factory('sgmfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/specialgramasabha/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
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
            url : crudServiceBaseUrl + '/specialgramasabha/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});