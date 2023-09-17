package com.app.service;

import com.app.entity.User;

public interface UserService {
	User UpdatePassword(String email,String password);
	User  updatebyId(String email, User updatedDetachedUser);
	User checkEmail(String email);
	User restPass(User validuser, String password);
}
