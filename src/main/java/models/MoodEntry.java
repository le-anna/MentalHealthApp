
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
	
	//private Date date;
	
	
	@OneToMany(mappedBy = "mood_entry")
	private List<Mood> moodList = new ArrayList<Mood>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="UserID", nullable=false)
	public UserInfo UserID;
	
	public MoodEntry() {}
	
	
	void setUserInfo(UserInfo user_info) {
		this.UserID = user_info;
	}
	
	void saveMoodEntry(UserInfo user_info, Mood mood) {
		this.UserID = user_info;
		moodList.add(mood);
	}
}

