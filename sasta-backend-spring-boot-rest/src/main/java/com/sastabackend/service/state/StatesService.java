package com.sastabackend.service.state;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface StatesService {
    ResponseModel Add(String name,String description,Integer country_id,Integer state_code,String short_name,Long created_by);
    ResponseModel Update(Integer state_id,String state_name,String state_description,Integer state_country_id,Integer statecode,String state_short_name,Long state_modified_by,Boolean is_active);
    ResponseModel getList();
}
