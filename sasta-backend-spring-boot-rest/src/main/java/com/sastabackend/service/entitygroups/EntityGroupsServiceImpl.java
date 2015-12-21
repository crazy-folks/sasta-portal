package com.sastabackend.service.entitygroups;


import com.sastabackend.domain.EntityGroups;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.EntityGroupsRepository;
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
 * Created by SARVA on 20/Dec/2015.
 */
@Service
@Validated
public class EntityGroupsServiceImpl implements EntityGroupsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(EntityGroupsService.class);
    private final EntityGroupsRepository repository;

    @Inject
    public EntityGroupsServiceImpl(EntityGroupsRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel Add(String name, String description, Long created_by) {
        LOGGER.debug("Creating  Entity Groups : {}", name,description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(name, description, created_by);
            response.setStatus(flag);
            response.setData(flag == true ? " Entity Groups Added Successfully!!" : "Unable to add  Entity Groups!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Integer id, String name, String description, Long modified_by, Boolean is_active) {
        LOGGER.debug("Updating Entity Groups  : {}", id,name,description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id, name, description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Entity Groups  Updated Successfully!!" : "Unable to update  Entity Groups !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Entity Groups Data : {}");
        ResponseModel response = new ResponseModel<List<EntityGroups>>();
        try{
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String name,String description,Long created_by)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_entity_groups")
                .declareParameters(
                        new SqlParameter("entity_group_name", Types.VARCHAR),
                        new SqlParameter("entity_group_description", Types.VARCHAR),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("entity_group_name", name);
        inParamMap.put("entity_group_description", description);
        inParamMap.put("createdby", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer id,String name,String description,
                           Long modified_by,Boolean is_active) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_entity_groups")
                .declareParameters(
                        new SqlParameter("entity_groups_id", Types.INTEGER),
                        new SqlParameter("entity_groups_name", Types.VARCHAR),
                        new SqlParameter("entity_groups_description", Types.VARCHAR),
                        new SqlParameter("modified_by", Types.BIGINT),
                        new SqlParameter("is_active", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("entity_groups_id", id);
        inParamMap.put("entity_groups_name", name);
        inParamMap.put("entity_groups_description", description);
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


    private List<EntityGroups> readList(){
        List<EntityGroups> list = jdbcTemplate.query("call select_entity_gourps", new EntityGroupsMapper());
        return list;
    }

    protected static final class EntityGroupsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            EntityGroups o = new EntityGroups();
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
