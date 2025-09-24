package com.primeproperties.service;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

/**
 * UserDetailsService implementation for Spring Security
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("🔍 UserDetailsService.loadUserByUsername called with: " + username);
        
        // Debug: Check all users first
        var allUsers = userRepository.findAll();
        System.out.println("🔍 UserDetailsService: Total users in DB: " + allUsers.size());
        for (User u : allUsers) {
            System.out.println("🔍 UserDetailsService: User - Username: " + u.getUsername() + ", Email: " + u.getEmail());
        }
        
        // Try to find user by username first, then by email
        System.out.println("🔍 UserDetailsService: Searching by username: " + username);
        var userByUsername = userRepository.findByUsername(username);
        System.out.println("🔍 UserDetailsService: Username search result: " + (userByUsername.isPresent() ? "FOUND" : "NOT FOUND"));
        
        System.out.println("🔍 UserDetailsService: Searching by email: " + username);
        var userByEmail = userRepository.findByEmail(username);
        System.out.println("🔍 UserDetailsService: Email search result: " + (userByEmail.isPresent() ? "FOUND" : "NOT FOUND"));
        
        User user = userByUsername
                .orElse(userByEmail
                        .orElseThrow(() -> {
                            System.out.println("❌ UserDetailsService: User not found with username/email: " + username);
                            return new UsernameNotFoundException("User not found with username/email: " + username);
                        }));

        System.out.println("✅ UserDetailsService: User found - Username: " + user.getUsername() + ", Email: " + user.getEmail() + ", Role: " + user.getRole());
        System.out.println("🔐 UserDetailsService: Password hash from DB: " + user.getPassword());
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(getAuthorities(user.getRole()))
                .build();
    }

    /**
     * Get authorities based on user role
     */
    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
}