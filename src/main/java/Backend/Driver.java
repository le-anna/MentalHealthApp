//package Backend;
//
//import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
//
//public class Driver {
//
//	public static void main(String[] args) {
//		//reuse session factory over and over again
//		SessionFactory factory = new Configuration()
//				.configure("hibernate.cfg.xml")
//				.addAnnotatedClass(MoodEntry.class)
//				.addAnnotatedClass(Mood.class)
//				.addAnnotatedClass(UserInfo.class)
//				.buildSessionFactory();
//		
//		//short-lived object
//		Session session = factory.getCurrentSession();
//		
//		try {
//
//			UserInfo newUser = new UserInfo("Le");
//			MoodEntry newEntry = new MoodEntry();
//			newEntry.setUserInfo(newUser);
//			Mood newMood = new Mood("Happy", 5);
//			Mood newMood2 = new Mood("Sad", 10);
////			newEntry.addMood(newMood);
////			newEntry.addMood(newMood2);
//			newMood.setMoodEntry(newEntry);
//			newMood2.setMoodEntry(newEntry);
//			
//			System.out.println("WORKING");
//			
//			
//			session.beginTransaction();
//		
//			session.save(newUser);
//			session.save(newEntry);
//			session.save(newMood);
//			session.save(newMood2);
//			
//			session.getTransaction().commit();
//	
//		
//		} finally {
//			factory.close();
//		}
//		
//
//	}
//	
//
//}
