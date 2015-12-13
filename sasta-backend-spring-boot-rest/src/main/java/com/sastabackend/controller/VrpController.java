package com.sastabackend.controller;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.vrpdetails.VrpDetailsService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.math.BigDecimal;

/**
 * Created by SARVA on 11/Nov/2015.
 */
@RestController
@RequestMapping("/api/vrp")
public class VrpController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final VrpDetailsService vrpdetailsService;

    @Inject
    public VrpController(final VrpDetailsService vrpdetailsService) {
        this.vrpdetailsService = vrpdetailsService;
    }



    @ApiOperation(value = "Create VRP", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestParam("auditid") Long auditid,@RequestParam("vrpname") String vrpname,@RequestParam("genderid") Integer genderid,
                                @RequestParam("villagepanchayatid") Integer villagepanchayatid,@RequestParam("jcno") String jcno,
                                @RequestParam("guardianname") String guardianname,@RequestParam("qualificationid") Integer qualificationid,
                                @RequestParam("communityid") Integer communityid,@RequestParam("contactno") String contactno,
                                @RequestParam("totaldays") Integer totaldays,@RequestParam("paidamount") BigDecimal paidamount,@RequestParam("paymode") Integer paymode,
                                @RequestParam("bankid") Integer bankid,@RequestParam("accno") String accno,
                                @RequestParam("ifsccode") String ifsccode,@RequestParam("gradeid") Integer gradeid,@RequestParam("createdby") Long createdby)  {
        return vrpdetailsService.Add(auditid, vrpname, genderid, villagepanchayatid, jcno,
                guardianname, qualificationid, communityid, contactno,
                totaldays, paidamount, paymode, bankid, accno,
                ifsccode, gradeid, createdby);
    }

    @ApiOperation(value = "Update VRP", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestParam("vrpid") Long vrpid,@RequestParam("auditid") Long auditid,@RequestParam("vrpname") String vrpname,@RequestParam("genderid") Integer genderid,
                                @RequestParam("villagepanchayatid") Integer villagepanchayatid,@RequestParam("jcno") String jcno,
                                @RequestParam("guardianname") String guardianname,@RequestParam("qualificationid") Integer qualificationid,
                                @RequestParam("communityid") Integer communityid,@RequestParam("contactno") String contactno,
                                @RequestParam("totaldays") Integer totaldays,@RequestParam("paidamount") BigDecimal paidamount,@RequestParam("paymode") Integer paymode,
                                @RequestParam("bankid") Integer bankid,@RequestParam("accno") String accno,
                                @RequestParam("ifsccode") String ifsccode,@RequestParam("gradeid") Integer gradeid,@RequestParam("modifyby")  Long modifyby,
                                @RequestParam("isactive") Boolean isactive) {
        return vrpdetailsService.Update(vrpid, auditid, vrpname, genderid, villagepanchayatid,
                jcno, guardianname, qualificationid, communityid, contactno, totaldays, paidamount, paymode, bankid,
                accno, ifsccode,  gradeid, modifyby,  isactive);
    }

    @ApiOperation(value = "Read VRP details from server", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getvrpdetailslist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return vrpdetailsService.findAll();
    }

    @ApiOperation(value = "Read VRP details by ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getvrpdetails", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return vrpdetailsService.findOne(id);
    }
}
