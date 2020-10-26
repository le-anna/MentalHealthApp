package respository;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {}