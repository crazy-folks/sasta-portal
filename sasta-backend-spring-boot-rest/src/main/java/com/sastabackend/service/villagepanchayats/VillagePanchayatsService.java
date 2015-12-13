package com.sastabackend.service.villagepanchayats;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.VillagePanchayats;

/**
 * Created by SARVA on 18/Nov/2015.
 */
public interface VillagePanchayatsService {
    ResponseModel Add(VillagePanchayats panchayats);
    ResponseModel Add(String name,Integer audit_block_id,Integer vp_code,String description,Long created_by);
    ResponseModel Update(VillagePanchayats panchayats);
    ResponseModel Update(Integer id,String name,Integer audit_block_id,Integer vp_code,String description,Long modified_by,boolean is_active);
    ResponseModel getList();
}
