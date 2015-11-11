package com.sastabackend.service.bank;

import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface BankService {
    ResponseModel Add(String bank_name,String bank_description,Long created_by);
    ResponseModel Update(Integer bank_id,String bank_name,String bank_description,Long modified_by,Boolean is_active);
    ResponseModel getList();
}
