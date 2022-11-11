import { userInfo } from "os";
import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";
import UserDetailsBox from "../../organisms/UserDetailsBox/UserDetailsBox";

export default function ProfilePage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const activeUserContext = useContext(ActiveUserContext);
  const activeUser = activeUserContext.user;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true);

  useEffect(() => {
    if (activeUser) {
      ImagePostService()
        .getAllImagePostsByUser(activeUser.email, pageNumber)
        .then((data) => {
          if (data.length === 0) {
            setCanLoadMorePosts(false);
          }
          const newImagePosts: ImagePost[] = imagePosts.concat(data);
          setImagePosts(newImagePosts);
        });
    }
  }, [pageNumber]);

  useEffect(() => {
    if (activeUser) {
      ImagePostService().createNewPost();
    }
  }, []);

  return (
    <div>
      <NavBar pageName="Profile" />
      <UserDetailsBox user={activeUser} />
      <ImagePostBlog
        imagePostList={imagePosts}
        postsEditable={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        canLoadMorePosts={canLoadMorePosts}
        isProfile={true}
      />
      <BottomBar />
    </div>
  );
}
