package com.example.demo.domain.imagepost.dto;

import com.example.demo.core.generic.ExtendedDTO;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserDTO;


import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class ImagePostDTO extends ExtendedDTO {

    @NotNull
    private String imageURL;

    private String description;

    private LocalDateTime publicationTime;

    @Valid
    private Set<UserDTO> likes;

    @Valid
    private UserDTO author;

    public ImagePostDTO(UUID id, String imageURL, String description, LocalDateTime publicationTime, Set<UserDTO> likes, UserDTO author) {
        super(id);
        this.imageURL = imageURL;
        this.description = description;
        this.publicationTime = publicationTime;
        this.likes = likes;
        this.author = author;
    }

    public ImagePostDTO() {
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getPublicationTime() {
        return publicationTime;
    }

    public void setPublicationTime(LocalDateTime publicationTime) {
        this.publicationTime = publicationTime;
    }

    public Set<UserDTO> getLikes() {
        return likes;
    }

    public void setLikes(Set<UserDTO> likes) {
        this.likes = likes;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }
}
