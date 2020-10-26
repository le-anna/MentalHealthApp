package controllers;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import Backend.UserInfo;
import service.UserInfoService;


@RestController
public class UserInfoController {

	@Autowired
	private UserInfoService userinfoSer;
	
	@GetMapping("/user") 
	public List<UserInfo> getUsers() {
		return userinfoSer.getUsers();
	}
	
	@GetMapping("/test")
	public int getTest() {
		System.out.println("Enters");
		int x = 5;
		return x;
	}

	
}
