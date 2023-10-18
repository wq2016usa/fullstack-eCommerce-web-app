package com.fullstack.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

//@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Override
	protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
//                .antMatchers("/**").permitAll() // Example: Publicly accessible paths
//                .antMatchers("/**").authenticated() // Example: Authenticated paths
                .and()
//            .formLogin()
//                .loginPage("/")
//                .defaultSuccessUrl("/ehome")
//                .permitAll()
//                .and()
            .logout()
                .logoutUrl("/logout") // URL to trigger logout
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()) // Logout success handler
                .deleteCookies("JSESSIONID") // Optionally delete cookies
                .permitAll()
                .and()
            .csrf().disable(); // Disable CSRF for simplicity
        
    }
	
	
}
