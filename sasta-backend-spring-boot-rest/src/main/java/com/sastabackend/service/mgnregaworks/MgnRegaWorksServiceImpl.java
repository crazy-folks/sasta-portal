package com.sastabackend.service.mgnregaworks;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.MgnRegaWorks;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.ExpenditureRepository;
import com.sastabackend.repository.MgnRegaRepository;
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
    public ResponseModel findAll(Long userid,Long auditid) {
        LOGGER.debug("Reading MgnRegaWorks  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<MgnRegaWorks>>();
            response.setData(readList(userid, auditid));
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

    /**
     * Read All MgnRegaWorks based on end user search criteria
     * @param prop
     * @return - Success - List Of MgnRegaWorks, If fail empty list
     */
    @Override
    public ResponseModel getMgnRegaWorksReports(ReportsProperty prop){
        LOGGER.debug("Reading MgnRegaWorks  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<MgnRegaWorks>>();
            response.setData(readMgnRegaWorksReports(prop));
            response.setStatus(true);
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
                        new SqlParameter("totalworksexecutedduringFY", Types.INTEGER),
                        new SqlParameter("noofworkscompleted", Types.INTEGER),
                        new SqlParameter("noofpendingworks", Types.INTEGER),
                        new SqlParameter("unskilledwagesforcompletedworks", Types.INTEGER),
                        new SqlParameter("skilledwagesforcompletedworks", Types.INTEGER),
                        new SqlParameter("materialexpforcompletedworks", Types.INTEGER),
                        new SqlParameter("administrativeexpforcompletedworks", Types.INTEGER),
                        new SqlParameter("noofcompletedworksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("expincurredforcompletedworks", Types.INTEGER),
                        new SqlParameter("valueofcompletedworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("noofongoingworks", Types.INTEGER),
                        new SqlParameter("unskilledwagesforongoingworks", Types.INTEGER),
                        new SqlParameter("skilledwagesforongoingworks", Types.INTEGER),
                        new SqlParameter("materialexpforongoingworks", Types.INTEGER),
                        new SqlParameter("administrativeexpforongoingworks", Types.INTEGER),
                        new SqlParameter("noofongoingworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("expincurredforongoingworks", Types.INTEGER),
                        new SqlParameter("valueofongoingworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", mgn.getAuditId());
        inParamMap.put("totalworksexecutedduringFY", mgn.getTotalWorksExecutedDuringFY());
        inParamMap.put("noofworkscompleted", mgn.getNoOfWorksCompleted());
        inParamMap.put("noofpendingworks", mgn.getNoOfPendingWorks());
        inParamMap.put("unskilledwagesforcompletedworks", mgn.getUnskilledWagesForCompletedWorks());
        inParamMap.put("skilledwagesforcompletedworks", mgn.getSkilledWagesForCompletedWorks());
        inParamMap.put("materialexpforcompletedworks", mgn.getMaterialExpForCompletedWorks());
        inParamMap.put("administrativeexpforcompletedworks", mgn.getAdministrativeExpForCompletedWorks());
        inParamMap.put("noofcompletedworksevaluatedbySA", mgn.getNoOfCompletedWorksEvaluatedBySA());
        inParamMap.put("expincurredforcompletedworks", mgn.getExpIncurredForCompletedWorks());
        inParamMap.put("valueofcompletedworksevaluatedbySAteam", mgn.getValueOfCompletedWorksEvaluatedBySATeam());
        inParamMap.put("noofongoingworks", mgn.getNoOfOnGoingWorks());
        inParamMap.put("unskilledwagesforongoingworks", mgn.getUnSkilledWagesForOnGoingWorks());
        inParamMap.put("skilledwagesforongoingworks", mgn.getSkilledWagesForOnGoingWorks());
        inParamMap.put("materialexpforongoingworks", mgn.getMaterialExpForOnGoingWorks());
        inParamMap.put("administrativeexpforongoingworks", mgn.getAdministrativeExpForOnGoingWorks());
        inParamMap.put("noofongoingworksevaluatedbySAteam", mgn.getNoOfOnGoingWorksEvaluatedBySATeam());
        inParamMap.put("expincurredforongoingworks", mgn.getExpIncurredForOnGoingWorks());
        inParamMap.put("valueofongoingworksevaluatedbySAteam", mgn.getValueOfOnGoingWorksEvaluatedBySATeam());
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
                        new SqlParameter("totalworksexecutedduringFY", Types.INTEGER),
                        new SqlParameter("noofworkscompleted", Types.INTEGER),
                        new SqlParameter("noofpendingworks", Types.INTEGER),
                        new SqlParameter("unskilledwagesforcompletedworks", Types.INTEGER),
                        new SqlParameter("skilledwagesforcompletedworks", Types.INTEGER),
                        new SqlParameter("materialexpforcompletedworks", Types.INTEGER),
                        new SqlParameter("administrativeexpforcompletedworks", Types.INTEGER),
                        new SqlParameter("noofcompletedworksevaluatedbySA", Types.INTEGER),
                        new SqlParameter("expincurredforcompletedworks", Types.INTEGER),
                        new SqlParameter("valueofcompletedworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("noofongoingworks", Types.INTEGER),
                        new SqlParameter("unskilledwagesforongoingworks", Types.INTEGER),
                        new SqlParameter("skilledwagesforongoingworks", Types.INTEGER),
                        new SqlParameter("materialexpforongoingworks", Types.INTEGER),
                        new SqlParameter("administrativeexpforongoingworks", Types.INTEGER),
                        new SqlParameter("noofongoingworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("expincurredforongoingworks", Types.INTEGER),
                        new SqlParameter("valueofongoingworksevaluatedbySAteam", Types.INTEGER),
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("mgnrega_work_id", mgn.getId());
        inParamMap.put("auditid", mgn.getAuditId());
        inParamMap.put("totalworksexecutedduringFY", mgn.getTotalWorksExecutedDuringFY());
        inParamMap.put("noofworkscompleted", mgn.getNoOfWorksCompleted());
        inParamMap.put("noofpendingworks", mgn.getNoOfPendingWorks());
        inParamMap.put("unskilledwagesforcompletedworks", mgn.getUnskilledWagesForCompletedWorks());
        inParamMap.put("skilledwagesforcompletedworks", mgn.getSkilledWagesForCompletedWorks());
        inParamMap.put("materialexpforcompletedworks", mgn.getMaterialExpForCompletedWorks());
        inParamMap.put("administrativeexpforcompletedworks", mgn.getAdministrativeExpForCompletedWorks());
        inParamMap.put("noofcompletedworksevaluatedbySA", mgn.getNoOfCompletedWorksEvaluatedBySA());
        inParamMap.put("expincurredforcompletedworks", mgn.getExpIncurredForCompletedWorks());
        inParamMap.put("valueofcompletedworksevaluatedbySAteam", mgn.getValueOfCompletedWorksEvaluatedBySATeam());
        inParamMap.put("noofongoingworks", mgn.getNoOfOnGoingWorks());
        inParamMap.put("unskilledwagesforongoingworks", mgn.getUnSkilledWagesForOnGoingWorks());
        inParamMap.put("skilledwagesforongoingworks", mgn.getSkilledWagesForOnGoingWorks());
        inParamMap.put("materialexpforongoingworks", mgn.getMaterialExpForOnGoingWorks());
        inParamMap.put("administrativeexpforongoingworks", mgn.getAdministrativeExpForOnGoingWorks());
        inParamMap.put("noofongoingworksevaluatedbySAteam", mgn.getNoOfOnGoingWorksEvaluatedBySATeam());
        inParamMap.put("expincurredforongoingworks", mgn.getExpIncurredForOnGoingWorks());
        inParamMap.put("valueofongoingworksevaluatedbySAteam", mgn.getValueOfOnGoingWorksEvaluatedBySATeam());
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

    private List<MgnRegaWorks> readList(Long userid,Long auditid){
        List<MgnRegaWorks> list = jdbcTemplate.query("call select_mgnrega_works(?,?)", new Object[]{userid,auditid}, new MgnRegaWorksMapper());
        return list;
    }

    private MgnRegaWorks selectMgnRegaWorksData(Long id){
        List<MgnRegaWorks> o = new ArrayList<MgnRegaWorks>();
        o = jdbcTemplate.query("call select_mgnrega_works_by_id(?)", new Object[]{id}, new MgnRegaWorksMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    /**
     * Read All MgnRegaWorks based on end user search criteria
     * @param prop
     * @return - Success - List Of MgnRegaWorks, If fail empty list
     */
    private List<MgnRegaWorks> readMgnRegaWorksReports(ReportsProperty prop){
        List<MgnRegaWorks> o = new ArrayList<MgnRegaWorks>();
        if(!prop.getIsConsolidate())
            o = jdbcTemplate.query("call mgnrega_works_reports(?,?,?,?,?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId(),prop.getDistrictId(),prop.getBlockId(),prop.getVillageId(),prop.getUserId()},
                    new MgnRegaWorksReportsMapper());
        else
            o = jdbcTemplate.query("call mgnrega_works_consolidate_reports(?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId()},
                    new MgnRegaWorksReportsMapper());
        return o;
    }

    protected static final class MgnRegaWorksReportsMapper extends BaseRowMapper {

        public Object mapRowImpl(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            MgnRegaWorks o = new MgnRegaWorks();
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
            o.setTotalWorksExecutedDuringFY(set.getInt("total_works_executed_during_FY"));
            o.setNoOfWorksCompleted(set.getInt("no_of_works_completed"));
            o.setNoOfPendingWorks(set.getInt("no_of_pending_works"));
            o.setUnskilledWagesForCompletedWorks(set.getInt("unskilled_wages_for_completed_works"));
            o.setSkilledWagesForCompletedWorks(set.getInt("skilled_wages_for_completed_works"));
            o.setMaterialExpForCompletedWorks(set.getInt("material_exp_for_completed_works"));
            o.setAdministrativeExpForCompletedWorks(set.getInt("administrative_exp_for_completed_works"));
            o.setNoOfCompletedWorksEvaluatedBySA(set.getInt("no_of_completed_works_evaluated_by_SA"));
            o.setExpIncurredForCompletedWorks(set.getInt("exp_incurred_for_completed_works"));
            o.setValueOfCompletedWorksEvaluatedBySATeam(set.getInt("value_of_completed_works_evaluated_by_SA_team"));
            o.setNoOfOnGoingWorks(set.getInt("no_of_on_going_works"));
            o.setUnSkilledWagesForOnGoingWorks(set.getInt("unskilled_wages_for_on_going_works"));
            o.setSkilledWagesForOnGoingWorks(set.getInt("skilled_wages_for_on_going_works"));
            o.setMaterialExpForOnGoingWorks(set.getInt("material_exp_for_on_going_works"));
            o.setAdministrativeExpForOnGoingWorks(set.getInt("administrative_exp_for_on_going_works"));
            o.setNoOfOnGoingWorksEvaluatedBySATeam(set.getInt("no_of_on_going_works_evaluated_by_SA_team"));
            o.setExpIncurredForOnGoingWorks(set.getInt("exp_incurred_for_on_going_works"));
            o.setValueOfOnGoingWorksEvaluatedBySATeam(set.getInt("value_of_on_going_works_evaluated_by_SA_team"));
            if(hasColumn("created_date"))
                o.setCreatedDate(set.getTimestamp("created_date"));
            if(hasColumn("modified_date"))
                o.setModifiedDate(set.getTimestamp("modified_date"));
            if(hasColumn("created_by"))
                o.setCreatedBy(set.getLong("created_by"));
            if(hasColumn("modified_by"))
                o.setModifiedBy(set.getLong("modified_by"));
            //o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            //o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            if(hasColumn("is_active"))
                o.setStatus(set.getBoolean("is_active"));
            //LOGGER.debug("MGNREGA  : {}", o.toString());
            return o;
        }
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
            o.setTotalWorksExecutedDuringFY(set.getInt("total_works_executed_during_FY"));
            o.setNoOfWorksCompleted(set.getInt("no_of_works_completed"));
            o.setNoOfPendingWorks(set.getInt("no_of_pending_works"));
            o.setUnskilledWagesForCompletedWorks(set.getInt("unskilled_wages_for_completed_works"));
            o.setSkilledWagesForCompletedWorks(set.getInt("skilled_wages_for_completed_works"));
            o.setMaterialExpForCompletedWorks(set.getInt("material_exp_for_completed_works"));
            o.setAdministrativeExpForCompletedWorks(set.getInt("administrative_exp_for_completed_works"));
            o.setNoOfCompletedWorksEvaluatedBySA(set.getInt("no_of_completed_works_evaluated_by_SA"));
            o.setExpIncurredForCompletedWorks(set.getInt("exp_incurred_for_completed_works"));
            o.setValueOfCompletedWorksEvaluatedBySATeam(set.getInt("value_of_completed_works_evaluated_by_SA_team"));
            o.setNoOfOnGoingWorks(set.getInt("no_of_on_going_works"));
            o.setUnSkilledWagesForOnGoingWorks(set.getInt("unskilled_wages_for_on_going_works"));
            o.setSkilledWagesForOnGoingWorks(set.getInt("skilled_wages_for_on_going_works"));
            o.setMaterialExpForOnGoingWorks(set.getInt("material_exp_for_on_going_works"));
            o.setAdministrativeExpForOnGoingWorks(set.getInt("administrative_exp_for_on_going_works"));
            o.setNoOfOnGoingWorksEvaluatedBySATeam(set.getInt("no_of_on_going_works_evaluated_by_SA_team"));
            o.setExpIncurredForOnGoingWorks(set.getInt("exp_incurred_for_on_going_works"));
            o.setValueOfOnGoingWorksEvaluatedBySATeam(set.getInt("value_of_on_going_works_evaluated_by_SA_team"));
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
