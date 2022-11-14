package com.example.demo.domain.user;

import com.example.demo.domain.imagepost.dto.ImagePostMapper;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import com.example.demo.domain.user.dto.UserRegisterDTO;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/user")
@Log4j2
public class UserController {

  public static final int DEFAULT_PAGE_LIMIT = 5;

  private final UserService userService;
  private final UserMapper userMapper;

  @Autowired
  public UserController(UserService userService, UserMapper userMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  @GetMapping("/id/{id}")
  @PreAuthorize(
      "@userPermissionEvaluator.hasSameId(authentication.principal.user, #id) || hasAuthority('USER_MODIFY')")
  public ResponseEntity<UserDTO> retrieveById(@PathVariable UUID id) {
    log.trace("Fetching user with id {}", id);
    User user = userService.findById(id);
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }


  @GetMapping({"/page/{page}"})
  @PreAuthorize("hasAuthority('USER_MODIFY')")
  public ResponseEntity<List<UserDTO>> retrieveAll(@PathVariable int page) {
    log.trace("Fetching all users with page {}", page);
    List<User> users = userService.findAll(PageRequest.of(page, DEFAULT_PAGE_LIMIT, Sort.by("lastName").ascending()));
    return new ResponseEntity<>(userMapper.toDTOs(users), HttpStatus.OK);
  }

  @Transactional
  @PostMapping("/register")
  public ResponseEntity<UserDTO> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
    User user = userService.register(userMapper.fromUserRegisterDTO(userRegisterDTO));
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.CREATED);
  }

  @Transactional
  @PutMapping("/{id}")
  @PreAuthorize(
    "hasAuthority('USER_MODIFY') || @userPermissionEvaluator.hasSameId(authentication.principal.user, #id)")
  public ResponseEntity<UserDTO> updateById(@PathVariable UUID id, @Valid @RequestBody UserDTO userDTO) {
    log.trace("Updating user with id {}", id);
    User user = userService.updateById(id, userMapper.fromDTO(userDTO));
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }

  @Transactional
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('USER_DELETE')")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    log.trace("Deleting user with id {}", id);
    userService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
