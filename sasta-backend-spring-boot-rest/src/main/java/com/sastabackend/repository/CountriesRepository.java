package com.sastabackend.repository;

import com.sastabackend.domain.Countries;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by SARVA on 08/Nov/2015.
 */
public interface CountriesRepository extends JpaRepository<Countries, Integer> {
}
