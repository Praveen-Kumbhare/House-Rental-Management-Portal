package com.app.service;

import com.app.dto.CreateIdProof;
import com.app.entity.IdProofDetails;

public interface IDProofService {

	IdProofDetails createNewId(CreateIdProof request);
}
