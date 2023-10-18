package com.fullstack.demo;

import java.util.List;
import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

//	@RequestMapping("/")
//    String home() {
//        return "Hello World!";
//    }
	
	
//	@GetMapping("/st")
//	public List<Student> getAllStudents(){
//		return List.of(
//				new Student(UUID.randomUUID(),"Johns", "White", "jw@gmail.com", Student.Gender.MALE),
//				new Student(UUID.randomUUID(),"Danny", "White", "dw@gmail.com", Student.Gender.FEMALE)
//				);
//	}

}
