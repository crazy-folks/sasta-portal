package com.sastabackend.domain;


import com.google.common.base.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.lang.String;

@Entity
public class  Users{

    @Id
    @NotNull
    @Size(max = 64)
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    @NotNull
    @Size(max=150)
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Size(max = 32)
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 100)
    @Column(name = "screen_name")
    private String screenName;

    @Size(max = 100)
    @Column(name = "first_name")
    private String firstName;

    @Size(max = 100)
    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender_id")
    private String genderId;

    @Size(max = 100)
    @Column(name = "job_title")
    private String jobTitle;

    public Users() {
    }

    public Users(final String id,final String email,final String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("id", id)
                .add("email",email)
                .add("password", password)
                .toString();
    }
}