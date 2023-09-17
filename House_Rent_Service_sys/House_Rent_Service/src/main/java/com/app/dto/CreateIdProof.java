package com.app.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateIdProof {
	@NotNull(message = "user Id must be supplied")
	private Long userId;
	@NotNull(message = "Id type must be supplied")
	private String idType;
	@NotEmpty(message = "Id No must be supplied")
	private String idNo;
}
