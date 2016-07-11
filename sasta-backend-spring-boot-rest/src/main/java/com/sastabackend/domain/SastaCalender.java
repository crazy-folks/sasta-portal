package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by Sarvaratchagan on 03-07-2016.
 */
@Entity( name = "calender" )
public class SastaCalender implements java.io.Serializable{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String title;
    private Integer financial_id;

    private Boolean is_active;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private String created_by_Name;
    private String modified_by_Name;
    private String financial_name;

    public SastaCalender(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getFinancialId() {
        return financial_id;
    }

    public void setFinancialId(Integer financial_id) {
        this.financial_id = financial_id;
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

    public String getFinancialName() {
        return financial_name;
    }

    public void setFinancialName(String financial_name) {
        this.financial_name = financial_name;
    }

    @Override
    public String toString() {
        return "SastaCalender{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", financial_id=" + financial_id +
                ", is_active=" + is_active +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modifed_by=" + modified_by +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", financial_name='" + financial_name + '\'' +
                '}';
    }
}
