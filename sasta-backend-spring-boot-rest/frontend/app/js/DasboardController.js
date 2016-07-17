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

        $scope.filterType = [{
            "value": '0',
            "text": "Amount"
        },{ // "line", column area donut
            "value": '1',
            "text": "No"
        }];

		$scope.searchReq =  angular.copy($scope.defaultSearchReq);
		$scope.selectedFy = [];
		$scope.selectedRounds = [];
		// default selected rounds
		$scope.defaultreports = angular.copy($scope.defaultdpOptions);
		$scope.defaultchartsType = angular.copy($scope.defaultdpOptions);
        $scope.defaultFilterType = angular.copy($scope.defaultdpOptions);

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
            kendo.ui.progress($(document.body), true)
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
				dashboardfactory.GetMgnregaworks($scope.searchReq).success(function(resp){
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
                    angular.forEach(resp.data,function(obj,key){
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
                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}			
			else if($scope.defaultreports.value === 2){
				dashboardfactory.GetExpenditures($scope.searchReq).success(function(resp){
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
                    angular.forEach(resp.data,function(obj,key){
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
                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}else if($scope.defaultreports.value === 3){
				dashboardfactory.GetSpecialGramaSabha($scope.searchReq).success(function(resp){
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
                    angular.forEach(resp.data,function(obj,key){
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
                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}else if($scope.defaultreports.value === 4){
				dashboardfactory.GetMisappropriation($scope.searchReq).success(function(resp){
                    var amountSeries = [];
                    var numberSeries = [];
                    var categories  =[];
                    var stackedNames = ['Mulitple JC','Wages to dead','Wages to non-existent','Wages to migrated',
                        'Wages to wrong account','Double Wages','Wages to people who didn\'t work','Double Wages to WSF',
                        'Wages same A/C','Bogus names in FTO','Missing Tank / Eri','Missing Canals',
                        'Missing Roads','Missing Plantations','Missing IHHLs','Missing Farm Pond',
                        'Missing Cattle shed','Missing Goat shed','Missing poultry','Missing IAY',
                        'Missing GH','Misapprop. by VPt President','Misapprop. by VPt Secretary','Amount Drawn twice',
                        'Wages to o ldIHHLs','Bogus entries in FTO','Machinery','Wages more than actual days',
                        "Work by contrators"
                    ];


                    angular.forEach(stackedNames,function(value){
                        amountSeries.push({
                            name : value + " Amount",
                            data : [],
                            additional : []
                        });
                    });

                    var addAmount = function(target,source,key){
                        target[0][key].push(source.multipleJcIssuedWorkersAmt);
                        target[1][key].push(source.wagedToDeadAmt);
                        target[2][key].push(source.wagesNonExistentAmt);
                        target[3][key].push(source.wagesMigratedAmt);
                        target[4][key].push(source.doubleWagesAmt);
                        target[5][key].push(source.wagesPaidToNotWorkedAmt);
                        target[6][key].push(source.doubleWagesWSFAmt);
                        target[7][key].push(source.wagesPaidSameAccAmt);
                        target[8][key].push(source.inclusionBogousFTOAmt);
                        target[9][key].push(source.missingTanksEriAmt);
                        target[10][key].push(source.missingCanalAmt);
                        target[11][key].push(source.missingRoadsAmt);
                        target[12][key].push(source.missingPlantationsAmt);
                        target[13][key].push(source.missingIHHLSAmt);
                        target[14][key].push(source.missingFarmPondAmt);
                        target[15][key].push(source.missingCattleShedAmt);
                        target[16][key].push(source.missingGoatShedAmt);
                        target[17][key].push(source.missingPoultryAmt);
                        target[18][key].push(source.amountDrawnSameWorkAmt);
                        target[19][key].push(source.machineryUsedAmt);
                        target[20][key].push(source.workDoneByContractorsAmt);
                        target[21][key].push(source.wagesCreditedWrongAccountsAmt);
                        target[22][key].push(source.missingMgnregaComponentIAYAmt);
                        target[23][key].push(source.missingMgnregaComponentGHAmt);
                        target[24][key].push(source.misappropriationByVPTPresidentAmt);
                        target[25][key].push(source.misappropriationByVPTSecretoryAmt);
                        target[26][key].push(source.wagesDisbursedPrevConstructedIHHLSAmt);
                        target[27][key].push(source.bogusEntriesFTOCorretingFluidAmt);
                        target[28][key].push(source.wagesDrawnMoreThanActualWorkingDayAmt);
                    }

                    var addNo = function(target,source,key){
                        target[0][key].push(source.multipleJcIssuedWorkersCount);
                        target[1][key].push(source.wagedToDeadCount);
                        target[2][key].push(source.wagesNonExistentCount);
                        target[3][key].push(source.wagesMigratedCount);
                        target[4][key].push(source.doubleWagesCount);
                        target[5][key].push(source.wagesPaidToNotWorkedCount);
                        target[6][key].push(source.doubleWagesWSFCount);
                        target[7][key].push(source.wagesPaidSameAccCount);
                        target[8][key].push(source.inclusionBogousFTOCount);
                        target[9][key].push(source.missingTanksEriCount);
                        target[10][key].push(source.missingCanalCount);
                        target[11][key].push(source.missingRoadsCount);
                        target[12][key].push(source.missingPlantationsCount);
                        target[13][key].push(source.missingIHHLSCount);
                        target[14][key].push(source.missingFarmPondCount);
                        target[15][key].push(source.missingCattleShedCount);
                        target[16][key].push(source.missingGoatShedCount);
                        target[17][key].push(source.missingPoultryCount);
                        target[18][key].push(source.amountDrawnSameWorkCount);
                        target[19][key].push(source.machineryUsedCount);
                        target[20][key].push(source.workDoneByContractorsCount);
                        target[21][key].push(source.wagesCreditedWrongAccountsCount);
                        target[22][key].push(source.missingMgnregaComponentIAYCount);
                        target[23][key].push(source.missingMgnregaComponentGHCount);
                        target[24][key].push(source.misappropriationByVPTPresidentCount);
                        target[25][key].push(source.misappropriationByVPTSecretoryCount);
                        target[26][key].push(source.wagesDisbursedPrevConstructedIHHLSCount);
                        target[27][key].push(source.bogusEntriesFTOCorretingFluidCount);
                        target[28][key].push(source.wagesDrawnMoreThanActualWorkingDayCount);
                    }

                    angular.forEach(resp.data,function(obj,key){
                        categories.push(obj.districtName);
                        addAmount(amountSeries,obj,'data');
                        addNo(amountSeries,obj,'additional');
                    });

                    angular.forEach(stackedNames,function(value){
                        numberSeries.push({
                            name : value + " No",
                            data : [],
                            additional : []
                        });
                    });

                    angular.forEach(resp.data,function(obj,key){
                        addAmount(numberSeries,obj,'additional');
                        addNo(numberSeries,obj,'data');
                    });

                    createChart((($scope.defaultFilterType.value==0) ? amountSeries : numberSeries),categories,'Misappropriation Charts',chartType,true);

                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}
			else if($scope.defaultreports.value === 5){
				dashboardfactory.GetDeviationConsolidate($scope.searchReq).success(function(resp){
                    var amountSeries = [];
                    var numberSeries = [];
                    var categories  = [];
                    var stackedNames = ['JC Misused','WSF Payment','FTO NMR','NMR Not Produced For Audit',
                        'Shortage In Measurements','AS Not Produced For Audit','TS Not Produced For Audit','Wages paid without measurement',
                        'Wages paid in excess of M Book','Signature Variation','NMR Overwriting','Ineligible Workers',
                        'Diff online NMR & Physical NMR','M Books Not Produced For Audit','Works without GS approval','Estimates Not Produced For Audit',
                        'Non Adoption Of Schedule','Payment witout JC'
                    ];


                    var addAmount = function(target,source,key){
                        target[0][key].push(source.jcMisusedByOthersAmt);
                        target[1][key].push(source.wagesPaymentFromSchemeAmt);
                        target[2][key].push(source.amountMoreThanNMRFTOAmt);
                        target[3][key].push(source.nmrnotProducedForAuditAmt);
                        target[4][key].push(source.shortageMeasurementsAmt);
                        target[5][key].push(source.asnotProducedForAuditAmt);
                        target[6][key].push(source.tsnotProducedForAuditAmt);
                        target[7][key].push(source.wagesPaidWithoutRecordMesurementAmt);
                        target[8][key].push(source.wagesPaidExcessMBooksValueAmt);
                        target[9][key].push(source.variationsBetweenNMRRegisterAmt);
                        target[10][key].push(source.nmroverWritingCorrectionsAmt);
                        target[11][key].push(source.inEligibleWorkersIncludeUnder18Amt);
                        target[12][key].push(source.diffOnlineNMRPhysicalNMRAmt);
                        target[13][key].push(source.mbooksNotProducedForAuditAmt);
                        target[14][key].push(source.worksTakenUpWithoutGbApprovalAmt);
                        target[15][key].push(source.estimatesNotProducedForAuditAmt);
                        target[16][key].push(source.noneAdoptionOfScheduleRateAmt);
                        target[17][key].push(source.wagesPaidWorkersWithoutJcAmt);
                    }

                    var addNo = function(target,source,key){
                        target[0][key].push(source.jcMisusedByOthersCount);
                        target[1][key].push(source.wagesPaymentFromSchemeCount);
                        target[2][key].push(source.amountMoreThanNMRFTOCount);
                        target[3][key].push(source.nmrnotProducedForAuditCount);
                        target[4][key].push(source.shortageMeasurementsCount);
                        target[5][key].push(source.asnotProducedForAuditCount);
                        target[6][key].push(source.tsnotProducedForAuditCount);
                        target[7][key].push(source.wagesPaidWithoutRecordMesurementCount);
                        target[8][key].push(source.wagesPaidExcessMBooksValueCount);
                        target[9][key].push(source.variationsBetweenNMRRegisterCount);
                        target[10][key].push(source.nmroverWritingCorrectionsCount);
                        target[11][key].push(source.inEligibleWorkersIncludeUnder18Count);
                        target[12][key].push(source.diffOnlineNMRPhysicalNMRCount);
                        target[13][key].push(source.mbooksNotProducedForAuditCount);
                        target[14][key].push(source.worksTakenUpWithoutGbApprovalCount);
                        target[15][key].push(source.estimatesNotProducedForAuditCount);
                        target[16][key].push(source.noneAdoptionOfScheduleRateCount);
                        target[17][key].push(source.wagesPaidWorkersWithoutJcCount);
                    }

                    angular.forEach(stackedNames,function(value){
                        amountSeries.push({
                            name : value+ " Amount",
                            data : [],
                            additional : []
                        });
                    });

                    angular.forEach(resp.data,function(obj,key){
                        categories.push(obj.districtName);
                        addAmount(amountSeries,obj,'data');
                        addNo(amountSeries,obj,'additional');
                    });

                    angular.forEach(stackedNames,function(value){
                        numberSeries.push({
                            name : value + " No",
                            data : [],
                            additional : []
                        });
                    });

                    angular.forEach(resp.data,function(obj,key){
                        addAmount(numberSeries,obj,'additional');
                        addNo(numberSeries,obj,'data');
                    });
                    createChart((($scope.defaultFilterType.value==0) ? amountSeries : numberSeries),categories,'Deviation Charts',chartType,true);
                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}else if($scope.defaultreports.value === 6){
				dashboardfactory.GetGrievances($scope.searchReq).success(function(resp){
                    var amountSeries = [];
                    var numberSeries = [];
                    var categories  =[];
                    var stackedNames = ['Delayed Payment','Differently Abled Not Paid In Full','Payment Less Than Value In M book','Wages for days less than worked',
                        'Workers Not Paid','Transport Allowance','Injury Compensation','Death Compensation',
                        'Payment  to IHHL work'
                    ];
                    angular.forEach(stackedNames,function(value){
                        amountSeries.push({
                            name : value,
                            data : []
                        });
                    });

                    angular.forEach(resp.data,function(obj,key){
                        categories.push(obj.districtName);
                        amountSeries[0].data.push(obj.delayWagesPaymentAmt);
                        amountSeries[1].data.push(obj.fullEntitlementNotGivenAmt);
                        amountSeries[2].data.push(obj.lessPaymentValueRecordedMBookAmt);
                        amountSeries[3].data.push(obj.wagesDrawnLessThanActualNoDaysAmt);
                        amountSeries[4].data.push(obj.wagesNotPaidWorkersActuallyWorkedAmt);
                        amountSeries[5].data.push(obj.transportAllowanceNotGivenAmt);
                        amountSeries[6].data.push(obj.noCompensationInjuredAtWorksiteAmt);
                        amountSeries[7].data.push(obj.noCompensationDeadAtWorksiteAmt);
                        amountSeries[8].data.push(obj.reqPaymentCompletedIHHLWorkAmt);
                    });

                    var extra = $.merge([
                        'Grievances In Household Verification','Grievances In GS','Request For JC',"More than 100 days",
                        "IHHL","IAY","Cattle shelter","MNREGA Work","Renewal","Other Schemes","Wage Increase","PDS",
                        "Library Building","Worksite Facilities","Complaint Against BC","JC to OAP","Work to OAP",
                        "Complaint Against WSF","Complaint Against VP President","Complaint Against UOS","Complaint Against BDO (VP)",
                        "Complaint Against VP Secretary","Others"
                    ],stackedNames);

                    angular.forEach(extra,function(value){
                        numberSeries.push({
                            name : value + " No",
                            data : []
                        });
                    });

                    angular.forEach(resp.data,function(obj,key){

                        numberSeries[0].data.push(obj.totalReceivedGrievancesHF);
                        numberSeries[1].data.push(obj.totalReceivedGrievancesMeeting);
                        numberSeries[2].data.push(obj.reqForNewJc);
                        numberSeries[3].data.push(obj.reqForMoreThan100Days);
                        numberSeries[4].data.push(obj.reqForConstructionIHHL);
                        numberSeries[5].data.push(obj.reqForConstructionIAYHouse);
                        numberSeries[6].data.push(obj.reqForConstructionCattleShelter);
                        numberSeries[7].data.push(obj.demandForWork);
                        numberSeries[8].data.push(obj.demandForRenewelJc);

                        numberSeries[9].data.push(obj.demandForIndividualBenefitScheme);
                        numberSeries[10].data.push(obj.demandForWagesIncrease);
                        numberSeries[11].data.push(obj.demandForPds);
                        numberSeries[12].data.push(obj.demandForLibraryBuilding);
                        numberSeries[13].data.push(obj.nonProvisionOfWorkSiteFacilities);
                        numberSeries[14].data.push(obj.complaintAgainstBankingCorrespondent);
                        numberSeries[15].data.push(obj.oapnotProvidedJc);
                        numberSeries[16].data.push(obj.oapnotProvidedWork);
                        numberSeries[17].data.push(obj.complaintsAgainstWorksiteFacilidator);
                        numberSeries[18].data.push(obj.complaintsAgainstVPPresident);
                        numberSeries[19].data.push(obj.complaintsAgainstUnionOverseer);
                        numberSeries[20].data.push(obj.complaintsAgainstBDOVP);
                        numberSeries[21].data.push(obj.complaintsAgainstVPSecretory);
                        numberSeries[22].data.push(obj.others);

                        numberSeries[23].data.push(obj.delayWagesPaymentCount);
                        numberSeries[24].data.push(obj.fullEntitlementNotGivenCount);
                        numberSeries[25].data.push(obj.lessPaymentValueRecordedMBookCount);
                        numberSeries[26].data.push(obj.wagesDrawnLessThanActualNoDaysCount);
                        numberSeries[27].data.push(obj.wagesNotPaidWorkersActuallyWorkedCount);
                        numberSeries[28].data.push(obj.transportAllowanceNotGivenCount);
                        numberSeries[29].data.push(obj.noCompensationInjuredAtWorksiteCount);
                        numberSeries[30].data.push(obj.noCompensationDeadAtWorksiteCount);
                        numberSeries[31].data.push(obj.reqPaymentCompletedIHHLWorkCount);
                    });

                    createChart((($scope.defaultFilterType.value==0) ? amountSeries : numberSeries),categories,'Grievances Charts',chartType);
                }).error(function(status,error){
                    kendo.ui.progress($(document.body), false);
                }).finally(function(){
                    kendo.ui.progress($(document.body), false);
                });
			}
        }	

        var drawing = kendo.drawing;
        var geometry = kendo.geometry;
        $scope.chartInstance = null;

        function createChart(s,c,chartTitle,chartType,tmpl) {
            var templ = "#= series.name # : #= kendo.format('{0:N0}', value) #";
            tmpl = tmpl || false;
            if(tmpl){
                templ = function(e){
                    var index = e.series.index;
                    var name = e.series.name;
                    var value = kendo.format('{0:N0}', e.value);
                    var ds = $(chart).data('kendoChart').dataSource.data();
                    var currentItem = null;
                    var category = e.category;
                    var categoryIndex = 0;

                    if($(chart).data('kendoChart').options){
                        angular.forEach(($(chart).data('kendoChart').options.categoryAxis.categories||[]),function(i,k){
                            if( i === category)
                                categoryIndex = k;
                        });
                    }

                    angular.forEach(ds,function(i,k){
                       if(i.name === name){
                           currentItem = i;
                       }
                    });
                    var additional = null;
                    currentItem&&(additional = currentItem.additional[categoryIndex]);
                    return name + " : " + value + (additional?("("+kendo.format('{0:N0}', additional)+")"):"");
                }
            }
            $scope.chartInstance = $("#chart").kendoChart({
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
                    /*type: "line", column area donut */
                    style: "smooth" ,
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
                    template: templ
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
            }).data('kendoChart');
			enableLegend(chart);
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

        $scope.disableAll = false;

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

		function enableLegend (chart){

			for(i=0; i <  $scope.chartInstance._sourceSeries.length; i++) {
				if(i !== 0){
                    $scope.chartInstance._sourceSeries[i].visible = false;
				}
			}
            $scope.disableAll = true;
            $scope.chartInstance.redraw();
		}

        $scope.redrawLegends = function(flag){
            for(i=0; i <  $scope.chartInstance._sourceSeries.length; i++) {
                    $scope.chartInstance._sourceSeries[i].visible = flag;
            }
            $scope.disableAll = flag;
            $scope.chartInstance.redraw();
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