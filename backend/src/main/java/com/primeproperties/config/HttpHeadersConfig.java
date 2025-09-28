package com.primeproperties.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Configuration for HTTP headers including Cross-Origin-Opener-Policy
 * to allow Google Sign-In popups to work properly.
 */
@Configuration
public class HttpHeadersConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CrossOriginOpenerPolicyInterceptor())
                .addPathPatterns("/**") // Apply to all paths
                .excludePathPatterns("/actuator/**"); // Exclude actuator endpoints
    }

    @Bean
    public HandlerInterceptor crossOriginOpenerPolicyInterceptor() {
        return new CrossOriginOpenerPolicyInterceptor();
    }

    /**
     * Interceptor to add Cross-Origin-Opener-Policy header
     * for Google Sign-In popup compatibility
     */
    public static class CrossOriginOpenerPolicyInterceptor implements HandlerInterceptor {
        
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            try {
                // Set Cross-Origin-Opener-Policy to allow Google Sign-In popups
                response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
                
                // Additional headers for Google Sign-In compatibility
                response.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
                response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
                
                // Log for debugging (only in development)
                String nodeEnv = System.getenv("NODE_ENV");
                if (nodeEnv == null || !nodeEnv.equals("production")) {
                    System.out.println("🔒 Setting COOP header for request: " + request.getRequestURI());
                }
                
                return true;
            } catch (Exception e) {
                System.err.println("❌ Error setting COOP headers: " + e.getMessage());
                return true; // Continue processing even if header setting fails
            }
        }
    }
}
