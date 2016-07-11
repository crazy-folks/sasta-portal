package com.sastabackend.service.gallaries;

import com.sastabackend.domain.Gallaries;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by Sarvaratchagan on 10-07-2016.
 */
public interface GalleriesService {
    ResponseModel findOne(Long id);
    ResponseModel findAll(Long auditid);
    ResponseModel AddGalleries(Gallaries image);
    ResponseModel UpdateGalleries(Gallaries image);
    ResponseModel Delete(Long id);
    ResponseModel SelectPulicImages(Long fyid,Long auditid);
}
