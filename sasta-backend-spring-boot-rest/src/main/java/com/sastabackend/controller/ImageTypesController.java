package com.sastabackend.controller;

import com.sastabackend.domain.ImageTypes;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.imagetypes.ImageTypesService;
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
@RequestMapping("imagetypes")
public class ImageTypesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImageTypesController.class);
    private final ImageTypesService imagetypesService;

    @Inject
    public ImageTypesController(final ImageTypesService imagetypesService) {
        this.imagetypesService = imagetypesService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final ImageTypes imagetypes){
        return imagetypesService.Add(imagetypes.getName(),imagetypes.getDescription(),imagetypes.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final ImageTypes imagetypes){
        return imagetypesService.Update(imagetypes.getId(), imagetypes.getName(), imagetypes.getDescription(),
                imagetypes.getModifiedBy(),imagetypes.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return imagetypesService.getList();
    }

}
