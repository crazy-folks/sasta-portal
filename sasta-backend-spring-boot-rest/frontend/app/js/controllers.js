app.controller('BaseController', ['$window','$scope','$rootScope','storage','notify','authfactory','$state',
    function($window,$scope,$rootScope,storage,notify,authfactory,$state) {
    

    $rootScope.appConfig.authenticated = false;
    $scope.sessionConfig = {};
    $scope.baseUrl = $rootScope.appConfig.baseUrl;
    var s = storage.recall();
    if( s != false ){
      if( s != null ){
        $rootScope.sessionConfig = s;
        $scope.sessionConfig = s;
        $rootScope.appConfig.authenticated = true;
      }
    }

    $scope.$on('LOAD',function(){
        $scope.loading = true;
    });

    $scope.$on('UNLOAD',function(){
        $scope.loading = false;
    });

    $scope.redirectToHome = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.index');
    }

    function setActiveLink(target){
        $(target).parent().parent().find('>li').removeClass();
        $(target).parent().addClass('active');
    }

    $scope.redirectToAboutUs = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.about-us');
    }

    $scope.redirectToUsefulLinks = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.useful-links');
    }

    $scope.redirectToCareers = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.careers');
    }

    $scope.redirectToContactUs = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.contact-us');
    }
    $scope.searchModel = {
        userName : ''
    }
    $scope.Search = function(){
        if($scope.searchModel.userName)
            $state.go('users.search',{userName: $scope.searchModel.userName})
    }


  $scope.redirectToNews = function(event){
        setActiveLink(event.target);
        $rootScope.$state.go('ui.news');
    }

    /* Sign in code start */
    $scope.vm = {
        userName : '',
        password : ''
    };

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

    $scope.logout = function(){
        var session = storage.recall();
        $rootScope.$emit("LOAD");
        authfactory.doSignOut(session.sessionId).done(function(result){
            if(result.status){
                storage.memorize([]);
                $rootScope.appConfig.authenticated = false;            
            }
            notify({
                messageTemplate: '<span>'+result.data+'</span>',
                position: $rootScope.appConfig.notifyConfig.position,
                scope:$scope
            });
            setTimeout(function(){
                $rootScope.$state.go('ui.index');
            },500);
        }).always(function(){
            $scope.$emit("UNLOAD");
        })
    };

    $scope.login = function(){
        if(ValidateForm()){
            $scope.$emit("LOAD");
            authfactory.doSignIn($scope.vm.userName,$scope.vm.password)
            .done(function(result){
                 if(result.status){
                    storage.memorize(null);
                    storage.memorize(result.data);
                    $rootScope.appConfig.authenticated = true;
                    console.log($window.location.host);
                    $rootScope.sessionConfig = result.data;
                    $scope.sessionConfig = result.data;
                    $rootScope.$state.go('admin.home'); 
                }else{
                    var messageTemplate = '<span>'+result.data+'</span>';
                    notify({
                        messageTemplate: messageTemplate,
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }               
            }).fail(function(error,status){
                // do your failiure stuff here
            }).always(function(){
                $scope.$emit("UNLOAD");
            });
        }
    };

    $scope.OpenChangePasswordWindow = function($event){
        $scope.changePasswordWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
        $scope.changePasswordWindow.center().open();
    }

    $scope.checkChangePwdjQueryValidator = null;
    $scope.ChangePasswordFormName = "#frmChangePassword";

    $scope.CloseChangePasswordWindow = function(){
        $scope.changePasswordWindow.close();
    }

    $scope.changePwdReq = {
        OldPassword : '',
        NewPassword : '',
        ConfirmPassword : '',
        UserId : $rootScope.sessionConfig.userId,
        ChangeReqBy : false
    }

    $scope.DoResetPassword = function(){
        if($scope.checkChangePwdjQueryValidator.doValidate()){
            $scope.$emit("LOAD");
            authfactory.doChangePassword($scope.changePwdReq)
            .done(function(result){
                var messageTemplate = '<span>'+result.data+'</span>';
                notify({
                    messageTemplate: messageTemplate,
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
                $scope.CloseChangePasswordWindow();          
            }).fail(function(error,status){
                // do your failiure stuff here
            }).always(function(){
                $scope.$emit("UNLOAD");
            });
        }
    };

    $scope.kchangePasswordWindowOptions = {
        content: 'admin/profile/changepassword.html',
        title: "Change Password",
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
            $($scope.ChangePasswordFormName).validationEngine('attach', {
                promptPosition: "topLeft",
                scroll: true
            });         
            $scope.checkChangePwdjQueryValidator = new Validator($scope.ChangePasswordFormName); 
        }
    };

    $scope.toggle = function() {
        $scope.$broadcast('event:toggle');
    }

}]);


app.factory('authfactory',function($http,$q,$rootScope){

    var service = {};

    service.doSignIn = function(userName,password){
         return $.ajax({
            method: 'GET',
            url: $rootScope.appConfig.baseUrl+'/user/signin',
            data : { email: userName, password : password }
         });
    }

    service.doSignOut = function(sessionid){
        return $.ajax({
            url : $rootScope.appConfig.baseUrl + '/user/signout?sessionid=' + sessionid
        });
    }

    service.doUpdateSession = function(sessionid){
        return $.ajax({
            method: 'POST',
            url : $rootScope.appConfig.baseUrl + '/user/updatesession',
            data : { "sessionid" : sessionid }
        });
    }

    service.doChangePassword = function(model){
        return $.ajax({
            method: 'GET',
            url : $rootScope.appConfig.baseUrl + '/user/resetpassword',
            data : {UserId : model.UserId,OldPassword: model.OldPassword,NewPassword:model.NewPassword,
                ChangeReqBy:model.ChangeReqBy}
        });
    }    

    return service;

});

app.factory('notify',['$timeout','$http','$compile','$templateCache','$rootScope',
    function($timeout,$http,$compile,$templateCache,$rootScope){

        var startTop = 10;
        var verticalSpacing = 15;
        var defaultDuration = 10000;
        var defaultTemplateUrl = 'angular-notify.html';
        var position = 'center';
        var container = document.body;
        var maximumOpen = 0;

        var messageElements = [];
        var openNotificationsScope = [];

        var notify = function(args){

            if (typeof args !== 'object'){
                args = {message:args};
            }

            args.duration = args.duration ? args.duration : defaultDuration;
            args.templateUrl = args.templateUrl ? args.templateUrl : defaultTemplateUrl;
            args.container = args.container ? args.container : container;
            args.classes = args.classes ? args.classes : '';

            var scope = args.scope ? args.scope.$new() : $rootScope.$new();
            scope.$position = args.position ? args.position : position;
            scope.$message = args.message;
            scope.$classes = args.classes;
            scope.$messageTemplate = args.messageTemplate;

            if (maximumOpen > 0) {
                var numToClose = (openNotificationsScope.length + 1) - maximumOpen;
                for (var i = 0; i < numToClose; i++) {
                    openNotificationsScope[i].$close();
                }
            }

            $http.get(args.templateUrl,{cache: $templateCache}).success(function(template){

                var templateElement = $compile(template)(scope);
                templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function(e){
                    if (e.propertyName === 'opacity' || e.currentTarget.style.opacity === 0 || 
                        (e.originalEvent && e.originalEvent.propertyName === 'opacity')){

                        templateElement.remove();
                        messageElements.splice(messageElements.indexOf(templateElement),1);
                        openNotificationsScope.splice(openNotificationsScope.indexOf(scope),1);
                        layoutMessages();
                    }
                });

                if (args.messageTemplate){
                    var messageTemplateElement;
                    for (var i = 0; i < templateElement.children().length; i ++){
                        if (angular.element(templateElement.children()[i]).hasClass('cg-notify-message-template')){
                            messageTemplateElement = angular.element(templateElement.children()[i]);
                            break;
                        }
                    }
                    if (messageTemplateElement){
                        messageTemplateElement.append($compile(args.messageTemplate)(scope));
                    } else {
                        throw new Error('cgNotify could not find the .cg-notify-message-template element in '+args.templateUrl+'.');
                    }
                }

                angular.element(args.container).append(templateElement);
                messageElements.push(templateElement);

                if (scope.$position === 'center'){
                    $timeout(function(){
                        scope.$centerMargin = '-' + (templateElement[0].offsetWidth /2) + 'px';
                    });
                }

                scope.$close = function(){
                    templateElement.css('opacity',0).attr('data-closing','true');
                    layoutMessages();
                };

                var layoutMessages = function(){
                    var j = 0;
                    var currentY = startTop;
                    for(var i = messageElements.length - 1; i >= 0; i --){
                        var shadowHeight = 10;
                        var element = messageElements[i];
                        var height = element[0].offsetHeight;
                        var top = currentY + height + shadowHeight;
                        if (element.attr('data-closing')){
                            top += 20;
                        } else {
                            currentY += height + verticalSpacing;
                        }
                        element.css('top',top + 'px').css('margin-top','-' + (height+shadowHeight) + 'px').css('visibility','visible');
                        j ++;
                    }
                };

                $timeout(function(){
                    layoutMessages();
                });

                if (args.duration > 0){
                    $timeout(function(){
                        scope.$close();
                    },args.duration);
                }

            }).error(function(data){
                    throw new Error('Template specified for cgNotify ('+args.templateUrl+') could not be loaded. ' + data);
            });

            var retVal = {};
            
            retVal.close = function(){
                if (scope.$close){
                    scope.$close();
                }
            };

            Object.defineProperty(retVal,'message',{
                get: function(){
                    return scope.$message;
                },
                set: function(val){
                    scope.$message = val;
                }
            });

            openNotificationsScope.push(scope);

            return retVal;

        };

        notify.config = function(args){
            startTop = !angular.isUndefined(args.startTop) ? args.startTop : startTop;
            verticalSpacing = !angular.isUndefined(args.verticalSpacing) ? args.verticalSpacing : verticalSpacing;
            defaultDuration = !angular.isUndefined(args.duration) ? args.duration : defaultDuration;
            defaultTemplateUrl = args.templateUrl ? args.templateUrl : defaultTemplateUrl;
            position = !angular.isUndefined(args.position) ? args.position : position;
            container = args.container ? args.container : container;
            maximumOpen = args.maximumOpen ? args.maximumOpen : maximumOpen;
        };

        notify.closeAll = function(){
            for(var i = messageElements.length - 1; i >= 0; i --){
                var element = messageElements[i];
                element.css('opacity',0);
            }
        };

        return notify;
    }
]);

app.factory('storage', ['$window', function($window){
    return {
      memorize: function(value){
        try{
          if( $window.Storage ){
            $window.sessionStorage.setItem( 'session', $window.JSON.stringify( value ) );
            return true;
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      },
      recall: function( ){
        try{
          if( $window.Storage ){
            return $window.JSON.parse( $window.sessionStorage.getItem( 'session' ) )
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      }
    }
  }]);


// Validator - jQuery Validation Engine
var Validator = function (NameOfForm) {
    
    this.Name = NameOfForm;
    this.doValidate = function () {
        var self = this;
        var valid = $(self.Name).validationEngine('validate');
        if (valid) {
            $(self.Name).validationEngine('validate');
        }
        return valid;
    };

    this.doReset = function(){
        $(NameOfForm).validationEngine('hideAll');
    };
};

var Util = {
    blockListProperties : [ '_events','_handlers','parent','uid'],
    escapeProperties : function(obj){
        for(var key in obj){
            if(jQuery.inArray(key,Util.blockListProperties) > -1){
                delete obj[key];
            }
        }
        return obj;
    },
    showContextMenu : function (e,grid) {
            var offset = {
              top: e.pageY,
              left: e.pageX
            },
              bottom = $(window).scrollTop() + $(window).height(),
              right = $(window).scrollLeft() + $(window).width(),
              height = $(e.target).height(),
              width = $(e.target).width(),
              targetOffset = $(grid.element).offset();
              var position ={
                top : (offset.top-targetOffset.top)-$(e.target).find("ul").height(),
                'z-index':999001,
                left : (offset.left - targetOffset.left)-130
              };

            if (position.top + height > bottom) {
              position.top -= height;
            }

            if (position.left + width > right) {
              position.left -= width;
            }         
            $(e.target).find("ul").css(position).show();
            e.preventDefault();
      }    
}