package com.sastabackend.service.state;

import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.repository.StateRepository;
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
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@Service
@Transactional
public class StatesServiceImpl implements StatesService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(StatesServiceImpl.class);
    private final StateRepository repository;

    @Inject
    public StatesServiceImpl(final StateRepository repository) {
        this.repository = repository;
    }

    @Override
    public ResponseModel Add(String name, String description, Integer country_id, Integer state_code,
                             String short_name, Long created_by) {
        LOGGER.debug("Creating Blocks : {}", name,description,country_id,state_code,short_name,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(name,description,country_id,state_code,short_name,created_by);
            response.setStatus(flag);
            response.setData(flag == true ? "State Added Successfully!!" : "Unable to add State!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer state_id, String state_name, String state_description,
                                Integer state_country_id, Integer statecode, String state_short_name,
                                Long state_modified_by, Boolean is_active) {
        LOGGER.debug("Updating Districts : {}", state_id,state_name,state_description,state_country_id,statecode,
                state_short_name,state_modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(state_id, state_name, state_description, state_country_id, statecode,
                    state_short_name, state_modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "State Updated Successfully!!" : "Unable to update State!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Block data : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<States>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String name, String description, Integer country_id, Integer state_code, String short_name, Long created_by) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_state")
                .declareParameters(
                        new SqlParameter("name", Types.VARCHAR),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("country_id", Types.INTEGER),
                        new SqlParameter("state_code", Types.INTEGER),
                        new SqlParameter("short_name", Types.VARCHAR),
                        new SqlParameter("created_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("name", name);
        inParamMap.put("description", description);
        inParamMap.put("country_id", country_id);
        inParamMap.put("state_code", state_code);
        inParamMap.put("short_name", short_name);
        inParamMap.put("created_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer state_id, String state_name, String state_description, Integer state_country_id, Integer statecode,
                           String state_short_name, Long state_modified_by, Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_state")
                .declareParameters(
                        new SqlParameter("state_id", Types.INTEGER),
                        new SqlParameter("state_name", Types.VARCHAR),
                        new SqlParameter("state_description", Types.VARCHAR),
                        new SqlParameter("state_country_id", Types.INTEGER),
                        new SqlParameter("statecode", Types.INTEGER),
                        new SqlParameter("state_short_name", Types.VARCHAR),
                        new SqlParameter("state_modified_by", Types.BIGINT),
                        new SqlParameter("state_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("state_id", state_id);
        inParamMap.put("state_name", state_name);
        inParamMap.put("state_description", state_description);
        inParamMap.put("state_country_id", state_country_id);
        inParamMap.put("statecode", statecode);
        inParamMap.put("state_short_name", state_short_name);
        inParamMap.put("state_modified_by", state_modified_by);
        inParamMap.put("state_active", is_active);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private List<States> readList(){
        List<States> list = jdbcTemplate.query("call select_states", new StatesMapper());
        return list;
    }

    protected static final class StatesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            States o = new States();
            o.setStateId(set.getInt("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setCountryId(set.getInt("country_id"));
            o.setCoutryName(StringUtils.trimToNull(set.getString("country_name")));
            o.setStateCode(set.getInt("state_code"));
            o.setShortName(StringUtils.trimToNull(set.getString("short_name")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setModifiedBy(set.getLong("created_by"));
            o.setCreatedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("Status"));
            System.out.println(o.toString());
            return o;
        }
    }


}
