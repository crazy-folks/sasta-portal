package com.sastabackend.service.recovery;

import com.sastabackend.domain.*;
import com.sastabackend.repository.RecoveryRepository;
import com.sastabackend.util.BaseRowMapper;
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
 * Created by SARVA on 14/May/2016.
 */

@Service
@Validated
public class RecoveryServiceImpl implements RecoveryService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(RecoveryServiceImpl.class);
    private final RecoveryRepository repository;

    @Inject
    public RecoveryServiceImpl(final RecoveryRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Recovery  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Recovery>();
            response.setData(selectRecoveryData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Long userid, Long auditid) {
        LOGGER.debug("Reading Recovery  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Recovery>>();
            response.setData(readList(userid, auditid));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Recovery rc) {
        LOGGER.debug("Creating  Recovery : {}",rc.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            Long id =  Create(rc);
            response.setStatus((id>0)?true:false);
            response.setData(id);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Recovery rc) {
        LOGGER.debug("Updating  Recovery : {0}", rc.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(rc);
            response.setStatus(flag);
            response.setData(flag == true ? "Recovery Updated Successfully!!" : "Unable to update Recovery!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private Long Create(Recovery rc)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_recovery")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("parascount", Types.INTEGER),
                        new SqlParameter("parasamt", Types.DECIMAL),
                        new SqlParameter("settledparasgscount", Types.INTEGER),
                        new SqlParameter("settledparasgsamt", Types.DECIMAL),
                        new SqlParameter("recoveredamt", Types.DECIMAL),
                        new SqlParameter("setteledparascount", Types.VARCHAR),
                        new SqlParameter("settledparasamt", Types.DECIMAL),
                        new SqlParameter("pendingparascount", Types.INTEGER),
                        new SqlParameter("pendingparasamt", Types.DECIMAL),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("recoveryid", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", rc.getAuditId());
        inParamMap.put("parascount", rc.getParasCount());
        inParamMap.put("parasamt", rc.getParasAmount());
        inParamMap.put("settledparasgscount", rc.getSettledParasGsCount());
        inParamMap.put("settledparasgsamt", rc.getSetteledParasAmount());
        inParamMap.put("recoveredamt", rc.getRecoveredAmount());
        inParamMap.put("setteledparascount", rc.getSetteledParasCount());
        inParamMap.put("settledparasamt", rc.getSetteledParasAmount());
        inParamMap.put("pendingparascount", rc.getPendingParasCount());
        inParamMap.put("pendingparasamt", rc.getPendingParasAmount());
        inParamMap.put("createdby", rc.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (Long)simpleJdbcCallResult.get("recoveryid");
        else
            return 0L;
    }


    private boolean Modify(Recovery rc)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_recovery")
                .declareParameters(
                        new SqlParameter("recoveryid", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("parascount", Types.INTEGER),
                        new SqlParameter("parasamt", Types.DECIMAL),
                        new SqlParameter("settledparasgscount", Types.INTEGER),
                        new SqlParameter("settledparasgsamt", Types.DECIMAL),
                        new SqlParameter("recoveredamt", Types.DECIMAL),
                        new SqlParameter("setteledparascount", Types.VARCHAR),
                        new SqlParameter("settledparasamt", Types.DECIMAL),
                        new SqlParameter("pendingparascount", Types.INTEGER),
                        new SqlParameter("pendingparasamt", Types.DECIMAL),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("recoveryid", rc.getId());
        inParamMap.put("auditid", rc.getAuditId());
        inParamMap.put("parascount", rc.getParasCount());
        inParamMap.put("parasamt", rc.getParasAmount());
        inParamMap.put("settledparasgscount", rc.getSettledParasGsCount());
        inParamMap.put("settledparasgsamt", rc.getSetteledParasAmount());
        inParamMap.put("recoveredamt", rc.getRecoveredAmount());
        inParamMap.put("setteledparascount", rc.getSetteledParasCount());
        inParamMap.put("settledparasamt", rc.getSetteledParasAmount());
        inParamMap.put("pendingparascount", rc.getPendingParasCount());
        inParamMap.put("pendingparasamt", rc.getPendingParasAmount());
        inParamMap.put("modifyby", rc.getModifiedBy());
        inParamMap.put("isactive", rc.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    @Override
    public ResponseModel getRecoveryReports(ReportsProperty prop) {
        LOGGER.debug("Reading Recovery  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Recovery>>();
            response.setData(readRecoveryReports(prop));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel GetDetailedRecoveryDetails(Long id) {
        LOGGER.debug("Reading Detailed Recovery  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<DetailedRecovery>>();
            response.setData(readDetailedRecoveryList(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private List<DetailedRecovery> readDetailedRecoveryList(Long id) {
        List<DetailedRecovery> list = jdbcTemplate.query("call select_detailed_recovery_by_id(?)", new Object[]{id}, new DetailedRecoveryMapper());
        return list;
    }

    @Override
    public ResponseModel InsertDetailedRecoveryDetails(List<DetailedRecovery> list) {
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            Integer counter = 0;
            for (DetailedRecovery dr : list){
                boolean flag =  CreateDetailedRecovery(dr);
                if(flag)
                    counter++;
            }
            response.setStatus(true);
            response.setData(Integer.toString(counter).concat(" Items Successfully Added!!"));
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean CreateDetailedRecovery(DetailedRecovery dr)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_detailed_recovery")
                .declareParameters(
                        new SqlParameter("recoveryid", Types.BIGINT),
                        new SqlParameter("displayorder", Types.INTEGER),
                        new SqlParameter("actualamt", Types.DECIMAL),
                        new SqlParameter("recoveredamt", Types.DECIMAL),
                        new SqlParameter("recoverydescription", Types.VARCHAR),
                        new SqlParameter("paidedtype", Types.BOOLEAN),
                        new SqlParameter("recoverytype", Types.BOOLEAN),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("recoveryid", dr.getRecoveryId());
        inParamMap.put("displayorder", dr.getDisplayOrder());
        inParamMap.put("actualamt", dr.getActualAmount());
        inParamMap.put("recoveredamt", dr.getRecoveredAmount());
        inParamMap.put("recoverydescription", dr.getDescription());
        inParamMap.put("paidedtype", dr.getPaidedType());
        inParamMap.put("recoverytype", dr.getRecoveryType());
        inParamMap.put("createdby", dr.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    @Override
    public ResponseModel UpdateDetailedRecoveryDetails(List<DetailedRecovery> list) {
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            Integer counter = 0;
            for (DetailedRecovery dr : list){
                boolean flag = false;
                if(dr.getId() !=null && dr.getId() > 0){
                    flag = UpdateDetailedRecovery(dr);
                }else{
                    flag = CreateDetailedRecovery(dr);
                }
                if(flag)
                    counter++;
            }
            response.setStatus(true);
            response.setData(Integer.toString(counter).concat(" Items Successfully Updated!!"));
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean UpdateDetailedRecovery(DetailedRecovery dr)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_detailed_recovery")
                .declareParameters(
                        new SqlParameter("detailedrecoveryid", Types.BIGINT),
                        new SqlParameter("recoveryid", Types.BIGINT),
                        new SqlParameter("displayorder", Types.INTEGER),
                        new SqlParameter("actualamt", Types.DECIMAL),
                        new SqlParameter("recoveredamt", Types.DECIMAL),
                        new SqlParameter("recoverydescription", Types.VARCHAR),
                        new SqlParameter("paidedtype", Types.BOOLEAN),
                        new SqlParameter("recoverytype", Types.BOOLEAN),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("detailedrecoveryid", dr.getId());
        inParamMap.put("recoveryid", dr.getRecoveryId());
        inParamMap.put("displayorder", dr.getDisplayOrder());
        inParamMap.put("actualamt", dr.getActualAmount());
        inParamMap.put("recoveredamt", dr.getRecoveredAmount());
        inParamMap.put("recoverydescription", dr.getDescription());
        inParamMap.put("paidedtype", dr.getPaidedType());
        inParamMap.put("recoverytype", dr.getRecoveryType());
        inParamMap.put("modifyby", dr.getModifiedBy());
        inParamMap.put("isactive", dr.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private Recovery selectRecoveryData(Long id){
        List<Recovery> o = new ArrayList<Recovery>();
        o = jdbcTemplate.query("call select_recovery_id(?)", new Object[]{id}, new RecoveryMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    private List<Recovery> readList(Long userid,Long auditid) {
        List<Recovery> list = jdbcTemplate.query("call select_recovery(?,?)", new Object[]{userid,auditid}, new RecoveryMapper());
        return list;
    }


    /**
     * Read All Recovery based on end user search criteria
     * @param prop
     * @return - Success - List Of Special Grama Sabha, If fail empty list
     */
    private  List<Recovery> readRecoveryReports(ReportsProperty prop){
        List<Recovery> o = new ArrayList<Recovery>();
        if(!prop.getIsConsolidate())
            o = jdbcTemplate.query("call recovery_reports(?,?,?,?,?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId(),prop.getDistrictId(),prop.getBlockId(),prop.getVillageId(),prop.getUserId()},
                    new RecoveryReportsMapper());
        else
            o = jdbcTemplate.query("call recovery_consolidate_reports(?,?)",
                    new Object[]{prop.getReferenceId(), prop.getRoundId()},
                    new RecoveryReportsMapper());
        return o;
    }

    protected static final class RecoveryReportsMapper extends BaseRowMapper {

        public Object mapRowImpl(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Recovery o = new Recovery();
            if(hasColumn("id"))
                o.setId(set.getLong("id"));
            if(hasColumn("audit_id"))
                o.setAuditId(set.getLong("audit_id"));
            if(hasColumn("fy_name"))
                o.setFinancialYear(set.getString("fy_name"));
            if(hasColumn("round_name"))
                o.setRoundName(set.getString("round_name"));
            if(hasColumn("start_date"))
                o.setRoundStartDate(set.getDate("start_date"));
            if(hasColumn("end_date"))
                o.setRoundEndDate(set.getDate("end_date"));
            if(hasColumn("district_name"))
                o.setDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            if(hasColumn("block_name"))
                o.setBlockName(StringUtils.trimToNull(set.getString("block_name")));
            if(hasColumn("village_name"))
                o.setVpName(StringUtils.trimToNull(set.getString("village_name")));
            o.setParasCount(set.getInt("paras_count"));
            o.setParasAmount(set.getBigDecimal("paras_amt"));
            o.setSettledParasGsCount(set.getInt("settled_paras_gs_count"));
            o.setSettledParasGsAmount(set.getBigDecimal("settled_paras_gs_amt"));
            o.setRecoveredAmount(set.getBigDecimal("recovered_amt"));
            o.setSetteledParasCount(set.getInt("setteled_paras_count"));
            o.setSetteledParasAmount(set.getBigDecimal("settled_paras_amt"));
            o.setPendingParasCount(set.getInt("pending_paras_count"));
            o.setPendingParasAmount(set.getBigDecimal("pending_paras_amt"));
            if(hasColumn("created_date"))
                o.setCreatedDate(set.getTimestamp("created_date"));
            if(hasColumn("modified_date"))
                o.setModifiedDate(set.getTimestamp("modified_date"));
            if(hasColumn("created_by"))
                o.setCreatedBy(set.getLong("created_by"));
            if(hasColumn("modified_by"))
                o.setModifiedBy(set.getLong("modified_by"));
            if(hasColumn("is_active"))
                o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }
    }

    protected static final class DetailedRecoveryMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            DetailedRecovery o = new DetailedRecovery();
            o.setId(set.getLong("id"));
            o.setRecoveryId(set.getLong("recovery_id"));
            o.setDisplayOrder(set.getInt("display_order"));
            o.setActualAmount(set.getBigDecimal("actual_amt"));
            o.setRecoveredAmount(set.getBigDecimal("recovered_amt"));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setPaidedType(set.getBoolean("paided_type"));
            o.setPaidedTypeText(StringUtils.trimToNull(set.getString("paided_type_text")));
            o.setRecoveryType(set.getBoolean("recovery_type"));
            o.setRecoveryTypeText(StringUtils.trimToNull(set.getString("recovery_type_text")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }
    }

    protected static final class RecoveryMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Recovery o = new Recovery();
            o.setId(set.getLong("id"));
            o.setAuditId(set.getLong("audit_id"));
            o.setFinancialYear(set.getString("financial_year"));
            o.setFinancialDescription(set.getString("financial_description"));
            o.setRoundId(set.getInt("round_id"));
            o.setRoundName(set.getString("round_name"));
            o.setRoundStartDate(set.getDate("start_date"));
            o.setRoundEndDate(set.getDate("end_date"));
            o.setRoundDescription(StringUtils.trimToNull(set.getString("round_description")));
            o.setAuditDistrictId(set.getInt("audit_district_id"));
            o.setDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            o.setBlockId(set.getInt("audit_block_id"));
            o.setBlockName(StringUtils.trimToNull(set.getString("block_name")));
            o.setVpId(set.getInt("village_panchayat_id"));
            o.setVpName(StringUtils.trimToNull(set.getString("vp_name")));
            o.setParasCount(set.getInt("paras_count"));
            o.setParasAmount(set.getBigDecimal("paras_amt"));
            o.setSettledParasGsCount(set.getInt("settled_paras_gs_count"));
            o.setSettledParasGsAmount(set.getBigDecimal("settled_paras_gs_amt"));
            o.setRecoveredAmount(set.getBigDecimal("recovered_amt"));
            o.setSetteledParasCount(set.getInt("setteled_paras_count"));
            o.setSetteledParasAmount(set.getBigDecimal("settled_paras_amt"));
            o.setPendingParasCount(set.getInt("pending_paras_count"));
            o.setPendingParasAmount(set.getBigDecimal("pending_paras_amt"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }
    }
}
