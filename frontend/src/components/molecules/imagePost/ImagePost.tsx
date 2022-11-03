import { Textarea } from '@mui/joy'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { ImagePost } from '../../../types/models/ImagePost.model'

type Props = {
    imagePost: ImagePost
    editable: boolean
}

const ImagePost = ({ imagePost }: Props) => {
    return (
        <Grid item>
            <img src={imagePost.imageURL} alt=""></img>
            <Textarea>{imagePost.description}</Textarea>
            <Typography>{`Author: ${imagePost.author.firstName} ${imagePost.author.lastName}`}</Typography>
            <Typography>{`Posted at: ${imagePost.publicationTime.toLocaleString()}`}</Typography>
            <Typography>{`Likes: ${imagePost.likes.length} ${imagePost.author.lastName}`}</Typography>
        </Grid>
    )
}

export default ImagePost