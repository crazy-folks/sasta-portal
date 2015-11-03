package com.sastabackend.domain;

/**
 * Created by SARVA on 04/Nov/2015.
 */
public class Lookup {
    private String value;
    private String text;

    public Lookup(String value,String text){
        this.value = value;
        this.text = text;
    }

    public String getValue(){
        return this.value;
    }

    public void setValue(String value){
        this.value = value;
    }


    public String getText(){
        return this.text;
    }

    public void setText(String text){
        this.text = text;
    }
}
