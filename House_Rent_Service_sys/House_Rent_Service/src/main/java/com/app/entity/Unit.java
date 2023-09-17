//package com.app.entity;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Setter
//@Getter
//@ToString
//@Table(name = "unit_tbl")
//public class Unit extends BaseEntity{
//	
//	@Column(name = "unit_name")
//	private String unitName;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JsonIgnore
//	@JoinColumn(name = "house_id")
//	private AdminHouse houseUnit;
//
//	public Unit(String unitName) {
//		super();
//		this.unitName = unitName;
//	}
//	
//	
//
//}
