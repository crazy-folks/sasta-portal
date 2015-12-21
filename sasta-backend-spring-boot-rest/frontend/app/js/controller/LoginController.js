app.controller('LoginController',['$window','signinFactory','$scope','$rootScope','notify','$location','$state','storage',
	function($window,signinFactory,$scope,$rootScope,notify,$location, $state,storage){
	$scope.vm = {
		userName : '',
		password : ''
	};
	$scope.signinFactory = signinFactory;
	$scope.state =  $state;
	function ValidateForm(){
		
		var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

		if(!$scope.vm.userName){
		  		notify({
		            messageTemplate: '<span>Email id should not be empty!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });			
			return false;
		}

		if(!EMAIL_REGEXP.test($scope.vm.userName)){
	  		notify({
	            messageTemplate: '<span>Invalid Email!!!</span>',
	            position: $rootScope.appConfig.notifyConfig.position,
	            scope:$scope
	        });	
	        return false;			
		}

		if(!$scope.vm.password){
		  		notify({
		            messageTemplate: '<span>Password should not be empty!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
		        });				
			return false;
		}
		return true;	
	}

	$scope.OnClick = function(){
		console.log("User Name :",$scope.vm.userName);
		console.log("Password :",$scope.vm.password);
		if(ValidateForm()){
			$scope.$emit("LOAD");
			var responseText = $scope.signinFactory.doSignIn($scope.vm.userName,$scope.vm.password);
			responseText.success(function(result){
				if(result.status){
					storage.memorize(null);
					storage.memorize(result.data);
					console.log($window.location.host);
					$rootScope.sessionConfig = result.data;
        			$scope.sessionConfig = result.data;
					$scope.$emit("UNLOAD");
					$scope.state.go('admin.home'); 
				}else{
					var messageTemplate = '<span>'+result.data+'</span>';
			  		notify({
			            messageTemplate: messageTemplate,
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				}
			}).error(function(error,status){
				
			});
	  	}
	};
}]);


app.factory('signinFactory',function($http,$q,$rootScope){

	var service = {};
	var signInUrl = '/user/signin';
	var _finalUrl = '';

	function makeUrl(userName,password){
		_finalUrl = $rootScope.appConfig.baseUrl+signInUrl;
	}

	service.doSignIn = function(userName,password){
		makeUrl(userName,password);
	     return $http({
	         method: 'GET',
	         url: _finalUrl,
			 params: { email: userName ,password : password }
	     });
	}

	return service;

});