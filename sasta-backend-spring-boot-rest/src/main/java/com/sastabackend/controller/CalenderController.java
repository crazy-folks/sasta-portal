package com.sastabackend.controller;

import com.sastabackend.domain.*;
import com.sastabackend.service.calender.SastaCalenderService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.*;

/**
 * Created by Sarvaratchagan on 08-07-2016.
 */
@RestController
@RequestMapping("/api/calender")
public class CalenderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExportController.class);
    private SastaCalenderService service ;

    @Inject
    public CalenderController(SastaCalenderService service){
        this.service = service;
    }

    @ApiOperation(value = "Create sasta calender", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/createsastacalender", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody SastaCalender cl) {
        return service.AddSastaCalender(cl);
    }

    @ApiOperation(value = "Update Sasta Calender", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updatesastacalender", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody SastaCalender cl) {
        return service.UpdateSastaCalender(cl);
    }

    @ApiOperation(value = "Read Sasta Calender", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/sastacalenderlist", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel getList() {
        return service.findAll();
    }

    @ApiOperation(value = "Read sasta calender by ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getsastacalender", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        return service.findOne(id);
    }

    @ApiOperation(value = "Delete sasta calender by ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deletesastacalender", method = RequestMethod.GET)
    public ResponseModel Delete(@RequestParam("id") Long id) {
        return service.DeleteSastaCalender(id);
    }

    @ApiOperation(value = "Read Detailed Sasta Calender", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/detailedsastacalender", method = RequestMethod.GET)
    public ResponseModel GetDetailedSastaCalender(@RequestParam("id") Long id) {
        return service.GetDetailedCalender(id);
    }

    @ApiOperation(value = "Create sasta calender", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/createdetailedsastacalender", method = RequestMethod.POST)
    public ResponseModel CreateDetailedSastaCalender(@RequestBody DetailedSastaCalender cl) {
        return service.AddDetailedCalender(cl);
    }

    @ApiOperation(value = "update detailed sasta calender", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updatedetailedsastacalender", method = RequestMethod.POST)
    public ResponseModel UpdateDetailedSastaCalender(@RequestBody DetailedSastaCalender cl) {
        return service.UpdateDetailedCalender(cl);
    }

    @ApiOperation(value = "delete Detailed Sasta Calender", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deletedetailedsastacalender", method = RequestMethod.GET)
    public ResponseModel DeleteDetailedSastaCalender(@RequestParam("id") Long id) {
        return service.DeleteDetailedCalender(id);
    }

}
