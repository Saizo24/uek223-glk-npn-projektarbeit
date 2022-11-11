import { Card, CardContent, Dialog, DialogActions, IconButton, Tooltip, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext } from "react";
import { ImagePost } from "../../../types/models/ImagePost.model";
import ThumbUp from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { ImagePostService } from "../../../Services/ImagePostService";

type Props = {
    imagePost: ImagePost;
    editable: boolean;
};

const MAX_LIKES_SHOWN = 3

const ImagePostEntry = ({ imagePost, editable }: Props) => {

    const activeUserContext = useContext(ActiveUserContext);
    const activeUser = activeUserContext.user;

    const [imageURL, setImageURL] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>(imagePost.likes.find((user) => { return activeUser && user.email === activeUser.email }) ? true : false)
    const [enlargedImage, setEnlargedImage] = useState(false)

    const publicationDateTime = new Date(imagePost.publicationTime.toString());

    useEffect(() => {
        setImageURL(imagePost.imageURL);
    }, [imagePost]);

    const likePost = () => {
        const liker = imagePost.likes.find((user) => { return activeUser && user.email === activeUser.email })
        if (liker) {
            ImagePostService().unlikePostByUsername(imagePost, liker.email)
            imagePost.likes.splice(imagePost.likes.indexOf(liker), 1)
            setIsLiked(false)
        } else if (activeUser) {
            ImagePostService().likePostByUsername(imagePost, activeUser.email)
            imagePost.likes.push(activeUser)
            setIsLiked(true)
        }
    }

    const showLikesToolTip = () => {
        const lastLikes: string[] = []
        imagePost.likes.slice(-MAX_LIKES_SHOWN).forEach((like) => { lastLikes.push(`${like.firstName} ${like.lastName}`) })
        if (imagePost.likes.length === 0) {
            return "No likes yet"
        }
        return lastLikes.reverse().join(", ")
            + (imagePost.likes.length > MAX_LIKES_SHOWN ? ` and ${imagePost.likes.length - MAX_LIKES_SHOWN} more` : " ")
            + ` like${imagePost.likes.length === 1 ? "s" : ""} this post.`
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
                <Tooltip title={<p style={{ fontSize: "15px" }}>{showLikesToolTip()}</p>} placement="bottom-start">
                    <Typography>
                        Likes: {imagePost.likes.length}
                    </Typography>
                </Tooltip>
                <IconButton onClick={() => { likePost() }}>
                    {isLiked ? <ThumbUp /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <Button variant="contained" sx={{ display: editable ? undefined : "none" }}>
                    Edit
                </Button>
            </CardContent>
        </Card>
    );
};

export default ImagePostEntry;
