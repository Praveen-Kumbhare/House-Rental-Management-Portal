package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.User;
import com.app.entity.UserHouse;

public interface UserHouseRepository extends JpaRepository<UserHouse, Long>{
	List<UserHouse>findByUserHouse(User id);
	
	
}
