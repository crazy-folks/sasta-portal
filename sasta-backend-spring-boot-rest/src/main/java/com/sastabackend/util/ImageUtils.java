package com.sastabackend.util;

/**
 * Created by SARVA on 12/Nov/2015.
 * https://github.com/CarloMicieli/spring-mvc-movies/blob/master/src/main/java/com/github/carlomicieli/nerdmovies/utility/ImageUtils.java
 * http://www.journaldev.com/2573/spring-mvc-file-upload-example-tutorial-single-and-multiple-files
 * http://www.concretepage.com/spring-4/spring-4-mvc-single-multiple-file-upload-example-with-tomcat
 */
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import static org.imgscalr.Scalr.*;

/**
 * @author Carlo Micieli
 */
public class ImageUtils {
    public static byte[] createThumbnail(MultipartFile file, int targetSize) throws IOException {
        validateFile(file);

        final BufferedImage image = convertToImage(file);
        final BufferedImage thumb = pad(
                resize(image, Method.SPEED, targetSize, OP_ANTIALIAS, OP_BRIGHTER), 2);

        return convertToArray(thumb, file.getContentType());
    }

    public static byte[] convert(MultipartFile file) throws IOException {
        validateFile(file);
        return file.getBytes();
    }

    private static void validateFile(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        if (!contentType.equals(MediaType.IMAGE_JPEG.toString()) && !contentType.equals(MediaType.IMAGE_PNG.toString()))
            throw new IOException("Invalid media type");
    }

    private static BufferedImage convertToImage(MultipartFile file) throws IOException {
        InputStream in = new ByteArrayInputStream(file.getBytes());
        return ImageIO.read(in);
    }

    private static byte[] convertToArray(BufferedImage image, String contentType) throws IOException {
        byte[] imageInByte;

        String typeName = "jpg";
        if (contentType.equals(MediaType.IMAGE_PNG))
            typeName = "png";

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, typeName, baos);
        baos.flush();
        imageInByte = baos.toByteArray();
        baos.close();

        return imageInByte;
    }
}
