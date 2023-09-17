package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entity.Location;
import com.app.repository.LocationRepository;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

	@Autowired
	private  LocationRepository locationRepo;
	@Override
	public Location updateLocations(Long id, Location updatedEntity) {
		 Location existingLocation = locationRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found"));
		 existingLocation.setCity(updatedEntity.getCity());
		 existingLocation.setState(updatedEntity.getState());
		 existingLocation.setAreaDesc(updatedEntity.getAreaDesc());
		 existingLocation.setPostalCode(updatedEntity.getPostalCode());
		return locationRepo.save(existingLocation);
	}

}
