package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByEntry_UserId_AndEntry_Date(int userId, String entryDate);
}