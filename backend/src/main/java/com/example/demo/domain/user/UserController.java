package com.example.demo.domain.user;

import com.example.demo.domain.imagepost.ImagePost;
import com.example.demo.domain.imagepost.dto.ImagePostDTO;
import com.example.demo.domain.imagepost.dto.ImagePostMapper;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import com.example.demo.domain.user.dto.UserRegisterDTO;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController {

  private final UserService userService;
  private final UserMapper userMapper;
  private final ImagePostMapper imagePostMapper;

  @Autowired
  public UserController(UserService userService, UserMapper userMapper, ImagePostMapper imagePostMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
    this.imagePostMapper = imagePostMapper;
  }

  @GetMapping("/{id}")
  @PreAuthorize(
      "hasAuthority('USER_MODIFY') || @userPermissionEvaluator.hasSameId(authentication.principal.user, id)")
  public ResponseEntity<UserDTO> retrieveById(@PathVariable UUID id) {
    User user = userService.findById(id);
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }


  @GetMapping({"", "/"})
  @PreAuthorize("hasAuthority('USER_MODIFY')")
  public ResponseEntity<List<UserDTO>> retrieveAll() {
    List<User> users = userService.findAll();
    return new ResponseEntity<>(userMapper.toDTOs(users), HttpStatus.OK);
  }

  @GetMapping("/{username}/imageposts")
  @PreAuthorize("hasAuthority('READ')")
  public ResponseEntity<Set<ImagePostDTO>> retrieveAllImagesByUser(@PathVariable String username) {
    Set<ImagePost> imagePosts = userService.findByUsername(username).getImagePosts();
    return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
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
    "hasAuthority('USER_MODIFY') || @userPermissionEvaluator.hasSameId(authentication.principal.user, id)")
  public ResponseEntity<UserDTO> updateById(@PathVariable UUID id, @Valid @RequestBody UserDTO userDTO) {
    User user = userService.updateById(id, userMapper.fromDTO(userDTO));
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }

  @Transactional
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('USER_DELETE')")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    userService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
