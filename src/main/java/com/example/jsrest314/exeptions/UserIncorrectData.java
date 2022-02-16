package com.example.jsrest314.exeptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserIncorrectData {

    private String info;

    public UserIncorrectData getInstanceWithInfo(String info) {
        return new UserIncorrectData(info);
    }
}
