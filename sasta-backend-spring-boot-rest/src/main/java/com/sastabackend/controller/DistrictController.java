package com.sastabackend.controller;

import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.districts.DistrictsService;
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
@RequestMapping("districts")
public class DistrictController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DistrictController.class);
    private final DistrictsService districtsService;

    @Inject
    public DistrictController(final DistrictsService districtsService) {
        this.districtsService = districtsService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final Districts districts){
        return districtsService.Add(districts.getName(),districts.getAuditStateId(),
                districts.getDescription(),districts.getDistrictCode(),districts.getShortName(),districts.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final Districts districts){
        return districtsService.Update(districts.getDistrictID(), districts.getName(), districts.getAuditStateId(),
                districts.getDescription(), districts.getDistrictCode(), districts.getShortName(), districts.getModifiedBy());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel ListDistricts(){
        return districtsService.getList();
    }
}
