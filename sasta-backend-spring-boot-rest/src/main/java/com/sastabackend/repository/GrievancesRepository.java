package com.sastabackend.repository;

import com.sastabackend.domain.Grievances;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 27/Dec/2015.
 */
public interface GrievancesRepository extends JpaRepository<Grievances,Long> {
}
