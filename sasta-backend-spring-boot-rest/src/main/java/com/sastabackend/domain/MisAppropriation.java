package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by SARVA on 26/Dec/2015.
 */
@Entity(name="misappropriation")
public class MisAppropriation implements  CommonProperties {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private Long audit_id;
    private Integer multiple_jc_issued_workers_count;
    private java.math.BigDecimal multiple_jc_issued_workers_amt;
    private Integer waged_to_dead_count;
    private java.math.BigDecimal waged_to_dea_amtd;
    private Integer wages_nonexistent_count;
    private java.math.BigDecimal wages_nonexistent_amt;
    private Integer wages_migrated_count;
    private java.math.BigDecimal wages_migrated_amt;
    private Integer wages_credited_wrong_accounts_count;
    private java.math.BigDecimal wages_credited_wrong_accounts_amt;
    private Integer double_wagess_count;
    private java.math.BigDecimal double_wages_amt;
    private Integer wages_paid_to_not_worked_count;
    private java.math.BigDecimal wages_paid_to_not_worked_amt;
    private Integer double_wages_WSF_count;
    private java.math.BigDecimal double_wages_WSF_amt;
    private Integer wages_paid_same_acc_count;
    private java.math.BigDecimal wages_paid_same_acc_amt;
    private Integer inclusion_bogous_FTO_count;
    private java.math.BigDecimal inclusion_bogous_FTO_amt;
    private Integer missing_tanks_eri_count;
    private java.math.BigDecimal missing_tanks_eri_amt;
    private Integer missing_canal_count;
    private java.math.BigDecimal missing_canal_amt;
    private Integer missing_roads_count;
    private java.math.BigDecimal missing_roads_amt;
    private Integer missing_plantations_count;
    private java.math.BigDecimal missing_plantations_amt;
    private Integer missing_ihhls_count;
    private java.math.BigDecimal missing_ihhls_amt;
    private Integer missing_farm_pond_count;
    private java.math.BigDecimal missing_farm_pond_amt;
    private Integer missing_cattle_shed_count;
    private java.math.BigDecimal missing_cattle_shed_amt;
    private Integer missing_goat_shed_count;
    private java.math.BigDecimal missing_goat_shed_amt;
    private Integer missing_poultry_count;
    private java.math.BigDecimal missing_poultry_amt;
    private Integer missing_mgnrega_component_IAY_count;
    private java.math.BigDecimal missing_mgnrega_component_IAY_amt;
    private Integer missing_mgnrega_component_GH_count;
    private java.math.BigDecimal missing_mgnrega_component_GH_amt;
    private Integer misappropriation_by_VPT_president_count;
    private java.math.BigDecimal misappropriation_by_VPT_president_amt;
    private Integer misappropriation_by_VPT_secretory_count;
    private java.math.BigDecimal misappropriation_by_VPT_secretory_amt;
    private Integer amount_drawn_same_work_count;
    private java.math.BigDecimal amount_drawn_same_work_amt;
    private Integer wages_disbursed_prev_constructed_ihhls_count;
    private java.math.BigDecimal wages_disbursed_prev_constructed_ihhls_amt;
    private Integer bogus_entries_FTO_correting_fluid_count;
    private java.math.BigDecimal bogus_entries_FTO_correting_fluid_amt;
    private Integer machinery_used_count;
    private java.math.BigDecimal machinery_used_amt;
    private Integer wages_drawn_more_than_actual_working_day_count;
    private java.math.BigDecimal wages_drawn_more_than_actual_working_day_amt;
    private Integer work_done_by_contractors_count;
    private java.math.BigDecimal work_done_by_contractors_amt;
    private Integer others_count;
    private java.math.BigDecimal others_amt;
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

    public MisAppropriation(){}

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

    public Integer getMultipleJcIssuedWorkersCount() {
        return multiple_jc_issued_workers_count;
    }

    public void setMultipleJcIssuedWorkersCount(Integer multiple_jc_issued_workers_count) {
        this.multiple_jc_issued_workers_count = multiple_jc_issued_workers_count;
    }

    public BigDecimal getMultipleJcIssuedWorkersAmt() {
        return multiple_jc_issued_workers_amt;
    }

    public void setMultipleJcIssuedWorkersAmt(BigDecimal multiple_jc_issued_workers_amt) {
        this.multiple_jc_issued_workers_amt = multiple_jc_issued_workers_amt;
    }

    public Integer getWagedToDeadCount() {
        return waged_to_dead_count;
    }

    public void setWagedToDeadCount(Integer waged_to_dead_count) {
        this.waged_to_dead_count = waged_to_dead_count;
    }

    public BigDecimal getWagedToDeadAmt() {
        return waged_to_dea_amtd;
    }

    public void setWagedToDeadAmt(BigDecimal waged_to_dea_amtd) {
        this.waged_to_dea_amtd = waged_to_dea_amtd;
    }

    public Integer getWagesNonExistentCount() {
        return wages_nonexistent_count;
    }

    public void setWagesNonExistentCount(Integer wages_nonexistent_count) {
        this.wages_nonexistent_count = wages_nonexistent_count;
    }

    public BigDecimal getWagesNonExistentAmt() {
        return wages_nonexistent_amt;
    }

    public void setWagesNonExistentAmt(BigDecimal wages_nonexistent_amt) {
        this.wages_nonexistent_amt = wages_nonexistent_amt;
    }

    public Integer getWagesMigratedCount() {
        return wages_migrated_count;
    }

    public void setWagesMigratedCount(Integer wages_migrated_count) {
        this.wages_migrated_count = wages_migrated_count;
    }

    public BigDecimal getWagesMigratedAmt() {
        return wages_migrated_amt;
    }

    public void setWagesMigratedAmt(BigDecimal wages_migrated_amt) {
        this.wages_migrated_amt = wages_migrated_amt;
    }

    public Integer getWagesCreditedWrongAccountsCount() {
        return wages_credited_wrong_accounts_count;
    }

    public void setWagesCreditedWrongAccountsCount(Integer wages_credited_wrong_accounts_count) {
        this.wages_credited_wrong_accounts_count = wages_credited_wrong_accounts_count;
    }

    public BigDecimal getWagesCreditedWrongAccountsAmt() {
        return wages_credited_wrong_accounts_amt;
    }

    public void setWagesCreditedWrongAccountsAmt(BigDecimal wages_credited_wrong_accounts_amt) {
        this.wages_credited_wrong_accounts_amt = wages_credited_wrong_accounts_amt;
    }

    public Integer getDoubleWagessCount() {
        return double_wagess_count;
    }

    public void setDoubleWagessCount(Integer double_wagess_count) {
        this.double_wagess_count = double_wagess_count;
    }

    public BigDecimal getDoubleWagesAmt() {
        return double_wages_amt;
    }

    public void setDoubleWagesAmt(BigDecimal double_wages_amt) {
        this.double_wages_amt = double_wages_amt;
    }

    public Integer getWagesPaidToNotWorkedCount() {
        return wages_paid_to_not_worked_count;
    }

    public void setWagesPaidToNotWorkedCount(Integer wages_paid_to_not_worked_count) {
        this.wages_paid_to_not_worked_count = wages_paid_to_not_worked_count;
    }

    public BigDecimal getWagesPaidToNotWorkedAmt() {
        return wages_paid_to_not_worked_amt;
    }

    public void setWagesPaidToNotWorkedAmt(BigDecimal wages_paid_to_not_worked_amt) {
        this.wages_paid_to_not_worked_amt = wages_paid_to_not_worked_amt;
    }

    public Integer getDoubleWagesWSFCount() {
        return double_wages_WSF_count;
    }

    public void setDoubleWagesWSFCount(Integer double_wages_WSF_count) {
        this.double_wages_WSF_count = double_wages_WSF_count;
    }

    public BigDecimal getDoubleWagesWSFAmt() {
        return double_wages_WSF_amt;
    }

    public void setDoubleWagesWSFAmt(BigDecimal double_wages_WSF_amt) {
        this.double_wages_WSF_amt = double_wages_WSF_amt;
    }

    public Integer getWagesPaidSameAccCount() {
        return wages_paid_same_acc_count;
    }

    public void setWagesPaidSameAccCount(Integer wages_paid_same_acc_count) {
        this.wages_paid_same_acc_count = wages_paid_same_acc_count;
    }

    public BigDecimal getWagesPaidSameAccAmt() {
        return wages_paid_same_acc_amt;
    }

    public void setWagesPaidSameAccAmt(BigDecimal wages_paid_same_acc_amt) {
        this.wages_paid_same_acc_amt = wages_paid_same_acc_amt;
    }

    public Integer getInclusionBogousFTOCount() {
        return inclusion_bogous_FTO_count;
    }

    public void setInclusionBogousFTOCount(Integer inclusion_bogous_FTO_count) {
        this.inclusion_bogous_FTO_count = inclusion_bogous_FTO_count;
    }

    public BigDecimal getInclusionBogousFTOAmt() {
        return inclusion_bogous_FTO_amt;
    }

    public void setInclusionBogousFTOAmt(BigDecimal inclusion_bogous_FTO_amt) {
        this.inclusion_bogous_FTO_amt = inclusion_bogous_FTO_amt;
    }

    public Integer getMissingTanksEriCount() {
        return missing_tanks_eri_count;
    }

    public void setMissingTanksEriCount(Integer missing_tanks_eri_count) {
        this.missing_tanks_eri_count = missing_tanks_eri_count;
    }

    public BigDecimal getMissingTanksEriAmt() {
        return missing_tanks_eri_amt;
    }

    public void setMissingTanksEriAmt(BigDecimal missing_tanks_eri_amt) {
        this.missing_tanks_eri_amt = missing_tanks_eri_amt;
    }

    public Integer getMissingCanalCount() {
        return missing_canal_count;
    }

    public void setMissingCanalCount(Integer missing_canal_count) {
        this.missing_canal_count = missing_canal_count;
    }

    public BigDecimal getMissingCanalAmt() {
        return missing_canal_amt;
    }

    public void setMissingCanalAmt(BigDecimal missing_canal_amt) {
        this.missing_canal_amt = missing_canal_amt;
    }

    public Integer getMissingRoadsCount() {
        return missing_roads_count;
    }

    public void setMissingRoadsCount(Integer missing_roads_count) {
        this.missing_roads_count = missing_roads_count;
    }

    public BigDecimal getMissingRoadsAmt() {
        return missing_roads_amt;
    }

    public void setMissingRoadsAmt(BigDecimal missing_roads_amt) {
        this.missing_roads_amt = missing_roads_amt;
    }

    public Integer getMissingPlantationsCount() {
        return missing_plantations_count;
    }

    public void setMissingPlantationsCount(Integer missing_plantations_count) {
        this.missing_plantations_count = missing_plantations_count;
    }

    public BigDecimal getMissingPlantationsAmt() {
        return missing_plantations_amt;
    }

    public void setMissingPlantationsAmt(BigDecimal missing_plantations_amt) {
        this.missing_plantations_amt = missing_plantations_amt;
    }

    public Integer getMissingIHHLSCount() {
        return missing_ihhls_count;
    }

    public void setMissingIHHLSCount(Integer missing_ihhls_count) {
        this.missing_ihhls_count = missing_ihhls_count;
    }

    public BigDecimal getMissingIHHLSAmt() {
        return missing_ihhls_amt;
    }

    public void setMissingIHHLSAmt(BigDecimal missing_ihhls_amt) {
        this.missing_ihhls_amt = missing_ihhls_amt;
    }

    public Integer getMissingFarmPondCount() {
        return missing_farm_pond_count;
    }

    public void setMissingFarmPondCount(Integer missing_farm_pond_count) {
        this.missing_farm_pond_count = missing_farm_pond_count;
    }

    public BigDecimal getMissingFarmPondAmt() {
        return missing_farm_pond_amt;
    }

    public void setMissingFarmPondAmt(BigDecimal missing_farm_pond_amt) {
        this.missing_farm_pond_amt = missing_farm_pond_amt;
    }

    public Integer getMissingCattleShedCount() {
        return missing_cattle_shed_count;
    }

    public void setMissingCattleShedCount(Integer missing_cattle_shed_count) {
        this.missing_cattle_shed_count = missing_cattle_shed_count;
    }

    public BigDecimal getMissingCattleShedAmt() {
        return missing_cattle_shed_amt;
    }

    public void setMissingCattleShedAmt(BigDecimal missing_cattle_shed_amt) {
        this.missing_cattle_shed_amt = missing_cattle_shed_amt;
    }

    public Integer getMissingGoatShedCount() {
        return missing_goat_shed_count;
    }

    public void setMissingGoatShedCount(Integer missing_goat_shed_count) {
        this.missing_goat_shed_count = missing_goat_shed_count;
    }

    public BigDecimal getMissingGoatShedAmt() {
        return missing_goat_shed_amt;
    }

    public void setMissingGoatShedAmt(BigDecimal missing_goat_shed_amt) {
        this.missing_goat_shed_amt = missing_goat_shed_amt;
    }

    public Integer getMissingPoultryCount() {
        return missing_poultry_count;
    }

    public void setMissingPoultryCount(Integer missing_poultry_count) {
        this.missing_poultry_count = missing_poultry_count;
    }

    public BigDecimal getMissingPoultryAmt() {
        return missing_poultry_amt;
    }

    public void setMissingPoultryAmt(BigDecimal missing_poultry_amt) {
        this.missing_poultry_amt = missing_poultry_amt;
    }

    public Integer getMissingMgnregaComponentIAYCount() {
        return missing_mgnrega_component_IAY_count;
    }

    public void setMissingMgnregaComponentIAYCount(Integer missing_mgnrega_component_IAY_count) {
        this.missing_mgnrega_component_IAY_count = missing_mgnrega_component_IAY_count;
    }

    public BigDecimal getMissingMgnregaComponentIAYAmt() {
        return missing_mgnrega_component_IAY_amt;
    }

    public void setMissingMgnregaComponentIAYAmt(BigDecimal missing_mgnrega_component_IAY_amt) {
        this.missing_mgnrega_component_IAY_amt = missing_mgnrega_component_IAY_amt;
    }

    public Integer getMissingMgnregaComponentGHCount() {
        return missing_mgnrega_component_GH_count;
    }

    public void setMissingMgnregaComponentGHCount(Integer missing_mgnrega_component_GH_count) {
        this.missing_mgnrega_component_GH_count = missing_mgnrega_component_GH_count;
    }

    public BigDecimal getMissingMgnregaComponentGHAmt() {
        return missing_mgnrega_component_GH_amt;
    }

    public void setMissingMgnregaComponentGHAmt(BigDecimal missing_mgnrega_component_GH_amt) {
        this.missing_mgnrega_component_GH_amt = missing_mgnrega_component_GH_amt;
    }

    public Integer getMisappropriationByVPTPresidentCount() {
        return misappropriation_by_VPT_president_count;
    }

    public void setMisappropriationByVPTPresidentCount(Integer misappropriation_by_VPT_president_count) {
        this.misappropriation_by_VPT_president_count = misappropriation_by_VPT_president_count;
    }

    public BigDecimal getMisappropriationByVPTPresidentAmt() {
        return misappropriation_by_VPT_president_amt;
    }

    public void setMisappropriationByVPTPresidentAmt(BigDecimal misappropriation_by_VPT_president_amt) {
        this.misappropriation_by_VPT_president_amt = misappropriation_by_VPT_president_amt;
    }

    public Integer getMisappropriationByVPTSecretoryCount() {
        return misappropriation_by_VPT_secretory_count;
    }

    public void setMisappropriationByVPTSecretoryCount(Integer misappropriation_by_VPT_secretory_count) {
        this.misappropriation_by_VPT_secretory_count = misappropriation_by_VPT_secretory_count;
    }

    public BigDecimal getMisappropriationByVPTSecretoryAmt() {
        return misappropriation_by_VPT_secretory_amt;
    }

    public void setMisappropriationByVPTSecretoryAmt(BigDecimal misappropriation_by_VPT_secretory_amt) {
        this.misappropriation_by_VPT_secretory_amt = misappropriation_by_VPT_secretory_amt;
    }

    public Integer getAmountDrawnSameWorkCount() {
        return amount_drawn_same_work_count;
    }

    public void setAmountDrawnSameWorkCount(Integer amount_drawn_same_work_count) {
        this.amount_drawn_same_work_count = amount_drawn_same_work_count;
    }

    public BigDecimal getAmountDrawnSameWorkAmt() {
        return amount_drawn_same_work_amt;
    }

    public void setAmountDrawnSameWorkAmt(BigDecimal amount_drawn_same_work_amt) {
        this.amount_drawn_same_work_amt = amount_drawn_same_work_amt;
    }

    public Integer getWagesDisbursedPrevConstructedIHHLSCount() {
        return wages_disbursed_prev_constructed_ihhls_count;
    }

    public void setWagesDisbursedPrevConstructedIHHLSCount(Integer wages_disbursed_prev_constructed_ihhls_count) {
        this.wages_disbursed_prev_constructed_ihhls_count = wages_disbursed_prev_constructed_ihhls_count;
    }

    public BigDecimal getWagesDisbursedPrevConstructedIHHLSAmt() {
        return wages_disbursed_prev_constructed_ihhls_amt;
    }

    public void setWagesDisbursedPrevConstructedIHHLSAmt(BigDecimal wages_disbursed_prev_constructed_ihhls_amt) {
        this.wages_disbursed_prev_constructed_ihhls_amt = wages_disbursed_prev_constructed_ihhls_amt;
    }

    public Integer getBogusEntriesFTOCorretingFluidCount() {
        return bogus_entries_FTO_correting_fluid_count;
    }

    public void setBogusEntriesFTOCorretingFluidCount(Integer bogus_entries_FTO_correting_fluid_count) {
        this.bogus_entries_FTO_correting_fluid_count = bogus_entries_FTO_correting_fluid_count;
    }

    public BigDecimal getBogusEntriesFTOCorretingFluidAmt() {
        return bogus_entries_FTO_correting_fluid_amt;
    }

    public void setBogusEntriesFTOCorretingFluidAmt(BigDecimal bogus_entries_FTO_correting_fluid_amt) {
        this.bogus_entries_FTO_correting_fluid_amt = bogus_entries_FTO_correting_fluid_amt;
    }

    public Integer getMachineryUsedCount() {
        return machinery_used_count;
    }

    public void setMachineryUsedCount(Integer machinery_used_count) {
        this.machinery_used_count = machinery_used_count;
    }

    public BigDecimal getMachineryUsedAmt() {
        return machinery_used_amt;
    }

    public void setMachineryUsedAmt(BigDecimal machinery_used_amt) {
        this.machinery_used_amt = machinery_used_amt;
    }

    public Integer getWagesDrawnMoreThanActualWorkingDayCount() {
        return wages_drawn_more_than_actual_working_day_count;
    }

    public void setWagesDrawnMoreThanActualWorkingDayCount(Integer wages_drawn_more_than_actual_working_day_count) {
        this.wages_drawn_more_than_actual_working_day_count = wages_drawn_more_than_actual_working_day_count;
    }

    public BigDecimal getWagesDrawnMoreThanActualWorkingDayAmt() {
        return wages_drawn_more_than_actual_working_day_amt;
    }

    public void setWagesDrawnMoreThanActualWorkingDayAmt(BigDecimal wages_drawn_more_than_actual_working_day_amt) {
        this.wages_drawn_more_than_actual_working_day_amt = wages_drawn_more_than_actual_working_day_amt;
    }

    public Integer getWorkDoneByContractorsCount() {
        return work_done_by_contractors_count;
    }

    public void setWorkDoneByContractorsCount(Integer work_done_by_contractors_count) {
        this.work_done_by_contractors_count = work_done_by_contractors_count;
    }

    public BigDecimal getWorkDoneByContractorsAmt() {
        return work_done_by_contractors_amt;
    }

    public void setWorkDoneByContractorsAmt(BigDecimal work_done_by_contractors_amt) {
        this.work_done_by_contractors_amt = work_done_by_contractors_amt;
    }

    public Integer getOthersCount() {
        return this.others_count;
    }

    public void setOthersCount(Integer others_count) {
        this.others_count = others_count;
    }

    public BigDecimal getOthersAmount() {
        return this.others_amt;
    }

    public void setOthersAmount(BigDecimal others_amt) {
        this.others_amt = others_amt;
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
        return "MisAppropriation{" +
                "id=" + id +
                ", audit_id=" + audit_id +
                ", multiple_jc_issued_workers_count=" + multiple_jc_issued_workers_count +
                ", multiple_jc_issued_workers_amt=" + multiple_jc_issued_workers_amt +
                ", waged_to_dead_count=" + waged_to_dead_count +
                ", waged_to_dea_amtd=" + waged_to_dea_amtd +
                ", wages_nonexistent_count=" + wages_nonexistent_count +
                ", wages_nonexistent_amt=" + wages_nonexistent_amt +
                ", wages_migrated_count=" + wages_migrated_count +
                ", wages_migrated_amt=" + wages_migrated_amt +
                ", wages_credited_wrong_accounts_count=" + wages_credited_wrong_accounts_count +
                ", wages_credited_wrong_accounts_amt=" + wages_credited_wrong_accounts_amt +
                ", double_wagess_count=" + double_wagess_count +
                ", double_wages_amt=" + double_wages_amt +
                ", wages_paid_to_not_worked_count=" + wages_paid_to_not_worked_count +
                ", wages_paid_to_not_worked_amt=" + wages_paid_to_not_worked_amt +
                ", double_wages_WSF_count=" + double_wages_WSF_count +
                ", double_wages_WSF_amt=" + double_wages_WSF_amt +
                ", wages_paid_same_acc_count=" + wages_paid_same_acc_count +
                ", wages_paid_same_acc_amt=" + wages_paid_same_acc_amt +
                ", inclusion_bogous_FTO_count=" + inclusion_bogous_FTO_count +
                ", inclusion_bogous_FTO_amt=" + inclusion_bogous_FTO_amt +
                ", missing_tanks_eri_count=" + missing_tanks_eri_count +
                ", missing_tanks_eri_amt=" + missing_tanks_eri_amt +
                ", missing_canal_count=" + missing_canal_count +
                ", missing_canal_amt=" + missing_canal_amt +
                ", missing_roads_count=" + missing_roads_count +
                ", missing_roads_amt=" + missing_roads_amt +
                ", missing_plantations_count=" + missing_plantations_count +
                ", missing_plantations_amt=" + missing_plantations_amt +
                ", missing_ihhls_count=" + missing_ihhls_count +
                ", missing_ihhls_amt=" + missing_ihhls_amt +
                ", missing_farm_pond_count=" + missing_farm_pond_count +
                ", missing_farm_pond_amt=" + missing_farm_pond_amt +
                ", missing_cattle_shed_count=" + missing_cattle_shed_count +
                ", missing_cattle_shed_amt=" + missing_cattle_shed_amt +
                ", missing_goat_shed_count=" + missing_goat_shed_count +
                ", missing_goat_shed_amt=" + missing_goat_shed_amt +
                ", missing_poultry_count=" + missing_poultry_count +
                ", missing_poultry_amt=" + missing_poultry_amt +
                ", missing_mgnrega_component_IAY_count=" + missing_mgnrega_component_IAY_count +
                ", missing_mgnrega_component_IAY_amt=" + missing_mgnrega_component_IAY_amt +
                ", missing_mgnrega_component_GH_count=" + missing_mgnrega_component_GH_count +
                ", missing_mgnrega_component_GH_amt=" + missing_mgnrega_component_GH_amt +
                ", misappropriation_by_VPT_president_count=" + misappropriation_by_VPT_president_count +
                ", misappropriation_by_VPT_president_amt=" + misappropriation_by_VPT_president_amt +
                ", misappropriation_by_VPT_secretory_count=" + misappropriation_by_VPT_secretory_count +
                ", misappropriation_by_VPT_secretory_amt=" + misappropriation_by_VPT_secretory_amt +
                ", amount_drawn_same_work_count=" + amount_drawn_same_work_count +
                ", amount_drawn_same_work_amt=" + amount_drawn_same_work_amt +
                ", wages_disbursed_prev_constructed_ihhls_count=" + wages_disbursed_prev_constructed_ihhls_count +
                ", wages_disbursed_prev_constructed_ihhls_amt=" + wages_disbursed_prev_constructed_ihhls_amt +
                ", bogus_entries_FTO_correting_fluid_count=" + bogus_entries_FTO_correting_fluid_count +
                ", bogus_entries_FTO_correting_fluid_amt=" + bogus_entries_FTO_correting_fluid_amt +
                ", machinery_used_count=" + machinery_used_count +
                ", machinery_used_amt=" + machinery_used_amt +
                ", wages_drawn_more_than_actual_working_day_count=" + wages_drawn_more_than_actual_working_day_count +
                ", wages_drawn_more_than_actual_working_day_amt=" + wages_drawn_more_than_actual_working_day_amt +
                ", work_done_by_contractors_count=" + work_done_by_contractors_count +
                ", work_done_by_contractors_amt=" + work_done_by_contractors_amt +
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
