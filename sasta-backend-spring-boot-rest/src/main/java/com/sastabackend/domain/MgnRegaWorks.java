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
    private Integer tota_lworks_executed;
    private Integer completed_work_count;
    private Integer pending_work_count;
    private Integer unskilled_wages_compl_works	;
    private Integer skilled_wages_compl_works;
    private Integer Material_exp_compl_works;
    private Integer administrative_exp_compl_works;
    private Integer compl_works_evaluated_by_SA;
    private Integer Exp_incurred_compl_works;
    private Integer compl_works_evaluated_SA_team;
    private Integer on_going_works_count;
    private Integer unskilled_wages_og_works;
    private Integer skilled_wages_og_works;
    private String mgnrega_workscol;
    private Integer Material_exp_ogl_works;
    private Integer administrative_exp_og_works;
    private Integer og_works_evaluated_by_SA;
    private Integer Exp_incurred_og_works;
    private Integer ogl_works_evaluated_SA_team;
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
        return audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
    }

    public Integer getTotalWorksExecuted() {
        return tota_lworks_executed;
    }

    public void setTotalWorksExecuted(Integer tota_lworks_executed) {
        this.tota_lworks_executed = tota_lworks_executed;
    }

    public Integer getCompletedWorkCount() {
        return completed_work_count;
    }

    public void setCompletedWorkCount(Integer completed_work_count) {
        this.completed_work_count = completed_work_count;
    }

    public Integer getPendingWorkCount() {
        return pending_work_count;
    }

    public void setPendingWorkCount(Integer pending_work_count) {
        this.pending_work_count = pending_work_count;
    }

    public Integer getUnskilledWagesComplWorks() {
        return unskilled_wages_compl_works;
    }

    public void setUnskilledWagesComplWorks(Integer unskilled_wages_compl_works) {
        this.unskilled_wages_compl_works = unskilled_wages_compl_works;
    }

    public Integer getSkilledWagesComplWorks() {
        return skilled_wages_compl_works;
    }

    public void setSkilledWagesComplWorks(Integer skilled_wages_compl_works) {
        this.skilled_wages_compl_works = skilled_wages_compl_works;
    }

    public Integer getMaterialExpComplWorks() {
        return Material_exp_compl_works;
    }

    public void setMaterialExpComplWorks(Integer material_exp_compl_works) {
        this.Material_exp_compl_works = material_exp_compl_works;
    }

    public Integer getAdministrativeExpComplWorks() {
        return administrative_exp_compl_works;
    }

    public void setAdministrativeExpComplWorks(Integer administrative_exp_compl_works) {
        this.administrative_exp_compl_works = administrative_exp_compl_works;
    }

    public Integer getComplWorksEvaluatedBySA() {
        return compl_works_evaluated_by_SA;
    }

    public void setComplWorksEvaluatedBySA(Integer compl_works_evaluated_by_SA) {
        this.compl_works_evaluated_by_SA = compl_works_evaluated_by_SA;
    }

    public Integer getExpIncurredComplWorks() {
        return Exp_incurred_compl_works;
    }

    public void setExpIncurredComplWorks(Integer exp_incurred_compl_works) {
        Exp_incurred_compl_works = exp_incurred_compl_works;
    }

    public Integer getComplWorksEvaluatedSATeam() {
        return compl_works_evaluated_SA_team;
    }

    public void setComplWorksEvaluatedSATeam(Integer compl_works_evaluated_SA_team) {
        this.compl_works_evaluated_SA_team = compl_works_evaluated_SA_team;
    }

    public Integer getOnGoingWorksCount() {
        return on_going_works_count;
    }

    public void setOnGoingWorksCount(Integer on_going_works_count) {
        this.on_going_works_count = on_going_works_count;
    }

    public Integer getUnskilledWagesOgWorks() {
        return unskilled_wages_og_works;
    }

    public void setUnskilledWagesOgWorks(Integer unskilled_wages_og_works) {
        this.unskilled_wages_og_works = unskilled_wages_og_works;
    }

    public Integer getSkilledWagesOgWorks() {
        return skilled_wages_og_works;
    }

    public void setSkilledWagesOgWorks(Integer skilled_wages_og_works) {
        this.skilled_wages_og_works = skilled_wages_og_works;
    }

    public String getMgnRegaWorksCol() {
        return this.mgnrega_workscol;
    }

    public void setMgnRegaWorksCol(String mgnrega_workscol) {
        this.mgnrega_workscol = mgnrega_workscol;
    }

    public Integer getMaterialExpOglWorks() {
        return this.Material_exp_ogl_works;
    }

    public void setMaterialExpOglWorks(Integer material_exp_ogl_works) {
        this.Material_exp_ogl_works = material_exp_ogl_works;
    }

    public Integer getAdministrativeExpOgWorks() {
        return this.administrative_exp_og_works;
    }

    public void setAdministrativeExpOgWorks(Integer administrative_exp_og_works) {
        this.administrative_exp_og_works = administrative_exp_og_works;
    }

    public Integer getOgWorksEvaluatedBySA() {
        return og_works_evaluated_by_SA;
    }

    public void setOgWorksEvaluatedBySA(Integer og_works_evaluated_by_SA) {
        this.og_works_evaluated_by_SA = og_works_evaluated_by_SA;
    }

    public Integer getExpIncurredOgWorks() {
        return Exp_incurred_og_works;
    }

    public void setExpIncurredOgWorks(Integer exp_incurred_og_works) {
        this.Exp_incurred_og_works = exp_incurred_og_works;
    }

    public Integer getOglWorksEvaluatedSATeam() {
        return this.ogl_works_evaluated_SA_team;
    }

    public void setOglWorksEvaluatedSATeam(Integer ogl_works_evaluated_SA_team) {
        this.ogl_works_evaluated_SA_team = ogl_works_evaluated_SA_team;
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
                ", tota_lworks_executed=" + tota_lworks_executed +
                ", completed_work_count=" + completed_work_count +
                ", pending_work_count=" + pending_work_count +
                ", unskilled_wages_compl_works=" + unskilled_wages_compl_works +
                ", skilled_wages_compl_works=" + skilled_wages_compl_works +
                ", Material_exp_compl_works=" + Material_exp_compl_works +
                ", administrative_exp_compl_works=" + administrative_exp_compl_works +
                ", compl_works_evaluated_by_SA=" + compl_works_evaluated_by_SA +
                ", Exp_incurred_compl_works=" + Exp_incurred_compl_works +
                ", compl_works_evaluated_SA_team=" + compl_works_evaluated_SA_team +
                ", on_going_works_count=" + on_going_works_count +
                ", unskilled_wages_og_works=" + unskilled_wages_og_works +
                ", skilled_wages_og_works=" + skilled_wages_og_works +
                ", mgnrega_workscol='" + mgnrega_workscol + '\'' +
                ", Material_exp_ogl_works=" + Material_exp_ogl_works +
                ", administrative_exp_og_works=" + administrative_exp_og_works +
                ", og_works_evaluated_by_SA=" + og_works_evaluated_by_SA +
                ", Exp_incurred_og_works=" + Exp_incurred_og_works +
                ", ogl_works_evaluated_SA_team=" + ogl_works_evaluated_SA_team +
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
