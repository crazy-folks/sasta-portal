package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 27/Dec/2015.
 */
@Entity(name = "grievances")
public class Grievances implements  CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private Long audit_id;
    private Integer total_received_grievances_HF;
    private Integer total_received_grievances_meeting;
    private Integer req_for_new_jc;
    private Integer req_for_more_than_100_days;
    private Integer req_for_construction_IHHL;
    private Integer req_for_construction_IAY_house;
    private Integer req_for_construction_cattle_shelter;
    private Integer demand_for_work;
    private Integer demand_for_renewel_jc;
    private Integer demand_for_individual_benefit_scheme;
    private Integer demand_for_wages_increase;
    private Integer demand_for_pds;
    private Integer demand_for_library_building;
    private Integer non_provision_of_work_site_facilities;
    private Integer complaint_against_banking_correspondent;
    private Integer OAP_not_provided_jc;
    private Integer OAP_not_provided_work;
    private Integer complaints_against_worksite_facilidator;
    private Integer complaints_against_VP_president;
    private Integer complaints_against_union_overseer;
    private Integer complaints_against_BDO_VP;
    private Integer complaints_against_VP_secretory;
    private Integer others;
    private Integer delay_wages_payment_count;
    private java.math.BigDecimal delay_wages_payment_amt;
    private Integer full_entitlement_not_given_count;
    private java.math.BigDecimal full_entitlement_not_given_amt;
    private Integer less_payment_value_recorded_MBook_count;
    private java.math.BigDecimal less_payment_value_recorded_MBook_amt;
    private Integer wages_drawn_less_than_actual_no_days_count;
    private java.math.BigDecimal wages_drawn_less_than_actual_no_days_amt;
    private Integer wages_not_paid_workers_actually_worked_count;
    private java.math.BigDecimal wages_not_paid_workers_actually_worked_amt;
    private Integer transport_allowance_not_given_count;
    private java.math.BigDecimal transport_allowance_not_given_amt;
    private Integer no_compensation_injured_at_worksite_count;
    private java.math.BigDecimal no_compensation_injured_at_worksite_amt;
    private Integer no_compensation_dead_at_worksite_count;
    private java.math.BigDecimal no_compensation_dead_at_worksite_amt;
    private Integer req_payment_completed_IHHL_work_count;
    private java.math.BigDecimal req_payment_completed_IHHL_work_amt;
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

    public Grievances(){}

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

    public Integer getTotalReceivedGrievancesHF() {
        return total_received_grievances_HF;
    }

    public void setTotalReceivedGrievancesHF(Integer total_received_grievances_HF) {
        this.total_received_grievances_HF = total_received_grievances_HF;
    }

    public Integer getTotalReceivedGrievancesMeeting() {
        return total_received_grievances_meeting;
    }

    public void setTotalReceivedGrievancesMeeting(Integer total_received_grievances_meeting) {
        this.total_received_grievances_meeting = total_received_grievances_meeting;
    }

    public Integer getReqForNewJc() {
        return req_for_new_jc;
    }

    public void setReqForNewJc(Integer req_for_new_jc) {
        this.req_for_new_jc = req_for_new_jc;
    }

    public Integer getReqForMoreThan100Days() {
        return req_for_more_than_100_days;
    }

    public void setReqForMoreThan100Days(Integer req_for_more_than_100_days) {
        this.req_for_more_than_100_days = req_for_more_than_100_days;
    }

    public Integer getReqForConstructionIHHL() {
        return req_for_construction_IHHL;
    }

    public void setReqForConstructionIHHL(Integer req_for_construction_IHHL) {
        this.req_for_construction_IHHL = req_for_construction_IHHL;
    }

    public Integer getReqForConstructionIAYHouse() {
        return req_for_construction_IAY_house;
    }

    public void setReqForConstructionIAYHouse(Integer req_for_construction_IAY_house) {
        this.req_for_construction_IAY_house = req_for_construction_IAY_house;
    }

    public Integer getReqForConstructionCattleShelter() {
        return req_for_construction_cattle_shelter;
    }

    public void setReqForConstructionCattleShelter(Integer req_for_construction_cattle_shelter) {
        this.req_for_construction_cattle_shelter = req_for_construction_cattle_shelter;
    }

    public Integer getDemandForWork() {
        return demand_for_work;
    }

    public void setDemandForWork(Integer demand_for_work) {
        this.demand_for_work = demand_for_work;
    }

    public Integer getDemandForRenewelJc() {
        return demand_for_renewel_jc;
    }

    public void setDemandForRenewelJc(Integer demand_for_renewel_jc) {
        this.demand_for_renewel_jc = demand_for_renewel_jc;
    }

    public Integer getDemandForIndividualBenefitScheme() {
        return demand_for_individual_benefit_scheme;
    }

    public void setDemandForIndividualBenefitScheme(Integer demand_for_individual_benefit_scheme) {
        this.demand_for_individual_benefit_scheme = demand_for_individual_benefit_scheme;
    }

    public Integer getDemandForWagesIncrease() {
        return demand_for_wages_increase;
    }

    public void setDemandForWagesIncrease(Integer demand_for_wages_increase) {
        this.demand_for_wages_increase = demand_for_wages_increase;
    }

    public Integer getDemandForPds() {
        return demand_for_pds;
    }

    public void setDemandForPds(Integer demand_for_pds) {
        this.demand_for_pds = demand_for_pds;
    }

    public Integer getDemandForLibraryBuilding() {
        return demand_for_library_building;
    }

    public void setDemandForLibraryBuilding(Integer demand_for_library_building) {
        this.demand_for_library_building = demand_for_library_building;
    }

    public Integer getNonProvisionOfWorkSiteFacilities() {
        return non_provision_of_work_site_facilities;
    }

    public void setNonProvisionOfWorkSiteFacilities(Integer non_provision_of_work_site_facilities) {
        this.non_provision_of_work_site_facilities = non_provision_of_work_site_facilities;
    }

    public Integer getComplaintAgainstBankingCorrespondent() {
        return complaint_against_banking_correspondent;
    }

    public void setComplaintAgainstBankingCorrespondent(Integer complaint_against_banking_correspondent) {
        this.complaint_against_banking_correspondent = complaint_against_banking_correspondent;
    }

    public Integer getOAPNotProvidedJc() {
        return OAP_not_provided_jc;
    }

    public void setOAPNotProvidedJc(Integer OAP_not_provided_jc) {
        this.OAP_not_provided_jc = OAP_not_provided_jc;
    }

    public Integer getOAPNotProvidedWork() {
        return OAP_not_provided_work;
    }

    public void setOAPNotProvidedWork(Integer OAP_not_provided_work) {
        this.OAP_not_provided_work = OAP_not_provided_work;
    }

    public Integer getComplaintsAgainstWorksiteFacilidator() {
        return complaints_against_worksite_facilidator;
    }

    public void setComplaintsAgainstWorksiteFacilidator(Integer complaints_against_worksite_facilidator) {
        this.complaints_against_worksite_facilidator = complaints_against_worksite_facilidator;
    }

    public Integer getComplaintsAgainstVPPresident() {
        return complaints_against_VP_president;
    }

    public void setComplaintsAgainstVPPresident(Integer complaints_against_VP_president) {
        this.complaints_against_VP_president = complaints_against_VP_president;
    }

    public Integer getComplaintsAgainstUnionOverseer() {
        return complaints_against_union_overseer;
    }

    public void setComplaintsAgainstUnionOverseer(Integer complaints_against_union_overseer) {
        this.complaints_against_union_overseer = complaints_against_union_overseer;
    }

    public Integer getComplaintsAgainstBDOVP() {
        return complaints_against_BDO_VP;
    }

    public void setComplaintsAgainstBDOVP(Integer complaints_against_BDO_VP) {
        this.complaints_against_BDO_VP = complaints_against_BDO_VP;
    }

    public Integer getComplaintsAgainstVPSecretory() {
        return complaints_against_VP_secretory;
    }

    public void setComplaintsAgainstVPSecretory(Integer complaints_against_VP_secretory) {
        this.complaints_against_VP_secretory = complaints_against_VP_secretory;
    }

    public Integer getOthers() {
        return others;
    }

    public void setOthers(Integer others) {
        this.others = others;
    }

    public Integer getDelayWagesPaymentCount() {
        return delay_wages_payment_count;
    }

    public void setDelayWagesPaymentCount(Integer delay_wages_payment_count) {
        this.delay_wages_payment_count = delay_wages_payment_count;
    }

    public BigDecimal getDelayWagesPaymentAmt() {
        return delay_wages_payment_amt;
    }

    public void setDelayWagesPaymentAmt(BigDecimal delay_wages_payment_amt) {
        this.delay_wages_payment_amt = delay_wages_payment_amt;
    }

    public Integer getFullEntitlementNotGivenCount() {
        return full_entitlement_not_given_count;
    }

    public void setFullEntitlementNotGivenCount(Integer full_entitlement_not_given_count) {
        this.full_entitlement_not_given_count = full_entitlement_not_given_count;
    }

    public BigDecimal getFullEntitlementNotGivenAmt() {
        return full_entitlement_not_given_amt;
    }

    public void setFullEntitlementNotGivenAmt(BigDecimal full_entitlement_not_given_amt) {
        this.full_entitlement_not_given_amt = full_entitlement_not_given_amt;
    }

    public Integer getLessPaymentValueRecordedMBookCount() {
        return less_payment_value_recorded_MBook_count;
    }

    public void setLessPaymentValueRecordedMBookCount(Integer less_payment_value_recorded_MBook_count) {
        this.less_payment_value_recorded_MBook_count = less_payment_value_recorded_MBook_count;
    }

    public BigDecimal getLessPaymentValueRecordedMBookAmt() {
        return less_payment_value_recorded_MBook_amt;
    }

    public void setLessPaymentValueRecordedMBookAmt(BigDecimal less_payment_value_recorded_MBook_amt) {
        this.less_payment_value_recorded_MBook_amt = less_payment_value_recorded_MBook_amt;
    }

    public Integer getWagesDrawnLessThanActualNoDaysCount() {
        return wages_drawn_less_than_actual_no_days_count;
    }

    public void setWagesDrawnLessThanActualNoDaysCount(Integer wages_drawn_less_than_actual_no_days_count) {
        this.wages_drawn_less_than_actual_no_days_count = wages_drawn_less_than_actual_no_days_count;
    }

    public BigDecimal getWagesDrawnLessThanActualNoDaysAmt() {
        return wages_drawn_less_than_actual_no_days_amt;
    }

    public void setWagesDrawnLessThanActualNoDaysAmt(BigDecimal wages_drawn_less_than_actual_no_days_amt) {
        this.wages_drawn_less_than_actual_no_days_amt = wages_drawn_less_than_actual_no_days_amt;
    }

    public Integer getWagesNotPaidWorkersActuallyWorkedCount() {
        return wages_not_paid_workers_actually_worked_count;
    }

    public void setWagesNotPaidWorkersActuallyWorkedCount(Integer wages_not_paid_workers_actually_worked_count) {
        this.wages_not_paid_workers_actually_worked_count = wages_not_paid_workers_actually_worked_count;
    }

    public BigDecimal getWagesNotPaidWorkersActuallyWorkedAmt() {
        return wages_not_paid_workers_actually_worked_amt;
    }

    public void setWagesNotPaidWorkersActuallyWorkedAmt(BigDecimal wages_not_paid_workers_actually_worked_amt) {
        this.wages_not_paid_workers_actually_worked_amt = wages_not_paid_workers_actually_worked_amt;
    }

    public Integer getTransportAllowanceNotGivenCount() {
        return transport_allowance_not_given_count;
    }

    public void setTransportAllowanceNotGivenCount(Integer transport_allowance_not_given_count) {
        this.transport_allowance_not_given_count = transport_allowance_not_given_count;
    }

    public BigDecimal getTransportAllowanceNotGivenAmt() {
        return transport_allowance_not_given_amt;
    }

    public void setTransportAllowanceNotGivenAmt(BigDecimal transport_allowance_not_given_amt) {
        this.transport_allowance_not_given_amt = transport_allowance_not_given_amt;
    }

    public Integer getNoCompensationInjuredAtWorksiteCount() {
        return no_compensation_injured_at_worksite_count;
    }

    public void setNoCompensationInjuredAtWorksiteCount(Integer no_compensation_injured_at_worksite_count) {
        this.no_compensation_injured_at_worksite_count = no_compensation_injured_at_worksite_count;
    }

    public BigDecimal getNoCompensationInjuredAtWorksiteAmt() {
        return no_compensation_injured_at_worksite_amt;
    }

    public void setNoCompensationInjuredAtWorksiteAmt(BigDecimal no_compensation_injured_at_worksite_amt) {
        this.no_compensation_injured_at_worksite_amt = no_compensation_injured_at_worksite_amt;
    }

    public Integer getNoCompensationDeadAtWorksiteCount() {
        return no_compensation_dead_at_worksite_count;
    }

    public void setNoCompensationDeadAtWorksiteCount(Integer no_compensation_dead_at_worksite_count) {
        this.no_compensation_dead_at_worksite_count = no_compensation_dead_at_worksite_count;
    }

    public BigDecimal getNoCompensationDeadAtWorksiteAmt() {
        return no_compensation_dead_at_worksite_amt;
    }

    public void setNoCompensationDeadAtWorksiteAmt(BigDecimal no_compensation_dead_at_worksite_amt) {
        this.no_compensation_dead_at_worksite_amt = no_compensation_dead_at_worksite_amt;
    }

    public Integer getReqPaymentCompletedIHHLWorkCount() {
        return req_payment_completed_IHHL_work_count;
    }

    public void setReqPaymentCompletedIHHLWorkCount(Integer req_payment_completed_IHHL_work_count) {
        this.req_payment_completed_IHHL_work_count = req_payment_completed_IHHL_work_count;
    }

    public BigDecimal getReqPaymentCompletedIHHLWorkAmt() {
        return req_payment_completed_IHHL_work_amt;
    }

    public void setReqPaymentCompletedIHHLWorkAmt(BigDecimal req_payment_completed_IHHL_work_amt) {
        this.req_payment_completed_IHHL_work_amt = req_payment_completed_IHHL_work_amt;
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
        return "Grievances{" +
                "id=" + id +
                ", audit_id=" + audit_id +
                ", total_received_grievances_HF=" + total_received_grievances_HF +
                ", total_received_grievances_meeting=" + total_received_grievances_meeting +
                ", req_for_new_jc=" + req_for_new_jc +
                ", req_for_more_than_100_days=" + req_for_more_than_100_days +
                ", req_for_construction_IHHL=" + req_for_construction_IHHL +
                ", req_for_construction_IAY_house=" + req_for_construction_IAY_house +
                ", req_for_construction_cattle_shelter=" + req_for_construction_cattle_shelter +
                ", demand_for_work=" + demand_for_work +
                ", demand_for_renewel_jc=" + demand_for_renewel_jc +
                ", demand_for_individual_benefit_scheme=" + demand_for_individual_benefit_scheme +
                ", demand_for_wages_increase=" + demand_for_wages_increase +
                ", demand_for_pds=" + demand_for_pds +
                ", demand_for_library_building=" + demand_for_library_building +
                ", non_provision_of_work_site_facilities=" + non_provision_of_work_site_facilities +
                ", complaint_against_banking_correspondent=" + complaint_against_banking_correspondent +
                ", OAP_not_provided_jc=" + OAP_not_provided_jc +
                ", OAP_not_provided_work=" + OAP_not_provided_work +
                ", complaints_against_worksite_facilidator=" + complaints_against_worksite_facilidator +
                ", complaints_against_VP_president=" + complaints_against_VP_president +
                ", complaints_against_union_overseer=" + complaints_against_union_overseer +
                ", complaints_against_BDO_VP=" + complaints_against_BDO_VP +
                ", complaints_against_VP_secretory=" + complaints_against_VP_secretory +
                ", others=" + others +
                ", delay_wages_payment_count=" + delay_wages_payment_count +
                ", delay_wages_payment_amt=" + delay_wages_payment_amt +
                ", full_entitlement_not_given_count=" + full_entitlement_not_given_count +
                ", full_entitlement_not_given_amt=" + full_entitlement_not_given_amt +
                ", less_payment_value_recorded_MBook_count=" + less_payment_value_recorded_MBook_count +
                ", less_payment_value_recorded_MBook_amt=" + less_payment_value_recorded_MBook_amt +
                ", wages_drawn_less_than_actual_no_days_count=" + wages_drawn_less_than_actual_no_days_count +
                ", wages_drawn_less_than_actual_no_days_amt=" + wages_drawn_less_than_actual_no_days_amt +
                ", wages_not_paid_workers_actually_worked_count=" + wages_not_paid_workers_actually_worked_count +
                ", wages_not_paid_workers_actually_worked_amt=" + wages_not_paid_workers_actually_worked_amt +
                ", transport_allowance_not_given_count=" + transport_allowance_not_given_count +
                ", transport_allowance_not_given_amt=" + transport_allowance_not_given_amt +
                ", no_compensation_injured_at_worksite_count=" + no_compensation_injured_at_worksite_count +
                ", no_compensation_injured_at_worksite_amt=" + no_compensation_injured_at_worksite_amt +
                ", no_compensation_dead_at_worksite_count=" + no_compensation_dead_at_worksite_count +
                ", no_compensation_dead_at_worksite_amt=" + no_compensation_dead_at_worksite_amt +
                ", req_payment_completed_IHHL_work_count=" + req_payment_completed_IHHL_work_count +
                ", req_payment_completed_IHHL_work_amt=" + req_payment_completed_IHHL_work_amt +
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
