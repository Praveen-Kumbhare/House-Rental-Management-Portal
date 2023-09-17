package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.AdminHouse;
import com.app.entity.ItemType;
import com.app.entity.Location;
import com.app.entity.User;

public interface AdminHouseRepository extends JpaRepository<AdminHouse, Long>{
	AdminHouse findById(long Id);
	List<AdminHouse> findByHouseType(ItemType id);
	List<AdminHouse> findByQuantityGreaterThan(int quantity);
	List<AdminHouse> findByHouseLocation(Location id);
//	Integer sumQuantityOfHouses();
	List<AdminHouse> findByUserHouse(User id);
    @Query("SELECT COALESCE(SUM(h.quantity), 0) FROM AdminHouse h")
    int sumQuantity();
	
}
