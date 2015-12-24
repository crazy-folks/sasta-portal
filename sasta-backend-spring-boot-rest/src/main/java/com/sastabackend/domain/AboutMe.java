package com.sastabackend.domain;

/**
 * Created by SARVA on 22/Dec/2015.
 */
public class AboutMe {
    private String image;
    private String description;
    private Long user_id;

    public AboutMe(){}

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "AboutMe{" +
                "image='" + image + '\'' +
                ", description='" + description + '\'' +
                ", user_id=" + user_id +
                '}';
    }
}
