package com.sastabackend.controller;

import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.districts.DistrictsService;
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
@RequestMapping("/api/districts")
public class DistrictController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DistrictController.class);
    private final DistrictsService districtsService;

    @Inject
    public DistrictController(final DistrictsService districtsService) {
        this.districtsService = districtsService;
    }

    @ApiOperation(value = "Create District", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Districts districts){
        return districtsService.Add(districts.getName(),districts.getAuditStateId(),
                districts.getDescription(),districts.getDistrictCode(),districts.getShortName(),districts.getCreatedBy());
    }

    @ApiOperation(value = "Update District", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Districts districts){
        return districtsService.Update(districts.getDistrictID(), districts.getName(), districts.getAuditStateId(),
                districts.getDescription(), districts.getDistrictCode(), districts.getShortName(), districts.getModifiedBy(),districts.getStatus());
    }

    @ApiOperation(value = "Read District List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel ListDistricts(){
        return districtsService.getList();
    }
}
