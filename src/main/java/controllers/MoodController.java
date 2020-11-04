package controllers;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import models.Mood;
import repository.MoodEntryRepository;
import repository.MoodRepository;
import service.MoodService;

@CrossOrigin
@RestController
public class MoodController {

	@Autowired
    private MoodService moodService;

    @Autowired
    private MoodRepository mood_repo;

    @Autowired 
    private MoodEntryRepository mood_entry_repo;

    @GetMapping("/moods") 
	public List<Mood> getEntries() {
		return moodService.getMoods();
	}
	
	@GetMapping("/entry/{moodEntryId}/moods") 
	public List<Mood> findByMoodEntryId(@PathVariable (value = "moodEntryId")  int moodEntryId) {
		return moodService.findByEntryId(moodEntryId);
    }

    @GetMapping("/user/{userId}/moods") 
	public List<Mood> findByUserId(@PathVariable (value = "userId")  int userId) {
		return moodService.findByUserId(userId);
    }


    @PostMapping("/entry/{mood_entry_id}/mood") 
	public Mood saveMood(@PathVariable (value = "mood_entry_id") int mood_entry_id, @RequestBody Mood mood) {
		return mood_entry_repo.findById(mood_entry_id).map(mood_entry -> {
            mood.setMoodEntry(mood_entry);
            mood.setUser(mood_entry.getUser());
            return mood_repo.save(mood);
        }).orElseThrow(RuntimeException::new);
	}
}
