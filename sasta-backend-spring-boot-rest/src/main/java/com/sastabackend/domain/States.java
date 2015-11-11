package com.sastabackend.domain;

import javax.persistence.*;
import javax.persistence.criteria.Predicate;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@Entity ( name ="audit_state")
public class States implements  java.io.Serializable,CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    private Integer state_id;
    private String name;
    private String description;
    private Integer country_id;
    private String coutry_name;
    private Integer state_code;
    private String short_name;

    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;
    private String createByName;
    private String modifybyName;

    public States() {

    }

    public Integer getId() {
        return id;
    }

    public Integer getStateId() {
        return state_id;
    }

    public void setStateId(Integer state_id) {
        this.state_id = state_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCountryId() {
        return country_id;
    }

    public void setCountryId(Integer country_id) {
        this.country_id = country_id;
    }

    public String getCoutryName() {
        return coutry_name;
    }

    public void setCoutryName(String coutry_name) {
        this.coutry_name = coutry_name;
    }

    public Integer getStateCode() {
        return state_code;
    }

    public void setStateCode(Integer state_code) {
        this.state_code = state_code;
    }

    public String getShortName() {
        return short_name;
    }

    public void setShortName(String short_name) {
        this.short_name = short_name;
    }

    @Override
    public Timestamp getCreatedDate() {
       return this.created_date;
    }

    @Override
    public void setCreatedDate(Timestamp created_date) {
        this.created_date= created_date;
    }

    @Override
    public Timestamp getModifiedDate() {
        return this.modified_date;
    }

    @Override
    public void setModifiedDate(Timestamp modified_date) {
        this.modified_date = modified_date;
    }

    @Override
    public Long getCreatedBy() {
        return this.created_by;
    }

    @Override
    public void setCreatedBy(Long created_by) {
        this.created_by= created_by;
    }

    @Override
    public Long getModifiedBy() {
        return this.modified_by;
    }

    @Override
    public void setModifiedBy(Long modified_by) {
        this.modified_by = modified_by;
    }

    @Override
    public Boolean getStatus() {
        return this.is_active;
    }

    @Override
    public void setStatus(Boolean is_active) {
        this.is_active = is_active;
    }

    @Override
    public String getCreatedByName() {
        return this.createByName;
    }

    @Override
    public void setCreatedByName(String createByName) {
        this.createByName = createByName;
    }

    @Override
    public String getModifiedByName() {
        return this.modifybyName;
    }

    @Override
    public void setModifiedByName(String modifiedByName) {
        this.modifybyName = modifiedByName;
    }

    @Override
    public String toString() {
        return "States{" +
                "id=" + id +
                ", state_id=" + state_id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", country_id=" + country_id +
                ", state_code=" + state_code +
                ", short_name='" + short_name + '\'' +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", is_active=" + is_active +
                ", createByName='" + createByName + '\'' +
                ", modifybyName='" + modifybyName + '\'' +
                '}';
    }
}
