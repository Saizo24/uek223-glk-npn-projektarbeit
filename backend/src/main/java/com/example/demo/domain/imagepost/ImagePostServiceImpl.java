package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import com.example.demo.domain.user.dto.UserMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagePostServiceImpl extends ExtendedServiceImpl<ImagePost> implements ImagePostService {

    private UserService userService;

    @Autowired
    public ImagePostServiceImpl(ExtendedRepository<ImagePost> repository, Logger logger, UserService userService) {
            super(repository, logger);
            this.userService = userService;
        }

    @Override
    public ImagePost createNewPost(ImagePost imagePost, String username) {
        User user = userService.findByUsername(username);
        imagePost.setAuthor(user);
        return repository.save(imagePost);
    }
}
