package com.sastabackend.repository;

import com.sastabackend.domain.MisAppropriation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 26/Dec/2015.
 */
public interface MisAppropriationRepository extends JpaRepository<MisAppropriation,Long> {
}
