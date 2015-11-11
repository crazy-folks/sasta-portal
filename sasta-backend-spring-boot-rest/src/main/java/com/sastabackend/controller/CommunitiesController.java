package com.sastabackend.controller;

import com.sastabackend.domain.Communities;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.Communities.CommunitiesService;
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
@RequestMapping("communities")
public class CommunitiesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommunitiesController.class);
    private final CommunitiesService communitiesService;

    @Inject
    public CommunitiesController(final CommunitiesService communitiesService) {
        this.communitiesService = communitiesService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final Communities communities){
        return communitiesService.Add(communities.getName(),communities.getDescription(),communities.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final Communities communities){
        return communitiesService.Update(communities.getId(), communities.getName(), communities.getDescription(),
                communities.getModifiedBy(),communities.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return communitiesService.getList();
    }

}