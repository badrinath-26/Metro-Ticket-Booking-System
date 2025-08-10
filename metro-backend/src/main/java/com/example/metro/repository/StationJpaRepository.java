package com.example.metro.repository;

import com.example.metro.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationJpaRepository extends JpaRepository<Station, Long> {
    // No need to write any methods now – CRUD is already available from JpaRepository
}
