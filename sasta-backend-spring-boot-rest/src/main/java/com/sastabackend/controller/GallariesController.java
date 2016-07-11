package com.sastabackend.controller;

import com.sastabackend.domain.Gallaries;
import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.Posts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.gallaries.GalleriesService;
import com.sastabackend.service.news.NewsService;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.sastabackend.util.TextUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.nio.file.Paths;

/**
 * Created by Sarvaratchagan on 10-07-2016.
 */
@RestController
@RequestMapping("/api/gallaries")
public class GallariesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GallariesController.class);

    private final GalleriesService gallariesService;
    // The Environment object will be used to read parameters from the
    // application.properties configuration file


    @Autowired
    private Environment env;

    @Inject
    public GallariesController(final GalleriesService gallariesService) {
        this.gallariesService = gallariesService;
    }

    @ApiOperation(value = "delete Gallaries by id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deletegallaries", method = RequestMethod.GET)
    public ResponseModel DeleteGallaries(@RequestParam("id") Long id) {
        LOGGER.debug("delete Gallaries  : {}", id);
        return gallariesService.Delete(id);
    }

    @ApiOperation(value = "Read Gallaries list", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/gallarieslist", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("auditid") Long auditid) {
        return gallariesService.findAll(auditid);
    }

    @ApiOperation(value = "Read Gallaries list", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/publicgallaries", method = RequestMethod.GET)
    public ResponseModel getPublicList(@RequestParam("fyid") Long fyid,@RequestParam("auditid") Long auditid) {
        return gallariesService.SelectPulicImages(fyid,auditid);
    }

    @ApiOperation(value = "Read Gallaries By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getgallariesbyid", method = RequestMethod.GET)
    public ResponseModel getGallariesById(@RequestParam("id") Long id) {
        return gallariesService.findOne(id);
    }

    @ApiOperation(value = "Update Gallaries", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/updategalleries", method = RequestMethod.POST)
    public ResponseModel UpdateGallaries(@RequestBody Gallaries gl) {
        LOGGER.debug("afetr Test : {0}" + gl.toString());
        try{
            URI uri = new URI(gl.getImageName());
            String path = uri.getPath();
            String idStr = path.substring(path.lastIndexOf('/') + 1);
            int id = Integer.parseInt(idStr);
            gl.setImageName(idStr);
            uri = new URI(gl.getThumbnailImageName());
            path = uri.getPath();
            idStr = path.substring(path.lastIndexOf('/') + 1);
            gl.setThumbnailImageName(idStr);
        }catch(Exception err){}
        LOGGER.debug("afetr Test : {0}" + gl.toString());
        return gallariesService.UpdateGalleries(gl);
    }


    /**
     * POST /uploadFile -> receive and locally save a file.
     *
     * @param uploadfile The uploaded file as Multipart file parameter in the
     * HTTP request. The RequestParam name must be the same of the attribute
     * "name" in the input tag with type file.
     *
     * @return An http OK status in case of success, an http 4xx status in case
     * of errors.
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") Integer type,
            @RequestParam("auditid") Long auditid,
            @RequestParam("createdby") Long createdby,
            @RequestParam("description") String description,
            @RequestParam(value = "uniqueId", required = false, defaultValue = "") String uniqueId
    ) {
        LOGGER.debug("Entered into Upload");
        CryptoUtil crypt =new CryptoUtil();
        ResponseModel response = null;
        Gallaries avatar = new Gallaries();
        try {

            long unixTime = System.currentTimeMillis() / 1000L;

            // Get the filename and build the local file path
            String directory = env.getProperty("sasta.paths.gallariesImages");
            String thumbnail = env.getProperty("sasta.paths.gallariesImages.thumbnail");

            String filename = file.getOriginalFilename();
            String thumbnailFilename  = file.getOriginalFilename();

            filename = Long.toString(unixTime) + filename;
            thumbnailFilename = "thumnail" + Long.toString(unixTime) + thumbnailFilename;

            filename = TextUtil.stripExtension(filename);
            thumbnailFilename = TextUtil.stripExtension(thumbnailFilename);


            filename = Constants.removeSpecialCharacters(crypt.encrypt(Constants.SALT_KEY, filename));
            thumbnailFilename = Constants.removeSpecialCharacters(crypt.encrypt(Constants.SALT_KEY, thumbnailFilename));


            String filepath = Paths.get(directory, filename).toString()+".png";
            String thumbnailFilepath = Paths.get(thumbnail, thumbnailFilename ).toString()+".png";

            LOGGER.debug("Entered into Upload" + filepath);
            // Save the file locally
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(file.getBytes());
            stream.close();

            BufferedImage img = new BufferedImage(600, 400, BufferedImage.TYPE_INT_RGB);
            img.createGraphics().drawImage(ImageIO.read(new File(filepath)).getScaledInstance(600, 400, Image.SCALE_SMOOTH), 0, 0, null);
            ImageIO.write(img, "png", new File(thumbnailFilepath));

            LOGGER.debug("Entered into Upload" + filepath);
            LOGGER.debug("Entered into Upload" + thumbnailFilepath);
            BufferedImage bimg  = ImageIO.read(new File( thumbnailFilepath));
            int width           = bimg.getWidth();
            int height          = bimg.getHeight();
            avatar.setImageName(filename + ".png");
            avatar.setImageSize(file.getBytes().length);
            avatar.setImageHeight(height);
            avatar.setImageWidth(width);
            avatar.setDescription(description);
            avatar.setAuditId(auditid);
            avatar.setImageNiceName(thumbnailFilename + ".png");
            avatar.setThumbnailImageName(thumbnailFilename + ".png");
            avatar.setThumbnailHeight(height);
            avatar.setThumbnailWidth(width);
            avatar.setTypeId(type);
            avatar.setCreatedBy(createdby);
            avatar.setModifiedBy(createdby);

            if(uniqueId != null){
                if(!uniqueId.isEmpty()){
                    avatar.setId(Long.valueOf(uniqueId).longValue());
                }
            }
            LOGGER.debug("afetr Test : {0}" + avatar.toString());
            if(avatar.getId()== null){
                LOGGER.debug("Avatar : {0}" + avatar.toString());
                response = gallariesService.AddGalleries(avatar);
            }else{
                LOGGER.debug("Avatar : {0}" + avatar.toString());
                response = gallariesService.UpdateGalleries(avatar);
            }
        }
        catch (Exception e) {
            response.setStatus(false);
            response.setData(e.getMessage());
        }

        return response;
    } // method uploadFile

}
