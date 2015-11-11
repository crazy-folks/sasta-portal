package com.sastabackend.service.bloodgroups;

import com.sastabackend.domain.Bank;
import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.BloodGroups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.BloodGroupsRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 08/Nov/2015.
 */
@Service
@Validated
public class BloodGroupServiceImpl implements BloodGroupService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(BloodGroupServiceImpl.class);
    private final BloodGroupsRepository repository;

    @Inject
    public BloodGroupServiceImpl(BloodGroupsRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel Add(String blood_group_name,String blood_group_description,Long created_by) {
        LOGGER.debug("Creating Blood Group : {}", blood_group_name,blood_group_description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(blood_group_name, blood_group_description, created_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Blood Group Added Successfully!!" : "Unable to add Blood Group!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer blood_group_id,String blood_group_name,String blood_group_description,
                                Long modified_by,Boolean is_active){
        LOGGER.debug("Updating Blood Group  : {}", blood_group_id,blood_group_name,blood_group_description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(blood_group_id, blood_group_name, blood_group_description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Blood Group  Updated Successfully!!" : "Unable to update Blood Group !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Blood Group Data : {}");
        ResponseModel response = new ResponseModel<List<BloodGroups>>();
        try{
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String blood_group_name,String blood_group_description,Long created_by){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_blood_group")
                .declareParameters(
                        new SqlParameter("blood_group_name", Types.VARCHAR),
                        new SqlParameter("blood_group_description", Types.VARCHAR),
                        new SqlParameter("created_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("blood_group_name", blood_group_name);
        inParamMap.put("blood_group_description", blood_group_description);
        inParamMap.put("created_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer blood_group_id,String blood_group_name,String blood_group_description,
                           Long modified_by,Boolean is_active){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_blood_group")
                .declareParameters(
                        new SqlParameter("blood_group_id", Types.INTEGER),
                        new SqlParameter("blood_group_name", Types.VARCHAR),
                        new SqlParameter("blood_group_description", Types.VARCHAR),
                        new SqlParameter("modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("blood_group_id", blood_group_id);
        inParamMap.put("blood_group_name", blood_group_name);
        inParamMap.put("blood_group_description", blood_group_description);
        inParamMap.put("modified_by", modified_by);
        inParamMap.put("is_active", is_active);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private List<Blocks> readList(){
        List<Blocks> list = jdbcTemplate.query("call select_blood_group", new BloodGroupMapper());
        return list;
    }

    protected static final class BloodGroupMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            BloodGroups o = new BloodGroups();
            o.setBloodGroupId(set.getInt("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
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

