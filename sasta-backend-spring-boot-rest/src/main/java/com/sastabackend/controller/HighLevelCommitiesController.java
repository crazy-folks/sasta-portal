package com.sastabackend.controller;

import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.HighLevelCommities;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.grievances.GrievancesServices;
import com.sastabackend.service.highlevel.HighLevelCommitiesService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 27/Dec/2015.
 */
@RestController
@RequestMapping("/api/highLevelcommities")
public class HighLevelCommitiesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviationController.class);
    private final HighLevelCommitiesService highLevelCommitiesService;

    @Inject
    public HighLevelCommitiesController(final HighLevelCommitiesService highLevelCommitiesService) {
        this.highLevelCommitiesService = highLevelCommitiesService;
    }

    @ApiOperation(value = "Create High Level Commities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody HighLevelCommities hl) {
        return highLevelCommitiesService.Add(hl);
    }

    @ApiOperation(value = "Update High Level Commities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody HighLevelCommities hl) {
        return highLevelCommitiesService.Update(hl);
    }

    @ApiOperation(value = "Read High Level Commities List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return highLevelCommitiesService.findAll();
    }

    @ApiOperation(value = "Read High Level Commities By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getgrievances", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return highLevelCommitiesService.findOne(id);
    }

}
