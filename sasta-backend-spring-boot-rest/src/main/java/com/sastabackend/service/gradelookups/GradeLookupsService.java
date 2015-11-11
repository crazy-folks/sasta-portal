package com.sastabackend.service.gradelookups;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface GradeLookupsService{
    ResponseModel Add(String group_lookups_name, String group_lookups_description, Long created_by);
    ResponseModel Update(Integer id, String group_lookups_name, String group_lookups_description,
                         Long modified_by, Boolean is_active);
    ResponseModel getList();
}
