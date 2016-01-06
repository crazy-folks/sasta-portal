package com.sastabackend.service.districts;

import com.sastabackend.domain.Districts;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface DistrictsService {
    ResponseModel Add(String name,Integer stateid,String description,Integer districtCode,String shortName,Long createby);
    ResponseModel Update(Integer districtId,String name,int stateid,String description,Integer districtCode,String shortName,Long modify_by,Boolean isactive);
    ResponseModel getList();
}
