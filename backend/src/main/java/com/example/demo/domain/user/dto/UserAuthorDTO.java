package com.example.demo.domain.user.dto;

import com.example.demo.core.generic.ExtendedDTO;

import java.util.UUID;

public class UserAuthorDTO extends ExtendedDTO {

  private String firstName;

  private String lastName;

  public UserAuthorDTO() {
  }

  public UserAuthorDTO(UUID id, String firstName, String lastName) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
}