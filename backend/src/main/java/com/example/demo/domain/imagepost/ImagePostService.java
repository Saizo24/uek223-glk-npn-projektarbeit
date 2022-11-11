package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ImagePostService extends ExtendedService<ImagePost> {

  ImagePost createNewPost(ImagePost imagePost, String username);

  List<ImagePost> retrieveAllImagesByUser(String username, Pageable pageable);

  ImagePost likePostByUsername(ImagePost imagePost, String username);

  ImagePost unlikePostByUsername(ImagePost imagePost, String username);
}
