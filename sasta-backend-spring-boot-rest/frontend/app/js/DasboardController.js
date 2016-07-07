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
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
                        amountSeries[0].data.push(obj.multipleJcIssuedWorkersAmt);
                        amountSeries[1].data.push(obj.wagedToDeadAmt);
                        amountSeries[2].data.push(obj.wagesNonExistentAmt);
                        amountSeries[3].data.push(obj.wagesMigratedAmt);
                        amountSeries[4].data.push(obj.doubleWagesAmt);
                        amountSeries[5].data.push(obj.wagesPaidToNotWorkedAmt);
                        amountSeries[6].data.push(obj.doubleWagesWSFAmt);
                        amountSeries[7].data.push(obj.wagesPaidSameAccAmt);
                        amountSeries[8].data.push(obj.inclusionBogousFTOAmt);
                        amountSeries[9].data.push(obj.missingTanksEriAmt);
                        amountSeries[10].data.push(obj.missingCanalAmt);
                        amountSeries[11].data.push(obj.missingRoadsAmt);
                        amountSeries[12].data.push(obj.missingPlantationsAmt);
                        amountSeries[13].data.push(obj.missingIHHLSAmt);
                        amountSeries[14].data.push(obj.missingFarmPondAmt);
                        amountSeries[15].data.push(obj.missingCattleShedAmt);
                        amountSeries[16].data.push(obj.missingGoatShedAmt);
                        amountSeries[17].data.push(obj.missingPoultryAmt);
                        amountSeries[18].data.push(obj.amountDrawnSameWorkAmt);
                        amountSeries[19].data.push(obj.machineryUsedAmt);
                        amountSeries[20].data.push(obj.workDoneByContractorsAmt);
                        amountSeries[21].data.push(obj.wagesCreditedWrongAccountsAmt);
                        amountSeries[22].data.push(obj.missingMgnregaComponentIAYAmt);
                        amountSeries[23].data.push(obj.missingMgnregaComponentGHAmt);
                        amountSeries[24].data.push(obj.misappropriationByVPTPresidentAmt);
                        amountSeries[25].data.push(obj.misappropriationByVPTSecretoryAmt);
                        amountSeries[26].data.push(obj.wagesDisbursedPrevConstructedIHHLSAmt);
                        amountSeries[27].data.push(obj.bogusEntriesFTOCorretingFluidAmt);
                        amountSeries[28].data.push(obj.wagesDrawnMoreThanActualWorkingDayAmt);
					});

                    angular.forEach(stackedNames,function(value){
                        numberSeries.push({
                            name : value + " No",
                            data : []
                        });
                    });

                    angular.forEach(resp.data.data,function(obj,key){
                        numberSeries[0].data.push(obj.multipleJcIssuedWorkersCount);
                        numberSeries[1].data.push(obj.wagedToDeadCount);
                        numberSeries[2].data.push(obj.wagesNonExistentCount);
                        numberSeries[3].data.push(obj.wagesMigratedCount);
                        numberSeries[4].data.push(obj.doubleWagesCount);
                        numberSeries[5].data.push(obj.wagesPaidToNotWorkedCount);
                        numberSeries[6].data.push(obj.doubleWagesWSFCount);
                        numberSeries[7].data.push(obj.wagesPaidSameAccCount);
                        numberSeries[8].data.push(obj.inclusionBogousFTOCount);
                        numberSeries[9].data.push(obj.missingTanksEriCount);
                        numberSeries[10].data.push(obj.missingCanalCount);
                        numberSeries[11].data.push(obj.missingRoadsCount);
                        numberSeries[12].data.push(obj.missingPlantationsCount);
                        numberSeries[13].data.push(obj.missingIHHLSCount);
                        numberSeries[14].data.push(obj.missingFarmPondCount);
                        numberSeries[15].data.push(obj.missingCattleShedCount);
                        numberSeries[16].data.push(obj.missingGoatShedCount);
                        numberSeries[17].data.push(obj.missingPoultryCount);
                        numberSeries[18].data.push(obj.amountDrawnSameWorkCount);
                        numberSeries[19].data.push(obj.machineryUsedCount);
                        numberSeries[20].data.push(obj.workDoneByContractorsCount);
                        numberSeries[21].data.push(obj.wagesCreditedWrongAccountsCount);
                        numberSeries[22].data.push(obj.missingMgnregaComponentIAYCount);
                        numberSeries[23].data.push(obj.missingMgnregaComponentGHCount);
                        numberSeries[24].data.push(obj.misappropriationByVPTPresidentCount);
                        numberSeries[25].data.push(obj.misappropriationByVPTSecretoryCount);
                        numberSeries[26].data.push(obj.wagesDisbursedPrevConstructedIHHLSCount);
                        numberSeries[27].data.push(obj.bogusEntriesFTOCorretingFluidCount);
                        numberSeries[28].data.push(obj.wagesDrawnMoreThanActualWorkingDayCount);
                    });
					createChart((($scope.defaultFilterType.value==0) ? amountSeries : numberSeries),categories,'Misappropriation Charts',chartType);
				},function(status,error){

				});
			}
			else if($scope.defaultreports.value === 5){
				dashboardfactory.GetDeviationConsolidate($scope.searchReq).then(function(resp){
					var amountSeries = [];
					var numberSeries = [];
					var categories  = [];
					var stackedNames = ['JC Misused','WSF Payment','FTO NMR','NMR Not Produced For Audit',
						'Shortage In Measurements','AS Not Produced For Audit','TS Not Produced For Audit','Wages paid without measurement',
						'Wages paid in excess of M Book','Signature Variation','NMR Overwriting','Ineligible Workers',
						'Diff online NMR & Physical NMR','M Books Not Produced For Audit','Works without GS approval','Estimates Not Produced For Audit',
						'Non Adoption Of Schedule','Payment witout JC'
					];
					angular.forEach(stackedNames,function(value){
						amountSeries.push({
							name : value+ " Amount",
							data : []
						});
					});
					angular.forEach(resp.data.data,function(obj,key){
						categories.push(obj.districtName);
						amountSeries[0].data.push(obj.jcMisusedByOthersAmt);
						amountSeries[1].data.push(obj.wagesPaymentFromSchemeAmt);
						amountSeries[2].data.push(obj.amountMoreThanNMRFTOAmt);
						amountSeries[3].data.push(obj.nmrnotProducedForAuditAmt);
						amountSeries[4].data.push(obj.shortageMeasurementsAmt);
						amountSeries[5].data.push(obj.asnotProducedForAuditAmt);
						amountSeries[6].data.push(obj.tsnotProducedForAuditAmt);
						amountSeries[7].data.push(obj.wagesPaidWithoutRecordMesurementAmt);
						amountSeries[8].data.push(obj.wagesPaidExcessMBooksValueAmt);
						amountSeries[9].data.push(obj.variationsBetweenNMRRegisterAmt);
						amountSeries[10].data.push(obj.nmroverWritingCorrectionsAmt);
						amountSeries[11].data.push(obj.inEligibleWorkersIncludeUnder18Amt);
						amountSeries[12].data.push(obj.diffOnlineNMRPhysicalNMRAmt);
						amountSeries[13].data.push(obj.mbooksNotProducedForAuditAmt);
						amountSeries[14].data.push(obj.worksTakenUpWithoutGbApprovalAmt);
						amountSeries[15].data.push(obj.estimatesNotProducedForAuditAmt);
						amountSeries[16].data.push(obj.noneAdoptionOfScheduleRateAmt);
						amountSeries[17].data.push(obj.wagesPaidWorkersWithoutJcAmt);
					});

					angular.forEach(stackedNames,function(value){
						numberSeries.push({
							name : value + " No",
							data : []
						});
					});

					angular.forEach(resp.data.data,function(obj,key){
						numberSeries[0].data.push(obj.jcMisusedByOthersCount);
						numberSeries[1].data.push(obj.wagesPaymentFromSchemeCount);
						numberSeries[2].data.push(obj.amountMoreThanNMRFTOCount);
						numberSeries[3].data.push(obj.nmrnotProducedForAuditCount);
						numberSeries[4].data.push(obj.shortageMeasurementsCount);
						numberSeries[5].data.push(obj.asnotProducedForAuditCount);
						numberSeries[6].data.push(obj.tsnotProducedForAuditCount);
						numberSeries[7].data.push(obj.wagesPaidWithoutRecordMesurementCount);
						numberSeries[8].data.push(obj.wagesPaidExcessMBooksValueCount);
						numberSeries[9].data.push(obj.variationsBetweenNMRRegisterCount);
						numberSeries[10].data.push(obj.nmroverWritingCorrectionsCount);
						numberSeries[11].data.push(obj.inEligibleWorkersIncludeUnder18Count);
						numberSeries[12].data.push(obj.diffOnlineNMRPhysicalNMRCount);
						numberSeries[13].data.push(obj.mbooksNotProducedForAuditCount);
						numberSeries[14].data.push(obj.worksTakenUpWithoutGbApprovalCount);
						numberSeries[15].data.push(obj.estimatesNotProducedForAuditCount);
						numberSeries[16].data.push(obj.noneAdoptionOfScheduleRateCount);
						numberSeries[17].data.push(obj.wagesPaidWorkersWithoutJcCount);
					});
					createChart((($scope.defaultFilterType.value==0) ? amountSeries : numberSeries),categories,'Deviation Charts',chartType);
				},function(status,error){

				});
			}else if($scope.defaultreports.value === 6){
				dashboardfactory.GetGrievances($scope.searchReq).then(function(resp){
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
					angular.forEach(resp.data.data,function(obj,key){
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

                    angular.forEach(resp.data.data,function(obj,key){

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
				},function(status,error){

				});
			}
        }	

        var drawing = kendo.drawing;
        var geometry = kendo.geometry;
        $scope.chartInstance = null;

        function createChart(s,c,chartTitle,chartType) {
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