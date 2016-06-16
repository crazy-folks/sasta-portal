package com.sastabackend.service.news;

import com.sastabackend.domain.*;
import com.sastabackend.repository.NewsRepository;
import com.sastabackend.service.common.CommonServiceImpl;
import com.sastabackend.util.Constants;
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
 * Created by Sarvaratchagan on 06-06-2016.
 */

@Service
@Validated
public class NewsServiceImpl implements NewsService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private List<ConfigSystem> config = new ArrayList<ConfigSystem>();

    private String imageUrl = Constants.Empty;
    private String imagePath = Constants.Empty;
    private String hostPath = Constants.Empty;

    private final CommonServiceImpl configsystemService;
    private static final Logger LOGGER = LoggerFactory.getLogger(NewsServiceImpl.class);
    private final NewsRepository repository;

    @Inject
    public NewsServiceImpl(final NewsRepository repository,final CommonServiceImpl configsystemService){
        this.repository = repository;
        this.configsystemService = configsystemService;

        config = (List<ConfigSystem>) configsystemService.Select().getData();
        for(int index = 0; index < config.size(); index++){
            ConfigSystem cf = config.get(index);

            if(Constants.HOST_PATH.equals(cf.getName())){
                hostPath = cf.getValue();
            }

            if(Constants.IMAGE_PATH.equals(cf.getName())){
                imagePath = cf.getValue();
            }

            if(Constants.IMAGE_URL.equals(cf.getName())){
                imageUrl = cf.getValue();
            }
        }

    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading News  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<News>();
            response.setData(selectNewsById(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findTop3() {
        LOGGER.debug("Reading Top 3 News  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<News>>();
            response.setData(readTop3NewsList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading News  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<News>>();
            response.setData(readNewsList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(News nw) {
        LOGGER.debug("Creating  News : {0}", nw.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Create(nw) > 0 ? true : false;
            response.setStatus(flag);
            response.setData(flag == true ? "News Created Successfully!!" : "Unable to Create News!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(News nw) {
        LOGGER.debug("Update News : {0}", nw.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(nw);
            response.setStatus(flag);
            response.setData(flag == true ? "News Updated Successfully!!" : "Unable to update News!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    @Override
    public ResponseModel UploadImage(Posts image) {

        ResponseModel response = null;
        try {
            response = new ResponseModel<Long>();
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_post_images")
                    .declareParameters(
                            new SqlParameter("imageName", Types.VARCHAR),
                            new SqlParameter("image_description", Types.VARCHAR),
                            new SqlParameter("nice_name", Types.VARCHAR),
                            new SqlParameter("height", Types.INTEGER),
                            new SqlParameter("width", Types.INTEGER),
                            new SqlParameter("image_size", Types.INTEGER),
                            new SqlParameter("thumb_image_name", Types.VARCHAR),
                            new SqlParameter("thumb_height", Types.INTEGER),
                            new SqlParameter("thumb_width", Types.INTEGER),
                            new SqlParameter("typeid", Types.INTEGER),
                            new SqlParameter("createdby", Types.BIGINT),
                            new SqlOutParameter("imageid", Types.BIGINT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("imageName", image.getImageName());
            inParamMap.put("image_description", image.getDescription());
            inParamMap.put("nice_name", image.getImageNiceName());
            inParamMap.put("height", image.getImageHeight());
            inParamMap.put("width", image.getImageWidth());
            inParamMap.put("image_size", image.getImageSize());
            inParamMap.put("thumb_image_name", image.getThumbnailImageName());
            inParamMap.put("thumb_height", image.getThumbnailHeight());
            inParamMap.put("thumb_width", image.getThumbnailWidth());
            inParamMap.put("typeid", image.getTypeId());
            inParamMap.put("createdby", image.getCreatedBy());
            SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
            simplejdbcCall.compile();
            Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
            if (!simpleJdbcCallResult.isEmpty()) {
                response.setData(Long.valueOf(simpleJdbcCallResult.get("imageid").toString()).longValue());
            }
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setStatus(false);
            LOGGER.debug("Error  " + err.getMessage());
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Update news
     * @param ns - news object
     * @return - true - successfully created , false - failed to update news
     */
    Long Create(News ns){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_news")
                .declareParameters(
                    new SqlParameter("news_title", Types.VARCHAR),
                    new SqlParameter("news_image_id", Types.BIGINT),
                    new SqlParameter("news_content", Types.VARCHAR),
                    new SqlParameter("news_created_by", Types.BIGINT),
                    new SqlOutParameter("news_id", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("news_title", ns.getTitle());
        inParamMap.put("news_image_id", ns.getImageId());
        inParamMap.put("news_content", ns.getContent());
        inParamMap.put("news_created_by", ns.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (Long)simpleJdbcCallResult.get("news_id");
        else
            return 0L;
    }

    /**
     * Update news
     * @param ns - news object
     * @return - true - successfully created , false - failed to update news
     */
    boolean Modify(News ns){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_news")
                .declareParameters(
                        new SqlParameter("news_title", Types.VARCHAR),
                        new SqlParameter("news_image_id", Types.BIGINT),
                        new SqlParameter("news_content", Types.VARCHAR),
                        new SqlParameter("news_modified_by", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlParameter("news_id", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("news_title", ns.getTitle());
        inParamMap.put("news_image_id", ns.getImageId());
        inParamMap.put("news_content", ns.getContent());
        inParamMap.put("news_modified_by", ns.getCreatedBy());
        inParamMap.put("isactive", ns.getStatus());
        inParamMap.put("news_id", ns.getId());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    /**
     * Read news by Id
     * @param id - News Id
     * @return - News
     */
    private News selectNewsById(Long id){
        List<News> o = new ArrayList<News>();
        o = jdbcTemplate.query("call select_news_by_id(?)", new Object[]{id}, new NewsMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    /**
     * Read news list
     * @return - news list
     */
    private List<News> readNewsList() {
        List<News> o = jdbcTemplate.query("call select_news()", new NewsMapper());
        if(o.size()==0)
            return null;
        else {
            for(int index = 0; index < o.size() ; index++){
                News u = o.get(index);
                if(u.getImageId() == null || u.getImageId() == 0){
                    u.setImageName(this.imageUrl+"news/default.jpg");
                    o.set(index,u);
                } else if(u.getImageId() != null){
                    u.setImageName(this.imageUrl +"news/"+ u.getImageName());
                    o.set(index,u);
                }
            }
            return o;
        }
    }

    /**
     * Read top 3 news list
     * @return - top 3 news list
     */
    private List<News> readTop3NewsList() {
        List<News> o = jdbcTemplate.query("call select_top3_news()", new NewsMapper());
        if(o.size()==0)
            return null;
        else {
            for(int index = 0; index < o.size() ; index++){
                News u = o.get(index);
                if(u.getImageId() == null || u.getImageId() == 0){
                    u.setImageName(this.imageUrl+ "news/default.jpg");
                    o.set(index,u);
                } else if(u.getImageId() != null){
                    u.setImageName(this.imageUrl + "news/"+ u.getImageName());
                    o.set(index,u);
                }
            }
            return o;
        }
    }

    protected static final class NewsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            News o = new News();
            o.setId(set.getLong("id"));
            o.setTitle(StringUtils.trimToNull(set.getString("title")));
            o.setImageId(set.getLong("image_id"));
            o.setTypeId(set.getInt("image_id"));
            o.setImageName(StringUtils.trimToNull(set.getString("image_name")));
            o.setContent(StringUtils.trimToNull(set.getString("content")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }
    }

}
