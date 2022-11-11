import { Button, IconButton, Box } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
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
import { Author } from "../../../types/models/Author.model";

interface FormValues {
  imageURL: string
  description: string
}

const validationSchema = yup.object().shape({
  url: yup.string().required("Please enter a link to your picture."),
  description: yup
    .string()
    .required("Please enter a description for your post.")
    .max(200, "Description can only be 200 characters long."),
});



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
    <Box>
      <NavBar pageName="Profile" />
      <Formik
        initialValues={{
          imageURL: "",
          description: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          const newImagePost: ImagePost = {
            id: "",
            imageURL: values.imageURL,
            description: values.description,
            author: activeUser ? activeUser as Author : { email: "", firstName: "", lastName: "" },
            publicationTime: new Date(),
            likes: []
          }
          ImagePostService().createNewPost(newImagePost);
          formikHelpers.setSubmitting(false);
        }}
      ></Formik>

      <IconButton onClick={() => {
        navigate(-1)
      }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <UserDetailsBox user={user} />
      <Button onClick={() => { }} variant="outlined" sx={{}}>
        Add new Post
      </Button>
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
