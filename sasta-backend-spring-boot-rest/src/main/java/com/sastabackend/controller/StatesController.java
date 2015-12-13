package com.sastabackend.controller;

import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
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
@RequestMapping("/api/states")
public class StatesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DistrictController.class);
    private final StatesService statesService;

    @Inject
    public StatesController(final StatesService statesService) {
        this.statesService = statesService;
    }

    @ApiOperation(value = "Create State", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final States states){
        return statesService.Add(states.getName(),states.getDescription(),states.getCountryId(),states.getStateCode(),
                states.getShortName(),states.getCreatedBy());
    }

    @ApiOperation(value = "Update State", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final States states){
        return statesService.Update(states.getStateId(), states.getName(), states.getDescription(),
                states.getCountryId(), states.getStateCode(), states.getShortName(), states.getModifiedBy(),states.getStatus());
    }

    @ApiOperation(value = "Read State List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return statesService.getList();
    }
}
