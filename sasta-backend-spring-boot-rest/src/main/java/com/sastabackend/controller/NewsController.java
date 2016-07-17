package com.sastabackend.controller;

import com.sastabackend.domain.Images;
import com.sastabackend.domain.News;
import com.sastabackend.domain.Posts;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.news.NewsService;
import com.sastabackend.service.user.UserService;
import com.sastabackend.service.user.UserServiceImpl;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.sastabackend.util.ImageUtils;
import com.sastabackend.util.TextUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.core.env.Environment;

/**
 * Created by Sarvaratchagan on 10-06-2016.
 */

@RestController
    @RequestMapping("/api/news")
public class NewsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(NewsController.class);

    private final NewsService newsService;
    // The Environment object will be used to read parameters from the
    // application.properties configuration file


    @Autowired
    private Environment env;

    @Inject
    public NewsController(final NewsService newsService) {
        this.newsService = newsService;
    }


    @ApiOperation(value = "Create News", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Add(@RequestBody final News news){
        return newsService.Add(news);
    }

    @ApiOperation(value = "Update News", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody final News news){
        return newsService.Update(news);
    }


    @ApiOperation(value = "Read news list", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/newslist", method = RequestMethod.GET)
    public ResponseModel getList() {
        return newsService.findAll();
    }


    @ApiOperation(value = "Read top 3 news", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/top3news", method = RequestMethod.GET)
    public ResponseModel getTop3News() {
        return newsService.findTop3();
    }

    @ApiOperation(value = "Read News By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getnewsbyid", method = RequestMethod.GET)
    public ResponseModel getNewsById(@RequestParam("id") Long id) {
        return newsService.findOne(id);
    }

    @ApiOperation(value = "delete news by id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/deletenews", method = RequestMethod.GET)
    public ResponseModel DeleteNews(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return newsService.Delete(id);
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
    public ResponseModel uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("type") Integer type,
                                        @RequestParam("createdby") Long createdby,
                                        @RequestParam(value = "uniqueId", required = false, defaultValue = "") String uniqueId
                                    ) {
        LOGGER.debug("Entered into Upload");
        CryptoUtil crypt =new CryptoUtil();
        Posts avatar = new Posts();
        ResponseModel response = null;
        try {

            long unixTime = System.currentTimeMillis() / 1000L;

            // Get the filename and build the local file path
            String directory = env.getProperty("sasta.paths.newsImages");
            String thumbnail = env.getProperty("sasta.paths.newsImages.thumbnail");

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
            BufferedImage bimg = ImageIO.read(new File( thumbnailFilepath));
            int width          = bimg.getWidth();
            int height         = bimg.getHeight();
            avatar.setImageName(filename + ".png");
            avatar.setImageSize(file.getBytes().length);
            avatar.setImageHeight(height);
            avatar.setImageWidth(width);
            avatar.setCreatedBy(createdby);
            avatar.setImageNiceName(thumbnailFilename+".png");
            avatar.setDescription(Constants.Empty);
            avatar.setThumbnailImageName(thumbnailFilename+".png");
            avatar.setThumbnailHeight(height);
            avatar.setThumbnailWidth(width);
            avatar.setTypeId(Constants.NEWS_IMAGE);

            response = newsService.UploadImage(avatar);
        }
        catch (Exception e) {
            response.setStatus(false);
            response.setData(e.getMessage());
        }

        return response;
    } // method uploadFile




}
