package com.primeproperties.service;

import com.primeproperties.dto.LoginRequest;
import com.primeproperties.dto.RegisterRequest;
import com.primeproperties.dto.AuthResponse;
import com.primeproperties.model.Role;
import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    JwtUtils jwtUtils;
    
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        User user = (User) authentication.getPrincipal();
        
        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
    
    public AuthResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        
        // Create new user's account
        User user = new User(registerRequest.getUsername(), 
                           registerRequest.getEmail(),
                           encoder.encode(registerRequest.getPassword()),
                           registerRequest.getRole());
        
        userRepository.save(user);
        
        // Generate JWT token for the new user
        String jwt = jwtUtils.generateTokenFromUsername(user.getUsername());
        
        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
