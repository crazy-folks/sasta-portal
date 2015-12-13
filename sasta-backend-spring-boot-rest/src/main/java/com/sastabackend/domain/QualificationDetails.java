package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Created by SARVA on 18/Nov/2015.
 */
@Entity(name="user_qualification_details")
public class QualificationDetails {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private Integer qualification_id;
    private Long user_id;
    private Long proof_id;
    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;

    public QualificationDetails(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQualificationId() {
        return qualification_id;
    }

    public void setQualificationId(Integer qualification_id) {
        this.qualification_id = qualification_id;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public Long getProofId() {
        return proof_id;
    }

    public void setProofId(Long proof_id) {
        this.proof_id = proof_id;
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

    @Override
    public String toString() {
        return "QualificationDetails{" +
                "id=" + id +
                ", qualification_id=" + qualification_id +
                ", user_id=" + user_id +
                ", proof_id=" + proof_id +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                '}';
    }
}
