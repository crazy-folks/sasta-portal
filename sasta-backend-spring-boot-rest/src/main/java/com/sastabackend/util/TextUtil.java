package com.sastabackend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by SARVA on 12/Nov/2015.
 */
public class TextUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(TextUtil.class);
    public static String makeOneWayPasswordWithMD5(String password){
        MessageDigest md = null;
        StringBuffer sb = new StringBuffer();
        try {
            md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte byteData[] = md.digest();
            //convert the byte to hex format method 1
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            //convert the byte to hex format method 2
           /*
            StringBuffer hexString = new StringBuffer();
            for (int i=0;i<byteData.length;i++) {
                String hex=Integer.toHexString(0xff & byteData[i]);
                if(hex.length()==1) hexString.append('0');
                hexString.append(hex);
            }*/
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        LOGGER.debug("Digest(in hex format):: " + sb.toString());
        return sb.toString();
    }
}
