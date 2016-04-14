package com.sastabackend.controller;

import com.sastabackend.domain.Deviation;
import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.deviation.DeviationService;
import com.sastabackend.service.grievances.GrievancesServices;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import  com.sastabackend.util.TextUtil;
/**
 * Created by SARVA on 27/Dec/2015.
 */
@RestController
@RequestMapping("/api/grievances")
public class GrievancesController {


    private static final Logger LOGGER = LoggerFactory.getLogger(DeviationController.class);
    private final GrievancesServices grievancesService;

    @Inject
    public GrievancesController(final GrievancesServices grievancesService) {
        this.grievancesService = grievancesService;
    }

    @ApiOperation(value = "Create Grievances", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody Grievances gv) {
        return grievancesService.Add(gv);
    }

    @ApiOperation(value = "Update Grievances", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody Grievances dv) {
        return grievancesService.Update(dv);
    }

    @ApiOperation(value = "Read Grievances List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam(value = "userid", required = false, defaultValue = "") Long userid,
                                 @RequestParam(value = "key", required = false, defaultValue = "") String key) {
        CryptoUtil crypt = new CryptoUtil();
        Long value = 0L;
        try {
            //LOGGER.debug("user id  : {}", userid);
            //LOGGER.debug("key  : {}", key);    
            key = TextUtil.DecodeString(key); 
            //LOGGER.debug("key  : {}", key);        
            value = Long.valueOf(key).longValue();
        }catch (Exception err){
            // do nothing
        }
        return grievancesService.findAll(userid, value);
    }

    @ApiOperation(value = "Read Grievances By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getgrievances", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return grievancesService.findOne(id);
    }

    @ApiOperation(value = "Read All Grievances based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/grievancesreports", method = RequestMethod.POST)
    public ResponseModel getGrievancesReports(@RequestBody ReportsProperty prop) {
        return grievancesService.getGrievancesReports(prop);
    }
}
