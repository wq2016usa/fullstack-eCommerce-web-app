package com.fullstack.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
class DemoApplicationTests {

	@Test
    public void testGettersAndSetters() {
        EUser user = new EUser();
        user.setUserId(1);
        user.setUsername("john_doe");
        user.setPassword("password123");
        user.setAdmin(true);

        assertEquals(1, user.getUserId());
        assertEquals("john_doe", user.getUsername());
        assertEquals("password123", user.getPassword());
        assertTrue(user.getIsAdmin());

        // Change admin status
        user.setAdmin(false);
        assertFalse(user.getIsAdmin());
    }

	@Test
    public void testGettersAndSettersP() {
        // Create a Product instance
        Product product = new Product();
        
        // Set values using setter methods
        product.setProductId(1);
        product.setProductName("Test Product");
        product.setPrice(29.99);
        product.setQuantity(10);
        product.setDescription("A test product");
        product.setImageUrl("/images/test-product.jpg");

        // Verify values using getter methods
        assertEquals(1, product.getProductId());
        assertEquals("Test Product", product.getProductName());
        assertEquals(29.99, product.getPrice(), 0.001); // Using delta for double comparison
        assertEquals(10, product.getQuantity());
        assertEquals("A test product", product.getDescription());
        assertEquals("/images/test-product.jpg", product.getImageUrl());
    }
}
