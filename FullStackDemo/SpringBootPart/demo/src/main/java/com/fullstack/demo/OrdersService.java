package com.fullstack.demo;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface OrdersService {
	public List<Orders> getAllOrders();
	public Orders createOrder(Orders orders) throws Exception;
	
	public List<Orders> findOrdersByUserId(Integer orderId);
	
	public List<Orders> findAllOrders();
}
