package com.example.jsrest314.controller;

import com.example.jsrest314.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping
public class AdminController {
    private UserServiceImp userService;

    @Autowired
    public AdminController(UserServiceImp userService) {
        this.userService = userService;
    }

    public String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }


    @GetMapping("/admin")
    public String getIndex(Model model2) {
        model2.addAttribute("userAuth", userService.findUserByUserName(getCurrentUsername()));
        return "index";
    }

    @GetMapping("/user")
    public String getUser(Model model2) {
        model2.addAttribute("userAuth", userService.findUserByUserName(getCurrentUsername()));
        return "user";
    }


}
