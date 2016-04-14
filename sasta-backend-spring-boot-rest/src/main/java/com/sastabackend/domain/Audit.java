package com.sastabackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import  com.sastabackend.util.TextUtil;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@Entity(name = "audit_entries")
public class Audit implements java.io.Serializable , CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "audit_id", nullable = false, updatable = false)
    private Long audit_id;
    private Long round_id;
    @JsonFormat(pattern="yyyy/MM/dd")
    private java.sql.Date grama_sabha_date;
    private Integer audit_district_id;
    private Integer audit_block_id;
    private Integer village_panchayat_id;
    private Boolean is_active;
    private String key;

    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modifed_dy;
    private String created_by_Name;
    private String modified_by_Name;

    @JsonFormat(pattern="yyyy/MM/dd")
    private java.sql.Date round_start_date;
    @JsonFormat(pattern="yyyy/MM/dd")
    private java.sql.Date round_end_state;
    private String round_description;
    private Integer financial_id;
    private String financial_year;
    private String financial_description;
    private String district_name;
    private String block_name;
    private String vp_name;
    private String round_name;

    public Audit(){}

    public Long getAuditId() {
        return audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
        setKey(Long.toString(audit_id));
    }

    public Long getRoundId() {
        return round_id;
    }

    public void setRoundId(Long round_id) {
        this.round_id = round_id;
    }

    public Date getGramaSabhaDate() {
        return grama_sabha_date;
    }

    public void setGramaSabhaDate(Date grama_sabha_date) {
        this.grama_sabha_date = grama_sabha_date;
    }

    public Integer getAuditDistrictId() {
        return audit_district_id;
    }

    public void setAuditDistrictId(Integer audit_district_id) {
        this.audit_district_id = audit_district_id;
    }

    public Integer getAuditBlockId() {
        return audit_block_id;
    }

    public void setAuditBlockId(Integer audit_block_id) {
        this.audit_block_id = audit_block_id;
    }

    public Integer getVillagePanchayatId() {
        return village_panchayat_id;
    }

    public void setVillagePanchayatId(Integer village_panchayat_id) {
        this.village_panchayat_id = village_panchayat_id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        try{
            //CryptoUtil crypt = new CryptoUtil();
            key = TextUtil.EncodeString(key);//crypt.encrypt(Constants.SALT_KEY,key);
        }catch(Exception err){
            key = Constants.Empty;
        }
        this.key = key;
    }

    public String getRoundName() {
        return this.round_name;
    }

    public void setRoundName(String round_name) {
        this.round_name = round_name;
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

    public java.sql.Date getStartDate() {
        return round_start_date;
    }

    public void setStartDate(java.sql.Date start_date) {
        this.round_start_date = start_date;
    }

    public java.sql.Date getEndDtate() {
        return round_end_state;
    }

    public void setEndDate(java.sql.Date end_state) {
        this.round_end_state = end_state;
    }

    public String getFinancialDescription() {
        return financial_description;
    }

    public void setFinancialDescription(String financial_description) {
        this.financial_description = financial_description;
    }

    public Integer getFinancialId() {
        return financial_id;
    }

    public void setFinancialId(Integer financial_id) {
        this.financial_id = financial_id;
    }

    public String getFinancialYear() {
        return financial_year;
    }

    public void setFinancialYear(String financial_year) {
        this.financial_year = financial_year;
    }

    public String getRoundDescription() {
        return round_description;
    }

    public void setRoundDescription(String round_description) {
        this.round_description = round_description;
    }

    public String getVpName() {
        return vp_name;
    }

    public void setVpName(String vp_name) {
        this.vp_name = vp_name;
    }

    public String getBlockName() {
        return block_name;
    }

    public void setBlockName(String block_name) {
        this.block_name = block_name;
    }

    public String getDistrictName() {
        return district_name;
    }

    public void setDistrictName(String district_name) {
        this.district_name = district_name;
    }

    @Override
    public String toString() {
        return "Audit{" +
                "audit_id=" + audit_id +
                ", round_id=" + round_id +
                ", grama_sabha_date=" + grama_sabha_date +
                ", audit_district_id=" + audit_district_id +
                ", audit_block_id=" + audit_block_id +
                ", village_panchayat_id=" + village_panchayat_id +
                ", is_active=" + is_active +
                ", key='" + key + '\'' +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modifed_dy=" + modifed_dy +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", round_start_date=" + round_start_date +
                ", round_end_state=" + round_end_state +
                ", round_description='" + round_description + '\'' +
                ", financial_year='" + financial_year + '\'' +
                ", financial_description='" + financial_description + '\'' +
                ", district_name='" + district_name + '\'' +
                ", block_name='" + block_name + '\'' +
                ", vp_name='" + vp_name + '\'' +
                ", round_name='" + round_name + '\'' +
                '}';
    }
}
