package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 26/Dec/2015.
 */
@Entity(name = "deviation")
public class Deviation implements CommonProperties {
    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private Long audit_id;
    private Integer jc_misused_by_others_count;
    private java.math.BigDecimal jc_misused_by_others_amt;
    private Integer wages_paid_workers_without_jc_count;
    private java.math.BigDecimal wages_paid_workers_without_jc_amt;
    private Integer wages_paid_without_record_mesurement_count;
    private java.math.BigDecimal wages_paid_without_record_mesurement_amt;
    private Integer wages_paid_excess_mbooks_value_count;
    private java.math.BigDecimal wages_paid_excess_mbooks_value_amt;
    private Integer variations_between_NMR_register_count;
    private java.math.BigDecimal variations_between_NMR_register_amt;
    private Integer NMR_overwriting_corrections_count;
    private java.math.BigDecimal NMR_overwriting_corrections_amt;
    private Integer ineligible_workers_include_under18_count;
    private java.math.BigDecimal ineligible_workers_include_under18_amt;
    private Integer diff_onlineNMR_physicalNMR_count;
    private java.math.BigDecimal diff_onlineNMR_physicalNMR_amt;
    private Integer wages_payment_from_scheme_count;
    private java.math.BigDecimal wages_payment_from_scheme_amt;
    private Integer amount_morethan_NMR_FTO_count;
    private java.math.BigDecimal amount_morethan_NMR_FTO_amt;
    private Integer NMR_not_produced_for_audit_count;
    private java.math.BigDecimal NMR_not_produced_for_audit_amt;
    private Integer mbooks_not_produced_for_audit_count;
    private java.math.BigDecimal mbooks_not_produced_for_audit_amt;
    private Integer shortage_measurements_count;
    private java.math.BigDecimal shortage_measurements_amt;
    private Integer works_takenup_without_gb_approval_count;
    private java.math.BigDecimal works_takenup_without_gb_approval_amt;
    private Integer estimates_not_produced_for_audit_count;
    private java.math.BigDecimal estimates_not_produced_for_audit_amt;
    private Integer AS_not_produced_for_audit_count;
    private java.math.BigDecimal AS_not_produced_for_audit_amt;
    private Integer TS_not_produced_for_audit_count;
    private java.math.BigDecimal TS_not_produced_for_audit_amt;
    private Integer none_adoption_ofschedule_rate_count;
    private java.math.BigDecimal none_adoption_ofschedule_rate_amt;
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

    public Deviation(){}

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

    public Integer getJcMisusedByOthersCount() {
        return jc_misused_by_others_count;
    }

    public void setJcMisusedByOthersCount(Integer jc_misused_by_others_count) {
        this.jc_misused_by_others_count = jc_misused_by_others_count;
    }

    public BigDecimal getJcMisusedByOthersAmt() {
        return jc_misused_by_others_amt;
    }

    public void setJcMisusedByOthersAmt(BigDecimal jc_misused_by_others_amt) {
        this.jc_misused_by_others_amt = jc_misused_by_others_amt;
    }

    public Integer getWagesPaidWorkersWithoutJcCount() {
        return wages_paid_workers_without_jc_count;
    }

    public void setWagesPaidWorkersWithoutJcCount(Integer wages_paid_workers_without_jc_count) {
        this.wages_paid_workers_without_jc_count = wages_paid_workers_without_jc_count;
    }

    public BigDecimal getWagesPaidWorkersWithoutJcAmt() {
        return wages_paid_workers_without_jc_amt;
    }

    public void setWagesPaidWorkersWithoutJcAmt(BigDecimal wages_paid_workers_without_jc_amt) {
        this.wages_paid_workers_without_jc_amt = wages_paid_workers_without_jc_amt;
    }

    public Integer getWagesPaidWithoutRecordMesurementCount() {
        return wages_paid_without_record_mesurement_count;
    }

    public void setWagesPaidWithoutRecordMesurementCount(Integer wages_paid_without_record_mesurement_count) {
        this.wages_paid_without_record_mesurement_count = wages_paid_without_record_mesurement_count;
    }

    public BigDecimal getWagesPaidWithoutRecordMesurementAmt() {
        return wages_paid_without_record_mesurement_amt;
    }

    public void setWagesPaidWithoutRecordMesurementAmt(BigDecimal wages_paid_without_record_mesurement_amt) {
        this.wages_paid_without_record_mesurement_amt = wages_paid_without_record_mesurement_amt;
    }

    public Integer getWagesPaidExcessMBooksValueCount() {
        return wages_paid_excess_mbooks_value_count;
    }

    public void setWagesPaidExcessMBooksValueCount(Integer wages_paid_excess_mbooks_value_count) {
        this.wages_paid_excess_mbooks_value_count = wages_paid_excess_mbooks_value_count;
    }

    public BigDecimal getWagesPaidExcessMBooksValueAmt() {
        return wages_paid_excess_mbooks_value_amt;
    }

    public void setWagesPaidExcessMBooksValueAmt(BigDecimal wages_paid_excess_mbooks_value_amt) {
        this.wages_paid_excess_mbooks_value_amt = wages_paid_excess_mbooks_value_amt;
    }

    public Integer getVariationsBetweenNMRRegisterCount() {
        return variations_between_NMR_register_count;
    }

    public void setVariationsBetweenNMRRegisterCount(Integer variations_between_NMR_register_count) {
        this.variations_between_NMR_register_count = variations_between_NMR_register_count;
    }

    public BigDecimal getVariationsBetweenNMRRegisterAmt() {
        return variations_between_NMR_register_amt;
    }

    public void setVariationsBetweenNMRRegisterAmt(BigDecimal variations_between_NMR_register_amt) {
        this.variations_between_NMR_register_amt = variations_between_NMR_register_amt;
    }

    public Integer getNMROverWritingCorrectionsCount() {
        return NMR_overwriting_corrections_count;
    }

    public void setNMROverWritingCorrectionsCount(Integer NMR_overwriting_corrections_count) {
        this.NMR_overwriting_corrections_count = NMR_overwriting_corrections_count;
    }

    public BigDecimal getNMROverWritingCorrectionsAmt() {
        return NMR_overwriting_corrections_amt;
    }

    public void setNMROverWritingCorrectionsAmt(BigDecimal NMR_overwriting_corrections_amt) {
        this.NMR_overwriting_corrections_amt = NMR_overwriting_corrections_amt;
    }

    public Integer getInEligibleWorkersIncludeUnder18Count() {
        return ineligible_workers_include_under18_count;
    }

    public void setInEligibleWorkersIncludeUnder18Count(Integer ineligible_workers_include_under18_count) {
        this.ineligible_workers_include_under18_count = ineligible_workers_include_under18_count;
    }

    public BigDecimal getInEligibleWorkersIncludeUnder18Amt() {
        return ineligible_workers_include_under18_amt;
    }

    public void setInEligibleWorkersIncludeUnder18Amt(BigDecimal ineligible_workers_include_under18_amt) {
        this.ineligible_workers_include_under18_amt = ineligible_workers_include_under18_amt;
    }

    public Integer getDiffOnlineNMRPhysicalNMRCount() {
        return diff_onlineNMR_physicalNMR_count;
    }

    public void setDiffOnlineNMRPhysicalNMRCount(Integer diff_onlineNMR_physicalNMR_count) {
        this.diff_onlineNMR_physicalNMR_count = diff_onlineNMR_physicalNMR_count;
    }

    public BigDecimal getDiffOnlineNMRPhysicalNMRAmt() {
        return diff_onlineNMR_physicalNMR_amt;
    }

    public void setDiffOnlineNMRPhysicalNMRAmt(BigDecimal diff_onlineNMR_physicalNMR_amt) {
        this.diff_onlineNMR_physicalNMR_amt = diff_onlineNMR_physicalNMR_amt;
    }

    public Integer getWagesPaymentFromSchemeCount() {
        return wages_payment_from_scheme_count;
    }

    public void setWagesPaymentFromSchemeCount(Integer wages_payment_from_scheme_count) {
        this.wages_payment_from_scheme_count = wages_payment_from_scheme_count;
    }

    public BigDecimal getWagesPaymentFromSchemeAmt() {
        return wages_payment_from_scheme_amt;
    }

    public void setWagesPaymentFromSchemeAmt(BigDecimal wages_payment_from_scheme_amt) {
        this.wages_payment_from_scheme_amt = wages_payment_from_scheme_amt;
    }

    public Integer getAmountMoreThanNMRFTOCount() {
        return amount_morethan_NMR_FTO_count;
    }

    public void setAmountMoreThanNMRFTOCount(Integer amount_morethan_NMR_FTO_count) {
        this.amount_morethan_NMR_FTO_count = amount_morethan_NMR_FTO_count;
    }

    public BigDecimal getAmountMoreThanNMRFTOAmt() {
        return amount_morethan_NMR_FTO_amt;
    }

    public void setAmountMoreThanNMRFTOAmt(BigDecimal amount_morethan_NMR_FTO_amt) {
        this.amount_morethan_NMR_FTO_amt = amount_morethan_NMR_FTO_amt;
    }

    public Integer getNMRNotProducedForAuditCount() {
        return NMR_not_produced_for_audit_count;
    }

    public void setNMRNotProducedForAuditCount(Integer NMR_not_produced_for_audit_count) {
        this.NMR_not_produced_for_audit_count = NMR_not_produced_for_audit_count;
    }

    public BigDecimal getNMRNotProducedForAuditAmt() {
        return NMR_not_produced_for_audit_amt;
    }

    public void setNMRNotProducedForAuditAmt(BigDecimal NMR_not_produced_for_audit_amt) {
        this.NMR_not_produced_for_audit_amt = NMR_not_produced_for_audit_amt;
    }

    public Integer getMbooksNotProducedForAuditCount() {
        return mbooks_not_produced_for_audit_count;
    }

    public void setMbooksNotProducedForAuditCount(Integer mbooks_not_produced_for_audit_count) {
        this.mbooks_not_produced_for_audit_count = mbooks_not_produced_for_audit_count;
    }

    public BigDecimal getMbooksNotProducedForAuditAmt() {
        return mbooks_not_produced_for_audit_amt;
    }

    public void setMbooksNotProducedForAuditAmt(BigDecimal mbooks_not_produced_for_audit_amt) {
        this.mbooks_not_produced_for_audit_amt = mbooks_not_produced_for_audit_amt;
    }

    public Integer getShortageMeasurementsCount() {
        return shortage_measurements_count;
    }

    public void setShortageMeasurementsCount(Integer shortage_measurements_count) {
        this.shortage_measurements_count = shortage_measurements_count;
    }

    public BigDecimal getShortageMeasurementsAmt() {
        return shortage_measurements_amt;
    }

    public void setShortageMeasurementsAmt(BigDecimal shortage_measurements_amt) {
        this.shortage_measurements_amt = shortage_measurements_amt;
    }

    public Integer getWorksTakenUpWithoutGbApprovalCount() {
        return works_takenup_without_gb_approval_count;
    }

    public void setWorksTakenUpWithoutGbApprovalCount(Integer works_takenup_without_gb_approval_count) {
        this.works_takenup_without_gb_approval_count = works_takenup_without_gb_approval_count;
    }

    public BigDecimal getWorksTakenUpWithoutGbApprovalAmt() {
        return works_takenup_without_gb_approval_amt;
    }

    public void setWorksTakenUpWithoutGbApprovalAmt(BigDecimal works_takenup_without_gb_approval_amt) {
        this.works_takenup_without_gb_approval_amt = works_takenup_without_gb_approval_amt;
    }

    public Integer getEstimatesNotProducedForAuditCount() {
        return estimates_not_produced_for_audit_count;
    }

    public void setEstimatesNotProducedForAuditCount(Integer estimates_not_produced_for_audit_count) {
        this.estimates_not_produced_for_audit_count = estimates_not_produced_for_audit_count;
    }

    public BigDecimal getEstimatesNotProducedForAuditAmt() {
        return estimates_not_produced_for_audit_amt;
    }

    public void setEstimatesNotProducedForAuditAmt(BigDecimal estimates_not_produced_for_audit_amt) {
        this.estimates_not_produced_for_audit_amt = estimates_not_produced_for_audit_amt;
    }

    public Integer getASNotProducedForAuditCount() {
        return AS_not_produced_for_audit_count;
    }

    public void setASNotProducedForAuditCount(Integer AS_not_produced_for_audit_count) {
        this.AS_not_produced_for_audit_count = AS_not_produced_for_audit_count;
    }

    public BigDecimal getASNotProducedForAuditAmt() {
        return AS_not_produced_for_audit_amt;
    }

    public void setASNotProducedForAuditAmt(BigDecimal AS_not_produced_for_audit_amt) {
        this.AS_not_produced_for_audit_amt = AS_not_produced_for_audit_amt;
    }

    public Integer getTSNotProducedForAuditCount() {
        return TS_not_produced_for_audit_count;
    }

    public void setTSNotProducedForAuditCount(Integer TS_not_produced_for_audit_count) {
        this.TS_not_produced_for_audit_count = TS_not_produced_for_audit_count;
    }

    public BigDecimal getTSNotProducedForAuditAmt() {
        return TS_not_produced_for_audit_amt;
    }

    public void setTSNotProducedForAuditAmt(BigDecimal TS_not_produced_for_audit_amt) {
        this.TS_not_produced_for_audit_amt = TS_not_produced_for_audit_amt;
    }

    public Integer getNoneAdoptionOfScheduleRateCount() {
        return none_adoption_ofschedule_rate_count;
    }

    public void setNoneAdoptionOfScheduleRateCount(Integer none_adoption_ofschedule_rate_count) {
        this.none_adoption_ofschedule_rate_count = none_adoption_ofschedule_rate_count;
    }

    public BigDecimal getNoneAdoptionOfScheduleRateAmt() {
        return none_adoption_ofschedule_rate_amt;
    }

    public void setNoneAdoptionOfScheduleRateAmt(BigDecimal none_adoption_ofschedule_rate_amt) {
        this.none_adoption_ofschedule_rate_amt = none_adoption_ofschedule_rate_amt;
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
        return "Deviation{" +
                "ineligible_workers_include_under18_count=" + ineligible_workers_include_under18_count +
                ", id=" + id +
                ", audit_id=" + audit_id +
                ", jc_misused_by_others_count=" + jc_misused_by_others_count +
                ", jc_misused_by_others_amt=" + jc_misused_by_others_amt +
                ", wages_paid_workers_without_jc_count=" + wages_paid_workers_without_jc_count +
                ", wages_paid_workers_without_jc_amt=" + wages_paid_workers_without_jc_amt +
                ", wages_paid_without_record_mesurement_count=" + wages_paid_without_record_mesurement_count +
                ", wages_paid_without_record_mesurement_amt=" + wages_paid_without_record_mesurement_amt +
                ", wages_paid_excess_mbooks_value_count=" + wages_paid_excess_mbooks_value_count +
                ", wages_paid_excess_mbooks_value_amt=" + wages_paid_excess_mbooks_value_amt +
                ", variations_between_NMR_register_count=" + variations_between_NMR_register_count +
                ", variations_between_NMR_register_amt=" + variations_between_NMR_register_amt +
                ", NMR_overwriting_corrections_count=" + NMR_overwriting_corrections_count +
                ", NMR_overwriting_corrections_amt=" + NMR_overwriting_corrections_amt +
                ", ineligible_workers_include_under18_amt=" + ineligible_workers_include_under18_amt +
                ", diff_onlineNMR_physicalNMR_count=" + diff_onlineNMR_physicalNMR_count +
                ", diff_onlineNMR_physicalNMR_amt=" + diff_onlineNMR_physicalNMR_amt +
                ", wages_payment_from_scheme_count=" + wages_payment_from_scheme_count +
                ", wages_payment_from_scheme_amt=" + wages_payment_from_scheme_amt +
                ", amount_morethan_NMR_FTO_count=" + amount_morethan_NMR_FTO_count +
                ", amount_morethan_NMR_FTO_amt=" + amount_morethan_NMR_FTO_amt +
                ", NMR_not_produced_for_audit_count=" + NMR_not_produced_for_audit_count +
                ", NMR_not_produced_for_audit_amt=" + NMR_not_produced_for_audit_amt +
                ", mbooks_not_produced_for_audit_count=" + mbooks_not_produced_for_audit_count +
                ", mbooks_not_produced_for_audit_amt=" + mbooks_not_produced_for_audit_amt +
                ", shortage_measurements_count=" + shortage_measurements_count +
                ", shortage_measurements_amt=" + shortage_measurements_amt +
                ", works_takenup_without_gb_approval_count=" + works_takenup_without_gb_approval_count +
                ", works_takenup_without_gb_approval_amt=" + works_takenup_without_gb_approval_amt +
                ", estimates_not_produced_for_audit_count=" + estimates_not_produced_for_audit_count +
                ", estimates_not_produced_for_audit_amt=" + estimates_not_produced_for_audit_amt +
                ", AS_not_produced_for_audit_count=" + AS_not_produced_for_audit_count +
                ", AS_not_produced_for_audit_amt=" + AS_not_produced_for_audit_amt +
                ", TS_not_produced_for_audit_count=" + TS_not_produced_for_audit_count +
                ", TS_not_produced_for_audit_amt=" + TS_not_produced_for_audit_amt +
                ", none_adoption_ofschedule_rate_count=" + none_adoption_ofschedule_rate_count +
                ", none_adoption_ofschedule_rate_amt=" + none_adoption_ofschedule_rate_amt +
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
