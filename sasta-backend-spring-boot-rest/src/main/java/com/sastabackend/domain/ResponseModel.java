package com.sastabackend.domain;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public class ResponseModel<T> {

    private boolean status;
    private T data;

    public ResponseModel(){}

    public void setStatus(boolean status){
        this.status = status;
    }

    public boolean getStatus(){
        return this.status;
    }

    public void setData(T data){
        this.data = data;
    }

    public T getData(){
        return this.data;
    }
}
