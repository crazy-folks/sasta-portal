package com.sastabackend.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
/**
 * Created by Sarvaratchagan on 13-06-2016.
 */
@Entity(name="post_images")
public class Posts implements java.io.Serializable{

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String image_name;
    private String image_nice_name;
    private String description;
    private Integer image_height;
    private Integer image_width;
    private Integer image_size;
    private String thumbnail_image_name;
    private Integer thumbnail_height;
    private Integer thumbnail_width;
    private java.sql.Timestamp uploaded_date;
    private Boolean is_deleted;
    private Boolean deleted_date;
    private Integer type_id;
    private Long user_id;
    private Long created_by;
    private Long modified_by;

    public Posts(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageName() {
        return image_name;
    }

    public void setImageName(String image_name) {
        this.image_name = image_name;
    }

    public String getImageNiceName() {
        return image_nice_name;
    }

    public void setImageNiceName(String image_nice_name) {
        this.image_nice_name = image_nice_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getImageHeight() {
        return image_height;
    }

    public void setImageHeight(Integer image_height) {
        this.image_height = image_height;
    }

    public Integer getImageWidth() {
        return image_width;
    }

    public void setImageWidth(Integer image_width) {
        this.image_width = image_width;
    }

    public Integer getImageSize() {
        return image_size;
    }

    public void setImageSize(Integer image_size) {
        this.image_size = image_size;
    }

    public String getThumbnailImageName() {
        return thumbnail_image_name;
    }

    public void setThumbnailImageName(String thumbnail_image_name) {
        this.thumbnail_image_name = thumbnail_image_name;
    }

    public Integer getThumbnailHeight() {
        return thumbnail_height;
    }

    public void setThumbnailHeight(Integer thumbnail_height) {
        this.thumbnail_height = thumbnail_height;
    }

    public Integer getThumbnailWidth() {
        return thumbnail_width;
    }

    public void setThumbnailWidth(Integer thumbnail_width) {
        this.thumbnail_width = thumbnail_width;
    }

    public Timestamp getUploadedDate() {
        return uploaded_date;
    }

    public void setUploadedDate(Timestamp uploaded_date) {
        this.uploaded_date = uploaded_date;
    }

    public Boolean getIsDeleted() {
        return is_deleted;
    }

    public void setIsDeleted(Boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public Boolean getDeletedDate() {
        return deleted_date;
    }

    public void setDeletedDate(Boolean deleted_date) {
        this.deleted_date = deleted_date;
    }

    public Integer getTypeId() {
        return type_id;
    }

    public void setTypeId(Integer type_id) {
        this.type_id = type_id;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public Long getCreatedBy() {
        return created_by;
    }

    public void setCreatedBy(Long created_by) {
        this.created_by = created_by;
    }

    public Long getModifiedBy() {
        return modified_by;
    }

    public void setModifiedBy(Long modified_by) {
        this.modified_by = modified_by;
    }

    @Override
    public String toString() {
        return "Posts{" +
                "id=" + id +
                ", image_name='" + image_name + '\'' +
                ", image_nice_name='" + image_nice_name + '\'' +
                ", description='" + description + '\'' +
                ", image_height=" + image_height +
                ", image_width=" + image_width +
                ", image_size=" + image_size +
                ", thumbnail_image_name='" + thumbnail_image_name + '\'' +
                ", thumbnail_height=" + thumbnail_height +
                ", thumbnail_width=" + thumbnail_width +
                ", uploaded_date=" + uploaded_date +
                ", is_deleted=" + is_deleted +
                ", deleted_date=" + deleted_date +
                ", type_id=" + type_id +
                ", user_id=" + user_id +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                '}';
    }
}
