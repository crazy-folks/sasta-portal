package com.sastabackend.domain;

import com.google.common.base.Objects;
import javax.persistence.*;
import javax.validation.constraints.NotNull;


/**
 * Created by SARVA on 07/Nov/2015.
 */

@Entity(name= "audit_blocks")
public class Blocks implements java.io.Serializable{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private int block_id;

    private String name;
    private int district_id;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modifed_dy;
    private String created_by_Name;
    private String modified_by_Name;
    private String description;
    private Boolean is_active;

    public Blocks(){}

    public int getBlockID(){
        return this.block_id;
    }

    public void setBlockID(int block_id){
        this.block_id = block_id;
    }

    public String getBlockName(){
        return this.name;
    }

    public void setBlockName(String name){
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDistrictID(){
        return this.district_id;
    }

    public void setDistrictID(int district_id){
        this.district_id = district_id;
    }

    public java.sql.Timestamp getCreatedDate(){
        return this.created_date;
    }

    public void setCreatedDate(java.sql.Timestamp created_date){
        this.created_date = created_date;
    }

    public java.sql.Timestamp getModifiedDate(){
        return this.modified_date;
    }

    public void setModifiedDate(java.sql.Timestamp modified_date){
        this.modified_date = modified_date;
    }

    public java.lang.Long getCreatedBy() {
        return created_by;
    }
    public void setCreatedBy(Long created_by){
        this.created_by = created_by;
    }

    public java.lang.Long getModifiedBy() {
        return modifed_dy;
    }
    public void setModifiedBy(Long modifed_dy){
        this.modifed_dy = modifed_dy;
    }

    public String getCreatedByName(){
        return this.created_by_Name;
    }

    public void setCreatedByName(String created_by_Name){
        this.created_by_Name = created_by_Name;
    }

    public String getModifiedByName(){
        return this.modified_by_Name;
    }

    public void setModifiedByName(String modified_by_Name){
        this.modified_by_Name = modified_by_Name;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }


    @Override
    public String toString() {
        return "Blocks{" +
                "block_id=" + block_id +
                ", name='" + name + '\'' +
                ", district_id=" + district_id +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modifed_dy=" + modifed_dy +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", description='" + description + '\'' +
                ", is_active=" + is_active +
                '}';
    }
}
