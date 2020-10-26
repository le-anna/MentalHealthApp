package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import respository.UserInfoDAO;

@SpringBootApplication(scanBasePackages={
		"controllers.UserInfoController"})
public class MentalHealthApplication {

	public static void main(String[] args) {
		SpringApplication.run(MentalHealthApplication.class, args);
		UserInfoDAO userTest = new UserInfoDAO();
		userTest.getUsers();
	}

}
