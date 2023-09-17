package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;

import com.app.entity.User;
import com.app.repository.UserRepository;
@Service
@Transactional
public class USerServiceImpl implements UserService {

	@Autowired
	private UserRepository memberDao;

	@Override
	public User updatebyId(String email, User updatedUser) {
	
		User user = memberDao.findByEmail(email);
	        if (user != null) {
	        	//user.setId(updatedUser.getId());
	            user.setFirstName(updatedUser.getFirstName());
	            user.setLastName(updatedUser.getLastName());
	            user.setMobileNumber(updatedUser.getMobileNumber());
	            user.setRegTime(updatedUser.getRegTime());
	            memberDao.save(user);
	        }
	        return user;
	}
	@Override
	public User checkEmail(String email) {
		User validuser=memberDao.findByEmail(email);
		return validuser;
	}

	@Override
	public User restPass(User validuser, String password) {
		System.out.println("inside userservice");
		System.out.println(validuser);
		validuser.setPassword(password);
		User persistentUser=memberDao.save(validuser);
		return persistentUser;
	}

	@Override
	public User UpdatePassword(String email, String password) {
		Optional<User> optional = memberDao.findUserByEmail(email);
		if (!optional.isPresent()) {
			throw new ResourceNotFoundException("We didn't find an account for that e-mail address.");
		} else {

			optional.get().setPassword(password);
			return memberDao.save(optional.get());

		}
	}
}
