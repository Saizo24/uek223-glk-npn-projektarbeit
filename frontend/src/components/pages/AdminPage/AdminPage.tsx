import React, { useEffect, useState } from "react";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";

export default function AdminPage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  useEffect(() => {
    ImagePostService()
      .getAllImagePosts()
      .then((data) => {
        console.log(data);
        setImagePosts(data);
      });
  }, []);

  return (
    <div>
      <NavBar pageName="Admin Page" />
      <ImagePostBlog imagePostList={imagePosts} postsEditable={false} />
      <BottomBar />
    </div>
  );
}
