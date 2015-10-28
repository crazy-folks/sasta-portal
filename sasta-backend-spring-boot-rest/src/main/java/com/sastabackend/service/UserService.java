package com.sastabackend.service;

import com.sastabackend.domain.Users;

import java.util.List;

public interface UserService {

    Users save(Users users);

    List<Users> getList();

}
