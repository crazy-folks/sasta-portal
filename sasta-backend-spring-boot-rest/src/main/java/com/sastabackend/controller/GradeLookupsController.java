package com.sastabackend.controller;

import com.sastabackend.domain.GradeLookups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.gradelookups.GradeLookupsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.validation.Valid;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@RestController
@RequestMapping("gradelookups")
public class GradeLookupsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GradeLookupsController.class);
    private final GradeLookupsService gradelookupsService;

    @Inject
    public GradeLookupsController(final GradeLookupsService gradelookupsService) {
        this.gradelookupsService = gradelookupsService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final GradeLookups gradelookups){
        return gradelookupsService.Add(gradelookups.getName(),gradelookups.getDescription(),gradelookups.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final GradeLookups gradelookups){
        return gradelookupsService.Update(gradelookups.getId(), gradelookups.getName(), gradelookups.getDescription(),
                gradelookups.getModifiedBy(),gradelookups.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return gradelookupsService.getList();
    }

}
