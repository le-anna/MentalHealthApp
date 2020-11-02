package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.MoodEntry;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Integer> {}