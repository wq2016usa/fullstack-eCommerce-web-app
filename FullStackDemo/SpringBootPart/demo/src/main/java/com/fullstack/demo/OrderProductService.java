package com.fullstack.demo;

import org.springframework.stereotype.Service;

@Service
public interface OrderProductService {
	public OrderProduct createOrderProduct(OrderProduct orderProduct);
}
