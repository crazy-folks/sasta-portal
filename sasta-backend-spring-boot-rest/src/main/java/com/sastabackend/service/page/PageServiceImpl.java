package com.sastabackend.service.page;

import com.sastabackend.domain.PageConfig;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.PageConfigRepository;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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
public class PageServiceImpl implements com.sastabackend.service.page.PageService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(PageServiceImpl.class);
    private final PageConfigRepository repository;

    @Inject
    public PageServiceImpl(final PageConfigRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel Select() {
        ResponseModel response = null;
        String query ="select \n" +
                "\tcf.name,\n" +
                "    cf.value,\n" +
                "    cf.label,\n" +
                "    cf.allow_edit,\n" +
                "    cf.created_date,\n" +
                "    cf.modified_date,\n" +
                "    cf.created_by,\n" +
                "    cf.modified_by,\n" +
                "\t(select concat(concat(U.first_name,' '),U.last_name) from users U where U.id = cf.created_by) as 'created_by_name',\n" +
                "\t(select concat(concat(U.first_name,' '),U.last_name) from users U where U.id = cf.modified_by)as 'modifed_by_name'\n" +
                "    \n" +
                "from \n" +
                "\tpage_config cf \n" +
                "where cf.allow_edit = 1";
        try {
            response = new ResponseModel<List<PageConfig>>();
            List<PageConfig> list = jdbcTemplate.query(query, new PageConfigMapper());
            response.setStatus(true);
            response.setData(list);
        }catch(Exception err){
            response = new ResponseModel<String>();;
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(PageConfig config) {
        ResponseModel response = new ResponseModel<String>();;
        String query ="insert into page_config (name, value, label, allow_edit, created_date, created_by)values(?,?,?,?,?,?)";
        try {
            jdbcTemplate.update(query, config.getName(), config.getValue(), config.getLabel(), true, new java.util.Date(), config.getCreateBy());
            response.setStatus(true);
            response.setData("page config data added successfully!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(PageConfig config) {
        ResponseModel response = new ResponseModel<String>();
        String query ="update page_config set value = ?, label = ?, allow_edit = ?, modified_date = ?, modified_by = ? where name = ?";
        try {
            jdbcTemplate.update(query, config.getValue(), config.getLabel(), config.getAllowEdit(), new java.util.Date(), config.getModifyBy(),config.getName());
            response.setStatus(true);
            response.setData("page config data updated successfully!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    public String getValueByName(List<PageConfig> list,String Name){
        for(PageConfig obj : list){
            if(obj.getValue().equals(Name)){
                return obj.getValue();
            }
        }
        return "";
    }
    protected static final class PageConfigMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            PageConfig o = new PageConfig();
            o.setName(set.getString("name"));
            o.setValue(set.getString("value"));
            o.setLabel(set.getString("label"));
            o.setAllowEdit(set.getBoolean("allow_edit"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreateBy(set.getLong("created_by"));
            o.setModifyBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            //LOGGER.debug("Page Config  : {}", o.toString());
            return o;
        }
    }
}
