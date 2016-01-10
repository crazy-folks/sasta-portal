package com.sastabackend.service.specialgramasabha;

import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SpecialGramaSabha;
import com.sastabackend.repository.SpecialGramaSabhaRepository;
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
 * Created by SARVA on 12/Nov/2015.
 */
@Service
@Validated
public class SpecialGramaSabhaServiceImpl implements SpecialGramaSabhaService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(SpecialGramaSabhaServiceImpl.class);
    private final SpecialGramaSabhaRepository repository;

    @Inject
    public SpecialGramaSabhaServiceImpl(final SpecialGramaSabhaRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Special Grama Sabha  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<SpecialGramaSabha>();
            response.setData(selectSpecialGramaSabhaData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading Special Grama Sabha  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<SpecialGramaSabha>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    @Override
    public ResponseModel Add(SpecialGramaSabha sga) {
        LOGGER.debug("Creating  Special Grama Sabha : {}",sga.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(sga);
            response.setStatus(flag);
            response.setData(flag == true ? " Special Grama Sabha Added Successfully!!" : "Unable to add Special Grama Sabha!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(SpecialGramaSabha sga) {
        LOGGER.debug("Creating  Special Grama Sabha : {0}", sga.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(sga);
            response.setStatus(flag);
            response.setData(flag == true ? "Special Grama Sabha Updated Successfully!!" : "Unable to update Special Grama Sabha!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(SpecialGramaSabha sga)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_special_grama_sabha")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("totalpopulation", Types.INTEGER),
                        new SqlParameter("totalfamiliesinvpts", Types.INTEGER),
                        new SqlParameter("nooffamiliesregistered", Types.INTEGER),
                        new SqlParameter("totaljcsinvpts", Types.INTEGER),
                        new SqlParameter("noofpplattentedsgs", Types.INTEGER),
                        new SqlParameter("nameofpersonheadsgs", Types.INTEGER),
                        new SqlParameter("nameofpersonrecordedminutes", Types.INTEGER),
                        new SqlParameter("totalparasplacedinsgs", Types.INTEGER),
                        new SqlParameter("parassetteled", Types.INTEGER),
                        new SqlParameter("amountrecoveredduringsgs", Types.INTEGER),
                        new SqlParameter("sareportsuploaded", Types.BIT),
                        new SqlParameter("atrsuploaded", Types.BIT),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", sga.getAuditId());
        inParamMap.put("totalpopulation", sga.getTotalPopulation());
        inParamMap.put("totalfamiliesinvpts", sga.getTotalFamiliesInVpts());
        inParamMap.put("nooffamiliesregistered", sga.getNoOfFamiliesRegistered());
        inParamMap.put("totaljcsinvpts", sga.getTotalJcsInVpts());
        inParamMap.put("noofpplattentedsgs", sga.getNoOfPplAttentedSgs());
        inParamMap.put("nameofpersonheadsgs", sga.getNameOfPersonHeadSgs());
        inParamMap.put("nameofpersonrecordedminutes", sga.getNameOfPersonRecordedMinutes());
        inParamMap.put("totalparasplacedinsgs", sga.getTotalParasPlacedInSgs());
        inParamMap.put("parassetteled", sga.getParasSetteled());
        inParamMap.put("amountrecoveredduringsgs", sga.getAmountRecoveredDuringSgs());
        inParamMap.put("sareportsuploaded", sga.getSaReportsUploaded());
        inParamMap.put("atrsuploaded", sga.getAtrsUploaded());
        inParamMap.put("createdby", sga.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(SpecialGramaSabha sga)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_special_grama_sabha")
                .declareParameters(
                        new SqlParameter("sp_grama_sabha_id", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("totalpopulation", Types.INTEGER),
                        new SqlParameter("totalfamiliesinvpts", Types.INTEGER),
                        new SqlParameter("nooffamiliesregistered", Types.INTEGER),
                        new SqlParameter("totaljcsinvpts", Types.INTEGER),
                        new SqlParameter("noofpplattentedsgs", Types.INTEGER),
                        new SqlParameter("nameofpersonheadsgs", Types.INTEGER),
                        new SqlParameter("nameofpersonrecordedminutes", Types.INTEGER),
                        new SqlParameter("totalparasplacedinsgs", Types.INTEGER),
                        new SqlParameter("parassetteled", Types.INTEGER),
                        new SqlParameter("amountrecoveredduringsgs", Types.INTEGER),
                        new SqlParameter("sareportsuploaded", Types.BIT),
                        new SqlParameter("atrsuploaded", Types.BIT),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("sp_grama_sabha_id", sga.getId());
        inParamMap.put("auditid", sga.getAuditId());
        inParamMap.put("totalpopulation", sga.getTotalPopulation());
        inParamMap.put("totalfamiliesinvpts", sga.getTotalFamiliesInVpts());
        inParamMap.put("nooffamiliesregistered", sga.getNoOfFamiliesRegistered());
        inParamMap.put("totaljcsinvpts", sga.getTotalJcsInVpts());
        inParamMap.put("noofpplattentedsgs", sga.getNoOfPplAttentedSgs());
        inParamMap.put("nameofpersonheadsgs", sga.getNameOfPersonHeadSgs());
        inParamMap.put("nameofpersonrecordedminutes", sga.getNameOfPersonRecordedMinutes());
        inParamMap.put("totalparasplacedinsgs", sga.getTotalParasPlacedInSgs());
        inParamMap.put("parassetteled", sga.getParasSetteled());
        inParamMap.put("amountrecoveredduringsgs", sga.getAmountRecoveredDuringSgs());
        inParamMap.put("sareportsuploaded", sga.getSaReportsUploaded());
        inParamMap.put("atrsuploaded", sga.getAtrsUploaded());
        inParamMap.put("modifyby", sga.getModifiedBy());
        inParamMap.put("isactive", sga.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }
    private List<SpecialGramaSabha> readList(){
        List<SpecialGramaSabha> list = jdbcTemplate.query("call select_special_grama_sabha", new SpecialGramaSabhaMapper());
        return list;
    }

    private SpecialGramaSabha selectSpecialGramaSabhaData(Long id){
        List<SpecialGramaSabha> o = new ArrayList<SpecialGramaSabha>();
        o = jdbcTemplate.query("call select_special_grama_sabha_by_id(?)", new Object[]{id}, new SpecialGramaSabhaMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }


    protected static final class SpecialGramaSabhaMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            SpecialGramaSabha o = new SpecialGramaSabha();
            o.setId(set.getLong("id"));
            o.setAuditId(set.getLong("audit_id"));
            o.setFinancialYear(set.getString("financial_year"));
            o.setFinancialDescription(set.getString("financial_description"));
            o.setRoundId(set.getLong("round_id"));
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
            o.setTotalPopulation(set.getInt("total_population"));
            o.setTotalFamiliesInVpts(set.getInt("total_families_in_vpts"));
            o.setNoOfFamiliesRegistered(set.getInt("no_of_families_registered"));
            o.setTotalJcsInVpts(set.getInt("total_jcs_in_vpts"));
            o.setNoOfPplAttentedSgs(set.getInt("no_of_ppl_attented_sgs"));
            o.setNameOfPersonHeadSgs(set.getInt("name_of_person_head_sgs"));
            o.setNameOfPersonRecordedMinutes(set.getInt("name_of_person_recorded_minutes"));
            o.setTotalParasPlacedInSgs(set.getInt("total_paras_placed_in_sgs"));
            o.setParasSetteled(set.getInt("paras_setteled"));
            o.setAmountRecoveredDuringSgs(set.getInt("amount_recovered_during_sgs"));
            o.setSaReportsUploaded(set.getBoolean("sa_reports_uploaded"));
            o.setAtrsUploaded(set.getBoolean("atrs_uploaded"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Special Grama Sabha  : {}", o.toString());
            return o;
        }
    }

}
