package com.sastabackend.service.expenditure;

import com.sastabackend.domain.Audit;
import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Rounds;
import com.sastabackend.repository.AuditRepository;
import com.sastabackend.repository.ExpenditureRepository;
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
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 10/Nov/2015.
 */
@Service
@Validated
public class ExpenditureServiceImpl implements ExpenditureService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(ExpenditureServiceImpl.class);
    private final ExpenditureRepository repository;

    @Inject
    public ExpenditureServiceImpl(final ExpenditureRepository repository ){
        this.repository = repository;
    }



    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Expenditure  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Expenditure>();
            response.setData(selectAuditData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading Expenditure  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Expenditure>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Long auditid, Integer visitedvillagecount, Integer appreceivedcount,
                             Integer attendedappcount, BigDecimal refreshmentcharges, Integer selectedvrpcount,
                             BigDecimal paidedamount, BigDecimal photographycharges, BigDecimal videoscharges,
                             BigDecimal ppleaf_lets, BigDecimal stationaries, BigDecimal othersvalue,
                             Long createdby) {
        LOGGER.debug("Creating  Expenditure : {}", auditid,visitedvillagecount,appreceivedcount,attendedappcount,
                refreshmentcharges,selectedvrpcount,paidedamount,photographycharges,videoscharges,
                ppleaf_lets,stationaries,othersvalue,createdby);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(auditid, visitedvillagecount, appreceivedcount,
                    attendedappcount, refreshmentcharges, selectedvrpcount,
                    paidedamount, photographycharges, videoscharges,
                    ppleaf_lets, stationaries, othersvalue,
                    createdby);
            response.setStatus(flag);
            response.setData(flag == true ? " Expenditure Added Successfully!!" : "Unable to add Expenditure!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Long expenditureid, Long auditid, Integer visitedvillagecount, Integer appreceivedcount,
                                Integer attendedappcount, BigDecimal refreshmentcharges, Integer selectedvrpcount,
                                BigDecimal paidedamount, BigDecimal photographycharges, BigDecimal videoscharges,
                                BigDecimal ppleaf_lets, BigDecimal stationaries, BigDecimal othersvalue, Long modifyby,
                                Boolean isactive) {
        LOGGER.debug("Creating  Expenditure : {}", auditid,visitedvillagecount,appreceivedcount,attendedappcount,
                refreshmentcharges,selectedvrpcount,paidedamount,photographycharges,videoscharges,
                ppleaf_lets,stationaries,othersvalue,modifyby,isactive);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(expenditureid, auditid, visitedvillagecount, appreceivedcount,
                    attendedappcount, refreshmentcharges, selectedvrpcount,
                    paidedamount, photographycharges, videoscharges,
                    ppleaf_lets, stationaries, othersvalue, modifyby,
                    isactive);
            response.setStatus(flag);
            response.setData(flag == true ? "Expenditure Updated Successfully!!" : "Unable to update Expenditure!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }




    private boolean Create(Long auditid, Integer visitedvillagecount, Integer appreceivedcount, Integer attendedappcount,
                           java.math.BigDecimal refreshmentcharges, Integer selectedvrpcount,
                           java.math.BigDecimal paidedamount, java.math.BigDecimal photographycharges,
                           java.math.BigDecimal videoscharges, java.math.BigDecimal ppleaf_lets,
                           java.math.BigDecimal stationaries, java.math.BigDecimal othersvalue,Long createdby) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_audit_expenditure")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("visitedvillagecount", Types.INTEGER),
                        new SqlParameter("appreceivedcount", Types.INTEGER),
                        new SqlParameter("attendedappcount", Types.INTEGER),
                        new SqlParameter("refreshmentcharges", Types.DECIMAL),
                        new SqlParameter("selectedvrpcount", Types.INTEGER),
                        new SqlParameter("paidedamount", Types.DECIMAL),
                        new SqlParameter("photographycharges", Types.DECIMAL),
                        new SqlParameter("videoscharges", Types.DECIMAL),
                        new SqlParameter("ppleaf_lets", Types.DECIMAL),
                        new SqlParameter("stationaries", Types.DECIMAL),
                        new SqlParameter("othersvalue", Types.DECIMAL),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", auditid);
        inParamMap.put("visitedvillagecount", visitedvillagecount);
        inParamMap.put("appreceivedcount", appreceivedcount);
        inParamMap.put("attendedappcount", appreceivedcount);
        inParamMap.put("refreshmentcharges", refreshmentcharges);
        inParamMap.put("selectedvrpcount", selectedvrpcount);
        inParamMap.put("paidedamount", paidedamount);
        inParamMap.put("photographycharges", photographycharges);
        inParamMap.put("videoscharges", photographycharges);
        inParamMap.put("ppleaf_lets", ppleaf_lets);
        inParamMap.put("stationaries", stationaries);
        inParamMap.put("othersvalue", othersvalue);
        inParamMap.put("createdby", createdby);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Long expenditureid, Long auditid, Integer visitedvillagecount, Integer appreceivedcount,
                           Integer attendedappcount, BigDecimal refreshmentcharges, Integer selectedvrpcount,
                           BigDecimal paidedamount, BigDecimal photographycharges, BigDecimal videoscharges,
                           BigDecimal ppleaf_lets, BigDecimal stationaries, BigDecimal othersvalue, Long modifyby,
                           Boolean isactive)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_audit_expenditure")
                .declareParameters(
                        new SqlParameter("expenditureid", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("visitedvillagecount", Types.INTEGER),
                        new SqlParameter("appreceivedcount", Types.INTEGER),
                        new SqlParameter("attendedappcount", Types.INTEGER),
                        new SqlParameter("refreshmentcharges", Types.DECIMAL),
                        new SqlParameter("selectedvrpcount", Types.INTEGER),
                        new SqlParameter("paidedamount", Types.DECIMAL),
                        new SqlParameter("photographycharges", Types.DECIMAL),
                        new SqlParameter("videoscharges", Types.DECIMAL),
                        new SqlParameter("ppleaf_lets", Types.DECIMAL),
                        new SqlParameter("stationaries", Types.DECIMAL),
                        new SqlParameter("othersvalue", Types.DECIMAL),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("expenditureid", expenditureid);
        inParamMap.put("auditid", auditid);
        inParamMap.put("visitedvillagecount", visitedvillagecount);
        inParamMap.put("appreceivedcount", appreceivedcount);
        inParamMap.put("attendedappcount", appreceivedcount);
        inParamMap.put("refreshmentcharges", refreshmentcharges);
        inParamMap.put("selectedvrpcount", selectedvrpcount);
        inParamMap.put("paidedamount", paidedamount);
        inParamMap.put("photographycharges", photographycharges);
        inParamMap.put("videoscharges", photographycharges);
        inParamMap.put("ppleaf_lets", ppleaf_lets);
        inParamMap.put("stationaries", stationaries);
        inParamMap.put("othersvalue", othersvalue);
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
        List<Expenditure> list = jdbcTemplate.query("call select_audit_expenditure", new ExpenditureMapper());
        return list;
    }

    private Expenditure selectAuditData(Long id){
        List<Expenditure> o = new ArrayList<Expenditure>();
        o = jdbcTemplate.query("call select_audit_expenditure_by_id(?)", new Object[]{id}, new ExpenditureMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }


    protected static final class ExpenditureMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Expenditure o = new Expenditure();
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
            o.setVisitedVillageCount(set.getInt("visited_village_count"));
            o.setAppReceivedCount(set.getInt("app_received_count"));
            o.setAttendedAppCount(set.getInt("attended_app_count"));
            o.setRefreshmentCharges(set.getBigDecimal("refreshment_charges"));
            o.setSelectedVrpCount(set.getInt("selected_vrp_count"));
            o.setPaidedAmount(set.getBigDecimal("paided_amount"));
            o.setPhotographyCharges(set.getBigDecimal("photography_charges"));
            o.setVideosCharges(set.getBigDecimal("videos_charges"));
            o.setPpleafLets(set.getBigDecimal("ppleaflets"));
            o.setStationary(set.getBigDecimal("stationary"));
            o.setOthers(set.getBigDecimal("others"));
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
