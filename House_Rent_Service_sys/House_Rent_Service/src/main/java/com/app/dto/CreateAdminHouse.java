package com.app.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateAdminHouse {
	private Long houseLocationId;
	private Long houseTypeId;
	private Long userIdProofId;
	private Long userId;
	private String itemName;
	private String desc;
	private double pricePerUnit;
	@NotNull(message = "dimentions must be supplied")
	private double areaInSqFt;
	private int unit;

}
