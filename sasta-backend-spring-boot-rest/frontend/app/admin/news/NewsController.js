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
		text : "Calender"
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

	$scope.uploadFile = function(){
		var response = newsFactory.UploadImage($scope.file,$scope.defaultTypes.value,$rootScope.sessionConfig.userId,$scope.defaultOptions.imageId);
		response.success(function(result){
			if(result.status)
				$scope.defaultOptions.imageId = result.data;
		}).error(function(error,status){
	  		notify({
	            messageTemplate: '<span>Unable to upload images!</span>',
	            position: $rootScope.appConfig.notifyConfig.position,
	            scope:$scope
	        });
        });	
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
		var response = newsFactory.AddNews($scope.defaultOptions);
		response.success(function(result){
			if(result.status){
		  		notify({
		            messageTemplate: '<span>'+result.data+'</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });				
			}
		    else
		  		notify({
		            messageTemplate: '<span>Unable to add news!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });		
		}).error(function(error,status){
	  		notify({
	            messageTemplate: '<span>Unable to add news!</span>',
	            position: $rootScope.appConfig.notifyConfig.position,
	            scope:$scope
	        });
        });	
	}

	$scope.deleteNews = function(model){
		model.status = false;
		var response = newsFactory.UpdateNews(model);
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

	if($location.search().mode === 'list')
		$scope.GetNews();

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

    service.GetNewsList = function(){      
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/news/newslist'
        });
    } 

    return service;

});