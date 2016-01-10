package com.sastabackend.service.highlevel;

import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.HighLevelCommities;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.GrievancesRepository;
import com.sastabackend.repository.HighLevelCommityRepository;
import com.sastabackend.service.grievances.GrievancesServicesImpl;
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
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by SARVA on 27/Dec/2015.
 */
@Service
@Validated
public class HighLevelCommitiesServiceImpl implements  HighLevelCommitiesService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(HighLevelCommitiesServiceImpl.class);
    private final HighLevelCommityRepository repository;

    @Inject
    public HighLevelCommitiesServiceImpl(final HighLevelCommityRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading High Level Commities   : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<HighLevelCommities>();
            response.setData(selectHighLevelCommitiesData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading High Level Commities   : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<HighLevelCommities>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(HighLevelCommities hl) {
        LOGGER.debug("Creating  High Level Commities : {}", hl.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(hl);
            response.setStatus(flag);
            response.setData(flag == true ? " High Level Commities Added Successfully!!" : "Unable to add High Level Commities!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(HighLevelCommities hl) {
        LOGGER.debug("Updating  High Level Commities :{}", hl.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(hl);
            response.setStatus(flag);
            response.setData(flag == true ? "High Level Commities Updated Successfully!!" : "Unable to update High Level Commities!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(HighLevelCommities hl)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_high_level_commities")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("dateofjointsitting",Types.DATE),
                        new SqlParameter("totalparascount",Types.INTEGER) ,
                        new SqlParameter("totalparasamt",Types.DECIMAL) ,
                        new SqlParameter("parasettledduringDScount",Types.INTEGER) ,
                        new SqlParameter("parasettledduringDSamt",Types.DECIMAL) ,
                        new SqlParameter("parasettledduringHLCcount",Types.INTEGER) ,
                        new SqlParameter("parasettledduringHLCamt",Types.DECIMAL) ,
                        new SqlParameter("pendingparascount",Types.INTEGER) ,
                        new SqlParameter("pendingparasamt",Types.DECIMAL) ,
                        new SqlParameter("amountrecovered",Types.DECIMAL) ,
                        new SqlParameter("amounttoberecovered",Types.DECIMAL) ,
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", hl.getAuditId());
        inParamMap.put("dateofjointsitting",hl.getDateOfJointSitting());
        inParamMap.put("totalparascount",hl.getTotalParasCount());
        inParamMap.put("totalparasamt",hl.getTotalParasAmt());
        inParamMap.put("parasettledduringDScount",hl.getParaSettledDuringDSCount());
        inParamMap.put("parasettledduringDSamt",hl.getParaSettledDuringDSAmt());
        inParamMap.put("parasettledduringHLCcount",hl.getParaSettledDuringHLCCount());
        inParamMap.put("parasettledduringHLCamt",hl.getParaSettledDuringHLCAmt());
        inParamMap.put("pendingparascount",hl.getPendingParasCount());
        inParamMap.put("pendingparasamt",hl.getPendingParasAmt());
        inParamMap.put("amountrecovered",hl.getAmountRecovered());
        inParamMap.put("amounttoberecovered",hl.getAmountToBeRecovered());
        inParamMap.put("createdby", hl.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(HighLevelCommities hl)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_high_level_commities")
                .declareParameters(
                        new SqlParameter("high_level_id", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("dateofjointsitting",Types.DATE),
                        new SqlParameter("totalparascount",Types.INTEGER) ,
                        new SqlParameter("totalparasamt",Types.DECIMAL) ,
                        new SqlParameter("parasettledduringDScount",Types.INTEGER) ,
                        new SqlParameter("parasettledduringDSamt",Types.DECIMAL) ,
                        new SqlParameter("parasettledduringHLCcount",Types.INTEGER) ,
                        new SqlParameter("parasettledduringHLCamt",Types.DECIMAL) ,
                        new SqlParameter("pendingparascount",Types.INTEGER) ,
                        new SqlParameter("pendingparasamt",Types.DECIMAL) ,
                        new SqlParameter("amountrecovered",Types.DECIMAL) ,
                        new SqlParameter("amounttoberecovered",Types.DECIMAL) ,
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("high_level_id", hl.getId());
        inParamMap.put("auditid", hl.getAuditId());
        inParamMap.put("dateofjointsitting",hl.getDateOfJointSitting());
        inParamMap.put("totalparascount",hl.getTotalParasCount());
        inParamMap.put("totalparasamt",hl.getTotalParasAmt());
        inParamMap.put("parasettledduringDScount",hl.getParaSettledDuringDSCount());
        inParamMap.put("parasettledduringDSamt",hl.getParaSettledDuringDSAmt());
        inParamMap.put("parasettledduringHLCcount",hl.getParaSettledDuringHLCCount());
        inParamMap.put("parasettledduringHLCamt",hl.getParaSettledDuringHLCAmt());
        inParamMap.put("pendingparascount",hl.getPendingParasCount());
        inParamMap.put("pendingparasamt",hl.getPendingParasAmt());
        inParamMap.put("amountrecovered",hl.getAmountRecovered());
        inParamMap.put("amounttoberecovered",hl.getAmountToBeRecovered());
        inParamMap.put("modifiedby",hl.getModifiedBy());
        inParamMap.put("isactive",hl.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<HighLevelCommities> readList(){
        List<HighLevelCommities> list = jdbcTemplate.query("call select_high_level_commities", new HighLevelCommitiesMapper());
        return list;
    }

    private HighLevelCommities selectHighLevelCommitiesData(Long id){
        List<HighLevelCommities> o = new ArrayList<HighLevelCommities>();
        o = jdbcTemplate.query("call select_high_level_commities_by_id(?)", new Object[]{id}, new HighLevelCommitiesMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    protected static final class HighLevelCommitiesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            HighLevelCommities o = new HighLevelCommities();
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
            o.setDateOfJointSitting(set.getDate("date_of_joint_sitting"));
            o.setTotalParasCount(set.getInt("total_paras_count"));
            o.setTotalParasAmt(set.getBigDecimal("total_paras_amt"));
            o.setParaSettledDuringDSCount(set.getInt("para_settled_during_DS_count"));
            o.setParaSettledDuringDSAmt(set.getBigDecimal("para_settled_during_DS_amt"));
            o.setParaSettledDuringHLCCount(set.getInt("para_settled_during_HLC_count"));
            o.setParaSettledDuringHLCAmt(set.getBigDecimal("para_settled_during_HLC_amt"));
            o.setPendingParasCount(set.getInt("pending_paras_count"));
            o.setPendingParasAmt(set.getBigDecimal("pending_paras_amt"));
            o.setAmountRecovered(set.getBigDecimal("amount_recovered"));
            o.setAmountToBeRecovered(set.getBigDecimal("amount_to_be_recovered"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("HighLevelCommities  : {}", o.toString());
            return o;
        }
    }
}
