package com.example.demo.domain.imagepost.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.imagepost.ImagePost;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImagePostMapper extends ExtendedMapper<ImagePost, ImagePostDTO>{

}
