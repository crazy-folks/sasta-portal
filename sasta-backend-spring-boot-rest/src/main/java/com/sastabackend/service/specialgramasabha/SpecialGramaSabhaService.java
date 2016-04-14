package com.sastabackend.service.specialgramasabha;

import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SpecialGramaSabha;

/**
 * Created by SARVA on 12/Nov/2015.
 */

public interface SpecialGramaSabhaService {
    ResponseModel findOne(Long id);
    ResponseModel findAll(Long userid,Long auditid);
    ResponseModel Add(SpecialGramaSabha sga);
    ResponseModel Update(SpecialGramaSabha sga);
    ResponseModel getSpecialGramaSabhaReports(ReportsProperty prop);
}
