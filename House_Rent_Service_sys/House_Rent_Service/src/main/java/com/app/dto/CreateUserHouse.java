package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateUserHouse {
	private Long adminHouseId;
	private Long useId;
	private LocalDate timeFrom;
	private LocalDate timeTo;
	private double pricePerUnit;
//	private double discount;
//	private double fee;
	private double totalPrice;
	private String renterGradeDesc;	
}
