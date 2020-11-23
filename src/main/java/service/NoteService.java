package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import models.Note;
import repository.NoteRepository;

@Service
@Transactional
public class NoteService {  

    @Autowired
	private NoteRepository noteRepo;

	public List<Note> getNotes() {
		return noteRepo.findAll();
	}

	public List<Note> findByEntry_UserId_AndEntry_Date(int userId, String entryDate) {
		return noteRepo.findByEntry_UserId_AndEntry_Date(userId, entryDate);
	}

	public List<Note> findByNoteIgnoreCaseContaining(String word) {
		return noteRepo.findByNoteIgnoreCaseContaining(word);
	}
}
