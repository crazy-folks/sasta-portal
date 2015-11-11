package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@SuppressWarnings("ALL")
@Entity (name = "audit_district")
public class Districts {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    private Integer district_id;
    private String name;
    private Integer audit_state_id;
    private String stateName;
    private String description;
    private String short_name;
    private Integer district_code;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;
    private String createByName;
    private String modifybyName;
    private String status;

    public Districts(){}

    public Integer getId() {
        return id;
    }

    public Integer getDistrictID() {
        return this.district_id;
    }

    public void setDistrictID(Integer district_id) {
        this.district_id = district_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAuditStateId() {
        return audit_state_id;
    }

    public void setAuditStateId(Integer audit_state_id) {
        this.audit_state_id = audit_state_id;
    }

    public String getShortName() {
        return short_name;
    }

    public void setShortName(String short_name) {
        this.short_name = short_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDistrictCode() {
        return district_code;
    }

    public void setDistrictCode(Integer district_code) {
        this.district_code = district_code;
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

    public Boolean getStatus() {
        return is_active;
    }

    public void setStatus(Boolean is_active) {
        this.is_active = is_active;
    }

    public String getCreateByName() {
        return createByName;
    }

    public void setCreateByName(String createByName) {
        this.createByName = createByName;
    }

    public String getModifyByName() {
        return modifybyName;
    }

    public void setModifyByName(String modifybyName) {
        this.modifybyName = modifybyName;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public String getStatusName() {
        return status;
    }

    public void setStatusName(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Districts{" +
                "id=" + id +
                ", district_id=" + district_id +
                ", name='" + name + '\'' +
                ", audit_state_id=" + audit_state_id +
                ", stateName='" + stateName + '\'' +
                ", description='" + description + '\'' +
                ", short_name='" + short_name + '\'' +
                ", district_code=" + district_code +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", is_active=" + is_active +
                ", createByName='" + createByName + '\'' +
                ", modifybyName='" + modifybyName + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
