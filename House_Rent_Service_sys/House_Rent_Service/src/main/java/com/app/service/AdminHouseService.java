package com.app.service;

import com.app.dto.CreateAdminHouse;
import com.app.entity.AdminHouse;

public interface AdminHouseService {
	AdminHouse createAdminHouse(CreateAdminHouse request);
	AdminHouse updateAdminHouse(Long id, CreateAdminHouse adminHouse);
	public long countTotalHouses();
	  public int sumQuantityOfHouses();
}
