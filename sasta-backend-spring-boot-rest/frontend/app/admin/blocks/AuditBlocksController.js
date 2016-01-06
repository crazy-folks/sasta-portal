app.controller('AuditBlocksController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','blocksfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,blocksfactory){


		$scope.blocksfactory = blocksfactory;
		$scope.blocks = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	    //Action of clicking product name link.
	    $scope.modelDialogTitle = {
	    	addblockTitle : "Add Blocks",
	    	editblockTitle : "Edit Blocks"
	    };

	    $scope.Districts = [];
	    $scope.defaultDistricts = {
		    "value": 0,
		    "text": "Select"
		};

        $scope.kaddWindowOptions = {
            content: 'admin/blocks/add.html',
            title: $scope.modelDialogTitle.addblockTitle,
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
		        $($scope.addblockformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.addblockformName); 
            }
        };

        $scope.addblockformName = '#frmaddBlocks';
        $scope.editblockformName = '#frmeditBlocks';    

        $scope.keditWindowOptions = {
            content: 'admin/blocks/edit.html',
            title: $scope.modelDialogTitle.editblockTitle,
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
		        $($scope.editblockformName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.editblockformName);            	
            }
        };

        $scope.addBlockWindow = function($event){
        	$scope.addblockMeWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.addblockMeWindow.center().open();
        }

        $scope.CloseaddBlockWindow = function(){
            $scope.addblockMeWindow.close();
        }

        $scope.editBlockWindow = function(){
            $scope.editblockMeWindow.center().open();
        }

        $scope.CloseEditBlockWindow = function(){
            $scope.editblockMeWindow.close();
        }

        $scope.doReset = function(){
        	$scope.block = $scope.defaultOptions;
        	$scope.editblocks =  $scope.defaultOptions;
        }

        $scope.defaultOptions = {
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "description" : "",
	      "blockName": "",
	      "districtID": null,
	      "blockID": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": ""
	    };


	    $scope.block = {
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "description" : "",
	      "blockName": "",
	      "districtID": null,
	      "blockID": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": ""
	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	$scope.block.districtID = $scope.defaultDistricts.value;
		    	var responseText = blocksfactory.doSubmitData($scope.block);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
	  					$scope.CloseaddBlockWindow();
	  					$scope.doReset(); 
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add blocks!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });				  			
			  		}
				}).error(function(error,status){
				  		notify({
				            messageTemplate: '<span>Unable to add blocks!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });	
				});  		
	    	}
    	
	    }

	    function DoUpdate(){
			var responseText = blocksfactory.doUpdateData($scope.editblocks);
			responseText.success(function(result){
				if(result.status){
			  		notify({
			            messageTemplate: '<span>'+result.data+'</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });							
					// scope.grid is the widget reference
					$scope.grid.dataSource.read();
					$scope.CloseEditBlockWindow();
					$scope.doReset();
		  		}else{
			  		notify({
			            messageTemplate: '<span>Unable to update blocks!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
		  		}
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to update blocks!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
			});
	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
				$scope.editblocks.districtID = $scope.editdefaultOptions.value;
				DoUpdate();
			}	    	
	    }

	    $scope.OnSelectedValue = function(defaultDistricts){
	    	$scope.defaultDistricts = defaultDistricts;
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.Districts, function( n, i ) {
				if(data.districtID === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultDistricts;
			}

			$scope.editblocks ={
				  "description": data.description || '',
				  "createdDate": null,
				  "blockID": data.blockID,
				  "districtID": $scope.editdefaultOptions.value,
				  "isActive": true,
				  "blockName": data.blockName,
				  "createdBy": $rootScope.sessionConfig.userId,
				  "modifiedBy": $rootScope.sessionConfig.userId,
				  "modifiedDate": null,
				  "createdByName": null,
				  "modifiedByName": null
			}
	    	$scope.editBlockWindow();
	    }

	    $scope.OnDelete = function(data){
			$scope.editblocks =	{
				  "description": data.description || '',
				  "createdDate": null,
				  "blockID": data.blockID,
				  "districtID": data.districtID,
				  "isActive": false,
				  "blockName": data.blockName,
				  "createdBy": $rootScope.sessionConfig.userId,
				  "modifiedBy": $rootScope.sessionConfig.userId,
				  "modifiedDate": null,
				  "createdByName": null,
				  "modifiedByName": null
			};
	    	DoUpdate();	
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "blockID", title:'ID', hidden: true, editable : false },
		        		{ field: "blockName", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
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
				         url: $scope.crudServiceBaseUrl + '/block/getlist'
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

	    $scope.GetDistricts = function(){
	    	var obj = $scope.selectedDistricts;
	    	GetLookupValues(2);
	    }

	    function GetLookupValues(type){
	    	blocksfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.Districts.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.Districts.push(result[i]);
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

		GetLookupValues(2);

}]);

app.factory('blocksfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createblocksUrl = '/block/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createblocksUrl,
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/block/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});