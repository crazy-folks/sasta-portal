package com.sastabackend.service.news;

import com.sastabackend.domain.News;
import com.sastabackend.domain.Recovery;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.NewsRepository;
import com.sastabackend.repository.RecoveryRepository;
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
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sarvaratchagan on 06-06-2016.
 */

@Service
@Validated
public class NewsServiceImpl implements NewsService{


    @Autowired
    private JdbcTemplate jdbcTemplate;


    private static final Logger LOGGER = LoggerFactory.getLogger(NewsServiceImpl.class);
    private final NewsRepository repository;

    @Inject
    public NewsServiceImpl(final NewsRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        return null;
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
            response.setData(readList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(News rc) {
        return null;
    }

    @Override
    public ResponseModel Update(News rc) {
        return null;
    }

    private Recovery selectRecoveryData(Long id){
        List<Recovery> o = new ArrayList<Recovery>();
        o = jdbcTemplate.query("call select_recovery_id(?)", new Object[]{id}, new NewsMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    private List<News> readList() {
        List<News> list = jdbcTemplate.query("call select_news()", new NewsMapper());
        return list;
    }

    private List<News> readTop3NewsList() {
        List<News> list = jdbcTemplate.query("call select_top3_news()", new NewsMapper());
        return list;
    }

    protected static final class NewsMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            News o = new News();
            o.setId(set.getLong("id"));
            o.setTitle(StringUtils.trimToNull(set.getString("title")));
            o.setImageId(set.getLong("image_id"));
            o.setContent(StringUtils.trimToNull(set.getString("image_name")));
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
