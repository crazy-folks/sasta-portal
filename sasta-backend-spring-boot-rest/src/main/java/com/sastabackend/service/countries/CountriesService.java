package com.sastabackend.service.countries;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface CountriesService {
    ResponseModel Add(String country_name, String country_description, Integer country_code,
                      String country_short_name, Long country_create_by);
    ResponseModel Update(Integer country_id,String country_name,String country_description,Integer country_code,
                         String country_short_name,Long country_modified_by,Boolean is_active);
    ResponseModel getList();
}
