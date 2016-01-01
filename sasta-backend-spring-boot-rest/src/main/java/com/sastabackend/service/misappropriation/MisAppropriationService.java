package com.sastabackend.service.misappropriation;

import com.sastabackend.domain.MisAppropriation;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 26/Dec/2015.
 */
public interface MisAppropriationService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(MisAppropriation mis);
    ResponseModel Update(MisAppropriation mis);
}
