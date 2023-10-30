package com.elec5619.gantt.tables.credentials;

import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "Credentials")
public class Credentials {

    @Id
    @Column(name = "credentials_id")
    @GeneratedValue(generator = "cred_gen", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "cred_gen", sequenceName = "cred_sequence", initialValue = 1, allocationSize = 1)
    private Integer id;

    private String password;

    public Credentials() {

    }

    public Credentials(String newPassword) {
        this.password = newPassword;
    }

    public Integer getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}