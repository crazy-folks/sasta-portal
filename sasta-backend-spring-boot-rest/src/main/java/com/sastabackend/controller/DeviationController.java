package com.sastabackend.controller;

import com.sastabackend.domain.Deviation;
import com.sastabackend.domain.MisAppropriation;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.deviation.DeviationService;
import com.sastabackend.service.misappropriation.MisAppropriationService;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import  com.sastabackend.util.TextUtil;
/**
 * Created by SARVA on 26/Dec/2015.
 */
@RestController
@RequestMapping("/api/deviation")
public class DeviationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviationController.class);
    private final DeviationService deviationService;

    @Inject
    public DeviationController(final DeviationService deviationService) {
        this.deviationService = deviationService;
    }

    @ApiOperation(value = "Create Deviation", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody Deviation dv) {
        return deviationService.Add(dv);
    }

    @ApiOperation(value = "Update Deviation", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody Deviation dv) {
        return deviationService.Update(dv);
    }

    @ApiOperation(value = "Read Deviation List", response = ResponseModel.class, httpMethod = "GET")
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
        return deviationService.findAll(userid, value);
    }

    @ApiOperation(value = "Read Deviation By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getdeviation", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return deviationService.findOne(id);
    }

    @ApiOperation(value = "Read All Deviations based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/deviationsreports", method = RequestMethod.POST)
    public ResponseModel getDeviationsReports(@RequestBody ReportsProperty prop) {
        return deviationService.getDeviationsReports(prop);
    }

    @ApiOperation(value = "Read All Deviation Record Produced Reports based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/deviationrecordproducedreports", method = RequestMethod.POST)
    public ResponseModel getDeviationRecordProducedReports(@RequestBody ReportsProperty prop) {
        return deviationService.getDeviationRecordProducedReports(prop);
    }

    @ApiOperation(value = "Read All Deviation Record Not Produced based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/deviationrecordnotproducedreports", method = RequestMethod.POST)
    public ResponseModel getDeviationRecordNotProducedReports(@RequestBody ReportsProperty prop) {
        return deviationService.getDeviationRecordNotProducedReports(prop);
    }

}
