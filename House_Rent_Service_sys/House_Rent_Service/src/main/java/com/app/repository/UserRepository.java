package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Role;
import com.app.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmailAndPassword(String email,String password);
	User findByEmail(String email);
	Optional<User> findUserByEmail(String userEmail);
	long countByRole(Role user);
}
