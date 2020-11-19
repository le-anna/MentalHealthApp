package controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import models.Mood;
import models.MoodEntry;
import repository.MoodEntryRepository;
import repository.MoodRepository;
import repository.UserInfoRepository;
import service.MoodService;

@CrossOrigin
@RestController
public class MoodController {

	@Autowired
    private MoodService moodService;

    @Autowired
    private MoodRepository mood_repo;

    @Autowired 
    private MoodEntryRepository entryRepo;

    @Autowired 
    private UserInfoRepository userRepo;

    @GetMapping("/moods") 
	public List<Mood> getEntries() {
		return moodService.getMoods();
	}
	
	@GetMapping("/entry/{moodEntryId}/moods") 
	public List<Mood> findByMoodEntryId(@PathVariable (value = "moodEntryId")  int moodEntryId) {
		return moodService.findByEntryId(moodEntryId);
    }

    // @GetMapping("{entryDate}/moods")
    // public Mood findByEntryDate(@PathVariable (value = "entryDate") String entryDate) {
    //     return moodService.findByEntryDate(entryDate);
    // }

    @GetMapping("{entryDate}/user/{userId}/moods")
    public List<Mood> findByEntry_UserId_AndEntry_Date(@PathVariable (value = "userId") int userId, @PathVariable (value = "entryDate") String entryDate) {
        return moodService.findByEntry_UserId_AndEntry_Date(userId, entryDate);
    }

    @GetMapping("user/{userId}/moods") 
    public List<Mood> findByEntry_UserId(@PathVariable (value = "userId") int userId) {
        return moodService.findByEntry_UserId(userId);
    }

    @PostMapping("/entry/{entryId}/mood") 
	public Mood saveMood(@PathVariable (value = "entryId") int entryId, @RequestBody Mood mood) {
		return entryRepo.findById(entryId).map(mood_entry -> {
            mood.setMoodEntry(mood_entry);
            return mood_repo.save(mood);
        }).orElseThrow(RuntimeException::new);
    }

    @PostMapping("user/{userId}/entry/{entryDate}/mood") 
	public Mood saveMoodByDate(@PathVariable (value = "entryDate") String entryDate,@PathVariable (value = "userId") int userId, @RequestBody Mood mood) {
        int tempId = entryRepo.findByUserIdAndDate(userId, entryDate).getId();
		return entryRepo.findById(tempId).map(entry -> {
            mood.setMoodEntry(entry);
            return mood_repo.save(mood);
        }).orElseThrow(RuntimeException::new);
    }

    
    @PostMapping("/user/{userId}/entry/{entryDate}/moods") 
	public MoodEntry saveEntry(@PathVariable (value = "userId") int userId, @PathVariable (value = "entryDate") String entryDate, @RequestBody List<Mood> moods) {
        boolean checkIfExists = entryRepo.existsByUserIdAndDate(userId, entryDate);
        if (!checkIfExists) {
            return userRepo.findById(userId).map(user -> {
                MoodEntry entry = new MoodEntry();
                entry.setDate(entryDate);
                entry.setUserInfo(user);
                entryRepo.save(entry);
                for(Mood temp : moods) {
                    temp.setMoodEntry(entry);
                    mood_repo.save(temp);
                     }
            	return entryRepo.save(entry);
            	}).orElseThrow(RuntimeException::new);
        } else {
            for(Mood temp : moods) {
                temp.setMoodEntry(entryRepo.findByUserIdAndDate(userId, entryDate));
                    mood_repo.save(temp);
                 }
                return entryRepo.findByUserIdAndDate(userId, entryDate);
        }
    } 

    @DeleteMapping("deleteMood/{entryDate}/{name}")
    public void deleteMood ( @PathVariable (value = "entryDate") String entryDate, @PathVariable (value = "name") String name) {
        if (moodService.existsByEntryDateAndName(entryDate, name)) {
            mood_repo.deleteById(moodService.findByEntryDateAndName(entryDate, name).getId());
        }
    }

    @DeleteMapping("deleteMood/{id}")
    public void testDelete (@PathVariable (value = "id") int id) {
            mood_repo.deleteById(id);
    }

    @GetMapping("findMood/{date}/{name}")
    public boolean existsByEntryDateAndName (@PathVariable (value = "date") String date, @PathVariable (value = "name") String name) {
        return moodService.existsByEntryDateAndName(date, name);
    }

    @GetMapping("checkFindMood/{name}")
    public Mood findMood (@PathVariable (value = "name") String name) {
        return mood_repo.findByName(name);
    }
}
