package com.sastabackend.domain;


    import com.google.common.base.Objects;

    import javax.persistence.*;
    import javax.validation.constraints.NotNull;
    import javax.validation.constraints.Size;
    import java.lang.String;

    /**
     * Created by SARVA on 03/Nov/2015.
     */
    @Entity
    public class villageResourcePerson  implements java.io.Serializable{

        @Id
        @NotNull
        @GeneratedValue(strategy= GenerationType.AUTO)
        @Column(name = "id", nullable = false, updatable = false)
        private java.lang.Long id;

        @Column(name="audit_id", nullable = false)
        private java.lang.Long audit_id;

        @Size(max = 100)
        @Column(name= "name")
        private String name;

        @Column(name="gender_id")
        private java.lang.Integer gender_id;

        @Column(name="village_panchayat_id")
        private java.lang.Integer village_panchayat_id;

        @Size( max = 30 )
        @Column(name="jc_no")
        private String jc_no;

        @Size( max = 100 )
        @Column(name="guardian_name")
        private String guardian_name;

        @Column(name="qualification_id")
        private java.lang.Integer qualification_id;

        @Column(name="community_id")
        private java.lang.Integer community_id;

        @Size( max = 20 )
        @Column(name="contact_no")
        private String contact_no;

        @Column(name="total_days")
        private java.lang.Integer total_days;

        @Column(name = "paid_amount")
        private java.math.BigDecimal paid_amount;

        @Column(name="pay_mode")
        private java.lang.Integer pay_mode;

        @Column(name="bank_id")
        private java.lang.Integer bank_id;

        @Size( max = 45 )
        @Column(name="acc_no")
        private String acc_no;

        @Size( max = 30 )
        @Column(name="ifsc_code")
        private String ifsc_code;

        @Column(name="grade_id")
        private java.lang.Integer grade_id;

        @Column(name = "created_date")
        private java.sql.Timestamp created_date;

        @Column(name = "modified_date")
        private java.sql.Timestamp modified_date;

        @Column(name="created_by")
        private java.lang.Long created_by;

        @Column(name="modified_by")
        private java.lang.Long modified_by;

        @Column(name="is_active")
        private java.lang.Boolean is_active;

        public villageResourcePerson(){}

        public java.lang.Long getId() {
            return id;
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

        public java.sql.Timestamp getCreatedDate(){
            return this.created_date;
        }

        public void setCreatedDate(java.sql.Timestamp created_date)
        {
            this.created_date = created_date;
        }

        public java.sql.Timestamp getModifiedDate(){
            return this.modified_date;
        }

        public void setModifiedDate(java.sql.Timestamp modified_date)
        {
            this.modified_date = modified_date;
        }

        public java.lang.Long getCreateBy(){
            return this.created_by;
        }

        public void setCreateBy(java.lang.Long created_by){
            this.created_by = created_by;
        }

        public java.lang.Long getModifiedBy(){
            return this.modified_by;
        }

        public void setModifiedBy(java.lang.Long modified_by){
            this.modified_by = modified_by;
        }

        public java.lang.Boolean getActive(){
            return this.is_active;
        }

        public void setActive(java.lang.Boolean is_active){
            this.is_active = is_active;
        }
    }
