# 1) Gradle로 Spring Boot JAR 빌드
FROM gradle:8-jdk17 AS builder
WORKDIR /app

# Gradle 관련 파일 먼저 복사 (캐시 최적화)
COPY build.gradle settings.gradle gradlew gradlew.bat ./
COPY gradle ./gradle

# 전체 프로젝트 복사
COPY . .

# gradlew 실행 권한 (중요)
RUN chmod +x ./gradlew

# JAR 빌드
    

    # Install Node.js and npm
    RUN apt-get update && apt-get install -y nodejs npm

    # 프론트엔드 의존성 설치 및 빌드 (자세한 로그 출력)
    WORKDIR /app/frontend
    RUN npm install --loglevel verbose
    RUN npm install --save-dev @types/react --loglevel verbose
    RUN npm run build --loglevel verbose
    WORKDIR /app

    # Spring Boot 애플리케이션 빌드
    RUN gradle bootJar --no-daemon


# 2) 실행 전용 이미지
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# builder에서 만든 jar 가져오기
COPY --from=builder /app/build/libs/*.jar app.jar

# 포트 오픈 (Spring Boot)
EXPOSE 8080

# 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
