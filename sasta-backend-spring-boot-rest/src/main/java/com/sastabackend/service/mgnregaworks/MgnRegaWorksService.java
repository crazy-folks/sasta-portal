package com.sastabackend.service.mgnregaworks;

import com.sastabackend.domain.MgnRegaWorks;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 26/Dec/2015.
 */
public interface MgnRegaWorksService {
    ResponseModel findOne(Long id);
    ResponseModel findAll(Long userid,Long auditid);
    ResponseModel Add(MgnRegaWorks mgn);
    ResponseModel Update(MgnRegaWorks mgn);
    ResponseModel getMgnRegaWorksReports(ReportsProperty prop);
}
