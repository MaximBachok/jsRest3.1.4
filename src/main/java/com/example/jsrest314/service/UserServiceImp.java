package com.example.jsrest314.service;

import com.example.jsrest314.model.Role;
import com.example.jsrest314.model.User;
import com.example.jsrest314.repository.RoleRepository;
import com.example.jsrest314.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class UserServiceImp implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImp(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public User saveUser(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        try {
            User user = userRepository.findById(id).get();
        } catch (RuntimeException e) {
            return null;
        }

        return userRepository.findById(id).get();
    }

    @Override
    public User update(User user) {
        User newUser = getUserById(user.getId());
        newUser.setUserName(user.getUserName());
        newUser.setEmail(user.getEmail());
        newUser.setUserLastName(user.getUserLastName());
        newUser.setPassword(user.getPassword());
        newUser.setAge(user.getAge());
        newUser.setActive(true);
        newUser.setRoles(user.getRoles());
        return userRepository.save(newUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}

