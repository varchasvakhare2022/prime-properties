package com.primeproperties.repository;

import com.primeproperties.model.Property;
import com.primeproperties.model.PropertyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByStatus(PropertyStatus status);
    List<Property> findByStatusNot(PropertyStatus status);
    List<Property> findByDeveloperId(Long developerId);
    List<Property> findByDeveloperIdAndStatus(Long developerId, PropertyStatus status);
}
