package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 27/Dec/2015.
 */
@Entity(name ="high_level_commities")
public class HighLevelCommities implements CommonProperties{
    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private Long audit_id;
    private java.sql.Date date_of_joint_sitting;
    private Integer total_paras_count;
    private java.math.BigDecimal total_paras_amt;
    private Integer  para_settled_during_DS_count;
    private java.math.BigDecimal  para_settled_during_DS_amt;
    private Integer  para_settled_during_HLC_count;
    private java.math.BigDecimal  para_settled_during_HLC_amt;
    private Integer  pending_paras_count;
    private java.math.BigDecimal  pending_paras_amt;
    private java.math.BigDecimal  amount_recovered;
    private java.math.BigDecimal  amount_to_be_recovered;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;

    private String created_by_Name;
    private String modified_by_Name;

    private Integer round_id;
    private String round_name;
    private java.sql.Date round_start_date;
    private java.sql.Date round_end_date;
    private String round_description;
    private Integer audit_district_id;
    private String district_name;
    private String financial_year;
    private String financial_description;
    private Integer block_id;
    private String block_name;
    private Integer vp_id;
    private String vp_name;

    public HighLevelCommities(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuditId() {
        return audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
    }

    public Date getDateOfJointSitting() {
        return date_of_joint_sitting;
    }

    public void setDateOfJointSitting(Date date_of_joint_sitting) {
        this.date_of_joint_sitting = date_of_joint_sitting;
    }

    public Integer getTotalParasCount() {
        return total_paras_count;
    }

    public void setTotalParasCount(Integer total_paras_count) {
        this.total_paras_count = total_paras_count;
    }

    public BigDecimal getTotalParasAmt() {
        return total_paras_amt;
    }

    public void setTotalParasAmt(BigDecimal total_paras_amt) {
        this.total_paras_amt = total_paras_amt;
    }

    public Integer getParaSettledDuringDSCount() {
        return para_settled_during_DS_count;
    }

    public void setParaSettledDuringDSCount(Integer para_settled_during_DS_count) {
        this.para_settled_during_DS_count = para_settled_during_DS_count;
    }

    public BigDecimal getParaSettledDuringDSAmt() {
        return para_settled_during_DS_amt;
    }

    public void setParaSettledDuringDSAmt(BigDecimal para_settled_during_DS_amt) {
        this.para_settled_during_DS_amt = para_settled_during_DS_amt;
    }

    public Integer getParaSettledDuringHLCCount() {
        return para_settled_during_HLC_count;
    }

    public void setParaSettledDuringHLCCount(Integer para_settled_during_HLC_count) {
        this.para_settled_during_HLC_count = para_settled_during_HLC_count;
    }

    public BigDecimal getParaSettledDuringHLCAmt() {
        return para_settled_during_HLC_amt;
    }

    public void setParaSettledDuringHLCAmt(BigDecimal para_settled_during_HLC_amt) {
        this.para_settled_during_HLC_amt = para_settled_during_HLC_amt;
    }

    public Integer getPendingParasCount() {
        return pending_paras_count;
    }

    public void setPendingParasCount(Integer pending_paras_count) {
        this.pending_paras_count = pending_paras_count;
    }

    public BigDecimal getPendingParasAmt() {
        return pending_paras_amt;
    }

    public void setPendingParasAmt(BigDecimal pending_paras_amt) {
        this.pending_paras_amt = pending_paras_amt;
    }

    public BigDecimal getAmountRecovered() {
        return amount_recovered;
    }

    public void setAmountRecovered(BigDecimal amount_recovered) {
        this.amount_recovered = amount_recovered;
    }

    public BigDecimal getAmountToBeRecovered() {
        return amount_to_be_recovered;
    }

    public void setAmountToBeRecovered(BigDecimal amount_to_be_recovered) {
        this.amount_to_be_recovered = amount_to_be_recovered;
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


    public Integer getRoundId() {
        return round_id;
    }

    public void setRoundId(Integer round_id) {
        this.round_id = round_id;
    }

    public String getRoundName() {
        return round_name;
    }

    public void setRoundName(String round_name) {
        this.round_name = round_name;
    }

    public Date getRoundStartDate() {
        return round_start_date;
    }

    public void setRoundStartDate(Date round_start_date) {
        this.round_start_date = round_start_date;
    }

    public Date getRoundEndDate() {
        return round_end_date;
    }

    public void setRoundEndDate(Date round_end_date) {
        this.round_end_date = round_end_date;
    }

    public String getRoundDescription() {
        return round_description;
    }

    public void setRoundDescription(String round_description) {
        this.round_description = round_description;
    }

    public Integer getAuditDistrictId() {
        return audit_district_id;
    }

    public void setAuditDistrictId(Integer audit_district_id) {
        this.audit_district_id = audit_district_id;
    }

    public String getDistrictName() {
        return district_name;
    }

    public void setDistrictName(String district_name) {
        this.district_name = district_name;
    }

    public String getFinancialYear() {
        return financial_year;
    }

    public void setFinancialYear(String financial_year) {
        this.financial_year = financial_year;
    }

    public String getFinancialDescription() {
        return financial_description;
    }

    public void setFinancialDescription(String financial_description) {
        this.financial_description = financial_description;
    }

    public Integer getBlockId() {
        return block_id;
    }

    public void setBlockId(Integer block_id) {
        this.block_id = block_id;
    }

    public String getBlockName() {
        return block_name;
    }

    public void setBlockName(String block_name) {
        this.block_name = block_name;
    }

    public Integer getVpId() {
        return vp_id;
    }

    public void setVpId(Integer vp_id) {
        this.vp_id = vp_id;
    }

    public String getVpName() {
        return vp_name;
    }

    public void setVpName(String vp_name) {
        this.vp_name = vp_name;
    }

    @Override
    public String toString() {
        return "HighLevelCommities{" +
                "id=" + id +
                ", audit_id=" + audit_id +
                ", total_paras_count=" + total_paras_count +
                ", total_paras_amt=" + total_paras_amt +
                ", para_settled_during_DS_count=" + para_settled_during_DS_count +
                ", para_settled_during_DS_amt=" + para_settled_during_DS_amt +
                ", para_settled_during_HLC_count=" + para_settled_during_HLC_count +
                ", para_settled_during_HLC_amt=" + para_settled_during_HLC_amt +
                ", pending_paras_count=" + pending_paras_count +
                ", pending_paras_amt=" + pending_paras_amt +
                ", amount_recovered=" + amount_recovered +
                ", amount_to_be_recovered=" + amount_to_be_recovered +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", is_active=" + is_active +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", round_id=" + round_id +
                ", round_name='" + round_name + '\'' +
                ", round_start_date=" + round_start_date +
                ", round_end_date=" + round_end_date +
                ", round_description='" + round_description + '\'' +
                ", audit_district_id=" + audit_district_id +
                ", district_name='" + district_name + '\'' +
                ", financial_year='" + financial_year + '\'' +
                ", financial_description='" + financial_description + '\'' +
                ", block_id=" + block_id +
                ", block_name='" + block_name + '\'' +
                ", vp_id=" + vp_id +
                ", vp_name='" + vp_name + '\'' +
                '}';
    }
}
