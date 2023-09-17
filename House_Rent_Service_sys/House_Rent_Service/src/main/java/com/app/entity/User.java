package com.app.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users_tbl")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User extends BaseEntity {
	@NotBlank(message = "First name can't be blank")
	@Length(min = 4, max = 20, message = "Invalid first name!!!!!!")
	@Column(name = "first_name", length = 20)
	private String firstName;
	@NotBlank(message = "Last name can't be blank")
	@Length(min = 4, max = 20, message = "Invalid Last name!!!!!!")
	@Column(name = "last_name", length = 20)
	private String lastName;
	@Pattern(regexp = "^[0-9]{10}$", message = "Please enter a valid 10-digit mobile number")
	@Column(name = "moble_no", length = 20)
	private String mobileNumber;

	
	@Column(length = 40, unique = true)
	@Email(message = "Invalid email format")
	private String email;
	@Column(length = 20)
	@JsonProperty(access = Access.WRITE_ONLY) // skipped during ser(=marshalling) n kept during de-ser (un marshalling)
	private String password;

	@NotNull(message = "Reg Date must be suppled")
	@Column(length = 20)
	private LocalDate regTime;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	@NotNull(message = "Role must be supplied")
	private Role role;

}
