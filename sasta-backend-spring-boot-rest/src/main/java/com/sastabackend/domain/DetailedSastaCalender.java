package com.sastabackend.domain;

/**
 * Created by Sarvaratchagan on 08-07-2016.
 */

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity( name = "detailed_calenders" )
public class DetailedSastaCalender implements java.io.Serializable{

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
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private boolean is_active;

    private String title;
    private Integer financial_year_id;
    private String financial_year_Name;

    private String modified_by_Name;
    private String created_by_Name;

    public DetailedSastaCalender(){}

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

    public Timestamp getStartDate() {
        return start_date;
    }

    public void setStartDate(Timestamp start_date) {
        this.start_date = start_date;
    }

    public Timestamp getEndDate() {
        return end_date;
    }

    public void setEndDate(Timestamp end_date) {
        this.end_date = end_date;
    }

    public Timestamp getGsDate() {
        return gs_date;
    }

    public void setGsDate(Timestamp gs_date) {
        this.gs_date = gs_date;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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

    public Long getModifiedBy() {
        return modified_by;
    }

    public void setModifiedBy(Long modified_by) {
        this.modified_by = modified_by;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getFinancialYearId() {
        return financial_year_id;
    }

    public void setFinancialYearId(Integer financial_year_id) {
        this.financial_year_id = financial_year_id;
    }

    public String getFinancialYearName() {
        return financial_year_Name;
    }

    public void setFinancialYearName(String financial_year_Name) {
        this.financial_year_Name = financial_year_Name;
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
        return "DetailedSastaCalender{" +
                "id=" + id +
                ", calender_id=" + calender_id +
                ", round_no='" + round_no + '\'' +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", gs_date=" + gs_date +
                ", remarks='" + remarks + '\'' +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", is_active=" + is_active +
                ", title='" + title + '\'' +
                ", financial_year_id=" + financial_year_id +
                ", financial_year_Name='" + financial_year_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", created_by_Name='" + created_by_Name + '\'' +
                '}';
    }
}
