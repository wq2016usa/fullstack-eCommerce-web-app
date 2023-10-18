package com.fullstack.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/ehome_admin")
public class ProductController {
	@Autowired
	EUserService eUserService;
	
	@Autowired
	ProductService productService;
	
	@Autowired
	OrdersService ordersService;
	
	//get all products info from db
	@GetMapping("")
	public List<Product> getProducts(){
		return productService.getAllProducts();
	}
	
	//get all users from db
	@GetMapping("/all_users")
	public List<EUser> getUsers(){
		return eUserService.getAllUsers();
	}
	
	
	//get new product data from react and save into db
	@PostMapping("/admin_management_page/store_new_product")
	public ObjectNode saveNewProduct(@RequestBody Product product) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode jsonNode = objectMapper.createObjectNode();
		
		
		try {
			JsonNode productJsonNode = objectMapper.valueToTree(product);
			jsonNode.set("productInfo", productJsonNode);
//			String checkJson = objectMapper.writeValueAsString(true);
			jsonNode.put("isCreated", true);
			productService.create(product);
			return jsonNode;
		}catch (Exception e){
//			String checkJson = objectMapper.writeValueAsString(false);
			jsonNode.put("isCreated", false);
			System.out.println("error"+e);
			return jsonNode;
		}
		
	}
	
	
	//get updated product info from react and update product into db
	@PutMapping("/admin_management_page/update={productId}")
	public boolean updateProduct(@PathVariable Long productId, @RequestBody Product product) throws Exception {
//		Product existingProduct = productService.findProductById(id);
		
//		if(existingProduct.isPresent())
		
		try {
			productService.update(product);
			return true;
		}catch (Exception e){
			return false;
		}
		
	}
	
	//delete product from db
	@DeleteMapping("/admin_management_page/delete={productId}")
	public boolean deleteProductById(@PathVariable Integer productId) throws Exception{
		try {
			return productService.deleteProduct(productId);
		}catch(Exception e) {
			return false;
		}
	}
	
	
	//get orderinfo with one user id
		@GetMapping("/all_orders")
		public List<Orders> getAllOrders() {
//			List<Orders> allOrders = ordersService.findAllOrderId();
			
			//get all order_id whose order_user_id = userId
			
			
			
			return ordersService.findAllOrders();
		}
}
