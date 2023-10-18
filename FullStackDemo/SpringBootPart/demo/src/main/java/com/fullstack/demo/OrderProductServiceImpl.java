package com.fullstack.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderProductServiceImpl implements OrderProductService{
	@Autowired
	OrderProductRepository orderProductRepository;

	@Override
	public OrderProduct createOrderProduct(OrderProduct orderProduct) {
		return orderProductRepository.save(orderProduct);
	}
}
