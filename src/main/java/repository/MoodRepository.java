package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.Mood;
import java.util.*;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Integer> {
    List<Mood> findByEntryId(int entryId);
    Mood findByEntryDate(String entryDate);
    List<Mood> findByEntry_UserId_AndEntry_Date(int userId, String entryDate);
    List<Mood> findByEntry_UserId(int userId);
}