package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {}