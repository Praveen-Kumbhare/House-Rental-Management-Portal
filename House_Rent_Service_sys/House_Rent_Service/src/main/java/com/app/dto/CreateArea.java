package com.app.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateArea {
	@NotNull(message = "Location Id must be supplied")
	private Long locationId;
	@NotNull(message = "Area Description must be supplied")
	private String areaDesc;
	@NotNull(message = "Postal Code must be supplied")
	private int postalCode;
}
