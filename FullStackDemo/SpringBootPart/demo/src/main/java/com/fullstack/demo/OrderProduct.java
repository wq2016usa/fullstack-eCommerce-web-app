package com.fullstack.demo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="order_product")
public class OrderProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderProductId;
	
	@Column
	private int order_quantity;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="order_id", referencedColumnName="orderId")
	@JsonIgnoreProperties("purchases")
	private Orders orders;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="product_id")
	private Product product;

	public OrderProduct() {
		super();
	}

	

	public OrderProduct(int orderProductId, int order_quantity, Orders orders, Product product) {
		super();
		this.orderProductId = orderProductId;
		this.order_quantity = order_quantity;
		this.orders = orders;
		this.product = product;
	}



	public int getOrderProductId() {
		return orderProductId;
	}

	public void setOrderProductId(int orderProductId) {
		this.orderProductId = orderProductId;
	}



	public int getOrder_quantity() {
		return order_quantity;
	}



	public void setOrder_quantity(int order_quantity) {
		this.order_quantity = order_quantity;
	}



	public Orders getOrders() {
		return orders;
	}



	public void setOrders(Orders orders) {
		this.orders = orders;
	}



	public Product getProduct() {
		return product;
	}



	public void setProduct(Product product) {
		this.product = product;
	}

	
	
}
