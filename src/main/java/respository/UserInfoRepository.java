package respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {}