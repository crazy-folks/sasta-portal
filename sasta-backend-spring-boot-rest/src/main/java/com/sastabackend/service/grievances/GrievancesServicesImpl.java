package com.sastabackend.service.grievances;

import com.sastabackend.domain.*;
import com.sastabackend.repository.GrievancesRepository;
import com.sastabackend.repository.MgnRegaRepository;
import com.sastabackend.util.BaseRowMapper;
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
 * Created by SARVA on 27/Dec/2015.
 */
@Service
@Validated
public class GrievancesServicesImpl implements GrievancesServices {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(GrievancesServicesImpl.class);
    private final GrievancesRepository repository;

    @Inject
    public GrievancesServicesImpl(final GrievancesRepository repository ){
        this.repository = repository;
    }


    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Grievances  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Grievances>();
            response.setData(selectGrievancesData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Long userid,Long auditid) {
        LOGGER.debug("Reading Grievances  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Grievances>>();
            response.setData(readList(userid, auditid));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(Grievances gv) {
        LOGGER.debug("Creating  Grievances : {}", gv.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag =  Create(gv);
            response.setStatus(flag);
            response.setData(flag == true ? " Grievances Added Successfully!!" : "Unable to add Grievances!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(Grievances gv) {
        LOGGER.debug("Updating  Grievances :{}", gv.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(gv);
            response.setStatus(flag);
            response.setData(flag == true ? "Grievances Updated Successfully!!" : "Unable to update Grievances!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Read All Grievances based on end user search criteria
     * @param prop
     * @return - Success - List Of Grievances, If fail empty list
     */
    @Override
    public ResponseModel getGrievancesReports(ReportsProperty prop){
        LOGGER.debug("Reading Grievances Reports  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<Grievances>>();
            response.setData(readGrievancesReports(prop));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean Create(Grievances dv)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_grievences")
                .declareParameters(
                        new SqlParameter("auditid",Types.BIGINT),
                        new SqlParameter("totalreceivedgrievancesHF",Types.INTEGER) ,
                        new SqlParameter("totalreceivedgrievancesmeeting",Types.INTEGER) ,
                        new SqlParameter("reqfornewjc",Types.INTEGER) ,
                        new SqlParameter("reqformorethan100days",Types.INTEGER) ,
                        new SqlParameter("reqforconstructionIHHL",Types.INTEGER) ,
                        new SqlParameter("reqforconstructionIAYhouse",Types.INTEGER) ,
                        new SqlParameter("reqforconstructioncattleshelter",Types.INTEGER) ,
                        new SqlParameter("demandforwork",Types.INTEGER) ,
                        new SqlParameter("demandforreneweljc",Types.INTEGER) ,
                        new SqlParameter("demandforindividualbenefitscheme",Types.INTEGER) ,
                        new SqlParameter("demandforwagesincrease",Types.INTEGER) ,
                        new SqlParameter("demandforpds",Types.INTEGER) ,
                        new SqlParameter("demandforlibrarybuilding",Types.INTEGER) ,
                        new SqlParameter("nonprovisionofworksitefacilities",Types.INTEGER) ,
                        new SqlParameter("complaintagainstbankingcorrespondent",Types.INTEGER) ,
                        new SqlParameter("OAPnotprovidedjc",Types.INTEGER) ,
                        new SqlParameter("OAPnotprovidedwork",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstworksitefacilidator",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstVPpresident",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstunionoverseer",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstBDOVP",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstVPsecretory",Types.INTEGER) ,
                        new SqlParameter("others",Types.INTEGER) ,
                        new SqlParameter("delaywagespaymentcount",Types.INTEGER) ,
                        new SqlParameter("delaywagespaymentamt",Types.DECIMAL) ,
                        new SqlParameter("fullentitlementnotgivencount",Types.INTEGER) ,
                        new SqlParameter("fullentitlementnotgivenamt",Types.DECIMAL) ,
                        new SqlParameter("lesspaymentvaluerecordedMBookcount",Types.INTEGER) ,
                        new SqlParameter("lesspaymentvaluerecordedMBookamt",Types.DECIMAL) ,
                        new SqlParameter("wagesdrawnlessthanactualnodayscount",Types.INTEGER) ,
                        new SqlParameter("wagesdrawnlessthanactualnodaysamt",Types.DECIMAL) ,
                        new SqlParameter("wagesnotpaidworkersactuallyworkedcount",Types.INTEGER) ,
                        new SqlParameter("wagesnotpaidworkersactuallyworkedamt",Types.DECIMAL) ,
                        new SqlParameter("transportallowancenotgivencount",Types.INTEGER) ,
                        new SqlParameter("transportallowancenotgivenamt",Types.DECIMAL) ,
                        new SqlParameter("nocompensationinjuredatworksitecount",Types.INTEGER) ,
                        new SqlParameter("nocompensationinjuredatworksiteamt",Types.DECIMAL) ,
                        new SqlParameter("nocompensationdeadatworksitecount",Types.INTEGER) ,
                        new SqlParameter("nocompensationdeadatworksiteamt",Types.DECIMAL) ,
                        new SqlParameter("reqpaymentcompletedIHHLworkcount",Types.INTEGER) ,
                        new SqlParameter("reqpaymentcompletedIHHLworkamt",Types.DECIMAL) ,
                        new SqlParameter("createdby",Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid",dv.getAuditId());
        inParamMap.put("totalreceivedgrievancesHF",dv.getTotalReceivedGrievancesHF());
        inParamMap.put("totalreceivedgrievancesmeeting",dv.getTotalReceivedGrievancesMeeting());
        inParamMap.put("reqfornewjc",dv.getReqForNewJc());
        inParamMap.put("reqformorethan100days",dv.getReqForMoreThan100Days());
        inParamMap.put("reqforconstructionIHHL",dv.getReqForConstructionIHHL());
        inParamMap.put("reqforconstructionIAYhouse",dv.getReqForConstructionIAYHouse());
        inParamMap.put("reqforconstructioncattleshelter",dv.getReqForConstructionCattleShelter());
        inParamMap.put("demandforwork",dv.getDemandForWork());
        inParamMap.put("demandforreneweljc",dv.getDemandForRenewelJc());
        inParamMap.put("demandforindividualbenefitscheme",dv.getDemandForIndividualBenefitScheme());
        inParamMap.put("demandforwagesincrease",dv.getDemandForWagesIncrease());
        inParamMap.put("demandforpds",dv.getDemandForPds());
        inParamMap.put("demandforlibrarybuilding",dv.getDemandForLibraryBuilding());
        inParamMap.put("nonprovisionofworksitefacilities",dv.getNonProvisionOfWorkSiteFacilities());
        inParamMap.put("complaintagainstbankingcorrespondent",dv.getComplaintAgainstBankingCorrespondent());
        inParamMap.put("OAPnotprovidedjc",dv.getOAPNotProvidedJc());
        inParamMap.put("OAPnotprovidedwork",dv.getOAPNotProvidedWork());
        inParamMap.put("complaintsagainstworksitefacilidator",dv.getComplaintsAgainstWorksiteFacilidator());
        inParamMap.put("complaintsagainstVPpresident",dv.getComplaintsAgainstVPPresident());
        inParamMap.put("complaintsagainstunionoverseer",dv.getComplaintsAgainstUnionOverseer());
        inParamMap.put("complaintsagainstBDOVP",dv.getComplaintsAgainstBDOVP());
        inParamMap.put("complaintsagainstVPsecretory",dv.getComplaintsAgainstVPSecretory());
        inParamMap.put("others",dv.getOthers());
        inParamMap.put("delaywagespaymentcount",dv.getDelayWagesPaymentCount());
        inParamMap.put("delaywagespaymentamt",dv.getDelayWagesPaymentAmt());
        inParamMap.put("fullentitlementnotgivencount",dv.getFullEntitlementNotGivenCount());
        inParamMap.put("fullentitlementnotgivenamt",dv.getFullEntitlementNotGivenAmt());
        inParamMap.put("lesspaymentvaluerecordedMBookcount",dv.getLessPaymentValueRecordedMBookCount());
        inParamMap.put("lesspaymentvaluerecordedMBookamt",dv.getLessPaymentValueRecordedMBookAmt());
        inParamMap.put("wagesdrawnlessthanactualnodayscount",dv.getWagesDrawnLessThanActualNoDaysCount());
        inParamMap.put("wagesdrawnlessthanactualnodaysamt",dv.getWagesDrawnLessThanActualNoDaysAmt());
        inParamMap.put("wagesnotpaidworkersactuallyworkedcount",dv.getWagesNotPaidWorkersActuallyWorkedCount());
        inParamMap.put("wagesnotpaidworkersactuallyworkedamt",dv.getWagesNotPaidWorkersActuallyWorkedAmt());
        inParamMap.put("transportallowancenotgivencount",dv.getTransportAllowanceNotGivenCount());
        inParamMap.put("transportallowancenotgivenamt",dv.getTransportAllowanceNotGivenAmt());
        inParamMap.put("nocompensationinjuredatworksitecount",dv.getNoCompensationInjuredAtWorksiteCount());
        inParamMap.put("nocompensationinjuredatworksiteamt",dv.getNoCompensationInjuredAtWorksiteAmt());
        inParamMap.put("nocompensationdeadatworksitecount",dv.getNoCompensationDeadAtWorksiteCount());
        inParamMap.put("nocompensationdeadatworksiteamt",dv.getNoCompensationDeadAtWorksiteAmt());
        inParamMap.put("reqpaymentcompletedIHHLworkcount",dv.getReqPaymentCompletedIHHLWorkCount());
        inParamMap.put("reqpaymentcompletedIHHLworkamt",dv.getReqPaymentCompletedIHHLWorkAmt());
        inParamMap.put("createdby",dv.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(Grievances dv)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_grievences")
                .declareParameters(
                        new SqlParameter("grievences_id",Types.BIGINT),
                        new SqlParameter("auditid",Types.BIGINT),
                        new SqlParameter("totalreceivedgrievancesHF",Types.INTEGER) ,
                        new SqlParameter("totalreceivedgrievancesmeeting",Types.INTEGER) ,
                        new SqlParameter("reqfornewjc",Types.INTEGER) ,
                        new SqlParameter("reqformorethan100days",Types.INTEGER) ,
                        new SqlParameter("reqforconstructionIHHL",Types.INTEGER) ,
                        new SqlParameter("reqforconstructionIAYhouse",Types.INTEGER) ,
                        new SqlParameter("reqforconstructioncattleshelter",Types.INTEGER) ,
                        new SqlParameter("demandforwork",Types.INTEGER) ,
                        new SqlParameter("demandforreneweljc",Types.INTEGER) ,
                        new SqlParameter("demandforindividualbenefitscheme",Types.INTEGER) ,
                        new SqlParameter("demandforwagesincrease",Types.INTEGER) ,
                        new SqlParameter("demandforpds",Types.INTEGER) ,
                        new SqlParameter("demandforlibrarybuilding",Types.INTEGER) ,
                        new SqlParameter("nonprovisionofworksitefacilities",Types.INTEGER) ,
                        new SqlParameter("complaintagainstbankingcorrespondent",Types.INTEGER) ,
                        new SqlParameter("OAPnotprovidedjc",Types.INTEGER) ,
                        new SqlParameter("OAPnotprovidedwork",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstworksitefacilidator",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstVPpresident",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstunionoverseer",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstBDOVP",Types.INTEGER) ,
                        new SqlParameter("complaintsagainstVPsecretory",Types.INTEGER) ,
                        new SqlParameter("others",Types.INTEGER) ,
                        new SqlParameter("delaywagespaymentcount",Types.INTEGER) ,
                        new SqlParameter("delaywagespaymentamt",Types.DECIMAL) ,
                        new SqlParameter("fullentitlementnotgivencount",Types.INTEGER) ,
                        new SqlParameter("fullentitlementnotgivenamt",Types.DECIMAL) ,
                        new SqlParameter("lesspaymentvaluerecordedMBookcount",Types.INTEGER) ,
                        new SqlParameter("lesspaymentvaluerecordedMBookamt",Types.DECIMAL) ,
                        new SqlParameter("wagesdrawnlessthanactualnodayscount",Types.INTEGER) ,
                        new SqlParameter("wagesdrawnlessthanactualnodaysamt",Types.DECIMAL) ,
                        new SqlParameter("wagesnotpaidworkersactuallyworkedcount",Types.INTEGER) ,
                        new SqlParameter("wagesnotpaidworkersactuallyworkedamt",Types.DECIMAL) ,
                        new SqlParameter("transportallowancenotgivencount",Types.INTEGER) ,
                        new SqlParameter("transportallowancenotgivenamt",Types.DECIMAL) ,
                        new SqlParameter("nocompensationinjuredatworksitecount",Types.INTEGER) ,
                        new SqlParameter("nocompensationinjuredatworksiteamt",Types.DECIMAL) ,
                        new SqlParameter("nocompensationdeadatworksitecount",Types.INTEGER) ,
                        new SqlParameter("nocompensationdeadatworksiteamt",Types.DECIMAL) ,
                        new SqlParameter("reqpaymentcompletedIHHLworkcount",Types.INTEGER) ,
                        new SqlParameter("reqpaymentcompletedIHHLworkamt",Types.DECIMAL) ,
                        new SqlParameter("modifiedby",Types.BIGINT),
                        new SqlParameter("isactive",Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("grievences_id", dv.getId());
        inParamMap.put("auditid",dv.getAuditId());
        inParamMap.put("totalreceivedgrievancesHF",dv.getTotalReceivedGrievancesHF());
        inParamMap.put("totalreceivedgrievancesmeeting",dv.getTotalReceivedGrievancesMeeting());
        inParamMap.put("reqfornewjc",dv.getReqForNewJc());
        inParamMap.put("reqformorethan100days",dv.getReqForMoreThan100Days());
        inParamMap.put("reqforconstructionIHHL",dv.getReqForConstructionIHHL());
        inParamMap.put("reqforconstructionIAYhouse",dv.getReqForConstructionIAYHouse());
        inParamMap.put("reqforconstructioncattleshelter",dv.getReqForConstructionCattleShelter());
        inParamMap.put("demandforwork",dv.getDemandForWork());
        inParamMap.put("demandforreneweljc",dv.getDemandForRenewelJc());
        inParamMap.put("demandforindividualbenefitscheme",dv.getDemandForIndividualBenefitScheme());
        inParamMap.put("demandforwagesincrease",dv.getDemandForWagesIncrease());
        inParamMap.put("demandforpds",dv.getDemandForPds());
        inParamMap.put("demandforlibrarybuilding",dv.getDemandForLibraryBuilding());
        inParamMap.put("nonprovisionofworksitefacilities",dv.getNonProvisionOfWorkSiteFacilities());
        inParamMap.put("complaintagainstbankingcorrespondent",dv.getComplaintAgainstBankingCorrespondent());
        inParamMap.put("OAPnotprovidedjc",dv.getOAPNotProvidedJc());
        inParamMap.put("OAPnotprovidedwork",dv.getOAPNotProvidedWork());
        inParamMap.put("complaintsagainstworksitefacilidator",dv.getComplaintsAgainstWorksiteFacilidator());
        inParamMap.put("complaintsagainstVPpresident",dv.getComplaintsAgainstVPPresident());
        inParamMap.put("complaintsagainstunionoverseer",dv.getComplaintsAgainstUnionOverseer());
        inParamMap.put("complaintsagainstBDOVP",dv.getComplaintsAgainstBDOVP());
        inParamMap.put("complaintsagainstVPsecretory",dv.getComplaintsAgainstVPSecretory());
        inParamMap.put("others",dv.getOthers());
        inParamMap.put("delaywagespaymentcount",dv.getDelayWagesPaymentCount());
        inParamMap.put("delaywagespaymentamt",dv.getDelayWagesPaymentAmt());
        inParamMap.put("fullentitlementnotgivencount",dv.getFullEntitlementNotGivenCount());
        inParamMap.put("fullentitlementnotgivenamt",dv.getFullEntitlementNotGivenAmt());
        inParamMap.put("lesspaymentvaluerecordedMBookcount",dv.getLessPaymentValueRecordedMBookCount());
        inParamMap.put("lesspaymentvaluerecordedMBookamt",dv.getLessPaymentValueRecordedMBookAmt());
        inParamMap.put("wagesdrawnlessthanactualnodayscount",dv.getWagesDrawnLessThanActualNoDaysCount());
        inParamMap.put("wagesdrawnlessthanactualnodaysamt",dv.getWagesDrawnLessThanActualNoDaysAmt());
        inParamMap.put("wagesnotpaidworkersactuallyworkedcount",dv.getWagesNotPaidWorkersActuallyWorkedCount());
        inParamMap.put("wagesnotpaidworkersactuallyworkedamt",dv.getWagesNotPaidWorkersActuallyWorkedAmt());
        inParamMap.put("transportallowancenotgivencount",dv.getTransportAllowanceNotGivenCount());
        inParamMap.put("transportallowancenotgivenamt",dv.getTransportAllowanceNotGivenAmt());
        inParamMap.put("nocompensationinjuredatworksitecount",dv.getNoCompensationInjuredAtWorksiteCount());
        inParamMap.put("nocompensationinjuredatworksiteamt",dv.getNoCompensationInjuredAtWorksiteAmt());
        inParamMap.put("nocompensationdeadatworksitecount",dv.getNoCompensationDeadAtWorksiteCount());
        inParamMap.put("nocompensationdeadatworksiteamt",dv.getNoCompensationDeadAtWorksiteAmt());
        inParamMap.put("reqpaymentcompletedIHHLworkcount",dv.getReqPaymentCompletedIHHLWorkCount());
        inParamMap.put("reqpaymentcompletedIHHLworkamt",dv.getReqPaymentCompletedIHHLWorkAmt());
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



    private List<Grievances> readList(Long userid,Long auditid){
        List<Grievances> list = jdbcTemplate.query("call select_grievences(?,?)", new Object[]{userid, auditid}, new GrievancesMapper());
        return list;
    }

    private Grievances selectGrievancesData(Long id){
        List<Grievances> o = new ArrayList<Grievances>();
        o = jdbcTemplate.query("call select_grievences_by_id(?)", new Object[]{id}, new GrievancesMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    /**
     * Read All Grievances based on end user search criteria
     * @param prop
     * @return - Success - List Of Grievances, If fail empty list
     */
    private List<Grievances> readGrievancesReports(ReportsProperty prop){
        List<Grievances> o = new ArrayList<Grievances>();
        if(!prop.getIsConsolidate())
            o = jdbcTemplate.query("call grievances_reports(?,?,?,?,?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId(),prop.getDistrictId(),prop.getBlockId(),prop.getVillageId(),prop.getUserId()},
                    new GrievancesReportMapper());
        else
            o = jdbcTemplate.query("call grievances_consolidate_reports(?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId()},
                    new GrievancesReportMapper());
        return o;
    }

    protected static final class GrievancesReportMapper extends BaseRowMapper {

        public Object mapRowImpl(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Grievances o = new Grievances();
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
            o.setTotalReceivedGrievancesHF(set.getInt("total_received_grievances_HF"));
            o.setTotalReceivedGrievancesMeeting(set.getInt("total_received_grievances_meeting"));
            o.setReqForNewJc(set.getInt("req_for_new_jc"));
            o.setReqForMoreThan100Days(set.getInt("req_for_more_than_100_days"));
            o.setReqForConstructionIHHL(set.getInt("req_for_construction_IHHL"));
            o.setReqForConstructionIAYHouse(set.getInt("req_for_construction_IAY_house"));
            o.setReqForConstructionCattleShelter(set.getInt("req_for_construction_cattle_shelter"));
            o.setDemandForWork(set.getInt("demand_for_work"));
            o.setDemandForRenewelJc(set.getInt("demand_for_renewel_jc"));
            o.setDemandForIndividualBenefitScheme(set.getInt("demand_for_individual_benefit_scheme"));
            o.setDemandForWagesIncrease(set.getInt("demand_for_wages_increase"));
            o.setDemandForPds(set.getInt("demand_for_pds"));
            o.setDemandForLibraryBuilding(set.getInt("demand_for_library_building"));
            o.setNonProvisionOfWorkSiteFacilities(set.getInt("non_provision_of_work_site_facilities"));
            o.setComplaintAgainstBankingCorrespondent(set.getInt("complaint_against_banking_correspondent"));
            o.setOAPNotProvidedJc(set.getInt("OAP_not_provided_jc"));
            o.setOAPNotProvidedWork(set.getInt("OAP_not_provided_work"));
            o.setComplaintsAgainstWorksiteFacilidator(set.getInt("complaints_against_worksite_facilidator"));
            o.setComplaintsAgainstVPPresident(set.getInt("complaints_against_VP_president"));
            o.setComplaintsAgainstUnionOverseer(set.getInt("complaints_against_union_overseer"));
            o.setComplaintsAgainstBDOVP(set.getInt("complaints_against_BDO_VP"));
            o.setComplaintsAgainstVPSecretory(set.getInt("complaints_against_VP_secretory"));
            o.setOthers(set.getInt("others"));
            o.setDelayWagesPaymentCount(set.getInt("delay_wages_payment_count"));
            o.setDelayWagesPaymentAmt(set.getBigDecimal("delay_wages_payment_amt"));
            o.setFullEntitlementNotGivenCount(set.getInt("full_entitlement_not_given_count"));
            o.setFullEntitlementNotGivenAmt(set.getBigDecimal("full_entitlement_not_given_amt"));
            o.setLessPaymentValueRecordedMBookCount(set.getInt("less_payment_value_recorded_MBook_count"));
            o.setLessPaymentValueRecordedMBookAmt(set.getBigDecimal("less_payment_value_recorded_MBook_amt"));
            o.setWagesDrawnLessThanActualNoDaysCount(set.getInt("wages_drawn_less_than_actual_no_days_count"));
            o.setWagesDrawnLessThanActualNoDaysAmt(set.getBigDecimal("wages_drawn_less_than_actual_no_days_amt"));
            o.setWagesNotPaidWorkersActuallyWorkedCount(set.getInt("wages_not_paid_workers_actually_worked_count"));
            o.setWagesNotPaidWorkersActuallyWorkedAmt(set.getBigDecimal("wages_not_paid_workers_actually_worked_amt"));
            o.setTransportAllowanceNotGivenCount(set.getInt("transport_allowance_not_given_count"));
            o.setTransportAllowanceNotGivenAmt(set.getBigDecimal("transport_allowance_not_given_amt"));
            o.setNoCompensationInjuredAtWorksiteCount(set.getInt("no_compensation_injured_at_worksite_count"));
            o.setNoCompensationInjuredAtWorksiteAmt(set.getBigDecimal("no_compensation_injured_at_worksite_amt"));
            o.setNoCompensationDeadAtWorksiteCount(set.getInt("no_compensation_dead_at_worksite_count"));
            o.setNoCompensationDeadAtWorksiteAmt(set.getBigDecimal("no_compensation_dead_at_worksite_amt"));
            o.setReqPaymentCompletedIHHLWorkCount(set.getInt("req_payment_completed_IHHL_work_count"));
            o.setReqPaymentCompletedIHHLWorkAmt(set.getBigDecimal("req_payment_completed_IHHL_work_amt"));
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
            //LOGGER.debug("Grievances  : {}", o.toString());
            return o;
        }
    }

    protected static final class GrievancesMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            Grievances o = new Grievances();
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
            o.setTotalReceivedGrievancesHF(set.getInt("total_received_grievances_HF"));
            o.setTotalReceivedGrievancesMeeting(set.getInt("total_received_grievances_meeting"));
            o.setReqForNewJc(set.getInt("req_for_new_jc"));
            o.setReqForMoreThan100Days(set.getInt("req_for_more_than_100_days"));
            o.setReqForConstructionIHHL(set.getInt("req_for_construction_IHHL"));
            o.setReqForConstructionIAYHouse(set.getInt("req_for_construction_IAY_house"));
            o.setReqForConstructionCattleShelter(set.getInt("req_for_construction_cattle_shelter"));
            o.setDemandForWork(set.getInt("demand_for_work"));
            o.setDemandForRenewelJc(set.getInt("demand_for_renewel_jc"));
            o.setDemandForIndividualBenefitScheme(set.getInt("demand_for_individual_benefit_scheme"));
            o.setDemandForWagesIncrease(set.getInt("demand_for_wages_increase"));
            o.setDemandForPds(set.getInt("demand_for_pds"));
            o.setDemandForLibraryBuilding(set.getInt("demand_for_library_building"));
            o.setNonProvisionOfWorkSiteFacilities(set.getInt("non_provision_of_work_site_facilities"));
            o.setComplaintAgainstBankingCorrespondent(set.getInt("complaint_against_banking_correspondent"));
            o.setOAPNotProvidedJc(set.getInt("OAP_not_provided_jc"));
            o.setOAPNotProvidedWork(set.getInt("OAP_not_provided_work"));
            o.setComplaintsAgainstWorksiteFacilidator(set.getInt("complaints_against_worksite_facilidator"));
            o.setComplaintsAgainstVPPresident(set.getInt("complaints_against_VP_president"));
            o.setComplaintsAgainstUnionOverseer(set.getInt("complaints_against_union_overseer"));
            o.setComplaintsAgainstBDOVP(set.getInt("complaints_against_BDO_VP"));
            o.setComplaintsAgainstVPSecretory(set.getInt("complaints_against_VP_secretory"));
            o.setOthers(set.getInt("others"));
            o.setDelayWagesPaymentCount(set.getInt("delay_wages_payment_count"));
            o.setDelayWagesPaymentAmt(set.getBigDecimal("delay_wages_payment_amt"));
            o.setFullEntitlementNotGivenCount(set.getInt("full_entitlement_not_given_count"));
            o.setFullEntitlementNotGivenAmt(set.getBigDecimal("full_entitlement_not_given_amt"));
            o.setLessPaymentValueRecordedMBookCount(set.getInt("less_payment_value_recorded_MBook_count"));
            o.setLessPaymentValueRecordedMBookAmt(set.getBigDecimal("less_payment_value_recorded_MBook_amt"));
            o.setWagesDrawnLessThanActualNoDaysCount(set.getInt("wages_drawn_less_than_actual_no_days_count"));
            o.setWagesDrawnLessThanActualNoDaysAmt(set.getBigDecimal("wages_drawn_less_than_actual_no_days_amt"));
            o.setWagesNotPaidWorkersActuallyWorkedCount(set.getInt("wages_not_paid_workers_actually_worked_count"));
            o.setWagesNotPaidWorkersActuallyWorkedAmt(set.getBigDecimal("wages_not_paid_workers_actually_worked_amt"));
            o.setTransportAllowanceNotGivenCount(set.getInt("transport_allowance_not_given_count"));
            o.setTransportAllowanceNotGivenAmt(set.getBigDecimal("transport_allowance_not_given_amt"));
            o.setNoCompensationInjuredAtWorksiteCount(set.getInt("no_compensation_injured_at_worksite_count"));
            o.setNoCompensationInjuredAtWorksiteAmt(set.getBigDecimal("no_compensation_injured_at_worksite_amt"));
            o.setNoCompensationDeadAtWorksiteCount(set.getInt("no_compensation_dead_at_worksite_count"));
            o.setNoCompensationDeadAtWorksiteAmt(set.getBigDecimal("no_compensation_dead_at_worksite_amt"));
            o.setReqPaymentCompletedIHHLWorkCount(set.getInt("req_payment_completed_IHHL_work_count"));
            o.setReqPaymentCompletedIHHLWorkAmt(set.getBigDecimal("req_payment_completed_IHHL_work_amt"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Grievances  : {}", o.toString());
            return o;
        }
    }
}