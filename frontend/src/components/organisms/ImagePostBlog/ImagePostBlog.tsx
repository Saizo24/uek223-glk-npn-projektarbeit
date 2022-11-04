import React, { useEffect, useState } from "react";
import { ImagePost } from "../../../types/models/ImagePost.model";
import Box from "@mui/material/Box";
import ImagePostEntry from "../../molecules/imagePost/ImagePostEntry";
import MySearchBar from "../../molecules/SearchBar/MySearchBar";

type Props = {
  imagePostList: ImagePost[];
  postsEditable: boolean;
};

const ImagePostBlog = ({ imagePostList, postsEditable }: Props) => {
  const [imagePosts, setImagePosts] = useState(imagePostList);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setImagePosts(imagePostList);
  }, [imagePostList]);

  return (
    <Box>
      <MySearchBar
        searchItem="User"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {imagePosts
        .filter((post) => {
          return `${post.author.firstName} ${post.author.lastName}`
            .toLocaleLowerCase()
            .includes(searchValue);
        })
        .map((post) => {
          return <ImagePostEntry imagePost={post} editable={postsEditable} />;
        })}
    </Box>
  );
};

export default ImagePostBlog;
