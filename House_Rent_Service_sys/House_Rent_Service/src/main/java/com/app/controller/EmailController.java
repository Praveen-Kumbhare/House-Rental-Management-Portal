package com.app.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Credential;
import com.app.dto.EmialDTO;
import com.app.dto.Response;
import com.app.dto.resultDto;
import com.app.entity.User;
import com.app.service.EmailService;
import com.app.service.UserService;




@CrossOrigin(origins = "*")
@RestController


public class EmailController{
	Random random=new Random(1000);
	
	@Autowired
	private EmailService emailservice;
	
    @Autowired
    private UserService userService;
	
	@PostMapping("/sendotp")
	public resultDto Signup(@RequestBody EmialDTO req) {	
		
		
		resultDto resultdto=null;
	
		
		System.out.println("EMAIL"+req.getEmail());
		
		User validuser=userService.checkEmail(req.getEmail());
		System.out.println(req.getEmail());
		if(validuser!=null) {
			System.out.println("yupp baby");
			
			int otp=random.nextInt(999999);
			String subject ="OTP from House Rent Services";
			String message="your Reset password message OTP = "+otp+" ";
			String to=req.getEmail();
			boolean flag=this.emailservice.sendEmail(subject, message, to);		
			if(flag) {
				resultdto=new resultDto("success",otp);
			}else {
				resultdto=new resultDto("failure",otp);
			}
		}else{
			System.out.println("Ohhh sorrry ");
		}
				 
		return resultdto;
	}
	

	@PostMapping("/sendotp1")
	public resultDto CreateAccount(@RequestBody EmialDTO req) {

		resultDto resultdto = null;

		System.out.println("EMAIL" + req.getEmail());

		User validuser = userService.checkEmail(req.getEmail());
		System.out.println(req.getEmail());
		if (validuser != null) {
			System.out.println("Ohhh sorrry ");
			resultdto = new resultDto("failure", 12);
		} else {
			System.out.println("yupp baby");

			int otp = random.nextInt(999999);
			String subject = "OTP from House Rent Services";
			System.out.println(otp);
			String message = "your Reset password message OTP = " + otp + " ";
			String to = req.getEmail();
			boolean flag = this.emailservice.sendEmail(subject, message, to);
			if (flag) {
				resultdto = new resultDto("success", otp);
			} else {
				resultdto = new resultDto("failure", otp);
			}

		}

		return resultdto;
	}
	public resultDto usermailBookingHouse(User CustomerData,User Landlord)
	{
		resultDto resultdto = null;
		String subject = "Congratulations on Booking Your New House - Landlord Details Inside";
		String message = "Dear" +CustomerData.getFirstName()+",\r\n"
				+ "\r\n"
				+ "Congratulations on booking your new house! We are delighted to hear that you have found a new home that meets your needs and preferences. We wish you all the best as you embark on this exciting new chapter in your life.\r\n"
				+ "\r\n"
				+ "To help you settle in, we wanted to provide you with the contact information for your landlord. Please find their details below:\r\n"
				+ "\r\n"
				+ "Landlord Name:"+ Landlord.getFirstName()+ " "+ Landlord.getLastName()+"\r\n"
				+ "Contact Number: "+ Landlord.getMobileNumber()+"\r\n"
				+ "Email Address: "+ Landlord.getEmail()+"\r\n"
				+ "\r\n"
				+ "If you have any questions or concerns about your new home, please do not hesitate to contact us. We are always here to assist you and ensure that you have a comfortable and enjoyable living experience.\r\n"
				+ "\r\n"
				+ "Once again, congratulations on your new house, and we wish you all the best in your new home.\r\n"
				+ "\r\n"
				+ "Best regards,\r\n"
				+ "House Rent Service ";
		String to = CustomerData.getEmail();
		boolean flag = this.emailservice.sendEmail(subject, message, to);
		if (flag) {
			resultdto = new resultDto("success",12);
		} else {
			resultdto = new resultDto("failure", 14);
		}
		return resultdto;
		
	}
	public resultDto landlordmailBookingHouse(User CustomerData,User Landlord)
	{
		resultDto resultdto = null;
		String subject = ": Confirmation of Your House Booking";
		String message = "Dear "+Landlord.getFirstName()+",\r\n"
				+ "\r\n"
				+ "I am pleased to inform you that [Customer Name] has booked your house for rent. The customer is interested in moving in as soon as possible and is looking forward to a smooth and seamless transition.\r\n"
				+ "\r\n"
				+ "As per our policy, we provide our customers with the contact information of their landlord for further communication. Here are the customer's details:\r\n"
				+ "\r\n"
				+ "Customer Name: "+CustomerData.getFirstName()+" "+CustomerData.getLastName()+"\r\n"
				+ "Mobile Number: "+CustomerData.getMobileNumber()+"\r\n"
				+ "Email Address: "+CustomerData.getEmail()+"\r\n"
				+ "\r\n"
				+ "We kindly request that you contact the customer as soon as possible to schedule a move-in date and provide any necessary details regarding the rental agreement.\r\n"
				+ "\r\n"
				+ "We appreciate your prompt attention to this matter and thank you for your cooperation.\r\n"
				+ "\r\n"
				+ "Best regards,\r\n"
				+ "\r\n"
				+ " HouseRent services ";
		String to = Landlord.getEmail();
		System.out.println(to);
		System.out.println();
		boolean flag = this.emailservice.sendEmail(subject, message, to);
		if (flag) {
			resultdto = new resultDto("success",12);
		} else {
			resultdto = new resultDto("failure", 14);
		}
		return resultdto;
	
	}
	
	
	
	

}
