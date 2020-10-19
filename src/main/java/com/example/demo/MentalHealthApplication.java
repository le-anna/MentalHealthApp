package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.*;
import controllers.UserInfoController;

@SpringBootApplication
public class MentalHealthApplication {

	public static void main(String[] args) {
		SpringApplication.run(MentalHealthApplication.class, args);
//		UserInfoController newController = new UserInfoController();
//		newController.getUsers();
		System.out.println("Testing");
	}

}
