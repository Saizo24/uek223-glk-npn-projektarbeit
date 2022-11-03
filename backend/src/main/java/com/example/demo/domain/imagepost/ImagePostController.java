package com.example.demo.domain.imagepost;

import com.example.demo.domain.imagepost.dto.ImagePostDTO;
import com.example.demo.domain.imagepost.dto.ImagePostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/imagePost")
public class ImagePostController {

    private final ImagePostService imagePostService;
    private final ImagePostMapper imagePostMapper;

    @Autowired
    public ImagePostController(ImagePostService imagePostService, ImagePostMapper imagePostMapper) {
        this.imagePostService = imagePostService;
        this.imagePostMapper = imagePostMapper;
    }

    @GetMapping({"", "/", "/{page}/{limit}"})
    public ResponseEntity<List<ImagePostDTO>> retrieveAll(@PathVariable int page, @PathVariable int limit) {
        List<ImagePost> imagePosts = imagePostService.findAll(PageRequest.of(page, limit, Sort.by("publicationTime").descending()));
        return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
    }
}
