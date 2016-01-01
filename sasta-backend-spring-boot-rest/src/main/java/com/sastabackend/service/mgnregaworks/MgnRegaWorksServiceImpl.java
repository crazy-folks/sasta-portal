package com.sastabackend.service.mgnregaworks;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.MgnRegaWorks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.ExpenditureRepository;
import com.sastabackend.repository.MgnRegaRepository;
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
 * Created by SARVA on 26/Dec/2015.
 */
@Service
@Validated
public class MgnRegaWorksServiceImpl implements MgnRegaWorksService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(MgnRegaWorksServiceImpl.class);
    private final MgnRegaRepository repository;

    @Inject
    public MgnRegaWorksServiceImpl(final MgnRegaRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading MgnRegaWorks  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<MgnRegaWorks>();
            response.setData(selectMgnRegaWorksData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading MgnRegaWorks  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<MgnRegaWorks>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(MgnRegaWorks mgn) {
        LOGGER.debug("Creating  MgnRegaWorks : {}", mgn.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(mgn);
            response.setStatus(flag);
            response.setData(flag == true ? " MgnRegaWorks Added Successfully!!" : "Unable to add MgnRegaWorks!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(MgnRegaWorks mgn) {
        LOGGER.debug("Creating  MgnRegaWorks :{}", mgn.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(mgn);
            response.setStatus(flag);
            response.setData(flag == true ? "MgnRegaWorks Updated Successfully!!" : "Unable to update MgnRegaWorks!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean Create(MgnRegaWorks mgn) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_mgnrega_works")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("totalworksexecuted", Types.INTEGER),
                        new SqlParameter("completedworkcount", Types.INTEGER),
                        new SqlParameter("pendingworkcount", Types.INTEGER),
                        new SqlParameter("unskilledwagescomplworks", Types.INTEGER),
                        new SqlParameter("skilledwagescomplworks", Types.INTEGER),
                        new SqlParameter("Materialexpcomplworks", Types.INTEGER),
                        new SqlParameter("administrativeexpcomplworks", Types.INTEGER),
                        new SqlParameter("complworksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("Expincurredcomplworks", Types.INTEGER),
                        new SqlParameter("complworksevaluatedSAteam", Types.INTEGER),
                        new SqlParameter("ongoingworkscount", Types.INTEGER),
                        new SqlParameter("unskilledwagesogworks", Types.INTEGER),
                        new SqlParameter("skilledwagesogworks", Types.INTEGER),
                        new SqlParameter("mgnregaworkscol", Types.VARCHAR),
                        new SqlParameter("Materialexpoglworks", Types.INTEGER),
                        new SqlParameter("administrativeexpogworks", Types.INTEGER),
                        new SqlParameter("og_worksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("Expincurredogworks", Types.INTEGER),
                        new SqlParameter("oglworksevaluatedSAteam", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", mgn.getAuditId());
        inParamMap.put("totalworksexecuted", mgn.getTotalWorksExecuted());
        inParamMap.put("completedworkcount", mgn.getCompletedWorkCount());
        inParamMap.put("pendingworkcount", mgn.getPendingWorkCount());
        inParamMap.put("unskilledwagescomplworks", mgn.getUnskilledWagesComplWorks());
        inParamMap.put("skilledwagescomplworks", mgn.getSkilledWagesComplWorks());
        inParamMap.put("Materialexpcomplworks", mgn.getMaterialExpComplWorks());
        inParamMap.put("administrativeexpcomplworks", mgn.getAdministrativeExpComplWorks());
        inParamMap.put("complworksevaluatedbySA", mgn.getComplWorksEvaluatedBySA());
        inParamMap.put("Expincurredcomplworks", mgn.getExpIncurredComplWorks());
        inParamMap.put("complworksevaluatedSAteam", mgn.getComplWorksEvaluatedSATeam());
        inParamMap.put("ongoingworkscount", mgn.getOnGoingWorksCount());
        inParamMap.put("unskilledwagesogworks", mgn.getUnskilledWagesOgWorks());
        inParamMap.put("skilledwagesogworks", mgn.getSkilledWagesOgWorks());
        inParamMap.put("mgnregaworkscol", mgn.getMgnRegaWorksCol());
        inParamMap.put("Materialexpoglworks", mgn.getMaterialExpOglWorks());
        inParamMap.put("administrativeexpogworks", mgn.getAdministrativeExpOgWorks());
        inParamMap.put("og_worksevaluatedbySA", mgn.getOgWorksEvaluatedBySA());
        inParamMap.put("Expincurredogworks", mgn.getExpIncurredOgWorks());
        inParamMap.put("oglworksevaluatedSAteam", mgn.getOglWorksEvaluatedSATeam());
        inParamMap.put("createdby", mgn.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(MgnRegaWorks mgn) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_mgnrega_works")
                .declareParameters(
                        new SqlParameter("mgnrega_work_id", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("totalworksexecuted", Types.INTEGER),
                        new SqlParameter("completedworkcount", Types.INTEGER),
                        new SqlParameter("pendingworkcount", Types.INTEGER),
                        new SqlParameter("unskilledwagescomplworks", Types.INTEGER),
                        new SqlParameter("skilledwagescomplworks", Types.INTEGER),
                        new SqlParameter("Materialexpcomplworks", Types.INTEGER),
                        new SqlParameter("administrativeexpcomplworks", Types.INTEGER),
                        new SqlParameter("complworksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("Expincurredcomplworks", Types.INTEGER),
                        new SqlParameter("complworksevaluatedSAteam", Types.INTEGER),
                        new SqlParameter("ongoingworkscount", Types.INTEGER),
                        new SqlParameter("unskilledwagesogworks", Types.INTEGER),
                        new SqlParameter("skilledwagesogworks", Types.INTEGER),
                        new SqlParameter("mgnregaworkscol", Types.VARCHAR),
                        new SqlParameter("Materialexpoglworks", Types.INTEGER),
                        new SqlParameter("administrativeexpogworks", Types.INTEGER),
                        new SqlParameter("og_worksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("Expincurredogworks", Types.INTEGER),
                        new SqlParameter("oglworksevaluatedSAteam", Types.INTEGER),
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("mgnrega_work_id", mgn.getId());
        inParamMap.put("auditid", mgn.getAuditId());
        inParamMap.put("totalworksexecuted", mgn.getTotalWorksExecuted());
        inParamMap.put("completedworkcount", mgn.getCompletedWorkCount());
        inParamMap.put("pendingworkcount", mgn.getPendingWorkCount());
        inParamMap.put("unskilledwagescomplworks", mgn.getUnskilledWagesComplWorks());
        inParamMap.put("skilledwagescomplworks", mgn.getSkilledWagesComplWorks());
        inParamMap.put("Materialexpcomplworks", mgn.getMaterialExpComplWorks());
        inParamMap.put("administrativeexpcomplworks", mgn.getAdministrativeExpComplWorks());
        inParamMap.put("complworksevaluatedbySA", mgn.getComplWorksEvaluatedBySA());
        inParamMap.put("Expincurredcomplworks", mgn.getExpIncurredComplWorks());
        inParamMap.put("complworksevaluatedSAteam", mgn.getComplWorksEvaluatedSATeam());
        inParamMap.put("ongoingworkscount", mgn.getOnGoingWorksCount());
        inParamMap.put("unskilledwagesogworks", mgn.getUnskilledWagesOgWorks());
        inParamMap.put("skilledwagesogworks", mgn.getSkilledWagesOgWorks());
        inParamMap.put("mgnregaworkscol", mgn.getMgnRegaWorksCol());
        inParamMap.put("Materialexpoglworks", mgn.getMaterialExpOglWorks());
        inParamMap.put("administrativeexpogworks", mgn.getAdministrativeExpOgWorks());
        inParamMap.put("og_worksevaluatedbySA", mgn.getOgWorksEvaluatedBySA());
        inParamMap.put("Expincurredogworks", mgn.getExpIncurredOgWorks());
        inParamMap.put("oglworksevaluatedSAteam", mgn.getOglWorksEvaluatedSATeam());
        inParamMap.put("modifiedby", mgn.getModifiedBy());
        inParamMap.put("isactive", mgn.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<MgnRegaWorks> readList(){
        List<MgnRegaWorks> list = jdbcTemplate.query("call select_mgnrega_works", new MgnRegaWorksMapper());
        return list;
    }

    private MgnRegaWorks selectMgnRegaWorksData(Long id){
        List<MgnRegaWorks> o = new ArrayList<MgnRegaWorks>();
        o = jdbcTemplate.query("call select_audit_expenditure_by_id(?)", new Object[]{id}, new MgnRegaWorksMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    protected static final class MgnRegaWorksMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            MgnRegaWorks o = new MgnRegaWorks();
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
            o.setTotalWorksExecuted(set.getInt("tota_lworks_executed"));
            o.setCompletedWorkCount(set.getInt("completed_work_count"));
            o.setPendingWorkCount(set.getInt("pending_work_count"));
            o.setUnskilledWagesComplWorks(set.getInt("unskilled_wages_compl_works"));
            o.setSkilledWagesComplWorks(set.getInt("skilled_wages_compl_works"));
            o.setMaterialExpComplWorks(set.getInt("material_exp_compl_works"));
            o.setAdministrativeExpComplWorks(set.getInt("administrative_exp_compl_works"));
            o.setComplWorksEvaluatedBySA(set.getInt("compl_works_evaluated_by_SA"));
            o.setExpIncurredComplWorks(set.getInt("Exp_incurred_compl_works"));
            o.setComplWorksEvaluatedSATeam(set.getInt("compl_works_evaluated_SA_team"));
            o.setOnGoingWorksCount(set.getInt("on_going_works_count"));
            o.setUnskilledWagesOgWorks(set.getInt("unskilled_wages_og_works"));
            o.setSkilledWagesOgWorks(set.getInt("skilled_wages_og_works"));
            o.setMgnRegaWorksCol(set.getString("mgnrega_workscol"));
            o.setMaterialExpComplWorks(set.getInt("material_exp_ogl_works"));
            o.setAdministrativeExpOgWorks(set.getInt("administrative_exp_og_works"));
            o.setOgWorksEvaluatedBySA(set.getInt("og_works_evaluated_by_SA"));
            o.setExpIncurredOgWorks(set.getInt("Exp_incurred_og_works"));
            o.setOglWorksEvaluatedSATeam(set.getInt("ogl_works_evaluated_SA_team"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Expenditure  : {}", o.toString());
            return o;
        }
    }
}
