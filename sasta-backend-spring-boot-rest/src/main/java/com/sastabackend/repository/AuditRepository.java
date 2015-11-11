package com.sastabackend.repository;

import com.sastabackend.domain.Audit;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 09/Nov/2015.
 */
public interface AuditRepository extends JpaRepository<Audit,Long> {
}
