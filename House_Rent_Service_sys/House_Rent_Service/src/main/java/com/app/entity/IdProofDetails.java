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
@Table(name = "id_proof_tbl")
public class IdProofDetails extends BaseEntity{
	
	@Column(name = "id_type")
	private String idType;
	@Column(name = "id_no")
	private String idNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "user_id" ,unique = true)
	private User userIdProof;
	
	public IdProofDetails(String idType , String idNo) {
		super();
		this.idType = idType;
		this.idNo = idNo;
	}
}
