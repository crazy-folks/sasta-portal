package com.sastabackend.service.deviation;

import com.sastabackend.domain.Deviation;
import com.sastabackend.domain.MisAppropriation;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.repository.DeviationRepository;
import com.sastabackend.util.BaseRowMapper;
import com.sastabackend.util.TextUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SARVA on 26/Dec/2015.
 */
@Service
@Validated
public class DeviationServiceImpl implements DeviationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviationServiceImpl.class);
    private final DeviationRepository repository;

    @Inject
    public DeviationServiceImpl(final DeviationRepository repository ){
        this.repository = repository;
    }


    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Deviation  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Deviation>();
            response.setData(selectDeviationData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Long userid,Long auditid) {
        LOGGER.debug("Reading Deviation  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Deviation>>();
            response.setData(readList(userid, auditid));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Deviation dv) {
        LOGGER.debug("Creating  Deviation : {}", dv.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(dv);
            response.setStatus(flag);
            response.setData(flag == true ? " Deviation Added Successfully!!" : "Unable to add Deviation!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Deviation dv) {
        LOGGER.debug("Updating  Deviation :{}", dv.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(dv);
            response.setStatus(flag);
            response.setData(flag == true ? "Deviation Updated Successfully!!" : "Unable to update Deviation!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Read All Deviation based on end user search criteria
     * @param prop
     * @return - Success - List Of Deviation, If fail empty list
     */
    @Override
    public ResponseModel getDeviationsReports(ReportsProperty prop){
        LOGGER.debug("Reading Deviation  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Deviation>>();
            response.setData(readDeviationReports(prop));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }


    private boolean Create(Deviation dv)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_deviation")
                .declareParameters(
                        new SqlParameter("auditid",Types.BIGINT),
                        new SqlParameter("jcmisusedbyotherscount",Types.INTEGER),
                        new SqlParameter("jcmisusedbyothersamt",Types.DECIMAL),
                        new SqlParameter("wagespaidworkerswithoutjccount",Types.INTEGER),
                        new SqlParameter("wagespaidworkerswithoutjcamt",Types.DECIMAL),
                        new SqlParameter("wagespaidwithoutrecordmesurementcount",Types.INTEGER),
                        new SqlParameter("wagespaidwithoutrecordmesurementamt",Types.DECIMAL),
                        new SqlParameter("wagespaidexcessmbooksvaluecount",Types.INTEGER),
                        new SqlParameter("wagespaidexcessmbooksvalueamt",Types.DECIMAL),
                        new SqlParameter("variationsbetweenNMRregistercount",Types.INTEGER),
                        new SqlParameter("variationsbetweenNMRregisteramt",Types.DECIMAL),
                        new SqlParameter("NMRoverwritingcorrectionscount",Types.INTEGER),
                        new SqlParameter("NMRoverwritingcorrectionsamt",Types.DECIMAL),
                        new SqlParameter("ineligibleworkersincludeunder18count",Types.INTEGER),
                        new SqlParameter("ineligibleworkersincludeunder18amt",Types.DECIMAL),
                        new SqlParameter("diffonlineNMRphysicalNMRcount",Types.INTEGER),
                        new SqlParameter("diffonlineNMRphysicalNMRamt",Types.DECIMAL),
                        new SqlParameter("wagespaymentfromschemecount",Types.INTEGER),
                        new SqlParameter("wagespaymentfromschemeamt",Types.DECIMAL),
                        new SqlParameter("amountmorethanNMRFTOcount",Types.INTEGER),
                        new SqlParameter("amountmorethanNMRFTOamt",Types.DECIMAL),
                        new SqlParameter("NMRnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("NMRnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("mbooksnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("mbooksnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("shortagemeasurementscount",Types.INTEGER),
                        new SqlParameter("shortagemeasurementsamt",Types.DECIMAL),
                        new SqlParameter("workstakenupwithoutgbapprovalcount",Types.INTEGER),
                        new SqlParameter("workstakenupwithoutgbapprovalamt",Types.DECIMAL),
                        new SqlParameter("estimatesnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("estimatesnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("ASnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("ASnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("TSnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("TSnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("noneadoptionofscheduleratecount",Types.INTEGER),
                        new SqlParameter("noneadoptionofschedulerateamt",Types.DECIMAL),
                        /**
                         * Newly Added Columns
                         */
                        new SqlParameter("otherscount", Types.INTEGER),
                        new SqlParameter("othersamount", Types.DECIMAL),

                        new SqlParameter("createdby",Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid",dv.getAuditId());
        inParamMap.put("jcmisusedbyotherscount",dv.getJcMisusedByOthersCount());
        inParamMap.put("jcmisusedbyothersamt",dv.getJcMisusedByOthersAmt());
        inParamMap.put("wagespaidworkerswithoutjccount",dv.getWagesPaidWorkersWithoutJcCount());
        inParamMap.put("wagespaidworkerswithoutjcamt",dv.getWagesPaidWorkersWithoutJcAmt());
        inParamMap.put("wagespaidwithoutrecordmesurementcount",dv.getWagesPaidWithoutRecordMesurementCount());
        inParamMap.put("wagespaidwithoutrecordmesurementamt",dv.getWagesPaidWithoutRecordMesurementAmt());
        inParamMap.put("wagespaidexcessmbooksvaluecount",dv.getWagesPaidExcessMBooksValueCount());
        inParamMap.put("wagespaidexcessmbooksvalueamt",dv.getWagesPaidExcessMBooksValueAmt());
        inParamMap.put("variationsbetweenNMRregistercount",dv.getVariationsBetweenNMRRegisterCount());
        inParamMap.put("variationsbetweenNMRregisteramt",dv.getVariationsBetweenNMRRegisterAmt());
        inParamMap.put("NMRoverwritingcorrectionscount",dv.getNMROverWritingCorrectionsCount());
        inParamMap.put("NMRoverwritingcorrectionsamt",dv.getNMROverWritingCorrectionsAmt());
        inParamMap.put("ineligibleworkersincludeunder18count",dv.getInEligibleWorkersIncludeUnder18Count());
        inParamMap.put("ineligibleworkersincludeunder18amt",dv.getInEligibleWorkersIncludeUnder18Amt());
        inParamMap.put("diffonlineNMRphysicalNMRcount",dv.getDiffOnlineNMRPhysicalNMRCount());
        inParamMap.put("diffonlineNMRphysicalNMRamt",dv.getDiffOnlineNMRPhysicalNMRAmt());
        inParamMap.put("wagespaymentfromschemecount",dv.getWagesPaymentFromSchemeCount());
        inParamMap.put("wagespaymentfromschemeamt",dv.getWagesPaymentFromSchemeAmt());
        inParamMap.put("amountmorethanNMRFTOcount",dv.getAmountMoreThanNMRFTOCount());
        inParamMap.put("amountmorethanNMRFTOamt",dv.getAmountMoreThanNMRFTOAmt());
        inParamMap.put("NMRnotproducedforauditcount",dv.getNMRNotProducedForAuditCount());
        inParamMap.put("NMRnotproducedforauditamt",dv.getNMRNotProducedForAuditAmt());
        inParamMap.put("mbooksnotproducedforauditcount",dv.getMbooksNotProducedForAuditCount());
        inParamMap.put("mbooksnotproducedforauditamt", dv.getMbooksNotProducedForAuditAmt());
        inParamMap.put("shortagemeasurementscount",dv.getShortageMeasurementsCount());
        inParamMap.put("shortagemeasurementsamt",dv.getShortageMeasurementsAmt());
        inParamMap.put("workstakenupwithoutgbapprovalcount",dv.getWorksTakenUpWithoutGbApprovalCount());
        inParamMap.put("workstakenupwithoutgbapprovalamt",dv.getWorksTakenUpWithoutGbApprovalAmt());
        inParamMap.put("estimatesnotproducedforauditcount",dv.getEstimatesNotProducedForAuditCount());
        inParamMap.put("estimatesnotproducedforauditamt",dv.getEstimatesNotProducedForAuditAmt());
        inParamMap.put("ASnotproducedforauditcount",dv.getASNotProducedForAuditCount());
        inParamMap.put("ASnotproducedforauditamt",dv.getASNotProducedForAuditAmt());
        inParamMap.put("TSnotproducedforauditcount",dv.getTSNotProducedForAuditCount());
        inParamMap.put("TSnotproducedforauditamt",dv.getTSNotProducedForAuditAmt());
        inParamMap.put("noneadoptionofscheduleratecount",dv.getNoneAdoptionOfScheduleRateCount());
        inParamMap.put("noneadoptionofschedulerateamt",dv.getNoneAdoptionOfScheduleRateAmt());

        /**
         * Newly Added Columns
         */
        inParamMap.put("otherscount",dv.getOthersCount());
        inParamMap.put("othersamount", dv.getOthersAmount());

        inParamMap.put("createdby",dv.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Deviation dv)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_deviation")
                .declareParameters(
                        new SqlParameter("deviation_id",Types.BIGINT),
                        new SqlParameter("auditid",Types.BIGINT),
                        new SqlParameter("jcmisusedbyotherscount",Types.INTEGER),
                        new SqlParameter("jcmisusedbyothersamt",Types.DECIMAL),
                        new SqlParameter("wagespaidworkerswithoutjccount",Types.INTEGER),
                        new SqlParameter("wagespaidworkerswithoutjcamt",Types.DECIMAL),
                        new SqlParameter("wagespaidwithoutrecordmesurementcount",Types.INTEGER),
                        new SqlParameter("wagespaidwithoutrecordmesurementamt",Types.DECIMAL),
                        new SqlParameter("wagespaidexcessmbooksvaluecount",Types.INTEGER),
                        new SqlParameter("wagespaidexcessmbooksvalueamt",Types.DECIMAL),
                        new SqlParameter("variationsbetweenNMRregistercount",Types.INTEGER),
                        new SqlParameter("variationsbetweenNMRregisteramt",Types.DECIMAL),
                        new SqlParameter("NMRoverwritingcorrectionscount",Types.INTEGER),
                        new SqlParameter("NMRoverwritingcorrectionsamt",Types.DECIMAL),
                        new SqlParameter("ineligibleworkersincludeunder18count",Types.INTEGER),
                        new SqlParameter("ineligibleworkersincludeunder18amt",Types.DECIMAL),
                        new SqlParameter("diffonlineNMRphysicalNMRcount",Types.INTEGER),
                        new SqlParameter("diffonlineNMRphysicalNMRamt",Types.DECIMAL),
                        new SqlParameter("wagespaymentfromschemecount",Types.INTEGER),
                        new SqlParameter("wagespaymentfromschemeamt",Types.DECIMAL),
                        new SqlParameter("amountmorethanNMRFTOcount",Types.INTEGER),
                        new SqlParameter("amountmorethanNMRFTOamt",Types.DECIMAL),
                        new SqlParameter("NMRnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("NMRnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("mbooksnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("mbooksnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("shortagemeasurementscount",Types.INTEGER),
                        new SqlParameter("shortagemeasurementsamt",Types.DECIMAL),
                        new SqlParameter("workstakenupwithoutgbapprovalcount",Types.INTEGER),
                        new SqlParameter("workstakenupwithoutgbapprovalamt",Types.DECIMAL),
                        new SqlParameter("estimatesnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("estimatesnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("ASnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("ASnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("TSnotproducedforauditcount",Types.INTEGER),
                        new SqlParameter("TSnotproducedforauditamt",Types.DECIMAL),
                        new SqlParameter("noneadoptionofscheduleratecount",Types.INTEGER),
                        new SqlParameter("noneadoptionofschedulerateamt",Types.DECIMAL),
                        /**
                         * Newly Added Columns
                         */
                        new SqlParameter("otherscount", Types.INTEGER),
                        new SqlParameter("othersamount", Types.DECIMAL),

                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("deviation_id", dv.getId());
        inParamMap.put("auditid",dv.getAuditId());
        inParamMap.put("jcmisusedbyotherscount",dv.getJcMisusedByOthersCount());
        inParamMap.put("jcmisusedbyothersamt",dv.getJcMisusedByOthersAmt());
        inParamMap.put("wagespaidworkerswithoutjccount",dv.getWagesPaidWorkersWithoutJcCount());
        inParamMap.put("wagespaidworkerswithoutjcamt",dv.getWagesPaidWorkersWithoutJcAmt());
        inParamMap.put("wagespaidwithoutrecordmesurementcount",dv.getWagesPaidWithoutRecordMesurementCount());
        inParamMap.put("wagespaidwithoutrecordmesurementamt",dv.getWagesPaidWithoutRecordMesurementAmt());
        inParamMap.put("wagespaidexcessmbooksvaluecount",dv.getWagesPaidExcessMBooksValueCount());
        inParamMap.put("wagespaidexcessmbooksvalueamt",dv.getWagesPaidExcessMBooksValueAmt());
        inParamMap.put("variationsbetweenNMRregistercount",dv.getVariationsBetweenNMRRegisterCount());
        inParamMap.put("variationsbetweenNMRregisteramt",dv.getVariationsBetweenNMRRegisterAmt());
        inParamMap.put("NMRoverwritingcorrectionscount",dv.getNMROverWritingCorrectionsCount());
        inParamMap.put("NMRoverwritingcorrectionsamt",dv.getNMROverWritingCorrectionsAmt());
        inParamMap.put("ineligibleworkersincludeunder18count",dv.getInEligibleWorkersIncludeUnder18Count());
        inParamMap.put("ineligibleworkersincludeunder18amt",dv.getInEligibleWorkersIncludeUnder18Amt());
        inParamMap.put("diffonlineNMRphysicalNMRcount",dv.getDiffOnlineNMRPhysicalNMRCount());
        inParamMap.put("diffonlineNMRphysicalNMRamt",dv.getDiffOnlineNMRPhysicalNMRAmt());
        inParamMap.put("wagespaymentfromschemecount",dv.getWagesPaymentFromSchemeCount());
        inParamMap.put("wagespaymentfromschemeamt",dv.getWagesPaymentFromSchemeAmt());
        inParamMap.put("amountmorethanNMRFTOcount",dv.getAmountMoreThanNMRFTOCount());
        inParamMap.put("amountmorethanNMRFTOamt",dv.getAmountMoreThanNMRFTOAmt());
        inParamMap.put("NMRnotproducedforauditcount",dv.getNMRNotProducedForAuditCount());
        inParamMap.put("NMRnotproducedforauditamt",dv.getNMRNotProducedForAuditAmt());
        inParamMap.put("mbooksnotproducedforauditcount",dv.getMbooksNotProducedForAuditCount());
        inParamMap.put("mbooksnotproducedforauditamt", dv.getMbooksNotProducedForAuditAmt());
        inParamMap.put("shortagemeasurementscount",dv.getShortageMeasurementsCount());
        inParamMap.put("shortagemeasurementsamt",dv.getShortageMeasurementsAmt());
        inParamMap.put("workstakenupwithoutgbapprovalcount",dv.getWorksTakenUpWithoutGbApprovalCount());
        inParamMap.put("workstakenupwithoutgbapprovalamt",dv.getWorksTakenUpWithoutGbApprovalAmt());
        inParamMap.put("estimatesnotproducedforauditcount",dv.getEstimatesNotProducedForAuditCount());
        inParamMap.put("estimatesnotproducedforauditamt",dv.getEstimatesNotProducedForAuditAmt());
        inParamMap.put("ASnotproducedforauditcount",dv.getASNotProducedForAuditCount());
        inParamMap.put("ASnotproducedforauditamt",dv.getASNotProducedForAuditAmt());
        inParamMap.put("TSnotproducedforauditcount",dv.getTSNotProducedForAuditCount());
        inParamMap.put("TSnotproducedforauditamt",dv.getTSNotProducedForAuditAmt());
        inParamMap.put("noneadoptionofscheduleratecount",dv.getNoneAdoptionOfScheduleRateCount());
        inParamMap.put("noneadoptionofschedulerateamt",dv.getNoneAdoptionOfScheduleRateAmt());

        /**
         * Newly Added Columns
         */
        inParamMap.put("otherscount",dv.getOthersCount());
        inParamMap.put("othersamount", dv.getOthersAmount());

        inParamMap.put("modifiedby",dv.getModifiedBy());
        inParamMap.put("isactive",dv.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<Deviation> readList(Long userid,Long auditid){
        List<Deviation> list = jdbcTemplate.query("call select_deviation(?,?)", new Object[]{userid,auditid}, new DeviationMapper());
        return list;
    }

    private Deviation selectDeviationData(Long id){
        List<Deviation> o = new ArrayList<Deviation>();
        o = jdbcTemplate.query("call select_deviation_by_id(?)", new Object[]{id}, new DeviationMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    /**
     * Read All Deviation based on end user search criteria
     * @param prop
     * @return - Success - List Of Deviation, If fail empty list
     */
    private List<Deviation> readDeviationReports(ReportsProperty prop){
        List<Deviation> o = new ArrayList<Deviation>();
        if(!prop.getIsConsolidate())
            o = jdbcTemplate.query("call deviation_reports(?,?,?,?,?,?)",
                    new Object[]{prop.getReferenceId(), prop.getRoundId(), prop.getDistrictId(), prop.getBlockId(), prop.getVillageId(), prop.getUserId()},
                    new DeviationReportsMapper());
        else
            o = jdbcTemplate.query("call deviation_consolidate_reports(?,?)",
                    new Object[]{prop.getReferenceId(), prop.getRoundId()},
                    new DeviationReportsMapper());
            return o;
    }

    protected static final class DeviationReportsMapper extends BaseRowMapper {

        public Object mapRowImpl(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Deviation o = new Deviation();
            if(hasColumn("id"))
                o.setId(set.getLong("id"));
            if(hasColumn("audit_id"))
                o.setAuditId(set.getLong("audit_id"));
            if(hasColumn("fy_name"))
                o.setFinancialYear(set.getString("fy_name"));
            if(hasColumn("round_name"))
                o.setRoundName(set.getString("round_name"));
            if(hasColumn("start_date"))
                o.setRoundStartDate(set.getDate("start_date"));
            if(hasColumn("end_date"))
            o.setRoundEndDate(set.getDate("end_date"));
            if(hasColumn("district_name"))
                o.setDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            if(hasColumn("block_name"))
                o.setBlockName(StringUtils.trimToNull(set.getString("block_name")));
            if(hasColumn("village_name"))
                o.setVpName(StringUtils.trimToNull(set.getString("village_name")));
            o.setJcMisusedByOthersCount(set.getInt("jc_misused_by_others_count"));
            o.setJcMisusedByOthersAmt(set.getBigDecimal("jc_misused_by_others_amt"));
            o.setWagesPaidWorkersWithoutJcCount(set.getInt("wages_paid_workers_without_jc_count"));
            o.setWagesPaidWorkersWithoutJcAmt(set.getBigDecimal("wages_paid_workers_without_jc_amt"));
            o.setWagesPaidWithoutRecordMesurementCount(set.getInt("wages_paid_without_record_mesurement_count"));
            o.setWagesPaidWithoutRecordMesurementAmt(set.getBigDecimal("wages_paid_without_record_mesurement_amt"));
            o.setWagesPaidExcessMBooksValueCount(set.getInt("wages_paid_excess_mbooks_value_count"));
            o.setWagesPaidExcessMBooksValueAmt(set.getBigDecimal("wages_paid_excess_mbooks_value_amt"));
            o.setVariationsBetweenNMRRegisterCount(set.getInt("variations_between_NMR_register_count"));
            o.setVariationsBetweenNMRRegisterAmt(set.getBigDecimal("variations_between_NMR_register_amt"));
            o.setNMROverWritingCorrectionsCount(set.getInt("NMR_overwriting_corrections_count"));
            o.setNMROverWritingCorrectionsAmt(set.getBigDecimal("NMR_overwriting_corrections_amt"));
            o.setInEligibleWorkersIncludeUnder18Count(set.getInt("ineligible_workers_include_under18_count"));
            o.setInEligibleWorkersIncludeUnder18Amt(set.getBigDecimal("ineligible_workers_include_under18_amt"));
            o.setDiffOnlineNMRPhysicalNMRCount(set.getInt("diff_onlineNMR_physicalNMR_count"));
            o.setDiffOnlineNMRPhysicalNMRAmt(set.getBigDecimal("diff_onlineNMR_physicalNMR_amt"));
            o.setWagesPaymentFromSchemeCount(set.getInt("wages_payment_from_scheme_count"));
            o.setWagesPaymentFromSchemeAmt(set.getBigDecimal("wages_payment_from_scheme_amt"));
            o.setAmountMoreThanNMRFTOCount(set.getInt("amount_morethan_NMR_FTO_count"));

            o.setAmountMoreThanNMRFTOAmt(set.getBigDecimal("amount_morethan_NMR_FTO_amt"));
            o.setNMRNotProducedForAuditCount(set.getInt("NMR_not_produced_for_audit_count"));
            o.setNMRNotProducedForAuditAmt(set.getBigDecimal("NMR_not_produced_for_audit_amt"));
            o.setMbooksNotProducedForAuditCount(set.getInt("mbooks_not_produced_for_audit_count"));
            o.setMbooksNotProducedForAuditAmt(set.getBigDecimal("mbooks_not_produced_for_audit_amt"));
            o.setShortageMeasurementsCount(set.getInt("shortage_measurements_count"));
            o.setShortageMeasurementsAmt(set.getBigDecimal("shortage_measurements_amt"));
            o.setWorksTakenUpWithoutGbApprovalCount(set.getInt("works_takenup_without_gb_approval_count"));
            o.setWorksTakenUpWithoutGbApprovalAmt(set.getBigDecimal("works_takenup_without_gb_approval_amt"));
            o.setEstimatesNotProducedForAuditCount(set.getInt("estimates_not_produced_for_audit_count"));
            o.setEstimatesNotProducedForAuditAmt(set.getBigDecimal("estimates_not_produced_for_audit_amt"));
            o.setASNotProducedForAuditCount(set.getInt("AS_not_produced_for_audit_count"));
            o.setASNotProducedForAuditAmt(set.getBigDecimal("AS_not_produced_for_audit_amt"));
            o.setTSNotProducedForAuditCount(set.getInt("TS_not_produced_for_audit_count"));
            o.setTSNotProducedForAuditAmt(set.getBigDecimal("TS_not_produced_for_audit_amt"));
            o.setNoneAdoptionOfScheduleRateCount(set.getInt("none_adoption_ofschedule_rate_count"));
            o.setNoneAdoptionOfScheduleRateAmt(set.getBigDecimal("none_adoption_ofschedule_rate_amt"));

            /**
             * Newly Added columns based on customer request
             */
            o.setOthersCount(set.getInt("others_count"));
            o.setOthersAmount(set.getBigDecimal("others_amt"));

            if(hasColumn("created_date"))
                o.setCreatedDate(set.getTimestamp("created_date"));
            if(hasColumn("modified_date"))
                o.setModifiedDate(set.getTimestamp("modified_date"));
            if(hasColumn("created_by"))
                o.setCreatedBy(set.getLong("created_by"));
            if(hasColumn("modified_by"))
                o.setModifiedBy(set.getLong("modified_by"));
            //o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            //o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            if(hasColumn("is_active"))
                o.setStatus(set.getBoolean("is_active"));
            //LOGGER.debug("Deviations  : {}", o.toString());
            return o;
        }
    }

    protected static final class DeviationMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo) throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Deviation o = new Deviation();
            o.setId(set.getLong("id"));
            o.setAuditId(set.getLong("audit_id"));
            o.setFinancialYear(set.getString("financial_year"));
            o.setFinancialDescription(set.getString("financial_description"));
            o.setRoundId(set.getInt("round_id"));
            o.setRoundName(set.getString("round_name"));
            o.setRoundStartDate(set.getDate("start_date"));
            o.setRoundEndDate(set.getDate("end_date"));
            o.setRoundDescription(StringUtils.trimToNull(set.getString("round_description")));
            o.setAuditDistrictId(set.getInt("audit_district_id"));
            o.setDistrictName(StringUtils.trimToNull(set.getString("district_name")));
            o.setBlockId(set.getInt("audit_block_id"));
            o.setBlockName(StringUtils.trimToNull(set.getString("block_name")));
            o.setVpId(set.getInt("village_panchayat_id"));
            o.setVpName(StringUtils.trimToNull(set.getString("vp_name")));
            o.setJcMisusedByOthersCount(set.getInt("jc_misused_by_others_count"));
            o.setJcMisusedByOthersAmt(set.getBigDecimal("jc_misused_by_others_amt"));
            o.setWagesPaidWorkersWithoutJcCount(set.getInt("wages_paid_workers_without_jc_count"));
            o.setWagesPaidWorkersWithoutJcAmt(set.getBigDecimal("wages_paid_workers_without_jc_amt"));
            o.setWagesPaidWithoutRecordMesurementCount(set.getInt("wages_paid_without_record_mesurement_count"));
            o.setWagesPaidWithoutRecordMesurementAmt(set.getBigDecimal("wages_paid_without_record_mesurement_amt"));
            o.setWagesPaidExcessMBooksValueCount(set.getInt("wages_paid_excess_mbooks_value_count"));
            o.setWagesPaidExcessMBooksValueAmt(set.getBigDecimal("wages_paid_excess_mbooks_value_amt"));
            o.setVariationsBetweenNMRRegisterCount(set.getInt("variations_between_NMR_register_count"));
            o.setVariationsBetweenNMRRegisterAmt(set.getBigDecimal("variations_between_NMR_register_amt"));
            o.setNMROverWritingCorrectionsCount(set.getInt("NMR_overwriting_corrections_count"));
            o.setNMROverWritingCorrectionsAmt(set.getBigDecimal("NMR_overwriting_corrections_amt"));
            o.setInEligibleWorkersIncludeUnder18Count(set.getInt("ineligible_workers_include_under18_count"));
            o.setInEligibleWorkersIncludeUnder18Amt(set.getBigDecimal("ineligible_workers_include_under18_amt"));
            o.setDiffOnlineNMRPhysicalNMRCount(set.getInt("diff_onlineNMR_physicalNMR_count"));
            o.setDiffOnlineNMRPhysicalNMRAmt(set.getBigDecimal("diff_onlineNMR_physicalNMR_amt"));
            o.setWagesPaymentFromSchemeCount(set.getInt("wages_payment_from_scheme_count"));
            o.setWagesPaymentFromSchemeAmt(set.getBigDecimal("wages_payment_from_scheme_amt"));
            o.setAmountMoreThanNMRFTOCount(set.getInt("amount_morethan_NMR_FTO_count"));

            o.setAmountMoreThanNMRFTOAmt(set.getBigDecimal("amount_morethan_NMR_FTO_amt"));
            o.setNMRNotProducedForAuditCount(set.getInt("NMR_not_produced_for_audit_count"));
            o.setNMRNotProducedForAuditAmt(set.getBigDecimal("NMR_not_produced_for_audit_amt"));
            o.setMbooksNotProducedForAuditCount(set.getInt("mbooks_not_produced_for_audit_count"));
            o.setMbooksNotProducedForAuditAmt(set.getBigDecimal("mbooks_not_produced_for_audit_amt"));
            o.setShortageMeasurementsCount(set.getInt("shortage_measurements_count"));
            o.setShortageMeasurementsAmt(set.getBigDecimal("shortage_measurements_amt"));
            o.setWorksTakenUpWithoutGbApprovalCount(set.getInt("works_takenup_without_gb_approval_count"));
            o.setWorksTakenUpWithoutGbApprovalAmt(set.getBigDecimal("works_takenup_without_gb_approval_amt"));
            o.setEstimatesNotProducedForAuditCount(set.getInt("estimates_not_produced_for_audit_count"));
            o.setEstimatesNotProducedForAuditAmt(set.getBigDecimal("estimates_not_produced_for_audit_amt"));
            o.setASNotProducedForAuditCount(set.getInt("AS_not_produced_for_audit_count"));
            o.setASNotProducedForAuditAmt(set.getBigDecimal("AS_not_produced_for_audit_amt"));
            o.setTSNotProducedForAuditCount(set.getInt("TS_not_produced_for_audit_count"));
            o.setTSNotProducedForAuditAmt(set.getBigDecimal("TS_not_produced_for_audit_amt"));
            o.setNoneAdoptionOfScheduleRateCount(set.getInt("none_adoption_ofschedule_rate_count"));
            o.setNoneAdoptionOfScheduleRateAmt(set.getBigDecimal("none_adoption_ofschedule_rate_amt"));

            /**
             * Newly Added columns based on customer request
             */
            o.setOthersCount(set.getInt("others_count"));
            o.setOthersAmount(set.getBigDecimal("others_amt"));

            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Deviations  : {}", o.toString());
            return o;
        }
    }

}
