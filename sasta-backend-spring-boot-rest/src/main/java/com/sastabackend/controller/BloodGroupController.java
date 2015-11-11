package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.BloodGroups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.bloodgroups.BloodGroupService;
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
@RequestMapping("bloodgroup")
public class BloodGroupController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BloodGroupController.class);
    private final BloodGroupService bloodGroupService;

    @Inject
    public BloodGroupController(final BloodGroupService bloodGroupService) {
        this.bloodGroupService = bloodGroupService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final BloodGroups bloodgroups){
        return bloodGroupService.Add(bloodgroups.getName(),bloodgroups.getDescription(),bloodgroups.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final BloodGroups bloodgroups){
        return bloodGroupService.Update(bloodgroups.getBloodGroupId(), bloodgroups.getName(), bloodgroups.getDescription(),
                bloodgroups.getModifiedBy(),bloodgroups.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return bloodGroupService.getList();
    }

}