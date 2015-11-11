package com.sastabackend.repository;

import com.sastabackend.domain.Expenditure;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 10/Nov/2015.
 */
public interface ExpenditureRepository extends JpaRepository<Expenditure,Long> {
}
