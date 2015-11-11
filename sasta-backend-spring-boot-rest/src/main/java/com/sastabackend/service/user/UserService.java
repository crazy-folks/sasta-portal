package com.sastabackend.service.user;

import com.sastabackend.domain.Session;
import com.sastabackend.domain.Users;

import java.util.List;

public interface UserService {

    Users save(Users users);

    List<Users> getList();

    Session SignIn(String email,String password);
}
