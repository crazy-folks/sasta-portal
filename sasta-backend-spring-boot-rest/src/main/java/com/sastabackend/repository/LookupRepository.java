package com.sastabackend.repository;

import com.sastabackend.domain.Lookup;
import com.sastabackend.util.LookupType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by SARVA on 04/Nov/2015.
 */

@Repository
public class LookupRepository {
    @Autowired
    protected JdbcTemplate jdbc;

    public List<Lookup> findLookupData(int value){
        List<Lookup> _list = new java.util.ArrayList();
        _list = jdbc.query(buildQuery(value), userMapper);
        return _list;
    }

    public String buildQuery(int value){
        LookupType type = LookupType.GetValue(value);
        StringBuilder builder = new StringBuilder();
        builder.append("select id as 'value',name as 'text' from ");
        switch(type){
            case AuditBlocks:
                    builder.append("audit_blocks");
                break;
            case AuditDistricts:
                    builder.append("audit_district");
                break;
            case AuditStates:
                builder.append("audit_state");
                break;
            case Bank:
                builder.append("bank_details");
                break;
            case BloodGroups:
                builder.append("blood_groups");
                break;
            case Communities:
                builder.append("communities");
                break;
            case Countries:
                builder.append("countries");
                break;
            case Departments:
                builder.append("departments");
                break;
            case FinancialYear:
                builder.append("financial_year");
                break;
            case Grades:
                builder.append("grade_lookups");
                break;
            case ImageTypes:
                builder.append("image_types");
                break;
            case Qualifications:
                builder.append("qualification");
                break;
            case Rounds:
                builder.append("rounds");
                break;
            case VillagePanchayats:
                builder.append("village_panchayats");
                break;
            case Users:
                builder = new StringBuilder();
                builder.append("select id as 'value',CONCAT(CONCAT(first_name, ' '),last_name) as 'text' from users");
                break;
            default:
                throw new RuntimeException("Invalid Look up request");
        }
        builder.append(" ");
        builder.append("where is_active=1");
        return builder.toString();
    }

    private static final RowMapper<Lookup> userMapper = new RowMapper<Lookup>() {
        public Lookup mapRow(ResultSet rs, int rowNum) throws SQLException {
            Lookup l = new Lookup(Integer.toString(rs.getInt("value")), rs.getString("text"));
            return l;
        }
    };
}
