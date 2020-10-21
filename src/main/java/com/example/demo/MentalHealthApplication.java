package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import respository.UserInfoDAO;
import service.UserInfoService;

@SpringBootApplication
public class MentalHealthApplication {

	public static void main(String[] args) {
		SpringApplication.run(MentalHealthApplication.class, args);
		UserInfoDAO userTest = new UserInfoDAO();
		userTest.getUsers();
		System.out.println("Testing");
	}

}
