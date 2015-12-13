package com.sastabackend.controller;

import com.sastabackend.domain.Lookup;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.LookupRepository;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by SARVA on 04/Nov/2015.
 */

@RestController
@RequestMapping("/api/lookup")
public class LookupController {

    @Autowired
    private LookupRepository lookup;

    @ApiOperation(value = "Read Lookup Data values", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping("getlookup")
    public List<Lookup> getUser(@RequestParam("id") int id) {
        return lookup.findLookupData(id);
    }
}
