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
	private MoodEntryRepository entry_repo;
	
	public List<MoodEntry> getEntries() {
		return entry_repo.findAll();
	}

	public MoodEntry saveEntry(MoodEntry entry) {
		return entry_repo.save(entry);
	}

}
