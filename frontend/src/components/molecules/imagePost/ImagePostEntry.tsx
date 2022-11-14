import { Card, CardContent, Dialog, DialogActions, IconButton, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext } from "react";
import { ImagePost } from "../../../types/models/ImagePost.model";
import ThumbUp from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";
import EditPostPopUp from "../EditPostPopUp/EditPostPopUp";

type Props = {
    imagePost: ImagePost;
    editable: boolean;
    deletePost: (imagePost: ImagePost) => void
};

//Determines, how many likes are shown with full name
const MAX_LIKES_SHOWN = 3


/*
 * Card for showing a full image post. Clicking on the image enlarges it in a dialog window. Only
 * the author or admin can edit its content. Only imageUrl and description are editable. Hovering
 * over the likes will show a tooltip of who liked the image post the newest
 */
const ImagePostEntry = ({ imagePost, editable, deletePost }: Props) => {

    const activeUserContext = useContext(ActiveUserContext);
    const activeUser = activeUserContext.user;

    const [imageURL, setImageURL] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>(imagePost.likes.find((user) => { return activeUser && user.email === activeUser.email }) ? true : false)
    const [enlargedImage, setEnlargedImage] = useState(false)

    const publicationDateTime = new Date(imagePost.publicationTime.toString());

    useEffect(() => {
        setImageURL(imagePost.imageURL);
    }, [imagePost]);

    //handles like and unlike of a image post
    const likePost = () => {
        const liker = imagePost.likes.find((user) => { return activeUser && user.email === activeUser.email })
        if (liker) {
            ImagePostService()
                .unlikePostByUsername(imagePost, liker.email)
                .catch((error) => {
                    alert(`Error: couldn't finish action: ${error.message}`)
                })
            imagePost.likes.splice(imagePost.likes.indexOf(liker), 1)
            setIsLiked(false)
        }
        if (!liker && activeUser) {
            ImagePostService()
                .likePostByUsername(imagePost, activeUser.email)
                .catch((error) => {
                    alert(`Error: couldn't finish action: ${error.message}`)
                })
            imagePost.likes.push(activeUser)
            setIsLiked(true)
        }
    }

    //generates the text for the tooltip. The first few will be shown with full name, the rest will be sumarized. Newer likes will be shown first
    const showLikesToolTip = () => {
        const lastLikes: string[] = []
        const hiddenLikes = imagePost.likes.length > MAX_LIKES_SHOWN ? ` and ${imagePost.likes.length - MAX_LIKES_SHOWN} more` : ""
        imagePost.likes.slice(-MAX_LIKES_SHOWN).forEach((like) => { lastLikes.push(`${like.firstName} ${like.lastName}`) })
        if (imagePost.likes.length === 0) {
            return "No likes yet"
        }
        lastLikes.reverse()
        return `${lastLikes.join(", ")}${hiddenLikes} like${imagePost.likes.length === 1 ? "s" : ""} this post.`
    }

    const handleClose = () => {
        setEnlargedImage(false)
    }

    return (
        <Card>
            <Dialog
                open={enlargedImage}
                onClose={handleClose}
                sx={{ height: "100%", width: "100%", bgcolor: "transparent" }}
            >
                <DialogActions>
                    <img
                        src={imageURL}
                        alt={imagePost.description}
                        style={{
                            minWidth: "400px",
                            maxHeight: "50vh",
                            objectFit: "contain",
                            backgroundColor: "#000000",
                        }}
                    />
                </DialogActions>
            </Dialog>
            <CardContent>
                <Box>
                    <img
                        onClick={() => { setEnlargedImage(true) }}
                        src={imageURL}
                        alt={imagePost.description}
                        style={{
                            minWidth: "400px",
                            height: "200px",
                            objectFit: "contain",
                            backgroundColor: "#000000",
                        }}
                    />
                </Box>
                <Typography>Description: {imagePost.description} </Typography>
                <Typography>
                    Author: {imagePost.author.firstName} {imagePost.author.lastName}
                </Typography>
                <Typography>
                    Posted on: {publicationDateTime.toLocaleDateString()} at{" "}
                    {publicationDateTime.toLocaleTimeString()}
                </Typography>
                <Tooltip
                    title={<p style={{ fontSize: "15px" }}>{showLikesToolTip()}</p>}
                    placement="bottom-start">
                    <Typography>
                        Likes: {imagePost.likes.length}
                    </Typography>
                </Tooltip>
                <IconButton onClick={() => { likePost() }}>
                    {isLiked ? <ThumbUp /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <Box sx={{ display: editable ? undefined : "none" }}>
                    <EditPostPopUp
                        activeUser={activeUser}
                        imagePost={imagePost}
                    />
                    <IconButton onClick={() => { deletePost(imagePost) }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ImagePostEntry;
