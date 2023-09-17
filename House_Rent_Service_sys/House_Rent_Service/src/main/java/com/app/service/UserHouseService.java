package com.app.service;

import com.app.dto.CreateUserHouse;
import com.app.entity.UserHouse;

public interface UserHouseService {
	UserHouse createUserHouse(CreateUserHouse request);

}
