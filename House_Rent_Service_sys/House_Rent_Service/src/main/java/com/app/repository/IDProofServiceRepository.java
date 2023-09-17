package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.IdProofDetails;
import com.app.entity.User;

public interface IDProofServiceRepository extends JpaRepository<IdProofDetails, Long>  {

	List<IdProofDetails> findByUserIdProof(User id);
}
