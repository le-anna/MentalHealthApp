package models;
import javax.persistence.*;

@Entity 
@Table(name = "mood")
public class Mood {
	
	@Id
	@Column(name="mood_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int moodId;
	
	private String name;
	
	private int scale;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="moodEntryId", nullable=false)
	public MoodEntry moodEntry;

	public Mood() {

	}

	public Mood(String name, int scale) {
		this.name = name;
		this.scale = scale;
	}
	
	public String getName() {
		return name;
	}
	
	public int getScale() {
		return scale;
	}
	
	public MoodEntry getMoodEntry(){
		return moodEntry;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public void setScale(int scale) {
		this.scale = scale;
	}
	
	public void setMoodEntry(MoodEntry mood_entry){
		this.moodEntry = mood_entry;
	}
	
	
}
