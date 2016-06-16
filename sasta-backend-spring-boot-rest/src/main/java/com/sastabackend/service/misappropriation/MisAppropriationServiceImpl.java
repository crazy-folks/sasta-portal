package com.sastabackend.service.misappropriation;

import com.sastabackend.domain.*;
import com.sastabackend.repository.MisAppropriationRepository;
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
import java.math.BigDecimal;
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
public class MisAppropriationServiceImpl  implements MisAppropriationService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(MisAppropriationService.class);
    private final MisAppropriationRepository repository;

    @Inject
    public MisAppropriationServiceImpl(final MisAppropriationRepository repository ){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Expenditure  : {}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<MisAppropriation>();
            response.setData(selectAuditData(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll(Long userid,Long auditid) {
        LOGGER.debug("Reading Mis Appropriation  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<MisAppropriation>>();
            response.setData(readList(userid, auditid));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Add(MisAppropriation mis) {
        LOGGER.debug("Creating  MisAppropriation : {}", mis.toString());
        ResponseModel response = new ResponseModel<Boolean>();
        try{
            boolean flag=  Create(mis);
            response.setStatus(flag);
            response.setData(flag == true ? " Mis Appropriation Added Successfully!!" : "Unable to add Mis Appropriation!!");
        }catch(Exception err){
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel Update(MisAppropriation mis) {
        LOGGER.debug("Updating  MisAppropriation :{}", mis.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(mis);
            response.setStatus(flag);
            response.setData(flag == true ? "MisAppropriation Updated Successfully!!" : "Unable to update MisAppropriation!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Read All Mis Appropriation based on end user search criteria
     * @param prop
     * @return - Success - List Of Mis Appropriation, If fail empty list
     */
    @Override
    public ResponseModel getMisAppropriationsReports(ReportsProperty prop){
        LOGGER.debug("Reading Mis Appropriation  : {}");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<MisAppropriation>>();
            response.setData(readMisAppropriationsReports(prop));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    private boolean Create(MisAppropriation mis)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_misappropriation")
                .declareParameters(
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("multiplejcissuedworkerscount", Types.INTEGER),
                        new SqlParameter("multiplejcissuedworkersamt", Types.DECIMAL),
                        new SqlParameter("wagedtodeadcount", Types.INTEGER),
                        new SqlParameter("wagedtodeaamtd", Types.DECIMAL),
                        new SqlParameter("wagesnonexistentcount", Types.INTEGER),
                        new SqlParameter("wagesnonexistentamt", Types.DECIMAL),
                        new SqlParameter("wagesmigratedcount", Types.INTEGER),
                        new SqlParameter("wagesmigratedamt", Types.DECIMAL),
                        new SqlParameter("wagescreditedwrongaccountscount", Types.INTEGER),
                        new SqlParameter("wagescreditedwrongaccountsamt", Types.DECIMAL),
                        new SqlParameter("doublewagesscount", Types.INTEGER),
                        new SqlParameter("doublewagesamt", Types.DECIMAL),
                        new SqlParameter("wagespaidtonotworkedcount", Types.INTEGER),
                        new SqlParameter("wagespaidtonotworkedamt", Types.DECIMAL),
                        new SqlParameter("doublewagesWSFcount", Types.INTEGER),
                        new SqlParameter("doublewagesWSFamt", Types.DECIMAL),
                        new SqlParameter("wagespaidsameacccount", Types.INTEGER),
                        new SqlParameter("wagespaidsameaccamt", Types.DECIMAL),
                        new SqlParameter("inclusionbogousFTOcount", Types.INTEGER),
                        new SqlParameter("inclusionbogousFTOamt", Types.DECIMAL),
                        new SqlParameter("missingtanksericount", Types.INTEGER),
                        new SqlParameter("missingtankseriamt", Types.DECIMAL),
                        new SqlParameter("missingcanalcount", Types.INTEGER),
                        new SqlParameter("missingcanalamt", Types.DECIMAL),

                        new SqlParameter("missingroadscount", Types.INTEGER),
                        new SqlParameter("missingroadsamt", Types.DECIMAL),
                        new SqlParameter("missingplantationscount", Types.INTEGER),
                        new SqlParameter("missingplantationsamt", Types.DECIMAL),
                        new SqlParameter("missingihhlscount", Types.INTEGER),
                        new SqlParameter("missingihhlsamt", Types.DECIMAL),
                        new SqlParameter("missingfarmpondcount", Types.INTEGER),
                        new SqlParameter("missingfarmpondamt", Types.DECIMAL),
                        new SqlParameter("missingcattleshedcount", Types.INTEGER),
                        new SqlParameter("missingcattleshedamt", Types.DECIMAL),
                        new SqlParameter("missinggoatshedcount", Types.INTEGER),
                        new SqlParameter("missinggoatshedamt", Types.DECIMAL),
                        new SqlParameter("missingpoultrycount", Types.INTEGER),
                        new SqlParameter("missingpoultryamt", Types.DECIMAL),
                        new SqlParameter("missingmgnregacomponentIAYcount", Types.INTEGER),
                        new SqlParameter("missingmgnregacomponentIAYamt", Types.DECIMAL),
                        new SqlParameter("missingmgnregacomponentGHcount", Types.INTEGER),
                        new SqlParameter("missingmgnregacomponentGHamt", Types.DECIMAL),
                        new SqlParameter("misappropriationbyVPTpresidentcount", Types.INTEGER),
                        new SqlParameter("misappropriationbyVPTpresidentamt", Types.DECIMAL),
                        new SqlParameter("misappropriationbyVPTsecretorycount", Types.INTEGER),
                        new SqlParameter("misappropriationbyVPTsecretoryamt", Types.DECIMAL),
                        new SqlParameter("amountdrawnsameworkcount", Types.INTEGER),
                        new SqlParameter("amountdrawnsameworkamt", Types.DECIMAL),

                        new SqlParameter("wagesdisbursedprevconstructedihhlscount", Types.INTEGER),
                        new SqlParameter("wagesdisbursedprevconstructedihhlsamt", Types.DECIMAL),
                        new SqlParameter("bogusentriesFTOcorretingfluidcount", Types.INTEGER),
                        new SqlParameter("bogusentriesFTOcorretingfluidamt", Types.DECIMAL),
                        new SqlParameter("machineryusedcount", Types.INTEGER),
                        new SqlParameter("machineryusedamt", Types.DECIMAL),
                        new SqlParameter("wagesdrawnmorethanactualworkingdaycount", Types.INTEGER),
                        new SqlParameter("wagesdrawnmorethanactualworkingdayamt", Types.DECIMAL),
                        new SqlParameter("workdonebycontractorscount", Types.INTEGER),
                        new SqlParameter("workdonebycontractorsamt", Types.DECIMAL),

                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("auditid", mis.getAuditId());
        inParamMap.put("multiplejcissuedworkerscount", mis.getMultipleJcIssuedWorkersCount());
        inParamMap.put("multiplejcissuedworkersamt", mis.getMultipleJcIssuedWorkersAmt());
        inParamMap.put("wagedtodeadcount",mis.getWagedToDeadCount());
        inParamMap.put("wagedtodeaamtd", mis.getWagedToDeadAmt());
        inParamMap.put("wagesnonexistentcount", mis.getWagesNonExistentCount());
        inParamMap.put("wagesnonexistentamt", mis.getWagesNonExistentAmt());
        inParamMap.put("wagesmigratedcount", mis.getWagesMigratedCount());
        inParamMap.put("wagesmigratedamt", mis.getWagesMigratedAmt());
        inParamMap.put("wagescreditedwrongaccountscount", mis.getWagesCreditedWrongAccountsCount());
        inParamMap.put("wagescreditedwrongaccountsamt", mis.getWagesCreditedWrongAccountsAmt());
        inParamMap.put("doublewagesscount", mis.getDoubleWagessCount());
        inParamMap.put("doublewagesamt", mis.getDoubleWagesAmt());
        inParamMap.put("wagespaidtonotworkedcount", mis.getWagesPaidToNotWorkedCount());
        inParamMap.put("wagespaidtonotworkedamt", mis.getWagesPaidToNotWorkedAmt());
        inParamMap.put("doublewagesWSFcount", mis.getDoubleWagesWSFCount());
        inParamMap.put("doublewagesWSFamt", mis.getDoubleWagesWSFAmt());
        inParamMap.put("wagespaidsameacccount", mis.getWagesPaidSameAccCount());
        inParamMap.put("wagespaidsameaccamt", mis.getWagesPaidSameAccAmt());
        inParamMap.put("inclusionbogousFTOcount", mis.getInclusionBogousFTOCount());
        inParamMap.put("inclusionbogousFTOamt", mis.getInclusionBogousFTOAmt());
        inParamMap.put("missingtanksericount", mis.getMissingTanksEriCount());
        inParamMap.put("missingtankseriamt", mis.getMissingTanksEriAmt());
        inParamMap.put("missingcanalcount", mis.getMissingCanalCount());
        inParamMap.put("missingcanalamt", mis.getMissingCanalAmt());

        inParamMap.put("missingroadscount", mis.getMissingRoadsCount());
        inParamMap.put("missingroadsamt", mis.getMissingRoadsAmt());
        inParamMap.put("missingplantationscount", mis.getMissingPlantationsCount());
        inParamMap.put("missingplantationsamt", mis.getMissingPlantationsAmt());
        inParamMap.put("missingihhlscount", mis.getMissingIHHLSCount());
        inParamMap.put("missingihhlsamt", mis.getMissingIHHLSAmt());
        inParamMap.put("missingfarmpondcount", mis.getMissingFarmPondCount());
        inParamMap.put("missingfarmpondamt", mis.getMissingFarmPondAmt());
        inParamMap.put("missingcattleshedcount", mis.getMissingCattleShedCount());
        inParamMap.put("missingcattleshedamt", mis.getMissingCattleShedAmt());
        inParamMap.put("missinggoatshedcount", mis.getMissingGoatShedCount());
        inParamMap.put("missinggoatshedamt", mis.getMissingGoatShedAmt());
        inParamMap.put("missingpoultrycount", mis.getMissingPoultryCount());
        inParamMap.put("missingpoultryamt", mis.getMissingPoultryAmt());
        inParamMap.put("missingmgnregacomponentIAYcount", mis.getMissingMgnregaComponentIAYCount());
        inParamMap.put("missingmgnregacomponentIAYamt",mis.getMissingMgnregaComponentIAYAmt());
        inParamMap.put("missingmgnregacomponentGHcount", mis.getMissingMgnregaComponentGHCount());
        inParamMap.put("missingmgnregacomponentGHamt", mis.getMissingMgnregaComponentGHAmt());
        inParamMap.put("misappropriationbyVPTpresidentcount", mis.getMisappropriationByVPTPresidentCount());
        inParamMap.put("misappropriationbyVPTpresidentamt",mis.getMisappropriationByVPTPresidentAmt() );
        inParamMap.put("misappropriationbyVPTsecretorycount", mis.getMisappropriationByVPTSecretoryCount());
        inParamMap.put("misappropriationbyVPTsecretoryamt", mis.getMisappropriationByVPTSecretoryAmt());
        inParamMap.put("amountdrawnsameworkcount", mis.getAmountDrawnSameWorkCount());
        inParamMap.put("amountdrawnsameworkamt", mis.getAmountDrawnSameWorkAmt());

        inParamMap.put("wagesdisbursedprevconstructedihhlscount", mis.getWagesDisbursedPrevConstructedIHHLSCount());
        inParamMap.put("wagesdisbursedprevconstructedihhlsamt", mis.getWagesDisbursedPrevConstructedIHHLSAmt());
        inParamMap.put("bogusentriesFTOcorretingfluidcount",mis.getBogusEntriesFTOCorretingFluidCount());
        inParamMap.put("bogusentriesFTOcorretingfluidamt",mis.getBogusEntriesFTOCorretingFluidAmt() );
        inParamMap.put("machineryusedcount",mis.getMachineryUsedCount());
        inParamMap.put("machineryusedamt", mis.getMachineryUsedAmt());
        inParamMap.put("wagesdrawnmorethanactualworkingdaycount",mis.getWagesDrawnMoreThanActualWorkingDayCount() );
        inParamMap.put("wagesdrawnmorethanactualworkingdayamt", mis.getWagesDrawnMoreThanActualWorkingDayAmt());
        inParamMap.put("workdonebycontractorscount",mis.getWorkDoneByContractorsCount() );
        inParamMap.put("workdonebycontractorsamt", mis.getWorkDoneByContractorsAmt());
        inParamMap.put("createdby", mis.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    private boolean Modify(MisAppropriation mis)  {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_misappropriation")
                .declareParameters(
                        new SqlParameter("misappropriation_id", Types.BIGINT),
                        new SqlParameter("auditid", Types.BIGINT),
                        new SqlParameter("multiplejcissuedworkerscount", Types.INTEGER),
                        new SqlParameter("multiplejcissuedworkersamt", Types.DECIMAL),
                        new SqlParameter("wagedtodeadcount", Types.INTEGER),
                        new SqlParameter("wagedtodeaamtd", Types.DECIMAL),
                        new SqlParameter("wagesnonexistentcount", Types.INTEGER),
                        new SqlParameter("wagesnonexistentamt", Types.DECIMAL),
                        new SqlParameter("wagesmigratedcount", Types.INTEGER),
                        new SqlParameter("wagesmigratedamt", Types.DECIMAL),
                        new SqlParameter("wagescreditedwrongaccountscount", Types.INTEGER),
                        new SqlParameter("wagescreditedwrongaccountsamt", Types.DECIMAL),
                        new SqlParameter("doublewagesscount", Types.INTEGER),
                        new SqlParameter("doublewagesamt", Types.DECIMAL),
                        new SqlParameter("wagespaidtonotworkedcount", Types.INTEGER),
                        new SqlParameter("wagespaidtonotworkedamt", Types.DECIMAL),
                        new SqlParameter("doublewagesWSFcount", Types.INTEGER),
                        new SqlParameter("doublewagesWSFamt", Types.DECIMAL),
                        new SqlParameter("wagespaidsameacccount", Types.INTEGER),
                        new SqlParameter("wagespaidsameaccamt", Types.DECIMAL),
                        new SqlParameter("inclusionbogousFTOcount", Types.INTEGER),
                        new SqlParameter("inclusionbogousFTOamt", Types.DECIMAL),
                        new SqlParameter("missingtanksericount", Types.INTEGER),
                        new SqlParameter("missingtankseriamt", Types.DECIMAL),
                        new SqlParameter("missingcanalcount", Types.INTEGER),
                        new SqlParameter("missingcanalamt", Types.DECIMAL),

                        new SqlParameter("missingroadscount", Types.INTEGER),
                        new SqlParameter("missingroadsamt", Types.DECIMAL),
                        new SqlParameter("missingplantationscount", Types.INTEGER),
                        new SqlParameter("missingplantationsamt", Types.DECIMAL),
                        new SqlParameter("missingihhlscount", Types.INTEGER),
                        new SqlParameter("missingihhlsamt", Types.DECIMAL),
                        new SqlParameter("missingfarmpondcount", Types.INTEGER),
                        new SqlParameter("missingfarmpondamt", Types.DECIMAL),
                        new SqlParameter("missingcattleshedcount", Types.INTEGER),
                        new SqlParameter("missingcattleshedamt", Types.DECIMAL),
                        new SqlParameter("missinggoatshedcount", Types.INTEGER),
                        new SqlParameter("missinggoatshedamt", Types.DECIMAL),
                        new SqlParameter("missingpoultrycount", Types.INTEGER),
                        new SqlParameter("missingpoultryamt", Types.DECIMAL),
                        new SqlParameter("missingmgnregacomponentIAYcount", Types.INTEGER),
                        new SqlParameter("missingmgnregacomponentIAYamt", Types.DECIMAL),
                        new SqlParameter("missingmgnregacomponentGHcount", Types.INTEGER),
                        new SqlParameter("missingmgnregacomponentGHamt", Types.DECIMAL),
                        new SqlParameter("misappropriationbyVPTpresidentcount", Types.INTEGER),
                        new SqlParameter("misappropriationbyVPTpresidentamt", Types.DECIMAL),
                        new SqlParameter("misappropriationbyVPTsecretorycount", Types.INTEGER),
                        new SqlParameter("misappropriationbyVPTsecretoryamt", Types.DECIMAL),
                        new SqlParameter("amountdrawnsameworkcount", Types.INTEGER),
                        new SqlParameter("amountdrawnsameworkamt", Types.DECIMAL),

                        new SqlParameter("wagesdisbursedprevconstructedihhlscount", Types.INTEGER),
                        new SqlParameter("wagesdisbursedprevconstructedihhlsamt", Types.DECIMAL),
                        new SqlParameter("bogusentriesFTOcorretingfluidcount", Types.INTEGER),
                        new SqlParameter("bogusentriesFTOcorretingfluidamt", Types.DECIMAL),
                        new SqlParameter("machineryusedcount", Types.INTEGER),
                        new SqlParameter("machineryusedamt", Types.DECIMAL),
                        new SqlParameter("wagesdrawnmorethanactualworkingdaycount", Types.INTEGER),
                        new SqlParameter("wagesdrawnmorethanactualworkingdayamt", Types.DECIMAL),
                        new SqlParameter("workdonebycontractorscount", Types.INTEGER),
                        new SqlParameter("workdonebycontractorsamt", Types.DECIMAL),

                        new SqlParameter("modifiedby", Types.BIGINT),
						new SqlParameter("isactive", Types.BIT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("misappropriation_id", mis.getId());
        inParamMap.put("auditid", mis.getAuditId());
        inParamMap.put("multiplejcissuedworkerscount", mis.getMultipleJcIssuedWorkersCount());
        inParamMap.put("multiplejcissuedworkersamt", mis.getMultipleJcIssuedWorkersAmt());
        inParamMap.put("wagedtodeadcount",mis.getWagedToDeadCount());
        inParamMap.put("wagedtodeaamtd", mis.getWagedToDeadAmt());
        inParamMap.put("wagesnonexistentcount", mis.getWagesNonExistentCount());
        inParamMap.put("wagesnonexistentamt", mis.getWagesNonExistentAmt());
        inParamMap.put("wagesmigratedcount", mis.getWagesMigratedCount());
        inParamMap.put("wagesmigratedamt", mis.getWagesMigratedAmt());
        inParamMap.put("wagescreditedwrongaccountscount", mis.getWagesCreditedWrongAccountsCount());
        inParamMap.put("wagescreditedwrongaccountsamt", mis.getWagesCreditedWrongAccountsAmt());
        inParamMap.put("doublewagesscount", mis.getDoubleWagessCount());
        inParamMap.put("doublewagesamt", mis.getDoubleWagesAmt());
        inParamMap.put("wagespaidtonotworkedcount", mis.getWagesPaidToNotWorkedCount());
        inParamMap.put("wagespaidtonotworkedamt", mis.getWagesPaidToNotWorkedAmt());
        inParamMap.put("doublewagesWSFcount", mis.getDoubleWagesWSFCount());
        inParamMap.put("doublewagesWSFamt", mis.getDoubleWagesWSFAmt());
        inParamMap.put("wagespaidsameacccount", mis.getWagesPaidSameAccCount());
        inParamMap.put("wagespaidsameaccamt", mis.getWagesPaidSameAccAmt());
        inParamMap.put("inclusionbogousFTOcount", mis.getInclusionBogousFTOCount());
        inParamMap.put("inclusionbogousFTOamt", mis.getInclusionBogousFTOAmt());
        inParamMap.put("missingtanksericount", mis.getMissingTanksEriCount());
        inParamMap.put("missingtankseriamt", mis.getMissingTanksEriAmt());
        inParamMap.put("missingcanalcount", mis.getMissingCanalCount());
        inParamMap.put("missingcanalamt", mis.getMissingCanalAmt());

        inParamMap.put("missingroadscount", mis.getMissingRoadsCount());
        inParamMap.put("missingroadsamt", mis.getMissingRoadsAmt());
        inParamMap.put("missingplantationscount", mis.getMissingPlantationsCount());
        inParamMap.put("missingplantationsamt", mis.getMissingPlantationsAmt());
        inParamMap.put("missingihhlscount", mis.getMissingIHHLSCount());
        inParamMap.put("missingihhlsamt", mis.getMissingIHHLSAmt());
        inParamMap.put("missingfarmpondcount", mis.getMissingFarmPondCount());
        inParamMap.put("missingfarmpondamt", mis.getMissingFarmPondAmt());
        inParamMap.put("missingcattleshedcount", mis.getMissingCattleShedCount());
        inParamMap.put("missingcattleshedamt", mis.getMissingCattleShedAmt());
        inParamMap.put("missinggoatshedcount", mis.getMissingGoatShedCount());
        inParamMap.put("missinggoatshedamt", mis.getMissingGoatShedAmt());
        inParamMap.put("missingpoultrycount", mis.getMissingPoultryCount());
        inParamMap.put("missingpoultryamt", mis.getMissingPoultryAmt());
        inParamMap.put("missingmgnregacomponentIAYcount", mis.getMissingMgnregaComponentIAYCount());
        inParamMap.put("missingmgnregacomponentIAYamt",mis.getMissingMgnregaComponentIAYAmt());
        inParamMap.put("missingmgnregacomponentGHcount", mis.getMissingMgnregaComponentGHCount());
        inParamMap.put("missingmgnregacomponentGHamt", mis.getMissingMgnregaComponentGHAmt());
        inParamMap.put("misappropriationbyVPTpresidentcount", mis.getMisappropriationByVPTPresidentCount());
        inParamMap.put("misappropriationbyVPTpresidentamt",mis.getMisappropriationByVPTPresidentAmt() );
        inParamMap.put("misappropriationbyVPTsecretorycount", mis.getMisappropriationByVPTSecretoryCount());
        inParamMap.put("misappropriationbyVPTsecretoryamt", mis.getMisappropriationByVPTSecretoryAmt());
        inParamMap.put("amountdrawnsameworkcount", mis.getAmountDrawnSameWorkCount());
        inParamMap.put("amountdrawnsameworkamt", mis.getAmountDrawnSameWorkAmt());

        inParamMap.put("wagesdisbursedprevconstructedihhlscount", mis.getWagesDisbursedPrevConstructedIHHLSCount());
        inParamMap.put("wagesdisbursedprevconstructedihhlsamt", mis.getWagesDisbursedPrevConstructedIHHLSAmt());
        inParamMap.put("bogusentriesFTOcorretingfluidcount",mis.getBogusEntriesFTOCorretingFluidCount());
        inParamMap.put("bogusentriesFTOcorretingfluidamt",mis.getBogusEntriesFTOCorretingFluidAmt() );
        inParamMap.put("machineryusedcount",mis.getMachineryUsedCount());
        inParamMap.put("machineryusedamt", mis.getMachineryUsedAmt());
        inParamMap.put("wagesdrawnmorethanactualworkingdaycount",mis.getWagesDrawnMoreThanActualWorkingDayCount() );
        inParamMap.put("wagesdrawnmorethanactualworkingdayamt", mis.getWagesDrawnMoreThanActualWorkingDayAmt());
        inParamMap.put("workdonebycontractorscount",mis.getWorkDoneByContractorsCount() );
        inParamMap.put("workdonebycontractorsamt", mis.getWorkDoneByContractorsAmt());
        inParamMap.put("modifiedby", mis.getModifiedBy());
        inParamMap.put("isactive", mis.getStatus());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    private List<MisAppropriation> readList(Long userid,Long auditid){
        List<MisAppropriation> list = jdbcTemplate.query("call select_misappropriation(?,?)", new Object[]{userid,auditid}, new MisAppropriationMapper());
        return list;
    }

    private MisAppropriation selectAuditData(Long id){
        List<MisAppropriation> o = new ArrayList<MisAppropriation>();
        o = jdbcTemplate.query("call select_misappropriation_by_id(?)", new Object[]{id}, new MisAppropriationMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }

    /**
     * Read All Mis Appropriation based on end user search criteria
     * @param prop
     * @return - Success - List Of Mis Appropriation, If fail empty list
     */
    private List<MisAppropriation> readMisAppropriationsReports(ReportsProperty prop){
        List<MisAppropriation> o = new ArrayList<MisAppropriation>();

        if(!prop.getIsConsolidate())
            o = jdbcTemplate.query("call misappropriation_reports(?,?,?,?,?,?)",
                    new Object[]{prop.getReferenceId(),prop.getRoundId(),prop.getDistrictId(),prop.getBlockId(),prop.getVillageId(),prop.getUserId()},
                    new MisAppropriationReportsMapper());
        else
            o = jdbcTemplate.query("call misappropriation_consolidate_reports(?,?)",
                    new Object[]{prop.getReferenceId(), prop.getRoundId()},
                    new MisAppropriationReportsMapper());
            return o;
    }

    protected static final class MisAppropriationReportsMapper extends BaseRowMapper {

        public Object mapRowImpl(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            MisAppropriation o = new MisAppropriation();
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
            o.setMultipleJcIssuedWorkersCount(set.getInt("multiple_jc_issued_workers_count"));
            o.setMultipleJcIssuedWorkersAmt(set.getBigDecimal("multiple_jc_issued_workers_amt"));
            o.setWagedToDeadCount(set.getInt("waged_to_dead_count"));
            o.setWagedToDeadAmt(set.getBigDecimal("waged_to_dea_amtd"));
            o.setWagesNonExistentCount(set.getInt("wages_nonexistent_count"));
            o.setWagesNonExistentAmt(set.getBigDecimal("wages_nonexistent_amt"));
            o.setWagesMigratedCount(set.getInt("wages_migrated_count"));
            o.setWagesMigratedAmt(set.getBigDecimal("wages_migrated_amt"));
            o.setWagesCreditedWrongAccountsCount(set.getInt("wages_credited_wrong_accounts_count"));
            o.setWagesCreditedWrongAccountsAmt(set.getBigDecimal("wages_credited_wrong_accounts_amt"));
            o.setDoubleWagessCount(set.getInt("double_wagess_count"));
            o.setDoubleWagesAmt(set.getBigDecimal("double_wages_amt"));
            o.setWagesPaidToNotWorkedCount(set.getInt("wages_paid_to_not_worked_count"));
            o.setWagesPaidToNotWorkedAmt(set.getBigDecimal("wages_paid_to_not_worked_amt"));
            o.setDoubleWagesWSFCount(set.getInt("double_wages_WSF_count"));
            o.setDoubleWagesWSFAmt(set.getBigDecimal("double_wages_WSF_amt"));
            o.setWagesPaidSameAccCount(set.getInt("wages_paid_same_acc_count"));
            o.setWagesPaidSameAccAmt(set.getBigDecimal("wages_paid_same_acc_amt"));
            o.setInclusionBogousFTOCount(set.getInt("inclusion_bogous_FTO_count"));

            o.setInclusionBogousFTOAmt(set.getBigDecimal("inclusion_bogous_FTO_amt"));
            o.setMissingTanksEriCount(set.getInt("missing_tanks_eri_count"));
            o.setMissingTanksEriAmt(set.getBigDecimal("missing_tanks_eri_amt"));
            o.setMissingCanalCount(set.getInt("missing_canal_count"));
            o.setMissingCanalAmt(set.getBigDecimal("missing_canal_amt"));
            o.setMissingRoadsCount(set.getInt("missing_roads_count"));
            o.setMissingRoadsAmt(set.getBigDecimal("missing_roads_amt"));
            o.setMissingPlantationsCount(set.getInt("missing_plantations_count"));
            o.setMissingPlantationsAmt(set.getBigDecimal("missing_plantations_amt"));
            o.setMissingIHHLSCount(set.getInt("missing_ihhls_count"));
            o.setMissingIHHLSAmt(set.getBigDecimal("missing_ihhls_amt"));
            o.setMissingFarmPondCount(set.getInt("missing_farm_pond_count"));
            o.setMissingFarmPondAmt(set.getBigDecimal("missing_farm_pond_amt"));
            o.setMissingCattleShedCount(set.getInt("missing_cattle_shed_count"));
            o.setMissingCattleShedAmt(set.getBigDecimal("missing_cattle_shed_amt"));
            o.setMissingGoatShedCount(set.getInt("missing_goat_shed_count"));
            o.setMissingGoatShedAmt(set.getBigDecimal("missing_goat_shed_amt"));
            o.setMissingPoultryCount(set.getInt("missing_poultry_count"));
            o.setMissingPoultryAmt(set.getBigDecimal("missing_poultry_amt"));

            o.setMissingMgnregaComponentIAYCount(set.getInt("missing_mgnrega_component_IAY_count"));
            o.setMissingMgnregaComponentIAYAmt(set.getBigDecimal("missing_mgnrega_component_IAY_amt"));
            o.setMissingMgnregaComponentGHCount(set.getInt("missing_mgnrega_component_GH_count"));
            o.setMissingMgnregaComponentGHAmt(set.getBigDecimal("missing_mgnrega_component_GH_amt"));
            o.setMisappropriationByVPTPresidentCount(set.getInt("misappropriation_by_VPT_president_count"));
            o.setMisappropriationByVPTPresidentAmt(set.getBigDecimal("misappropriation_by_VPT_president_amt"));
            o.setMisappropriationByVPTSecretoryCount(set.getInt("misappropriation_by_VPT_secretory_count"));
            o.setMisappropriationByVPTSecretoryAmt(set.getBigDecimal("misappropriation_by_VPT_secretory_amt"));
            o.setAmountDrawnSameWorkCount(set.getInt("amount_drawn_same_work_count"));
            o.setAmountDrawnSameWorkAmt(set.getBigDecimal("amount_drawn_same_work_amt"));
            o.setWagesDisbursedPrevConstructedIHHLSCount(set.getInt("wages_disbursed_prev_constructed_ihhls_count"));
            o.setWagesDisbursedPrevConstructedIHHLSAmt(set.getBigDecimal("wages_disbursed_prev_constructed_ihhls_amt"));
            o.setBogusEntriesFTOCorretingFluidCount(set.getInt("bogus_entries_FTO_correting_fluid_count"));
            o.setBogusEntriesFTOCorretingFluidAmt(set.getBigDecimal("bogus_entries_FTO_correting_fluid_amt"));
            o.setMachineryUsedCount(set.getInt("machinery_used_count"));
            o.setMachineryUsedAmt(set.getBigDecimal("machinery_used_amt"));
            o.setWagesDrawnMoreThanActualWorkingDayCount(set.getInt("wages_drawn_more_than_actual_working_day_count"));
            o.setWagesDrawnMoreThanActualWorkingDayAmt(set.getBigDecimal("wages_drawn_more_than_actual_working_day_amt"));
            o.setWorkDoneByContractorsCount(set.getInt("work_done_by_contractors_count"));
            o.setWorkDoneByContractorsAmt(set.getBigDecimal("work_done_by_contractors_amt"));
            if(hasColumn("created_date"))
                o.setCreatedDate(set.getTimestamp("created_date"));
            if(hasColumn("modified_date"))
                o.setModifiedDate(set.getTimestamp("modified_date"));
            if(hasColumn("created_by"))
                o.setCreatedBy(set.getLong("created_by"));
            if(hasColumn("modified_by"))
                o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            //o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            if(hasColumn("is_active"))
                o.setStatus(set.getBoolean("is_active"));
            //LOGGER.debug("Mis Appropriation  : {}", o.toString());
            return o;
        }
    }


    protected static final class MisAppropriationMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            MisAppropriation o = new MisAppropriation();
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
            o.setMultipleJcIssuedWorkersCount(set.getInt("multiple_jc_issued_workers_count"));
            o.setMultipleJcIssuedWorkersAmt(set.getBigDecimal("multiple_jc_issued_workers_amt"));
            o.setWagedToDeadCount(set.getInt("waged_to_dead_count"));
            o.setWagedToDeadAmt(set.getBigDecimal("waged_to_dea_amtd"));
            o.setWagesNonExistentCount(set.getInt("wages_nonexistent_count"));
            o.setWagesNonExistentAmt(set.getBigDecimal("wages_nonexistent_amt"));
            o.setWagesMigratedCount(set.getInt("wages_migrated_count"));
            o.setWagesMigratedAmt(set.getBigDecimal("wages_migrated_amt"));
            o.setWagesCreditedWrongAccountsCount(set.getInt("wages_credited_wrong_accounts_count"));
            o.setWagesCreditedWrongAccountsAmt(set.getBigDecimal("wages_credited_wrong_accounts_amt"));
            o.setDoubleWagessCount(set.getInt("double_wagess_count"));
            o.setDoubleWagesAmt(set.getBigDecimal("double_wages_amt"));
            o.setWagesPaidToNotWorkedCount(set.getInt("wages_paid_to_not_worked_count"));
            o.setWagesPaidToNotWorkedAmt(set.getBigDecimal("wages_paid_to_not_worked_amt"));
            o.setDoubleWagesWSFCount(set.getInt("double_wages_WSF_count"));
            o.setDoubleWagesWSFAmt(set.getBigDecimal("double_wages_WSF_amt"));
            o.setWagesPaidSameAccCount(set.getInt("wages_paid_same_acc_count"));
            o.setWagesPaidSameAccAmt(set.getBigDecimal("wages_paid_same_acc_amt"));
            o.setInclusionBogousFTOCount(set.getInt("inclusion_bogous_FTO_count"));

            o.setInclusionBogousFTOAmt(set.getBigDecimal("inclusion_bogous_FTO_amt"));
            o.setMissingTanksEriCount(set.getInt("missing_tanks_eri_count"));
            o.setMissingTanksEriAmt(set.getBigDecimal("missing_tanks_eri_amt"));
            o.setMissingCanalCount(set.getInt("missing_canal_count"));
            o.setMissingCanalAmt(set.getBigDecimal("missing_canal_amt"));
            o.setMissingRoadsCount(set.getInt("missing_roads_count"));
            o.setMissingRoadsAmt(set.getBigDecimal("missing_roads_amt"));
            o.setMissingPlantationsCount(set.getInt("missing_plantations_count"));
            o.setMissingPlantationsAmt(set.getBigDecimal("missing_plantations_amt"));
            o.setMissingIHHLSCount(set.getInt("missing_ihhls_count"));
            o.setMissingIHHLSAmt(set.getBigDecimal("missing_ihhls_amt"));
            o.setMissingFarmPondCount(set.getInt("missing_farm_pond_count"));
            o.setMissingFarmPondAmt(set.getBigDecimal("missing_farm_pond_amt"));
            o.setMissingCattleShedCount(set.getInt("missing_cattle_shed_count"));
            o.setMissingCattleShedAmt(set.getBigDecimal("missing_cattle_shed_amt"));
            o.setMissingGoatShedCount(set.getInt("missing_goat_shed_count"));
            o.setMissingGoatShedAmt(set.getBigDecimal("missing_goat_shed_amt"));
            o.setMissingPoultryCount(set.getInt("missing_poultry_count"));
            o.setMissingPoultryAmt(set.getBigDecimal("missing_poultry_amt"));

            o.setMissingMgnregaComponentIAYCount(set.getInt("missing_mgnrega_component_IAY_count"));
            o.setMissingMgnregaComponentIAYAmt(set.getBigDecimal("missing_mgnrega_component_IAY_amt"));
            o.setMissingMgnregaComponentGHCount(set.getInt("missing_mgnrega_component_GH_count"));
            o.setMissingMgnregaComponentGHAmt(set.getBigDecimal("missing_mgnrega_component_GH_amt"));
            o.setMisappropriationByVPTPresidentCount(set.getInt("misappropriation_by_VPT_president_count"));
            o.setMisappropriationByVPTPresidentAmt(set.getBigDecimal("misappropriation_by_VPT_president_amt"));
            o.setMisappropriationByVPTSecretoryCount(set.getInt("misappropriation_by_VPT_secretory_count"));
            o.setMisappropriationByVPTSecretoryAmt(set.getBigDecimal("misappropriation_by_VPT_secretory_amt"));
            o.setAmountDrawnSameWorkCount(set.getInt("amount_drawn_same_work_count"));
            o.setAmountDrawnSameWorkAmt(set.getBigDecimal("amount_drawn_same_work_amt"));
            o.setWagesDisbursedPrevConstructedIHHLSCount(set.getInt("wages_disbursed_prev_constructed_ihhls_count"));
            o.setWagesDisbursedPrevConstructedIHHLSAmt(set.getBigDecimal("wages_disbursed_prev_constructed_ihhls_amt"));
            o.setBogusEntriesFTOCorretingFluidCount(set.getInt("bogus_entries_FTO_correting_fluid_count"));
            o.setBogusEntriesFTOCorretingFluidAmt(set.getBigDecimal("bogus_entries_FTO_correting_fluid_amt"));
            o.setMachineryUsedCount(set.getInt("machinery_used_count"));
            o.setMachineryUsedAmt(set.getBigDecimal("machinery_used_amt"));
            o.setWagesDrawnMoreThanActualWorkingDayCount(set.getInt("wages_drawn_more_than_actual_working_day_count"));
            o.setWagesDrawnMoreThanActualWorkingDayAmt(set.getBigDecimal("wages_drawn_more_than_actual_working_day_amt"));
            o.setWorkDoneByContractorsCount(set.getInt("work_done_by_contractors_count"));
            o.setWorkDoneByContractorsAmt(set.getBigDecimal("work_done_by_contractors_amt"));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setStatus(set.getBoolean("is_active"));
            LOGGER.debug("Expenditure  : {}", o.toString());
            return o;
        }
    }
}
