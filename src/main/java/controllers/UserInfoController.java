package controllers;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import models.UserInfo;
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

	@PostMapping("/user") 
	public UserInfo saveUser(@RequestBody UserInfo user) {
		userinfoSer.saveUser(user);
		return user;
	}
}
