package com.sastabackend.service.financialyear;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */

public interface FinancialYearService{
    ResponseModel Add(String financial_year_name,String financial_year_description,Long created_by);
    ResponseModel Update(Integer id,String financial_year_name,String financial_year_description,
                         Long modified_by,Boolean is_active);
    ResponseModel getList();
}
