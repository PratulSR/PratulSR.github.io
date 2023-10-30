package com.elec5619.gantt.DTO;

import lombok.Data;

@Data
public class loginDTO {

    private String email;
    private String password;

    public loginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
