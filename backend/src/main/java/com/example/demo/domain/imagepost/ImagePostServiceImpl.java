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
import java.util.NoSuchElementException;
import java.util.UUID;

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
        log.trace("Creating new post with author {}", username);
        User user = userService.findByUsername(username);
        imagePost.setAuthor(user);
        imagePost = repository.save(imagePost);
        log.trace("New image post saved.");
        return imagePost;
    }


    @Override
    public List<ImagePost> retrieveAllImagesByUser(String username, Pageable pageable) {
        log.trace("Fetching all image posts from user entity with username {}", username);
        User user = userService.findByUsername(username);
        List<ImagePost> imagePosts = ((ImagePostRepository) repository).findByAuthor(user, pageable);
        return imagePosts;
    }

    @Override
    public ImagePost likePostByUsername(ImagePost imagePost, String username) {
      log.trace("Adding user with username {} to like list of image post", username);
      User user = userService.findByUsername(username);
      imagePost.getLikes().add(user);
      imagePost = repository.save(imagePost);
      log.trace("Updated post saved");
      return imagePost;
    }

    @Override
    public ImagePost unlikePostByUsername(ImagePost imagePost, String username) {
      log.trace("Removing user with username {} from like list of image post", username);
      ImagePost newImagePost = repository.findById(imagePost.getId()).get();
      User user = userService.findByUsername(username);
      newImagePost.getLikes().remove(user);
      newImagePost = repository.save(newImagePost);
      log.trace("Updated post saved");
      return newImagePost;
    }

    @Override
    public ImagePost updateById(UUID id, ImagePost imagePost) throws NoSuchElementException {
      log.trace("Updating imageURL and description of image post");
      ImagePost updatedImagePost = findById(id);
      updatedImagePost.setImageURL(imagePost.getImageURL());
      updatedImagePost.setDescription(imagePost.getDescription());
      updatedImagePost = repository.save(updatedImagePost);
      log.trace("Updated post saved");
      return updatedImagePost;
    }
}
