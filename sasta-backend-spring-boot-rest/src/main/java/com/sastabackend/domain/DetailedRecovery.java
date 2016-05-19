package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by SARVA on 19/May/2016.
 */
@Entity(name = "detailed_recovery")
public class DetailedRecovery implements  java.io.Serializable, CommonProperties {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private Long recovery_id;

    private Integer display_order;
    private java.math.BigDecimal actual_amt;
    private java.math.BigDecimal recovered_amt;
    private String description;
    private Boolean paided_type; // Partial Or Full
    private Boolean recovery_type;    // In Grama Sabha Or After Grama Sabha

    private String paided_type_text;
    private String recovery_type_text;
    private Boolean is_active;


    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modifed_dy;
    private String created_by_Name;
    private String modified_by_Name;

    public  DetailedRecovery(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecoveryId() {
        return recovery_id;
    }

    public void setRecoveryId(Long recovery_id) {
        this.recovery_id = recovery_id;
    }

    public Integer getDisplayOrder() {
        return display_order;
    }

    public void setDisplayOrder(Integer display_order) {
        this.display_order = display_order;
    }

    public BigDecimal getActualAmount() {
        return actual_amt;
    }

    public void setActualAmount(BigDecimal actual_amt) {
        this.actual_amt = actual_amt;
    }

    public BigDecimal getRecoveredAmount() {
        return recovered_amt;
    }

    public void setRecoveredAmount(BigDecimal recovered_amt) {
        this.recovered_amt = recovered_amt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPaidedType() {
        return paided_type;
    }

    public void setPaidedType(Boolean paided_type) {
        this.paided_type = paided_type;
    }

    public Boolean getRecoveryType() {
        return this.recovery_type;
    }

    public void setRecoveryType(Boolean recovery_type) {
        this.recovery_type = recovery_type;
    }

    public String getPaidedTypeText() {
        return paided_type_text;
    }

    public void setPaidedTypeText(String paided_type_text) {
        this.paided_type_text = paided_type_text;
    }

    public String getRecoveryTypeText() {
        return recovery_type_text;
    }

    public void setRecoveryTypeText(String recovery_type_text) {
        this.recovery_type_text = recovery_type_text;
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
        return this.modifed_dy;
    }

    @Override
    public void setModifiedBy(Long modified_by) {
        this.modifed_dy = modified_by;
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
        return this.created_by_Name;
    }

    @Override
    public void setCreatedByName(String createByName) {
        this.created_by_Name = createByName;
    }

    @Override
    public String getModifiedByName() {
        return this.modified_by_Name;
    }

    @Override
    public void setModifiedByName(String modifiedByName) {
        this.modified_by_Name = modifiedByName;
    }

    @Override
    public String toString() {
        return "DetailedRecovery{" +
                "id=" + id +
                ", recovery_id=" + recovery_id +
                ", display_order=" + display_order +
                ", actual_amt=" + actual_amt +
                ", recovered_amt=" + recovered_amt +
                ", description='" + description + '\'' +
                ", paided_type=" + paided_type +
                ", recovery_type=" + recovery_type +
                ", paided_type_text='" + paided_type_text + '\'' +
                ", recovery_type_text='" + recovery_type_text + '\'' +
                ", is_active=" + is_active +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modifed_dy=" + modifed_dy +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                '}';
    }
}
