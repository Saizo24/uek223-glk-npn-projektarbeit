package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import com.example.demo.domain.user.dto.UserMapper;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class ImagePostServiceImpl extends ExtendedServiceImpl<ImagePost> implements ImagePostService {

    private UserService userService;
    private UserMapper userMapper;

    @Autowired
    public ImagePostServiceImpl(ExtendedRepository<ImagePost> repository, Logger logger, UserService userService, UserMapper userMapper) {
            super(repository, logger);
            this.userService = userService;
            this.userMapper = userMapper;
        }

    @Override
    public ImagePost createNewPost(ImagePost imagePost, String username) {
      log.trace("Fetching author from database");
        User user = userService.findByUsername(username);
        imagePost.setAuthor(user);
        return repository.save(imagePost);
    }


    @Override
    public List<ImagePost> retrieveAllImagesByUser(String username, Pageable pageable) {
      User user = userService.findByUsername(username);
      List<ImagePost> imagePosts = ((ImagePostRepository) repository).findByAuthor(user, pageable);
      return imagePosts;
    }

    @Override
    public ImagePost likePostByUsername(ImagePost imagePost, String username) {
      User user = userService.findByUsername(username);
      imagePost.getLikes().add(user);
      imagePost = repository.save(imagePost);
      return imagePost;
    }

    @Override
    public ImagePost unlikePostByUsername(ImagePost imagePost, String username) {
      ImagePost newImagePost = repository.findById(imagePost.getId()).get();
      User user = userService.findByUsername(username);
      newImagePost.getLikes().remove(user);
      newImagePost = repository.save(newImagePost);
      return newImagePost;
    }
}
