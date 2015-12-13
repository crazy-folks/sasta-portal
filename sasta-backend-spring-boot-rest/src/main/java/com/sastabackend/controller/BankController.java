package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.service.bank.BankService;
import com.sastabackend.service.state.StatesService;
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
@RequestMapping("/api/bank")
public class BankController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final BankService bankService;

    @Inject
    public BankController(final BankService bankService) {
        this.bankService = bankService;
    }

    @ApiOperation(value = "Create Bank", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Bank bank){
        return bankService.Add(bank.getName(),bank.getDescription(),bank.getCreatedBy());
    }

    @ApiOperation(value = "Update Bank", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Bank bank){
        return bankService.Update(bank.getBankId(), bank.getName(), bank.getDescription(),
                bank.getModifiedBy(),bank.getStatus());
    }

    @ApiOperation(value = "Read Bank List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return bankService.getList();
    }

}
