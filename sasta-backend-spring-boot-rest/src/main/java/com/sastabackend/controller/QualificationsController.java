package com.sastabackend.controller;

import com.sastabackend.domain.ImageTypes;
import com.sastabackend.domain.Qualifications;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.qualifications.QualificationsService;
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
@RequestMapping("qualifications")
public class QualificationsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(QualificationsController.class);
    private final QualificationsService qualificationsService;

    @Inject
    public QualificationsController(final QualificationsService qualificationsService) {
        this.qualificationsService = qualificationsService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final Qualifications qualifications){
        return qualificationsService.Add(qualifications.getName(),qualifications.getDescription(),qualifications.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final Qualifications qualifications){
        return qualificationsService.Update(qualifications.getId(), qualifications.getName(), qualifications.getDescription(),
                qualifications.getModifiedBy(),qualifications.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return qualificationsService.getList();
    }

}
