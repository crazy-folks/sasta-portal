package com.sastabackend.util;

/**
 * Created by SARVA on 21/Dec/2015.
 */
public class Constants {
    public static String Empty = "";
    public static String IMAGE_PATH ="image_path";
    public static String HOST_PATH ="host_path";
    public static String IMAGE_URL ="image_url";
    public static String SALT_KEY = "SASTA~!@#$%^&*()";

    /**
     * Replace everything that is not word characters, using negated character class
     * @param value
     * @return
     */
    public static String removeSpecialCharacters(String value){
        return value.replaceAll("[^\\w]", "");
    }
}
