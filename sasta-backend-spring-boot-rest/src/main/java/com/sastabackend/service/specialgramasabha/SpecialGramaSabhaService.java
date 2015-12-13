package com.sastabackend.service.specialgramasabha;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 12/Nov/2015.
 */

public interface SpecialGramaSabhaService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(Long auditid,java.math.BigDecimal totalpopulation,java.math.BigDecimal  totalfamiliesinvpts,
                      java.math.BigDecimal  nooffamiliesregistered,Long totaljcsinvpts,java.math.BigDecimal noofpplattentedsgs,
                      String nameofpersonheadsgs,Long nameofpersonrecordedminutes,Long totalparasplacedinsgs,
                      Long parassetteled,java.math.BigDecimal  amountrecoveredduringsgs,Boolean sareportsuploaded,
                      Boolean atrsuploaded,Long createdby);
    ResponseModel Update(Long sp_grama_sabha_id,Long auditid,java.math.BigDecimal totalpopulation,java.math.BigDecimal  totalfamiliesinvpts,
                         java.math.BigDecimal  nooffamiliesregistered,Long totaljcsinvpts,java.math.BigDecimal noofpplattentedsgs,
                         String nameofpersonheadsgs,Long nameofpersonrecordedminutes,Long totalparasplacedinsgs,
                         Long parassetteled,java.math.BigDecimal  amountrecoveredduringsgs,Boolean sareportsuploaded,
                         Boolean atrsuploaded,Long modifyby,Boolean isactive);
}
