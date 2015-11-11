package com.sastabackend.controller;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.expenditure.ExpenditureService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.sql.Date;

/**
 * Created by SARVA on 10/Nov/2015.
 */
@RestController
@RequestMapping("expenditure")
public class ExpenditureController {



    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final ExpenditureService expenditureService;

    @Inject
    public ExpenditureController(final ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public ResponseModel Create(@RequestParam("auditid") Long auditid,@RequestParam("visitedvillagecount")  Integer visitedvillagecount,@RequestParam("appreceivedcount")  Integer appreceivedcount,
                                @RequestParam("attendedappcount") Integer attendedappcount,@RequestParam("refreshmentcharges")  BigDecimal refreshmentcharges,@RequestParam("selectedvrpcount")  Integer selectedvrpcount,
                                @RequestParam("paidedamount") BigDecimal paidedamount,@RequestParam("photographycharges")  BigDecimal photographycharges,@RequestParam("videoscharges")  BigDecimal videoscharges,
                                @RequestParam("ppleaf_lets") BigDecimal ppleaf_lets,@RequestParam("stationaries")  BigDecimal stationaries,@RequestParam("othersvalue")  BigDecimal othersvalue,
                                @RequestParam("createdby") Long createdby) {
        return expenditureService.Add(auditid, visitedvillagecount, appreceivedcount,
                attendedappcount, refreshmentcharges, selectedvrpcount,
                paidedamount, photographycharges, videoscharges,
                ppleaf_lets, stationaries, othersvalue,
                createdby);
    }

    public ResponseModel Add(@RequestParam("model")Expenditure ex){
        return expenditureService.Add(ex.getAuditId(),ex.getVisitedVillageCount(),ex.getAppReceivedCount(),
                ex.getAttendedAppCount(),ex.getRefreshmentCharges(),ex.getSelectedVrpCount(),ex.getPaidedAmount(),
                ex.getPhotographyCharges(),ex.getVideosCharges(),ex.getPpleafLets(),ex.getStationary(),
                ex.getOthers(),ex.getCreatedBy());
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ResponseModel Update(@RequestParam("expenditureid") Long expenditureid,@RequestParam("auditid")  Long auditid,@RequestParam("visitedvillagecount")  Integer visitedvillagecount,@RequestParam("appreceivedcount")  Integer appreceivedcount,
                                @RequestParam("attendedappcount") Integer attendedappcount,@RequestParam("refreshmentcharges")  BigDecimal refreshmentcharges,@RequestParam("selectedvrpcount")  Integer selectedvrpcount,
                                @RequestParam("paidedamount") BigDecimal paidedamount,@RequestParam("photographycharges")  BigDecimal photographycharges,@RequestParam("videoscharges")  BigDecimal videoscharges,
                                @RequestParam("ppleaf_lets") BigDecimal ppleaf_lets,@RequestParam("stationaries")  BigDecimal stationaries,@RequestParam("othersvalue")  BigDecimal othersvalue,@RequestParam("modifyby")  Long modifyby,
                                @RequestParam("isactive") Boolean isactive) {
        return expenditureService.Update(expenditureid, auditid, visitedvillagecount, appreceivedcount,
                attendedappcount, refreshmentcharges, selectedvrpcount,
                paidedamount, photographycharges, videoscharges,
                ppleaf_lets, stationaries, othersvalue, modifyby,
                isactive);
    }

    @RequestMapping(value = "/getexpenditurelist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return expenditureService.findAll();
    }

    @RequestMapping(value = "/getexpenditure", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return expenditureService.findOne(id);
    }

}
