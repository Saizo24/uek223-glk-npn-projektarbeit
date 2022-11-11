import { Button } from "@mui/material";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { userInfo } from "os";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import { ImagePost } from "../../../types/models/ImagePost.model";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import ImagePostBlog from "../../organisms/ImagePostBlog/ImagePostBlog";
import NavBar from "../../organisms/NavBar/NavBar";
import UserDetailsBox from "../../organisms/UserDetailsBox/UserDetailsBox";

const validationSchema = yup.object().shape({
  url: yup.string().required("Please enter a link to your picture."),
  description: yup
    .string()
    .required("Please enter a description for your post.")
    .max(200, "Description can only be 200 characters long."),
});

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

  return (
    <div>
      <NavBar pageName="Profile" />
      <UserDetailsBox user={activeUser} />
      <Formik
        initialValues={{
          id: "",
          imageURL: "",
          description: "",
          author: activeUser
            ? {
                firstName: activeUser.firstName,
                lastName: activeUser.lastName,
                email: activeUser.email,
              }
            : { firstName: "", lastName: "", email: "" },
          publicationTime: new Date(),
          likes: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: ImagePost,
          formikHelpers: FormikHelpers<ImagePost>
        ) => {
          ImagePostService().createNewPost(values);
          formikHelpers.setSubmitting(false);
        }}
      ></Formik>
      <Button onClick={() => {}} variant="outlined" sx={{}}>
        Add new Post
      </Button>
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
