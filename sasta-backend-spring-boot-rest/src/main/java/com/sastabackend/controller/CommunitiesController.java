package com.sastabackend.controller;

import com.sastabackend.domain.Communities;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.Communities.CommunitiesService;
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
@RequestMapping("/api/communities")
public class CommunitiesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommunitiesController.class);
    private final CommunitiesService communitiesService;

    @Inject
    public CommunitiesController(final CommunitiesService communitiesService) {
        this.communitiesService = communitiesService;
    }

    @ApiOperation(value = "Create Communities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Communities communities){
        return communitiesService.Add(communities.getName(),communities.getDescription(),communities.getCreatedBy());
    }

    @ApiOperation(value = "Update Communities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Communities communities){
        return communitiesService.Update(communities.getId(), communities.getName(), communities.getDescription(),
                communities.getModifiedBy(),communities.getStatus());
    }

    @ApiOperation(value = "Red Communities Lit", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return communitiesService.getList();
    }

}