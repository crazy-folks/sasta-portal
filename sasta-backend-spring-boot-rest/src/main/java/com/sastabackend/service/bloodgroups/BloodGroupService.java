package com.sastabackend.service.bloodgroups;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface BloodGroupService {
    ResponseModel Add(String blood_group_name,String blood_group_description,Long created_by);
    ResponseModel Update(Integer blood_group_id,String blood_group_name,String blood_group_description,
                         Long modified_by,Boolean is_active);
    ResponseModel getList();
}