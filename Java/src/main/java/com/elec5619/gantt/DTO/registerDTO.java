package com.elec5619.gantt.DTO;

import lombok.Data;

@Data
public class registerDTO {
    private String name;
    private String email;
    private String password;

    public registerDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
