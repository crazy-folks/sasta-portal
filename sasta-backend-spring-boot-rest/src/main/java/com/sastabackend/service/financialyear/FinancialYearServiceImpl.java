package com.sastabackend.service.financialyear;

import com.sastabackend.domain.*;
import com.sastabackend.repository.FinancialYearRepository;
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
public class FinancialYearServiceImpl implements FinancialYearService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(FinancialYearServiceImpl.class);
    private final FinancialYearRepository repository;

    @Inject
    public FinancialYearServiceImpl(FinancialYearRepository repository){
        this.repository = repository;
    }


    @Override
    public ResponseModel Add(String financial_year_name,String financial_year_description,Long created_by) {
        LOGGER.debug("Creating  Financial Year : {}", financial_year_name,financial_year_description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(financial_year_name, financial_year_description, created_by);
            response.setStatus(flag);
            response.setData(flag == true ? " Financial Year Added Successfully!!" : "Unable to add  Financial Year!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer id,String financial_year_name,String financial_year_description,
                                Long modified_by,Boolean is_active) {
        LOGGER.debug("Updating Financial Year  : {}", id,financial_year_name,financial_year_description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id, financial_year_name, financial_year_description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Financial Year  Updated Successfully!!" : "Unable to update  Financial Year !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading FinancialYear Data : {}");
        ResponseModel response = new ResponseModel<List<FinancialYear>>();
        try{
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String financial_year_name,String financial_year_description,Long created_by)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_financial_year")
                .declareParameters(
                        new SqlParameter("financial_year_name", Types.VARCHAR),
                        new SqlParameter("financial_year_description", Types.VARCHAR),
                        new SqlParameter("created_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("financial_year_name", financial_year_name);
        inParamMap.put("financial_year_description", financial_year_description);
        inParamMap.put("created_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer id,String financial_year_name,String financial_year_description,
                         Long modified_by,Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_financial_year")
                .declareParameters(
                        new SqlParameter("community_id", Types.INTEGER),
                        new SqlParameter("financial_year_name", Types.VARCHAR),
                        new SqlParameter("department_description", Types.VARCHAR),
                        new SqlParameter("modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("community_id", id);
        inParamMap.put("financial_year_name", financial_year_name);
        inParamMap.put("financial_year_description", financial_year_description);
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


    private List<FinancialYear> readList(){
        List<FinancialYear> list = jdbcTemplate.query("call select_financial_year", new FinancialYearMapper());
        return list;
    }

    protected static final class FinancialYearMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            FinancialYear o = new FinancialYear();
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
