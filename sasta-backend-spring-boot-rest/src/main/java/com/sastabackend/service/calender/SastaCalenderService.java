package com.sastabackend.service.calender;

import com.sastabackend.domain.DetailedSastaCalender;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SastaCalender;

/**
 * Created by Sarvaratchagan on 03-07-2016.
 */
public interface SastaCalenderService {
    ResponseModel findOne(Long id);
    ResponseModel findAll();
    ResponseModel AddSastaCalender(SastaCalender rc);
    ResponseModel UpdateSastaCalender(SastaCalender rc);
    ResponseModel DeleteSastaCalender(Long id);

    ResponseModel GetDetailedCalender(Long id);
    ResponseModel AddDetailedCalender(DetailedSastaCalender rc);
    ResponseModel UpdateDetailedCalender(DetailedSastaCalender rc);
    ResponseModel DeleteDetailedCalender(Long id);

}
