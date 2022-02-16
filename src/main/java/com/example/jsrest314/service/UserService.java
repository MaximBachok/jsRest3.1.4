package com.example.jsrest314.service;

import com.example.jsrest314.model.Role;
import com.example.jsrest314.model.User;

import java.util.List;

public interface UserService {

    User findUserByEmail(String email);

    User findUserByUserName(String userName);

    User saveUser(User user);

    Role saveRole(Role role);

    List<User> findAll();

    User getUserById(Long id);

    User update(User user);

    void deleteUser(Long id);

}
