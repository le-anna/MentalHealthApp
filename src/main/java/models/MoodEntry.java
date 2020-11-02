
package models;
import java.util.*;

import javax.persistence.*;


@Entity
@Table(name = "mood_entry")
public class MoodEntry {
	
	@Id
	@Column(name="mood_entry_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mood_entry_id;
	
	
	@OneToMany(mappedBy = "mood_entry")
	private List<Mood> moodList = new ArrayList<Mood>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id", nullable=false)
	public UserInfo user_info;

	private String date;
	
	public MoodEntry() {}
	
	public MoodEntry(String date, UserInfo user_info) {
		this.date = date;
		this.user_info = user_info;
	}
	
	public void setUserInfo(UserInfo user) {
		this.user_info = user;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDate() {
		return date;
	}
	
}

