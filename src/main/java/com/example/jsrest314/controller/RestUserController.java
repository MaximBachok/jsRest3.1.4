package com.example.jsrest314.controller;

import com.example.jsrest314.exeptions.NoSuchUserException;
import com.example.jsrest314.exeptions.UserIncorrectData;
import com.example.jsrest314.model.User;
import com.example.jsrest314.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RestUserController {

    private UserServiceImp userService;

    @Autowired
    public RestUserController(UserServiceImp userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> apiGetAllUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> apiGetOneUser(@PathVariable("id") long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<UserIncorrectData> apiAddNewUser(@Valid @RequestBody User user,
                                                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String error = getErrorsFromBindingResult(bindingResult);
            return new ResponseEntity<>(new UserIncorrectData(error), HttpStatus.BAD_REQUEST);
        }
        try {
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw new NoSuchUserException("User with such login Exist");
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserIncorrectData> apiUpdateUser(@PathVariable("id") long id,
                                                           @RequestBody @Valid User user,
                                                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String error = getErrorsFromBindingResult(bindingResult);
            return new ResponseEntity<>(new UserIncorrectData(error), HttpStatus.BAD_REQUEST);
        }
        try {
            userService.update(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw new NoSuchUserException("User with such login Exist");
        }
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<UserIncorrectData> apiDeleteUser(@PathVariable("id") long id) {

        userService.deleteUser(id);
        return new ResponseEntity<>(new UserIncorrectData("User was deleted"), HttpStatus.OK);
    }

    private String getErrorsFromBindingResult(BindingResult bindingResult) {
        return bindingResult.getFieldErrors()
                .stream()
                .map(x -> x.getDefaultMessage())
                .collect(Collectors.joining("; "));
    }

}