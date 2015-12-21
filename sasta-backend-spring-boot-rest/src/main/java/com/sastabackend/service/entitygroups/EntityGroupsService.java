package com.sastabackend.service.entitygroups;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 20/Dec/2015.
 */
public interface EntityGroupsService {
    ResponseModel Add(String name,String description,Long created_by);
    ResponseModel Update(Integer id,String name,String description,
                         Long modified_by,Boolean is_active);
    ResponseModel getList();
}
