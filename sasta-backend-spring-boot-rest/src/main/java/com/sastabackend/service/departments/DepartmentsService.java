package com.sastabackend.service.departments;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface DepartmentsService{
    ResponseModel Add(String department_name,String department_description,Long created_by);
    ResponseModel Update(Integer id,String department_name,String department_description,
                         Long modified_by,Boolean is_active);
    ResponseModel getList();
}
