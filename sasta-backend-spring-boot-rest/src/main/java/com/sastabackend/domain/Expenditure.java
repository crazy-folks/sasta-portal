package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@Entity( name = "audit_expenditure" )
public class Expenditure implements java.io.Serializable,CommonProperties {


    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    Long id;
    private Long audit_id;
    private Integer visited_village_count;
    private Integer app_received_count;
    private Integer attended_app_count;
    private java.math.BigDecimal refreshment_charges;
    private Integer selected_vrp_count;
    private java.math.BigDecimal paided_amount;
    private java.math.BigDecimal photography_charges;
    private java.math.BigDecimal videos_charges;
    private java.math.BigDecimal ppleaflets;
    private java.math.BigDecimal stationary;
    private java.math.BigDecimal others;
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

    public Expenditure(){}

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

    public Integer getVisitedVillageCount() {
        return visited_village_count;
    }

    public void setVisitedVillageCount(Integer visited_village_count) {
        this.visited_village_count = visited_village_count;
    }

    public Integer getAppReceivedCount() {
        return app_received_count;
    }

    public void setAppReceivedCount(Integer app_received_count) {
        this.app_received_count = app_received_count;
    }

    public Integer getAttendedAppCount() {
        return attended_app_count;
    }

    public void setAttendedAppCount(Integer attended_app_count) {
        this.attended_app_count = attended_app_count;
    }

    public BigDecimal getRefreshmentCharges() {
        return refreshment_charges;
    }

    public void setRefreshmentCharges(BigDecimal refreshment_charges) {
        this.refreshment_charges = refreshment_charges;
    }

    public Integer getSelectedVrpCount() {
        return selected_vrp_count;
    }

    public void setSelectedVrpCount(Integer selected_vrp_count) {
        this.selected_vrp_count = selected_vrp_count;
    }

    public BigDecimal getPaidedAmount() {
        return paided_amount;
    }

    public void setPaidedAmount(BigDecimal paided_amount) {
        this.paided_amount = paided_amount;
    }

    public BigDecimal getPhotographyCharges() {
        return photography_charges;
    }

    public void setPhotographyCharges(BigDecimal photography_charges) {
        this.photography_charges = photography_charges;
    }

    public BigDecimal getVideosCharges() {
        return videos_charges;
    }

    public void setVideosCharges(BigDecimal videos_charges) {
        this.videos_charges = videos_charges;
    }

    public BigDecimal getPpleafLets() {
        return ppleaflets;
    }

    public void setPpleafLets(BigDecimal ppleaflets) {
        this.ppleaflets = ppleaflets;
    }

    public BigDecimal getStationary() {
        return stationary;
    }

    public void setStationary(BigDecimal stationary) {
        this.stationary = stationary;
    }

    public BigDecimal getOthers() {
        return others;
    }

    public void setOthers(BigDecimal others) {
        this.others = others;
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
}
