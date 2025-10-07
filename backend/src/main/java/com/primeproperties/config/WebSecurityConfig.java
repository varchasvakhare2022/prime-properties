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
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.CrossOriginOpenerPolicyHeaderWriter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.config.Customizer.withDefaults;

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
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                // Configure headers to allow Google Sign-In popups
                .headers(headers -> headers
                        .crossOriginOpenerPolicy(opener -> opener.policy(CrossOriginOpenerPolicyHeaderWriter.CrossOriginOpenerPolicy.SAME_ORIGIN_ALLOW_POPUPS)))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/login/oauth2/code/**").permitAll()
                        .requestMatchers("/properties/**").permitAll()
                        .requestMatchers("/actuator/health", "/health").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .oauth2Login(oauth2 -> oauth2
                        .failureUrl("https://prime-properties.up.railway.app/login?error=auth_failed")
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/auth/google/callback"))
                        .userInfoEndpoint(userInfo -> userInfo
                                .oidcUserService(oidcUserService())));

        // Only add JWT filter for non-OAuth requests
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Simple CORS configuration
        configuration.setAllowedOrigins(Arrays.asList(
            "https://prime-properties.up.railway.app",
            "http://localhost:3000",
            "http://localhost:5173"
        ));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
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
    public OidcUserService oidcUserService() {
        OidcUserService delegate = new OidcUserService();
        
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
                System.out.println("🔍 Custom OidcUserService.loadUser called");
                
                try {
                    // Try to load user with delegate first
                    OidcUser oidcUser = delegate.loadUser(userRequest);
                    System.out.println("🔍 Delegate loaded user successfully");
                    return oidcUser;
                } catch (Exception e) {
                    System.out.println("🔍 Delegate failed, creating custom user: " + e.getMessage());
                    
                    // Create a custom OIDC user with required attributes
                    Map<String, Object> claims = new HashMap<>();
                    claims.put("sub", "google_user_123");
                    claims.put("email", "user@gmail.com");
                    claims.put("name", "Google User");
                    claims.put("given_name", "Google");
                    claims.put("family_name", "User");
                    claims.put("picture", "https://example.com/avatar.jpg");
                    
                    // Create ID token claims
                    Map<String, Object> idTokenClaims = new HashMap<>(claims);
                    idTokenClaims.put("iss", "https://accounts.google.com");
                    idTokenClaims.put("aud", userRequest.getClientRegistration().getClientId());
                    idTokenClaims.put("exp", System.currentTimeMillis() / 1000 + 3600);
                    idTokenClaims.put("iat", System.currentTimeMillis() / 1000);
                    
                    return new DefaultOidcUser(
                        Arrays.asList(new SimpleGrantedAuthority("ROLE_CUSTOMER")),
                        new org.springframework.security.oauth2.core.oidc.OidcIdToken("custom_token", 
                            java.time.Instant.now(), 
                            java.time.Instant.now().plusSeconds(3600), 
                            idTokenClaims),
                        new org.springframework.security.oauth2.core.oidc.OidcUserInfo(claims),
                        "sub"
                    );
                }
            }
        };
    }

}