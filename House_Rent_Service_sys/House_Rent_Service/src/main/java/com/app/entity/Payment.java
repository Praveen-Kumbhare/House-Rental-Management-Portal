package com.app.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter 
@Getter 
@ToString
@Table(name = "payment_tbl")
public class Payment extends BaseEntity{
	@Column(name = "payment_mode")
	private String paymentMode;
	@Column(name = "amount_paid")
	private double amountPaid;
	@Column(name = "paid_date")
	private LocalDate datePaid;
//	@Column(name = "amount_due")
//	private double amountDue;

	public Payment(String paymentMode, double amountPaid, LocalDate datePaid) {
		super();
		this.paymentMode = paymentMode;
		this.amountPaid = amountPaid;
		this.datePaid = datePaid;
	}
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User userPayment;
	
	

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "available_house_id")
	private UserHouse userHouse;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "admin_house_id")
	private AdminHouse adminHouse;
	
	

}
