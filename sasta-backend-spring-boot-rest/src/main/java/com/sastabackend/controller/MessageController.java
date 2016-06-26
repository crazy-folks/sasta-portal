package com.sastabackend.controller;

import com.sastabackend.domain.Messages;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.messages.MessagesService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by Sarvaratchagan on 19-06-2016.
 */

@RestController
@RequestMapping("/api/message")
public class MessageController {


    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);
    private final MessagesService messageService;

    @Inject
    public MessageController(final MessagesService messageService) {
        this.messageService = messageService;
    }

    @ApiOperation(value = "Create message Works", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody Messages message) {
        return messageService.Add(message);
    }

    @ApiOperation(value = "Update message Works", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody Messages message) {
        return messageService.Update(message);
    }

    @ApiOperation(value = "Read message List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return messageService.findAll();
    }

    @ApiOperation(value = "Read message by id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getmessagebyid", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return messageService.findOne(id);
    }

    @ApiOperation(value = "delete message by id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deletemessage", method = RequestMethod.GET)
    public ResponseModel DeleteMessage(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return messageService.Delete(id);
    }

}
