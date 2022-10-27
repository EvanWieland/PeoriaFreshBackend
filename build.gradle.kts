plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "1.5.10"
    id("org.springframework.boot") version "2.4.3"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
}

group "org.peoriafresh"
version "0.0.1"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter")

    developmentOnly("org.springframework.boot:spring-boot-devtools")

    implementation("com.zaxxer:HikariCP:5.0.1")

    runtimeOnly("org.postgresql:postgresql")
}

// disable jar
tasks.withType<Jar> {
    enabled = false
}