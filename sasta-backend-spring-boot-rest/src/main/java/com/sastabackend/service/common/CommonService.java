package com.sastabackend.service.common;

import com.sastabackend.domain.ConfigSystem;
import com.sastabackend.domain.ResponseModel;

import java.util.List;

/**
 * Created by SARVA on 13/Nov/2015.
 */
public interface CommonService {
    public ResponseModel Select();
    public ResponseModel Add(ConfigSystem config);
    public ResponseModel Update(ConfigSystem config);
    public String getValueByName(List<ConfigSystem> list,String value);
}
