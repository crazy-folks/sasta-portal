package com.sastabackend.repository;

import com.sastabackend.domain.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sarvaratchagan on 19-06-2016.
 */
public interface MessagesRepository extends JpaRepository<Messages,Long> {
}
