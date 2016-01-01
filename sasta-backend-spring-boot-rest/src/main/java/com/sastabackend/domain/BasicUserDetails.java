package com.sastabackend.domain;

import java.util.Date;

/**
 * Created by SARVA on 26/Dec/2015.
 */
public class BasicUserDetails {

    private Long user_id;
    private String business_email;
    private String personal_email;
    private String gmail_id;
    private String skype_name;
    private java.util.Date date_of_birth;
    private String experience;
    private Float previous_experience;
    private String mobile_number;
    private String land_line_number;
    private Integer blood_group_id;
    private String communication_address;
    private String present_address;
    private Boolean is_address_same;
    private String personal_url;

    public BasicUserDetails(){}

    public String getBusinessEmail() {
        return business_email;
    }

    public void setBusinessEmail(String business_email) {
        this.business_email = business_email;
    }

    public String getPersonalEmail() {
        return personal_email;
    }

    public void setPersonalEmail(String personal_email) {
        this.personal_email = personal_email;
    }

    public String getGmailId() {
        return gmail_id;
    }

    public void setGmailId(String gmail_id) {
        this.gmail_id = gmail_id;
    }

    public String getSkypeName() {
        return skype_name;
    }

    public void setSkypeName(String skype_name) {
        this.skype_name = skype_name;
    }

    public Date getDateOfBirth() {
        return date_of_birth;
    }

    public void setDateOfBirth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Float getPreviousExperience() {
        return previous_experience;
    }

    public void setPreviousExperience(Float previous_experience) {
        this.previous_experience = previous_experience;
    }

    public String getMobileNumber() {
        return mobile_number;
    }

    public void setMobileNumber(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public String getLandLineNumber() {
        return land_line_number;
    }

    public void setLandLineNumber(String land_line_number) {
        this.land_line_number = land_line_number;
    }

    public Integer getBloodGroupId() {
        return blood_group_id;
    }

    public void setBloodGroupId(Integer blood_group_id) {
        this.blood_group_id = blood_group_id;
    }

    public String getCommunicationAddress() {
        return communication_address;
    }

    public void setCommunicationAddress(String communication_address) {
        this.communication_address = communication_address;
    }

    public String getPresentAddress() {
        return present_address;
    }

    public void setPresentAddress(String present_address) {
        this.present_address = present_address;
    }

    public Boolean getIsAddressSame() {
        return is_address_same;
    }

    public void setIsAddressSame(Boolean is_address_same) {
        this.is_address_same = is_address_same;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public String getPersonalUrl() {
        return personal_url;
    }

    public void setPersonalUrl(String personal_url) {
        this.personal_url = personal_url;
    }

    @Override
    public String toString() {
        return "BasicUserDetails{" +
                "user_id=" + user_id +
                ", business_email='" + business_email + '\'' +
                ", personal_email='" + personal_email + '\'' +
                ", gmail_id='" + gmail_id + '\'' +
                ", skype_name='" + skype_name + '\'' +
                ", date_of_birth=" + date_of_birth +
                ", experience='" + experience + '\'' +
                ", previous_experience='" + previous_experience + '\'' +
                ", mobile_number='" + mobile_number + '\'' +
                ", land_line_number='" + land_line_number + '\'' +
                ", blood_group_id=" + blood_group_id +
                ", communication_address='" + communication_address + '\'' +
                ", present_address='" + present_address + '\'' +
                ", is_address_same=" + is_address_same +
                ", personal_url='" + personal_url + '\'' +
                '}';
    }
}
