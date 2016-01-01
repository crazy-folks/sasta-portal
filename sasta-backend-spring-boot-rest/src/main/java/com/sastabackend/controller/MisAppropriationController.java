package com.sastabackend.controller;

import com.sastabackend.domain.MisAppropriation;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.misappropriation.MisAppropriationService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 26/Dec/2015.
 */
@RestController
@RequestMapping("/api/misappropriation")
public class MisAppropriationController {


    private static final Logger LOGGER = LoggerFactory.getLogger(MgnRegaWorksController.class);
    private final MisAppropriationService misappropriationService;

    @Inject
    public MisAppropriationController(final MisAppropriationService misappropriationService) {
        this.misappropriationService = misappropriationService;
    }

    @ApiOperation(value = "Create Mis Appropriation", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody MisAppropriation mis) {
        return misappropriationService.Add(mis);
    }

    @ApiOperation(value = "Update Mis Appropriation", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody MisAppropriation mis) {
        return misappropriationService.Update(mis);
    }

    @ApiOperation(value = "Read Mis Appropriation List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return misappropriationService.findAll();
    }

    @ApiOperation(value = "Read Mis Appropriation By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getmisappropriation", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return misappropriationService.findOne(id);
    }

}
