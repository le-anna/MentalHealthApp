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
    List<Mood> findByEntry_UserId_AndEntry_DateBetween(int userId, String startDate, String endDate);
    List<Mood> findByName_AndEntry_UserId_AndEntry_DateBetween(String name, int userId, String startDate, String endDate);
    void deleteByName(Mood mood);
    Mood findByName(String name);
    Mood findById(int id);
    boolean existsByEntryDateAndName(String date, String Name); 
    Mood findByEntryDateAndName(String date, String Name);
}