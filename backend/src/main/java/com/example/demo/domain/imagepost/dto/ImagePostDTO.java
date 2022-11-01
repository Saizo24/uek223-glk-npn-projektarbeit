package com.example.demo.domain.imagepost.dto;

import com.example.demo.core.generic.ExtendedDTO;
import com.example.demo.domain.user.dto.UserDTO;


import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public class ImagePostDTO extends ExtendedDTO {

    @NotNull
    private String imageURL;

    @NotNull
    private String description;

    @Valid
    private Set<UserDTO> likes;

    public ImagePostDTO(UUID id, String imageURL, String description, Set<UserDTO> likes) {
        super(id);
        this.imageURL = imageURL;
        this.description = description;
        this.likes = likes;
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

    public Set<UserDTO> getLikes() {
        return likes;
    }

    public void setLikes(Set<UserDTO> likes) {
        this.likes = likes;
    }
}
