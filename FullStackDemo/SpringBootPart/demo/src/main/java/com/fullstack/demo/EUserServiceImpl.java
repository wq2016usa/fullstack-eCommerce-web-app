package com.fullstack.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EUserServiceImpl implements EUserService{
	
	@Autowired
	EUserRepository eUserRepository;

	@Override
	public EUser create(EUser euser) {
		
		return eUserRepository.save(euser);
	}

	@Override
	public List<EUser> getAllUsers() {
		return eUserRepository.findAll();
	}

	@Override
	public EUser getUserById(Integer id) {
		return eUserRepository.findById(id).get();
	}

	@Override
	public EUser getUserByUsername(String username) {
		
		return eUserRepository.findByUsername(username);
	}

}
