package com.sastabackend.service.common;

import com.sastabackend.domain.Audit;
import com.sastabackend.domain.ConfigSystem;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.AuditRepository;
import com.sastabackend.repository.CommonConfigRepository;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by SARVA on 13/Nov/2015.
 */
@Service
@Validated
public class CommonServiceImpl implements CommonService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(CommonServiceImpl.class);
    private final CommonConfigRepository repository;

    @Inject
    public CommonServiceImpl(final CommonConfigRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel Select() {
        ResponseModel response = null;
        String query ="select name, value, label, allow_edit, created_date, modified_date, created_by, modified_by from config_system";
        try {
            response = new ResponseModel<List<ConfigSystem>>();
            List<ConfigSystem> list = jdbcTemplate.query(query, new ConfigSystemMapper());
            response.setStatus(true);
            response.setData(list);
        }catch(Exception err){
            response = new ResponseModel<String>();;
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(ConfigSystem config) {
        ResponseModel response = new ResponseModel<String>();;
        String query ="insert into config_system (name, value, label, allow_edit, created_date, created_by)values(?,?,?,?,?,?)";
        try {
            jdbcTemplate.update(query, config.getName(), config.getValue(), config.getLabel(), true, new java.util.Date(), config.getCreateBy());
            response.setStatus(true);
            response.setData("Config data added successfully!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(ConfigSystem config) {
        ResponseModel response = new ResponseModel<String>();
        String query ="update config_system set value = ?, label = ?, allow_edit = ?, modified_date = ?, modified_by = ? where name = ?";
        try {
            jdbcTemplate.update(query, config.getValue(), config.getLabel(), true, new java.util.Date(), config.getModifyBy(),config.getName());
            response.setStatus(true);
            response.setData("Config data updated successfully!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    public String getValueByName(List<ConfigSystem> list,String Name){
        for(ConfigSystem obj : list){
            if(obj.getValue().equals(Name)){
                return obj.getValue();
            }
        }
        return "";
    }
    protected static final class ConfigSystemMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            ConfigSystem o = new ConfigSystem();
            o.setName(set.getString("name"));
            o.setValue(set.getString("value"));
            o.setLabel(set.getString("label"));
            o.setAllowEdit(set.getBoolean("allow_edit"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreateBy(set.getLong("created_by"));
            o.setModifyBy(set.getLong("modified_by"));
            LOGGER.debug("Config System  : {}", o.toString());
            return o;
        }
    }
}
