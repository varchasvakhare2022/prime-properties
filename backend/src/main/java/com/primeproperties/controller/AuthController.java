package com.primeproperties.controller;

import com.primeproperties.dto.LoginRequest;
import com.primeproperties.dto.RegisterRequest;
import com.primeproperties.dto.AuthResponse;
import com.primeproperties.model.Role;
import com.primeproperties.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse response = authService.registerUser(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping("/register/customer")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody RegisterRequest registerRequest) {
        registerRequest.setRole(Role.CUSTOMER);
        return registerUser(registerRequest);
    }
    
    @PostMapping("/register/developer")
    public ResponseEntity<?> registerDeveloper(@Valid @RequestBody RegisterRequest registerRequest) {
        registerRequest.setRole(Role.DEVELOPER);
        return registerUser(registerRequest);
    }
}
