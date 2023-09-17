package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CreateAdminHouse;
import com.app.entity.AdminHouse;
import com.app.entity.IdProofDetails;
import com.app.entity.ItemType;
import com.app.entity.Location;
import com.app.entity.User;
import com.app.repository.AdminHouseRepository;
import com.app.repository.IDProofServiceRepository;
import com.app.repository.ItemTypeRepository;
import com.app.repository.LocationRepository;
import com.app.repository.UserRepository;


@Service
@Transactional
public class AdminHouseServiceImpl implements AdminHouseService{

	@Autowired
	private LocationRepository locRepo;
	
	@Autowired
	private ItemTypeRepository itemTypeRepo;
	
	@Autowired
	private IDProofServiceRepository idProofRepo;
	
	@Autowired
	private AdminHouseRepository adminHouseRepo;
	@Autowired
	private UserRepository userRepo;
	
	
	@Override
	public AdminHouse createAdminHouse(CreateAdminHouse request) {
		Location loc = locRepo.findById(request.getHouseLocationId()).get();
		System.out.println(loc);
		ItemType itemType = itemTypeRepo.findById(request.getHouseTypeId()).get();
		IdProofDetails idProofDetails = idProofRepo.findById(request.getUserIdProofId()).get();
		User user = userRepo.findById(request.getUserId()).get();
		AdminHouse adminHouse = new AdminHouse(request.getItemName(), request.getDesc(), request.getPricePerUnit(),
				request.getAreaInSqFt(), request.getUnit());
		adminHouse.setHouseLocation(loc);
		adminHouse.setHouseType(itemType);
		adminHouse.setIdProof(idProofDetails);
		adminHouse.setUserHouse(user);
		
		return adminHouseRepo.save(adminHouse);
	}


	@Override
	public AdminHouse updateAdminHouse(Long id, CreateAdminHouse updateHouseRequest) {
		System.out.println(updateHouseRequest.getUnit());
		Location location = locRepo.findById(updateHouseRequest.getHouseLocationId()).get();
		System.out.println(location);
		ItemType itemType = itemTypeRepo.findById(updateHouseRequest.getHouseTypeId()).get();
		System.out.println(itemType);
		 AdminHouse existingAdminHouse = adminHouseRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		 existingAdminHouse.setItemName(updateHouseRequest.getItemName());
		 existingAdminHouse.setDescription(updateHouseRequest.getDesc());
		 existingAdminHouse.setPricePerUnit(updateHouseRequest.getPricePerUnit());
		 existingAdminHouse.setQuantity(updateHouseRequest.getUnit());
		 existingAdminHouse.setAreaInSqFt(updateHouseRequest.getAreaInSqFt());
		 existingAdminHouse.setHouseLocation(location);
		 existingAdminHouse.setHouseType(itemType);
		return adminHouseRepo.save(existingAdminHouse);
	}
	 public long countTotalHouses() {
	        return adminHouseRepo.count();
	    }
	 public int sumQuantityOfHouses() {
	        Integer sum =adminHouseRepo.sumQuantity();
	        return sum != null ? sum : 0;	    }
	
	

}
