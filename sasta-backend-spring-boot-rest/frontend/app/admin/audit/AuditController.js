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
		        $scope.addjQueryValidator = new Validator($scope.AddAuditFormName); 
            }
        };

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
		        $scope.editjQueryValidator = new Validator($scope.EditAuditFormName);            	
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

        $scope.defaultOptions = {
	      "status": true,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "gramaSabhaDate": null,
	      "auditDistrictId": null,
	      "auditBlockId": null,
	      "villagePanchayatId": null,
	      "financialDescription": null,
	      "financialYear": null,
	      "roundDescription": null,
	      "districtName": null,
	      "modifiedBy": null,
	      "createdBy": null,
	      "blockName": null,
	      "auditId": null,
	      "startDate": null,
	      "roundId": null,
	      "roundName": null,
	      "endDtate": null,
	      "vpName": null
	    };

	    $scope.audit = {
	      "status": true,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "gramaSabhaDate": null,
	      "auditDistrictId": null,
	      "auditBlockId": null,
	      "villagePanchayatId": null,
	      "financialDescription": null,
	      "financialYear": null,
	      "roundDescription": null,
	      "districtName": null,
	      "modifiedBy": null,
	      "createdBy": null,
	      "blockName": null,
	      "auditId": null,
	      "startDate": null,
	      "roundId": null,
	      "roundName": null,
	      "endDtate": null,
	      "vpName": null
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.audit.roundid = $scope.defaultrounds.value;
		    	$scope.audit.districtid = $scope.defaultdistricts.value;
		    	$scope.audit.blockid = $scope.defaultblocks.value;
		    	$scope.audit.panchayatid = $scope.defaultvillages.value;
		    	
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
			if($scope.editjQueryValidator.doValidate()){
		    	$scope.editaudit.roundid = $scope.editdefaultrounds.value;
		    	$scope.editaudit.districtid = $scope.editdefaultdistricts.value;
		    	$scope.editaudit.blockid = $scope.editdefaultblocks.value;
		    	$scope.editaudit.panchayatid = $scope.editdefaultvillages.value;

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
	    	$scope.editaudit = {
	    		auditid : data.auditId,
	    		roundid : data.roundId,
	    		districtid : data.districtId,
	    		blockid : data.blockId,
	    		panchayatid : data.panchayatid,
				createdBy : data.createdBy,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				status: true
	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "roundId", title:'Round', editable : false  },
		        		{ field: "roundName", title:'Round Name'},
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

	    function GetLookupValues(type){
	    	auditfactory.getLookupValues(type).success(function(result){
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

app.factory('auditfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/audit/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + createbankUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/audit/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});