package controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import Backend.UserInfo;
import service.UserInfoService;


@Controller
public class UserInfoController {

	@Autowired
	private UserInfoService userinfoSer;
	
	@GetMapping(path="/user") 
	public @ResponseBody List<UserInfo> getUsers() {
		System.out.println("Enters");
		return userinfoSer.getUsers();
	}

	
}
