import React, { useEffect, useState } from "react";
import { ImagePost } from "../../../types/models/ImagePost.model";
import Box from "@mui/material/Box";
import ImagePostEntry from "../../molecules/imagePost/ImagePostEntry";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { Button } from "@mui/material";

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
      <SearchBar
        searchItem="User"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sx={{
          width: "450px",
          position: "sticky",
          top: 5,
          left: 0,
          display: "flex",
        }}
      />
      {imagePosts
        .filter((post) => {
          return `${post.author.firstName} ${post.author.lastName}`
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        })
        .map((post) => {
          return <ImagePostEntry imagePost={post} editable={postsEditable} />;
        })}

      <Button variant="contained" onClick={() => {}}>
        Show more Entries
      </Button>
    </Box>
  );
};

export default ImagePostBlog;
