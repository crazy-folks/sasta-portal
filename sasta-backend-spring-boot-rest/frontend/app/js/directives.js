/**
 * SASTABOARD - Responsive Admin Theme
 * Copyright 2015 SASTA. http://www.tnsasta.com
 *
 * TABLE OF CONTENTS
 * Use @ along with function name to search for the directive.
 *
 *  @pageTitle - Page Title Directive for page title name
 *  @widgetToggle - Directive to toggle widgets
 *  @widgetClose - Directive to close widget
 *  @toggleLeftSidebar - Left Sidebar Directive to toggle sidebar navigation
 *  @toggleProfile - Show/Hide Profile View
 *  @toggleRightSidebar - Right Sidebar Directive to toggle sidebar navigation
 *  @navToggleSub - Directive to toggle sub-menu down
 */

 /*
 * @pageTitle - Page Title Directive for page title name
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = 'SASTA-The Social Audit Society of Tamil Nadu';
                if (toState.data && toState.data.pageTitle) title = 'SASTA | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};


function circleSlider($rootScope){
    return {
        link : function(scope,element){
            $(element).tinycircleslider({
                dotsSnap : true,   
                radius   : 170,   
                dotsHide : false,
                interval : true
            });           
        }
    }
};

function boxSlider ($rootScope){
    return {
        link :function(scope,element){
            setTimeout(function() {
                $(element).find('.testimonials-slider').bxSlider({
                    slideWidth: 800,
                    minSlides: 1,
                    maxSlides: 1,
                    slideMargin: 32,
                    auto: true,
                    autoControls: true
                });
            }, 2000);
        }
    }
}

 /*
 * @scrollTop - Scroll to Top
 */
function scrollTop($rootScope){
    return {
        link : function(scope,element){
            $(element).on('click',function(){
                jQuery('html, body').animate({scrollTop:0}, 'slow');                
            })
        }
    }
};

 /*
 * @stickyHeader - Scroll Header
 */
function stickyHeader($rootScope){
    return {
        link : function(scope,element){
            $(window).scroll(function() {
                  if ($(this).scrollTop() > 50){  
                    $(element).addClass("sticky");
                  }
                  else{
                    $(element).removeClass("sticky");
                  }
            });         
        }
    }
};


 /*
 * @topNavigation - top Navigation Directive for top navigation
 */
function topNavigation($rootScope, $timeout) {
    return {
        restrict : 'A',
        link : function(scope,element){
            element.click(function() {
               var childs = $(this).parent().find('>li').removeClass();
               $(this).addClass('active');
            });
        }
    };
}
 /*
 * @slidePanel - Auto Slider with some images
 */
function slidePanel($rootScope, $timeout) {
    return {
        restrict : 'A',
        link : function(scope,element){
            var options = {
                nextButton: false,
                prevButton: false,
                pagination: true,
                animateStartingFrameIn: false,
                autoPlay: true,
                autoPlayDelay: 4000,
                preloader: true,
                reverseAnimationsWhenNavigatingBackwards: false, 
        //         preloadTheseFrames: [1, 2, 3, 4],
        /*
                preloadTheseImages: [
                    "../img/Merrifield_Streetscape_View2_FINAL2_low-res(2).jpg",
                    "../img/Rosette-Parade_view02_FINAL_low-res.jpg",
                    "../img/nostra-bg.jpg",
                    "images/tn-model1.png",
                    "images/tn-model2.png",
                    "images/tn-model3.png"
                ]
        */
            };
            
            var sequence = $(element).sequence(options).data("sequence");
        //     sequence.stopAutoPlay();
        //    sequence.pause();
        //     mySequence.pause();
               sequence.beforeCurrentFrameAnimatesOut = function() {
                   
                    //add code to execute here, such as:
        //             alert("Do something before the CURRENT frame animates out");
                };

                sequence.beforeNextFrameAnimatesIn = function(){
                    //add code to execute here, such as:
        //             alert("Do something before the NEXT frame animates in");
                };
        }
    };
}


/**
 * @widgetToggle - Directive to toggle widget
 */
function widgetToggle() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                $(this).parent().parent().next().slideToggle("fast"), $(this).toggleClass("fa-chevron-down fa-chevron-up")
            });
        }
    }
};

/**
 * @widgetToggle - Directive to toggle widget
 */
function cardFlip() {
    return {
        restrict: 'A',
        link: function(scope, element) {             
            $(element).find('.back-button').on('click',function(e){
                var $card = $(this).closest('.card-container');
                console.log($card);
                if($card.hasClass('hover')){
                    $card.removeClass('hover');
                } else {
                    $card.addClass('hover');
                }
            });           
        }
    }
};

/**
 * @widgetClose - Directive to close widget
 */
function widgetClose() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                $(this).parent().parent().parent().fadeOut()
            });
        }
    }
};

/*
 * @toggleLeftSidebar - Left Sidebar Directive to toggle sidebar navigation
 */
function toggleLeftSidebar() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleLeft()" class="sidebar-toggle" id="toggle-left"><i class="fa fa-bars"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleLeft = function() {
                ($(window).width() > 767) ? $('#main-wrapper').toggleClass('sidebar-mini'): $('#main-wrapper').toggleClass('sidebar-opened');
            }
        }
    };
}

/*
 * @toggleProfile - Show/Hide Profile View
 */
function toggleProfile() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleProfile()" type="button" class="btn btn-default" id="toggle-profile"><i class="icon-user"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleProfile = function() {
                $('.sidebar-profile').slideToggle();
            }
        }
    };
};

/*
 * @toggleRightSidebar - Right Sidebar Directive to toggle sidebar navigation
 */
function toggleRightSidebar() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleRight()" class="sidebar-toggle" id="toggle-right"><i class="fa fa-indent"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleRight = function() {
                $('#sidebar-right').toggleClass("sidebar-right-open");
                $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");
            }
        }
    };
};

/**
 * @navToggleSub - Directive to toggle sub-menu down
 */
function navToggleSub() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.navgoco({
                caretHtml: false,
                accordion: true
            })
        }
    };
};

/**
 * @fullscreenWidget - Directive for fullscreen widgets
 */

function fullscreenWidget() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                var panel = $(this).closest('.panel');
                panel.toggleClass('widget-fullscreen');
                $(this).toggleClass('fa-expand fa-compress');
                $('body').toggleClass('fullscreen-widget-active')

            });
        }
    }
};

/**
 * @sliders - Directive to run bootstrap sliders
 */
function slider() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.slider();
        }
    }
};

/**
 * @gaugejs - Directive for the gauge graph
 */
function gauge() {
    return {
        restrict: 'AC',
        scope: {
            'animationTime': '=',
            'value': '=',
            'options': '=',
            'maxValue': '=',
            'gaugeType': '='
        },
        controller: function($scope, $element) {
            if ($scope.gaugeType === 'donut') {
                $scope.gauge = new Donut($element[0]);
            } else {
                $scope.gauge = new Gauge($element[0]);
            }
            $scope.gauge.maxValue = $scope.maxValue;
            $scope.$watchCollection('[options, value]', function(newValues) {
                $scope.gauge.setOptions(newValues[0]);
                if (!isNaN(newValues[1])) {
                    $scope.gauge.set(newValues[1]);
                }
            });
        },
    }
};


/**
 * @css3animate - css3 animations
 */
function css3animate() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                var animate = $(this).attr("data-animated");
                $(this).closest('.panel').addClass(animate).delay(1000).queue(function(next) {
                    $(this).removeClass(animate);
                    next();
                })
            })
        }
    }

};


/**
 * @mapUsa - Directive for vector map
 */
function mapUsa() {
    return {

        restrict: 'A',
        link: function(scope, element, attrs) {
            element.vectorMap({
                map: 'us_aea_en',
                backgroundColor: 'transparent',
                zoomButtons: true,
                regionStyle: {
                    initial: {
                        fill: '#909AA0'
                    },
                    hover: {
                        fill: '#1D212A'
                    }
                },
                onRegionClick: function(event, code) {

                },
                markerStyle: {
                    initial: {
                        fill: '#27B6AF',
                        stroke: '#27B6AF',
                    }
                },
                markers: [{
                    latLng: [37.78, -122.41],
                    name: 'San Francisco',
                    style: {
                        r: 10
                    }
                }, {
                    latLng: [40.71, -74],
                    name: 'New York City',
                    style: {
                        r: 15
                    }
                }, {
                    latLng: [41.89, -87.62],
                    name: 'Chicago',
                    style: {
                        r: 5
                    }
                }, {
                    latLng: [34.00, -118.25],
                    name: 'Los Angeles',
                    style: {
                        r: 20
                    }
                }, {
                    latLng: [34.00, -106.00],
                    name: 'New Mexico',
                    style: {
                        r: 10
                    }
                }, {
                    latLng: [44.50, -100.00],
                    name: 'South Dakota',
                    style: {
                        r: 13
                    }
                }, {
                    latLng: [25.78, -80.22],
                    name: 'Miami',
                    style: {
                        r: 7
                    }
                }, ]
            });

        }

    }

};

/**
 * @iCheck - Directive for custom checkboxes
 */
function ichecks($timeout, $parse) {
    return {
        link: function(scope, element, attrs) {
            return $timeout(function() {
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_flat-grey',
                    radioClass: 'iradio_flat-grey',
                    increaseArea: '20%'
                });
            });
        }
    };
};

/**
 * @skycon - Directive for skycons
 */
function skycon() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var skycons = new Skycons({
                'color': (attrs.color || '#27B6AF')
            });
            element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');
            skycons.add(element.children()[0], attrs.skycon);
            skycons.play()
        }
    }
};

/**
 * Directive for the calendar widget
 */

(function() {
    var TienClndrDirective, module;

    module = angular.module('tien.clndr', []);

    TienClndrDirective = function() {
        var controller, scope;
        scope = {
            clndr: '=tienClndrObject',
            events: '=tienClndrEvents',
            options: '=?tienClndrOptions'
        };
        controller = function($scope, $element, $attrs, $transclude) {
            return $transclude(function(clone, scope) {
                var options, render;
                $element.append(clone);
                $scope.$watch('events', function(val) {
                    if (val != null ? val.length : void 0) {
                        return $scope.clndr.setEvents(angular.copy(val));
                    }
                });
                render = function(data) {
                    return angular.extend(scope, data);
                };
                options = angular.extend($scope.options || {}, {
                    render: render
                });
                return $scope.clndr = angular.element("<div/>").clndr(options);
            });
        };
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: scope,
            controller: controller
        };
    };

    module.directive('tienClndr', TienClndrDirective);

}).call(this);

/**
 * dropZone - Directive for multifile uploader
 */
function dropZone() {
    return function(scope, element, attrs) {
        element.dropzone({
            url: "/upload",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5
        });
    }
}

/**
 * barchart - Directive for morris/barchart
 */
function barchart() {
    function createChart(el_id, options) {
        options.element = el_id;
        var r = new Morris.Bar(options);
        return r;
    }

    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function link(scope, element, attrs) {
            return createChart(attrs.id, scope.options);
        }
    };
};

/**
 * linechart - Directive for morris/linechart
 */
function linechart() {
    function createChart(el_id, options) {
        options.element = el_id;
        var r = new Morris.Line(options);
        return r;
    }

    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            return createChart(attrs.id, scope.options)
        }
    }
};

/**
 * donutchart - Directive for morris/donutchart
 */
function donutchart() {
    function createChart(el_id, options) {
        options.element = el_id;
        var r = new Morris.Donut(options);
        return r;
    }

    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            return createChart(attrs.id, scope.options)
        }
    }
};


/**
 * sparkline - Directive for sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function(scope, element, attrs) {
            scope.$watch(scope.sparkData, function() {
                render();
            });
            scope.$watch(scope.sparkOptions, function() {
                render();
            });
            var render = function() {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};



/**
 * @fullscreenMode - Directive for fullscreen browsers
 */

function fullscreenMode() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleFullscreen()" type="button" class="btn btn-default expand" id="toggle-fullscreen"><i class="fa fa-expand"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleFullscreen = function() {
                $(document).toggleFullScreen()
                $('#toggle-fullscreen .fa').toggleClass('fa-expand fa-compress');
            }
        }
    };
};

/**
 * @toggleSettings - Directive to toggle settings widgets for DEMO
 */
function toggleSettings() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                if ($(this).hasClass('open')) {
                    $('#config').animate({
                        "right": "-205px"
                    }, 150);
                    $(this).removeClass('open').addClass('closed');
                } else {
                    $("#config").animate({
                        "right": "0px"
                    }, 150);
                    $(this).removeClass('closed').addClass('open');
                }
            });
        }
    }
};

/**
 * @switchTheme - Directive to switch theme colors for DEMO
 */
function switchTheme() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.click(function() {
                $('#main-wrapper').attr('class', '');
                var themeValue = $(this).data('theme');
                $('#main-wrapper').addClass(themeValue);
            });
        }
    }
};

function noCache($window){
  return {
    priority: 99,
    link: function(scope, element, attrs) {
      attrs.$observe('noCacheSrc', function(noCacheSrc) {
        noCacheSrc = noCacheSrc || '';
        if(noCacheSrc!=''){
            if(!(noCacheSrc.indexOf('data:image/png;base64')>-1)){
                noCacheSrc += '?' + (new Date()).getTime();
            }
            attrs.$set('src', noCacheSrc); 
        }
      });
    }
  }    
}


function slidToggle(){
    return {
        restrict:'A',
        compile: function(scope, elem, attrs) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
}

function toggle(){
     return function(scope, elem, attrs) {
        scope.$on('event:toggle', function() {
            elem.slideToggle();
        });
    };   
}

/*
 * Pass functions to module
 */
angular
    .module('sastaboard')
    .directive('noCacheSrc', noCache)
    .directive('pageTitle', pageTitle)
    .directive('topNavigation',topNavigation)
    .directive('slidePanel',slidePanel)
    .directive('widgetToggle', widgetToggle)
    .directive('widgetClose', widgetClose)
    .directive('toggleLeftSidebar', toggleLeftSidebar)
    .directive('toggleProfile', toggleProfile)
    .directive('toggleRightSidebar', toggleRightSidebar)
    .directive('navToggleSub', navToggleSub)
    .directive('navToggleSub', navToggleSub)
    .directive('slider', slider)
    .directive('gauge', gauge)
    .directive('css3animate', css3animate)
    .directive('mapUsa', mapUsa)
    .directive('ichecks', ichecks)
    .directive('skycon', skycon)
    .directive('dropZone', dropZone)
    .directive('barchart', barchart)
    .directive('linechart', linechart)
    .directive('donutchart', donutchart)
    .directive('sparkline', sparkline)
    .directive('fullscreenMode', fullscreenMode)
    .directive('fullscreenWidget', fullscreenWidget)
    .directive('toggleSettings', toggleSettings)
    .directive('switchTheme', switchTheme)
    .directive('cardFlip', cardFlip)
    .directive('toggle',toggle)
    .directive('circleSlider',circleSlider)
    .directive('scrollTop',scrollTop)
    .directive('stickyHeader',stickyHeader)
    .directive('boxSlider',boxSlider)

/**
 * NSF - Responsive Admin Theme
 * Copyright 2019 NSF.  
 *
 * TABLE OF CONTENTS
 * Use @ along with function name to search for the filters.
 *
 *  @ellipsis - ellipsis filter for truncate string with ellipsis
 *                - @Param text
 *               - @Param length, default is based on app settings
 *               - @Param end, default is "..."
 *               - @return string                
 *
 */

function ellipsis() {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;
        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }

    };
}

angular.module('sastaboard').
    filter('ellipsis', ellipsis);