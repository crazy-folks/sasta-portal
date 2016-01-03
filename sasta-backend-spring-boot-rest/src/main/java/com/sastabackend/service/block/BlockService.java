package com.sastabackend.service.block;

import com.sastabackend.domain.Blocks;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by SARVA on 07/Nov/2015.
 */
public interface BlockService {
    ResponseModel Add(Blocks block);
    ResponseModel Add(String name,String description,Integer district_id,Long created_by);
    ResponseModel Update(Blocks block);
    ResponseModel Update(int block_id,String name,String description,int district_id,Long modify_by,Boolean isactive);
    ResponseModel getList();
}
