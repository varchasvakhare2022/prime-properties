package com.primeproperties.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Minimal configuration for HTTP headers
 */
@Configuration
public class HttpHeadersConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new SimpleHeaderInterceptor())
                .addPathPatterns("/**") // Apply to all paths
                .excludePathPatterns("/actuator/**"); // Exclude actuator endpoints
    }

    /**
     * Simple interceptor to add Cross-Origin-Opener-Policy header
     */
    public static class SimpleHeaderInterceptor implements HandlerInterceptor {
        
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            // Set Cross-Origin-Opener-Policy to allow Google Sign-In popups
            response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
            
            // Additional headers for Google Sign-In compatibility
            response.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
            response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
            
            // Log for debugging
            System.out.println("🔒 Setting COOP header for request: " + request.getRequestURI());
            
            return true;
        }
    }
}
