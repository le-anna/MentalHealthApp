package service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.hibernate.Hibernate;
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

    public TreeSet<String> getDatesForDropDown () {
        List<MoodEntry> allEntries = moodEntryRepo.findAll();
        Set<String> set = new HashSet<>();
        for (MoodEntry item : allEntries) {
            set.add(item.getDate());
		}
		TreeSet<String> treeSet = new TreeSet<String>();
		treeSet.addAll(set);
        return treeSet;
	}
	
	public List<MoodEntry> getEntries() {
		List<MoodEntry> entries = moodEntryRepo.findAll();
		Hibernate.initialize(entries);
		return entries;
	}

	public List<MoodEntry> findByUserId(int user_id) {
		return moodEntryRepo.findByUserId(user_id);
	}

	public boolean existsByDate(String date) {
		return moodEntryRepo.existsByDate(date);
	}

	public MoodEntry saveEntry(MoodEntry entry) {
		return moodEntryRepo.save(entry);
	}

	public MoodEntry findByUserIdAndDate(int userId, String date) {
		return moodEntryRepo.findByUserIdAndDate(userId, date);
	} 

	public MoodEntry findByDate(String date) {
		return moodEntryRepo.findByDate(date);
	}

}
