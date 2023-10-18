package com.fullstack.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	ProductRepository productRepository;

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product create(Product product) throws Exception{
		return productRepository.save(product);
	}

	@Override
	public Product update(Product product) throws Exception {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Integer id) {
		// TODO Auto-generated method stub
		return productRepository.findById(id).get();
	}

	@Override
	public boolean deleteProduct(Integer id) throws Exception{
		try {
			productRepository.deleteById(id);
			return true;
		}catch(Exception e) {
			return false;
		}
		
	}
}
