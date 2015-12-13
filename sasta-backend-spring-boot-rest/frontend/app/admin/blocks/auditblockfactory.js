app.factory('auditblocksfactory',function($http,$q,$rootScope){

	var service = {};
	var auditblocksurl = '/user/signin';
	var _finalUrl = '';

	function makeUrl(userName,password){
		_finalUrl = $rootScope.appConfig.baseUrl+signInUrl;
	}

	return service;

});