package com.fullstack.demo;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class EUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Column
	private String username;
	@Column
	private String password;
	@Column
	private boolean isAdmin;
	
//	@OneToMany(cascade = CascadeType.ALL)
//	@JoinColumn(name = "order_user_id", referencedColumnName="userId", nullable = false)
//    private List<Orders> orders;

	public EUser() {
		super();
	}
	
	public EUser(int userId, String username, String password, boolean isAdmin) {
		super();
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.isAdmin = isAdmin;
//		this.orders = orders;
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public boolean getIsAdmin() {
		return isAdmin;
	}


	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

//	public List<Orders> getOrders() {
//		return orders;
//	}
//
//	public void setOrders(List<Orders> orders) {
//		this.orders = orders;
//	}

	
	
	
	
}
