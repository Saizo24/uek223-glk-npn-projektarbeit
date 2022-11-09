package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedService;

public interface ImagePostService extends ExtendedService<ImagePost> {

  ImagePost createNewPost(ImagePost imagePost, String username);
}
