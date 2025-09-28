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
        registry.addInterceptor(new CrossOriginOpenerPolicyInterceptor());
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
            // Set Cross-Origin-Opener-Policy to allow Google Sign-In popups
            response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
            return true;
        }
    }
}
