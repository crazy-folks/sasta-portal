app.controller('MessagesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','messageFactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,messageFactory){

		$scope.defaultOptions = {
		  "id": 0,
		  "title": "",
		  "content": "",
		  "status": true,
	  	  "modifiedBy": $rootScope.sessionConfig.userId,
	  	  "createdBy": $rootScope.sessionConfig.userId,
		  "isActive": true,
		  "createdDate":null,
		  "modifiedDate": null,
		  "createdByName": "",
		  "modifiedByName": ""
		};

		$scope.dummyOptions = angular.copy($scope.defaultOptions);
		$scope.messages = [];

		$scope.doReset = function(){
			$scope.defaultOptions = $scope.dummyOptions;
		}

		$scope.formatDateString = function (date) {
			if(!date)
				return "-";
			return kendo.toString(new Date(date), "MM ddd yyyy");
		}

		$scope.OnEdit = function(obj){
			$state.go('messages.managemessages',{messageid:obj.id,mode:'edit'});
		}

		$scope.deleteMessage = function(ob){
			var response = messageFactory.DeleteMessages(ob.id);
			response.success(function(result){
				if(result.status){
			  		notify({
			            messageTemplate: '<span>'+result.data+'!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
			        $scope.GetMessages();				
				}
			    else{
			  		notify({
			            messageTemplate: '<span>Unable to delete messages!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });			    	
			    }
	
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to delete messages!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
	        });	
		}

		$scope.updateMessages = function(argument) {
			if(!$rootScope.sessionConfig.canWrite){
				notify({
					messageTemplate: '<span>'+$rootScope.appConfig.messages.modifyException+'</span>',
					position: $rootScope.appConfig.notifyConfig.position,
					scope:$scope,
					type :'error'
				});
				return;
			}else{
				$scope.defaultOptions.content = ($scope.defaultOptions.content||'').replace(/<(?:.|\n)*?>/gm, '')
				var response = messageFactory.UpdateMessage($scope.defaultOptions);
				response.success(function(result){
					if(result.status){
						notify({
							messageTemplate: '<span>'+result.data+'</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type: "success"
						});
						$state.go("messages.messagelist",{mode:'list'});
					}
					else
						notify({
							messageTemplate: '<span>Unable to update messages!</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type: "error"
						});
				}).error(function(error,status){
					notify({
						messageTemplate: '<span>Unable to update messages!</span>',
						position: $rootScope.appConfig.notifyConfig.position,
						scope:$scope,
						type: "error"
					});
				});
			}
		}

		$scope.addMessages = function(){

			if(!$rootScope.sessionConfig.canAdd){
				notify({
					messageTemplate: '<span>'+$rootScope.appConfig.messages.addException+'</span>',
					position: $rootScope.appConfig.notifyConfig.position,
					scope:$scope,
					type :'error'
				});
				return;
			}else{
				$scope.defaultOptions.content = ($scope.defaultOptions.content||'').replace(/<(?:.|\n)*?>/gm, '')
				var response = messageFactory.AddMessage($scope.defaultOptions);
				response.success(function(result){
					if(result.status){
						notify({
							messageTemplate: '<span>'+result.data+'</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type : "success"
						});
						$state.go("messages.messagelist",{mode:'list'});
					}
					else
						notify({
							messageTemplate: '<span>Unable to add messages!</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type : "error"
						});
				}).error(function(error,status){
					notify({
						messageTemplate: '<span>Unable to add messages!</span>',
						position: $rootScope.appConfig.notifyConfig.position,
						scope:$scope,
						type : "error"
					});
				});
			}
		}

		$scope.GetMessages = function(){
			var response = messageFactory.GetMessagesList();
			response.success(function(result){
				if(result.status){
			  		$scope.messages = result.data;				
				}
			    else
			  		notify({
			            messageTemplate: '<span>Unable to read messages!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });		
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to read messages!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
	        });			
		}

		if($location.search().mode === 'list'){
			$scope.mode = 1;
			$scope.pageTitle = "Messages"
			$scope.GetMessages();
		}else if($location.search().mode === 'add'){
			$scope.mode = 2;
			$scope.pageTitle = "Add Messages";
		}else if($location.search().mode === 'edit'){
			$scope.mode = 3;
			$scope.pageTitle = "Edit Messages";
			var response = messageFactory.GetMessages($location.search().messageid);
			response.success(function(result){
				if(result.status){
			  		$scope.defaultOptions = result.data;				
				}
			    else
			  		notify({
			            messageTemplate: '<span>Unable to read messages!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });		
			});			
		}
}]);


app.factory('messageFactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.AddMessage = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/message/create',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } 

    service.UpdateMessage = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/message/update',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } 

    service.DeleteMessages = function(id){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/message/deletemessage?id='+(id||''),
            cache : false
        });
    } 

    service.GetMessages = function(id){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/message/getmessagebyid?id='+(id||''),
            cache : false
        });
    } 

    service.GetMessagesList = function(){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/message/getlist',
            cache : false
        });
    } 

    return service;

});