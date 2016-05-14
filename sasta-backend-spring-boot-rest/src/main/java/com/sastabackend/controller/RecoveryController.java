package com.sastabackend.controller;

import com.sastabackend.domain.Recovery;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.recovery.RecoveryService;
import com.sastabackend.util.CryptoUtil;
import com.sastabackend.util.TextUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 15/May/2016.
 */
@RestController
@RequestMapping("/api/recovery")
public class RecoveryController {


    private static final Logger LOGGER = LoggerFactory.getLogger(RecoveryController.class);
    private final RecoveryService recoveryService;

    @Inject
    public RecoveryController(final RecoveryService recoveryService) {
        this.recoveryService = recoveryService;
    }


    @ApiOperation(value = "Create recovery", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Add(@RequestBody final Recovery rc){
        return recoveryService.Add(rc);
    }

    @ApiOperation(value = "Update recovery", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody final Recovery rc){
        return recoveryService.Update(rc);
    }


    @ApiOperation(value = "Read recovery List", response = ResponseModel.class, httpMethod = "GET")
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
        return recoveryService.findAll(userid, value);
    }

    @ApiOperation(value = "Read recovery BY ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getrecovery", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return recoveryService.findOne(id);
    }

    @ApiOperation(value = "Read All recovery based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/recoveryreports", method = RequestMethod.POST)
    public ResponseModel getRecoveryReports(@RequestBody ReportsProperty prop) {
        return recoveryService.getRecoveryReports(prop);
    }

}
