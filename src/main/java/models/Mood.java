package models;

import javax.persistence.*;

@Entity 
@Table(name = "mood")
public class Mood {
	
	@Id
	@Column(name="mood_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private int scale;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="mood_entry_id", nullable=false)
	public MoodEntry entry;

	public Mood() {
	}

	public Mood(String name, int scale) {
		this.name = name;
		this.scale = scale;
	}

	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public int getScale() {
		return scale;
	}
	
	public MoodEntry getMoodEntry(){
		return entry;
	}

	public UserInfo getUser() {
		return entry.getUser();
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public void setScale(int scale) {
		this.scale = scale;
	}
	
	public void setMoodEntry(MoodEntry entry){
		this.entry = entry;
	}

}
