package com.sastabackend.controller;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.VillagePanchayats;
import com.sastabackend.service.block.BlockService;
import com.sastabackend.service.villagepanchayats.VillagePanchayatsService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 18/Nov/2015.
 */
@RestController
@RequestMapping("/api/vp")
public class VpController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BlockController.class);

    @Autowired
    private VillagePanchayatsService villagepanchayatsService;
    @Inject
    public VpController(final VillagePanchayatsService villagepanchayatsService) {
        this.villagepanchayatsService = villagepanchayatsService;
    }

    @ApiOperation(value = "Create Village Panchayats", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/addvillagepanchayat", method = RequestMethod.POST)
    public ResponseModel AddBlock(@ModelAttribute final VillagePanchayats vp){
        return  villagepanchayatsService.Add(vp.getName(),vp.getAuditBlockId(),vp.getVpCode(),vp.getDescription(),
                vp.getCreatedBy());
    }

    @ApiOperation(value = "Update  Village Panchayats", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updatevillagepanchayat", method = RequestMethod.POST)
    public ResponseModel UpdateBlock(@ModelAttribute final VillagePanchayats vp){
        return  villagepanchayatsService.Update(vp.getId(),vp.getName(),vp.getAuditBlockId(),vp.getVpCode(),vp.getDescription(),
                vp.getModifiedBy(),vp.getStatus());
    }

    @ApiOperation(value = "Read Village Panchayats", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/vplist", method = RequestMethod.GET)
    public ResponseModel getBlockList(){
        return  villagepanchayatsService.getList();
    }
}
