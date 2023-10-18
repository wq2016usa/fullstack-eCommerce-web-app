package com.fullstack.demo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
public interface EUserService {
	
	public EUser create(EUser euser);
	
	public List<EUser> getAllUsers();
	
	public EUser getUserById(Integer id);
	
	public EUser getUserByUsername(String username);

}
