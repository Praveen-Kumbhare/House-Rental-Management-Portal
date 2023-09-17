package com.app.entity;

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
@Table(name = "admin_house_tbl")
public class AdminHouse extends BaseEntity {
	@Column(name = "item_name")
	private String itemName;
	private String description;
	@Column(name = "price_per_unit")
	private double pricePerUnit;
	//private byte image;
//	@Column(name = "condition_in")
//	private String condition;
	@Column(name = "area_in_sq_ft")
	private double areaInSqFt;
	@Column(name = "qty")
	private int quantity;
	

	@ManyToOne(fetch = FetchType.EAGER)
	//@JsonIgnore
	@JoinColumn(name = "location_id")
	private Location houseLocation;
	

	@ManyToOne(fetch = FetchType.EAGER)
	//@JsonIgnore
	@JoinColumn(name = "house_type")
	private ItemType houseType;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "id_proof_id")
	private IdProofDetails idProof;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User userHouse;

	public AdminHouse(String itemName, String description, double pricePerUnit,  double areaInSqFt, int quantity) {
		super();
		this.itemName = itemName;
		this.description = description;
		this.pricePerUnit = pricePerUnit;
//		this.condition = condition;
		this.areaInSqFt = areaInSqFt;
		this.quantity = quantity;
	}




}
