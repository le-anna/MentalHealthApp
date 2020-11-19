package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import models.Mood;
import repository.MoodRepository;

@Service
@Transactional
public class MoodService {

	@Autowired
	private MoodRepository moodRepo;

	public List<Mood> getMoods() {
		return moodRepo.findAll();
	}
	
	public List<Mood> findByEntryId(int entryId) {
		return moodRepo.findByEntryId(entryId);
	}

	public Mood findByEntryDate(String entryDate) {
		return moodRepo.findByEntryDate(entryDate);
	}

	public List<Mood> findByEntry_UserId_AndEntry_Date(int userId, String entryDate) {
		return moodRepo.findByEntry_UserId_AndEntry_Date(userId, entryDate);
	}

	public List<Mood> findByEntry_UserId(int userId) {
		return moodRepo.findByEntry_UserId(userId);
	}

	public Mood saveMood(Mood mood) {
		return moodRepo.save(mood);
	}

	public boolean existsByEntryDateAndName(String date, String name) {
		return moodRepo.existsByEntryDateAndName(date, name);
	}

	public Mood findByEntryDateAndName(String date, String name) {
		return moodRepo.findByEntryDateAndName(date, name);
	}

	public Mood findByName(String name) {
		return moodRepo.findByName(name);
	}

}
