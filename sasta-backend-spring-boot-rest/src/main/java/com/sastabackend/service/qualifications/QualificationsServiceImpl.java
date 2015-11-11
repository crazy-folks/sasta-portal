package com.sastabackend.service.qualifications;

import com.sastabackend.domain.*;
import com.sastabackend.repository.QualificationsRepository;
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
public class QualificationsServiceImpl implements QualificationsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(QualificationsServiceImpl.class);
    private final QualificationsRepository repository;

    @Inject
    public QualificationsServiceImpl(QualificationsRepository repository){
        this.repository = repository;
    }


    @Override
    public ResponseModel Add(String qualification_name, String qualification_description, Long created_by) {
        LOGGER.debug("Creating  Qualifications : {}", qualification_name,qualification_description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(qualification_name, qualification_description, created_by);
            response.setStatus(flag);
            response.setData(flag == true ? " Qualifications Added Successfully!!" : "Unable to add Qualifications!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer id, String qualification_name, String qualification_description,
                         Long modified_by, Boolean is_active) {
        LOGGER.debug("Updating Qualifications  : {}", id,qualification_name,qualification_description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id, qualification_name, qualification_description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Qualifications Updated Successfully!!" : "Unable to update Qualifications!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Qualifications  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Qualifications>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String qualification_name, String qualification_description, Long created_by)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_qualification")
                .declareParameters(
                        new SqlParameter("qualification_name", Types.VARCHAR),
                        new SqlParameter("qualification_description", Types.VARCHAR),
                        new SqlParameter("created_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("qualification_name", qualification_name);
        inParamMap.put("qualification_description", qualification_description);
        inParamMap.put("created_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer id, String qualification_name, String qualification_description,
                         Long modified_by, Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_qualification")
                .declareParameters(
                        new SqlParameter("qualification_id", Types.INTEGER),
                        new SqlParameter("qualification_name", Types.VARCHAR),
                        new SqlParameter("qualification_description", Types.VARCHAR),
                        new SqlParameter("modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("qualification_id", id);
        inParamMap.put("qualification_name", qualification_name);
        inParamMap.put("qualification_description", qualification_description);
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


    private List<Qualifications> readList(){
        List<Qualifications> list = jdbcTemplate.query("call select_qualification", new QualificationsMapper());
        return list;
    }

    protected static final class QualificationsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Qualifications o = new Qualifications();
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
