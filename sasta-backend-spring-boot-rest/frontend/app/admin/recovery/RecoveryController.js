app.controller('RecoveryController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','recoveryfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,recoveryfactory){
       

      $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
      /* show  Context menu*/
      $scope.showContextMenu = Util.showContextMenu;

      //Popup Titles
      $scope.modelDialogTitle = {
        AddAuditTitle : "Add Recovery",
        EditAuditTitle : "Edit Recovery"
      };

      $scope.recovery = {};

      $scope.AddRecoveryFormName = '#frmAddRecovery';
      $scope.EditRecoveryFormName = '#frmEditRecovery';         

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


      $scope.recoveredType = 0;

	    var counter = 0;

      $scope.defaultDefaltDetailedRecovery = {
        "id": null,
        "description": "",
        "recoveredAmount": null,
        "displayOrder": 0,
        "actualAmount": null,
        "recoveryType": false,
        "createdDate":  "2016-01-05T22:23:28.513Z",
        "status": true,
        "modifiedDate":  "2016-01-05T22:23:28.513Z",
        "createdByName": "",
        "modifiedByName": "",
        "paidedTypeText": "",
        "recoveryTypeText": "",
        "createdBy": $rootScope.sessionConfig.userId,
        "modifiedBy": $rootScope.sessionConfig.userId,
        "recoveryId": 0,
        "paidedType": 0
      }

      $scope.dummy = angular.copy($scope.defaultDefaltDetailedRecovery);
      $scope.addItem = function(){
        $scope.arr.push(angular.copy($scope.dummy));
      }

      $scope.pushItem = function(){
        $scope.editRecovery.push(angular.copy($scope.dummy));
      }

      $scope.kaddWindowOptions = {
          content: 'admin/recovery/add.html',
          title: $scope.modelDialogTitle.AddAuditTitle,
          width : '80%',
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
            $($scope.AddRecoveryFormName).validationEngine('attach', {
                promptPosition: "topLeft",
                scroll: true
            });         
            $scope.addjQueryValidator = new Validator($scope.AddRecoveryFormName); 
          }
      }; 

      $scope.keditWindowOptions = {
          content: 'admin/recovery/edit.html',
          title: $scope.modelDialogTitle.EditAuditTitle,
          iframe: false,
          width : '90%',
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
          $($scope.EditRecoveryFormName).validationEngine('attach', {
              promptPosition: "topLeft",
              scroll: true
          });           
          $scope.editjQueryValidator = new Validator($scope.EditRecoveryFormName);             
          }
      };

      $scope.OpenRecoveryWindow = function($event){
        $scope.arr = [$scope.defaultDefaltDetailedRecovery];
        $scope.AddRecoveryWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");            
        $scope.doReset();         
        GetAudit(decodeURIComponent($location.search().aid)).done(function(result){             
          $scope.AddRecoveryWindow.center().open();
        });
      }

      $scope.moveUp = function(item){
        var idx = $scope.arr.indexOf(item);
        $scope.arr.splice(idx-1, 0, $scope.arr.splice(idx, 1)[0]);
      }

      $scope.moveDown = function(item){
        var idx = $scope.arr.indexOf(item);
        $scope.arr.splice(idx+1, 0, $scope.arr.splice(idx, 1)[0]);
      }

      $scope.delete = function(item){
        var idx = $scope.arr.indexOf(item);
        if (idx > -1) {
            $scope.arr.splice(idx, 1);
        }          
      }

      $scope.editmoveUp = function(item){
        var idx = $scope.editRecovery.indexOf(item);
        $scope.editRecovery.splice(idx-1, 0, $scope.editRecovery.splice(idx, 1)[0]);
      }

      $scope.editmoveDown = function(item){
        var idx = $scope.editRecovery.indexOf(item);
        $scope.editRecovery.splice(idx+1, 0, $scope.editRecovery.splice(idx, 1)[0]);
      }

      $scope.editdelete = function(item){
        var idx = $scope.editRecovery.indexOf(item);
        if (idx > -1) {
            $scope.editRecovery.splice(idx, 1);
        }          
      }


      $scope.CloseRecoveryWindow  = function(){
          $scope.AddRecoveryWindow.close();
          $scope.doReset();
          $scope.addjQueryValidator&&$scope.addjQueryValidator.doReset();
      }

      $scope.OpenEditRecoveryWindow = function(){
          $scope.EditRecoveryWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");          
          $scope.EditRecoveryWindow.center().open();
      }

      $scope.CloseEditRecoverytWindow = function(){
          $scope.EditRecoveryWindow.close();
          $scope.doReset();
          $scope.editjQueryValidator&& $scope.editjQueryValidator.doReset();            
      }

      $scope.doReset = function(){
        $scope.ResetAuditData();
      }

      function parseObject(list){
          angular.forEach(list,function(item,key){
            item.displayOrder = key;
            if(item.recoveryType){
              if(!item.paidedType)
                if((parseFloat(item.actualAmount||0) === parseFloat(item.recoveredAmount||0))){
                  item.paidedType = true  ;
                }
            }           
          });
          return list;     
      }

      function parseRecovery(list){
        var model = angular.copy($scope.defaultOptions);
          model.recoveredAmount = 0;
          model.setteledParasGsAmount =0;
          model.setteledParasGsCount =0;
          model.parasAmount=0;
          model.pendingParasCount=0;
          model.setteledParasGsAmount = 0;
          model.setteledParasGsCount = 0;
          model.recoveredAmount = 0;
          model.setteledParasAmount = 0;
          model.setteledParasCount = 0;     
          angular.forEach(list,function(item,key){  
            var fullyPaided = (parseFloat(item.actualAmount||0) === parseFloat(item.recoveredAmount||0))||(item.paidedType);
            if((item.recoveryType)){
              model.recoveredAmount =  parseFloat(model.recoveredAmount||0) + parseFloat(item.recoveredAmount||0);
              if(item.recoveryType){
                model.setteledParasGsAmount = parseFloat(model.setteledParasGsAmount||0) + parseFloat(item.actualAmount||0);
                model.setteledParasGsCount++;                
              }              
              model.setteledParasAmount =  parseFloat(model.setteledParasAmount) + parseFloat(item.recoveredAmount||0);
              (fullyPaided||item.paidedType)&&(model.setteledParasCount++); 
              (!fullyPaided&&(!item.paidedType))&&(model.pendingParasCount++,(
                model.pendingParasAmount = parseFloat(model.pendingParasAmount||0) + Math.abs( parseFloat(item.actualAmount||0) - parseFloat(item.recoveredAmount||0))
              ));              
            }else if((parseFloat(item.recoveredAmount||0)<parseFloat(item.actualAmount||0))){
                model.setteledParasAmount =  parseFloat(model.setteledParasAmount) + parseFloat(item.recoveredAmount||0); 
                (item.paidedType)&&(model.setteledParasCount++);
                if(!item.paidedType){
                  model.pendingParasAmount = parseFloat(model.pendingParasAmount||0) + Math.abs( parseFloat(item.actualAmount||0) - parseFloat(item.recoveredAmount||0));
                  model.pendingParasCount++;                  
                }
            }else if(fullyPaided){
              model.setteledParasAmount =  parseFloat(model.setteledParasAmount) + parseFloat(item.recoveredAmount||0);
              model.setteledParasCount++;                  
            }
            model.parasAmount = parseFloat(model.parasAmount||0) + parseFloat(item.actualAmount||0);
            model.parasCount++;
          });          
        return model;
      }

      $scope.Submit = function(){
        if($scope.addjQueryValidator.doValidate()){
          var list = angular.copy($scope.arr);
          var model = angular.copy($scope.defaultOptions);
          list = parseObject(list); 
          model.setteledParasGsCount = model.parasCount = 0;
          model = parseRecovery(list);
          list = parseObject(list);          
          model.auditId = $scope.recovery.auditId;
          var deffered = recoveryfactory.doSubmitData(model);
          deffered.success(function(r){
            angular.forEach(list,function(v,key){
              v.recoveryId = r.data;
            });
            var promise = recoveryfactory.CreateDetailedRecoverData(list);
            promise.success(function(result){
              if(result!=null){
                 if(result.status){
                    notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                    });       
                    // scope.grid is the widget reference
                     $scope.grid.dataSource.read();
                     $scope.grid.dataSource.fetch();
                     $scope.CloseRecoveryWindow();
                   }else{
                      notify({
                            messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                      });
                   }
              }
            }).error(function(error,status){
             notify({
                     messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                     position: $rootScope.appConfig.notifyConfig.position,
                     scope:$scope
              });
            });               
          }).error(function(error,status){
           notify({
                   messageTemplate: '<span>Unable to add recovery!!</span>',
                   position: $rootScope.appConfig.notifyConfig.position,
                   scope:$scope
            });
         });  
        }
      }

      $scope.doUpdateData = function(){
        if($scope.editjQueryValidator.doValidate()){
          var list = angular.copy($scope.editRecovery);
          var model = angular.copy($scope.defaultOptions);
          list = parseObject(list); 
          model.setteledParasGsCount = model.parasCount = 0;
          model = parseRecovery(list);
          list = parseObject(list);
          model.auditId = $scope.recovery.auditId;
          model.id = $scope.recovery.recoveryId;
          var deffered = recoveryfactory.doUpdateData(model);
          deffered.success(function(r){
            angular.forEach(list,function(v,key){
              v.recoveryId = $scope.recovery.recoveryId;
            });
            var promise = recoveryfactory.UpdateDetailedRecoveryList(list);
            promise.success(function(result){
              if(result!=null){
                 if(result.status){
                    notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });       
                    // scope.grid is the widget reference
                     $scope.grid.dataSource.read();
                     $scope.grid.dataSource.fetch();
                     $scope.CloseEditRecoverytWindow();
                   }else{
                      notify({
                            messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                      });
                   }
              }
            }).error(function(error,status){
             notify({
                     messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                     position: $rootScope.appConfig.notifyConfig.position,
                     scope:$scope
              });
            });                           
          }).error(function(error,status){
           notify({
                   messageTemplate: '<span>Unable to add recovery!!</span>',
                   position: $rootScope.appConfig.notifyConfig.position,
                   scope:$scope
           });
         });
        }
      }		 

      $scope.ResetAuditData = function(){
          $scope.recovery.auditId= null;
          $scope.recovery.roundId = null;
          $scope.recovery.auditDistrictId = null;
          $scope.recovery.blockId = null;
          $scope.recovery.vpId = null;  
          $scope.recovery.recoveryId = null;     
      }

      $scope.populateAuditData = function(data){
          $scope.recovery.auditId = data.auditId || null;
          $scope.recovery.roundId = data.roundId || null;
          $scope.recovery.auditDistrictId = data.auditDistrictId || null;
          $scope.recovery.blockId = data.blockId || null;
          $scope.recovery.vpId = data.vpId || null;      
          $scope.recovery.recoveryId = data.id;
      }


      $scope.defaultOptions ={
        "id": null,
        "createdDate": null,
        "modifiedDate": null,
        "createdByName": "",
        "modifiedByName": "",
        "auditDistrictId": 0,
        "financialDescription": "",
        "financialYear": "",
        "roundDescription": "",
        "districtName": "",
        "roundStartDate": "2016-05-27T02:41:37.129Z",
        "roundEndDate": "2016-05-27T02:41:37.129Z",
        "parasAmount": 0,
        "setteledParasGsCount": 0,
        "setteledParasGsAmount": 0,
        "recoveredAmount": 0,
        "setteledParasCount": 0,
        "setteledParasAmount": 0,
        "pendingParasCount": 0,
        "pendingParasAmount": 0,
        "auditId": 0,
        "modifiedBy": $rootScope.sessionConfig.userId,
        "createdBy": $rootScope.sessionConfig.userId,
        "blockId": 0,
        "roundId": 0,
        "status": true,
        "blockName": "",
        "isActive": true,
        "parasCount": 0,
        "roundName": "",
        "vpName": "",
        "vpId": 0
      };

      $scope.OnDelete = function(data){
        $scope.ResetAuditData();
        $scope.populateAuditData(data);         
        var ajaxCall = recoveryfactory.getDetailedRecoveryList(data.id);
        ajaxCall.success(function(result){
          if(result.status){
            if(result.data.length>0)
              $scope.editRecovery = result.data;
              angular.forEach($scope.editRecovery,function(i,k){
                i.status = false;
              });  

              var list = angular.copy($scope.editRecovery);
              var model = angular.copy($scope.defaultOptions);

              list = parseObject(list); 
              model.setteledParasGsCount = model.parasCount = 0;
              model = parseRecovery(list);
              list = parseObject(list);
              model.auditId = $scope.recovery.auditId;
              model.id = $scope.recovery.recoveryId;
              model.status = false;
              model.isActive = false;
              var deffered = recoveryfactory.doUpdateData(model);
              deffered.success(function(r){
                angular.forEach(list,function(v,key){
                  v.recoveryId = $scope.recovery.recoveryId;
                });
                var promise = recoveryfactory.UpdateDetailedRecoveryList(list);
                promise.success(function(result){
                  if(result!=null){
                     if(result.status){
                        notify({
                                messageTemplate: '<span>'+result.data+'</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope
                            });       
                        // scope.grid is the widget reference
                         $scope.grid.dataSource.read();
                         $scope.grid.dataSource.fetch();
                         $scope.CloseEditRecoverytWindow();
                       }else{
                          notify({
                                messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                                position: $rootScope.appConfig.notifyConfig.position,
                                scope:$scope
                          });
                       }
                  }
                }).error(function(error,status){
                 notify({
                         messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                         position: $rootScope.appConfig.notifyConfig.position,
                         scope:$scope
                  });
                });                           
              }).error(function(error,status){
               notify({
                       messageTemplate: '<span>Unable to add recovery!!</span>',
                       position: $rootScope.appConfig.notifyConfig.position,
                       scope:$scope
               });
            });
          }
        });        
      }

      $scope.EditRecovery = function(data){
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

        $scope.ResetAuditData();
        $scope.populateAuditData(data);        
      
        $scope.editRecovery = [$scope.defaultDefaltDetailedRecovery];
        var ajaxCall = recoveryfactory.getDetailedRecoveryList(data.id);
        ajaxCall.success(function(result){
          if(result.status){
            if(result.data.length>0)
              $scope.editRecovery = result.data;             
            $scope.OpenEditRecoveryWindow();
          }
        });
      }

      $scope.gridOptions = {
          columns: [ 
                { field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
                { field: "financialYear", groupable:true,width: '80px', title:'FY'},
                { field: "roundName", groupable:true,width: '90px', title:'Round'},
                { field: "districtName", groupable:true,width: '90px', title:'District'},
                { field: "blockName", groupable:true,width: '90px', title:'Block'},
                { field: "vpName", groupable:true,width: '100px', title:'Panchayat'},
                {
                  title : "Total No of paras",
                  columns :[
                    { field: "parasCount",headerTemplate: "No", title : "Paras No",width: '130px', groupable:false  },
                    { field: "parasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Paras Amount",width: '130px', groupable:false },
                  ]
                },
                {
                  title : "No of paras setteled in GS",
                  columns :[
                    { field: "setteledParasGsCount",headerTemplate: "No", title : "Paras setteled in GS No",width: '130px', groupable:false  },
                    { field: "setteledParasGsAmount",format: '{0:n0}', headerTemplate : "Amount(Token)", title : "Paras setteled in GS Amount",width: '130px', groupable:false },
                  ]
                },
                { field: "recoveredAmount", title : "Amount Recovered In GS ", groupable:false,width: '130px'  },
                {
                  title : "Paras Setteled So Far",
                  columns :[
                    { field: "setteledParasCount",headerTemplate: "No", title : "Setteled Paras No",width: '130px', groupable:false  },
                    { field: "setteledParasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Setteled Paras Amount",width: '130px', groupable:false },
                  ]
                }, 
                {
                  title : "Pending Paras",
                  columns :[
                    { field: "pendingParasCount",headerTemplate: "No", title : "Pending Paras Count",width: '130px', groupable:false  },
                    { field: "pendingParasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Pending Paras Amount",width: '130px', groupable:false },
                  ]
                },
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
                    '/recovery/getlist?key='+encodeURIComponent($location.search().aid);
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
          },
          detailInit: detailInit,
          dataBound: function() {
              this.expandRow(this.tbody.find("tr.k-master-row").first());
          }
      }

      function detailInit(e) {
        var row = e.data,recoveryId;
        row && (recoveryId=row.id);
        (recoveryId)&&($("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              pageSize: 5,
                transport: {
                    read: function (e) {
                      var baseUrl = $scope.crudServiceBaseUrl + 
                      '/recovery/getdetailedrecoverylist?id='+ recoveryId;
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
            },
            scrollable: true,
            sortable: true,
            pageable: true,
            columns: [
                { field: "actualAmount", title:"Actual Amount", width: "50px" },
                { field: "recoveredAmount", title:"Recovered Amount", width: "50px"  },
                { field: "paidedTypeText", title :"Paided Type", width: "50px" },
                { field: "recoveryTypeText", title :"Recovery Type", width: "50px" },
                { field: "description", title: "Description", width: "200px" },                
            ]
          }));
      }

      function GetAudit(id,type){
        var deffered = jQuery.Deferred();
        recoveryfactory.getAudit(id).success(function(result){
              $scope.recovery.auditId= result.data.auditId;
              $scope.recovery.roundId =result.data.roundId;
              $scope.recovery.auditDistrictId =result.data.auditDistrictId;
              $scope.recovery.blockId =result.data.auditBlockId;
              $scope.recovery.vpId =result.data.villagePanchayatId;
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
		
      function GetLookupValues(type){
        recoveryfactory.getLookupValues(type).success(function(result){
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
      });
    }

    GetLookupValues(13); 
    GetLookupValues(2); 
    GetLookupValues(1); 
    GetLookupValues(14); 

	}]);

app.factory('recoveryfactory',function($http,$q,$rootScope){

  var service = {};
  var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
  var createbankUrl = '/recovery/create';

  service.getLookupValues = function(id){
      return $http({
          method : 'GET',
          url : crudServiceBaseUrl + '/lookup/getlookup?id='+id,
          cache:false
      });
  }

  service.getDetailedRecoveryList = function(id){
      return $http({
          method : 'GET',
          url : crudServiceBaseUrl + '/recovery/getdetailedrecoverylist?id='+id,
          cache:false
      });
  }
  service.getAudit = function(id){
      return $http({
          method : 'GET',
          url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id,
          cache:false
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

  service.CreateDetailedRecoverData = function(model){
    return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/recovery/createdetailedrecoverylist',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
  }

  service.UpdateDetailedRecoveryList = function(model){
    return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/recovery/updatedetailedrecoverylist',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
  }

  service.doUpdateData = function(model){
    return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/recovery/update',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
  } 

  return service;

});