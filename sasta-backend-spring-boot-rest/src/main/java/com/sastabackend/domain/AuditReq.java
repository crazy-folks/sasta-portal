package com.sastabackend.domain;

/**
 * Created by SARVA on 28/Feb/2016.
 */
public class AuditReq implements java.io.Serializable  {

    private Integer districtId;
    private Integer blockId;
    private Integer financialId;
    private Long userId;

    public AuditReq(){}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }



    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Integer getBlockId() {
        return blockId;
    }

    public void setBlockId(Integer blockId) {
        this.blockId = blockId;
    }

    public Integer getFinancialId() {
        return financialId;
    }

    public void setFinancialId(Integer financialId) {
        this.financialId = financialId;
    }

    @Override
    public String toString() {
        return "AuditReq{" +
                "districtId=" + districtId +
                ", blockId=" + blockId +
                ", financialId=" + financialId +
                '}';
    }
}
