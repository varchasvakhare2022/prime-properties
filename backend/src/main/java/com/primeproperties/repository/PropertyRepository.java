package com.primeproperties.repository;

import com.primeproperties.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByIsSoldFalse();
    List<Property> findByDeveloperId(Long developerId);
    List<Property> findByDeveloperIdAndIsSoldFalse(Long developerId);
}
