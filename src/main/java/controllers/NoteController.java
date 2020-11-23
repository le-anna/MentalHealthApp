package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

import models.Note;
import repository.MoodEntryRepository;
import repository.NoteRepository;
import service.NoteService;

@CrossOrigin
@RestController
public class NoteController {


	@Autowired
    private NoteService noteService;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired 
    private MoodEntryRepository entryRepo;

    @GetMapping("/notes") 
	public List<Note> getEntries() {
		return noteService.getNotes();
    }
    
    @GetMapping("user/{userId}/{entryDate}/notes")
    public List<Note> findByEntry_UserId_AndEntry_Date(@PathVariable (value = "userId") int userId, @PathVariable (value = "entryDate") String entryDate) {
        return noteService.findByEntry_UserId_AndEntry_Date(userId, entryDate);
    }
    
    @PostMapping("entry/{entryDate}/note") 
	public Note saveNote(@PathVariable (value = "entryDate") String entryDate, @RequestBody Note note) {
        boolean checkIfExists = entryRepo.existsByDate(entryDate);
        if (checkIfExists) {
            int tempId = entryRepo.findByDate(entryDate).getId();
            return entryRepo.findById(tempId).map(entry -> {
                note.setMoodEntry(entry);
                return noteRepo.save(note);
            }).orElseThrow(RuntimeException::new);
        } else {
            return note;
        }
    }

    @DeleteMapping("deleteNote/{id}")
    public void deleteNote (@PathVariable (value = "id") int id) {
            noteRepo.deleteById(id);
    }

    @GetMapping("/searchNotes/{word}")
    public List<Note> findByNoteContaining(@PathVariable (value = "word") String word) {
        return noteService.findByNoteIgnoreCaseContaining(word);
    }
}
