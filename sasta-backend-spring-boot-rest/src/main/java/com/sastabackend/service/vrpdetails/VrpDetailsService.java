package com.sastabackend.service.vrpdetails;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 11/Nov/2015.
 */
public interface VrpDetailsService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(Long auditid,String vrpname, Integer genderid,Integer villagepanchayatid,String jcno,
                      String guardianname,Integer qualificationid,Integer communityid,String contactno,
                      Integer totaldays,java.math.BigDecimal paidamount,Integer paymode,Integer bankid,
                      String accno,String ifsccode,Integer gradeid,Long createdby);
    ResponseModel Update(Long vrpid,Long auditid,String vrpname, Integer genderid,Integer villagepanchayatid,String jcno,
                         String guardianname,Integer qualificationid,Integer communityid,String contactno,
                         Integer totaldays,java.math.BigDecimal paidamount,Integer paymode,Integer bankid,
                         String accno,String ifsccode,Integer gradeid,Long modifyby, Boolean isactive);
}