package controllers;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import Backend.UserInfo;
import service.UserInfoService;


@RestController
public class UserInfoController {

	@Autowired
	private UserInfoService userinfoSer;
	
	@GetMapping("/users") 
	public List<UserInfo> getUsers() {
		return userinfoSer.getUsers();
	}
	
	@GetMapping("/user/{userID}")
	public UserInfo getUser(@PathVariable int userID) {
		return userinfoSer.getUser(userID);
	}
	
	@GetMapping("/test")
	public int getTest() {
		System.out.println("Enters");
		int x = 5;
		return x;
	}

	
}
