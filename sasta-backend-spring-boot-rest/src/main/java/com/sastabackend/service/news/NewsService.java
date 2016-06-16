package com.sastabackend.service.news;

import com.sastabackend.domain.Images;
import com.sastabackend.domain.News;
import com.sastabackend.domain.Posts;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by Sarvaratchagan on 06-06-2016.
 */
public interface NewsService {
    ResponseModel findOne(Long id);
    ResponseModel findTop3();
    ResponseModel findAll();
    ResponseModel Add(News rc);
    ResponseModel Update(News rc);
    ResponseModel UploadImage(Posts image);
}
