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

import java.util.Set;

@Service
@Log4j2
public class ImagePostServiceImpl extends ExtendedServiceImpl<ImagePost> implements ImagePostService {

    private UserService userService;

    @Autowired
    public ImagePostServiceImpl(ExtendedRepository<ImagePost> repository, Logger logger, UserService userService) {
            super(repository, logger);
            this.userService = userService;
        }

    @Override
    public ImagePost createNewPost(ImagePost imagePost, String username) {
      log.trace("Fetching author from database");
        User user = userService.findByUsername(username);
        imagePost.setAuthor(user);
        return repository.save(imagePost);
    }


    @Override
    public Set<ImagePost> retrieveAllImagesByUser(String username, Pageable pageable) {
      User user = userService.findByUsername(username);
      Set<ImagePost> imagePosts = ((ImagePostRepository) repository).findByAuthor(userMapper.toUserAuthorDTO(user), pageable);
      return imagePosts;
    }
}
