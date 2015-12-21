package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Rounds;
import com.sastabackend.service.rounds.RoundsService;
import com.sastabackend.util.TestClass;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;

/**
 * Created by SARVA on 09/Nov/2015.
 */

@RestController
@RequestMapping("/api/rounds")
public class RoundsController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final RoundsService roundsService;

    @Inject
    public RoundsController(final RoundsService roundsService) {
        this.roundsService = roundsService;
    }

    @ApiOperation(value = "Create Rounds", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Rounds model){
        LOGGER.debug("Reading Rounds  : {}",model.toString());
        return roundsService.Add(model.getName(), model.getReferenceId(), model.getStartDate(), model.getEndDate(),
                model.getDescription(), model.getCreatedBy());
    }

    @ApiOperation(value = "Update Rounds", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Rounds model){
        return roundsService.Update(model.getId(), model.getName(), model.getReferenceId(), model.getStartDate(), model.getEndDate(),
                model.getDescription(), model.getModifiedBy(), model.getStatus());
    }

    @ApiOperation(value = "Read Rounds List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return roundsService.findAll();
    }

    @ApiOperation(value = "Read Rounds By ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getround", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id){
        return roundsService.findOne(id);
    }

    @ApiOperation(value = "Test API", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public ResponseModel Test(@ModelAttribute final TestClass model){
        ResponseModel<TestClass> t = new ResponseModel<TestClass>();
        t.setStatus(true);
        t.setData(model);
        return t;
    }
}
