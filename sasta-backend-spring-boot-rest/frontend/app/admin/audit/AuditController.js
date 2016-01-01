app.controller('AuditController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','auditfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,auditfactory){

		$scope.aufactory = auditfactory;
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
            content: 'admin/audit/add.html',
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
		        $scope.jQueryAddAuditValidator = new Validator($scope.AddAuditFormName); 
            }
        };

        $scope.jQueryAddAuditValidator = null;
        $scope.jQueryEditAuditValidator = null;
        $scope.AddAuditFormName = '#frmAddAudit';
        $scope.EditAuditFormName = '#frmEditAudit';    

        $scope.keditWindowOptions = {
            content: 'admin/audit/edit.html',
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
		        $scope.jQueryEditAuditValidator = new Validator($scope.EditAuditFormName);            	
            }
        };

        $scope.OpenAuditWindow = function($event){
        	$scope.addAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addAuditWindow.center().open();
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
        	$scope.audit = $scope.defaultOptions;
        	$scope.editaudit =  $scope.defaultOptions;
        }

        $scope.OnRoundSelectedValue = function(defaultrounds){
	    	$scope.defaultrounds = defaultrounds;
	    }

	    $scope.OnDistrictsSelectedValue = function(defaultdistricts){
	    	
	    	$scope.blocks=[];
	    	GetLookupValues(1,defaultdistricts.value).done(function(result){
				$scope.defaultdistricts = defaultdistricts;
	    	});
	    	
	    }

	    $scope.OnBlocksSelectedValue = function(defaultblocks){

	    	
	    	$scope.villages=[];
	    	
	    	
	    	GetLookupValues(14,defaultblocks.value).done(function(result){
	    		$scope.defaultblocks = defaultblocks;
	    	});

	    }

	    $scope.OnVillagesSelectedValue = function(defaultvillages){
	    	$scope.defaultvillages = defaultvillages;
	    }

	    $scope.OnEditRoundSelectedValue = function(editdefaultrounds){
	    	$scope.editdefaultrounds = editdefaultrounds;
	    }

	    $scope.OnEditDistrictsSelectedValue = function(editdefaultdistricts){
	    	$scope.blocks = [];
	    	

	    	
	    	GetLookupValues(1,editdefaultdistricts.value).done(function(result){
	    		$scope.editdefaultdistricts = editdefaultdistricts;
	    	});

	    }

	    $scope.OnEditBlocksSelectedValue = function(editdefaultblocks){
	    	$scope.villages=[];
	    	
	    	
	    	GetLookupValues(14,editdefaultblocks.value).done(function(result){
	    		$scope.editdefaultblocks = editdefaultblocks;
	    	});

	    }

	    $scope.OnEditVillagesSelectedValue = function(editdefaultvillages){
	    	$scope.editdefaultvillages = editdefaultvillages;
	    }

        $scope.defaultOptions = {
	      	"createdByName" : null,
			"modifiedByName" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"auditBlockId" : null,
			"villagePanchayatId" : null,
			"modifiedDate" : null,
			"gramaSabhaDate" : null,
			"financialDescription" : null,
			"financialYear" : null,
			"status" : true,
			"roundDescription" : null,
			"districtName" : null,
			"createdBy" : 0,
			"roundId" : null,
			"roundName" : null,
			"endDate" : null,
			"vpName" : null,
			"modifiedBy" : 0,
			"startDate" : null,
			"blockName" : null,
			"auditId" : null
	    };

	    $scope.audit = {
	      	"createdByName" : null,
			"modifiedByName" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"auditBlockId" : null,
			"villagePanchayatId" : null,
			"modifiedDate" : null,
			"gramaSabhaDate" : null,
			"financialDescription" : null,
			"financialYear" : null,
			"status" : true,
			"roundDescription" : null,
			"districtName" : null,
			"createdBy" : 0,
			"roundId" : null,
			"roundName" : null,
			"endDate" : null,
			"vpName" : null,
			"modifiedBy" : 0,
			"startDate" : null,
			"blockName" : null,
			"auditId" : null

	    };

	    $scope.Submit = function(){
	    	if($scope.jQueryAddAuditValidator.doValidate()){
		    	$scope.audit.roundId = $scope.defaultrounds.value;
		    	$scope.audit.auditDistrictId = $scope.defaultdistricts.value;
		    	$scope.audit.auditBlockId = $scope.defaultblocks.value;
		    	$scope.audit.villagePanchayatId = $scope.defaultvillages.value;

		    	//$scope.audit.startDate = '2015-12-25';
		    	//$scope.audit.endDate = '2015-12-25';
		    	//$scope.audit.gramaSabhaDate = '2015-12-25';
		    	$scope.audit.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = auditfactory.doSubmitData($scope.audit);
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
			if($scope.jQueryEditAuditValidator.doValidate()){
		    	$scope.editaudit.roundId = $scope.editdefaultrounds.value;
		    	$scope.editaudit.auditDistrictId = $scope.editdefaultdistricts.value;
		    	$scope.editaudit.auditBlockId = $scope.editdefaultblocks.value;
		    	$scope.editaudit.villagePanchayatId = $scope.editdefaultvillages.value;
				
				$scope.editaudit.startDate = null;
		    	$scope.editaudit.endDate = null	;
		    	$scope.editaudit.gramaSabhaDate = '2016-01-01';
		    	$scope.editaudit.modifiedBy = $rootScope.sessionConfig.userId;

		    	var responseText = auditfactory.doUpdateData($scope.editaudit);
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
	    	$scope.editaudit = $scope.defaultOptions;
	    	$scope.editdefaultblocks = $scope.defaultblocks;
	    	$scope.editdefaultrounds = $scope.defaultrounds;
	    	$scope.editdefaultdistricts = $scope.defaultdistricts;
	    	$scope.editdefaultvillages = $scope.defaultvillages;
	    	$scope.blocks = [];
	    	
	    	alert($scope.blocks.length);
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

			 
			GetLookupValues(1,data.auditDistrictId).done(function(result){
				var b = jQuery.map( $scope.blocks, function( n, i ) {
					if(data.auditBlockId === n.value)
				  		return n;
				});

				if(b instanceof Array){
					$scope.editdefaultblocks =  b[0];
				}else{
					$scope.editdefaultblocks = $scope.defaultblocks;
				}		    		
	    	});
	   

			GetLookupValues(14,data.auditBlockId).done(function(result){
			var v = jQuery.map( $scope.villages, function( n, i ) {
				if(data.villagePanchayatId === n.value)
			  		return n;
			});	  
			if(v instanceof Array){
				$scope.editdefaultvillages =  v[0];
			}else{
				$scope.editdefaultvillages = $scope.defaultvillages;
			}});	   	

			
	    	

	    	$scope.editaudit = {
	    		auditId : data.auditId,
	    		roundId : data.roundId,
	    		auditDistrictId : data.auditDistrictId,
	    		auditBlockId : data.auditBlockId,
	    		villagePanchayatId : data.villagePanchayatId,
				modifiedBy : $rootScope.sessionConfig.userId,
				startDate : data.startDate,
				endDate : data.endDate,
				gramaSabhaDate : data.gramaSabhaDate,
				status : true,
				createdByName : data.createdByName,
				modifiedByName : data.modifiedByName,
				createdDate : data.createdDate	,
				modifiedDate : data.modifiedDate	,
				gramaSabhaDate : data.gramaSabhaDate,
				financialDescription : data.financialDescription,
				financialYear : data.financialYear,
				roundDescription : data.roundDescription,
				districtName : data.districtName,
				createdBy : data.createdBy,
				roundName : data.roundName,
				vpName : data.vpName,
				blockName : data.blockName
	    	};
	    	$scope.OpenEditAuditWindow();

	    	
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "roundName", title:'Round', editable : false  },
		        		{ field: "startDate", title:'Start Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(startDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "endDtate", title:'End Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(endDtate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
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
				         url: $scope.crudServiceBaseUrl + '/audit/getlist'
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

	    function GetLookupValues(type,id){
	    	var deffered = jQuery.Deferred();
	    	auditfactory.getLookupValues(type,id).success(function(result){
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

		GetLookupValues(13,''); 
		GetLookupValues(2,''); 
		//GetLookupValues(1); 
		//GetLookupValues(14); 
}]);

app.factory('auditfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/audit/create';

	service.getLookupValues = function(id,filter){
		
			return $http({
            	method : 'GET',
            	url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + filter
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
            url : crudServiceBaseUrl + '/audit/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});