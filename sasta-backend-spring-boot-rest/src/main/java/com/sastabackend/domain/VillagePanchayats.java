package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by SARVA on 18/Nov/2015.
 */

@Entity(name="village_panchayats")
public class VillagePanchayats implements  java.io.Serializable,CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    private Integer audit_block_id;
    private String name;
    private Integer vp_code;
    private String description;

    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;
    private String createByName;
    private String modifybyName;

    public VillagePanchayats(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAuditBlockId() {
        return audit_block_id;
    }

    public void setAuditBlockId(Integer audit_block_id) {
        this.audit_block_id = audit_block_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getVpCode() {
        return vp_code;
    }

    public void setVpCode(Integer vp_code) {
        this.vp_code = vp_code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public Timestamp getCreatedDate() {
        return this.created_date;
    }

    @Override
    public void setCreatedDate(Timestamp created_date) {
        this.created_date = created_date;
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
        this.created_by = created_by;
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
        this.modifybyName = modifybyName;
    }

    @Override
    public String toString() {
        return "VillagePanchayats{" +
                "id=" + id +
                ", audit_block_id=" + audit_block_id +
                ", name='" + name + '\'' +
                ", vp_code=" + vp_code +
                ", description='" + description + '\'' +
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
