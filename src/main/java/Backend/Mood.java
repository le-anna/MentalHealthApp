package Backend;
import javax.persistence.*;

@Entity 

public class Mood {
	
	@Id
	@Column(name="MoodID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int MoodID;
	
	private String name;
	
	private int scale;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="MoodEntryID", nullable=false)
	public MoodEntry mood_entry;

	public Mood(String name, int scale) {
		this.name = name;
		this.scale = scale;
	}
	
	String getName() {
		return name;
	}
	
	int getScale() {
		return scale;
	}
	
	MoodEntry getMoodEntry(){
		return mood_entry;
	}
	
	void setName(String name) {
		this.name = name;
	}
	void setScale(int scale) {
		this.scale = scale;
	}
	
	void setMoodEntry(MoodEntry mood_entry){
		this.mood_entry = mood_entry;
	}
	
	void saveMood(MoodEntry mood_entry, String name, int scale) {
		this.mood_entry = mood_entry;
		this.name = name;
		this.scale = scale;
	}
	
	
}
