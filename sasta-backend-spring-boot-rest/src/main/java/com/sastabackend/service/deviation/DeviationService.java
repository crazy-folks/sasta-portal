package com.sastabackend.service.deviation;

import com.sastabackend.domain.Deviation;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 26/Dec/2015.
 */
public interface DeviationService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(Deviation dv);
    ResponseModel Update(Deviation dv);
}
