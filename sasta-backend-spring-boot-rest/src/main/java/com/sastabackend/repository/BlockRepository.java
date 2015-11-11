package com.sastabackend.repository;

import com.sastabackend.domain.Blocks;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * Created by SARVA on 07/Nov/2015.
 */
public interface BlockRepository extends JpaRepository<Blocks, java.lang.Integer> {

}
