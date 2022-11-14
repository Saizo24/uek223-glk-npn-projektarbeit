import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";

/**
 * Default page for all authenticated user. Displays all image posts from newest to oldest.
 * No posts can be edited here.
 */
export default function HomePage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true);

  useEffect(() => {
    ImagePostService()
      .getAllImagePosts(pageNumber)
      .then((data) => {
        if (data.length === 0) {
          setCanLoadMorePosts(false);
        }
        const newImagePosts: ImagePost[] = imagePosts.concat(data);
        setImagePosts(newImagePosts);
      }).catch((error) => {
        alert(`Error: couldn't load image posts: ${error.message}`)
      });
  }, [pageNumber]);

  return (
    <Box>
      <NavBar pageName="Homepage" />
      <ImagePostBlog
        imagePostList={imagePosts}
        postsEditable={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        canLoadMorePosts={canLoadMorePosts}
        isProfile={false}
      />
      <BottomBar />
    </Box>
  );
}
