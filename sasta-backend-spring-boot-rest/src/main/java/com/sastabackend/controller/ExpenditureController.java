package com.sastabackend.controller;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.expenditure.ExpenditureService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.sql.Date;

/**
 * Created by SARVA on 10/Nov/2015.
 */
@RestController
@RequestMapping("/api/expenditure")
public class ExpenditureController {



    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final ExpenditureService expenditureService;

    @Inject
    public ExpenditureController(final ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }

    @ApiOperation(value = "Create Expenditure", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Add(@RequestBody Expenditure ex){
        return expenditureService.Add(ex.getAuditId(),ex.getVisitedVillageCount(),ex.getAppReceivedCount(),
                ex.getAttendedAppCount(),ex.getRefreshmentCharges(),ex.getSelectedVrpCount(),ex.getPaidedAmount(),
                ex.getPhotographyCharges(),ex.getVideosCharges(),ex.getPpleafLets(),ex.getStationary(),
                ex.getOthers(),ex.getCreatedBy());
    }

    @ApiOperation(value = "Update Expenditure", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody Expenditure ex) {
        return expenditureService.Update(ex.getId(),ex.getAuditId(),ex.getVisitedVillageCount(),ex.getAppReceivedCount(),
                ex.getAttendedAppCount(),ex.getRefreshmentCharges(),ex.getSelectedVrpCount(),ex.getPaidedAmount(),
                ex.getPhotographyCharges(),ex.getVideosCharges(),ex.getPpleafLets(),ex.getStationary(),
                ex.getOthers(),ex.getModifiedBy(),ex.getStatus());
    }

    @ApiOperation(value = "Read Expenditure List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return expenditureService.findAll();
    }

    @ApiOperation(value = "Read Expenditure By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getexpenditure", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return expenditureService.findOne(id);
    }

}
