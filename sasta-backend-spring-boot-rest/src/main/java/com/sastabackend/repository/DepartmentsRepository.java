package com.sastabackend.repository;

import com.sastabackend.domain.Departments;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface DepartmentsRepository extends JpaRepository<Departments,Integer> {
}
