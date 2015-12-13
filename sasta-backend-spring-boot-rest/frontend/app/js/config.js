 function config($locationProvider,$stateProvider, $urlRouterProvider,$httpProvider,exDialogProvider) {

    exDialogProvider.setDefaults({        
        template: 'ngExDialog/commonDialog.html', //from cache
        //template: 'ngExDialog/commonDialog_0.html', //from file
        width: '330px',
        //Below items are set within the provider. Any value set here will overwrite that in the provider.
        //closeByXButton: true,
        //closeByClickOutside: true,
        //closeByEscKey: true,
        //appendToElement: '',
        //beforeCloseCallback: '',
        //grayBackground: true,
        //cacheTemplate: true,
        //draggable: true,
        //animation: true,
        //messageTitle: 'Information',
        //messageIcon: 'info',
        //messageCloseButtonLabel: 'OK',
        //confirmTitle: 'Confirmation',
        //confirmIcon: 'question',
        //confirmActionButtonLabel: 'Yes',
        //confirmCloseButtonLabel: 'No'
    });

    $urlRouterProvider.otherwise("/ui/index");

    $stateProvider
        .state('ui', {
            abstract: true,
            url: "/ui",
            templateUrl: "views/common.html",
        })    
        .state('ui.index', {
            url: "/index",
            templateUrl: "views/static/index.html",
            data: {
                pageTitle: 'Home'
            }
        })
        .state('ui.about-us', {
            url: "/about-us",
            templateUrl: "views/static/about-us.html",
            data: {
                pageTitle: 'About-Us'
            }
        })
        .state('ui.useful-links', {
            url: "/useful-links",
            templateUrl: "views/static/useful-links.html",
            data: {
                pageTitle: 'Useful-Links'
            }
        })        
        .state('ui.careers', {
            url: "/careers",
            templateUrl: "views/static/careers.html",
            data: {
                pageTitle: 'Careers'
            }
        })
        .state('ui.contact-us', {
            url: "/contact-us",
            templateUrl: "views/static/contact-us.html",
            data: {
                pageTitle: 'Contact-Us'
            }
        })
        .state('admin', {
            abstract: true,
            url: "/admin",
            templateUrl: "admin/adminlayout.html",
            data: {
                pageTitle: 'Home'
            }
        })        
        .state('admin.home', {
            url: "/home",
            templateUrl: "admin/views/index.html",
            data: {
                pageTitle: 'Home'
            }
        })
        .state('admin.banks', {
            url: "/banks",
            templateUrl: "admin/banks/templates.html",
            data: {
                pageTitle: 'Banks'
            },
            controller : 'BankController as bankCtl'
        })
        .state('admin.bloodgroups', {
            url: "/bloodgroups",
            templateUrl: "admin/bloodgroups/templates.html",
            data: {
                pageTitle: 'Blood Groups'
            },
            controller : 'BloodGroupsController as bgCtl'
        })
        .state('admin.communities', {
            url: "/communities",
            templateUrl: "admin/communities/templates.html",
            data: {
                pageTitle: 'Communities'
            },
            controller : 'CommunitiesController as cmCtl'
        }) 
        .state('admin.configsystem', {
            url: "/configsystem",
            templateUrl: "admin/configsystem/templates.html",
            data: {
                pageTitle: 'Config System'
            },
            controller : 'ConfigSystemController as cfCtl'
        })
        .state('admin.countries', {
            url: "/countries",
            templateUrl: "admin/countries/templates.html",
            data: {
                pageTitle: 'Countries'
            },
            controller : 'CountriesController as conCtl'
        }) 
        .state('admin.departments', {
            url: "/departments",
            templateUrl: "admin/departments/templates.html",
            data: {
                pageTitle: 'Departments'
            },
            controller : 'DepartmentsController as depCtl'
        }) 
        .state('admin.districts', {
            url: "/districts",
            templateUrl: "admin/districts/templates.html",
            data: {
                pageTitle: 'Districts'
            },
            controller : 'DistrictsController as distCtl'
        })
        .state('admin.financialyears', {
            url: "/financialyears",
            templateUrl: "admin/financialyear/templates.html",
            data: {
                pageTitle: 'Financial Years'
            },
            controller : 'FinancialYearController as finCtl'
        })
        .state('admin.qualifications', {
            url: "/qualifications",
            templateUrl: "admin/qualifications/templates.html",
            data: {
                pageTitle: 'Qualifications'
            },
            controller : 'QualificationsController as finCtl'
        })
        .state('admin.states', {
            url: "/states",
            templateUrl: "admin/states/templates.html",
            data: {
                pageTitle: 'States'
            },
            controller : 'StatesController as stCtl'
        })         
    /*$locationProvider.html5Mode({
      enabled: true
    });*/
}
angular.module('sastaboard')
    .config(['$locationProvider','$stateProvider', '$urlRouterProvider','$httpProvider','exDialogProvider',config])
    .constant("appConfig", {
        appName: "SASTA-The Social Audit Society of Tamil Nadu",
        appVersion: "1.0",
        baseUrl: "http://localhost:8080/sastabackend/api",
        debug : true,
        environment : 'development',
        notifyConfig : {
            duration : 10000, // references : http://cgross.github.io/angular-notify/demo/
            position : "right" // ['center', 'left', 'right']
        }
    })
    .value("sessionConfig", {})
    .run(['$rootScope', '$state','$templateCache','appConfig','sessionConfig',
        function($rootScope, $state,$templateCache,appConfig,sessionConfig) {

        'use strict';

        $rootScope.$state = $state;
        $rootScope.appConfig = appConfig;
        $rootScope.sessionConfig = sessionConfig;

        $templateCache.put('angular-notify.html',
        "<div class=\"cg-notify-message\" ng-class=\"[$classes, \n" +
        "    $position === 'center' ? 'cg-notify-message-center' : '',\n" +
        "    $position === 'left' ? 'cg-notify-message-left' : '',\n" +
        "    $position === 'right' ? 'cg-notify-message-right' : '']\"\n" +
        "    ng-style=\"{'margin-left': $centerMargin}\">\n" +
        "\n" +
        "    <div ng-show=\"!$messageTemplate\">\n" +
        "        {{$message}}\n" +
        "    </div>\n" +
        "\n" +
        "    <div ng-show=\"$messageTemplate\" class=\"cg-notify-message-template\">\n" +
        "        \n" +
        "    </div>\n" +
        "\n" +
        "    <button type=\"button\" class=\"cg-notify-close\" ng-click=\"$close()\">\n" +
        "        <span aria-hidden=\"true\">&times;</span>\n" +
        "        <span class=\"cg-notify-sr-only\">Close</span>\n" +
        "    </button>\n" +
        "\n" +
        "</div>"
      );

    }]);