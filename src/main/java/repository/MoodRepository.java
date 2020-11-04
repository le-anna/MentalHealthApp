package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.Mood;
import java.util.*;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Integer> {
    List<Mood> findByEntryId(int entryId);
    List<Mood> findByUserId(int userId);
}