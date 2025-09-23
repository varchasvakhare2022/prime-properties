package com.primeproperties.repository;

import com.primeproperties.model.Transaction;
import com.primeproperties.model.User;
import com.primeproperties.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCustomer(User customer);
    List<Transaction> findByProperty(Property property);
    List<Transaction> findByCustomerId(Long customerId);
    List<Transaction> findByPropertyId(Long propertyId);
}
