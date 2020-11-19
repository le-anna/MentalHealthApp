package models;

import javax.persistence.*;

@Entity 
@Table(name = "note")
public class Note {

	@Id
	@Column(name="note_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String note;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="mood_entry_id", nullable=false)
	public MoodEntry entry;

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
	public void setMoodEntry(MoodEntry entry){
		this.entry = entry;
	}
	
}
