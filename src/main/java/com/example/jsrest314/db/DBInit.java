package com.example.jsrest314.db;

import com.example.jsrest314.model.Role;
import com.example.jsrest314.model.User;
import com.example.jsrest314.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.annotation.PostConstruct;
import java.util.Collections;

@Component
public class DBInit {

    private UserRepository userRepository;

    @Autowired
    public DBInit(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initDB() {
        if (userRepository.findByUserName("admin") == null) {
            userRepository.save(new User
                    (1L, "root", "root", (byte) 99,
                            "root", "root",
                            true, Collections.singleton(new Role("ADMIN"))));
        }
    }
}
