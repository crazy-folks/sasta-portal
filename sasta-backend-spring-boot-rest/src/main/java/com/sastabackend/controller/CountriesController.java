package com.sastabackend.controller;

import com.sastabackend.domain.Countries;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.service.countries.CountriesService;
import com.sastabackend.service.state.StatesService;
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
@RequestMapping("/api/countries")
public class CountriesController {


    private static final Logger LOGGER = LoggerFactory.getLogger(CountriesController.class);
    private final CountriesService countriesService;

    @Inject
    public CountriesController(final CountriesService countriesService) {
        this.countriesService = countriesService;
    }


    @ApiOperation(value = "Create Countries", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final Countries countries){
        return countriesService.Add(countries.getName(),countries.getDescription(),countries.getCountryCode(),
                countries.getShortName(),countries.getCreatedBy());
    }

    @ApiOperation(value = "Update Countries", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final Countries countries){
        return countriesService.Update(countries.getCountryId(), countries.getName(), countries.getDescription(),
                countries.getCountryCode(), countries.getShortName(), countries.getModifiedBy(),
                countries.getStatus());
    }

    @ApiOperation(value = "Read Countries List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return countriesService.getList();
    }

}
