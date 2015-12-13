package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.BloodGroups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.bloodgroups.BloodGroupService;
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
@RequestMapping("/api/bloodgroup")
public class BloodGroupController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BloodGroupController.class);
    private final BloodGroupService bloodGroupService;

    @Inject
    public BloodGroupController(final BloodGroupService bloodGroupService) {
        this.bloodGroupService = bloodGroupService;
    }

    @ApiOperation(value = "Create Blood Group", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final BloodGroups bloodgroups){
        return bloodGroupService.Add(bloodgroups.getName(),bloodgroups.getDescription(),bloodgroups.getCreatedBy());
    }

    @ApiOperation(value = "Update Blood Group", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final BloodGroups bloodgroups){
        return bloodGroupService.Update(bloodgroups.getBloodGroupId(), bloodgroups.getName(), bloodgroups.getDescription(),
                bloodgroups.getModifiedBy(),bloodgroups.getStatus());
    }

    @ApiOperation(value = "Read Blood Group List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return bloodGroupService.getList();
    }

}