package com.example.demo.domain.imagepost;

import com.example.demo.domain.imagepost.dto.ImagePostDTO;
import com.example.demo.domain.imagepost.dto.ImagePostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Validated
@RestController
@RequestMapping("/imagepost")
public class ImagePostController {

    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_PAGE_LIMIT = 5;

    private final ImagePostService imagePostService;
    private final ImagePostMapper imagePostMapper;

    @Autowired
    public ImagePostController(ImagePostService imagePostService, ImagePostMapper imagePostMapper) {
        this.imagePostService = imagePostService;
        this.imagePostMapper = imagePostMapper;
    }

    @GetMapping({"", "/", "/{page}"})
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<List<ImagePostDTO>> retrieveAll(@PathVariable Optional<Integer> page) {
        int currentPage = page != null ? DEFAULT_PAGE_NUMBER : page.get();
        List<ImagePost> imagePosts = imagePostService.findAll(PageRequest.of(currentPage, DEFAULT_PAGE_LIMIT, Sort.by("publicationTime").descending()));
        return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
    }

    @GetMapping("/{username}/{page}")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<List<ImagePostDTO>> retrieveAllImagesByUser(@PathVariable String username, @PathVariable Optional<Integer> page) {
        int currentPage = page != null ? DEFAULT_PAGE_LIMIT : page.get();
        List<ImagePost> imagePosts = imagePostService.retrieveAllImagesByUser(username, PageRequest.of(currentPage, DEFAULT_PAGE_LIMIT, Sort.by("publicationTime").descending()));
        return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<ImagePostDTO> createNewPost(@Valid @RequestBody ImagePostDTO imagePostDTO, @Valid @RequestBody String username) {
        ImagePost imagePost = imagePostService.createNewPost(imagePostMapper.fromDTO(imagePostDTO), username);
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/")
    @PreAuthorize("hasAuthority('USER_MODIFY') || @userPermissionEvaluator.hasSameId(authentication.principal.user, id)")
    public ResponseEntity<ImagePostDTO> updatePostById(@PathVariable UUID id, @Valid @RequestBody ImagePostDTO imagePostDTO) {
        ImagePost imagePost = imagePostService.updateById(id, imagePostMapper.fromDTO(imagePostDTO));
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.OK);

    }
}
