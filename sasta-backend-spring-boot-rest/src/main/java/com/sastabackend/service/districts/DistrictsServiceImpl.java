package com.sastabackend.service.districts;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.DistrictsRepository;
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
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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
public class DistrictsServiceImpl implements  DistrictsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(DistrictsServiceImpl.class);
    private final DistrictsRepository repository;

    @Inject
    public DistrictsServiceImpl(final DistrictsRepository repository) {
        this.repository = repository;
    }


    @Override
    public ResponseModel Add(String name, Integer stateid, String description, Integer districtCode, String shortName, Long createby) {
        LOGGER.debug("Creating Blocks : {}", name,stateid,description,districtCode,shortName,createby);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(name,stateid,description,districtCode,shortName,createby);
            response.setStatus(flag);
            response.setData(flag == true ? "District Added Successfully!!" : "Unable to add District!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer districtId, String name, int stateid, String description, Integer districtCode, String shortName, Long modify_by,Boolean isactive) {
        LOGGER.debug("Updating Districts : {}", districtId,name,stateid,description,districtCode,shortName,modify_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(districtId, name, stateid, description, districtCode, shortName, modify_by, isactive);
            response.setStatus(flag);
            response.setData(flag == true ? "District Updated Successfully!!" : "Unable to update District!!");
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
            response = new ResponseModel<List<Districts>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String name, Integer stateid, String description, Integer districtCode, String shortName, Long createby) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_districts")
                .declareParameters(
                        new SqlParameter("districtName", Types.VARCHAR),
                        new SqlParameter("audit_state_id", Types.INTEGER),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("district_code", Types.INTEGER),
                        new SqlParameter("short_name", Types.VARCHAR),
                        new SqlParameter("create_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("districtName", name);
        inParamMap.put("audit_state_id", stateid);
        inParamMap.put("description", description);
        inParamMap.put("district_code", districtCode);
        inParamMap.put("short_name", shortName);
        inParamMap.put("create_by", createby);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Integer districtId,String name,int stateid,String description,Integer districtCode,String shortName,Long modify_by,Boolean isactive) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_districts")
                .declareParameters(
                        new SqlParameter("d_id", Types.INTEGER),
                        new SqlParameter("d_name", Types.VARCHAR),
                        new SqlParameter("stateid", Types.INTEGER),
                        new SqlParameter("d_text", Types.VARCHAR),
                        new SqlParameter("shortname", Types.VARCHAR),
                        new SqlParameter("dcode", Types.INTEGER),
                        new SqlParameter("modifyby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("d_id", districtId);
        inParamMap.put("d_name", name);
        inParamMap.put("stateid", stateid);
        inParamMap.put("d_text", description);
        inParamMap.put("shortname", shortName);
        inParamMap.put("dcode", districtCode);
        inParamMap.put("modifyby", modify_by);
        inParamMap.put("isactive", isactive);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private List<Districts> readList(){
        List<Districts> list = jdbcTemplate.query("call select_districts", new DistrictsMapper());
        return list;
    }

    protected static final class DistrictsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Districts o = new Districts();
            o.setDistrictID(set.getInt("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
            o.setAuditStateId(set.getInt("audit_state_id"));
            o.setStateName(StringUtils.trimToNull(set.getString("StateName")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setShortName(StringUtils.trimToNull(set.getString("short_name")));
            o.setDistrictCode(set.getInt("district_code"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setModifiedBy(set.getLong("created_by"));
            o.setCreatedBy(set.getLong("modified_by"));
            o.setCreateByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifyByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            System.out.println(o.toString());
            return o;
        }
    }

}
