import { IconButton, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import UserService from "../../../Services/UserService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";
import UserDetailsBox from "../../organisms/UserDetailsBox/UserDetailsBox";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreatePostPopUp from "../../molecules/CreatePostPopUp/CreateEditPostPopUp";
import { Nullable } from "../../../types/Nullable";
import { User } from "../../../types/models/User.model";
import EditUserPopUp from "../../molecules/EditUserPopUp/EditUserPopUp";

/**
 * Shows the profile page of a user. If a regular user tries to enter the url to another users profile page,
 * it will instead navigate to the unauthorized page. Admins can visit the profile page of all user. Here
 * users can edit or delete their image posts or create a new one.
 */
export default function ProfilePage() {
  const { userid } = useParams()

  const navigate = useNavigate()

  const activeUserContext = useContext(ActiveUserContext);
  const activeUser = activeUserContext.user;

  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [user, setUser] = useState<Nullable<User>>(null)
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true);

  //loads the user of the profile page
  useEffect(() => {
    if (userid) {
      UserService
        .getUser(userid)
        .then((data) => {
          setUser(data.data)
        }).catch(() => {
          navigate("/unauthorized")
        })
    }
  }, [])

  //Loads image post of the user of this profile page
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
        }).catch((error) => {
          alert(`Error: couldn't load image posts: ${error.message}`)
        });
    }
  }, [pageNumber, user]);

  return (
    <Box>
      <NavBar pageName="Profile" />
      <IconButton onClick={() => {
        navigate(-1)
      }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <UserDetailsBox user={user} />
        {user ?
          (<EditUserPopUp user={user} />)
          : <></>
        }
        <CreatePostPopUp activeUser={activeUser} sx={{ display: activeUser && user && activeUser.id === user.id ? undefined : "none" }} />
      </Box>
      <ImagePostBlog
        imagePostList={imagePosts}
        postsEditable={true}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        canLoadMorePosts={canLoadMorePosts}
        isProfile={true}
      />
      <BottomBar />
    </Box>
  );
}
