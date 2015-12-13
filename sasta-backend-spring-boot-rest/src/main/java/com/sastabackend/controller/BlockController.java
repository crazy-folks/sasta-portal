package com.sastabackend.controller;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.block.BlockService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by SARVA on 07/Nov/2015.
 */
@RestController
@RequestMapping("/api/block")
public class BlockController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BlockController.class);

    @Autowired
    private BlockService blockService;
    @Inject
    public BlockController(final BlockService blockService) {
        this.blockService = blockService;
    }

    @ApiOperation(value = "Create Block", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/addblock", method = RequestMethod.POST)
    public ResponseModel AddBlock(@ModelAttribute final Blocks block){
       return  blockService.Add(block.getBlockName(),block.getDistrictID(),block.getCreatedBy());
    }

    @ApiOperation(value = "Update Block", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updateblock", method = RequestMethod.POST)
    public ResponseModel UpdateBlock(@ModelAttribute final Blocks block){
        return  blockService.Update(block.getBlockID(), block.getBlockName(), block.getDistrictID(), block.getModifiedBy());
    }

    @ApiOperation(value = "Read Block List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/blocklist", method = RequestMethod.GET)
    public ResponseModel getBlockList(){
        return  blockService.getList();
    }

}
