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
import models.Note;
import repository.MoodEntryRepository;
import repository.MoodRepository;
import repository.NoteRepository;
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
	private MoodRepository moodRepo;

	@Autowired
	private NoteRepository noteRepo;

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

	// @GetMapping("entry/{date}") 
	// public MoodEntry findByDate(@PathVariable ("date") String date) {
	// 	return entry_service.findByDate(date);
	// }

	@GetMapping("user/{userId}/entries/filter") 
    public TreeSet<String> getDatesForDropDown () {
		return entry_service.getDatesForDropDown();
	}

	@PostMapping("/user/{user_id}/entry") 
	public MoodEntry createEntry(@PathVariable (value = "user_id") int user_id, @RequestBody MoodEntry newEntry) {
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

	// @PostMapping("test/user/{userId}") 
	// public MoodEntry saveEntry(@PathVariable (value = "userId") int userId, @RequestBody MoodEntry newEntry) {
	// 	boolean checkIfExists = entry_repo.existsByDate(newEntry.getDate());
	// 	if (!checkIfExists) {
	// 		return user_repo.findById(userId).map(user -> {
	// 			newEntry.setUserInfo(user);
	// 			List<Mood> moods = newEntry.getMoods();
	// 			for(Mood temp : moods) {
	// 				System.out.println(temp.getName());
	// 				temp.setMoodEntry(newEntry);
    //                 moodRepo.save(temp);
	// 			}
	// 			List<Note> notes = newEntry.getNotes();
	// 			for(Note temp : notes) {
    //                 temp.setMoodEntry(newEntry);
    //                 noteRepo.save(temp);
	// 			}
	// 			return entry_repo.save(newEntry);
	// 		}).orElseThrow(RuntimeException::new);
	// 	} else {

	// 		return user_repo.findById(userId).map(user -> {
	// 			newEntry.setUserInfo(user);
	// 			System.out.println(newEntry.getDate());
	// 			List<Mood> moods = newEntry.getMoods();
	// 			for(Mood temp : moods) {
	// 				System.out.println(temp.getName());
	// 				temp.setMoodEntry(newEntry);
    //                 moodRepo.save(temp);
	// 			}
	// 			List<Note> notes = newEntry.getNotes();
	// 			for(Note temp : notes) {
    //                 temp.setMoodEntry(newEntry);
    //                 noteRepo.save(temp);
	// 			}
	// 			return entry_repo.save(newEntry);
	// 		}).orElseThrow(RuntimeException::new);
	// 	}
	// }
}

