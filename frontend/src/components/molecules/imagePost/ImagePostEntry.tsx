
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { ImagePost } from '../../../types/models/ImagePost.model'

type Props = {
    imagePost: ImagePost
    editable: boolean
}

const ImagePostEntry = ({ imagePost, editable }: Props) => {

    return (
        <Grid item>
            <img src={imagePost.imageURL} alt=""></img>
            <textarea >{imagePost.description}</textarea>
            <Typography>{`Author: ${imagePost.author.firstName} ${imagePost.author.lastName}`}</Typography>
            <Typography>{`Posted at: ${imagePost.publicationTime.toLocaleString()}`}</Typography>
            <Typography>{`Likes: ${imagePost.likes.length} ${imagePost.author.lastName}`}</Typography>
        </Grid>
    )
}

export default ImagePostEntry