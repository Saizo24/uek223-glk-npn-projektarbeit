package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.domain.user.dto.UserAuthorDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import java.util.Set;

public interface ImagePostRepository extends ExtendedRepository<ImagePost> {
  @Query("select i from ImagePost i where i.author = ?1")
  Set<ImagePost> findByAuthor(UserAuthorDTO author, Pageable pageable);

}
