package com.sastabackend.domain;

import java.math.BigDecimal;

/**
 * Created by SARVA on 03/Mar/2016.
 */
public class ReportsProperty {

    private String referenceId;
    private String roundId;
    private String districtId;
    private String blockId;
    private String villageId;
    private boolean isConsolidate;
    private String userId;

    public ReportsProperty(){}

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public String getRoundId() {
        return roundId;
    }

    public void setRoundId(String roundId) {
        this.roundId = roundId;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String districtId) {
        this.districtId = districtId;
    }

    public String getBlockId() {
        return blockId;
    }

    public void setBlockId(String blockId) {
        this.blockId = blockId;
    }

    public String getVillageId() {
        return villageId;
    }

    public void setVillageId(String villageId) {
        this.villageId = villageId;
    }

    public boolean getIsConsolidate() {
        return isConsolidate;
    }

    public void setIsConsolidate(boolean isConsolidate) {
        this.isConsolidate = isConsolidate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ReportsProperty{" +
                "referenceId=" + referenceId +
                ", roundId=" + roundId +
                ", districtId=" + districtId +
                ", blockId=" + blockId +
                ", villageId=" + villageId +
                ", isConsolidate=" + isConsolidate +
                ", userId=" + userId +
                '}';
    }
}
