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
    private String loggedin_by;
    private Boolean loggedin_as;
    private String employee_id;
    private Integer country_id;
    private Long reporting_id;
    private Integer allotted_district;
    private Integer allotted_block;
    private Boolean can_read;
    private Boolean can_write;
    private Boolean can_delete;
    private Boolean district_level_person;
    private Boolean block_level_person;

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


    public String getLoggedInBy(){
        return this.loggedin_by;
    }

    public void setLoggedInBy(String loggedin_by){
        this.loggedin_by = loggedin_by;
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

    public Integer getAllottedDistrict() {
        return allotted_district;
    }

    public void setAllottedDistrict(Integer allotted_district) {
        this.allotted_district = allotted_district;
    }

    public Integer getAllottedBlock() {
        return allotted_block;
    }

    public void setAllottedBlock(Integer allotted_block) {
        this.allotted_block = allotted_block;
    }


    public Boolean getCanRead() {
        return this.can_read;
    }

    public void setCanRead(Boolean can_read) {
        this.can_read = can_read;
    }

    public Boolean getCanWrite() {
        return this.can_write;
    }

    public void setCanWrite(Boolean can_write) {
        this.can_write = can_write;
    }

    public Boolean getCanDelete() {
        return this.can_delete;
    }

    public void setCanDelete(Boolean can_delete) {
        this.can_delete = can_delete;
    }

    public Boolean getLoggedInAs() {
        return this.loggedin_as;
    }

    public void setLoggedInAs(Boolean loggedin_as) {
        this.loggedin_as = loggedin_as;
    }    

    public Boolean getIsDistrictLevelPerson() {
        return this.district_level_person;
    }

    public void setIsDistrictLevelPerson(Boolean district_level_person) {
        this.district_level_person = district_level_person;
    }    

    public Boolean getIsBlockLevelPerson() {
        return this.block_level_person;
    }

    public void setIsBlockLevelPerson(Boolean block_level_person) {
        this.block_level_person = block_level_person;
    }    

    @Override
    public String toString() {
        return "Session{" +
                "session_id='" + session_id + '\'' +
                ", user_id=" + user_id +
                ", create_date='" + create_date + '\'' +
                ", expire_date='" + expire_date + '\'' +
                ", user_full_name='" + user_full_name + '\'' +
                ", screen_name='" + screen_name + '\'' +
                ", image_name='" + image_name + '\'' +
                ", user_group_id=" + user_group_id +
                ", loggedIn_By='" + loggedin_by + '\'' +
                ", employee_id='" + employee_id + '\'' +
                ", country_id=" + country_id +
                ", reporting_id=" + reporting_id +
                ", allotted_district=" + allotted_district +
                ", allotted_block=" + allotted_block +
                ", can_read=" + can_read +
                ", can_write=" + can_write +
                ", can_delete=" + can_delete +
                ", can_delete=" + loggedin_as +
                ", district_level_person=" + district_level_person +
                ", block_level_person=" + block_level_person +
                '}';
    }
}
