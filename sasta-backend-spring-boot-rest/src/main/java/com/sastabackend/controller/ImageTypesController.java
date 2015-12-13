package com.sastabackend.controller;

import com.sastabackend.domain.ImageTypes;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.imagetypes.ImageTypesService;
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
@RequestMapping("/api/imagetypes")
public class ImageTypesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImageTypesController.class);
    private final ImageTypesService imagetypesService;

    @Inject
    public ImageTypesController(final ImageTypesService imagetypesService) {
        this.imagetypesService = imagetypesService;
    }

    @ApiOperation(value = "Create Image Types", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@ModelAttribute final ImageTypes imagetypes){
        return imagetypesService.Add(imagetypes.getName(),imagetypes.getDescription(),imagetypes.getCreatedBy());
    }

    @ApiOperation(value = "Update Image Types", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@ModelAttribute final ImageTypes imagetypes){
        return imagetypesService.Update(imagetypes.getId(), imagetypes.getName(), imagetypes.getDescription(),
                imagetypes.getModifiedBy(),imagetypes.getStatus());
    }

    @ApiOperation(value = "Read Image Types", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return imagetypesService.getList();
    }

}
