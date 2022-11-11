import { IconButton } from "@mui/material";
import { userInfo } from "os";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import UserService from "../../../Services/UserService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import { User } from "../../../types/models/User.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";
import UserDetailsBox from "../../organisms/UserDetailsBox/UserDetailsBox";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ProfilePage() {
  const { userid } = useParams()

  const navigate = useNavigate()

  const activeUserContext = useContext(ActiveUserContext);
  const activeUser = activeUserContext.user;

  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [user, setUser] = useState(activeUser)

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true);

  useEffect(() => {
    if (userid) {
      UserService
        .getUser(userid)
        .then((data) => {
          setUser(data.data)
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      ImagePostService()
        .getAllImagePostsByUser(user.email, pageNumber)
        .then((data) => {
          if (data.length === 0) {
            setCanLoadMorePosts(false);
          }
          const newImagePosts: ImagePost[] = pageNumber === 0 ? data : imagePosts.concat(data);
          setImagePosts(newImagePosts);
        });
    }
  }, [pageNumber, user]);

  return (
    <div>
      <NavBar pageName="Profile" />
      <IconButton onClick={() => {
        navigate(-1)
      }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <UserDetailsBox user={user} />
      <ImagePostBlog
        imagePostList={imagePosts}
        postsEditable={true}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        canLoadMorePosts={canLoadMorePosts}
        isProfile={true}
      />
      <BottomBar />
    </div>
  );
}
