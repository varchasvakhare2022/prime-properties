package com.primeproperties.controller;

import com.primeproperties.model.Transaction;
import com.primeproperties.model.User;
import com.primeproperties.model.Property;
import com.primeproperties.repository.TransactionRepository;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    
    @Autowired
    TransactionRepository transactionRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PropertyRepository propertyRepository;
    
    @GetMapping("/customer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<Transaction>> getCustomerTransactions() {
        User currentUser = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findByCustomer(currentUser);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/property/{propertyId}")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<List<Transaction>> getPropertyTransactions(@PathVariable Long propertyId) {
        User currentUser = getCurrentUser();
        Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
        
        if (propertyOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Property property = propertyOptional.get();
        
        // Check if the property belongs to the current developer
        if (!property.getDeveloper().getId().equals(currentUser.getId())) {
            return ResponseEntity.forbidden().build();
        }
        
        List<Transaction> transactions = transactionRepository.findByProperty(property);
        return ResponseEntity.ok(transactions);
    }
    
    @PostMapping("/create")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            User currentUser = getCurrentUser();
            transaction.setCustomer(currentUser);
            
            Transaction savedTransaction = transactionRepository.save(transaction);
            return ResponseEntity.ok(savedTransaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error creating transaction: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        
        if (transactionOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(transactionOptional.get());
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            User currentUser = getCurrentUser();
            Optional<Transaction> transactionOptional = transactionRepository.findById(id);
            
            if (transactionOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Transaction transaction = transactionOptional.get();
            
            // Check if the transaction belongs to the current customer
            if (!transaction.getCustomer().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(403).build();
            }
            
            transactionRepository.delete(transaction);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error deleting transaction: " + e.getMessage());
        }
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
