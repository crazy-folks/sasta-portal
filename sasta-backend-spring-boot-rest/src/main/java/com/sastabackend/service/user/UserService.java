package com.sastabackend.service.user;

import com.sastabackend.domain.*;

import java.util.List;

public interface UserService {

    Users save(Users users);

    List<Users> getList(String id);

    ResponseModel SignIn(String email,String password);

    ResponseModel Add(Users users);

    ResponseModel UpdateAvatarWithDescription(String base64,String description, Long id);

    ResponseModel UploadImage(Images image);

    ResponseModel UpdateBasicUserDetails(BasicUserDetails personal);

    ResponseModel SignOut(String sessionid);

    ResponseModel UpdateSession(String sessionid);

    ResponseModel ChangePassword(Long userid,String oldPassword,String NewPassword,Boolean changedby);

    ResponseModel SearchUsers(SearchModel model);

    ResponseModel DeleteUsers(Long userid,Long modifiedby);

    ResponseModel UnLock(Long userid,Long modifiedby);

    ResponseModel Update(Users users);

}
