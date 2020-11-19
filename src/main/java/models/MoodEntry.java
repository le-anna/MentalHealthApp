
package models;

import java.util.*;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "mood_entry")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "moods", "notes"})
public class MoodEntry {
	
	@Id
	@Column(name="mood_entry_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	

	@OneToMany(fetch=FetchType.LAZY, mappedBy = "entry")
	private List<Mood> moods = new ArrayList<Mood>();

	@OneToMany(fetch=FetchType.LAZY, mappedBy = "note")
	private List<Note> notes = new ArrayList<Note>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id", nullable=false)
	public UserInfo user;

	private String date;
	
	public MoodEntry() {}
	
	public MoodEntry(String date, UserInfo user_info) {
		this.date = date;
		this.user = user_info;
	}

	public UserInfo getUser() {
		return user;
	}

	public int getId() {
		return id;
	}
	
	public void setUserInfo(UserInfo user) {
		this.user = user;
	}

	public void setDate(String date) {
		this.date = date;
	}


	public String getDate() {
		return date;
	}
	
	public List<Mood> getMoods() {
		return moods;
	}
}

