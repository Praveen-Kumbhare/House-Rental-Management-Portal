package com.app.service;

import com.app.dto.resultDto;
import com.app.entity.User;

public interface BookingService {
	public resultDto landlordmailBookingHouse(User CustomerData,User Landlord);
	public resultDto usermailBookingHouse(User CustomerData,User Landlord);
}
