package com.app.service;

import java.time.LocalDate;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CreatePayment;
import com.app.entity.AdminHouse;
import com.app.entity.Payment;
import com.app.entity.User;
import com.app.entity.UserHouse;
import com.app.repository.AdminHouseRepository;
import com.app.repository.PaymentRepository;
import com.app.repository.UserHouseRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserHouseRepository userHouseRepo;

	@Autowired
	private AdminHouseRepository adminHouseRepo;

	@Autowired
	private PaymentRepository payRepo;

	@Override
	public String createNewPayment(CreatePayment request) {
		User user = userRepo.findById(request.getUserId()).get();
		UserHouse userHouse = userHouseRepo.findById(request.getUserHouseId()).get();
		AdminHouse admHouse = userHouse.getAdminHouse();

		Payment pay = new Payment(request.getPaymentMode(), request.getAmountPaid(), request.getDatePaid());
		pay.setUserPayment(user);
		pay.setUserHouse(userHouse);
		pay.setAdminHouse(admHouse);
		payRepo.save(pay);
		Optional<AdminHouse> optionalhouse = adminHouseRepo.findById(admHouse.getId());
		if (optionalhouse.isPresent()) {
			AdminHouse adminHouse = optionalhouse.get();
			int newQuantity = adminHouse.getQuantity() - 1;
			if (newQuantity >= 0) {
				adminHouse.setQuantity(newQuantity);
				adminHouseRepo.save(adminHouse);
			} else {
				throw new RuntimeException("Not enough quantity available.");
			}
		} else {
			throw new RuntimeException("Product not found.");
		}
		return "Updated successfully";
	}

}