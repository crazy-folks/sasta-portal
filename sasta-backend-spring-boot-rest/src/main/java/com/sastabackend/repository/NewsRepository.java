package com.sastabackend.repository;

import com.sastabackend.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sarvaratchagan on 06-06-2016.
 */
public interface NewsRepository extends JpaRepository<News,Long> {

}
