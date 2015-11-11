package com.sastabackend.controller;

import com.sastabackend.domain.FinancialYear;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.financialyear.FinancialYearService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.validation.Valid;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@RestController
@RequestMapping("financialyear")
public class FinancialYearController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommunitiesController.class);
    private final FinancialYearService financialyearService;

    @Inject
    public FinancialYearController(final FinancialYearService financialyearService) {
        this.financialyearService = financialyearService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final FinancialYear financialyear){
        return financialyearService.Add(financialyear.getName(),financialyear.getDescription(),financialyear.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final FinancialYear financialyear){
        return financialyearService.Update(financialyear.getId(), financialyear.getName(), financialyear.getDescription(),
                financialyear.getModifiedBy(),financialyear.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return financialyearService.getList();
    }

}