package com.sastabackend.domain;


import com.google.common.base.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.lang.String;

@Entity
public class  Users  implements java.io.Serializable {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private java.lang.Long id;

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
    private String screen_name;

    @Size(max = 100)
    @Column(name = "first_name")
    private String first_name;

    @Size(max = 100)
    @Column(name = "last_name")
    private String last_name;

    @Column(name = "gender_id")
    private java.lang.Integer  gender_id;

    @Size(max = 100)
    @Column(name = "job_title")
    private String job_title;

    @Column(name = "description")
    private String description;

    @Size(max = 100)
    @Column(name = "experience")
    private String experience;

    @Column(name = "has_read_tc")
    private java.lang.Boolean has_read_tc;

    @Column(name = "state_id")
    private java.lang.Integer state_id;

    @Column(name = "country_id")
    private java.lang.Integer country_id;

    @Column(name = "image_id")
    private java.lang.Integer image_id;

    @Column(name = "user_group_id")
    private java.lang.Integer user_group_id;

    @Column(name = "communication_address")
    private String communication_address;

    @Column(name = "permanent_address")
    private String permanent_address;

    @Column(name = "is_address_same")
    private java.lang.Boolean is_address_same;

    @Column(name = "date_of_joining")
    private java.sql.Date date_of_joining;

    @Column(name = "date_of_birth")
    private java.sql.Date date_of_birth;

    @Column(name = "previous_work_exp")
    private java.lang.Float previous_work_exp;

    @Size(max = 50)
    @Column(name = "team_name")
    private String team_name;

    @Size(max = 20)
    @Column(name = "employee_id")
    private String employee_id;

    @Column(name = "department_id")
    private java.lang.Integer department_id;

    @Size(max = 100)
    @Column(name = "gmail_id")
    private String gmail_id;

    @Size(max = 100)
    @Column(name = "skype_name")
    private String skype_name;

    @Size(max = 100)
    @Column(name = "business_email")
    private String business_email;

    @Size(max = 100)
    @Column(name = "personal_email")
    private String personal_email;

    @Size(max = 100)
    @Column(name = "father_name")
    private String father_name;

    @Column(name = "blood_group_id")
    private java.lang.Integer blood_group_id;

    @Column(name = "reporting_id")
    private java.lang.Long reporting_id;

    @Column(name = "allotted_district")
    private java.lang.Integer allotted_district;

    @Column(name = "allotted_block")
    private java.lang.Integer allotted_block;

    @Column(name = "recruitment_id")
    private java.lang.Integer recruitment_id;

    @Column(name = "birth_proof_id")
    private java.lang.Integer birth_proof_id;

    @Size(max = 36)
    @Column(name = "validation_code")
    private String validation_code;

    @Column(name = "visible_fields")
    private String visible_fields;

    @Size(max = 20)
    @Column(name = "mobile_no")
    private String mobile_no;

    @Size(max = 20)
    @Column(name = "land_line_no")
    private String land_line_no;

    @Column(name = "personal_url")
    private String personal_url;

    @Column(name = "failed_login_attempts")
    private java.lang.Integer failed_login_attempts;

    @Column(name = "is_locked")
    private java.lang.Boolean is_locked;

    @Column(name = "is_active")
    private java.lang.Boolean is_active;

    @Column(name = "create_date")
    private java.sql.Timestamp create_date;

    @Column(name = "modified_date")
    private java.sql.Timestamp modified_date;

    @Column(name = "last_login_date")
    private java.sql.Timestamp last_login_date;

    public Users() {
    }

    public Users(final java.lang.Long id,final String email,final String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public java.lang.Long getId() {
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

    public String getScreenName(){
        return screen_name;
    }

    public void setScreenName(String screen_name){
        this.screen_name = screen_name;
    }

    public String getFirstName(){
        return first_name;
    }

    public void setFirstName(String first_name){
        this.first_name = first_name;
    }

    public String getLastName(){
        return this.last_name;
    }
    public void setLastName(String last_name){
        this.last_name = last_name;
    }
    public java.lang.Integer getGenderId(){
        return this.gender_id;
    }

    public void setGenderId(java.lang.Integer gender_id){
        this.gender_id = gender_id;
    }

    public String getJobTitle(){
        return this.job_title;
    }

    public void setJobTitle(String job_title){
        this.job_title = job_title;
    }

    public String getDescription(){
        return this.description;
    }

    public void setDescription(String description){
        this.job_title = description;
    }

    public String getExperience(){
        return this.experience;
    }

    public void setExperience(String experience){
        this.experience = experience;;
    }

    public void setHasReadTermsAndCondtion(java.lang.Boolean has_read_tc){
        this.has_read_tc = has_read_tc;
    }

    public void setStateId(java.lang.Integer  state_id){
        this.state_id = state_id;
    }

    public java.lang.Integer getStateId(){
        return this.state_id ;
    }


    public void setCountryId(java.lang.Integer   country_id){
        this. country_id =  country_id;
    }

    public java.lang.Integer getCountryId(){
        return this. country_id ;
    }


    public void setImageId(java.lang.Integer  image_id){
        this.image_id = image_id;
    }

    public java.lang.Integer getImageId(){
        return this.image_id ;
    }


    public void setUserGroupId(java.lang.Integer  user_group_id){
        this.state_id = user_group_id;
    }

    public java.lang.Integer getUserGroupId(){
        return this.user_group_id ;
    }

    public String getCommunicationAddress(){
        return this.communication_address;
    }

    public void setCommunicationAddress(String communication_address){
        this.communication_address = communication_address;;
    }

    public String getPermanentAddress(){
        return this.permanent_address;
    }

    public void setPermanentAddress(String permanent_address){
       this.permanent_address = permanent_address;;
    }

    public void setSameAddress(java.lang.Boolean is_address_same){
        this.is_address_same = is_address_same;
    }

    public java.lang.Boolean getSameAddress(){
        return this.is_address_same;
    }

    public java.sql.Date getDateOfJoining(){
        return this.date_of_joining;
    }

    public void setDateOfJoining(java.sql.Date date_of_joining){
        this.date_of_joining =date_of_joining;
    }

    public java.sql.Date getDateOfBirth(){
        return this.date_of_birth;
    }

    public void setDateOfBirth(java.sql.Date date_of_birth){
        this.date_of_birth = date_of_birth;
    }

    public void setPreviousExperience(java.lang.Float previous_work_exp){
        this.previous_work_exp = previous_work_exp;
    }

    public java.lang.Float getPreviousExperience(){
        return this.previous_work_exp;
    }

    public String getTeamName(){
        return this.team_name;
    }

    public void setTeamName(String team_name){
        this.team_name = team_name;;
    }

    public String getEmployeeId(){
        return this.employee_id;
    }

    public void setEmployeeId(String employee_id){
        this.employee_id = employee_id;;
    }

    public java.lang.Integer getDepartmentId(){
        return this.department_id;
    }

    public void setDepartmentId(java.lang.Integer department_id){
        this.department_id = department_id;
    }

    public String getGmailId(){
        return this.gmail_id;
    }

    public void setGmailId(String gmail_id){
        this.gmail_id = gmail_id;
    }

    public String getSkypeName(){
        return this.skype_name;
    }

    public void setSkypeName(String skype_name){
        this.skype_name = skype_name;;
    }

    public String getBusinessEmail(){
        return this.business_email;
    }

    public void setBusinessEmail(String business_email){
        this.business_email = business_email;;
    }

    public String getPersonalEmail(){
        return this.personal_email;
    }

    public void setPersonalEmail(String personal_email){
        this.personal_email = personal_email;
    }

    public String getFatherName(){
        return this.father_name;
    }

    public void setFatherName(String father_name){
        this.father_name = father_name;;
    }

    public void setBloodGroupId(java.lang.Integer blood_group_id){
        this.blood_group_id = blood_group_id;
    }

    public java.lang.Integer getBloodGroupId(){
       return this.blood_group_id ;
    }

    public void setReportingId(java.lang.Long reporting_id){
        this.reporting_id = reporting_id;
    }

    public java.lang.Long getReportingId(){
        return this.reporting_id ;
    }

    public void setAllottedDistrict(java.lang.Integer allotted_district){
        this.allotted_district = allotted_district;
    }

    public java.lang.Integer getAllottedDistrict(){
        return this.allotted_district ;
    }

    public void setAllottedBlock(java.lang.Integer allotted_block){
        this.allotted_block = allotted_block;
    }

    public java.lang.Integer getAllottedBlock(){
        return this.allotted_block ;
    }

    public void setRecruitmentId(java.lang.Integer recruitment_id){
        this.recruitment_id = recruitment_id;
    }

    public java.lang.Integer getRecruitmentId(){
        return this.recruitment_id ;
    }

    public void setBirthProofId(java.lang.Integer birth_proof_id){
        this.birth_proof_id = birth_proof_id;
    }

    public java.lang.Integer getBirthProofId(){
        return this.birth_proof_id ;
    }

    public String getValidationCode(){
        return this.validation_code;
    }

    public void setValidationCode(String validation_code){
        this.validation_code = validation_code;
    }

    public String getVisibleFields(){
        return this.visible_fields;
    }

    public void setVisibleFields(String visible_fields){
        this.visible_fields = visible_fields;
    }

    public String getMobileNumber(){
        return this.mobile_no;
    }

    public void setMobileNumber(String mobile_no){
        this.mobile_no = mobile_no;
    }

    public String getLandLineNumber(){
        return this.land_line_no;
    }

    public void setLandLineNumber(String land_line_no){
        this.land_line_no = land_line_no;
    }

    public String toString() {
        return Objects.toStringHelper(this)
                .add("id", id)
                .add("email",email)
                .toString();
    }
}