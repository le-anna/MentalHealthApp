package respository;

import java.util.*;
import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Backend.UserInfo;
import Backend.Mood;
import Backend.MoodEntry;

@Repository
public class UserInfoDAO {
	
	SessionFactory factory = new Configuration().configure("hibernate.cfg.xml")
			.addAnnotatedClass(MoodEntry.class)
			.addAnnotatedClass(Mood.class)
			.addAnnotatedClass(UserInfo.class).buildSessionFactory();
	
	public List<UserInfo> getUsers() {
		Session session = factory.openSession();
		Transaction transaction = null;
		
		try {
			transaction = session.beginTransaction();
			List <UserInfo> users = session.createQuery("from UserInfo", UserInfo.class).list();
			for (Iterator<UserInfo> iterator = users.iterator(); iterator.hasNext();) {
				//iterator.next();
				System.out.println(iterator.next().getName());
			}
			transaction.commit();
			return users;
		} finally {
			session.close();
		}
		
		
	}
}
