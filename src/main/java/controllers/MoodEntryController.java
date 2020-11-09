package controllers;

import java.util.*;

import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import models.MoodEntry;
import models.UserInfo;
import repository.MoodEntryRepository;
import repository.UserInfoRepository;
import service.MoodEntryService;

@CrossOrigin
@RestController
public class MoodEntryController {

	@Autowired
	private MoodEntryRepository entry_repo;

	@Autowired
	private UserInfoRepository user_repo;

	@Autowired
	private MoodEntryService entry_service;
	
	@GetMapping("/entries") 
	public List<MoodEntry> getEntries() {
		return entry_service.getEntries();
	}

	@GetMapping("/user/{user_id}/entries") 
	public List<MoodEntry> findByUserId(@PathVariable ("user_id")  int user_id) {
		return entry_service.findByUserId(user_id);
	}

	@GetMapping("/user/{userId}/entry/{date}") 
	public MoodEntry findByUserIdAndDate(@PathVariable ("userId") int userId, @PathVariable ("date") String date) {
		return entry_service.findByUserIdAndDate(userId, date);
	}

	@GetMapping("/entry/{date}") 
	public MoodEntry findByDate(@PathVariable ("date") String date) {
		return entry_service.findByDate(date);
	}

	@PostMapping("/user/{user_id}/entry") 
	public MoodEntry saveEntry(@PathVariable (value = "user_id") int user_id, @RequestBody MoodEntry newEntry) {
		boolean checkIfExists = entry_repo.existsByDate(newEntry.getDate());
		if (!checkIfExists) {
			return user_repo.findById(user_id).map(user -> {
				newEntry.setUserInfo(user);
				return entry_repo.save(newEntry);
			}).orElseThrow(RuntimeException::new);
		} else {
			return entry_repo.findByDate(newEntry.getDate());
		}
	}
}
