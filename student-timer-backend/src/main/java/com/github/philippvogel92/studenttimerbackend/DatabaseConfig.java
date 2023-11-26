package com.github.philippvogel92.studenttimerbackend;

import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnit;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleRepository;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;


@Configuration
public class DatabaseConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student student1 = new Student("Philipp", "Master Medieninformatik", "phil.jpg", "phil@test.de",
                    "aionscoain232");
            Student student2 = new Student("Alex", "Bachelor Medientechnologie", "alex.jpg", "alex@test.de",
                    "vsdfvsd4334");

            Module module1 = new Module("Datenbanksysteme 1", "#88A795", 5, LocalDate.of(2024, Month.JUNE, 10),
                    student1);
            Module module2 = new Module("Mathematik 1", "#66A715", 10, LocalDate.of(2024, Month.JANUARY, 12), student1);
            Module module3 = new Module("Mediengestaltung 1", "#22A715", 3, null, student1);
            Module module4 = new Module("Mediengestaltung 2", "#12A715", 3, LocalDate.of(2024, Month.MARCH, 31),
                    student1);

            LearningUnit learningUnit1 = new LearningUnit("Vorlesung", LocalDate.of(2023, Month.FEBRUARY, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 4, module1);
            LearningUnit learningUnit2 = new LearningUnit("Praktikum", LocalDate.of(2023, Month.JANUARY, 2),
                    LocalDate.of(2023, Month.OCTOBER, 1), 2, module1);
            LearningUnit learningUnit3 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 6, module1);
            LearningUnit learningUnit4 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.DECEMBER, 4), 10, module1);

            LearningUnit learningUnit5 = new LearningUnit("Vorlesung", LocalDate.of(2023, Month.FEBRUARY, 11),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 5, module2);
            LearningUnit learningUnit6 = new LearningUnit("Praktikum", LocalDate.of(2023, Month.JANUARY, 2),
                    LocalDate.of(2023, Month.OCTOBER, 2), 3, module2);
            LearningUnit learningUnit7 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 7, module2);
            LearningUnit learningUnit8 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.DECEMBER, 4), 9, module2);


            module1.setLearningUnit(List.of(learningUnit1, learningUnit2, learningUnit3, learningUnit4));
            module2.setLearningUnit(List.of(learningUnit5, learningUnit6, learningUnit7, learningUnit8));

            student1.setModules(List.of(module1, module2, module3, module4));

            repository.saveAll(
                    List.of(student1, student2)
            );

        };
    }


}
