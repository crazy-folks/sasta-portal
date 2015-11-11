package com.sastabackend.controller;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.block.BlockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

/**
 * Created by SARVA on 07/Nov/2015.
 */
@RestController
@RequestMapping("block")
public class BlockController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BlockController.class);

    @Autowired
    private BlockService blockService;
    @Inject
    public BlockController(final BlockService blockService) {
        this.blockService = blockService;
    }

    @RequestMapping(value = "/addblock", method = RequestMethod.POST)
    public ResponseModel AddBlock(@RequestBody final Blocks block){
       return  blockService.Add(block.getBlockName(),block.getDistrictID(),block.getCreatedBy());
    }

    @RequestMapping(value = "/updateblock", method = RequestMethod.POST)
    public ResponseModel UpdateBlock(@RequestBody final Blocks block){
        return  blockService.Update(block.getBlockID(), block.getBlockName(), block.getDistrictID(), block.getModifiedBy());
    }

    @RequestMapping(value = "/blocklist", method = RequestMethod.GET)
    public ResponseModel getBlockList(){
        return  blockService.getList();
    }

}
