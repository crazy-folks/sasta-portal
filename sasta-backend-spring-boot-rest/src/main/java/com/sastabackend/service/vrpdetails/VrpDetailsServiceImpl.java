package com.sastabackend.service.vrpdetails;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.VrpDetails;
import com.sastabackend.repository.VrpDetailsRepository;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 11/Nov/2015.
 */
@Service
@Validated
public class VrpDetailsServiceImpl implements  VrpDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(VrpDetailsServiceImpl.class);
    private final VrpDetailsRepository repository;

    @Inject
    public VrpDetailsServiceImpl(final VrpDetailsRepository repository ){
        this.repository = repository;
    }



    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading VrpDetails  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<VrpDetails>();
            response.setData(selectVrpData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading VrpDetails  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<VrpDetails>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    @Override
    public ResponseModel Add(Long auditid, String vrpname, Integer genderid, Integer villagepanchayatid, String jcno,
                             String guardianname, Integer qualificationid, Integer communityid, String contactno,
                             Integer totaldays, BigDecimal paidamount, Integer paymode, Integer bankid, String accno,
                             String ifsccode, Integer gradeid, Long createdby) {
        LOGGER.debug("Creating  VrpDetails : {}", auditid, vrpname, genderid, villagepanchayatid, jcno,
                guardianname, qualificationid, communityid, contactno,
                totaldays, paidamount, paymode, bankid, accno,
                ifsccode, gradeid, createdby);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(auditid, vrpname, genderid, villagepanchayatid, jcno,
                    guardianname, qualificationid, communityid, contactno,
                    totaldays, paidamount, paymode, bankid, accno,
                    ifsccode, gradeid, createdby);
            response.setStatus(flag);
            response.setData(flag == true ? " VrpDetails Added Successfully!!" : "Unable to add VrpDetails!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Long vrpid, Long auditid, String vrpname, Integer genderid, Integer villagepanchayatid,
                                String jcno, String guardianname, Integer qualificationid, Integer communityid,
                                String contactno, Integer totaldays, BigDecimal paidamount, Integer paymode, Integer bankid,
                                String accno, String ifsccode, Integer gradeid, Long modifyby, Boolean isactive) {
        LOGGER.debug("Creating  VrpDetails : {}", vrpid, auditid, vrpname, genderid, villagepanchayatid,
                jcno, guardianname, qualificationid, communityid, contactno, totaldays, paidamount, paymode, bankid,
                accno, ifsccode,  gradeid, modifyby,  isactive);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(vrpid, auditid, vrpname, genderid, villagepanchayatid,
                    jcno, guardianname, qualificationid, communityid, contactno, totaldays, paidamount, paymode, bankid,
                    accno, ifsccode,  gradeid, modifyby,  isactive);
            response.setStatus(flag);
            response.setData(flag == true ? "VrpDetails Updated Successfully!!" : "Unable to update VrpDetails!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }




    private boolean Create(Long auditid, String vrpname, Integer genderid, Integer villagepanchayatid, String jcno,
                           String guardianname, Integer qualificationid, Integer communityid, String contactno,
                           Integer totaldays, BigDecimal paidamount, Integer paymode, Integer bankid, String accno,
                           String ifsccode, Integer gradeid, Long createdby) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_vrp_details")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("vrpname", Types.VARCHAR),
                        new SqlParameter("genderid", Types.INTEGER),
                        new SqlParameter("villagepanchayatid", Types.INTEGER),
                        new SqlParameter("jcno", Types.VARCHAR),
                        new SqlParameter("guardianname", Types.VARCHAR),
                        new SqlParameter("qualificationid", Types.INTEGER),
                        new SqlParameter("communityid", Types.INTEGER),
                        new SqlParameter("contactno", Types.VARCHAR),
                        new SqlParameter("totaldays", Types.INTEGER),
                        new SqlParameter("paidamount", Types.DECIMAL),
                        new SqlParameter("paymode", Types.INTEGER),
                        new SqlParameter("bankid", Types.INTEGER),
                        new SqlParameter("accno", Types.VARCHAR),
                        new SqlParameter("ifsccode", Types.VARCHAR),
                        new SqlParameter("gradeid", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", auditid);
        inParamMap.put("vrpname", vrpname);
        inParamMap.put("genderid", genderid);
        inParamMap.put("villagepanchayatid", villagepanchayatid);
        inParamMap.put("jcno", jcno);
        inParamMap.put("guardianname", guardianname);
        inParamMap.put("qualificationid", qualificationid);
        inParamMap.put("communityid", communityid);
        inParamMap.put("contactno", contactno);
        inParamMap.put("totaldays", totaldays);
        inParamMap.put("paidamount", paidamount);
        inParamMap.put("paymode", paymode);
        inParamMap.put("bankid", bankid);
        inParamMap.put("accno", accno);
        inParamMap.put("ifsccode", ifsccode);
        inParamMap.put("gradeid", gradeid);
        inParamMap.put("createdby", createdby);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Long vrpid, Long auditid, String vrpname, Integer genderid, Integer villagepanchayatid,
                           String jcno, String guardianname, Integer qualificationid, Integer communityid,
                           String contactno, Integer totaldays, BigDecimal paidamount, Integer paymode, Integer bankid,
                           String accno, String ifsccode, Integer gradeid, Long modifyby, Boolean isactive)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_vrp_details")
                .declareParameters(
                        new SqlParameter("vrpid", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("vrpname", Types.VARCHAR),
                        new SqlParameter("genderid", Types.INTEGER),
                        new SqlParameter("villagepanchayatid", Types.INTEGER),
                        new SqlParameter("jcno", Types.VARCHAR),
                        new SqlParameter("guardianname", Types.VARCHAR),
                        new SqlParameter("qualificationid", Types.INTEGER),
                        new SqlParameter("communityid", Types.INTEGER),
                        new SqlParameter("contactno", Types.VARCHAR),
                        new SqlParameter("totaldays", Types.INTEGER),
                        new SqlParameter("paidamount", Types.DECIMAL),
                        new SqlParameter("paymode", Types.INTEGER),
                        new SqlParameter("bankid", Types.INTEGER),
                        new SqlParameter("accno", Types.VARCHAR),
                        new SqlParameter("ifsccode", Types.VARCHAR),
                        new SqlParameter("gradeid", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("vrpid", vrpid);
        inParamMap.put("auditid", auditid);
        inParamMap.put("vrpname", vrpname);
        inParamMap.put("genderid", genderid);
        inParamMap.put("villagepanchayatid", villagepanchayatid);
        inParamMap.put("jcno", jcno);
        inParamMap.put("guardianname", guardianname);
        inParamMap.put("qualificationid", qualificationid);
        inParamMap.put("communityid", communityid);
        inParamMap.put("contactno", contactno);
        inParamMap.put("totaldays", totaldays);
        inParamMap.put("paidamount", paidamount);
        inParamMap.put("paymode", paymode);
        inParamMap.put("bankid", bankid);
        inParamMap.put("accno", accno);
        inParamMap.put("ifsccode", ifsccode);
        inParamMap.put("gradeid", gradeid);
        inParamMap.put("modifyby", modifyby);
        inParamMap.put("isactive", isactive);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }
    private List<Expenditure> readList(){
        List<Expenditure> list = jdbcTemplate.query("call select_vrp_details", new VrpDetailsMapper());
        return list;
    }

    private VrpDetails selectVrpData(Long id){
        List<VrpDetails> o = new ArrayList<VrpDetails>();
        o = jdbcTemplate.query("call select_vrp_details_by_id(?)", new Object[]{id}, new VrpDetailsMapper());
        if(o.size()==0)
            return null;
        else {
            LOGGER.debug("{0}",o.get(0).toString());
            return o.get(0);
        }
    }


    protected static final class VrpDetailsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            VrpDetails o = new VrpDetails();
            o.setId(set.getLong("id"));
            o.setAuditId(set.getLong("audit_id"));
            o.setName(set.getString("name"));
            o.setAuditFinancialYear(set.getString("financial_year"));
            o.setAuditFinancialDescription(set.getString("financial_description"));
            o.setRoundId(set.getLong("round_id"));
            o.setRoundName(set.getString("round_name"));
            o.setRoundStartDate(set.getDate("start_date"));
            o.setRoundEndDate(set.getDate("end_date"));
            o.setRoundDescription(StringUtils.trimToNull(set.getString("round_description")));
            o.setAuditDistrictId(set.getInt("audit_district_id"));
            o.setAuditDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            o.setAuditBlockId(set.getInt("audit_block_id"));
            o.setAuditBlockName(StringUtils.trimToNull(set.getString("block_name")));
            o.setAuditVpId(set.getInt("audit_village_panchayat_id"));
            o.setAuditVpName(StringUtils.trimToNull(set.getString("audit_vp_name")));
            o.setGenderId(set.getInt("gender_id"));
            o.setVillagePanchayatId(set.getInt("village_panchayat_id"));
            o.setJobCardNumber(StringUtils.trimToNull(set.getString("jc_no")));
            o.setGuardianName(StringUtils.trimToNull(set.getString("guardian_name")));
            o.setQualificationId(set.getInt("qualification_id"));
            o.setCommunityId(set.getInt("community_id"));
            o.setContactNumber(StringUtils.trimToNull(set.getString("contact_no")));
            o.setTotalDays(set.getInt("total_days"));
            o.setPaidAmount(set.getBigDecimal("paid_amount"));
            o.setPayMode(set.getInt("pay_mode"));
            o.setBankId(set.getInt("bank_id"));
            o.setAccountNumber(StringUtils.trimToNull(set.getString("acc_no")));
            o.setIfscCode(StringUtils.trimToNull(set.getString("ifsc_code")));
            o.setGradeId(set.getInt("grade_id"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("VrpDetails  : {}", o.toString());
            return o;
        }
    }
}
