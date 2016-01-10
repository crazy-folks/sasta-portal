app.controller('MgnregaController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','mgnregafactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,mgnregafactory){

		$scope.aufactory = mgnregafactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditMgnregaTitle : "Add Mgnrega",
	    	EditAuditMgnregaTitle : "Edit Mgnrega"
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
            content: 'admin/mgnrega/add.html',
            title: $scope.modelDialogTitle.AddAuditMgnregaTitle,
            height:"400px",
            width:"800px",            
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
		        $($scope.AddAuditMgnregaFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditMgnregaFormName); 
            }
        };

        $scope.AddAuditMgnregaFormName = '#frmAddAuditMgnrega';
        $scope.EditAuditMgnregaFormName = '#frmEditAuditMgnrega';    

        $scope.keditWindowOptions = {
            content: 'admin/mgnrega/edit.html',
            title: $scope.modelDialogTitle.EditAuditMgnregaTitle,
            height:"400px",
            width:"800px",
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
		        $($scope.EditAuditMgnregaFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditMgnregaFormName);            	
            }
        };

        $scope.OpenAddAuditMgnregaWindow = function($event){
        	$scope.AddAuditMgnregaWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	$scope.AddAuditMgnregaWindow.center().open();
        	});
        }


        $scope.CloseAddAuditMgnregaWindow  = function(){
            $scope.AddAuditMgnregaWindow.close();
            if($scope.addjQueryValidator)
            	$scope.addjQueryValidator.doReset();
            $scope.doReset();
        }

        $scope.OpenEditAuditMgnregaWindow = function(){
			$scope.EditAuditMgnregaWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.EditAuditMgnregaWindow.center().open();            
        }

        $scope.CloseEditAuditMgnregaWindow  = function(){
            $scope.EditAuditMgnregaWindow.close();
            if($scope.editjQueryValidator)
            	$scope.editjQueryValidator.doReset();
            $scope.doReset();            
        }

        $scope.doReset = function(){
        	$scope.mgnrega = angular.copy($scope.defaultOptions);
        	$scope.editmgnrega =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
		  "id": null,
		  "createdBy": null,
		  "modifiedBy": null,
		  "auditId": null,
		  "roundId": null,
		  "roundName": null,
		  "vpName": null,
		  "blockName": null,
		  "blockId": null,
		  "vpId": null,
		  "totalWorksExecutedDuringFY": null,
		  "noOfWorksCompleted": null,
		  "noOfPendingWorks": null,
		  "noOfOnGoingWorks": null,
		  "materialExpForOnGoingWorks": null,
		  "expIncurredForOnGoingWorks": null,
		  "auditDistrictId": null,
		  "status": true,
		  "unskilledWagesForCompletedWorks": null,
		  "skilledWagesForCompletedWorks": null,
		  "materialExpForCompletedWorks": null,
		  "administrativeExpForCompletedWorks": null,
		  "noOfCompletedWorksEvaluatedBySA": null,
		  "expIncurredForCompletedWorks": null,
		  "valueOfCompletedWorksEvaluatedBySATeam": null,
		  "unSkilledWagesForOnGoingWorks": null,
		  "skilledWagesForOnGoingWorks": null,
		  "administrativeExpForOnGoingWorks": null,
		  "noOfOnGoingWorksEvaluatedBySATeam": null,
		  "valueOfOnGoingWorksEvaluatedBySATeam": null,
		  "createdDate": null,
		  "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialDescription": null,
		  "financialYear": null,
		  "roundDescription": null,
		  "districtName": null,
		  "roundStartDate": null,
		  "roundEndDate": null
		};

	    $scope.mgnrega = {
		  "id": null,
		  "createdBy": null,
		  "modifiedBy": null,
		  "auditId": null,
		  "roundId": null,
		  "roundName": null,
		  "vpName": null,
		  "blockName": null,
		  "blockId": null,
		  "vpId": null,
		  "totalWorksExecutedDuringFY": null,
		  "noOfWorksCompleted": null,
		  "noOfPendingWorks": null,
		  "noOfOnGoingWorks": null,
		  "materialExpForOnGoingWorks": null,
		  "expIncurredForOnGoingWorks": null,
		  "auditDistrictId": null,
		  "status": true,
		  "unskilledWagesForCompletedWorks": null,
		  "skilledWagesForCompletedWorks": null,
		  "materialExpForCompletedWorks": null,
		  "administrativeExpForCompletedWorks": null,
		  "noOfCompletedWorksEvaluatedBySA": null,
		  "expIncurredForCompletedWorks": null,
		  "valueOfCompletedWorksEvaluatedBySATeam": null,
		  "unSkilledWagesForOnGoingWorks": null,
		  "skilledWagesForOnGoingWorks": null,
		  "administrativeExpForOnGoingWorks": null,
		  "noOfOnGoingWorksEvaluatedBySATeam": null,
		  "valueOfOnGoingWorksEvaluatedBySATeam": null,
		  "createdDate": null,
		  "modifiedDate": null,
		  "createdByName": null,
		  "modifiedByName": null,
		  "financialDescription": null,
		  "financialYear": null,
		  "roundDescription": null,
		  "districtName": null,
		  "roundStartDate": null,
		  "roundEndDate": null
		};

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){		    	
		    	$scope.mgnrega.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = mgnregafactory.doSubmitData($scope.mgnrega);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseAddAuditMgnregaWindow();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add mgnrega!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add mgnrega!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.OnDelete = function(data){
	    	$scope.editmgnrega = {
				id:data.id,
				createdBy:data.createdBy,
				modifiedBy:data.modifiedBy,
				auditId:data.auditId,
				roundId:data.roundId,
				roundName:data.roundName,
				vpName:data.vpName,
				blockName:data.blockName,
				blockId:data.blockId,
				vpId:data.vpId,
				totalWorksExecutedDuringFY:data.totalWorksExecutedDuringFY,
				noOfWorksCompleted:data.noOfWorksCompleted,
				noOfPendingWorks:data.noOfPendingWorks,
				noOfOnGoingWorks:data.noOfOnGoingWorks,
				materialExpForOnGoingWorks:data.materialExpForOnGoingWorks,
				expIncurredForOnGoingWorks:data.expIncurredForOnGoingWorks,
				auditDistrictId:data.auditDistrictId,
				status:false,
				unskilledWagesForCompletedWorks:data.unskilledWagesForCompletedWorks,
				skilledWagesForCompletedWorks:data.skilledWagesForCompletedWorks,
				materialExpForCompletedWorks:data.materialExpForCompletedWorks,
				administrativeExpForCompletedWorks:data.administrativeExpForCompletedWorks,
				noOfCompletedWorksEvaluatedBySA:data.noOfCompletedWorksEvaluatedBySA,
				expIncurredForCompletedWorks:data.expIncurredForCompletedWorks,
				valueOfCompletedWorksEvaluatedBySATeam:data.valueOfCompletedWorksEvaluatedBySATeam,
				unSkilledWagesForOnGoingWorks:data.unSkilledWagesForOnGoingWorks,
				skilledWagesForOnGoingWorks:data.skilledWagesForOnGoingWorks,
				administrativeExpForOnGoingWorks:data.administrativeExpForOnGoingWorks,
				noOfOnGoingWorksEvaluatedBySATeam:data.noOfOnGoingWorksEvaluatedBySATeam,
				valueOfOnGoingWorksEvaluatedBySATeam:data.valueOfOnGoingWorksEvaluatedBySATeam,
				createdDate:data.createdDate,
				modifiedDate:data.modifiedDate,
				createdByName:data.createdByName,
				modifiedByName:data.modifiedByName,
				financialDescription:data.financialDescription,
				financialYear:data.financialYear,
				roundDescription:data.roundDescription,
				districtName:data.districtName,
				roundStartDate:data.roundStartDate,
				roundEndDate:data.roundEndDate
	    	};
	    	DoUpdate();
	    }

	    function DoUpdate(){
	    	var responseText = mgnregafactory.doUpdateData($scope.editmgnrega);
			responseText.success(function(result){
				if(result.status){
			  		notify({
			            messageTemplate: '<span>'+result.data+'</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });							
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.CloseEditAuditMgnregaWindow();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update mgnrega!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update mgnrega!.</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });	
			});	 	    	
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editmgnrega.modifiedBy = $rootScope.sessionConfig.userId;
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

	    	$scope.editmgnrega = {
				id:data.id,
				createdBy:data.createdBy,
				modifiedBy:data.modifiedBy,
				auditId:data.auditId,
				roundId:data.roundId,
				roundName:data.roundName,
				vpName:data.vpName,
				blockName:data.blockName,
				blockId:data.blockId,
				vpId:data.vpId,
				totalWorksExecutedDuringFY:data.totalWorksExecutedDuringFY,
				noOfWorksCompleted:data.noOfWorksCompleted,
				noOfPendingWorks:data.noOfPendingWorks,
				noOfOnGoingWorks:data.noOfOnGoingWorks,
				materialExpForOnGoingWorks:data.materialExpForOnGoingWorks,
				expIncurredForOnGoingWorks:data.expIncurredForOnGoingWorks,
				auditDistrictId:data.auditDistrictId,
				status:data.status,
				unskilledWagesForCompletedWorks:data.unskilledWagesForCompletedWorks,
				skilledWagesForCompletedWorks:data.skilledWagesForCompletedWorks,
				materialExpForCompletedWorks:data.materialExpForCompletedWorks,
				administrativeExpForCompletedWorks:data.administrativeExpForCompletedWorks,
				noOfCompletedWorksEvaluatedBySA:data.noOfCompletedWorksEvaluatedBySA,
				expIncurredForCompletedWorks:data.expIncurredForCompletedWorks,
				valueOfCompletedWorksEvaluatedBySATeam:data.valueOfCompletedWorksEvaluatedBySATeam,
				unSkilledWagesForOnGoingWorks:data.unSkilledWagesForOnGoingWorks,
				skilledWagesForOnGoingWorks:data.skilledWagesForOnGoingWorks,
				administrativeExpForOnGoingWorks:data.administrativeExpForOnGoingWorks,
				noOfOnGoingWorksEvaluatedBySATeam:data.noOfOnGoingWorksEvaluatedBySATeam,
				valueOfOnGoingWorksEvaluatedBySATeam:data.valueOfOnGoingWorksEvaluatedBySATeam,
				createdDate:data.createdDate,
				modifiedDate:data.modifiedDate,
				createdByName:data.createdByName,
				modifiedByName:data.modifiedByName,
				financialDescription:data.financialDescription,
				financialYear:data.financialYear,
				roundDescription:data.roundDescription,
				districtName:data.districtName,
				roundStartDate:data.roundStartDate,
				roundEndDate:data.roundEndDate
	    	};
	    	$scope.OpenEditAuditMgnregaWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", width:'130px', title:'Audit ID', hidden: true, editable : false },
		        		{ field: "totalWorksExecutedDuringFY", width:'130px', title:'Total works executed during FY' },
		        		{ field: "noOfWorksCompleted", width:'130px', title:'No. of  works Completed' },
		        		{ field: "noOfPendingWorks", width:'130px', title:'No. of pending works'},
		        		{ field: "unskilledWagesForCompletedWorks", width:'130px', title : "Unskilled wages for compl. works"},
		        		{ field: "skilledWagesForCompletedWorks", width:'130px', title : "Skilled wages for compl. works" },
		        		{ field: "materialExpForCompletedWorks", width:'130px', title : "Material exp for compl. works"},
	        			{ field: "administrativeExpForCompletedWorks", width:'130px', title:'Administrative exp for compl. works' },
		        		{ field: "noOfCompletedWorksEvaluatedBySA", width:'130px', title:'No. of compl. works evaluated by SA' },
		        		{ field: "expIncurredForCompletedWorks", width:'130px', title:'Exp. incurred for compl. works'},
		        		{ field: "valueOfCompletedWorksEvaluatedBySATeam", width:'130px', title : "Value of compl. works as evaluated by SA team"},
		        		{ field: "noOfOnGoingWorks", width:'130px', title : "No of on-going works" },
		        		{ field: "unSkilledWagesForOnGoingWorks", width:'130px', title : "Unskilled wages for on-going Works"},
	        			{ field: "skilledWagesForOnGoingWorks", width:'130px', title:'Skilled wages for on-going  Works' },
		        		{ field: "materialExpForOnGoingWorks", width:'130px', title:'Material Exp for on-going Works' },
		        		{ field: "administrativeExpForOnGoingWorks", width:'130px', title:'Administrative Exp for ongoing. Works'},
		        		{ field: "noOfOnGoingWorksEvaluatedBySATeam", width:'130px', title : "No. of on-going works evaluated by SA team"},
		        		{ field: "expIncurredForOnGoingWorks", width:'130px', title : "Exp. incurred for on-going works" },
		        		{ field: "valueOfOnGoingWorksEvaluatedBySATeam", width:'130px', title : "Value of on-going works evaluated by SA team"},

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
				         url: $scope.crudServiceBaseUrl + '/mgnregaworks/getlist'
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
	    	mgnregafactory.getAudit(id).success(function(result){



		    		$scope.mgnrega.auditId= result.data.auditId;
		    		$scope.mgnrega.roundId =result.data.roundId;
			    	$scope.mgnrega.auditDistrictId =result.data.auditDistrictId;
			    	$scope.mgnrega.blockId =result.data.auditBlockId;
			    	$scope.mgnrega.vpId =result.data.villagePanchayatId;
					
	    		
				
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
	    	mgnregafactory.getLookupValues(type).success(function(result){
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

app.factory('mgnregafactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/mgnregaworks/create';

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
            url : crudServiceBaseUrl + '/mgnregaworks/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});