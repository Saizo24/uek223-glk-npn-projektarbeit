import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";

export default function HomePage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true)

  useEffect(() => {
    ImagePostService()
      .getAllImagePosts(pageNumber)
      .then((data) => {
        if (data.length === 0) {
          setCanLoadMorePosts(false)
        }
        const newImagePosts: ImagePost[] = imagePosts.concat(data)
        setImagePosts(newImagePosts);
      });
  }, [pageNumber]);

  return (
    <Box>
      <NavBar pageName="Homepage" />
      <ImagePostBlog imagePostList={imagePosts} postsEditable={false} pageNumber={pageNumber} setPageNumber={setPageNumber} canLoadMorePosts={canLoadMorePosts} />
      <BottomBar />
    </Box>
  );
}


