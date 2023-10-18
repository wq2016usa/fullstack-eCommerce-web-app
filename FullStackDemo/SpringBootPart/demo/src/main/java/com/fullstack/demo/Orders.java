package com.fullstack.demo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderId;
	
	
	@ManyToOne
    @JoinColumn(name = "order_user_id", referencedColumnName="userId", nullable = false)
    private EUser euser;

//	@ManyToMany
//    @JoinTable(
//            name = "order_product",
//            joinColumns = @JoinColumn(name = "order_id", referencedColumnName="orderId"),
//            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName="productId")
//    )
//    private List<Product> products;
	
	@OneToMany(mappedBy="orders", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<OrderProduct> purchases;
	
//	@ManyToMany
//	@JoinTable(
//            name = "order_product",
//            joinColumns = @JoinColumn(name = "order_quantity", nullable = false)
//    )
//	private List<int> orderQ;
	

	public Orders() {
		super();
	}

	public Orders(int orderId, EUser euser, List<OrderProduct> purchases) {
		super();
		this.orderId = orderId;
//		this.orderProductName = orderProductName;
//		this.orderPrice = orderPrice;
//		this.orderQuantity = orderQuantity;
//		this.orderImageUrl = orderImageUrl;
		this.euser = euser;
		this.purchases = purchases;
//		this.orderProduct = orderProduct;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public EUser getEuser() {
		return euser;
	}

	public void setEuser(EUser euser) {
		this.euser = euser;
	}

	public List<OrderProduct> getPurchases() {
		return purchases;
	}

	public void setPurchases(List<OrderProduct> purchases) {
		this.purchases = purchases;
	}

//	public List<Product> getProducts() {
//		return products;
//	}
//
//	public void setProducts(List<Product> products) {
//		this.products = products;
//	}

	

	
	
	
}
