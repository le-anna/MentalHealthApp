package service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Backend.UserInfo;
import respository.UserInfoDAO;

@Service
public class UserInfoService {

@Autowired
private UserInfoDAO userinfoDAO;

@Transactional
public List<UserInfo> getUsers() {
	return userinfoDAO.getUsers();
}

}
