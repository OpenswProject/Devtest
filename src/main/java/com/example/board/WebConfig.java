package com.example.board;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins(
                        "https://devtest-theta-six.vercel.app",
                        "https://devtest-aobrmjyzd-oweles-projects-e30770f6.vercel.app",
                        "http://localhost:3000") // Vercel, localhost 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더를 허용
                .allowCredentials(true) // 자격 증명 허용
                .maxAge(3600);
    }
}
