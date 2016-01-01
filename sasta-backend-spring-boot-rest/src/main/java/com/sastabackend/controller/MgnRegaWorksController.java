package com.sastabackend.controller;

import com.sastabackend.domain.MgnRegaWorks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.mgnregaworks.MgnRegaWorksService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 26/Dec/2015.
 */
@RestController
@RequestMapping("/api/mgnregaworks")
public class MgnRegaWorksController {


    private static final Logger LOGGER = LoggerFactory.getLogger(MgnRegaWorksController.class);
    private final MgnRegaWorksService mgnregaworksService;

    @Inject
    public MgnRegaWorksController(final MgnRegaWorksService mgnregaworksService) {
        this.mgnregaworksService = mgnregaworksService;
    }


    @ApiOperation(value = "Create MgnRega Works", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody MgnRegaWorks mgn) {
        return mgnregaworksService.Add(mgn);
    }

    @ApiOperation(value = "Update MgnRega Works", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody MgnRegaWorks mgn) {
        return mgnregaworksService.Update(mgn);
    }

    @ApiOperation(value = "Read MgnRegaWorks List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return mgnregaworksService.findAll();
    }

    @ApiOperation(value = "Read MgnRegaWorks By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getmgnregaworks", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return mgnregaworksService.findOne(id);
    }

}
