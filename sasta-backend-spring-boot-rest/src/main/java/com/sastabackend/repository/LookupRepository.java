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

    public List<Lookup> findLookupData(int value,String where){
        List<Lookup> _list = new java.util.ArrayList();
        _list = jdbc.query(buildQuery(value,where), userMapper);
        return _list;
    }

    public String buildQuery(int value,String clause){
        LookupType type = LookupType.GetValue(value);
        StringBuilder builder = new StringBuilder();
        StringBuilder where = new StringBuilder();
        where.append(" where is_active=1 ");
        builder.append("select id as 'value',name as 'text' from ");
        switch(type){
            case AuditBlocks:
                builder.append("audit_blocks");
                if(!clause.isEmpty() && clause != null) {
                    where.append(" and district_id = ".concat(clause));
                }
                break;
            case AuditDistricts:
                    builder.append("audit_district");
                    if(!clause.isEmpty() && clause != null) {
                        where.append(" and audit_state_id =".concat(clause));
                    }
                break;
            case AuditStates:
                builder.append("audit_state");
                if(!clause.isEmpty() && clause != null) {
                    where.append(" and country_id =".concat(clause));
                }
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
                if(!clause.isEmpty()&& clause != null) {
                    where.append(" and audit_block_id =".concat(clause));
                }
                break;
            case Users:
                builder = new StringBuilder();
                builder.append("select id as 'value',CONCAT(CONCAT(first_name, ' '),last_name) as 'text' from users");
                break;
            default:
                throw new RuntimeException("Invalid Look up request");
        }
        builder.append(" ");
        builder.append(where.toString());
        return builder.toString();
    }

    private static final RowMapper<Lookup> userMapper = new RowMapper<Lookup>() {
        public Lookup mapRow(ResultSet rs, int rowNum) throws SQLException {
            Lookup l = new Lookup(rs.getInt("value"), rs.getString("text"));
            return l;
        }
    };
}
