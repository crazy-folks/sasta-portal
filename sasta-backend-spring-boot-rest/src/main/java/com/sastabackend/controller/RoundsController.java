package com.sastabackend.controller;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.rounds.RoundsService;
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
@RequestMapping("/api/rounds")
public class RoundsController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final RoundsService roundsService;

    @Inject
    public RoundsController(final RoundsService roundsService) {
        this.roundsService = roundsService;
    }

    @ApiOperation(value = "Create Rounds", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestParam("name") String name,@RequestParam("referenceid")  Integer reference_id,
                                @RequestParam("startdate")  java.sql.Date start_date,@RequestParam("enddate")  java.sql.Date end_date,
                                @RequestParam("description") String description,@RequestParam("created_by")  Long created_by){
        return roundsService.Add(name, reference_id, start_date, end_date,
                description, created_by);
    }

    @ApiOperation(value = "Update Rounds", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestParam("id") Long id,@RequestParam("name") String name,@RequestParam("referenceid")  Integer reference_id,
                                @RequestParam("startdate") java.sql.Date start_date,@RequestParam("enddate")  java.sql.Date end_date,
                                @RequestParam("description") String description,@RequestParam("modifiedby")  Long modified_by,
                                @RequestParam("isactive") Boolean is_active){
        return roundsService.Update(id, name, reference_id, start_date, end_date,
                description, modified_by, is_active);
    }

    @ApiOperation(value = "Read Rounds List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(){
        return roundsService.findAll();
    }

    @ApiOperation(value = "Read Rounds By ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getround", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id){
        return roundsService.findOne(id);
    }

}
