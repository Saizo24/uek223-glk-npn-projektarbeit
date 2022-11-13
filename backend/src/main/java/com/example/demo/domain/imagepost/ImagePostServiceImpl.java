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

    /**
     * This method creates a new Image post and saves it into the repository. The author will be set
     * with the given username/email.
     * @param imagePost contains the imageUrl and description of the imagePost, the other fields are not relevant or will be set
     * @param username contains the username/email of the author
     * @return the completed image post with author
     */
    @Override
    public ImagePost createNewPost(ImagePost imagePost, String username) {
        User user = userService.findByUsername(username);
        imagePost.setAuthor(user);
        imagePost = repository.save(imagePost);
        log.trace("New image post saved.");
        return imagePost;
    }

    /**
     * Retrieves all images from user given through username/email of given page.
     * @param username contains username/email of the user, of which the image posts we want to retrieve
     * @param pageable contains the page, page limit and sorting of the retrieved posts
     * @return list containing all post of wanted user of wanted page. If no image posts exists for said page,
     * it will return an empty list.
     */
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
      log.trace("Updated post saved");
      return imagePost;
    }

    @Override
    public ImagePost unlikePostByUsername(ImagePost imagePost, String username) throws NoSuchElementException{
      log.trace("Removing user with username {} from like list of image post", username);
      ImagePost newImagePost = repository.findById(imagePost.getId()).orElseThrow(() -> new NoSuchElementException("No image post with given id found"));
      User user = userService.findByUsername(username);
      newImagePost.getLikes().remove(user);
      newImagePost = repository.save(newImagePost);
      log.trace("Updated post saved");
      return newImagePost;
    }

    /**
     * Updates an image post with given id. Only imageUrl and description are editable.
     * @param id contains the id of the to be updated image post
     * @param imagePost contains new imageUrl and description
     * @return returns updated image post
     * @throws NoSuchElementException when no image post with given id is found
     */
    @Override
    public ImagePost updateById(UUID id, ImagePost imagePost) throws NoSuchElementException {
      log.trace("Updating imageURL and description of image post");
      ImagePost updatedImagePost = repository.findById(imagePost.getId()).orElseThrow(() -> new NoSuchElementException("No image post with given id found"));
      updatedImagePost.setImageURL(imagePost.getImageURL());
      updatedImagePost.setDescription(imagePost.getDescription());
      updatedImagePost = repository.save(updatedImagePost);
      log.trace("Updated post saved");
      return updatedImagePost;
    }
}
