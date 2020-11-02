package models;

import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity()
@Table(name = "user_info")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserInfo {
	
	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	

	@OneToMany(fetch=FetchType.LAZY, mappedBy = "user")
	private List<MoodEntry> entry_list = new ArrayList<MoodEntry>();
	
	public UserInfo() {
		
	}
	
	public UserInfo(String name) {
		this.name = name;
	}
	
	public int getUserID() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

}
