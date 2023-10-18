package com.fullstack.demo;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fullstack.demo.EUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ehome")
public class EUserController {
	@Autowired
	EUserService eUserService;
	
	@Autowired
	ProductService productService;
	
	@Autowired
	OrdersService ordersService;
	
	@Autowired
	OrderProductService orderProductService;
	
//	List<EUser> listStudent = List.of(
//			new EUser(1,"Johns", "White", "jw@gmail.com", EUser.Gender.MALE),
//			new EUser(2,"Danny", "White", "dw@gmail.com", EUser.Gender.FEMALE)
//			);
	
//	@GetMapping
//	public String getAllStudents() throws JsonProcessingException{
//		
//		ObjectMapper objectMapper = new ObjectMapper();
//		return objectMapper.writeValueAsString(listStudent);
//	}
	
	//get all products info from db and show in /ehome page
		@GetMapping("/{id}")
		public List<Product> getProducts(){
			return productService.getAllProducts();
		}
	
	//get all user login info from db
	@GetMapping("")
	public List<EUser> getUsers(){
		return eUserService.getAllUsers();
	}
	
	//get specific user with id from db
	@GetMapping("/id={id}")
	public EUser getOneUser(@PathVariable Integer id){
		return eUserService.getUserById(id);
	}
	
	//get specific user with username from db
	@GetMapping("/username={username}")
	public EUser getOneUser(@PathVariable String username){
		boolean checkUserInDB = isUsernameExists(getUsers(), username);
		EUser e_user=new EUser();
		
		if(checkUserInDB) {
			return eUserService.getUserByUsername(username);
		}else {
			return e_user;
		}
		
		
	}
//	
	
//	@PostMapping("/student")
//	public Boolean index(@RequestBody EUser euser) {
////		System.out.println(student.getFirstName());
//		if(euser!=null) {
//			this.saveStudent(euser);
//			
//			return true;
//		}
//		
//		return false;
//	}
	
	//get data from register form in react and save to user db
	@PostMapping("/store")
	public Map<String, Object> saveStudent(@RequestBody EUser euser) {
		//get all username from db
		boolean checkUserInDB = isUsernameExists(getUsers(), euser.getUsername());
		Map<String, Object> resultMap = new HashMap<>();
		if(euser!=null && !checkUserInDB) {
			//set all users to un-admin users
			euser.setAdmin(false);
//			System.out.println(euser.getIsAdmin());
//			System.out.println(euser.getUsername());
			
			//save user data into user db
		    eUserService.create(euser);
		    resultMap.put("userId", euser.getUserId());
		    resultMap.put("isStore", true);
		    return resultMap;
		}
		
		resultMap.put("isStore", false);
		return resultMap;
	}
	
	public boolean isUsernameExists(List<EUser> userList, String targetUsername) {
		for (EUser user : userList) {
			
            if (user.getUsername().equals(targetUsername)) {
                return true;
            }
        }
        return false;
    }
	
	
	///////////order///////////
	@PostMapping("/save_order")
	public Boolean saveOrder(@RequestBody Orders orders) throws Exception{
		try {
			List<OrderProduct> purchases = orders.getPurchases();
			//get products infor in order
			purchases.forEach((orderP)->{
				
				Product eachP = productService.findProductById(orderP.getProduct().getProductId());
//				//calculate current quantity 
				if((eachP.getQuantity()-orderP.getOrder_quantity())>=0) {
					int qt = eachP.getQuantity()-orderP.getOrder_quantity();
					eachP.setQuantity(qt);
					try {
						productService.update(eachP);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else {
					return;
				}
			});
//			List<Product> listP = orders.getProducts();
//			
//			for(Product p : listP) {
//				//get each productId
//				int pId = p.getProductId();
//				
//				//get each product info by id in db
//				Product eachP = productService.findProductById(pId);
//				
//				//calculate current quantity 
//				if(eachP.getQuantity()>0) {
//					int qt = eachP.getQuantity()-1;
//					eachP.setQuantity(qt);
//					productService.update(eachP);
//				}else {
//					return false;
//				}
//			}
			
			
			System.out.println(purchases.get(0));
			purchases.forEach((orderP)->{
				
				Product p = productService.findProductById(orderP.getProduct().getProductId());
				orderP.setProduct(p);
				orderP.setOrders(orders);
			});
		    ordersService.createOrder(orders);
		    orders.setPurchases(purchases);
		    return true;
		}catch(Exception e){
			return false;
		}
	}
	
	//get orderinfo with one user id
	@GetMapping("/view_order&userId={userId}")
	public List<Orders> getOrderInfoById(@PathVariable Integer userId) {
//		List<Orders> allOrders = ordersService.findAllOrderId();
		
		//get all order_id whose order_user_id = userId
		
		
		
		return ordersService.findOrdersByUserId(userId);
	}
	
	//logout
    @CrossOrigin(origins = "", allowCredentials = "true")
	@PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws Exception{
		try {
        // Logout the current user and redirect to the login page
//        SecurityContextHolder.getContext().setAuthentication(null);
			if (authentication != null) {
		          new SecurityContextLogoutHandler().logout(request, response, authentication);
			}
        return "success logout";
	}catch(Exception e) {
		return "";
	}
    }

}
