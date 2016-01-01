package com.sastabackend.service.user;

import com.sastabackend.domain.*;
import com.sastabackend.repository.CommonConfigRepository;
import com.sastabackend.repository.UserRepository;
import com.sastabackend.service.common.CommonService;
import com.sastabackend.service.common.CommonServiceImpl;
import com.sastabackend.service.user.exception.UserAlreadyExistsException;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.sastabackend.util.TextUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.apache.commons.lang.StringUtils;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
@Validated
public class UserServiceImpl implements UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private List<ConfigSystem> config = new ArrayList<ConfigSystem>();

    private final CommonServiceImpl configsystemService;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository repository;


    private String imageUrl = Constants.Empty;
    private String imagePath = Constants.Empty;
    private String hostPath = Constants.Empty;


    @Inject
    public UserServiceImpl(final UserRepository repository,final CommonServiceImpl configsystemService) {
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
    @Transactional
    public Users save(@NotNull @Valid final Users users) {
        LOGGER.debug("Creating {}", users);
        Users existing = repository.findOne(users.getId());
        if (existing != null) {
            throw new UserAlreadyExistsException(
                    String.format("There already exists a users with id=%s", users.getId()));
        }
        return repository.save(users);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Users> getList(String id) {
        LOGGER.debug("Retrieving the list of all users");
        return readUsersList(id);
    }

    private List<Users> readUsersList(String id){

        List<Users> o = new ArrayList<Users>();
        o = jdbcTemplate.query("call select_users(?)", new Object[]{id}, new UserMapper());
        if(o.size()==0)
            return null;
        else {
            for(int index = 0; index < o.size() ; index++){
                Users u = o.get(index);
                if(u.getImageId() == null || u.getImageId() == 0){
                    u.setImageName(this.imageUrl+"default.jpg");
                    o.set(index,u);
                } else if(u.getImageId() != null){
                    u.setImageName(this.imageUrl + u.getImageName());
                    o.set(index,u);
                }
            }
            return o;
        }
    }

    @Override
    public ResponseModel SignIn(String email,String password){
        ResponseModel response = null;
        try {
            response = new ResponseModel<Session>();
            password = TextUtil.makeOneWayPasswordWithMD5(password);
            LOGGER.debug("Received request to Sign in " + email,password);
            response.setData(doSignIn(email, password));
            response.setStatus(true);
            return response;
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Logging in is usually used to enter a specific page, which trespassers cannot see. Once
     * the user is logged in, the login token may be used to track what actions the user has taken
     * while connected to the site
     * @param email - name of the registered user email
     * @param password - secured key values for appropriate account
     * @return String - Will provide you a session Id. If its null the current user Account is not valid
     */
    private Session doSignIn(String email, String password){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("signin")
                .declareParameters(
                        new SqlParameter("uname", Types.VARCHAR),
                        new SqlParameter("pwd", Types.VARCHAR),
                        new SqlParameter("utctime", Types.INTEGER),
                        new SqlOutParameter("sessionid", Types.VARCHAR)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("uname", email);
        inParamMap.put("pwd", password);
        inParamMap.put("utctime", 1);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return getUserSession(simpleJdbcCallResult.get("sessionid").toString());
        else
            return null;
    }

    @Override
    public ResponseModel Add(Users users){

        ResponseModel response = null;
        try {
            response = new ResponseModel<Long>();
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_users")
                    .declareParameters(
                            new SqlParameter("emailid", Types.VARCHAR),
                            new SqlParameter("pwd", Types.VARCHAR),
                            new SqlParameter("screenname", Types.VARCHAR),
                            new SqlParameter("firstname", Types.VARCHAR),
                            new SqlParameter("lastname", Types.VARCHAR),
                            new SqlParameter("genderid", Types.INTEGER),
                            new SqlParameter("jobtitle", Types.VARCHAR),
                            new SqlParameter("hasreadtc", Types.BIT),
                            new SqlParameter("stateid", Types.INTEGER),
                            new SqlParameter("countryid", Types.INTEGER),
                            new SqlParameter("usergroupid", Types.INTEGER),
                            new SqlParameter("dateofjoining", Types.DATE),
                            new SqlParameter("teamname", Types.VARCHAR),
                            new SqlParameter("employeeid", Types.VARCHAR),
                            new SqlParameter("departmentid", Types.INTEGER),
                            new SqlParameter("reportingid", Types.BIGINT),
                            new SqlParameter("allotteddistrict", Types.INTEGER),
                            new SqlParameter("allottedblock", Types.INTEGER),
                            new SqlParameter("recruitmentid", Types.INTEGER),
                            new SqlParameter("createdby", Types.BIGINT),
                            new SqlOutParameter("userid", Types.BIGINT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("emailid", users.getEmail());
            inParamMap.put("pwd", users.getPassword());
            inParamMap.put("screenname", users.getScreenName());
            inParamMap.put("firstname", users.getFirstName());
            inParamMap.put("lastname", users.getLastName());
            inParamMap.put("genderid", users.getGenderId());
            inParamMap.put("jobtitle", users.getJobTitle());
            inParamMap.put("hasreadtc", users.getHasReadTermsAndCondtion());
            inParamMap.put("stateid", users.getStateId());
            inParamMap.put("countryid", users.getCountryId());
            inParamMap.put("usergroupid", users.getUserGroupId());
            inParamMap.put("dateofjoining", users.getDateOfJoining());
            inParamMap.put("teamname", users.getTeamName());
            inParamMap.put("employeeid", users.getEmployeeId());
            inParamMap.put("departmentid", users.getDepartmentId());
            inParamMap.put("reportingid", users.getReportingId());
            inParamMap.put("allotteddistrict", users.getAllottedDistrict());
            inParamMap.put("allottedblock", users.getAllottedBlock());
            inParamMap.put("recruitmentid", users.getRecruitmentId());
            inParamMap.put("createdby", users.getCreatedBy());
            SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
            simplejdbcCall.compile();
            Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
            if (!simpleJdbcCallResult.isEmpty())
                response.setData((Long) (simpleJdbcCallResult.get("userid")));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setStatus(false);
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel UpdateAvatarWithDescription(String base64, String description, Long id) {
        ResponseModel img_response = null;
        try{
            Images img = writeImageOnDisk(base64,id);
            if(img != null){
                img_response = UploadImage(img);
                img_response =  AddAboutMeWithDescription(description,id,(Long)img_response.getData());
            }else{
                img_response = new ResponseModel<String>();
                img_response.setStatus(false);
                img_response.setData("Unable to update user avatar details!");
            }
        }catch(Exception err){
            img_response = new ResponseModel<String>();
            img_response.setStatus(false);
            img_response.setData(err.getMessage());
        }
        return img_response;
    }

    private ResponseModel AddAboutMeWithDescription(String description, Long id, Long img_id){
        ResponseModel response = new ResponseModel<String>();
        try {
            jdbcTemplate.update("call update_avatar_with_description(?,?,?)", new Object[]{id, img_id,description});
            response.setStatus(true);
            response.setData("Update Avatar Image with Description!");
        }catch(Exception err){
            response.setStatus(false);
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Write Image into the disk
     * @param base64 - base 64 image string
     * @param id - name of the file
     * @return true
     */
    private Images writeImageOnDisk(String base64,Long id){
        String returnVal = Constants.Empty;
        // tokenize the data
        String[] parts = base64.split(",");
        String imageString = parts[1];
        CryptoUtil crypt =new CryptoUtil();
        String filename = Constants.Empty;
        Images avatar = null;
        try{
            avatar = new Images();
            filename = Constants.removeSpecialCharacters(crypt.encrypt(Constants.SALT_KEY,Long.toString(id)));
            filename =filename.concat(".png");
            // create a buffered image
            BufferedImage image = null;
            byte[] imageByte;
            LOGGER.debug("Error  " + this.imagePath + filename);
            BASE64Decoder decoder = new BASE64Decoder();
            imageByte = decoder.decodeBuffer(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
            LOGGER.debug("Error  " + this.imagePath  + filename);
            // write the image to a file
            File outputfile = new File( this.imagePath  + filename);
            ImageIO.write(image, "png", outputfile);
            BufferedImage bimg = ImageIO.read(outputfile);
            int width          = bimg.getWidth();
            int height         = bimg.getHeight();
            avatar.setImageName(filename);
            avatar.setImageSize(imageByte.length);
            avatar.setImageHeight(height);
            avatar.setImageWidth(width);
            avatar.setUserId(id);
            avatar.setImageNiceName(filename);
            avatar.setDescription(Constants.Empty);
            avatar.setThumbnailImageName(filename);
            avatar.setThumbnailHeight(height);
            avatar.setThumbnailWidth(width);
            avatar.setTypeId(Constants.AVATAR_IMAGE_TYPE);
        }catch (Exception err){
            LOGGER.debug("Error  " + err.getMessage());
            avatar = null;
        }
        return  avatar;
    }

    @Override
    public ResponseModel UploadImage(Images image) {

        ResponseModel response = null;
        try {
            response = new ResponseModel<Long>();
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_iamge")
                    .declareParameters(
                            new SqlParameter("user_id", Types.BIGINT),
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
                            new SqlOutParameter("imageid", Types.BIGINT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("user_id", image.getUserId());
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

    @Override
    public ResponseModel UpdateBasicUserDetails(BasicUserDetails personal) {

        ResponseModel response = null;
        try {
            response = new ResponseModel<Boolean>();
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_basic_profile_information")
                    .declareParameters(
                            new SqlParameter("userid", Types.BIGINT),
                            new SqlParameter("exp", Types.VARCHAR),
                            new SqlParameter("communicationaddress", Types.VARCHAR),
                            new SqlParameter("permanentaddress", Types.VARCHAR),
                            new SqlParameter("isaddresssame", Types.BIT),
                            new SqlParameter("dateofbirth", Types.DATE),
                            new SqlParameter("previousworkexp", Types.FLOAT),
                            new SqlParameter("gmailid", Types.VARCHAR),
                            new SqlParameter("skypename", Types.VARCHAR),
                            new SqlParameter("businessemail", Types.VARCHAR),
                            new SqlParameter("personalemail", Types.VARCHAR),
                            new SqlParameter("bloodgroupid", Types.SMALLINT),
                            new SqlParameter("mobileno", Types.VARCHAR),
                            new SqlParameter("landlineno", Types.VARCHAR),
                            new SqlParameter("personalurl", Types.VARCHAR),
                            new SqlOutParameter("flag", Types.BIT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("userid", personal.getUserId());
            inParamMap.put("exp", personal.getExperience());
            inParamMap.put("communicationaddress", personal.getCommunicationAddress());
            inParamMap.put("permanentaddress", personal.getPresentAddress());
            inParamMap.put("isaddresssame", personal.getIsAddressSame());
            inParamMap.put("dateofbirth", personal.getDateOfBirth());
            inParamMap.put("previousworkexp", personal.getPreviousExperience());
            inParamMap.put("gmailid", personal.getGmailId());
            inParamMap.put("skypename", personal.getSkypeName());
            inParamMap.put("businessemail", personal.getBusinessEmail());
            inParamMap.put("personalemail", personal.getPersonalEmail());
            inParamMap.put("bloodgroupid", personal.getBloodGroupId());
            inParamMap.put("mobileno", personal.getMobileNumber());
            inParamMap.put("landlineno", personal.getLandLineNumber());
            inParamMap.put("personalurl", personal.getPersonalUrl());
            SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
            simplejdbcCall.compile();
            Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
            if (!simpleJdbcCallResult.isEmpty()) {
                if(Boolean.valueOf(simpleJdbcCallResult.get("flag").toString()).booleanValue()) {
                    response.setData("Successfully updated basic profile!.");
                }
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

    @Override
    public ResponseModel SignOut(String sessionid) {
        ResponseModel response = null;
        try {
            response = new ResponseModel<Object>();
            if(doSignOut(sessionid)){
                response.setData("Successfully logged out user current session!");
                response.setStatus(true);
            }else{
                response.setData("unalbe to logout!");
                response.setStatus(false);
            }
            return response;
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    @Override
    public ResponseModel UpdateSession(String sessionid) {
        ResponseModel response = null;
        try {
            response = new ResponseModel<Session>();
            if(DoUpdateSession(sessionid)){
                response.setData(getUserSession(sessionid));
                response.setStatus(true);
            }else{
                response.setData(null);
                response.setStatus(false);
            }
            return response;
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel ChangePassword(Long userid, String oldPassword, String NewPassword, Boolean changedby) {
        if(!oldPassword .isEmpty())
            oldPassword = TextUtil.makeOneWayPasswordWithMD5(oldPassword);
        if(!NewPassword .isEmpty())
            NewPassword = TextUtil.makeOneWayPasswordWithMD5(NewPassword);
        return ResetPassword(userid, oldPassword, NewPassword, changedby);
    }

    /**
     * Sign out user current session
     * @param sessionid - session id
     * @return
     */
    private boolean doSignOut(String sessionid){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("sign_out")
                .declareParameters(
                        new SqlParameter("sessionid", Types.VARCHAR),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("sessionid", sessionid);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    /**
     * update session
     * @param sessionid
     * @return
     */
    public boolean DoUpdateSession(String sessionid){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_session")
                .declareParameters(
                        new SqlParameter("sessionid", Types.VARCHAR),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("sessionid", sessionid);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    /**
     * Read session details current user login
     * @param session
     * @return
     */
    private Session getUserSession(String session){
        if(session.isEmpty()){
            throw  new RuntimeException("unable to read user session!");
        }
        try {
            System.out.println(!session.isEmpty() ? session : "empty");
            useSimpleJdbcCall(session);
            List list = jdbcTemplate.query("call select_session(?)", new Object[]{session}, new SessionMapper());
            if (!CollectionUtils.isEmpty(list)) {
                Session o = (Session) list.get(0);
                if(o.getImageName() == null){
                    o.setImageName(this.imageUrl+"default.jpg");
                }else if(o.getImageName() != null){
                    o.setImageName(this.imageUrl+o.getImageName());
                }
                return o;
            }
            else
             return null;
        }catch(Exception err){
            System.out.println(err.getMessage());
        }
        return null;
    }

    private Session useSimpleJdbcCall(String sessionID) {

        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("select_session");

        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("sessionid", sessionID);
        SqlParameterSource in = new MapSqlParameterSource(inParamMap);

        Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
        Session o = new Session();
        o.setCreatedDate(StringUtils.trimToNull((String) simpleJdbcCallResult.get("create_date")));
        o.setExpiredDate(StringUtils.trimToNull((String) simpleJdbcCallResult.get("expire_date")));
        o.setUserFullName(StringUtils.trimToNull((String) simpleJdbcCallResult.get("user_full_name")));
        o.setScreenName(StringUtils.trimToNull((String) simpleJdbcCallResult.get("screen_name")));
        o.setEmployeeID(StringUtils.trimToNull((String) simpleJdbcCallResult.get("user_group_id")));
        o.setCountryId((Integer) simpleJdbcCallResult.get("employee_id"));
        o.setReportingId((Long) simpleJdbcCallResult.get("country_id"));
        o.setReportingId((Long) simpleJdbcCallResult.get("reporting_id"));
        System.out.println(o.toString());
        return o;
    }

    private ResponseModel ResetPassword(Long userid, String oldPassword, String NewPassword, Boolean changedby){
        ResponseModel<String> response = new ResponseModel<String>();
        response.setStatus(false);
        try{
            SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("reset_password")
                    .declareParameters(
                            new SqlParameter("userid", Types.BIGINT),
                            new SqlParameter("oldpassword", Types.VARCHAR),
                            new SqlParameter("newpassword", Types.VARCHAR),
                            new SqlParameter("changebyadmin", Types.BIT),
                            new SqlOutParameter("flag", Types.BIT)
                    );
            Map<String, Object> inParamMap = new HashMap<String, Object>();
            inParamMap.put("userid", userid);
            inParamMap.put("oldpassword", oldPassword);
            inParamMap.put("newpassword", NewPassword);
            inParamMap.put("changebyadmin", changedby);
            SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
            simplejdbcCall.compile();
            Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
            if(!simpleJdbcCallResult.isEmpty()) {
                response.setStatus((boolean) simpleJdbcCallResult.get("flag"));
                response.setData("Reset password successfully!.");
            }
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    protected static final class SessionMapper implements RowMapper{

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Session o = new Session();
            o.setSessionId(StringUtils.trimToNull(set.getString("session_id")));
            o.setUserId(set.getLong("user_id"));
            o.setImageName(StringUtils.trimToNull(set.getString("avatar")));
            o.setCreatedDate(StringUtils.trimToNull(set.getString("create_date")));
            o.setExpiredDate(StringUtils.trimToNull(set.getString("expire_date")));
            o.setUserFullName(StringUtils.trimToNull(set.getString("user_full_name")));
            o.setScreenName(StringUtils.trimToNull(set.getString("screen_name")));
            o.setEmployeeID(StringUtils.trimToNull(set.getString("employee_id")));
            o.setCountryId(set.getInt("country_id"));
            o.setReportingId(set.getLong("reporting_id"));
            o.setAllottedBlock(set.getInt("allotted_block"));
            o.setAllottedDistrict(set.getInt("allotted_district"));
            System.out.println(o.toString());
            return o;
        }
    }


    protected static final class UserMapper implements RowMapper{
        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Users o = new Users();
            o.setId(set.getLong("id"));
            o.setEmail(StringUtils.trimToNull(set.getString("email")));
            o.setScreenName(StringUtils.trimToNull(set.getString("screen_name")));
            o.setLastName(StringUtils.trimToNull(set.getString("first_name")));
            o.setFirstName(StringUtils.trimToNull(set.getString("last_name")));
            o.setCountryId(set.getInt("gender_id"));
            o.setJobTitle(StringUtils.trimToNull(set.getString("job_title")));
            o.setDescription(StringUtils.trimToNull(set.getString("description")));
            o.setExperience(StringUtils.trimToNull(set.getString("experience")));
            o.setCountryId(set.getInt("state_id"));
            o.setStateName(StringUtils.trimToNull(set.getString("stateName")));
            o.setCountryId(set.getInt("country_id"));
            o.setCountryName(StringUtils.trimToNull(set.getString("countryName")));
            o.setImageId(set.getLong("image_id"));
            o.setImageName(StringUtils.trimToNull(set.getString("image_name")));
            o.setUserGroupId(set.getInt("user_group_id"));
            o.setCommunicationAddress(StringUtils.trimToNull(set.getString("communication_address")));
            o.setPermanentAddress(StringUtils.trimToNull(set.getString("permanent_address")));
            o.setSameAddress(set.getBoolean("is_address_same"));
            o.setDateOfJoining(set.getDate("date_of_joining"));
            o.setDateOfBirth(set.getDate("date_of_birth"));
            o.setPreviousExperience(set.getFloat("previous_work_exp"));
            o.setTeamName(StringUtils.trimToNull(set.getString("team_name")));
            o.setEmployeeId(StringUtils.trimToNull(set.getString("employee_id")));
            o.setDepartmentId(set.getInt("department_id"));
            o.setDeptName(StringUtils.trimToNull(set.getString("deptName")));
            o.setGmailId(StringUtils.trimToNull(set.getString("gmail_id")));
            o.setSkypeName(StringUtils.trimToNull(set.getString("skype_name")));
            o.setBusinessEmail(StringUtils.trimToNull(set.getString("business_email")));
            o.setPersonalEmail(StringUtils.trimToNull(set.getString("personal_email")));
            o.setFatherName(StringUtils.trimToNull(set.getString("father_name")));
            o.setBloodGroupId(set.getInt("blood_group_id"));
            o.setBloodGroupName(StringUtils.trimToNull(set.getString("bloodGorupName")));
            o.setReportingId(set.getLong("reporting_id"));
            o.setReportingTo(StringUtils.trimToNull(set.getString("reporting_to")));
            o.setAllottedBlock(set.getInt("allotted_block"));
            o.setAllottedDistrict(set.getInt("allotted_district"));
            o.setRecruitmentId(set.getInt("recruitment_id"));
            o.setBirthProofId(set.getLong("birth_proof_id"));
            o.setValidationCode(StringUtils.trimToNull(set.getString("validation_code")));
            o.setVisibleFields(StringUtils.trimToNull(set.getString("visible_fields")));
            o.setMobileNumber(StringUtils.trimToNull(set.getString("mobile_no")));
            o.setLandLineNumber(StringUtils.trimToNull(set.getString("land_line_no")));
            o.setPersonalUrl(StringUtils.trimToNull(set.getString("personal_url")));
            o.setDateOfJoining(set.getDate("last_login_date"));
            o.setCreateDate(set.getTimestamp("create_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setIsActive(set.getBoolean("is_active"));
            System.out.println(o.toString());
            return o;
        }
    }
}
