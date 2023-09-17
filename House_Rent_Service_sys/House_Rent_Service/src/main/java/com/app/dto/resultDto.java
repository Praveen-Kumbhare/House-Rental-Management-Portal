package com.app.dto;

public class resultDto {
	
	private String status;
	private int otp;
	
	public resultDto() {
		// TODO Auto-generated constructor stub
	}

	public resultDto(String status, int otp) {
		this.status=status;
		this.otp=otp;
		
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}
	
	
	

}
