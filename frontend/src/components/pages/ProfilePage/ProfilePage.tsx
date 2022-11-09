import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";

export default function ProfilePage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const activeUserContext = useContext(ActiveUserContext);
  const activeUser = activeUserContext.user;
  useEffect(() => {
    ImagePostService()
      .getAllImagePostsByUser(activeUser ? activeUser.email : "")
      .then((data) => {
        console.log(data);
        setImagePosts(data);
      });
  }, []);

  return (
    <div>
      <NavBar pageName="Your Blog (definitely not Twitter)" />
      <ImagePostBlog imagePostList={imagePosts} postsEditable={false} />
      <BottomBar />
    </div>
  );
}
