package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService, ExtendedService<User> {
  User register(User user);
}
