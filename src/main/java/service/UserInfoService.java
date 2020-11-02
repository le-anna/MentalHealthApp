package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import models.UserInfo;
import repository.UserInfoRepository;

@Service
@Transactional
public class UserInfoService {

	@Autowired
	private UserInfoRepository userInfoRepository;
	
	public List<UserInfo> getUsers() {
		return userInfoRepository.findAll();
	}
	
	public UserInfo getUser(int user_id) {
		return userInfoRepository.getOne(user_id);
	}

	public UserInfo saveUser(UserInfo user) {
		return userInfoRepository.save(user);
	}

}
