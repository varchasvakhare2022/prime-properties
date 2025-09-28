package com.primeproperties.config;

import com.primeproperties.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults; // Import for withDefaults

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                // Disable Cross-Origin-Opener-Policy to allow Google Sign-In postMessage
                .headers(headers -> headers
                        .crossOriginOpenerPolicy(policy -> policy.disable())
                        .crossOriginEmbedderPolicy(policy -> policy.disable())
                        .frameOptions().deny()
                        .contentTypeOptions().and()
                        .httpStrictTransportSecurity(hstsConfig -> hstsConfig.disable()))
                .authorizeHttpRequests(auth -> auth
                        // Permit all auth endpoints including OAuth
                        .requestMatchers("/auth/**").permitAll()
                        // Permit OAuth2 endpoints
                        .requestMatchers("/oauth2/**").permitAll()
                        // Permit properties endpoints for public access
                        .requestMatchers("/properties/**").permitAll()
                        // Permit health check endpoints
                        .requestMatchers("/actuator/health", "/health").permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configure OAuth 2.0 Login
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/auth/google/login")
                        .defaultSuccessUrl("/auth/google/callback", true)
                        .failureUrl("/auth/google/error")
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(oauth2UserService())));

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // 2. THIS NEW METHOD DEFINES THE CORS RULES
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow frontend domain from environment variable or default
        String frontendUrl = System.getenv("FRONTEND_URL");
        if (frontendUrl == null || frontendUrl.isEmpty()) {
            frontendUrl = "https://prime-properties.up.railway.app";
        }
        
        configuration.setAllowedOrigins(Arrays.asList(
            frontendUrl,
            "http://localhost:3000", // Keep for local dev
            "http://localhost:5173" // Keep for local dev
        ));
        
        // Allow all necessary HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
        // Allow necessary headers for OAuth and API requests
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "Cross-Origin-Opener-Policy",
            "Cross-Origin-Embedder-Policy"
        ));
        
        // Allow credentials for OAuth authentication
        configuration.setAllowCredentials(true);
        
        // Cache preflight response for 1 hour
        configuration.setMaxAge(3600L);
        
        // Expose headers that frontend might need
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type"
        ));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply CORS configuration to all endpoints
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        return new OAuth2UserService<OAuth2UserRequest, OAuth2User>() {
            @Override
            public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
                // This is a simple implementation that just returns the user info
                // In a real application, you might want to fetch additional user details
                return new DefaultOAuth2User(
                    Arrays.asList(new SimpleGrantedAuthority("ROLE_CUSTOMER")),
                    userRequest.getAdditionalParameters(),
                    "sub" // Use 'sub' as the name attribute key for Google
                );
            }
        };
    }
}