package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService, ExtendedService<User> {
  User findByUsername(String email) throws UsernameNotFoundException;

  User register(User user);
}
