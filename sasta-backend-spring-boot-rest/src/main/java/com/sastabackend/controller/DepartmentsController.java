package com.sastabackend.controller;

import com.sastabackend.domain.BloodGroups;
import com.sastabackend.domain.Departments;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.bloodgroups.BloodGroupService;
import com.sastabackend.service.departments.DepartmentsService;
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
@RequestMapping("/api/departments")
public class DepartmentsController {


    private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentsController.class);
    private final DepartmentsService departmentsService;

    @Inject
    public DepartmentsController(final DepartmentsService departmentsService) {
        this.departmentsService = departmentsService;
    }

    @ApiOperation(value = "Create Departments", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Departments departments){
        return departmentsService.Add(departments.getName(),departments.getDescription(),departments.getCreatedBy());
    }

    @ApiOperation(value = "Update Departments", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Departments departments){
        return departmentsService.Update(departments.getId(), departments.getName(), departments.getDescription(),
                departments.getModifiedBy(),departments.getStatus());
    }

    @ApiOperation(value = "Read Departments List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return departmentsService.getList();
    }

}