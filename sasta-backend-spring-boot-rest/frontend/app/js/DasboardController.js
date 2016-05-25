app.controller('DasboardController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','dashboardfactory','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,dashboardfactory,$q){


		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		$scope.pageTitle = "Charts";
		$scope.defaultSearchReq = {
		  "referenceId": null,
		  "roundId": null,
		  "districtId": null,
		  "blockId": null,
		  "villageId": null,
		  "isConsolidate": false,
		  "userId":null		  
		};

		$scope.reports = [{
		    "value": 1,
		    "text": "MGNREGA"
		},{
		    "value": 2,
		    "text": "Expenditure"
		},{
		    "value": 3,
		    "text": "Grama Sabha"
		},{
		    "value": 4,
		    "text": "Misappropriation"
		},{
		    "value": 5,
		    "text": "Deviation"
		},{
		    "value": 6,
		    "text": "Grievances"
		}];

		$scope.defaultdpOptions = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.chartsType = [{
		    "value": 'area',
		    "text": "Area"
		},{
		    "value": 'column',
		    "text": "Column"
		},{ // "line", column area donut 
		    "value": 'line',
		    "text": "Line"
		}];

		$scope.searchReq =  angular.copy($scope.defaultSearchReq);
		$scope.selectedFy = [];
		$scope.selectedRounds = [];
		// default selected rounds
		$scope.defaultreports = angular.copy($scope.defaultdpOptions);
		$scope.defaultchartsType = angular.copy($scope.defaultdpOptions);

        $scope.selectFyOptions = {
            placeholder: "Select Year...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
		    tagMode: "single",
            dataSource: {
                transport:{
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.FinancialYear
				      }).success(function(data, status, headers, config) {
	                  	data&&e.success(data)
	                  });	                	
	              }
	            }
            },
            change: function(){
            	$scope.multiSelectddlRounds.options.initialLoad = false;
            	$scope.multiSelectddlRounds.dataSource.read();
            }         
        };

        $scope.selectRoundOptions = {
            placeholder: "Select Round...",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoClose : false,
		    tagMode: "single",
            initialLoad : true,
            dataSource: {
                transport:{
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/lookup/getlookup?id='+$rootScope.appConfig.lookupTypes.Rounds+((($scope.selectedFy)?"&where="+$scope.selectedFy.join(','):''))
				      }).success(function(data, status, headers, config) {
				      	if(!$scope.multiSelectddlRounds.options.initialLoad)
	                  		data&&e.success(data);
	                  	else
	                  		e.success([]);
	                  });	                	
	              }
	            }
            },
            change: function(){
            	// change log
            }
        };

		$scope.OnReset = function(){
			$scope.selectedFy = [];
			$scope.selectedRounds = [];
			$scope.searchReq =  angular.copy($scope.defaultSearchReq);
			$scope.defaultchartsType = angular.copy($scope.defaultdpOptions);
		}

		function mm(val) {
			return val * 2.8347;
		}

		$scope.generatePdf = function(selector,filename){
            var extension = 'pdf';
            var timeStamp = new Date().getTime();
            !filename ?
                (filename = [timeStamp,extension].join('.')) :
                (!filename.endsWith(extension) ?
                    (filename = [filename,([timeStamp,extension].join('.'))].join('')):
                    (filename=filename.insert(filename,filename.indexOf('.'),timeStamp)));
            (selector && ($(selector).length>0)) ?
            kendo.drawing.drawDOM($(selector))
             .then(function(group) {
		          var PAGE_RECT = new kendo.geometry.Rect(
		            [0, 0], [mm(210 - 20), mm(297 - 20)]
		          );

		          var content = new kendo.drawing.Group();
		          content.append(group);

		          kendo.drawing.fit(content, PAGE_RECT)

		          return kendo.drawing.exportPDF(content,{
		            paperSize: "A4",
		            margin: "1cm"
		          });
		        }).done(function(data) {
			          kendo.saveAs({
			            dataURI: data,
			            fileName: filename,
			            proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
			          });		        	
	                //kendo.drawing.pdf.saveAs(data, filename);
	            }):logger.error('Unable to find the selector from current partial view. Please ensure that you are passing valid selector for generate pdf!');
        }

        $scope.OnClick = function(){
        	$scope.generatePdf($("#chart"),'Chart');
        }

        $scope.doSearch = function(){
			$scope.searchReq = {
			  "referenceId": (($scope.selectedFy)?$scope.selectedFy.join(','):null),
			  "roundId": (($scope.selectedRounds)?$scope.selectedRounds.join(','):null),
			  "districtId": null,
			  "blockId": null,
			  "villageId": null,
			  "isConsolidate": true,
			  "userId": null
			};
			var chartType = 'area';
			if($scope.defaultchartsType.value !== 0){
				chartType = $scope.defaultchartsType.value;
			}
			if($scope.defaultreports.value === 1){
				dashboardfactory.GetMgnregaworks($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['Completed Works Unskilled Wages','Completed Works Skilled Wages','Completed Works Material Exp','Completed Works Admin Exp',
						'Completed Works Exp. Incurred','Completed Works Value By SA','On Going Works Unskilled Wages','On Going Works Skilled Wages','On Going Works Material Exp','On Going Works Admin Exp',
						'On Going Works Exp. Incurred','On Going Works Value By SA'
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.unskilledWagesForCompletedWorks);
						series[1].data.push(obj.skilledWagesForCompletedWorks);
						series[2].data.push(obj.materialExpForCompletedWorks);
						series[3].data.push(obj.administrativeExpForCompletedWorks);
						series[4].data.push(obj.expIncurredForCompletedWorks);
						series[5].data.push(obj.valueOfCompletedWorksEvaluatedBySATeam);
						series[6].data.push(obj.unSkilledWagesForOnGoingWorks);
						series[7].data.push(obj.skilledWagesForOnGoingWorks);
						series[8].data.push(obj.administrativeExpForOnGoingWorks);
						series[9].data.push(obj.materialExpForOnGoingWorks);
						series[10].data.push(obj.expIncurredForOnGoingWorks);
						series[11].data.push(obj.valueOfOnGoingWorksEvaluatedBySATeam);
					});
					console.log(series);
					createChart(series,categories,'MGNREGA Works Charts',chartType);
				},function(status,error){

				});
			}			
			else if($scope.defaultreports.value === 2){
				dashboardfactory.GetExpenditures($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['Refreshment','Amount Paid To VRP\'s','Photography','Video',
						'Publicity','Stationary','Others'
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.refreshmentCharges);
						series[1].data.push(obj.paidedAmount);
						series[2].data.push(obj.photographyCharges);
						series[3].data.push(obj.videosCharges);
						series[4].data.push(obj.ppleafLets);
						series[5].data.push(obj.stationary);
						series[6].data.push(obj.others);
					});
					console.log(series);
					createChart(series,categories,'Expenditures Charts',chartType);
				},function(status,error){

				});
			}else if($scope.defaultreports.value === 3){
				dashboardfactory.GetSpecialGramaSabha($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['Total Population','Total Families','Registered','JCs in VP',
						'GS Attended','Paras in SGS','Paras Setteled in SGS'
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.totalPopulation);
						series[1].data.push(obj.totalFamiliesInVpts);
						series[2].data.push(obj.noOfFamiliesRegistered);
						series[3].data.push(obj.totalJcsInVpts);
						series[4].data.push(obj.noOfPplAttentedSgs);
						series[5].data.push(obj.totalParasPlacedInSgs);
						series[6].data.push(obj.parasSetteled);
					});
					console.log(series);
					createChart(series,categories,'Special Grama Sabha Charts',chartType);
				},function(status,error){

				});				
			}else if($scope.defaultreports.value === 4){
				dashboardfactory.GetMisappropriation($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['Mulitple JC Amount','Wages to dead Amount','Wages to non-existent Amount','Wages to migrated Amount',
						'Wages to wrong account Amount','Double Wages Amount','Wages to people who didn\'t work Amount','Double Wages to WSF Amount',
						'Wages same A/C Amount','Bogus names in FTO Amount','Missing Tank / Eri Amount','Missing Canals Amount',
						'Missing Roads Amount','Missing Plantations Amount','Missing IHHLs Amount','Missing Farm Pond Amount',
						'Missing Cattle shed Amount','Missing Goat shed Amount','Missing poultry Amount','Missing IAY Amount',
						'Missing GH Amount','Misapprop. by VPt President Amount','Misapprop. by VPt Secretary Amount','Amount Drawn twice Amount',
						'Wages to o ldIHHLs Amount','Bogus entries in FTO Amount','Machinery Amount','Wages more than actual days Amount',
						"Work by contrators Amount"
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.multipleJcIssuedWorkersAmt);
						series[1].data.push(obj.wagedToDeadAmt);
						series[2].data.push(obj.wagesNonExistentAmt);
						series[3].data.push(obj.wagesMigratedAmt);
						series[4].data.push(obj.doubleWagesAmt);
						series[5].data.push(obj.wagesPaidToNotWorkedAmt);
						series[6].data.push(obj.doubleWagesWSFAmt);
						series[7].data.push(obj.wagesPaidSameAccAmt);
						series[8].data.push(obj.inclusionBogousFTOAmt);
						series[9].data.push(obj.missingTanksEriAmt);
						series[10].data.push(obj.missingCanalAmt);
						series[11].data.push(obj.missingRoadsAmt);
						series[12].data.push(obj.missingPlantationsAmt);
						series[13].data.push(obj.missingIHHLSAmt);
						series[14].data.push(obj.missingFarmPondAmt);
						series[15].data.push(obj.missingCattleShedAmt);
						series[16].data.push(obj.missingGoatShedAmt);
						series[17].data.push(obj.missingPoultryAmt);

						series[18].data.push(obj.amountDrawnSameWorkAmt);
						series[19].data.push(obj.machineryUsedAmt);
						series[20].data.push(obj.workDoneByContractorsAmt);
						series[21].data.push(obj.wagesCreditedWrongAccountsAmt);
						series[22].data.push(obj.missingMgnregaComponentIAYAmt);
						series[23].data.push(obj.missingMgnregaComponentGHAmt);
						series[24].data.push(obj.misappropriationByVPTPresidentAmt);
						series[25].data.push(obj.misappropriationByVPTSecretoryAmt);
						series[26].data.push(obj.wagesDisbursedPrevConstructedIHHLSAmt);
						series[27].data.push(obj.bogusEntriesFTOCorretingFluidAmt);	
						series[28].data.push(obj.wagesDrawnMoreThanActualWorkingDayAmt);						
					});
					console.log(series);
					createChart(series,categories,'Deviation Charts',chartType);
				},function(status,error){

				});
			}
			else if($scope.defaultreports.value === 5){
				dashboardfactory.GetDeviationConsolidate($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['JC Misused Amount','WSF Payment Amount','FTO NMR Amount','NMR Not Produced For Audit Amount',
						'Shortage In Measurements Amount','AS Not Produced For Audit Amount','TS Not Produced For Audit Amount','Wages paid without measurement Amount',
						'Wages paid in excess of M Book Amount','Signature Variation Amount','NMR Overwriting Amount','Ineligible Workers Amount',
						'Diff online NMR & Physical NMR Amount','M Books Not Produced For Audit Amount','Works without GS approval Amount','Estimates Not Produced For Audit Amount',
						'Non Adoption Of Schedule Amount','Payment witout JC Amount'
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.jcMisusedByOthersAmt);
						series[1].data.push(obj.wagesPaymentFromSchemeAmt);
						series[2].data.push(obj.amountMoreThanNMRFTOAmt);
						series[3].data.push(obj.nmrnotProducedForAuditAmt);
						series[4].data.push(obj.shortageMeasurementsAmt);
						series[5].data.push(obj.asnotProducedForAuditAmt);
						series[6].data.push(obj.tsnotProducedForAuditAmt);
						series[7].data.push(obj.wagesPaidWithoutRecordMesurementAmt);
						series[8].data.push(obj.wagesPaidExcessMBooksValueAmt);
						series[9].data.push(obj.variationsBetweenNMRRegisterAmt);
						series[10].data.push(obj.nmroverWritingCorrectionsAmt);
						series[11].data.push(obj.inEligibleWorkersIncludeUnder18Amt);
						series[12].data.push(obj.diffOnlineNMRPhysicalNMRAmt);
						series[13].data.push(obj.mbooksNotProducedForAuditAmt);
						series[14].data.push(obj.worksTakenUpWithoutGbApprovalAmt);
						series[15].data.push(obj.estimatesNotProducedForAuditAmt);
						series[16].data.push(obj.noneAdoptionOfScheduleRateAmt);
						series[17].data.push(obj.wagesPaidWorkersWithoutJcAmt);
					});
					console.log(series);
					createChart(series,categories,'Deviation Charts',chartType);
				},function(status,error){

				});
			}else if($scope.defaultreports.value === 6){
				dashboardfactory.GetGrievances($scope.searchReq).then(function(resp){
					var series = [];
					var categories  =[];
					var stackedNames = ['Delayed Payment Amount','Differently Abled Not Paid In Full Amount','Payment Less Than Value In M book Amount','Wages for days less than worked Amount',
						'Workers Not Paid Amount','Transport Allowance Amount','Injury Compensation Amount','Death Compensation Amount',
						'Payment  to IHHL work Amount'
					];
					angular.forEach(stackedNames,function(value){
						series.push({
							name : value,
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						series[0].data.push(obj.delayWagesPaymentAmt);
						series[1].data.push(obj.fullEntitlementNotGivenAmt);
						series[2].data.push(obj.lessPaymentValueRecordedMBookAmt);
						series[3].data.push(obj.wagesDrawnLessThanActualNoDaysAmt);
						series[4].data.push(obj.wagesNotPaidWorkersActuallyWorkedAmt);
						series[5].data.push(obj.transportAllowanceNotGivenAmt);
						series[6].data.push(obj.noCompensationInjuredAtWorksiteAmt);
						series[7].data.push(obj.noCompensationDeadAtWorksiteAmt);
						series[8].data.push(obj.reqPaymentCompletedIHHLWorkAmt);
					});
					console.log(series);
					createChart(series,categories,'Grievances Charts',chartType);
				},function(status,error){

				});
			}
        }	

        var drawing = kendo.drawing;
        var geometry = kendo.geometry;

        function createChart(s,c,chartTitle,chartType) {
            $("#chart").kendoChart({
            	dataSource : s,
            	theme: "Material",//BlueOpal
                title: {
                    text: chartTitle.toLocaleUpperCase()
                },
                legend: {
                    position: "bottom",
                    //orientation: "vertical",
                    item: {
                        visual: createLegendItem
                    },
			        offsetX: 20,
			        offsetY: 15,
			        visible : true                    
                },
                seriesDefaults: {
                    /*type: "line", column area donut 
                    style: "smooth" , */              	
                    type: chartType,
                    stack: true,
                    highlight: {
                        toggle: function (e) {
                            // Don't create a highlight overlay,
                            // we'll modify the existing visual instead
                            e.preventDefault();

                            var visual = e.visual;
                            var opacity = e.show ? 0.8 : 1;

                            visual&&visual.opacity(opacity);
                        }
                    },
                    visual: function (e) {
                        return createColumn(e.rect, e.options.color);
                    }
                },
                series: s,
                panes: [{
                    clip: false
                }],
                valueAxis: {
                    labels: {
                        template: "#= kendo.format('{0:N0}', value) #"
                    },                	
                    line: {
                        visible: false
                    }
                },
                categoryAxis: {
                    categories: c,
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    },
                    labels: { 
                    	rotation: -60, 
                    	padding: { right: 30 }
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name # : #= kendo.format('{0:N0}', value) #"
                },
                dataBound : function(e){
                	//setTotalLabel(e.sender);
                }/*,
	            tooltip: {
	              shared: true,
	              visible: true,
	              background: "#000",
	              sharedTemplate: $("#sharedTemplate").html()
	            }*/
            });
        }

      function setTotalLabel(chart, toggledSeriesIndex) {
        var series = chart.options.series;
        var lastSeries = {};
        var fields = [];

        for (var i = 0; i < series.length; i++) {
          var visible = series[i].visible;

          // We're about to toggle the visibility of the clicked series
          if (i === toggledSeriesIndex) {
            visible = !visible;
          }

          if (visible) {
            fields.push("dataItem." + series[i].field);
            lastSeries = series[i];
          }

          // Clean-up existing labels
          series[i].labels = {};
        }

        lastSeries.labels = {
          visible: true,
          template: "#=" + fields.join("+") + "#"
        };
      }

        function createColumn(rect, color) {
            var origin = rect.origin;
            var center = rect.center();
            var bottomRight = rect.bottomRight();
            var radiusX = rect.width() / 2;
            var radiusY = radiusX / 3;
            var gradient = new drawing.LinearGradient({
                stops: [{
                    offset: 0,
                    color: color
                }, {
                    offset: 0.5,
                    color: color,
                    opacity: 0.9
                }, {
                    offset: 0.5,
                    color: color,
                    opacity: 0.9
                }, {
                    offset: 1,
                    color: color
                }]
            });

            var path = new drawing.Path({
                    fill: gradient,
                    stroke: {
                        color: "none"
                    }
                }).moveTo(origin.x, origin.y)
                .lineTo(origin.x, bottomRight.y)
                .arc(180, 0, radiusX, radiusY, true)
                .lineTo(bottomRight.x, origin.y)
                .arc(0, 180, radiusX, radiusY);

            var topArcGeometry = new geometry.Arc([center.x, origin.y], {
                startAngle: 0,
                endAngle: 360,
                radiusX: radiusX,
                radiusY: radiusY                
            });

            var topArc = new drawing.Arc(topArcGeometry, {
                fill: {
                    color: color
                },
                stroke: {
                    color: "#ebebeb"
                }
            });
            var group = new drawing.Group();
            group.append(path, topArc);
            return group;
        }

        function createLegendItem(e) {
            var color = e.options.markers.background;
            var labelColor = e.options.labels.color;
            var rect = new geometry.Rect([0, 0], [300, 50]);
            var layout = new drawing.Layout(rect, {
                spacing: 1,
                alignItems: "center"
            });

            var overlay = drawing.Path.fromRect(rect, {
                fill: {
                    color: "#fff",
                    opacity: 0
                },
                stroke: {
                    color: "none"
                },
                cursor: "pointer"
            });

            var column = createColumn(new geometry.Rect([0, 0], [15, 10]), color);
            var label = new drawing.Text(e.series.name, [0, 0], {
                fill: {
                    color: labelColor
                }
            })

            layout.append(column, label);
            layout.reflow();

            var group = new drawing.Group().append(layout, overlay);

            return group;
        }
}]);

app.factory('dashboardfactory',function($http,$q,$rootScope){
	var service = {};

	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	service.getLookupValues = function(id,w){
		w = w || '';
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=' + (w ? w : '')
        });
	}

	service.GetDeviationConsolidate = function(searchReq){
		return $http({
	         method: 'POST',
	         url: crudServiceBaseUrl + '/deviation/deviationsreports',
	         data : JSON.stringify(searchReq),
	         cache : false			         			         
	    });
	}

	service.GetExpenditures = function(searchReq){
		return $http({
	         method: 'POST',
	         url:  crudServiceBaseUrl + '/expenditure/expenditurereports',
	         data : JSON.stringify(searchReq),
	         cache : false			         			         
	    });		
	}

	service.GetSpecialGramaSabha = function(searchReq){
      	return $http({
	         method: 'POST',
	         url: crudServiceBaseUrl + '/specialgramasabha/specialgramasabhareports',
	         data : JSON.stringify(searchReq),
	         cache : false			         
        });		
	}

	service.GetGrievances = function(searchReq){
	    return $http({
	         method: 'POST',
	         url: crudServiceBaseUrl + '/grievances/grievancesreports',
	         data : JSON.stringify(searchReq)			         
	    });	
	}
	service.GetMisappropriation = function(searchReq){
      return $http({
         method: 'POST',
         url: crudServiceBaseUrl + '/misappropriation/misappropriationsreports',
         data : JSON.stringify(searchReq),
         cache : false         
      })	
	}

	service.GetMgnregaworks = function(searchReq){
      return $http({
         method: 'POST',
         url: crudServiceBaseUrl + '/mgnregaworks/mgnregaworksreports',
         data : JSON.stringify(searchReq),
         cache : false         			         
      });	
	}
	                  
	return service;
})