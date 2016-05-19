package com.sastabackend.service.recovery;

import com.sastabackend.domain.DetailedRecovery;
import com.sastabackend.domain.Recovery;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;

import java.util.List;

/*
 * Created by SARVA on 14/May/2016.
 */
public interface RecoveryService {
    ResponseModel findOne(Long id);
    ResponseModel findAll(Long userid,Long auditid);
    ResponseModel Add(Recovery rc);
    ResponseModel Update(Recovery rc);
    ResponseModel getRecoveryReports(ReportsProperty prop);
    ResponseModel GetDetailedRecoveryDetails(Long id);
    ResponseModel InsertDetailedRecoveryDetails(List<DetailedRecovery> list);
    ResponseModel UpdateDetailedRecoveryDetails(List<DetailedRecovery> list);
}
