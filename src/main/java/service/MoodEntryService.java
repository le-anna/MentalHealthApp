package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import models.MoodEntry;
import repository.MoodEntryRepository;

@Service
@Transactional
public class MoodEntryService {

	@Autowired
	private MoodEntryRepository moodEntryRepo;
	
	public List<MoodEntry> getEntries() {
		return moodEntryRepo.findAll();
	}

	public List<MoodEntry> findByUserId(int user_id) {
		return moodEntryRepo.findByUserId(user_id);
	}

	public MoodEntry saveEntry(MoodEntry entry) {
		return moodEntryRepo.save(entry);
	}

}
