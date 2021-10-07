package com.github.thisisfine.geoapp.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsFilterConfig {

    @Bean
    fun corsFilter(): CorsFilter {
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration()
// Since Spring Boot 2.4:  When allowCredentials is true, allowedOrigins cannot contain the special value "*"
// since that cannot be set on the "Access-Control-Allow-Origin" response header.
// To allow credentials to a set of origins, list them explicitly or consider using "allowedOriginPatterns" instead.
//        config.allowedOrigins = listOf("*")
        config.allowedOriginPatterns = listOf("http://localhost*")
        config.allowedMethods = listOf("*")
        config.allowedHeaders = listOf("*")
        config.exposedHeaders = listOf("Authorization", "Link", "X-Total-Count")
        config.allowCredentials = true
        config.maxAge = 1800
        source.registerCorsConfiguration("/api/**", config)
        return CorsFilter(source)
    }
}