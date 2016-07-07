package com.sastabackend.repository;

import com.sastabackend.domain.SastaCalender;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sarvaratchagan on 03-07-2016.
 */
public interface CalenderRepository  extends JpaRepository<SastaCalender, Integer> {

}