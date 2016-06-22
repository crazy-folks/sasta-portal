package com.sastabackend.service.messages;

import com.sastabackend.domain.Messages;
import com.sastabackend.domain.MgnRegaWorks;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;

/**
 * Created by Sarvaratchagan on 19-06-2016.
 */
public interface MessagesService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel Add(Messages message);
    ResponseModel Update(Messages message);
    ResponseModel Delete(Long id);
}
