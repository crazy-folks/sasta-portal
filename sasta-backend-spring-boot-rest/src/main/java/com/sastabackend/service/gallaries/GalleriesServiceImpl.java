package com.sastabackend.service.gallaries;

import com.sastabackend.domain.*;
import com.sastabackend.repository.GallariesRepository;
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
 * Created by Sarvaratchagan on 10-07-2016.
 */
@Service
@Validated
public class GalleriesServiceImpl implements GalleriesService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(GalleriesServiceImpl.class);


    private String imageUrl = Constants.Empty;
    private String imagePath = Constants.Empty;
    private String hostPath = Constants.Empty;

    private List<ConfigSystem> config = new ArrayList<ConfigSystem>();
    private final GallariesRepository repository;
    private final CommonServiceImpl configsystemService;

    @Inject
    public GalleriesServiceImpl(final GallariesRepository repository,final CommonServiceImpl configsystemService){
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
        LOGGER.debug("Reading Gallaries  : {0}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Gallaries>();
            Gallaries u = selectGallariesById(id);

            if(u.getImageName() == null ){
                u.setImageName(this.imageUrl + "galleries/default.jpg");
            } else if(u.getImageName() != null){
                u.setImageName(this.imageUrl + "galleries/" + u.getImageName());
            }

            if(u.getThumbnailImageName() == null ){
                u.setThumbnailImageName(this.imageUrl + "galleries/default.jpg");
            } else if(u.getThumbnailImageName() != null){
                u.setThumbnailImageName(this.imageUrl + "galleries/thumbnails/" + u.getImageNiceName());
            }

            response.setData(u);
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Long auditid) {
        LOGGER.debug("Reading Gallaries  : {0}", auditid);
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Gallaries>>();
            List<Gallaries> list = readAuditGallariesList(auditid);
            for(Gallaries gl : list){
                if(gl.getImageName() == null ){
                    gl.setImageName(this.imageUrl + "galleries/default.jpg");
                } else if(gl.getImageName() != null){
                    gl.setImageName(this.imageUrl + "galleries/" + gl.getImageName());
                }

                if(gl.getThumbnailImageName() == null ){
                    gl.setThumbnailImageName(this.imageUrl + "galleries/default.jpg");
                } else if(gl.getThumbnailImageName() != null){
                    gl.setThumbnailImageName(this.imageUrl + "galleries/thumbnails/" + gl.getImageNiceName());
                }
            }
            response.setData(list);
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel AddGalleries(Gallaries image) {
        LOGGER.debug("Creating  Gallaries : {0}", image.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = CreateGallaries(image) > 0 ? true : false;
            response.setStatus(flag);
            response.setData(flag == true ? "Gallaries Created Successfully!!" : "Unable to Create Gallaries!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel UpdateGalleries(Gallaries image) {
        LOGGER.debug("Update Gallaries : {0}", image.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = UpdateGallaries(image);
            response.setStatus(flag);
            response.setData(flag == true ? "Gallaries Updated Successfully!!" : "Unable to update Gallaries!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Delete(Long id) {
        LOGGER.debug("Deleting Gallaries :{}", id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = DeleteGallaries(id);
            response.setStatus(flag);
            response.setData(flag == true ? "Gallaries deleted Successfully!!" : "Unable to delete Gallaries!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel SelectPulicImages(Long fyid, Long auditid) {
        LOGGER.debug("Reading Gallaries  : {0}", auditid);
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Gallaries>>();
            List<Gallaries> list = readAuditGallaries(fyid,auditid);
            for(Gallaries gl : list){
                if(gl.getImageName() == null ){
                    gl.setImageName(this.imageUrl + "galleries/default.jpg");
                } else if(gl.getImageName() != null){
                    gl.setImageName(this.imageUrl + "galleries/" + gl.getImageName());
                }

                if(gl.getThumbnailImageName() == null ){
                    gl.setThumbnailImageName(this.imageUrl + "galleries/default.jpg");
                } else if(gl.getThumbnailImageName() != null){
                    gl.setThumbnailImageName(this.imageUrl + "galleries/thumbnails/" + gl.getImageNiceName());
                }
            }
            response.setData(list);
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Add Gallary Image
     * @param image - image input
     * @return Long - >0 - success , 0 - fail to add
     */
    public Long CreateGallaries(Gallaries image){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_audit_gallary_images")
                .declareParameters(
                        new SqlParameter("auditid",Types.BIGINT),
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
        inParamMap.put("auditid", image.getAuditId());
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
            return Long.valueOf(simpleJdbcCallResult.get("imageid").toString()).longValue();
        }else{
            return 0L;
        }
    }

    /**
     * Update Gallaries Image
     * @param image
     * @return - boolean - true - success , false - fail to update
     */
    public boolean UpdateGallaries(Gallaries image){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_audit_gallary_images")
                .declareParameters(
                        new SqlParameter("imageid",Types.BIGINT),
                        new SqlParameter("auditid",Types.BIGINT),
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
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("imageid", image.getId());
        inParamMap.put("auditid", image.getAuditId());
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
        inParamMap.put("modifiedby", image.getModifiedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if (!simpleJdbcCallResult.isEmpty()) {
            return Boolean.valueOf(simpleJdbcCallResult.get("flag").toString()).booleanValue();
        }else{
            return false;
        }
    }


    /**
     * Delete Gallaries
     * @param id - unique id of the gallaries
     * @return - boolean - true - success , false - fail to update
     */
    public boolean DeleteGallaries(Long id){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_gallary_image")
                .declareParameters(
                        new SqlParameter("gallaryid", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("gallaryid", id);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    /**
     * Read Audit Gallaries
     * @param id - Gallaries Id
     * @return - List of Gallaries
     */
    public List<Gallaries> readAuditGallariesList(Long id){
        List<Gallaries> o = new ArrayList<Gallaries>();
        o = jdbcTemplate.query("call select_audit_galaries(?)", new Object[]{id}, new GallariesMapper());
        return o;
    }

    /**
     * Read Audit Gallaries by financial year , round id
     * @param  fyid , auditid - financial year, round id
     * @return - List of Gallaries
     */
    public List<Gallaries> readAuditGallaries(Long fyid,Long auditid){
        List<Gallaries> o = new ArrayList<Gallaries>();
        o = jdbcTemplate.query("call select_galleries_images(?,?)", new Object[]{fyid,auditid}, new GallariesMapper());
        return o;
    }

    /**
     * Read Gallaries by Id
     * @param id - Gallaries Id
     * @return - Gallaries
     */
    private Gallaries selectGallariesById(Long id){
        List<Gallaries> o = new ArrayList<Gallaries>();
        o = jdbcTemplate.query("call select_galaries(?)", new Object[]{id}, new GallariesMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    protected static final class GallariesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Gallaries o = new Gallaries();
            o.setId(set.getLong("id"));
            o.setAuditId(set.getLong("audit_id"));
            o.setImageName(StringUtils.trimToNull(set.getString("image_name")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setImageNiceName(StringUtils.trimToNull(set.getString("image_nice_name")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setImageHeight(set.getInt("image_height"));
            o.setImageWidth(set.getInt("image_width"));
            o.setImageSize(set.getInt("image_size"));
            o.setThumbnailImageName(StringUtils.trimToNull(set.getString("thumbnail_image_name")));
            o.setThumbnailHeight(set.getInt("thumbnail_height"));
            o.setThumbnailWidth(set.getInt("thumbnail_width"));
            o.setUploadedDate(set.getTimestamp("uploaded_date"));
            o.setIsDeleted(set.getBoolean("is_deleted"));
            o.setDeletedDate(set.getTimestamp("deleted_date"));
            o.setTypeId(set.getInt("type_id"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }
    }

}
