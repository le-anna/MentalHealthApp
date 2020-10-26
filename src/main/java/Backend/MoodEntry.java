
package Backend;
import java.util.*;
import java.sql.Date;

import javax.persistence.*;


@Entity

public class MoodEntry {
	
	@Id
	@Column(name="MoodEntryID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int MoodEntryID;
	
	//private Date date;
	
	
	@OneToMany(mappedBy = "mood_entry")
	private List<Mood> moodList = new ArrayList<Mood>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="UserID", nullable=false)
	public UserInfo user_info;
	

	
	public MoodEntry() {}
	
	
	void setUserInfo(UserInfo user_info) {
		this.user_info = user_info;
	}
	
	void saveMoodEntry(UserInfo user_info, Mood mood) {
		this.user_info = user_info;
		moodList.add(mood);
	}
}

