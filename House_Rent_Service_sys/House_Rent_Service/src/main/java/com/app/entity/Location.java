package com.app.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

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
@Table(name = "location_tbl")
public class Location extends BaseEntity{
	@Column(length = 50)
	private String state;
	@Column(length = 50)
	private String city;
	@Column(name = "area_desc")
	private String areaDesc;
	@Column(name = "postal_code")
	private int postalCode;

}
