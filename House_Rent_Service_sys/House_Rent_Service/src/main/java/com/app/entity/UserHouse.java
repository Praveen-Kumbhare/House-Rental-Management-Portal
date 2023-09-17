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
@Table(name = "user_house")
public class UserHouse extends BaseEntity{
	@Column(name = "time_from")
	private LocalDate timeFrom;
	@Column(name = "time_to")
	private LocalDate timeTo;
	@Column(name = "price_per_unit")
	private double pricePerUnit;
//	private double discount;
//	private double fee;
	private double totalPrice;
private String renterGradeDesc;

	public UserHouse(LocalDate timeFrom, LocalDate timeTo, double pricePerUnit,
			double totalPrice, String renterGradeDesc) {
		super();
		this.timeFrom = timeFrom;
		this.timeTo = timeTo;
		this.pricePerUnit = pricePerUnit;
//		this.discount = discount;
//		this.fee = fee;
		this.totalPrice = totalPrice;
		this.renterGradeDesc = renterGradeDesc;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "house_list_id")
	private AdminHouse adminHouse;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User userHouse;
	
}
