package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

import models.MoodEntry;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Integer> {
   List<MoodEntry> findByUserId(int user_id);
   MoodEntry findByUserIdAndDate(int userId, String date);
   MoodEntry findByDate(String date);
   boolean existsByDate(String date);
}