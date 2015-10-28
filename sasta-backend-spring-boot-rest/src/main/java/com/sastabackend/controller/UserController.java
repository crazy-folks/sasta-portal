package com.sastabackend.controller;

import com.sastabackend.service.exception.UserAlreadyExistsException;
import com.sastabackend.domain.Users;
import com.sastabackend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Inject
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public Users createUser(@RequestBody @Valid final Users users) {
        LOGGER.debug("Received request to create the {}", users);
        return userService.save(users);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<Users> listUsers() {
        LOGGER.debug("Received request to list all users");
        return userService.getList();
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return e.getMessage();
    }

}
