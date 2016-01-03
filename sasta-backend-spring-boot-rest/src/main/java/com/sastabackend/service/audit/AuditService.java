package com.sastabackend.service.audit;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 09/Nov/2015.
 */
public interface AuditService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(Long roundid, java.sql.Date startdate, java.sql.Date enddate, java.sql.Date gramasabhadate,
                      Integer district_id, Integer block_id, Integer panchayat_id, Long createdby);
    ResponseModel Update(Long auditid,Long roundid, java.sql.Date startdate, java.sql.Date enddate, java.sql.Date gramasabhadate,
                         Integer district_id, Integer block_id, Integer panchayat_id, Long modifyby,Boolean isactive);
    ResponseModel DoesExistAuditEntry(Long roundid,Integer districtid,Integer blockid,Integer panchayatid);
    ResponseModel SelectConfig(Long id);
}