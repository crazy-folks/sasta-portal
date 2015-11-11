package com.sastabackend.domain;

import com.google.common.base.Objects;

/**
 * Created by SARVA on 05/Nov/2015.
 */
public class Session {

    private String session_id;
    private Long user_id;
    private String create_date;
    private String expire_date;
    private String user_full_name;
    private String screen_name;
    private String image_name;
    private Integer user_group_id;
    private String employee_id;
    private Integer country_id;
    private Long reporting_id;

    public Session(){}

    public String getSessionId(){
        return this.session_id;
    }

    public void setSessionId(String session_id){
        this.session_id = session_id;
    }

    public Long getUserId(){
        return this.user_id;
    }

    public void setUserId(Long user_id){
        this.user_id = user_id;
    }

    public String getCreatedDate(){
        return this.create_date;
    }

    public void setCreatedDate(String create_date){
        this.create_date = create_date;
    }

    public String getExpiredDate(){
        return this.expire_date;
    }

    public void setExpiredDate(String expire_date){
        this.expire_date = expire_date;
    }

    public String getUserFullName(){
        return this.user_full_name;
    }

    public void setUserFullName(String user_full_name){
        this.user_full_name = user_full_name;
    }

    public String getScreenName(){
        return this.screen_name;
    }

    public void setScreenName(String screen_name){
        this.screen_name = screen_name;
    }

    public String getImageName(){
        return this.image_name;
    }

    public void setImageName(String image_name){
        this.image_name = image_name;
    }

    public Integer getUserGroupId(){
        return this.user_group_id;
    }

    public void setUserGroupId(Integer user_group_id){
        this.user_group_id = user_group_id;
    }

    public String getEmployeeID(){
        return this.employee_id;
    }

    public void setEmployeeID(String employee_id){
        this.employee_id = employee_id;
    }

    public Integer getCountryId(){
        return this.country_id;
    }

    public void setCountryId(Integer country_id){
        this.country_id = country_id;
    }

    public Long getReportingId(){
        return this.reporting_id;
    }

    public void setReportingId(Long reporting_id){
        this.reporting_id = reporting_id;
    }

    @Override
    public String toString(){
        return Objects.toStringHelper(this)
                .add("session_id", session_id)
                .add("user_id",user_id)
                .add("create_date",create_date)
                .add("expire_date",expire_date)
                .add("user_full_name",user_full_name)
                .add("screen_name",screen_name)
                .add("image_name",image_name)
                .add("user_group_id",user_group_id)
                .add("employee_id",employee_id)
                .add("country_id",country_id)
                .add("reporting_id",reporting_id)
                .toString();
    }
}
