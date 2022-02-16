package com.example.jsrest314.exeptions;

import org.springframework.dao.DataIntegrityViolationException;

public class NoSuchUserException extends DataIntegrityViolationException {
    public NoSuchUserException(String msg) {
        super(msg);
    }
}
