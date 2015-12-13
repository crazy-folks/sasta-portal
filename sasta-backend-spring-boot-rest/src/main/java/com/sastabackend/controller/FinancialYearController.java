package com.sastabackend.controller;

import com.sastabackend.domain.FinancialYear;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.financialyear.FinancialYearService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@RestController
@RequestMapping("/api/financialyear")
public class FinancialYearController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommunitiesController.class);
    private final FinancialYearService financialyearService;

    @Inject
    public FinancialYearController(final FinancialYearService financialyearService) {
        this.financialyearService = financialyearService;
    }

    @ApiOperation(value = "Create Financial Year", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final FinancialYear financialyear){
        return financialyearService.Add(financialyear.getName(),financialyear.getDescription(),financialyear.getCreatedBy());
    }

    @ApiOperation(value = "Update Financial Year", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final FinancialYear financialyear){
        return financialyearService.Update(financialyear.getId(), financialyear.getName(), financialyear.getDescription(),
                financialyear.getModifiedBy(),financialyear.getStatus());
    }

    @ApiOperation(value = "Read Financial Year", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return financialyearService.getList();
    }

}