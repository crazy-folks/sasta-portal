package com.sastabackend.service.rounds;

import com.sastabackend.domain.Qualifications;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Rounds;
import com.sastabackend.domain.Session;
import com.sastabackend.repository.QualificationsRepository;
import com.sastabackend.repository.RoundsRepository;
import com.sastabackend.service.qualifications.QualificationsServiceImpl;
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
import org.springframework.util.CollectionUtils;
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
 * Created by SARVA on 09/Nov/2015.
 */
@Service
@Validated
public class RoundsServiceImpl implements RoundsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(RoundsServiceImpl.class);
    private final RoundsRepository repository;

    @Inject
    public RoundsServiceImpl(final RoundsRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Rounds  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Rounds>();
            response.setData(selectRoundId(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading Rounds  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Rounds>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                       String description, Long created_by) {
        LOGGER.debug("Creating  Round : {}", name,reference_id,start_date,end_date,description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(name, reference_id, start_date,end_date,description,created_by);
            response.setStatus(flag);
            response.setData(flag == true ? " Round Added Successfully!!" : "Unable to add Round!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Long id,String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                          String description, Long modified_by,Boolean is_active) {
        LOGGER.debug("Updating Round  : {}", id,name,reference_id,start_date,end_date,description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id,name, reference_id,start_date,end_date,
                    description, modified_by,is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Round Updated Successfully!!" : "Unable to update Round!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                           String description, Long created_by)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_rounds")
                .declareParameters(
                        new SqlParameter("round_name", Types.VARCHAR),
                        new SqlParameter("referenceid", Types.INTEGER),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("round_name", name);
        inParamMap.put("referenceid", reference_id);
        inParamMap.put("startdate", start_date);
        inParamMap.put("enddate", end_date);
        inParamMap.put("description", description);
        inParamMap.put("createdby", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Long id,String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                           String description, Long modified_by,Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_rounds")
                .declareParameters(
                        new SqlParameter("roundid", Types.BIGINT),
                        new SqlParameter("round_name", Types.VARCHAR),
                        new SqlParameter("referenceid", Types.INTEGER),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("roundid", id);
        inParamMap.put("round_name", name);
        inParamMap.put("referenceid", reference_id);
        inParamMap.put("startdate", start_date);
        inParamMap.put("enddate", end_date);
        inParamMap.put("description", description);
        inParamMap.put("modifyby", modified_by);
        inParamMap.put("is_active", is_active);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }
    private List<Rounds> readList(){
        List<Rounds> list = jdbcTemplate.query("call select_rounds", new RoundsMapper());
        return list;
    }

    private Rounds selectRoundId(Long id){
        List<Rounds> o = new ArrayList<Rounds>();
        o = jdbcTemplate.query("call select_roundby_id(?)", new Object[]{id}, new RoundsMapper());
        LOGGER.debug("Reading  Rounds : {}",o.toString());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }


    protected static final class RoundsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Rounds o = new Rounds();
            o.setId(set.getLong("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
            o.setReferenceId(set.getInt("reference_id"));
            o.setFinancialYear(StringUtils.trimToNull(set.getString("financial_year")));
            o.setStartDate(set.getDate("start_date"));
            o.setEndDate(set.getDate("end_date"));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            System.out.println(o.toString());
            return o;
        }
    }

}
