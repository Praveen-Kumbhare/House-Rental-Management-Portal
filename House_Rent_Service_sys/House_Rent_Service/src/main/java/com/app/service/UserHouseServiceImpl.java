package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CreateUserHouse;
import com.app.entity.AdminHouse;
import com.app.entity.User;
import com.app.entity.UserHouse;
import com.app.repository.AdminHouseRepository;
import com.app.repository.UserHouseRepository;
import com.app.repository.UserRepository;


@Service
@Transactional
public class UserHouseServiceImpl implements UserHouseService {
	@Autowired
	private AdminHouseRepository adminHouseRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private UserHouseRepository userHouseRepo;	
	@Override
	public UserHouse createUserHouse(CreateUserHouse request) {
		AdminHouse adminHouse=adminHouseRepo.findById(request.getAdminHouseId()).get();
		User user = userRepo.findById(request.getUseId()).get();
		UserHouse userHouse = new UserHouse(request.getTimeFrom(),request.getTimeTo(),request.getPricePerUnit(),
				request.getTotalPrice(), request.getRenterGradeDesc());
		userHouse.setAdminHouse(adminHouse);
		userHouse.setUserHouse(user);
		return userHouseRepo.save(userHouse);
	}

}