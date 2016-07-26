package com.sastabackend.controller;

import com.sastabackend.domain.PageConfig;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.page.PageServiceImpl;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by Sarvaratchagan on 7/20/2016.
 */
@RestController
@RequestMapping("/api/pageconfig")
public class PageConfigController {


    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final PageServiceImpl pageconfigService;

    @Inject
    public PageConfigController(final PageServiceImpl pageconfigService) {
        this.pageconfigService = pageconfigService;
    }

    @ApiOperation(value = "Create Config System", response = ResponseModel.class, httpMethod = "POST")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody final PageConfig config)  {
        return pageconfigService.Add(config);
    }

    @ApiOperation(value = "Update Config System", response = ResponseModel.class, httpMethod = "POST")
    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody final  PageConfig config) {
        return pageconfigService.Update(config);
    }

    @ApiOperation(value = "Read Config System List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return pageconfigService.Select();
    }


}
