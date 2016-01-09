package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 26/Dec/2015.
 */

@Entity(name="mgnrega_works")
public class MgnRegaWorks implements  CommonProperties{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private Long audit_id;

    private Integer total_works_executed_during_FY;
    private Integer no_of_works_completed;
    private Integer no_of_pending_works;
    private Integer unskilled_wages_for_completed_works;
    private Integer skilled_wages_for_completed_works;
    private Integer material_exp_for_completed_works;
    private Integer administrative_exp_for_completed_works;
    private Integer no_of_completed_works_evaluated_by_SA;
    private Integer exp_incurred_for_completed_works;
    private Integer value_of_completed_works_evaluated_by_SA_team;
    private Integer no_of_on_going_works;
    private Integer unskilled_wages_for_on_going_works;
    private Integer skilled_wages_for_on_going_works;
    private Integer material_exp_for_on_going_works;
    private Integer administrative_exp_for_on_going_works;
    private Integer no_of_on_going_works_evaluated_by_SA_team;
    private Integer exp_incurred_for_on_going_works;
    private Integer value_of_on_going_works_evaluated_by_SA_team;

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

    public MgnRegaWorks(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuditId() {
        return this.audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
    }

    public Integer getTotalWorksExecutedDuringFY() {
        return total_works_executed_during_FY;
    }

    public void setTotalWorksExecutedDuringFY(Integer total_works_executed_during_FY) {
        this.total_works_executed_during_FY = total_works_executed_during_FY;
    }

    public Integer getNoOfWorksCompleted() {
        return no_of_works_completed;
    }

    public void setNoOfWorksCompleted(Integer no_of_works_completed) {
        this.no_of_works_completed = no_of_works_completed;
    }

    public Integer getNoOfPendingWorks() {
        return no_of_pending_works;
    }

    public void setNoOfPendingWorks(Integer no_of_pending_works) {
        this.no_of_pending_works = no_of_pending_works;
    }

    public Integer getUnskilledWagesForCompletedWorks() {
        return unskilled_wages_for_completed_works;
    }

    public void setUnskilledWagesForCompletedWorks(Integer unskilled_wages_for_completed_works) {
        this.unskilled_wages_for_completed_works = unskilled_wages_for_completed_works;
    }

    public Integer getSkilledWagesForCompletedWorks() {
        return skilled_wages_for_completed_works;
    }

    public void setSkilledWagesForCompletedWorks(Integer skilled_wages_for_completed_works) {
        this.skilled_wages_for_completed_works = skilled_wages_for_completed_works;
    }

    public Integer getMaterialExpForCompletedWorks() {
        return material_exp_for_completed_works;
    }

    public void setMaterialExpForCompletedWorks(Integer material_exp_for_completed_works) {
        this.material_exp_for_completed_works = material_exp_for_completed_works;
    }

    public Integer getAdministrativeExpForCompletedWorks() {
        return administrative_exp_for_completed_works;
    }

    public void setAdministrativeExpForCompletedWorks(Integer administrative_exp_for_completed_works) {
        this.administrative_exp_for_completed_works = administrative_exp_for_completed_works;
    }

    public Integer getNoOfCompletedWorksEvaluatedBySA() {
        return no_of_completed_works_evaluated_by_SA;
    }

    public void setNoOfCompletedWorksEvaluatedBySA(Integer no_of_completed_works_evaluated_by_SA) {
        this.no_of_completed_works_evaluated_by_SA = no_of_completed_works_evaluated_by_SA;
    }

    public Integer getExpIncurredForCompletedWorks() {
        return exp_incurred_for_completed_works;
    }

    public void setExpIncurredForCompletedWorks(Integer exp_incurred_for_completed_works) {
        this.exp_incurred_for_completed_works = exp_incurred_for_completed_works;
    }

    public Integer getValueOfCompletedWorksEvaluatedBySATeam() {
        return value_of_completed_works_evaluated_by_SA_team;
    }

    public void setValueOfCompletedWorksEvaluatedBySATeam(Integer value_of_completed_works_evaluated_by_SA_team) {
        this.value_of_completed_works_evaluated_by_SA_team = value_of_completed_works_evaluated_by_SA_team;
    }

    public Integer getNoOfOnGoingWorks() {
        return no_of_on_going_works;
    }

    public void setNoOfOnGoingWorks(Integer no_of_on_going_works) {
        this.no_of_on_going_works = no_of_on_going_works;
    }

    public Integer getUnSkilledWagesForOnGoingWorks() {
        return unskilled_wages_for_on_going_works;
    }

    public void setUnSkilledWagesForOnGoingWorks(Integer unskilled_wages_for_on_going_works) {
        this.unskilled_wages_for_on_going_works = unskilled_wages_for_on_going_works;
    }

    public Integer getSkilledWagesForOnGoingWorks() {
        return skilled_wages_for_on_going_works;
    }

    public void setSkilledWagesForOnGoingWorks(Integer skilled_wages_for_on_going_works) {
        this.skilled_wages_for_on_going_works = skilled_wages_for_on_going_works;
    }

    public Integer getMaterialExpForOnGoingWorks() {
        return material_exp_for_on_going_works;
    }

    public void setMaterialExpForOnGoingWorks(Integer material_exp_for_on_going_works) {
        this.material_exp_for_on_going_works = material_exp_for_on_going_works;
    }

    public Integer getAdministrativeExpForOnGoingWorks() {
        return administrative_exp_for_on_going_works;
    }

    public void setAdministrativeExpForOnGoingWorks(Integer administrative_exp_for_on_going_works) {
        this.administrative_exp_for_on_going_works = administrative_exp_for_on_going_works;
    }

    public Integer getNoOfOnGoingWorksEvaluatedBySATeam() {
        return no_of_on_going_works_evaluated_by_SA_team;
    }

    public void setNoOfOnGoingWorksEvaluatedBySATeam(Integer no_of_on_going_works_evaluated_by_SA_team) {
        this.no_of_on_going_works_evaluated_by_SA_team = no_of_on_going_works_evaluated_by_SA_team;
    }

    public Integer getExpIncurredForOnGoingWorks() {
        return exp_incurred_for_on_going_works;
    }

    public void setExpIncurredForOnGoingWorks(Integer exp_incurred_for_on_going_works) {
        this.exp_incurred_for_on_going_works = exp_incurred_for_on_going_works;
    }

    public Integer getValueOfOnGoingWorksEvaluatedBySATeam() {
        return value_of_on_going_works_evaluated_by_SA_team;
    }

    public void setValueOfOnGoingWorksEvaluatedBySATeam(Integer value_of_on_going_works_evaluated_by_SA_team) {
        this.value_of_on_going_works_evaluated_by_SA_team = value_of_on_going_works_evaluated_by_SA_team;
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
        return "MgnRegaWorks{" +
                "id=" + id +
                ", audit_id=" + audit_id +
                ", total_works_executed_during_FY=" + total_works_executed_during_FY +
                ", no_of_works_completed=" + no_of_works_completed +
                ", no_of_pending_works=" + no_of_pending_works +
                ", unskilled_wages_for_completed_works=" + unskilled_wages_for_completed_works +
                ", skilled_wages_for_completed_works=" + skilled_wages_for_completed_works +
                ", material_exp_for_completed_works=" + material_exp_for_completed_works +
                ", administrative_exp_for_completed_works=" + administrative_exp_for_completed_works +
                ", no_of_completed_works_evaluated_by_SA=" + no_of_completed_works_evaluated_by_SA +
                ", exp_incurred_for_completed_works=" + exp_incurred_for_completed_works +
                ", value_of_completed_works_evaluated_by_SA_team=" + value_of_completed_works_evaluated_by_SA_team +
                ", no_of_on_going_works=" + no_of_on_going_works +
                ", unskilled_wages_for_on_going_works=" + unskilled_wages_for_on_going_works +
                ", skilled_wages_for_on_going_works=" + skilled_wages_for_on_going_works +
                ", material_exp_for_on_going_works=" + material_exp_for_on_going_works +
                ", administrative_exp_for_on_going_works=" + administrative_exp_for_on_going_works +
                ", no_of_on_going_works_evaluated_by_SA_team=" + no_of_on_going_works_evaluated_by_SA_team +
                ", exp_incurred_for_on_going_works=" + exp_incurred_for_on_going_works +
                ", value_of_on_going_works_evaluated_by_SA_team=" + value_of_on_going_works_evaluated_by_SA_team +
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
