package com.sastabackend.controller;

import com.sastabackend.domain.Countries;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.service.countries.CountriesService;
import com.sastabackend.service.state.StatesService;
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
@RequestMapping("countries")
public class CountriesController {


    private static final Logger LOGGER = LoggerFactory.getLogger(CountriesController.class);
    private final CountriesService countriesService;

    @Inject
    public CountriesController(final CountriesService countriesService) {
        this.countriesService = countriesService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestBody @Valid final Countries countries){
        return countriesService.Add(countries.getName(),countries.getDescription(),countries.getCountryCode(),
                countries.getShortName(),countries.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestBody @Valid final Countries countries){
        return countriesService.Update(countries.getCountryId(), countries.getName(), countries.getDescription(),
                countries.getCountryCode(), countries.getShortName(), countries.getModifiedBy(),
                countries.getStatus());
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return countriesService.getList();
    }

}
