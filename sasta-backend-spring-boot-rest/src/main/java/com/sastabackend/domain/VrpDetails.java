package com.sastabackend.domain;


    import com.google.common.base.Objects;

    import javax.persistence.*;
    import javax.validation.constraints.NotNull;
    import javax.validation.constraints.Size;
    import java.lang.String;
    import java.sql.Date;
    import java.sql.Timestamp;

/**
     * Created by SARVA on 03/Nov/2015.
     */
    @Entity(name = "vrp_details")
    public class VrpDetails implements java.io.Serializable, CommonProperties{
        @Id
        @NotNull
        @GeneratedValue(strategy= GenerationType.AUTO)
        @Column(name = "id", nullable = false, updatable = false)
        private java.lang.Long id;
        private java.lang.Long audit_id;
        private String name;
        private java.lang.Integer gender_id;
        private java.lang.Integer village_panchayat_id;
        private String jc_no;
        private String guardian_name;
        private java.lang.Integer qualification_id;
        private java.lang.Integer community_id;
        private String contact_no;
        private java.lang.Integer total_days;
        private java.math.BigDecimal paid_amount;
        private java.lang.Integer pay_mode;
        private java.lang.Integer bank_id;
        private String acc_no;
        private String ifsc_code;
        private java.lang.Integer grade_id;

        private java.sql.Timestamp created_date;
        private java.sql.Timestamp modified_date;
        private java.lang.Long created_by;
        private java.lang.Long modified_by;
        private java.lang.Boolean is_active;

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

        private String vrp_panchayat_name;
        private String vrp_qualification_name;
        private String vrp_community_name;
        private String vrp_bank_name;
        private String vrp_grade_name;

        public VrpDetails(){}

        public java.lang.Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public java.lang.Long getAuditId() {
            return this.audit_id;
        }

        public void setAuditId(java.lang.Long audit_id){
            this.audit_id = audit_id;
        }

        public String getName(){
            return this.name;
        }

        public void setName(String name){
            this.name= name;
        }

        public java.lang.Integer getGenderId(){
            return this.gender_id;
        }

        public void setGenderId(java.lang.Integer gender_id){
            this.gender_id = gender_id;
        }

        public java.lang.Integer getVillagePanchayatId(){
            return this.village_panchayat_id;
        }

        public void setVillagePanchayatId(java.lang.Integer village_panchayat_id){
            this.village_panchayat_id = village_panchayat_id;
        }

        public String getJobCardNumber(){
            return this.jc_no;
        }

        public void setJobCardNumber(String jc_no){
            this.jc_no = jc_no;
        }

        public String getGuardianName(){
            return this.guardian_name;
        }

        public void setGuardianName(String guardian_name){
            this.guardian_name = guardian_name;
        }

        public java.lang.Integer getQualificationId(){
            return this.qualification_id;
        }

        public void setQualificationId(java.lang.Integer qualification_id){
            this.qualification_id = qualification_id;
        }

        public java.lang.Integer getCommunityId(){
            return this.community_id;
        }

        public void setCommunityId(java.lang.Integer community_id){
            this.qualification_id = community_id;
        }

        public String getContactNumber(){
            return this.contact_no;
        }

        public void setContactNumber(String contact_no){
            this.guardian_name = contact_no;
        }

        public java.lang.Integer getTotalDays(){
            return this.total_days;
        }

        public void setTotalDays(java.lang.Integer total_days){
            this.total_days = total_days;
        }

        public java.math.BigDecimal getPaidAmount(){
            return this.paid_amount;
        }

        public void setPaidAmount(java.math.BigDecimal paid_amount){
            this.paid_amount = paid_amount;
        }

        public java.lang.Integer getPayMode(){
            return this.pay_mode;
        }

        public void setPayMode(java.lang.Integer pay_mode){
            this.pay_mode = pay_mode;
        }

        public java.lang.Integer getBankId(){
            return this.bank_id;
        }

        public void setBankId(java.lang.Integer bank_id){
            this.bank_id = bank_id;
        }

        public String getAccountNumber(){
            return this.acc_no;
        }

        public void setAccountNumber(String acc_no){
            this.acc_no = acc_no;
        }

        public String getIfscCode(){
            return this.ifsc_code;
        }

        public void setIfscCode(String ifsc_code){
            this.ifsc_code = ifsc_code;
        }

        public java.lang.Integer getGradeId(){
            return this.grade_id;
        }

        public void setGradeId(java.lang.Integer grade_id){
            this.bank_id = grade_id;
        }

        public java.lang.Boolean getActive(){
            return this.is_active;
        }

        public void setActive(java.lang.Boolean is_active){
            this.is_active = is_active;
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

        public String getAuditDistrictName() {
            return district_name;
        }

        public void setAuditDistrictName(String district_name) {
            this.district_name = district_name;
        }

        public String getAuditFinancialYear() {
            return financial_year;
        }

        public void setAuditFinancialYear(String financial_year) {
            this.financial_year = financial_year;
        }

        public String getAuditFinancialDescription() {
            return financial_description;
        }

        public void setAuditFinancialDescription(String financial_description) {
            this.financial_description = financial_description;
        }

        public Integer getAuditBlockId() {
            return block_id;
        }

        public void setAuditBlockId(Integer block_id) {
            this.block_id = block_id;
        }

        public String getAuditBlockName() {
            return block_name;
        }

        public void setAuditBlockName(String block_name) {
            this.block_name = block_name;
        }

        public Integer getAuditVpId() {
            return vp_id;
        }

        public void setAuditVpId(Integer vp_id) {
            this.vp_id = vp_id;
        }

        public String getAuditVpName() {
            return vp_name;
        }

        public void setAuditVpName(String vp_name) {
            this.vp_name = vp_name;
        }

        public String getVrpPanchayatName() {
            return vrp_panchayat_name;
        }

        public void setVrpPanchayatName(String vrp_panchayat_name) {
            this.vrp_panchayat_name = vrp_panchayat_name;
        }

        public String getVrpQualificationName() {
            return vrp_qualification_name;
        }

        public void setVrpQualificationName(String vrp_qualification_name) {
            this.vrp_qualification_name = vrp_qualification_name;
        }

        public String getVrpCommunityName() {
            return vrp_community_name;
        }

        public void setVrpCommunityName(String vrp_community_name) {
            this.vrp_community_name = vrp_community_name;
        }

        public String getVrpBankName() {
            return vrp_bank_name;
        }

        public void setVrpBankName(String vrp_bank_name) {
            this.vrp_bank_name = vrp_bank_name;
        }

        public String getVrpGradeName() {
            return vrp_grade_name;
        }

        public void setVrpGradeName(String vrp_grade_name) {
            this.vrp_grade_name = vrp_grade_name;
        }

}
