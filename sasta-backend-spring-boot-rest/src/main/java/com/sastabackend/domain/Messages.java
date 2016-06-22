package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by Sarvaratchagan on 19-06-2016.
 */
@Entity(name="messages")
public class Messages {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private String title;
    private String content;
    private Boolean is_active;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private String created_by_Name;
    private String modified_by_Name;

    public Messages(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }

    public Timestamp getCreatedDate() {
        return created_date;
    }

    public void setCreatedDate(Timestamp created_date) {
        this.created_date = created_date;
    }

    public Timestamp getModifiedDate() {
        return modified_date;
    }

    public void setModifiedDate(Timestamp modified_date) {
        this.modified_date = modified_date;
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

    public String getCreatedByName() {
        return this.created_by_Name;
    }


    public void setCreatedByName(String createByName) {
        this.created_by_Name = createByName;
    }


    public String getModifiedByName() {
        return this.modified_by_Name;
    }


    public void setModifiedByName(String modifiedByName) {
        this.modified_by_Name = modifiedByName;
    }

    public Boolean getStatus() {
        return this.is_active;
    }


    public void setStatus(Boolean is_active) {
        this.is_active = is_active;
    }

    @Override
    public String toString() {
        return "Messages{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", is_active=" + is_active +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                '}';
    }
}
