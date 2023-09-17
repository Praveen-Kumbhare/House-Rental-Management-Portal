//package com.app.service;
//
//import javax.transaction.Transactional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.app.dto.CreateHouseUnit;
//import com.app.entity.AdminHouse;
//import com.app.entity.Unit;
//import com.app.repository.AdminHouseRepository;
//import com.app.repository.UnitRepository;
//
//
//@Service
//@Transactional
//public class HouseUnitServiceImpl implements HouseUnitService {
//
//	@Autowired
//	private AdminHouseRepository adminHouseRepo;
//	
//	@Autowired
//	private UnitRepository unitRepo;
//	
//	@Override
//	public Unit createHouseUnit(CreateHouseUnit request) {	
//		AdminHouse adminHouse = adminHouseRepo.getById(request.getHouseUnitId());	
//		Unit unit = new Unit(request.getUnitName());
//		unit.setHouseUnit(adminHouse);
//		return unitRepo.save(unit);
//	}
//
//}
