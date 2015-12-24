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
    public static Integer AVATAR_IMAGE_TYPE = 1;
    public static Integer BIRTH_CERTICATE_PROOF = 2;
    public static Integer QUALIFICATION_PROOF = 3;
    public static Integer BIRTH_PROOF = 4;
    /**
     * Replace everything that is not word characters, using negated character class
     * @param value
     * @return
     */
    public static String removeSpecialCharacters(String value){
        return value.replaceAll("[^\\w]", "");
    }
}
