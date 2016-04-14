package com.sastabackend.repository;

import com.sastabackend.domain.Lookup;
import com.sastabackend.util.LookupType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger LOGGER = LoggerFactory.getLogger(LookupRepository.class);
    public List<Lookup> findLookupData(int value,String where){
        List<Lookup> _list = new java.util.ArrayList();
        _list = jdbc.query(buildQuery(value,where), userMapper);
        return _list;
    }

    public String buildQuery(int value,String clause){
        LookupType type = LookupType.GetValue(value);
        StringBuilder builder = new StringBuilder();
        StringBuilder where = new StringBuilder();
        where.append(" where is_active = 1 ");
        builder.append("select id as 'value',name as 'text' from ");
        switch(type){
            case AuditBlocks:
                builder.append("audit_blocks");
                if(!clause.isEmpty() && clause != null) {
                    where.append(" and district_id in ( ".concat(clause));
                    where.append(")");
                }
                break;
            case AuditDistricts:
                    builder.append("audit_district");
                    if(!clause.isEmpty() && clause != null) {
                        where.append(" and audit_state_id in ( ".concat(clause));
                        where.append(")");
                    }
                break;
            case AuditStates:
                builder.append("audit_state");
                if(!clause.isEmpty() && clause != null) {
                    where.append(" and country_id in ( ".concat(clause));
                    where.append(")");
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
                builder = new StringBuilder();
                builder.append(" select rnd.id as 'value',concat(rnd.name,' (',fy.name,')') as 'text' from ");
                builder.append(" rounds rnd ");
                builder.append(" inner join financial_year fy on fy.id = rnd.reference_id ");
                where = new StringBuilder("");
                if(!clause.isEmpty()&& clause != null) {
                    where.append(" where rnd.is_active = 1 and rnd.reference_id in ( ".concat(clause));
                    where.append(")");
                }
                break;
            case VillagePanchayats:
                builder.append("village_panchayats");
                if(!clause.isEmpty()&& clause != null) {
                    where.append(" and audit_block_id =".concat(clause));
                }
                break;
            case DistrictsVillagePanchayats:
                builder = new StringBuilder();
                builder.append(" select vil.id as 'value',vil.name as 'text' from village_panchayats vil ");
                builder.append(" inner join audit_blocks blk on blk.id = vil.audit_block_id ");
                builder.append(" inner join audit_district dis on dis.id = blk.district_id ");
                where = new StringBuilder("");
                if(!clause.isEmpty()&& clause != null) {
                    where.append(" where dis.id in( ".concat(clause));
                    where.append(")");
                }
                break;
            case Users:
                builder = new StringBuilder();
                builder.append("select id as 'value',CONCAT(CONCAT(first_name, ' '),last_name) as 'text' from users");
                where = new StringBuilder("");
                if(!clause.isEmpty()&& clause != null) {
                    where.append(" where is_active = 1 and allotted_district in ( ".concat(clause));
                    where.append(")");
                }
                break;
            case UserGroups:
                builder.append("entity_groups");
                break;
            default:
                throw new RuntimeException("Invalid Look up request");
        }
        builder.append(" ");
        builder.append(where.toString());
        //LOGGER.debug("Builder Query :  " + builder.toString());
        return builder.toString();
    }

    private static final RowMapper<Lookup> userMapper = new RowMapper<Lookup>() {
        public Lookup mapRow(ResultSet rs, int rowNum) throws SQLException {
            Lookup l = new Lookup(rs.getInt("value"), rs.getString("text"));
            return l;
        }
    };
}
