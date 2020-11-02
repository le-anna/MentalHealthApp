package controllers;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import models.MoodEntry;
import models.UserInfo;
import repository.MoodEntryRepository;
import repository.UserInfoRepository;
import service.MoodEntryService;
import service.UserInfoService;


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

	@PostMapping("/user/{user_id}/entry") 
	public MoodEntry saveEntry(@PathVariable (value = "user_id") int user_id, @RequestBody MoodEntry newEntry) {
		return user_repo.findById(user_id).map(user -> {
            newEntry.setUserInfo(user);
            return entry_repo.save(newEntry);
        }).orElseThrow(RuntimeException::new);
	}
}
