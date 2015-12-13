package com.sastabackend.controller;

import com.sastabackend.domain.GradeLookups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.gradelookups.GradeLookupsService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@RestController
@RequestMapping("/api/gradelookups")
public class GradeLookupsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GradeLookupsController.class);
    private final GradeLookupsService gradelookupsService;

    @Inject
    public GradeLookupsController(final GradeLookupsService gradelookupsService) {
        this.gradelookupsService = gradelookupsService;
    }

    @ApiOperation(value = "Create Grade Lookups", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final GradeLookups gradelookups){
        return gradelookupsService.Add(gradelookups.getName(),gradelookups.getDescription(),gradelookups.getCreatedBy());
    }

    @ApiOperation(value = "Update Grade Lookups", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final GradeLookups gradelookups){
        return gradelookupsService.Update(gradelookups.getId(), gradelookups.getName(), gradelookups.getDescription(),
                gradelookups.getModifiedBy(),gradelookups.getStatus());
    }

    @ApiOperation(value = "Read Grade Lookups", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return gradelookupsService.getList();
    }

}
