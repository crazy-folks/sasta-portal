package com.sastabackend.service.qualifications;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface QualificationsService{
    ResponseModel Add(String qualification_name, String qualification_description, Long created_by);
    ResponseModel Update(Integer id, String qualification_name, String qualification_description,
                         Long modified_by, Boolean is_active);
    ResponseModel getList();
}
