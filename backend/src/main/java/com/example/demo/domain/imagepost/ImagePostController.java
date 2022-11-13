package com.example.demo.domain.imagepost;

import com.example.demo.domain.imagepost.dto.ImagePostDTO;
import com.example.demo.domain.imagepost.dto.ImagePostMapper;
import lombok.extern.log4j.Log4j2;
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
import java.util.UUID;

@Log4j2
@Validated
@RestController
@RequestMapping("/imagepost")
public class ImagePostController {

    public static final int DEFAULT_PAGE_LIMIT = 5;

    private final ImagePostService imagePostService;
    private final ImagePostMapper imagePostMapper;

    @Autowired
    public ImagePostController(ImagePostService imagePostService, ImagePostMapper imagePostMapper) {
        this.imagePostService = imagePostService;
        this.imagePostMapper = imagePostMapper;
    }

    @GetMapping({"/{page}"})
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<List<ImagePostDTO>> retrieveAll(@PathVariable int page) {
        log.trace("Retrieving all image post from page {}", page);
        List<ImagePost> imagePosts = imagePostService.findAll(PageRequest.of(page, DEFAULT_PAGE_LIMIT, Sort.by("publicationTime").descending()));
        return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
    }

    @GetMapping("/{username}/{page}")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<List<ImagePostDTO>> retrieveAllImagesByUser(@PathVariable String username, @PathVariable int page) {
        log.trace("Retrieving all image posts from user {} from page {}", username, page);
        List<ImagePost> imagePosts = imagePostService.retrieveAllImagesByUser(username, PageRequest.of(page, DEFAULT_PAGE_LIMIT, Sort.by("publicationTime").descending()));
        return new ResponseEntity<>(imagePostMapper.toDTOs(imagePosts), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/{username}")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<ImagePostDTO> createNewPost(@Valid @RequestBody ImagePostDTO imagePostDTO, @PathVariable String username) {
        log.trace("Creating new image post with author {}", username);
        ImagePost imagePost = imagePostService.createNewPost(imagePostMapper.fromDTO(imagePostDTO), username);
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/edit/{id}")
    @PreAuthorize("@userPermissionEvaluator.hasSameId(authentication.principal.user, #id) || hasAuthority('USER_MODIFY')")
    public ResponseEntity<ImagePostDTO> updatePostById(@PathVariable UUID id,  @Valid @RequestBody ImagePostDTO imagePostDTO) {
        log.trace("Updating image post with id {}", imagePostDTO.getId());
        ImagePost imagePost = imagePostService.updateById(imagePostDTO.getId(), imagePostMapper.fromDTO(imagePostDTO));
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/like/{username}")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<ImagePostDTO> likePostByUsername(@Valid @RequestBody ImagePostDTO imagePostDTO, @PathVariable String username) {
        log.trace("post liked by {}", username);
        ImagePost imagePost = imagePostService.likePostByUsername(imagePostMapper.fromDTO(imagePostDTO), username);
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/unlike/{username}")
    @PreAuthorize("hasAuthority('READ')")
    public ResponseEntity<ImagePostDTO> unlikePostByUsername(@Valid @RequestBody ImagePostDTO imagePostDTO, @PathVariable String username) {
        log.trace("post unliked by {}", username);
        ImagePost imagePost = imagePostService.unlikePostByUsername(imagePostMapper.fromDTO(imagePostDTO), username);
        return new ResponseEntity<>(imagePostMapper.toDTO(imagePost), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{userId}/{id}")
    @PreAuthorize("@userPermissionEvaluator.hasSameId(authentication.principal.user, #userId) || hasAuthority('USER_MODIFY')")
    public ResponseEntity<Void> deletePostById(@PathVariable UUID userId, @PathVariable UUID id) {
        log.trace("Deleting image post with id {}", id);
        imagePostService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
