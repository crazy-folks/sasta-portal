package com.sastabackend.domain;

import java.io.Serializable;

/**
 * Created by SARVA on 04/Nov/2015.
 */
public class SignIn implements Serializable {

    private String username;
    private String password;
    private boolean keepSignIn;

    public SignIn(String username,String password,boolean keepSignIn){
        this.username = username;
        this.password = password;
        this.keepSignIn = keepSignIn;
    }

    public String getUserName(){
        return this.username;
    }

    public void setUserName(String username){
        this.username = username;
    }

    public String getPassword(){
        return this.password ;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public boolean getKeepSignIn(){
        return this.keepSignIn;
    }

    public void serKeepSignIn(boolean keepSignIn){
        this.keepSignIn = keepSignIn;
    }
}
