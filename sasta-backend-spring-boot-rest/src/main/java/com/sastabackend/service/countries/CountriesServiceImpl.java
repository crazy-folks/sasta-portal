package com.sastabackend.service.countries;

import com.sastabackend.domain.Countries;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.States;
import com.sastabackend.repository.CountriesRepository;
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
public class CountriesServiceImpl implements  CountriesService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(CountriesServiceImpl.class);
    private final CountriesRepository repository;

    @Inject
    public CountriesServiceImpl(CountriesRepository repository){
        this.repository = repository;
    }
    @Override
    public ResponseModel Add(String country_name, String country_description, String country_code,
                             String country_short_name, Long country_create_by) {
        LOGGER.debug("Creating Country : {}", country_name,country_description,country_code,country_short_name,
                country_create_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(country_name, country_description, country_code,
                    country_short_name, country_create_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Country Added Successfully!!" : "Unable to add Country!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer country_id,String country_name,String country_description,String country_code,
                                String country_short_name,Long country_modified_by,Boolean is_active) {

        LOGGER.debug("Updating Country : {}", country_id,country_name,country_description,country_code,
                country_short_name,country_modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(country_id,country_name,country_description,country_code,
                    country_short_name,country_modified_by,is_active);;
            response.setStatus(flag);
            response.setData(flag == true ? "Country Updated Successfully!!" : "Unable to update Country!!");
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
            response = new ResponseModel<List<Countries>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean Create(String country_name, String country_description, String country_code,
                            String country_short_name, Long country_create_by) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_country")
                .declareParameters(
                        new SqlParameter("country_name", Types.VARCHAR),
                        new SqlParameter("country_description", Types.VARCHAR),
                        new SqlParameter("country_code", Types.VARCHAR),
                        new SqlParameter("country_short_name", Types.VARCHAR),
                        new SqlParameter("country_create_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("country_name", country_name);
        inParamMap.put("country_description", country_description);
        inParamMap.put("country_code", country_code);
        inParamMap.put("country_short_name", country_short_name);
        inParamMap.put("country_create_by", country_create_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Integer country_id,String country_name,String country_description,String country_code,
                           String country_short_name,Long country_modified_by,Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_country")
                .declareParameters(
                        new SqlParameter("country_id", Types.INTEGER),
                        new SqlParameter("country_name", Types.VARCHAR),
                        new SqlParameter("country_description", Types.VARCHAR),
                        new SqlParameter("country_code", Types.VARCHAR),
                        new SqlParameter("country_short_name", Types.VARCHAR),
                        new SqlParameter("country_modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("country_id", country_id);
        inParamMap.put("country_name", country_name);
        inParamMap.put("country_description", country_description);
        inParamMap.put("country_code", country_code);
        inParamMap.put("country_short_name", country_short_name);
        inParamMap.put("country_modified_by", country_modified_by);
        inParamMap.put("is_active", is_active);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private List<States> readList(){
        List<States> list = jdbcTemplate.query("call select_countries", new CountriesMapper());
        return list;
    }

    protected static final class CountriesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Countries o = new Countries();
            o.setCountryId(set.getInt("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setCountryCode(StringUtils.trimToNull(set.getString("country_code")));
            o.setShortName(StringUtils.trimToNull(set.getString("short_name")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setModifiedBy(set.getLong("created_by"));
            o.setCreatedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            System.out.println(o.toString());
            return o;
        }
    }

}
