package com.sastabackend.service.messages;

import com.sastabackend.domain.Messages;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.MessagesRepository;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Sarvaratchagan on 19-06-2016.
 */

@Service
@Validated
public class MessagesServiceImpl implements MessagesService {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(MessagesServiceImpl.class);
    private final MessagesRepository repository;

    @Inject
    public MessagesServiceImpl(final MessagesRepository repository ){
        this.repository = repository;
    }


    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Messages : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Messages>();
            response.setData(selectMessagesData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading Messages : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Messages>>();
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Messages message) {
        LOGGER.debug("Creating  Message : {}", message.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            Long id =  Create(message);
            boolean flag = id > 0 ? true : false;
            if(flag){
                response.setStatus(flag);
                response.setData("Message Added Successfully!!");
            }else{
                response.setStatus(flag);
                response.setData("Unable to add message!");
            }
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Messages message) {
        LOGGER.debug("Creating  Message :{}", message.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(message);
            response.setStatus(flag);
            response.setData(flag == true ? "Message Updated Successfully!!" : "Unable to update Message!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Delete(Long id) {
        LOGGER.debug("Creating  Message :{}", id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = DeleteMessage(id);
            response.setStatus(flag);
            response.setData(flag == true ? "Message deleted Successfully!!" : "Unable to deleted Message!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private Long Create(Messages message) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_messages")
                .declareParameters(
                        new SqlParameter("message_title", Types.VARCHAR),
                        new SqlParameter("message_content", Types.VARCHAR),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("id", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("message_title", message.getTitle());
        inParamMap.put("message_content", message.getContent());
        inParamMap.put("createdby", message.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (Long)simpleJdbcCallResult.get("id");
        else
            return 0L;
    }


    private boolean DeleteMessage(Long id) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_message")
                .declareParameters(
                        new SqlParameter("message_id", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("message_id", id);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Messages message) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_message")
                .declareParameters(
                        new SqlParameter("message_id", Types.BIGINT),
                        new SqlParameter("message_title", Types.VARCHAR),
                        new SqlParameter("message_content", Types.VARCHAR),
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("message_id", message.getId());
        inParamMap.put("message_title", message.getTitle());
        inParamMap.put("message_content", message.getContent());
        inParamMap.put("modifiedby", message.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    /**
     * Read All Messages
     * @return - Message Object List
     */
    private List<Messages> readList(){
        List<Messages> list = jdbcTemplate.query("call select_messages()", new MessagesMapper());
        return list;
    }


    /**
     * Read Messages Data by Message Id
     * @param id
     * @return - Message Object
     */
    private Messages selectMessagesData(Long id){
        List<Messages> o = new ArrayList<Messages>();
        o = jdbcTemplate.query("call select_message_by_id(?)", new Object[]{id}, new MessagesMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }


    protected static final class MessagesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Messages o = new Messages();
            o.setId(set.getLong("id"));
            o.setTitle(StringUtils.trimToNull(set.getString("title")));
            o.setContent(StringUtils.trimToNull(set.getString("content")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Expenditure  : {}", o.toString());
            return o;
        }
    }

}
