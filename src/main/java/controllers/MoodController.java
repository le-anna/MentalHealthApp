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
import models.MoodEntry;
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

    @GetMapping("{entryDate}/moods")
    public Mood findByEntryDate(@PathVariable (value = "entryDate") String entryDate) {
        return moodService.findByEntryDate(entryDate);
    }

    @GetMapping("{entryDate}/user/{userId}/moods")
    public List<Mood> findByEntry_UserId_AndEntry_Date(@PathVariable (value = "userId") int userId, @PathVariable (value = "entryDate") String entryDate) {
        return moodService.findByEntry_UserId_AndEntry_Date(userId, entryDate);
    }

    @GetMapping("testingUser/{userId}") 
    public List<Mood> findByEntry_UserId(@PathVariable (value = "userId") int userId) {
        return moodService.findByEntry_UserId(userId);
    }

    @PostMapping("/entry/{entryId}/mood") 
	public Mood saveMood(@PathVariable (value = "entryId") int entryId, @RequestBody Mood mood) {
		return mood_entry_repo.findById(entryId).map(mood_entry -> {
            mood.setMoodEntry(mood_entry);
            return mood_repo.save(mood);
        }).orElseThrow(RuntimeException::new);
    }

    @PostMapping("user/{userId}/entry/{entryDate}/mood") 
	public Mood saveMoodByDate(@PathVariable (value = "entryDate") String entryDate,@PathVariable (value = "userId") int userId, @RequestBody Mood mood) {
        int tempId = mood_entry_repo.findByUserIdAndDate(userId, entryDate).getId();
		return mood_entry_repo.findById(tempId).map(entry -> {
            mood.setMoodEntry(entry);
            return mood_repo.save(mood);
        }).orElseThrow(RuntimeException::new);
    }

    
}
