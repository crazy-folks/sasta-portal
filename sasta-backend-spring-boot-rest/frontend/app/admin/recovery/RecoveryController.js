app.controller('RecoveryController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','recoveryfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,recoveryfactory){
       

      $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

      //Popup Titles
      $scope.modelDialogTitle = {
        AddAuditTitle : "Add Recovery",
        EditAuditTitle : "Edit Recovery"
      };

      $scope.recovery = {};

      $scope.AddRecoveryFormName = '#frmAddRecovery';
      $scope.EditRecoveryFormName = '#frmEditRecovery';         

      $scope.recoveredType = 0;

	    var counter = 0;

        $scope.arr = [{
          "id": null,
          "description": "",
          "recoveredAmount": null,
          "displayOrder": null,
          "actualAmount": null,
          "recoveryType": null,
          "createdDate": null,
          "status": true,
          "modifiedDate": null,
          "createdByName": null,
          "modifiedByName": null,
          "paidedTypeText": null,
          "recoveryTypeText": null,
          "createdBy": $rootScope.sessionConfig.userId,
          "modifiedBy": $rootScope.sessionConfig.userId,
          "recoveryId": null,
          "paidedType": null,
          checked : false
        }];

        $scope.addItem = function(){
          $scope.arr.push({
            "id": null,
            "description": "",
            "recoveredAmount": null,
            "displayOrder": null,
            "actualAmount": null,
            "recoveryType": null,
            "createdDate": null,
            "status": true,
            "modifiedDate": null,
            "createdByName": null,
            "modifiedByName": null,
            "paidedTypeText": null,
            "recoveryTypeText": null,
            "createdBy": $rootScope.sessionConfig.userId,
            "modifiedBy": $rootScope.sessionConfig.userId,
            "recoveryId": null,
            "paidedType": null,
            checked : false
          });
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

        $scope.CloseRecoveryWindow  = function(){
            $scope.AddRecoveryWindow.close();
            $scope.doReset();
            $scope.addjQueryValidator.doReset();
        }

        $scope.OpenEditRecoveryWindow = function(){
            $scope.EditRecoveryWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");          
            $scope.editAuditWindow.center().open();
        }

        $scope.CloseEditRecoverytWindow = function(){
            $scope.EditRecoveryWindow.close();
            $scope.doReset();
            $scope.editjQueryValidator.doReset();            
        }

        $scope.doReset = function(){
          //$scope.sgm = angular.copy($scope.defaultOptions);
          //$scope.editsgm =  angular.copy($scope.defaultOptions);
        }

        $scope.Submit = function(){
          if($scope.addjQueryValidator.doValidate()){debugger;
            var list = angular.copy($scope.arr);
            var model = angular.copy($scope.defaultOptions);

            angular.forEach(list,function(item,key){     
              item.paidedType = false;         
              if(item.checked)
                  item.recoveryType = $scope.recoveredType;
              else
                item.recoveryType =  !$scope.recoveredType;

              if(item.actualAmount === item.recoveredAmount)
                item.paidedType = true;
            });

            model.settledParasGsCount = model.parasCount = 0;
            angular.forEach(list,function(item,key){       
              if(item.checked && (parseFloat(item.actualAmount||0) === parseFloat(item.recoveredAmount||0))){
                model.recoveredAmount =  parseFloat(model.recoveredAmount||0) + parseFloat(item.recoveredAmount||0);
                model.settledParasGsAmount = parseFloat(model.settledParasGsAmount||0) + parseFloat(item.actualAmount||0);
                model.settledParasGsCount++;

                model.setteledParasAmount =  parseFloat(model.setteledParasAmount) + parseFloat(item.recoveredAmount||0);
                model.setteledParasCount++;

              }
              if(item.checked && (parseFloat(item.actualAmount||0) < parseFloat(item.recoveredAmount||0))){
                model.recoveredAmount = parseFloat(model.recoveredAmount) + parseFloat(item.recoveredAmount||0);
                model.settledParasGsAmount += parseFloat(item.actualAmount);
                model.settledParasGsCount++;
              }
              else{
                model.pendingParasAmount = parseFloat(model.pendingParasAmount||0) + Math.abs( parseFloat(item.actualAmount||0) - parseFloat(item.recoveredAmount||0));
                model.pendingParasCount++;
              }
              model.parasAmount = parseFloat(model.parasAmount||0) + parseFloat(item.actualAmount||0);
              model.parasCount++;
            });
            model.auditId = $scope.recovery.auditId;
            var deffered = recoveryfactory.doSubmitData(model);
            deffered.success(function(r){
              debugger;
              var promise = recoveryfactory.CreateDetailedRecoverData(list);
              promise.success(function(r){
                if(r!=null){
                  if(!r.status){
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
                       $scope.grid.dataSource.fetch();
                       $scope.CloseAuditWindow();
                     }else{
                        notify({
                              messageTemplate: '<span>Unable to add detailed Recovery!!</span>',
                              position: $rootScope.appConfig.notifyConfig.position,
                              scope:$scope
                        });
                     }
                  }).error(function(error,status){
                       notify({
                               messageTemplate: '<span>Unable to process your request!</span>',
                               position: $rootScope.appConfig.notifyConfig.position,
                               scope:$scope
                        });                 
                  });
                  }else{
                    notify({
                         messageTemplate: '<span>'+r.data+'!</span>',
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

		 
        $scope.defaultOptions = {
          "id": null,
          "status": true,
          "auditDistrictId": null,
          "roundId": null,
          "auditId": null,
          "createdBy": $rootScope.sessionConfig.userId,
          "modifiedBy": $rootScope.sessionConfig.userId,
          "blockId": null,
          "blockName": "",
          "isActive": true,
          "parasCount": 0,
          "pendingParasCount": 0,
          "parasAmount": 0,
          "settledParasGsCount": 0,
          "setteledParasAmount": 0,
          "recoveredAmount": 0,
          "setteledParasCount": 0,
          "pendingParasAmount": 0,
          "createdDate": null,
          "roundName": "",
          "vpName": "",
          "vpId": null,
          "modifiedDate": null,
          "createdByName": "",
          "modifiedByName": "",
          "financialDescription": "",
          "financialYear": "",
          "roundDescription": null,
          "districtName": "",
          "roundStartDate": "",
          "roundEndDate": "",
          "settledParasGsAmount": 0
        };

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
                    { field: "settledParasGsCount",headerTemplate: "No", title : "Paras setteled in GS No",width: '130px', groupable:false  },
                    { field: "settledParasGsAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Paras setteled in GS Amount",width: '130px', groupable:false },
                  ]
                },
                { field: "recoveredAmount", title : "Amount Recovered In GS ", groupable:false,width: '130px'  },
                {
                  title : "Paras Setteled So Far",
                  columns :[
                    { field: "setteledParasCount",headerTemplate: "No", title : "Settled Paras No",width: '130px', groupable:false  },
                    { field: "setteledParasAmount",format: '{0:n0}', headerTemplate : "Amount", title : "Settled Paras Amount",width: '130px', groupable:false },
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
          }
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
		
	}]);

app.factory('recoveryfactory',function($http,$q,$rootScope){

  var service = {};
  var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
  var createbankUrl = '/recovery/create';

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