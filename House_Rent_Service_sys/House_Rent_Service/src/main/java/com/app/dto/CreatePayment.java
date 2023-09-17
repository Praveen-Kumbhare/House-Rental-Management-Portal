package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreatePayment {
	private Long userId;
	private Long userHouseId;
	private String paymentMode;
	private double amountPaid;
	private LocalDate datePaid;
	

}
