package com.sastabackend.repository;

import com.sastabackend.domain.ConfigSystem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 13/Nov/2015.
 */
public interface CommonConfigRepository extends JpaRepository<ConfigSystem,String> {
}
