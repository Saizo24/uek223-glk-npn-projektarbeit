import React, { useContext, useEffect, useState } from "react";
import { ImagePost } from "../../../types/models/ImagePost.model";
import Box from "@mui/material/Box";
import ImagePostEntry from "../../molecules/imagePost/ImagePostEntry";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { Button } from "@mui/material";
import { ImagePostService } from "../../../Services/ImagePostService";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

type Props = {
  imagePostList: ImagePost[];
  postsEditable: boolean;
  pageNumber: number;
  setPageNumber: Function;
  canLoadMorePosts: boolean;
  isProfile: boolean;
};

/**
 * Component lists all image post. Posts can be filtered by first and last name of author, case-insensitive
 */
const ImagePostBlog = ({
  imagePostList,
  postsEditable,
  pageNumber,
  setPageNumber,
  canLoadMorePosts,
  isProfile,
}: Props) => {

  const activeUserContext = useContext(ActiveUserContext);
  const activeUser = activeUserContext.user;

  const [imagePosts, setImagePosts] = useState(imagePostList);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setImagePosts(imagePostList);
  }, [imagePostList]);

  //handles the deletion of an image post
  const deletePost = (imagePost: ImagePost) => {
    const newImagePosts = Array.from(imagePosts)
    newImagePosts.splice(newImagePosts.indexOf(imagePost), 1)
    setImagePosts(newImagePosts)
    ImagePostService()
      .deletePostById(activeUser ? activeUser.id : "", imagePost)
      .catch((error) => {
        alert(`Error: couldn't delete image posts: ${error.message}`)
      })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 2,
        mb: 1,
      }}
    >
      {isProfile ? (
        ""
      ) : (
        <SearchBar
          searchItem="Author"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          sx={{
            width: "450px",
            position: "sticky",
            top: "72px",
            left: 0,
            display: "flex",
            zIndex: 10,
          }}
        />
      )}
      {//filters the image posts by author search value
        imagePosts
          .filter((post) => {
            return `${post.author.firstName} ${post.author.lastName}`
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase());
          })
          .map((post) => {
            return <ImagePostEntry imagePost={post} editable={postsEditable} deletePost={deletePost} />;
          })}
      <Button
        variant="contained"
        onClick={() => {
          //loads the next batch of posts. Will be disabled, if there are no more posts
          setPageNumber(pageNumber + 1);
        }}
        disabled={!canLoadMorePosts}
      >
        {canLoadMorePosts ? "Show more Entries" : "No more posts"}
      </Button>
    </Box>
  );
};

export default ImagePostBlog;
