package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@Log4j2
public class UserServiceImpl extends ExtendedServiceImpl<User> implements UserService {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository repository, Logger logger, PasswordEncoder passwordEncoder) {
    super(repository, logger);
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }

  /**
   * Fetches a user from the repository with given username/email.
   * @param email email of the wanted user
   * @return returns user with given username/email
   * @throws UsernameNotFoundException when no user with given username/email is found
   */
  @Override
  public User findByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user with given username/email found"));
  }

  @Override
  public User register(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return save(user);
  }

  /**
   * Updates the fields email, first name and last name of an user. All other fields shouldn't be editable.
   * @param id  id of the user to be updated
   * @param user contains the data of the updated user
   * @return returns the updated user
   * @throws NoSuchElementException when no user with given id exists
   */
  @Override
  public User updateById(UUID id, User user) throws NoSuchElementException {
    log.trace("Updating email, first name and last name of user");
    User updatedUser = repository.findById(id).orElseThrow(() -> new NoSuchElementException("No user found with id " + id));
    updatedUser.setEmail(user.getEmail());
    updatedUser.setFirstName(user.getFirstName());
    updatedUser.setLastName(user.getLastName());
    updatedUser = repository.save(updatedUser);
    log.trace("Updated user saved", id);
    return updatedUser;
  }
}
