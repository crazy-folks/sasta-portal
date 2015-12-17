package com.sastabackend.service.block;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.BlockRepository;
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
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 07/Nov/2015.
 */

@Service
@Validated
public class BlockServiceImpl  implements BlockService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(BlockServiceImpl.class);
    private final BlockRepository repository;

    @Inject
    public BlockServiceImpl(BlockRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel Add(String name,String description,Integer district_id,Long created_by) {
        LOGGER.debug("Creating Blocks : {}", name,district_id,created_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(name,description,district_id,created_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Block Added Successfully!!" : "Unable to add Block!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Blocks block){
        LOGGER.debug("Creating Blocks : {}", block);
        return Add(block.getBlockName(),block.getDescription(), block.getDistrictID(), block.getCreatedBy());
    }

    @Override
    public ResponseModel Update(int block_id, String name,String description, int district_id, Long modify_by) {
        LOGGER.debug("Updating Blocks : {}", name,description,district_id,modify_by);
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag = Modify(block_id, name,description, district_id, modify_by);
            response.setStatus(flag);
            response.setData(flag == true ? "Block Updated Successfully!!" : "Unable to update blocks!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Blocks block) {
        return Update(block.getBlockID(), block.getBlockName(),block.getDescription(), block.getDistrictID(), block.getModifiedBy());
    }

    @Override
    public ResponseModel getList() {
        LOGGER.debug("Reading Block data : {}");
        ResponseModel response = new ResponseModel<List<Blocks>>();
        try{
            response.setData(readBlockList());
            response.setStatus(true);
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean Create(String name,String description,Integer district_id,Long created_by){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_blocks")
                .declareParameters(
                        new SqlParameter("blockName", Types.VARCHAR),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("district_id", Types.INTEGER),
                        new SqlParameter("create_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("blockName", name);
        inParamMap.put("description", description);
        inParamMap.put("district_id", district_id);
        inParamMap.put("create_by", created_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private boolean Modify(int block_id, String name,String description, int district_id, Long modify_by){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_blocks")
                .declareParameters(
                        new SqlParameter("block_id", Types.INTEGER),
                        new SqlParameter("blockName", Types.VARCHAR),
                        new SqlParameter("description", Types.VARCHAR),
                        new SqlParameter("district_id", Types.INTEGER),
                        new SqlParameter("modify_by", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("block_id", block_id);
        inParamMap.put("blockName", name);
        inParamMap.put("description", description);
        inParamMap.put("district_id", district_id);
        inParamMap.put("modify_by", modify_by);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<Blocks> readBlockList(){
        List<Blocks> list = jdbcTemplate.query("call select_blocks", new BlockMapper());
        return list;
    }

    protected static final class BlockMapper implements RowMapper{

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Blocks o = new Blocks();
            o.setBlockID(set.getInt("id"));
            o.setBlockName(StringUtils.trimToNull(set.getString("name")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setDistrictID(set.getInt("district_id"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            System.out.println(o.toString());
            return o;
        }
    }
}
