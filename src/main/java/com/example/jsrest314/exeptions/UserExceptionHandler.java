package com.example.jsrest314.exeptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    private final UserIncorrectData dataInfoHandler;

    @Autowired
    public UserExceptionHandler(UserIncorrectData dataInfoHandler) {
        this.dataInfoHandler = dataInfoHandler;
    }

    @ExceptionHandler
    public ResponseEntity<UserIncorrectData> handleException(NoSuchUserException e) {
        return new ResponseEntity<>(dataInfoHandler.getInstanceWithInfo(e.getMessage()),
                HttpStatus.CONFLICT);
    }

}
