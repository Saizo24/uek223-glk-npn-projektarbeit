package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImagePostRepository extends ExtendedRepository<ImagePost> {
  @Query("select i from ImagePost i where i.author = ?1")
  List<ImagePost> findByAuthor(User author, Pageable pageable);
}
