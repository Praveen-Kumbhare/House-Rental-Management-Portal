package com.app.service;

import com.app.dto.CreatePayment;
import com.app.entity.Payment;

public interface PaymentService {
	String createNewPayment(CreatePayment request);
}
