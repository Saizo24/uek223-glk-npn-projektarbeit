package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface ImagePostService extends ExtendedService<ImagePost> {

  ImagePost createNewPost(ImagePost imagePost, String username);

  Set<ImagePost> retrieveAllImagesByUser(String username, Pageable pageable);

}
