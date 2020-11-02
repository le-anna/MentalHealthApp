package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.Mood;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Integer> {}