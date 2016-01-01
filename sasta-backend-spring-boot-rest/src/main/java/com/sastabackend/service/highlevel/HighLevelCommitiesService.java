package com.sastabackend.service.highlevel;

import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.HighLevelCommities;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 27/Dec/2015.
 */
public interface HighLevelCommitiesService {

    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(HighLevelCommities hl);
    ResponseModel Update(HighLevelCommities hl);

}
