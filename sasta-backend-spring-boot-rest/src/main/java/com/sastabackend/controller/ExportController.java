package com.sastabackend.controller;

import com.sastabackend.domain.ResponseModel;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;

/**
 * Created by Sarvaratchagan on 07-07-2016.
 */
@RestController
@RequestMapping("/api/export")
public class ExportController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExportController.class);

    //@Inject
    public ExportController(){
    }


    @ApiOperation(value = "The kendo.saveAs will attempt to save the file using client-side API in browsers that support file creation (IE10+, Google Chrome and FireFox).", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody
    void save(String fileName, String base64, String contentType, HttpServletResponse response) throws IOException {

        LOGGER.debug("File name : {0}",fileName);
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);


        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }

    @ApiOperation(value = "The kendo.saveAs will attempt to save the file using client-side API in browsers that support file creation (IE10+, Google Chrome and FireFox).", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/exportexcel", method = RequestMethod.GET)
    public @ResponseBody
    void exportExcel(String fileName, String base64, String contentType, HttpServletResponse response) throws IOException {

        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);

        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }


}
