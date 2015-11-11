package com.sastabackend.service.imagetypes;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface ImageTypesService{
    ResponseModel Add(String image_types_name, String image_types_description, Long created_by);
    ResponseModel Update(Integer id, String image_types_name, String image_types_description,
                         Long modified_by, Boolean is_active);
    ResponseModel getList();
}
