package com.sastabackend.service.page;

import com.sastabackend.domain.ConfigSystem;
import com.sastabackend.domain.PageConfig;
import com.sastabackend.domain.ResponseModel;

import java.util.List;

/**
 * Created by SARVA on 13/Nov/2015.
 */
public interface PageService {
    public ResponseModel Select();
    public ResponseModel Add(PageConfig config);
    public ResponseModel Update(PageConfig config);
    public String getValueByName(List<PageConfig> list, String value);
}
