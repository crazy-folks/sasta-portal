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

	    var counter = 0;

        $scope.arr = [{
            id : counter,
            check:'',             
            actualAmount: '',
            paidedAmount: '',
            description: '',
            ammountSetteled: ''          
        }];

        $scope.addItem = function(){
          $scope.arr.push({
             id : counter,
            check:'',             
            actualAmount: '',
            paidedAmount: '',
            description: '',
            ammountSetteled: ''           
          });
        }

         $scope.addFormField = function ($event) {
            counter++;
            $scope.questionelemnt.push({
                 id: counter, 
                 check:'',        
                 actualAmount: '',
                 payPayment: '',
                 description: '', 
                 ammountSetteled:'',      
                 inline: true
            });
            $event.preventDefault();
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



		 
        $scope.defaultOptions = {
          "id": null,
          "status": true,
          "auditDistrictId": null,
          "roundId": null,
          "createdBy": null,
          "auditId": null,
          "modifiedBy": null,
          "blockId": null,
          "blockName": "",
          "isActive": true,
          "parasCount": null,
          "pendingParasCount": null,
          "parasAmount": null,
          "settledParasGsCount": null,
          "setteledParasAmount": null,
          "recoveredAmount": null,
          "setteledParasCount": null,
          "pendingParasAmount": null,
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
          "settledParasGsAmount": null
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