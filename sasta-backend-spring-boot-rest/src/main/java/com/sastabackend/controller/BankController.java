package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.service.bank.BankService;
import com.sastabackend.service.state.StatesService;
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
@RequestMapping("bank")
public class BankController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final BankService bankService;

    @Inject
    public BankController(final BankService bankService) {
        this.bankService = bankService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final Bank bank){
        return bankService.Add(bank.getName(),bank.getDescription(),bank.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final Bank bank){
        return bankService.Update(bank.getBankId(), bank.getName(), bank.getDescription(),
                bank.getModifiedBy(),bank.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return bankService.getList();
    }

}
