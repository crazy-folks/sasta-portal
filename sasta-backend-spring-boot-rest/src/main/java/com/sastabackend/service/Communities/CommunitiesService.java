package com.sastabackend.service.Communities;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface CommunitiesService{
    ResponseModel Add(String community_name,String community_description,Long created_by);
    ResponseModel Update(Integer id,String community_name,String community_description,
                         Long modified_by,Boolean is_active);
    ResponseModel getList();
}
