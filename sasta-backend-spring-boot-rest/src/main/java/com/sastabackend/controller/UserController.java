package com.sastabackend.controller;

import com.sastabackend.domain.*;
import com.sastabackend.service.user.exception.UserAlreadyExistsException;
import com.sastabackend.service.user.UserService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Inject
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Create User", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Add(@RequestBody final Users users) {
        LOGGER.debug("Received request to create the {}", users);
        return userService.Add(users);
    }

    @ApiOperation(value = "Read Users List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public List<Users> listUsers(@RequestParam("id") String  id) {
        LOGGER.debug("Received request to list all users" + System.currentTimeMillis());
        return userService.getList(id);
    }

    @ApiOperation(value = "Sign in", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/signin", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel signIn(@RequestParam("email") String email,@RequestParam("password") String password){
        return userService.SignIn(email, password);
    }

    @ApiOperation(value = "Upload Avatar Image With Description", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/uploadavatarimages", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel AddAvatarWithDescription(@RequestBody AboutMe about){
        LOGGER.debug("Received Profile data " + about.toString());
        return userService.UpdateAvatarWithDescription(about.getImage(), about.getDescription(), about.getUserId());
    }

    @ApiOperation(value = "test upload", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/testupload", method = RequestMethod.POST)
    @ResponseBody
    public String testImage(@RequestBody AboutMe about){
        return about.toString();
    }

    @ApiOperation(value = "update basic user details", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updatebasicprofile", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel UpdateBasicProfile(@RequestBody BasicUserDetails profile){
        return userService.UpdateBasicUserDetails(profile);
    }

    @ApiOperation(value = "remove user current session", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/signout", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel signout(@RequestParam("sessionid") String sessionid){
        return userService.SignOut(sessionid);
    }

    @ApiOperation(value = "update current session", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updatesession", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel updatesession(@RequestParam("sessionid") String sessionid){
        return userService.UpdateSession(sessionid);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return e.getMessage();
    }

    @ApiOperation(value = "Reset password old one instead of new one", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/resetpassword", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel resetPassword(@RequestParam("UserId") Long userid,@RequestParam("OldPassword") String oldPassword,
                                       @RequestParam("NewPassword") String NewPassword,@RequestParam("ChangeReqBy") Boolean changedby){
        return userService.ChangePassword(userid, oldPassword, NewPassword, changedby);
    }


    @ApiOperation(value = "Change Password By Admin", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/resetpasswordbyadmin", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel ChangePasswordByAdmin(@RequestParam("UserId") Long userid,@RequestParam("ChangeReqBy") Boolean changedby){
        return userService.ChangePassword(userid, "sasta@123", "sasta@123", changedby);
    }

    @ApiOperation(value = "Change Password By Admin", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deleteusersbyadmin", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel DeleteUserByAdmin(@RequestParam("UserId") Long userid,@RequestParam("modifiedby") Long modifiedby){
        return userService.DeleteUsers(userid, modifiedby);
    }

    @ApiOperation(value = "un lock user By Admin", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/unlock", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel UnLock(@RequestParam("UserId") Long userid,@RequestParam("modifiedby") Long modifiedby){
        return userService.UnLock(userid,modifiedby);
    }

    @ApiOperation(value = "search users", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel SeacrhUsers(@RequestBody SearchModel search){
        return userService.SearchUsers(search);
    }

}
