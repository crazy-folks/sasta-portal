package com.sastabackend.service.expenditure;

import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 10/Nov/2015.
 */
public interface ExpenditureService {
    ResponseModel findOne(Long id);
    ResponseModel findAll(Long userid,Long auditid);
    ResponseModel getExpenditureReports(ReportsProperty prop);
    ResponseModel Add(Long auditid, Integer visitedvillagecount, Integer appreceivedcount, Integer attendedappcount,
                      java.math.BigDecimal refreshmentcharges, Integer selectedvrpcount,
                      java.math.BigDecimal paidedamount, java.math.BigDecimal photographycharges,
                      java.math.BigDecimal videoscharges, java.math.BigDecimal ppleaf_lets,
                      java.math.BigDecimal stationaries, java.math.BigDecimal othersvalue,Long createdby);
    ResponseModel Update(Long expenditureid,Long auditid, Integer visitedvillagecount, Integer appreceivedcount, Integer attendedappcount,
                         java.math.BigDecimal refreshmentcharges, Integer selectedvrpcount,
                         java.math.BigDecimal paidedamount, java.math.BigDecimal photographycharges,
                         java.math.BigDecimal videoscharges, java.math.BigDecimal ppleaf_lets,
                         java.math.BigDecimal stationaries, java.math.BigDecimal othersvalue,Long modifyby, Boolean isactive);
}
