package com.sastabackend.controller;

import com.sastabackend.domain.EntityGroups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.entitygroups.EntityGroupsService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

/**
 * Created by SARVA on 20/Dec/2015.
 */
@RestController
@RequestMapping("/api/entitygroups")
public class EntityGroupsController {


    private static final Logger LOGGER = LoggerFactory.getLogger(EntityGroupsController.class);
    private final EntityGroupsService entitygroupsService;

    @Inject
    public EntityGroupsController(final EntityGroupsService entitygroupsService) {
        this.entitygroupsService = entitygroupsService;
    }

    @ApiOperation(value = "Create Entity Groups", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final EntityGroups eg){
        return entitygroupsService.Add(eg.getName(),eg.getDescription(),eg.getCreatedBy());
    }

    @ApiOperation(value = "Update Entity Groups", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final EntityGroups eg){
        return entitygroupsService.Update(eg.getId(), eg.getName(), eg.getDescription(),
                eg.getModifiedBy(),eg.getStatus());
    }

    @ApiOperation(value = "Red Entity Groups List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return entitygroupsService.getList();
    }


}
