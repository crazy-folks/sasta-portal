package com.sastabackend.service.audit;

import com.sastabackend.domain.Audit;
import com.sastabackend.domain.ConfigurationSettings;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Rounds;
import com.sastabackend.repository.AuditRepository;
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
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 09/Nov/2015.
 */
@Service
@Validated
public class AuditServiceImpl implements AuditService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuditServiceImpl.class);
    private final AuditRepository repository;

    @Inject
    public AuditServiceImpl(final AuditRepository repository ){
        this.repository = repository;
    }


    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Audit  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Audit>();
            response.setData(selectAuditData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Integer district,Integer block,Integer financial,Long userid) {
        LOGGER.debug("Reading Audit  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Audit>>();
            response.setData(readList(district,block,financial,userid));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Long roundid, Date startdate, Date enddate, Date gramasabhadate,
                             Integer district_id, Integer block_id, Integer panchayat_id, Long createdby) {
        LOGGER.debug("Creating  Audit : {}", roundid,startdate,enddate,gramasabhadate,
                district_id,block_id,panchayat_id,createdby);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(roundid, startdate, enddate, gramasabhadate,
                    district_id, block_id, panchayat_id, createdby);
            response.setStatus(flag);
            response.setData(flag == true ? " Audit Added Successfully!!" : "Unable to add Audit!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Long auditid, Long roundid, Date startdate, Date enddate, Date gramasabhadate,
                                Integer district_id, Integer block_id, Integer panchayat_id, Long modifyby,
                                Boolean isactive) {
        LOGGER.debug("Updating Audit  : {}", auditid, roundid, startdate, enddate, gramasabhadate,
                district_id, block_id, panchayat_id,  modifyby, isactive);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(auditid, roundid, startdate, enddate, gramasabhadate,
                    district_id, block_id, panchayat_id, modifyby, isactive);
            response.setStatus(flag);
            response.setData(flag == true ? "Audit Updated Successfully!!" : "Unable to update Audit!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel DoesExistAuditEntry(Long roundid, Integer districtid, Integer blockid, Integer panchayatid) {
        Boolean flag = false;
        ResponseModel<String> response = new ResponseModel<String>();
        response.setStatus(false);
        try{
            response.setData("");
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("does_exist_audit")
                    .declareParameters(
                            new SqlParameter("roundid", Types.BIGINT),
                            new SqlParameter("auditdistrictid", Types.INTEGER),
                            new SqlParameter("auditblockid", Types.INTEGER),
                            new SqlParameter("villagepanchayatid", Types.INTEGER),
                            new SqlOutParameter("flag", Types.BIT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("roundid", roundid);
            inParamMap.put("auditdistrictid", districtid);
            inParamMap.put("auditblockid", blockid);
            inParamMap.put("villagepanchayatid", panchayatid);
            SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
            simplejdbcCall.compile();
            Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
            if(!simpleJdbcCallResult.isEmpty()) {
                response.setStatus((boolean) simpleJdbcCallResult.get("flag"));
                response.setData("Already a record found in database for selected round!.");
            }
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return  response;
    }

    @Override
    public ResponseModel SelectConfig(Long id) {
        return getConfiguration(id);
    }


    private boolean Create(Long roundid, Date startdate, Date enddate, Date gramasabhadate, Integer district_id,
                           Integer block_id, Integer panchayat_id, Long createdby) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_audit_entries")
                .declareParameters(
                        new SqlParameter("roundid", Types.BIGINT),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("gramasabhadate", Types.DATE),
                        new SqlParameter("district_id", Types.INTEGER),
                        new SqlParameter("block_id", Types.INTEGER),
                        new SqlParameter("panchayat_id", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("roundid", roundid);
        inParamMap.put("startdate", startdate);
        inParamMap.put("enddate", enddate);
        inParamMap.put("gramasabhadate", gramasabhadate);
        inParamMap.put("district_id", district_id);
        inParamMap.put("block_id", block_id);
        inParamMap.put("panchayat_id", panchayat_id);
        inParamMap.put("createdby", createdby);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Long auditid, Long roundid, Date startdate, Date enddate, Date gramasabhadate,
                           Integer district_id, Integer block_id, Integer panchayat_id, Long modifyby,
                           Boolean isactive) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_audit_entries")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("roundid", Types.BIGINT),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("gramasabhadate", Types.DATE),
                        new SqlParameter("district_id", Types.INTEGER),
                        new SqlParameter("block_id", Types.INTEGER),
                        new SqlParameter("panchayat_id", Types.INTEGER),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", auditid);
        inParamMap.put("roundid", roundid);
        inParamMap.put("startdate", startdate);
        inParamMap.put("enddate", enddate);
        inParamMap.put("gramasabhadate", gramasabhadate);
        inParamMap.put("district_id", district_id);
        inParamMap.put("block_id", block_id);
        inParamMap.put("panchayat_id", panchayat_id);
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
    private List<Rounds> readList(Integer district,Integer block,Integer financial,Long userid){
        //jdbcTemplate.query("call select_session(?)", new Object[]{session}, new SessionMapper());
        List<Rounds> list = jdbcTemplate.query("call select_audit_entires(?,?,?,?)",
                new Object[]{district,block,financial,userid}, new AuditMapper());
        return list;
    }

    private Audit selectAuditData(Long id){
        List<Audit> o = new ArrayList<Audit>();
        o = jdbcTemplate.query("call select_audit_entry(?)", new Object[]{id}, new AuditMapper());
        LOGGER.debug("Creating  Audit : {}",o.toString());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    private ResponseModel getConfiguration(Long id){
        ResponseModel response = null;
        try {
            response = new ResponseModel<ConfigurationSettings>();
            List<ConfigurationSettings> o = new ArrayList<ConfigurationSettings>();
            o = jdbcTemplate.query("call select_config_settings(?)", new Object[]{id}, new ConfigSettingsMapper());
            response.setStatus(true);
            if (o.size() == 0) {
                response.setData(null);
            }
            else {
                response.setData(o.get(0));
            }
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setStatus(false);
            response.setData(err.getMessage());
        }
        return response;
    }


    private static final class ConfigSettingsMapper implements  RowMapper{
        public Object mapRow(ResultSet set,int rowNo) throws  SQLException{
            ConfigurationSettings o = new ConfigurationSettings();
            o.setAuditId(set.getLong("audit_id"));
            o.setRoundId(set.getLong("round_id"));
            o.setStartDate(set.getDate("start_date"));
            o.setEndDate(set.getDate("end_date"));
            o.setGramaSabhaDate(set.getDate("grama_sabha_date"));
            o.setFinancialYearId(set.getInt("reference_id"));
            o.setBlockId(set.getInt("audit_block_id"));
            o.setDistrictId(set.getInt("audit_district_id"));
            o.setPanchayatId(set.getInt("village_panchayat_id"));
            return o;
        }
    }

    protected static final class AuditMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Audit o = new Audit();
            o.setAuditId(set.getLong("audit_id"));
            o.setRoundId(set.getLong("round_id"));
            o.setRoundName(StringUtils.trimToNull(set.getString("round_name")));
            o.setStartDate(set.getDate("start_date"));
            o.setEndDate(set.getDate("end_date"));
            o.setRoundDescription(StringUtils.trimToNull(set.getString("round_description")));
            o.setFinancialYear(StringUtils.trimToNull(set.getString("financial_year")));
            o.setFinancialId(set.getInt("fy_id"));
            o.setFinancialDescription(StringUtils.trimToNull(set.getString("financial_description")));
            o.setGramaSabhaDate(set.getDate("grama_sabha_date"));
            o.setAuditDistrictId(set.getInt("audit_district_id"));
            o.setDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            o.setAuditBlockId(set.getInt("audit_block_id"));
            o.setBlockName(StringUtils.trimToNull(set.getString("block_name")));
            o.setVillagePanchayatId(set.getInt("village_panchayat_id"));
            o.setVpName(StringUtils.trimToNull(set.getString("vp_name")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Audit  : {}", o.toString());
            return o;
        }
    }
}
