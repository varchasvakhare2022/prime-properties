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
        registry.addInterceptor(new SimpleHeaderInterceptor());
    }

    /**
     * Simple interceptor to add Cross-Origin-Opener-Policy header
     */
    public static class SimpleHeaderInterceptor implements HandlerInterceptor {
        
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            // Only set the essential COOP header
            response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
            return true;
        }
    }
}
