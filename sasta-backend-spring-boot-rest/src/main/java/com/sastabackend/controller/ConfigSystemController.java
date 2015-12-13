package com.sastabackend.controller;

import com.sastabackend.domain.ConfigSystem;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.common.CommonServiceImpl;
import com.sastabackend.service.vrpdetails.VrpDetailsService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.math.BigDecimal;

/**
 * Created by SARVA on 13/Nov/2015.
 */
@RestController
@RequestMapping("/api/configsystem")
public class ConfigSystemController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final CommonServiceImpl configsystemService;

    @Inject
    public ConfigSystemController(final CommonServiceImpl configsystemService) {
        this.configsystemService = configsystemService;
    }

    @ApiOperation(value = "Create Config System", response = ResponseModel.class, httpMethod = "POST")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@ModelAttribute final ConfigSystem config)  {
        return configsystemService.Add(config);
    }

    @ApiOperation(value = "Update Config System", response = ResponseModel.class, httpMethod = "POST")
    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final  ConfigSystem config) {
        return configsystemService.Update(config);
    }

    @ApiOperation(value = "Read Config System List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return configsystemService.Select();
    }


}
