package com.primeproperties.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Configuration to handle Railway proxy headers and ensure HTTPS
 */
@Configuration
public class ProxyConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry registry) {
        registry.addInterceptor(new ProxyHeaderInterceptor());
    }

    @Bean
    public HandlerInterceptor proxyHeaderInterceptor() {
        return new ProxyHeaderInterceptor();
    }

    /**
     * Interceptor to handle Railway proxy headers and ensure HTTPS
     */
    public static class ProxyHeaderInterceptor implements HandlerInterceptor {
        
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            // Log proxy headers for debugging
            String forwardedProto = request.getHeader("X-Forwarded-Proto");
            String forwardedHost = request.getHeader("X-Forwarded-Host");
            String forwardedFor = request.getHeader("X-Forwarded-For");
            
            System.out.println("🔍 Proxy Headers Debug:");
            System.out.println("  X-Forwarded-Proto: " + forwardedProto);
            System.out.println("  X-Forwarded-Host: " + forwardedHost);
            System.out.println("  X-Forwarded-For: " + forwardedFor);
            System.out.println("  Request URL: " + request.getRequestURL());
            System.out.println("  Request Scheme: " + request.getScheme());
            
            // Force HTTPS if behind Railway proxy
            if ("https".equals(forwardedProto) && !"https".equals(request.getScheme())) {
                System.out.println("🔒 Forcing HTTPS scheme due to X-Forwarded-Proto header");
                // This will be handled by Spring Boot's forward headers configuration
            }
            
            return true;
        }
    }
}
