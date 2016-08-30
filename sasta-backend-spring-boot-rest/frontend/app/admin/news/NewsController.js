app.controller('NewsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','newsFactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,newsFactory){


	  $scope.defaultOptions = {
		  "id": null,
		  "title": "",
		  "content": "",
		  "status": true,
		  "imageId": null,
		  "modifiedBy": $rootScope.sessionConfig.userId,
		  "createdBy": $rootScope.sessionConfig.userId,
		  "imageName": "",
		  "typeId": null,
		  "createdDate": null,
		  "modifiedByName": "",
		  "modifiedDate": null,
		  "createdByName": ""
		};

		$scope.types = [{
			value : 5,
			text : "News"
		},{
			value : 6,
			text : "Calendar"
		},{
			value : 7,
			text : "Circular"
		}];

		$scope.defaultTypes= {
			value : null,
			text : ""
		};

		$scope.formatDateString = function (date) {
			if(!date)
				return "-";
			return kendo.toString(new Date(date), "MM ddd yyyy");
		}

		$scope.dummyOptions = angular.copy($scope.defaultOptions);

		$scope.file = null;
		$scope.news = [];

		$scope.OnEdit = function(obj){
			$state.go('news.managenews',{newsid:obj.id,mode:'edit'});
		}

		$scope.uploadFile = function(fileObject){
			if(fileObject.files.length>0){
				var file = fileObject.files[0];
				$scope.defaultOptions.imageName = file.name;
				var ext = $(fileObject).val().split('.').pop().toLowerCase();
				 if($.inArray(ext, ['gif','png','jpg','jpeg']) > 0){
				 	$scope.defaultTypes.value = 5;
					var response = newsFactory.UploadImage(file,$scope.defaultTypes.value,$rootScope.sessionConfig.userId,$scope.defaultOptions.imageId);
					response.success(function(result){
						if(result.status){
					  		notify({
					            messageTemplate: '<span>Successfully image uploaded!</span>',
					            position: $rootScope.appConfig.notifyConfig.position,
					            scope:$scope
					        });					
							$scope.defaultOptions.imageId = result.data;
						}
					}).error(function(error,status){
				  		notify({
				            messageTemplate: '<span>Unable to upload images!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			        });
				 }else{
			  		notify({
			            messageTemplate: '<span>Image formats should be JPG, JPEG, PNG or GIF!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				 }				
			}
		}

		$scope.GetNews = function(){
			var response = newsFactory.GetNewsList();
			response.success(function(result){
				if(result.status){
			  		$scope.news = result.data;				
				}
			    else
			  		notify({
			            messageTemplate: '<span>Unable to read news!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });		
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to read news!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
	        });			
		}

		$scope.addNews = function(){

			if(!$rootScope.sessionConfig.canAdd){
				notify({
					messageTemplate: '<span>'+$rootScope.appConfig.messages.addException+'</span>',
					position: $rootScope.appConfig.notifyConfig.position,
					scope:$scope,
					type :'error'
				});
				return;
			}else{
				$scope.defaultOptions.content = ($scope.defaultOptions.content||'').replace(/<(?:.|\n)*?>/gm, '');
				var response = newsFactory.AddNews($scope.defaultOptions);
				response.success(function(result){
					if(result.status){
						notify({
							messageTemplate: '<span>'+result.data+'</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type :'success'
						});
					}
					else
						notify({
							messageTemplate: '<span>Unable to add news!</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type :'error'
						});
				}).error(function(error,status){
					notify({
						messageTemplate: '<span>Unable to add news!</span>',
						position: $rootScope.appConfig.notifyConfig.position,
						scope:$scope,
						type :'error'
					});
				});
			}
		}

		$scope.UpdateNews = function(){

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
				var response = newsFactory.UpdateNews($scope.defaultOptions);
				response.success(function(result){
					if(result.status){
						notify({
							messageTemplate: '<span>'+result.data+'</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type :'success'
						});
						$state.go("news.newslist",{mode:'list'});
					}
					else
						notify({
							messageTemplate: '<span>Unable to delete news!</span>',
							position: $rootScope.appConfig.notifyConfig.position,
							scope:$scope,
							type :'error'
						});
				}).error(function(error,status){
					notify({
						messageTemplate: '<span>Unable to delete news!</span>',
						position: $rootScope.appConfig.notifyConfig.position,
						scope:$scope,
						type :'error'
					});
				});
			}
		}

		$scope.deleteNews = function(model){
			var response = newsFactory.DeleteNews(model.id);
			response.success(function(result){
				if(result.status){
					$scope.GetNews();
			  		notify({
			            messageTemplate: '<span>'+result.data+'</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });				
				}
			    else
			  		notify({
			            messageTemplate: '<span>Unable to delete news!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });		
			}).error(function(error,status){
		  		notify({
		            messageTemplate: '<span>Unable to delete news!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });
	        });	
		}


		if($location.search().mode === 'list'){
			$scope.mode = 1;
			$scope.pageTitle = "News"
			$scope.GetNews();
		}else if($location.search().mode === 'add'){
			$scope.mode = 2;
			$scope.pageTitle = "Add News";
		}else if($location.search().mode === 'edit'){
			$scope.mode = 3;
			$scope.pageTitle = "Edit News";
			var response = newsFactory.GetNewsById($location.search().newsid);
			response.success(function(result){
				if(result.status){
			  		$scope.defaultOptions = result.data;				
				}
			    else
			  		notify({
			            messageTemplate: '<span>Unable to read news!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });		
			});			
		}
}]);


app.factory('newsFactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.UploadImage = function(image,type,createdby,uniqueId){
        var fd = new FormData();
        fd.append('file', image);
        fd.append('type', type);
        fd.append('createdby', createdby);
        fd.append('uniqueId', uniqueId||null);
        
       return $http.post(crudServiceBaseUrl+"/news/uploadFile", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }

    service.AddNews = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/news/create',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } 

    service.UpdateNews = function(model){      
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/news/update',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    service.DeleteNews = function(id){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/news/deletenews?id='+(id||''),
            cache : false
        });
    } 

    service.GetNewsById = function(id){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/news/getnewsbyid?id='+(id||''),
            cache : false
        });
    }

    service.GetNewsList = function(){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/news/newslist',
            cache : false
        });
    } 

    return service;

});