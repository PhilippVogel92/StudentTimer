package com.github.philippvogel92.studenttimerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class StudentTimerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentTimerBackendApplication.class, args);
    }

}
