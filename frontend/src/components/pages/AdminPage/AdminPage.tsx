import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImagePostService } from "../../../Services/ImagePostService";
import UserService from "../../../Services/UserService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import { User } from "../../../types/models/User.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";
import UserList from "../../organisms/UserList/UserList";

enum AdminTab {
  BLOG,
  USERS,
}

/**
 * Default page for admins. Displays a tab for all posts and all users. Admins can choose an
 * image post or user to edit or delete. The image post tab has the same functionality as
 * the home page of authenticated user.
 */
export default function AdminPage() {
  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canLoadMorePosts, setCanLoadMorePosts] = useState<boolean>(true);
  const [tab, setTab] = useState<AdminTab>(AdminTab.BLOG);

  useEffect(() => {
    ImagePostService()
      .getAllImagePosts(pageNumber)
      .then((data) => {
        if (data.length === 0) {
          setCanLoadMorePosts(false);
        }
        const newImagePosts: ImagePost[] =
          pageNumber === 0 ? data : imagePosts.concat(data);
        setImagePosts(newImagePosts);
      }).catch((error) => {
        alert(`Error: couldn't load image posts: ${error.message}`)
      });
  }, [pageNumber]);

  useEffect(() => {
    UserService.getAllUsers(pageNumber).then((data) => {
      const newUserList: User[] =
        pageNumber === 0 ? data : userList.concat(data);
      setUserList(newUserList);
    }).catch((error) => {
      alert(`Error: couldn't load users: ${error.message}`)
    });
  }, [pageNumber]);

  //Handles the deletion of an user. Also filters the loaded image posts until new data is reloaded
  const deleteUser = (user: User) => {
    const newUserList = Array.from(userList);
    const newImagePosts = imagePosts.filter(
      (imagePost) => imagePost.author.email !== user.email
    );
    newUserList.splice(newUserList.indexOf(user), 1);
    setUserList(newUserList);
    UserService.deleteUser(user.id);
    setImagePosts(newImagePosts);
  };

  return (
    <div>
      <NavBar pageName="Admin Page" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Tabs
          value={tab}
          onChange={(_event, value) => {
            setTab(value);
            setCanLoadMorePosts(true);
            setPageNumber(0);
          }}
          sx={{ width: "100%", maxWidth: "1920px", position: "fixed" }}
        >
          <Tab label="Blogs" />
          <Tab label="User" />
        </Tabs>
        <Box hidden={tab !== AdminTab.BLOG}>
          <ImagePostBlog
            imagePostList={imagePosts}
            postsEditable={true}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            canLoadMorePosts={canLoadMorePosts}
            isProfile={false}
          />
        </Box>
        <Box hidden={tab !== AdminTab.USERS}>
          <UserList users={userList} deleteUser={deleteUser} />
        </Box>
      </Box>
      <BottomBar />
    </div>
  );
}
