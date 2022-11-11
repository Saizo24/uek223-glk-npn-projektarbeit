package com.example.demo.domain.imagepost;

import com.example.demo.core.generic.ExtendedEntity;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserAuthorDTO;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
public class ImagePost extends ExtendedEntity {


    @Column()
    private String imageURL;

    @Column()
    private String description;

    @Column()
    private LocalDateTime publicationTime;

    @Column()
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "image_post_user", joinColumns = @JoinColumn(name = "image_post_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<User> likes = new HashSet<>();

    @ManyToOne()
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    @Valid
    private User author;

    public ImagePost(UUID id, String imageURL, String description, LocalDateTime publicationTime, Set<User> likes, User author) {
        super(id);
        this.imageURL = imageURL;
        this.description = description;
        this.publicationTime = publicationTime;
        this.likes = likes;
        this.author = author;
    }

    public ImagePost() {

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

    public Set<User> getLikes() {
        return likes;
    }

    public void setLikes(Set<User> likes) {
        this.likes = likes;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
