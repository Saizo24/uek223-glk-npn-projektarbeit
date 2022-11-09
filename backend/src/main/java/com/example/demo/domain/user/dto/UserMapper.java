package com.example.demo.domain.user.dto;


import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends ExtendedMapper<User, UserDTO> {
  User fromUserRegisterDTO(UserRegisterDTO dto);

  User fromUserAuthorDTO(UserAuthorDTO dto);

  UserAuthorDTO toUserAuthorDTO(User user);
}
