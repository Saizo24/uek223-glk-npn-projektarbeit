import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";

export default function HomePage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  useEffect(() => {
    ImagePostService()
      .getAllImagePosts()
      .then((data) => {
        setImagePosts(data);
      });
  }, []);

  return (
    <Box>
      <NavBar pageName="Homepage" />
      <ImagePostBlog imagePostList={imagePosts} postsEditable={false} />
      <BottomBar />
    </Box>
  );
}
