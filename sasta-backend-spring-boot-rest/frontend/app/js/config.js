 function config($locationProvider,$stateProvider, $urlRouterProvider,$httpProvider) {
    
    $httpProvider.defaults.cache = true;
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
            },
            controller : 'DasboardController as dashboardCtl'
        })
        .state('admin.banks', {
            url: "/banks",
            templateUrl: "admin/banks/templates.html",
            data: {
                pageTitle: 'Banks'
            },
            controller : 'BankController as bankCtl'
        })
        .state('admin.blocks', {
            url: "/blocks",
            templateUrl: "admin/blocks/templates.html",
            data: {
                pageTitle: 'Blocks'
            },
            controller : 'AuditBlocksController as blockCtl'
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
        .state('admin.entitygroups', {
            url: "/usergroups",
            templateUrl: "admin/entitygroups/templates.html",
            data: {
                pageTitle: 'User Groups'
            },
            controller : 'EntityGroupsController as egCtl'
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
        .state('admin.rounds', {
            url: "/rounds",
            templateUrl: "admin/rounds/templates.html",
            data: {
                pageTitle: 'Rounds'
            },
            controller : 'RoundsController as stCtl'
        })
        .state('admin.villagepanchayats', {
            url: "/panchayats",
            templateUrl: "admin/village/templates.html",
            data: {
                pageTitle: 'Village Panchayats'
            },
            controller : 'VillagePanchayatController as vpCtl'
        })
       .state('admin.profile', {
            url: "/profile",
            templateUrl: "admin/profile/profile.html",
            data: {
                pageTitle: 'Profile Information'
            },
            controller : 'ProfileController as ProfileCtl'
        })
        .state('entries', {
            abstract: true,
            url: "/entries",
            templateUrl: "admin/adminlayout.html",
            data: {
                pageTitle: 'Home'
            }
        })
        .state('entries.audit', {
            url: "/audit",
            templateUrl: "admin/audit/templates.html",
            data: {
                pageTitle: 'Audit Entries'
            },
            controller : 'AuditController as AuditCtl'
        })   
        .state('entries.expenditure', {
            url: "/expenditure?aid",
            templateUrl: "admin/expenditure/templates.html",
            data: {
                pageTitle: 'Audit expenditure'
            },
            controller : 'ExpenditureController as ExpenCtl',
            params: {aid: null}
        })  
        .state('entries.misappropriation', {
            url: "/misappropriation?aid",
            templateUrl: "admin/misappropriation/templates.html",
            data: {
                pageTitle: 'Audit Misappropriation'
            },
            controller : 'MisappropriationController as MisCtl',
            params: {aid: null}
        })  
        .state('entries.vrp', {
            url: "/vrp?aid",
            templateUrl: "admin/vrp/templates.html",
            data: {
                pageTitle: 'Audit VRP'
            },
            controller : 'VrpController as VrpCtl',
            params: {aid: null}
        })  
        .state('entries.deviation', {
            url: "/deviation?aid",
            templateUrl: "admin/deviation/templates.html",
            data: {
                pageTitle: 'Audit Deviation'
            },
            controller : 'DeviationController as DevCtl',
            params: {aid: null}
        })  
        .state('entries.grievance', {
            url: "/grievance?aid",
            templateUrl: "admin/grievance/templates.html",
            data: {
                pageTitle: 'Audit Grievance'
            },
            controller : 'GrievanceController as GriCtl',
            params: {aid: null}
        })       
        .state('entries.mgnrega', {
            url: "/mgnrega?aid",
            templateUrl: "admin/mgnrega/templates.html",
            data: {
                pageTitle: 'Audit MGNREGA'
            },
            controller : 'MgnregaController as MgnCtl',
            params: {aid: null}
        })  
        .state('entries.hlcommittee', {
            url: "/hlcommitte?aid",
            templateUrl: "admin/hlcommittee/templates.html",
            data: {
                pageTitle: 'Audit High Level Committee'
            },
            controller : 'HLCommitteeController as HlcCtl',
            params: {aid: null}
        })
        .state('entries.sgm', {
            url: "/sgm?aid",
            templateUrl: "admin/sgm/templates.html",
            data: {
                pageTitle: 'Audit Special Gram Shaba'
            },
            controller : 'SgmController as SgmCtl',
            params: {aid: null}
        })
        .state('users', {
            abstract: true,
            url: "/users",
            templateUrl: "admin/adminlayout.html",
            data: {
                pageTitle: 'Home'
            }
        })
       .state('users.addusers', {
            url: "/addusers",
            templateUrl: "admin/users/add.html",
            data: {
                pageTitle: 'Add User'
            },
            controller : 'UsersController as userCtl'
        })
        .state('users.search', {
            url: "/search",
            templateUrl: "admin/search/templates.html",
            data: {
                pageTitle: 'User Search'
            },
            controller : 'SearchController as SearchCtl'
        })
        .state('reports', {
            abstract: true,
            url: "/reports",
            templateUrl: "admin/adminlayout.html",
            data: {
                pageTitle: 'Home'
            }
        })
        .state('reports.expenditurereports', {
            url: "/expenditurereports",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'Audit Expenditure Reports'
            },
            controller : 'ExpenditureReportController as expRptCtl'
        })
        .state('reports.grievancesreports', {
            url: "/grievancesreports",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'Audit Grievances Reports'
            },
            controller : 'GrievanceReportController as grvRptCtl'
        })
        .state('reports.deviationsreports', {
            url: "/deviationsreports",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'Deviations Reports'
            },
            controller : 'DeviationReportController as devRptCtl'
        })
        .state('reports.misappropriationsreports', {
            url: "/misappropriationsreports",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'Mis-Appropriations Reports'
            },
            controller : 'MisAppropriationReportController as misRptCtl'
        })
        .state('reports.specialgramasabhareports', {
            url: "/specialgramasabhareports",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'Special Grama Sabha Reports'
            },
            controller : 'SpgReportController as spgRptCtl'
        })
        .state('reports.mgnregaworks', {
            url: "/mgnregaworks",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'MGNREGA works Reports'
            },
            controller : 'mgnregaReportController as mgnRptCtl'
        })
        .state('reports.vrpdetails', {
            url: "/vrpdetails",
            templateUrl: "admin/reports/reports.html",
            data: {
                pageTitle: 'VRP Details Reports'
            },
            controller : 'VrpReportController as vrpRptCtl'
        })
         .state('entries.recovery', {
            url: "/recovery",
            templateUrl: "admin/recovery/templates.html",
            data: {
                pageTitle: 'Recovery Details'
            },
            controller : 'RecoveryController as recoveryCtl'
        })
         .state('ui.news', {
            url: "/news",
            templateUrl: "views/static/news.html",
            data: {
                pageTitle: 'News'
            },
              controller : 'NewsController as newsController'
        })
        

        
}
angular.module('sastaboard')
    .config(['$locationProvider','$stateProvider', '$urlRouterProvider','$httpProvider',config])
    .constant("appConfig", {
        appName: "SASTA-The Social Audit Society of Tamil Nadu",
        appVersion: "1.0",
        // Local Environment For Curl Ref : http://www.codingpedia.org/ama/how-to-test-a-rest-api-from-command-line-with-curl/
         //baseUrl: "http://localhost:8080/sasta-backend/api",
        baseUrl: "http://192.168.1.37:8080/sasta-backend/api",
       // baseUrl: " http://www.tnsasta.com/sasta-backend/api",
       
        debug : true,
        environment : 'development',
        notifyConfig : {
            duration : 10000, // references : http://cgross.github.io/angular-notify/demo/
            position : "right" // ['center', 'left', 'right']
        },
        adminPrefixUrl : 'admin.',
        authenticated : false,
        lookupTypes : {
            Blocks : 1,
            Districts : 2,
            States : 3,
            Bank : 4,
            BloodGroups : 5,
            Communities : 6,
            Countries : 7,
            Departments : 8 ,
            FinancialYear : 9,
            Grades : 10,
            ImageTypes : 11,
            Qualifications : 12,
            Rounds : 13,
            VillagePanchayats : 14 ,
            Users : 15 ,
            UserGroups : 16,
            DistrictsVillagePanchayats : 17,
            None : 18           
        },
        adminLevelGroups : [1,2,3,6,7],
        blockLevelGroups :[5],
        districtLevelGroups :[4]
    })
    .value("sessionConfig", {})
    .run(['$rootScope', '$state','$templateCache','appConfig','sessionConfig','authfactory','storage','notify',
        function($rootScope, $state,$templateCache,appConfig,sessionConfig,authfactory,storage,notify) {

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

      $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
        if($rootScope.appConfig.authenticated){
            var session  = storage.recall();
            if($state.includes('admin') || (next.name.indexOf($rootScope.appConfig.adminPrefixUrl)>-1)){
                var expire = kendo.parseDate(kendo.toString(session.expiredDate, "yyyy/MM/dd hh:mm:ss tt")); //new Date(session.expiredDate);
                var now = new Date();
                if( expire > now){
                    authfactory.doUpdateSession(session.sessionId).
                    done(function(result){
                        if(result.status){
                            storage.memorize(result.data)
                        }
                    });
                }else{
                    notify({
                        messageTemplate: '<span>session timed out!.</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$rootScope
                    });
                    event.preventDefault();
                    // $rootScope.$state.go('ui.index'); Which is not working well so we have to go with 
                    // Below method
                    $rootScope.$state.transitionTo('ui.index');
                }
            }            
        }
      });

    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        $rootScope.$emit('UNLOAD');
    });

}]);

app.factory('noCacheInterceptor', function () {
    return {
        request: function (config) {
            console.log(config.method);
            console.log(config.url);
            if(config.method=='GET'){
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                config.url = config.url+separator+'noCache=' + new Date().getTime();
            }
            console.log(config.method);
            console.log(config.url);
            return config;
       }
   };
});