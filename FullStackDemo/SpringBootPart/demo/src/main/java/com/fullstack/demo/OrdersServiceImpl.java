package com.fullstack.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersServiceImpl implements OrdersService{
	@Autowired
	OrdersRepository ordersRepository;
	
	@Override
	public List<Orders> getAllOrders() {
		return ordersRepository.findAll();
	}

	@Override
	public Orders createOrder(Orders order) throws Exception{
		return ordersRepository.save(order);
	}

	@Override
	public List<Orders> findOrdersByUserId(Integer orderId) {
		// TODO Auto-generated method stub
		return ordersRepository.findOrdersByEuser_UserId(orderId);
	}
	
	@Override
	public List<Orders> findAllOrders() {
		// TODO Auto-generated method stub
		return ordersRepository.findAll();
	}
	
}
