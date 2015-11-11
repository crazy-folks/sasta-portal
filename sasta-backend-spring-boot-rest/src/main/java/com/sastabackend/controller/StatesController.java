package com.sastabackend.controller;

import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
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
@RequestMapping("states")
public class StatesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DistrictController.class);
    private final StatesService statesService;

    @Inject
    public StatesController(final StatesService statesService) {
        this.statesService = statesService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final States states){
        return statesService.Add(states.getName(),states.getDescription(),states.getCountryId(),states.getStateCode(),
                states.getShortName(),states.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final States states){
        return statesService.Update(states.getStateId(), states.getName(), states.getDescription(),
                states.getCountryId(), states.getStateCode(), states.getShortName(), states.getModifiedBy(),states.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return statesService.getList();
    }
}
