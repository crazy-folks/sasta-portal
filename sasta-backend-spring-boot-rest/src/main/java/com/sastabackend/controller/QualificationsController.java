package com.sastabackend.controller;

import com.sastabackend.domain.ImageTypes;
import com.sastabackend.domain.Qualifications;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.qualifications.QualificationsService;
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
@RequestMapping("/api/qualifications")
public class QualificationsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(QualificationsController.class);
    private final QualificationsService qualificationsService;

    @Inject
    public QualificationsController(final QualificationsService qualificationsService) {
        this.qualificationsService = qualificationsService;
    }

    @ApiOperation(value = "Create Qualifications", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Qualifications qualifications){
        return qualificationsService.Add(qualifications.getName(),qualifications.getDescription(),qualifications.getCreatedBy());
    }

    @ApiOperation(value = "Update Qualifications", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Qualifications qualifications){
        return qualificationsService.Update(qualifications.getId(), qualifications.getName(), qualifications.getDescription(),
                qualifications.getModifiedBy(),qualifications.getStatus());
    }

    @ApiOperation(value = "Read Qualifications", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return qualificationsService.getList();
    }

}
