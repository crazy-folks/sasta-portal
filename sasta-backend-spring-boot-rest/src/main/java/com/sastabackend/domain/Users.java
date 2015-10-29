package com.sastabackend.domain;


import com.google.common.base.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.lang.String;

@Entity
public class  Users  implements Serializable {

    @Id
    @NotNull
    @GeneratedValue
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

    @Column(name = "recruitement_id")
    private java.lang.Integer recruitement_id;

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

    public Users(final String id,final String email,final String password) {
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
    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("id", id)
                .add("email",email)
                .toString();
    }
}