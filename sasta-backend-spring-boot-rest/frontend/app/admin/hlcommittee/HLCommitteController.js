app.controller('HLCommitteeController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','hlcommitteefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,hlcommitteefactory){

		$scope.aufactory = hlcommitteefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		/* show  Context menu*/
		$scope.showContextMenu = Util.showContextMenu;
				
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditHLCTitle : "Add High Level Committee",
	    	EditAuditHLCTitle : "Edit High Level Committee"
	    };

		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];

		$scope.dateOptions = {
		    format: 'yyyy-MM-dd'
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


        $scope.kaddWindowOptions = {
            content: 'admin/hlcommittee/add.html',
            title: $scope.modelDialogTitle.AddAuditHLCTitle,
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
		        $($scope.AddAuditHLCFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditHLCFormName); 
            }
        };

        $scope.AddAuditHLCFormName = '#frmAddAuditHLC';
        $scope.EditAuditHLCFormName = '#frmEditAuditHLC';    

        $scope.keditWindowOptions = {
            content: 'admin/hlcommittee/edit.html',
            title: $scope.modelDialogTitle.EditAuditHLCTitle,
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
		        $($scope.EditAuditHLCFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditHLCFormName);            	
            }
        };

        $scope.OpenAddAuditHLCWindow = function($event){
        	$scope.AddAuditHLCWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){            	
            	$scope.AddAuditHLCWindow.center().open();
        	});
        }


        $scope.CloseAddAuditHLCWindow  = function(){
            $scope.AddAuditHLCWindow.close();
            $scope.addjQueryValidator.doReset();
            $scope.doReset();
        }

        $scope.OpenEditAuditHLCWindow = function(){
			$scope.EditAuditHLCWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.EditAuditHLCWindow.center().open();
        }

        $scope.CloseEditAuditHLCWindow = function(){
            $scope.EditAuditHLCWindow.close();
            $scope.editjQueryValidator.doReset();
            $scope.doReset();            
        }

        $scope.doReset = function(){
        	$scope.hlcommittee = angular.copy($scope.defaultOptions);
        	$scope.edithlcommittee =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
			"id" : null,
			"status" : null,
			"roundId" : null,
			"vpName" : null,
			"blockName" : null,
			"auditId" : null,
			"createdBy" : null,
			"modifiedBy" : null,
			"roundName" : null,
			"blockId" : null,
			"vpId" : null,
			"financialYear" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"modifiedDate" : null,
			"roundDescription" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"financialDescription" : null,
			"districtName" : null,
			"roundEndDate" : null,
			"roundStartDate" : null,
			"pendingParasCount" : null,
			"amountToBeRecovered" : null,
			"totalParasCount" : null,
			"totalParasAmt" : null,
			"paraSettledDuringDSAmt" : null,
			"paraSettledDuringHLCCount" : null,
			"paraSettledDuringHLCAmt" : null,
			"amountRecovered" : null,
			"paraSettledDuringDSCount" : null,
			"pendingParasAmt" : null,
			"dateOfJointSitting" : null

	    };

	    $scope.hlcommittee = {
			"id" : 0,
			"status" : null,
			"roundId" : null,
			"vpName" : null,
			"blockName" : null,
			"auditId" : null,
			"createdBy" : null,
			"modifiedBy" : null,
			"roundName" : null,
			"blockId" : null,
			"vpId" : null,
			"financialYear" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"modifiedDate" : null,
			"roundDescription" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"financialDescription" : null,
			"districtName" : null,
			"roundEndDate" : null,
			"roundStartDate" : null,
			"pendingParasCount" : null,
			"amountToBeRecovered" : null,
			"totalParasCount" : null,
			"totalParasAmt" : null,
			"paraSettledDuringDSAmt" : null,
			"paraSettledDuringHLCCount" : null,
			"paraSettledDuringHLCAmt" : null,
			"amountRecovered" : null,
			"paraSettledDuringDSCount" : null,
			"pendingParasAmt" : null,
			"dateOfJointSitting" : null

	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){

		    	$scope.hlcommittee.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = hlcommitteefactory.doSubmitData($scope.hlcommittee);
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
						$scope.CloseAddAuditHLCWindow();
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
		    	$scope.edithlcommittee = {
					id : data.id,
					status : false,
					roundId : data.roundId,
					vpName : data.vpName,
					blockName : data.blockName,
					auditId : data.auditId,
					createdBy : data.createdBy,
					modifiedBy : data.modifiedBy,
					roundName : data.roundName,
					blockId : data.blockId,
					vpId : data.vpId,
					financialYear : data.financialYear,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					modifiedDate : data.modifiedDate,
					roundDescription : data.roundDescription,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					financialDescription : data.financialDescription,
					districtName : data.districtName,
					roundEndDate : data.roundEndDate,
					roundStartDate : data.roundStartDate,
					pendingParasCount : data.pendingParasCount,
					amountToBeRecovered : data.amountToBeRecovered,
					totalParasCount : data.totalParasCount,
					totalParasAmt : data.totalParasAmt,
					paraSettledDuringDSAmt : data.paraSettledDuringDSAmt,
					paraSettledDuringHLCCount : data.paraSettledDuringHLCCount,
					paraSettledDuringHLCAmt : data.paraSettledDuringHLCAmt,
					amountRecovered : data.amountRecovered,
					paraSettledDuringDSCount : data.paraSettledDuringDSCount,
					pendingParasAmt : data.pendingParasAmt,
					dateOfJointSitting : data.dateOfJointSitting
		    	};
		    	DoUpdate();
	    	}
	    }

	    function DoUpdate(){
	    	var responseText = hlcommitteefactory.doUpdateData($scope.edithlcommittee);
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
					$scope.CloseEditAuditHLCWindow();
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

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.edithlcommittee.modifiedBy = $rootScope.sessionConfig.userId;
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

	    	$scope.edithlcommittee = {
				id : data.id,
				status : data.status,
				roundId : data.roundId,
				vpName : data.vpName,
				blockName : data.blockName,
				auditId : data.auditId,
				createdBy : data.createdBy,
				modifiedBy : data.modifiedBy,
				roundName : data.roundName,
				blockId : data.blockId,
				vpId : data.vpId,
				financialYear : data.financialYear,
				createdByName : data.createdByName,
				modifiedByName : data.modifiedByName,
				modifiedDate : data.modifiedDate,
				roundDescription : data.roundDescription,
				createdDate : data.createdDate,
				auditDistrictId : data.auditDistrictId,
				financialDescription : data.financialDescription,
				districtName : data.districtName,
				roundEndDate : data.roundEndDate,
				roundStartDate : data.roundStartDate,
				pendingParasCount : data.pendingParasCount,
				amountToBeRecovered : data.amountToBeRecovered,
				totalParasCount : data.totalParasCount,
				totalParasAmt : data.totalParasAmt,
				paraSettledDuringDSAmt : data.paraSettledDuringDSAmt,
				paraSettledDuringHLCCount : data.paraSettledDuringHLCCount,
				paraSettledDuringHLCAmt : data.paraSettledDuringHLCAmt,
				amountRecovered : data.amountRecovered,
				paraSettledDuringDSCount : data.paraSettledDuringDSCount,
				pendingParasAmt : data.pendingParasAmt,
				dateOfJointSitting : data.dateOfJointSitting
	    	};
	    	$scope.OpenEditAuditHLCWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "dateOfJointSitting", title:'Date of Joint Sitting',template: "#= kendo.toString(kendo.parseDate(new Date(roundStartDate), 'yyyy-MM-dd'), 'dd/MM/yyyy') #"  },
		        		{ field: "totalParasCount", title:'Total Paras No' },
		        		{ field: "totalParasAmt", title:'Total Paras Amount'},
		        		{ field: "paraSettledDuringDSCount", title : "Paras Settled during GS No"},
		        		{ field: "paraSettledDuringDSAmt", title : "Paras Settled during GS Amount"},
		        		{ field: "paraSettledDuringHLCCount", title : "Paras settled in HLC No"},
		        		{ field: "paraSettledDuringHLCAmt", title : "Paras settled in HLC Amount"},
		        		{ field: "pendingParasCount", title : "Pending Paras No"},
		        		{ field: "pendingParasAmt", title : "Pending Paras Amount"},
		        		{ field: "amountRecovered", title : "Amount Recovered"},
		        		{ field: "amountToBeRecovered", title : "Amount to be Recovered"},
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
	                	'/highLevelcommities/getlist?key='+encodeURIComponent($location.search().aid);
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

	    function GetAudit(id)
	    {
	    	var deffered = jQuery.Deferred();
			    	hlcommitteefactory.getAudit(id).success(function(result){
		    		$scope.hlcommittee.auditId= result.data.auditId;
		    		$scope.hlcommittee.roundId =result.data.roundId;
			    	$scope.hlcommittee.auditDistrictId =result.data.auditDistrictId;
			    	$scope.hlcommittee.blockId =result.data.auditBlockId;
			    	$scope.hlcommittee.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	hlcommitteefactory.getLookupValues(type).success(function(result){
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

app.factory('hlcommitteefactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/highLevelcommities/create';

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
            url : crudServiceBaseUrl + '/highLevelcommities/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});