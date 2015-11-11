package com.sastabackend.domain;

import com.sun.org.apache.xpath.internal.operations.Bool;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface CommonProperties {

    public java.sql.Timestamp getCreatedDate();
    public void setCreatedDate(java.sql.Timestamp created_date);

    public java.sql.Timestamp getModifiedDate();
    public void setModifiedDate(java.sql.Timestamp modified_date);

    public Long getCreatedBy();
    public void setCreatedBy(Long created_by);

    public Long getModifiedBy();
    public void setModifiedBy(Long modified_by);

    public Boolean getStatus();
    public void setStatus(Boolean is_active);

    public String getCreatedByName();
    public void setCreatedByName(String createByName);

    public String getModifiedByName();
    public void setModifiedByName(String modifiedByName);

}
