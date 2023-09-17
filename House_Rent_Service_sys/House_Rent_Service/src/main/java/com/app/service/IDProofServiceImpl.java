package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CreateIdProof;
import com.app.entity.IdProofDetails;
import com.app.entity.User;
import com.app.repository.IDProofServiceRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class IDProofServiceImpl implements IDProofService{

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private IDProofServiceRepository idProofRepo;
	@Override
	public IdProofDetails createNewId(CreateIdProof request) {
		User user =  userRepo.findById(request.getUserId()).get();
		IdProofDetails id = new IdProofDetails(request.getIdNo(),request.getIdType());
		id.setUserIdProof(user);
		return idProofRepo.save(id);
	}

}
