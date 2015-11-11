package com.sastabackend.controller;

import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.audit.AuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.sql.Date;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@RestController
@RequestMapping("audit")
public class AuditController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final AuditService auditService;

    @Inject
    public AuditController(final AuditService auditService) {
        this.auditService = auditService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestParam("roundid") Long roundid, @RequestParam("startdate") Date startdate, @RequestParam("enddate") Date enddate,
                                @RequestParam("gramasabhadate") Date gramasabhadate, @RequestParam("districtid") Integer district_id,
                                @RequestParam("blockid") Integer block_id, @RequestParam("panchayatid") Integer panchayat_id,
                                @RequestParam("createdby") Long createdby) {
        return auditService.Add(roundid, startdate, enddate, gramasabhadate, district_id, block_id, panchayat_id, createdby);
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestParam("auditid") Long auditid, @RequestParam("roundid") Long roundid, @RequestParam("startdate") Date startdate,
                                @RequestParam("enddate") Date enddate, @RequestParam("gramasabhadate") Date gramasabhadate, @RequestParam("districtid") Integer district_id,
                                @RequestParam("blockid") Integer block_id, @RequestParam("panchayatid") Integer panchayat_id, @RequestParam("modifyby") Long modifyby,
                                @RequestParam("isactive") Boolean isactive) {
        return auditService.Update(auditid, roundid, startdate, enddate, gramasabhadate, district_id, block_id, panchayat_id,
                modifyby, isactive);
    }

    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return auditService.findAll();
    }

    @RequestMapping(value = "/getaudit", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return auditService.findOne(id);
    }
}
