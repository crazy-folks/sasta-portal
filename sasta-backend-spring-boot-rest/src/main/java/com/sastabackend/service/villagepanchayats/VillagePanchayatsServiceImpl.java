package com.sastabackend.service.villagepanchayats;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.VillagePanchayats;
import com.sastabackend.repository.VillagePanchayatsRepository;
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
 * Created by SARVA on 18/Nov/2015.
 */
@Service
@Validated
public class VillagePanchayatsServiceImpl implements VillagePanchayatsService {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(VillagePanchayatsServiceImpl.class);
    private final VillagePanchayatsRepository repository;

    @Inject
    public VillagePanchayatsServiceImpl(VillagePanchayatsRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel Add(VillagePanchayats panchayats) {
        LOGGER.debug("Creating Village Panchayats : {}", panchayats.toString());
        return Add(panchayats.getName(), panchayats.getAuditBlockId(), panchayats.getVpCode(),
                panchayats.getDescription(),panchayats.getCreatedBy());
    }

    @Override
    public ResponseModel Add(String name, Integer audit_block_id, Integer vp_code, String description,
                             Long created_by) {
        LOGGER.debug("Creating Village Panchayats : {}", name,audit_block_id,vp_code,description,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(name, audit_block_id, vp_code, description,
                    created_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Village Panchayats  Added Successfully!!" : "Unable to add Village Panchayats !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(VillagePanchayats panchayats) {
        return Update(panchayats.getId(),panchayats.getName(), panchayats.getAuditBlockId(),
                panchayats.getVpCode(),panchayats.getDescription(),panchayats.getModifiedBy(),panchayats.getStatus());
    }

    @Override
    public ResponseModel Update(Integer id, String name, Integer audit_block_id, Integer vp_code,
                                String description, Long modified_by, boolean is_active) {
        LOGGER.debug("Updating Village Panchayats  : {}", id,name,audit_block_id,vp_code,description,modified_by,is_active);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(id, name, audit_block_id, vp_code,
                    description, modified_by, is_active);
            response.setStatus(flag);
            response.setData(flag == true ? "Village Panchayats  Updated Successfully!!" : "Unable to update Village Panchayats !!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Village Panchayats  : {}");
        ResponseModel response = new ResponseModel<List<Blocks>>();
        try{
            response.setData(readBlockList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(String name, Integer audit_block_id, Integer vp_code, String description,
                           Long created_by){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("signin")
                .declareParameters(
                        new SqlParameter("vp_name", Types.VARCHAR),
                        new SqlParameter("auditblockid", Types.INTEGER),
                        new SqlParameter("vpcode", Types.INTEGER),
                        new SqlParameter("vp_description", Types.VARCHAR),
                        new SqlParameter("create_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("vp_name", name);
        inParamMap.put("auditblockid", audit_block_id);
        inParamMap.put("vpcode", vp_code);
        inParamMap.put("vp_description", description);
        inParamMap.put("create_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(Integer id, String name, Integer audit_block_id, Integer vp_code,
                           String description, Long modified_by, boolean is_active){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_village_panchayat")
                .declareParameters(
                        new SqlParameter("vp_id", Types.INTEGER),
                        new SqlParameter("vp_name", Types.VARCHAR),
                        new SqlParameter("auditblockid", Types.INTEGER),
                        new SqlParameter("vpcode", Types.INTEGER),
                        new SqlParameter("vp_description", Types.VARCHAR),
                        new SqlParameter("modify_by", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("vp_id", id);
        inParamMap.put("vp_name", name);
        inParamMap.put("auditblockid", audit_block_id);
        inParamMap.put("vpcode", vp_code);
        inParamMap.put("vp_description", description);
        inParamMap.put("modify_by", modified_by);
        inParamMap.put("isactive", is_active);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<VillagePanchayats> readBlockList(){
        List<VillagePanchayats> list = jdbcTemplate.query("call select_village_panchayats", new VillagePanchayatsMapper());
        return list;
    }

    protected static final class VillagePanchayatsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            VillagePanchayats o = new VillagePanchayats();
            o.setId(set.getInt("id"));
            o.setName(StringUtils.trimToNull(set.getString("name")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setAuditBlockId(set.getInt("audit_block_id"));
            o.setVpCode(set.getInt("vp_code"));
            o.setDescription(set.getString("description"));
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
