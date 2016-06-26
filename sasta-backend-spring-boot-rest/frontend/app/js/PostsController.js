app.controller('PostsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','postsFactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,postsFactory){

    	$scope.news = [];
    	$scope.viewMode = false;

		$scope.formatDateString = function (date) {
			if(!date)
				return "-";
			return kendo.toString(new Date(date), "MM ddd yyyy");
		}

		$scope.GetNews = function(){
			var response = postsFactory.GetNewsList();
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
		$scope.newsData = {};
		if($location.search().mode === 'list'){
			$scope.mode = 1;
			$scope.listMode = true;
			$scope.GetNews();
		}else if($location.search().mode === 'view'){
			$scope.mode = 2;
			$scope.viewMode = true;
			var response = postsFactory.GetNewsById($location.search().newsid);
			response.success(function(result){
				if(result.status){
			  		$scope.newsData = result.data;				
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

app.factory('postsFactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

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