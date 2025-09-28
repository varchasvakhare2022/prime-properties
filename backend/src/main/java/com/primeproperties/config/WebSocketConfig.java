package com.primeproperties.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket configuration for Railway deployment
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable simple broker for destinations prefixed with "/topic"
        config.enableSimpleBroker("/topic");
        // Set application destination prefix
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register WebSocket endpoint for Railway deployment
        // Railway apps expose only ports 443/80, so no :8080 needed
        registry.addEndpoint("/ws")
                .setAllowedOrigins(
                    "https://prime-properties.up.railway.app",
                    "http://localhost:3000", // Keep for local dev
                    "http://localhost:5173"  // Keep for local dev
                )
                .withSockJS(); // Enable SockJS fallback options
    }
}
