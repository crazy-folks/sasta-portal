package com.sastabackend.controller;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SpecialGramaSabha;
import com.sastabackend.service.expenditure.ExpenditureService;
import com.sastabackend.service.specialgramasabha.SpecialGramaSabhaService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

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
    public ResponseModel Add(@ModelAttribute final SpecialGramaSabha sp){
        LOGGER.debug("Creating  Special Grama Sabha : {}", sp.getAuditId(),sp.getTotalPopulation(),sp.getTotalFamiliesInVpts(),
                sp.getNoOfFamiliesRegistered(),sp.getTotalJcsInVpts(),sp.getNoOfPplAttentedSgs(),sp.getNameOfPersonHeadSgs(),
                sp.getNameOfPersonRecordedMinutes(),sp.getTotalParasPlacedInSgs(),sp.getParasSetteled(),sp.getAmountRecoveredDuringSgs(),
                sp.getSaReportsUploaded(),sp.getAtrsUploaded(),sp.getCreatedBy());
        return specialgramasabhaService.Add(sp.getAuditId(),sp.getTotalPopulation(),sp.getTotalFamiliesInVpts(),
                sp.getNoOfFamiliesRegistered(),sp.getTotalJcsInVpts(),sp.getNoOfPplAttentedSgs(),sp.getNameOfPersonHeadSgs(),
                sp.getNameOfPersonRecordedMinutes(),sp.getTotalParasPlacedInSgs(),sp.getParasSetteled(),sp.getAmountRecoveredDuringSgs(),
                sp.getSaReportsUploaded(),sp.getAtrsUploaded(),sp.getCreatedBy());
    }

    @ApiOperation(value = "Update Special Grama Sabha", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@ModelAttribute final SpecialGramaSabha sp){
        LOGGER.debug("Updating  Special Grama Sabha : {}", sp.getId(), sp.getAuditId(), sp.getTotalPopulation(), sp.getTotalFamiliesInVpts(),
                sp.getNoOfFamiliesRegistered(), sp.getTotalJcsInVpts(), sp.getNoOfPplAttentedSgs(), sp.getNameOfPersonHeadSgs(),
                sp.getNameOfPersonRecordedMinutes(), sp.getTotalParasPlacedInSgs(), sp.getParasSetteled(), sp.getAmountRecoveredDuringSgs(),
                sp.getSaReportsUploaded(),sp.getAtrsUploaded(),sp.getModifiedBy(),sp.getStatus());
        return specialgramasabhaService.Update(sp.getId(), sp.getAuditId(), sp.getTotalPopulation(), sp.getTotalFamiliesInVpts(),
                sp.getNoOfFamiliesRegistered(), sp.getTotalJcsInVpts(), sp.getNoOfPplAttentedSgs(), sp.getNameOfPersonHeadSgs(),
                sp.getNameOfPersonRecordedMinutes(), sp.getTotalParasPlacedInSgs(), sp.getParasSetteled(), sp.getAmountRecoveredDuringSgs(),
                sp.getSaReportsUploaded(),sp.getAtrsUploaded(),sp.getModifiedBy(),sp.getStatus());
    }


    @ApiOperation(value = "Read Special Grama List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getspecialgramasabhalist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return specialgramasabhaService.findAll();
    }

    @ApiOperation(value = "Read Special Grama BY ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getspecialgramasabha", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return specialgramasabhaService.findOne(id);
    }
}
