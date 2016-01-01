package com.sastabackend.controller;

import com.sastabackend.domain.Audit;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.audit.AuditService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.sql.Date;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@RestController
@RequestMapping("/api/audit")
public class AuditController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final AuditService auditService;

    @Inject
    public AuditController(final AuditService auditService) {
        this.auditService = auditService;
    }

    @ApiOperation(value = "Create Audit", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody Audit ac) {
        return auditService.Add(ac.getRoundId(), ac.getStartDate(), ac.getEndDtate(),
                ac.getGramaSabhaDate(), ac.getAuditDistrictId(),
                ac.getAuditBlockId(), ac.getVillagePanchayatId(), ac.getCreatedBy());
    }

    @ApiOperation(value = "Update Audit", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody Audit ac) {
        return auditService.Update(ac.getAuditId(), ac.getRoundId(), ac.getStartDate(), ac.getEndDtate(),
                ac.getGramaSabhaDate(), ac.getAuditDistrictId(),
                ac.getAuditBlockId(), ac.getVillagePanchayatId(), ac.getModifiedBy(), ac.getStatus());
    }

    @ApiOperation(value = "Read Audit List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return auditService.findAll();
    }

    @ApiOperation(value = "Read Audit Data by ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getaudit", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return auditService.findOne(id);
    }

    @ApiOperation(value = "Find the audit entry already exist or not", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/doesexistaudit", method = RequestMethod.GET)
    public ResponseModel doesExistAudit(@RequestParam("rounid") Long rounid,@RequestParam("districtid") Integer districtid,
                                        @RequestParam("blockid") Integer blockid,@RequestParam("panchayatid") Integer panchayatid) {
        return auditService.DoesExistAuditEntry(rounid,districtid,blockid,panchayatid);
    }
}
