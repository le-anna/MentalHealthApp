package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import models.Mood;
import repository.MoodRepository;

@Service
@Transactional
public class MoodService {

	@Autowired
	private MoodRepository mood_repo;
	
	public List<Mood> getMoods() {
		return mood_repo.findAll();
	}

	public Mood saveMood(Mood mood) {
		return mood_repo.save(mood);
	}

}
