package com.sastabackend.domain;

import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;

import java.util.Date;

/**
 * Created by SARVA on 03/Jan/2016.
 */
public class ConfigurationSettings {
    private Long audit_id;
    private Integer district_id;
    private Integer block_id;
    private Integer panchayat_id;
    private Long round_id;
    private Date start_date;
    private Date end_date;
    private Date grama_sabha_date;
    private Integer financial_year_id;
    private String key;

    public ConfigurationSettings(){}

    public Long getAuditId() {
        return audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
        setKey(Long.toString(audit_id));
    }

    public Integer getDistrictId() {
        return district_id;
    }

    public void setDistrictId(Integer district_id) {
        this.district_id = district_id;
    }

    public Integer getBlockId() {
        return block_id;
    }

    public void setBlockId(Integer block_id) {
        this.block_id = block_id;
    }

    public Integer getPanchayatId() {
        return panchayat_id;
    }

    public void setPanchayatId(Integer panchayat_id) {
        this.panchayat_id = panchayat_id;
    }

    public Long getRoundId() {
        return round_id;
    }

    public void setRoundId(Long round_id) {
        this.round_id = round_id;
    }

    public Date getStartDate() {
        return start_date;
    }

    public void setStartDate(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEndDate() {
        return end_date;
    }

    public void setEndDate(Date end_date) {
        this.end_date = end_date;
    }

    public Date getGramaSabhaDate() {
        return grama_sabha_date;
    }

    public void setGramaSabhaDate(Date grama_sabha_date) {
        this.grama_sabha_date = grama_sabha_date;
    }

    public Integer getFinancialYearId() {
        return financial_year_id;
    }

    public void setFinancialYearId(Integer financial_year_id) {
        this.financial_year_id = financial_year_id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        try{
            CryptoUtil crypt = new CryptoUtil();
            key = crypt.encrypt(Constants.SALT_KEY,key);
        }catch(Exception err){
            key = Constants.Empty;
        }
        this.key = key;
    }

    @Override
    public String toString() {
        return "ConfigurationSettings{" +
                "audit_id=" + audit_id +
                ", district_id=" + district_id +
                ", block_id=" + block_id +
                ", panchayat_id=" + panchayat_id +
                ", round_id=" + round_id +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", grama_sabha_date=" + grama_sabha_date +
                ", financial_year_id=" + financial_year_id +
                ", key='" + key + '\'' +
                '}';
    }
}
