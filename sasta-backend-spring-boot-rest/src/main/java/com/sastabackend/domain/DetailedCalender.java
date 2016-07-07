package com.sastabackend.domain;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by Sarvaratchagan on 03-07-2016.
 */
public class DetailedCalender implements java.io.Serializable{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private Long calender_id;
    private String round_no;
    private java.sql.Timestamp start_date;
    private java.sql.Timestamp end_date;
    private java.sql.Timestamp gs_date;
    private String remarks;

    private Boolean is_active;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modifed_by;
    private String created_by_Name;
    private String modified_by_Name;

    public DetailedCalender(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCalenderId() {
        return calender_id;
    }

    public void setCalenderId(Long calender_id) {
        this.calender_id = calender_id;
    }

    public String getRoundNo() {
        return round_no;
    }

    public void setRoundNo(String round_no) {
        this.round_no = round_no;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }

    public Timestamp getCreatedDate() {
        return created_date;
    }

    public void setCreatedDate(Timestamp created_date) {
        this.created_date = created_date;
    }

    public Timestamp getModifiedDate() {
        return modified_date;
    }

    public void setModifiedDate(Timestamp modified_date) {
        this.modified_date = modified_date;
    }

    public Long getCreatedBy() {
        return created_by;
    }

    public void setCreatedBy(Long created_by) {
        this.created_by = created_by;
    }

    public Long getModifedBy() {
        return modifed_by;
    }

    public void setModifedBy(Long modifed_by) {
        this.modifed_by = modifed_by;
    }

    public String getCreatedByName() {
        return created_by_Name;
    }

    public void setCreatedByName(String created_by_Name) {
        this.created_by_Name = created_by_Name;
    }

    public String getModifiedByName() {
        return modified_by_Name;
    }

    public void setModifiedByName(String modified_by_Name) {
        this.modified_by_Name = modified_by_Name;
    }

    @Override
    public String toString() {
        return "DetailedCalender{" +
                "id=" + id +
                ", calender_id=" + calender_id +
                ", round_no='" + round_no + '\'' +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", gs_date=" + gs_date +
                ", remarks='" + remarks + '\'' +
                ", is_active=" + is_active +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modifed_by=" + modifed_by +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                '}';
    }
}
