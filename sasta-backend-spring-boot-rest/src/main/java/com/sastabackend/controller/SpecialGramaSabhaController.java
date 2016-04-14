package com.sastabackend.controller;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SpecialGramaSabha;
import com.sastabackend.service.expenditure.ExpenditureService;
import com.sastabackend.service.specialgramasabha.SpecialGramaSabhaService;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import  com.sastabackend.util.TextUtil;
/**
 * Created by SARVA on 12/Nov/2015.
 */
@RestController
@RequestMapping("/api/specialgramasabha")
public class SpecialGramaSabhaController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpecialGramaSabhaController.class);
    private final SpecialGramaSabhaService specialgramasabhaService;

    @Inject
    public SpecialGramaSabhaController(final SpecialGramaSabhaService specialgramasabhaService) {
        this.specialgramasabhaService = specialgramasabhaService;
    }

    @ApiOperation(value = "Create Special Grama Sabha", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Add(@RequestBody final SpecialGramaSabha sp){
        return specialgramasabhaService.Add(sp);
    }

    @ApiOperation(value = "Update Special Grama Sabha", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody final SpecialGramaSabha sp){
        return specialgramasabhaService.Update(sp);
    }


    @ApiOperation(value = "Read Special Grama List", response = ResponseModel.class, httpMethod = "GET")
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
        return specialgramasabhaService.findAll(userid, value);
    }

    @ApiOperation(value = "Read Special Grama BY ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getspecialgramasabha", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return specialgramasabhaService.findOne(id);
    }

    @ApiOperation(value = "Read All Special Grama Sabha based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/specialgramasabhareports", method = RequestMethod.POST)
    public ResponseModel getSpecialGramaSabhaReports(@RequestBody ReportsProperty prop) {
        return specialgramasabhaService.getSpecialGramaSabhaReports(prop);
    }
}
