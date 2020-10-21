package Backend;

import java.util.*;
import javax.persistence.*;


@Entity()
@Table(name = "UserInfo")
public class UserInfo {
	
	@Id
	@Column(name="UserID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int UserID;
	
	private String name;
	
	@OneToMany(mappedBy = "user_info")
	private List<MoodEntry> entryList = new ArrayList<MoodEntry>();
	
	
	public UserInfo() {
		
	}
	
	public UserInfo(String name) {
		this.name = name;
	}
	
	public int getUserID() {
		return UserID;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}


}
