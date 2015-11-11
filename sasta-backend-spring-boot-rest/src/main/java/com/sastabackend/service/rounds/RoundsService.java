package com.sastabackend.service.rounds;

import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Rounds;

import java.util.List;

/**
 * Created by SARVA on 09/Nov/2015.
 */
public interface RoundsService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                String description, Long created_by);
    ResponseModel Update(Long id,String name, Integer reference_id, java.sql.Date start_date, java.sql.Date end_date,
                   String description, Long modified_by,Boolean is_active);
}
