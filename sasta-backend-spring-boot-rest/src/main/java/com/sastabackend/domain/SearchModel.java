package com.sastabackend.domain;

/**
 * Created by SARVA on 02/Jan/2016.
 */
public class SearchModel {

    private String emailid;
    private String firstname;
    private String lastname;
    private String jobtitle;
    private Integer allottedblockid;
    private Integer allotteddistrictid;
    private Integer usergroupid;
    private Integer reportingid;
    private Integer departmentid;
    private String employeeid;
    private String contact_no;
    private Integer isactive;

    public SearchModel(){}

    public String getEmailId() {
        return emailid;
    }

    public void setEmailId(String emailid) {
        this.emailid = emailid;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstname) {
        this.firstname = firstname;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public String getJobTitle() {
        return jobtitle;
    }

    public void setJobTitle(String jobtitle) {
        this.jobtitle = jobtitle;
    }

    public Integer getAllottedBlockId() {
        return allottedblockid;
    }

    public void setAllottedBlockId(Integer allottedblockid) {
        this.allottedblockid = allottedblockid;
    }

    public Integer getAllottedDistrictId() {
        return allotteddistrictid;
    }

    public void setAllottedDistrictId(Integer allotteddistrictid) {
        this.allotteddistrictid = allotteddistrictid;
    }

    public Integer getUserGroupId() {
        return usergroupid;
    }

    public void setUserGroupId(Integer usergroupid) {
        this.usergroupid = usergroupid;
    }

    public Integer getReportingId() {
        return reportingid;
    }

    public void setReportingId(Integer reportingid) {
        this.reportingid = reportingid;
    }

    public Integer getDepartmentId() {
        return departmentid;
    }

    public void setDepartmentId(Integer departmentid) {
        this.departmentid = departmentid;
    }

    public String getEmployeeId() {
        return employeeid;
    }

    public void setEmployeeId(String employeeid) {
        this.employeeid = employeeid;
    }

    public String getContactNo() {
        return contact_no;
    }

    public void setContactNo(String contact_no) {
        this.contact_no = contact_no;
    }

    public Integer getIsActive() {
        return isactive;
    }

    public void setIsActive(Integer isactive) {
        this.isactive = isactive;
    }

    @Override
    public String toString() {
        return "SearchModel{" +
                "emailid='" + emailid + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", jobtitle='" + jobtitle + '\'' +
                ", allottedblockid=" + allottedblockid +
                ", allotteddistrictid=" + allotteddistrictid +
                ", usergroupid=" + usergroupid +
                ", reportingid=" + reportingid +
                ", departmentid=" + departmentid +
                ", employeeid='" + employeeid + '\'' +
                ", contact_no='" + contact_no + '\'' +
                ", isactive=" + isactive +
                '}';
    }
}
