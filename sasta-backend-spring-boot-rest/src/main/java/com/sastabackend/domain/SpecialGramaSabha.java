package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 11/Nov/2015.
 */
@Entity(name ="vp_special_grama_sabha")
public class SpecialGramaSabha implements java.io.Serializable,CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private Long audit_id;
    private java.math.BigDecimal total_population;
    private java.math.BigDecimal total_families_in_vpts;
    private java.math.BigDecimal no_of_families_registered;
    private Long total_jcs_in_vpts;
    private java.math.BigDecimal no_of_ppl_attented_sgs;
    private String name_of_person_head_sgs;
    private Long name_of_person_recorded_minutes;
    private Long total_paras_placed_in_sgs;
    private Long paras_setteled;
    private java.math.BigDecimal amount_recovered_during_sgs;
    private Boolean sa_reports_uploaded;
    private Boolean atrs_uploaded;

    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;

    private String created_by_Name;
    private String modified_by_Name;

    private Long round_id;
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

    public SpecialGramaSabha(){}

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

    public BigDecimal getTotalPopulation() {
        return total_population;
    }

    public void setTotalPopulation(BigDecimal total_population) {
        this.total_population = total_population;
    }

    public BigDecimal getTotalFamiliesInVpts() {
        return total_families_in_vpts;
    }

    public void setTotalFamiliesInVpts(BigDecimal total_families_in_vpts) {
        this.total_families_in_vpts = total_families_in_vpts;
    }

    public BigDecimal getNoOfFamiliesRegistered() {
        return no_of_families_registered;
    }

    public void setNoOfFamiliesRegistered(BigDecimal no_of_families_registered) {
        this.no_of_families_registered = no_of_families_registered;
    }

    public Long getTotalJcsInVpts() {
        return total_jcs_in_vpts;
    }

    public void setTotalJcsInVpts(Long total_jcs_in_vpts) {
        this.total_jcs_in_vpts = total_jcs_in_vpts;
    }

    public BigDecimal getNoOfPplAttentedSgs() {
        return no_of_ppl_attented_sgs;
    }

    public void setNoOfPplAttentedSgs(BigDecimal no_of_ppl_attented_sgs) {
        this.no_of_ppl_attented_sgs = no_of_ppl_attented_sgs;
    }

    public String getNameOfPersonHeadSgs() {
        return name_of_person_head_sgs;
    }

    public void setNameOfPersonHeadSgs(String name_of_person_head_sgs) {
        this.name_of_person_head_sgs = name_of_person_head_sgs;
    }

    public Long getNameOfPersonRecordedMinutes() {
        return name_of_person_recorded_minutes;
    }

    public void setNameOfPersonRecordedMinutes(Long name_of_person_recorded_minutes) {
        this.name_of_person_recorded_minutes = name_of_person_recorded_minutes;
    }

    public Long getTotalParasPlacedInSgs() {
        return total_paras_placed_in_sgs;
    }

    public void setTotalParasPlacedInSgs(Long total_paras_placed_in_sgs) {
        this.total_paras_placed_in_sgs = total_paras_placed_in_sgs;
    }

    public Long getParasSetteled() {
        return paras_setteled;
    }

    public void setParasSetteled(Long paras_setteled) {
        this.paras_setteled = paras_setteled;
    }

    public BigDecimal getAmountRecoveredDuringSgs() {
        return amount_recovered_during_sgs;
    }

    public void setAmountRecoveredDuringSgs(BigDecimal amount_recovered_during_sgs) {
        this.amount_recovered_during_sgs = amount_recovered_during_sgs;
    }

    public Boolean getSaReportsUploaded() {
        return sa_reports_uploaded;
    }

    public void setSaReportsUploaded(Boolean sa_reports_uploaded) {
        this.sa_reports_uploaded = sa_reports_uploaded;
    }

    public Boolean getAtrsUploaded() {
        return atrs_uploaded;
    }

    public void setAtrsUploaded(Boolean atrs_uploaded) {
        this.atrs_uploaded = atrs_uploaded;
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

    public Long getRoundId() {
        return round_id;
    }

    public void setRoundId(Long round_id) {
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

    public String getBlockNHame() {
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
