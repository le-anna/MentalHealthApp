package controllers;

import java.util.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.UserInfo;


@RestController
public class UserInfoController {
	
	@Autowired
	private UserInfo user_info;
	
	private static SessionFactory factory; 

	@GetMapping("/user")
	public List<UserInfo> getUsers() {
		Session session = factory.openSession();
		Transaction tx = null;
		try {
		    tx = session.beginTransaction();
			List<UserInfo> users = session.createQuery("from UserInfo").list(); 
			 for (Iterator<UserInfo> it = users.iterator(); it.hasNext();){
		            user_info = (UserInfo) it.next();
		            users.add(user_info);
		       	 	System.out.println(user_info.getName());
			 }
			 tx.commit();
			 return users;
		
		} finally {
			session.close();
		}
	}
	
}
