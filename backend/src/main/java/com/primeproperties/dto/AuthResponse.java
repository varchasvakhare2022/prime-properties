package com.primeproperties.dto;

import com.primeproperties.model.Role;

public class AuthResponse {
    
    private String accessToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private UserInfo user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String accessToken, Long expiresIn, UserInfo user) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.user = user;
    }
    
    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public Long getExpiresIn() {
        return expiresIn;
    }
    
    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
    
    public UserInfo getUser() {
        return user;
    }
    
    public void setUser(UserInfo user) {
        this.user = user;
    }
    
    // Inner class for user info
    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private Role role;
        
        public UserInfo() {}
        
        public UserInfo(Long id, String name, String email, Role role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public Role getRole() {
            return role;
        }
        
        public void setRole(Role role) {
            this.role = role;
        }
    }
}