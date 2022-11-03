package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedServiceImpl;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagePostServiceImpl extends ExtendedServiceImpl<ImagePost> implements ImagePostService {

    @Autowired
    public ImagePostServiceImpl(ExtendedRepository<ImagePost> repository, Logger logger) {
        super(repository, logger);
    }
}
