package com.sastabackend.service.departments;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.BloodGroups;
import com.sastabackend.domain.Departments;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.BloodGroupsRepository;
import com.sastabackend.repository.DepartmentsRepository;
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
public class DepartmentsServiceImpl implements DepartmentsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentsServiceImpl.class);
    private final DepartmentsRepository repository;

    @Inject
    public DepartmentsServiceImpl(DepartmentsRepository repository){
        this.repository = repository;
    }


    @Override
    public ResponseModel Add(String department_name, String department_description, Long created_by) {
        LOGGER.debug("Creating Departments : {}", department_name,department_description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(department_name, department_description, created_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Departments Added Successfully!!" : "Unable to add Departments!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer id, String department_name, String department_description,
                                Long modified_by, Boolean is_active) {
        LOGGER.debug("Updating Departments  : {}", id,department_name,department_description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id, department_name, department_description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Departments  Updated Successfully!!" : "Unable to update Departments !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Departments Data : {}");
        ResponseModel response = new ResponseModel<List<Departments>>();
        try{
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String department_name, String department_description, Long created_by) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_blood_group")
                .declareParameters(
                        new SqlParameter("department_name", Types.VARCHAR),
                        new SqlParameter("department_description", Types.VARCHAR),
                        new SqlParameter("created_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("department_name", department_name);
        inParamMap.put("department_description", department_description);
        inParamMap.put("created_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer id, String department_name, String department_description, Long modified_by,
                           Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_blood_group")
                .declareParameters(
                        new SqlParameter("department_id", Types.INTEGER),
                        new SqlParameter("department_name", Types.VARCHAR),
                        new SqlParameter("department_description", Types.VARCHAR),
                        new SqlParameter("modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("department_id", id);
        inParamMap.put("department_name", department_name);
        inParamMap.put("department_description", department_description);
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


    private List<Departments> readList(){
        List<Departments> list = jdbcTemplate.query("call select_blood_group", new DepartmentsMapper());
        return list;
    }

    protected static final class DepartmentsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Departments o = new Departments();
            o.setId(set.getInt("id"));
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
