import { Grid, Typography } from '@mui/material'
import React from 'react'
import { ImagePost } from '../../../types/models/ImagePost.model'

type Props = {
    imagePost: ImagePost
}

const ImagePost = ({ imagePost }: Props) => {
    return (
        <Grid item>
            <img src={imagePost.imageUrl} alt=""></img>
            <Typography>{`Author: ${imagePost.author.firstName} ${imagePost.author.lastName}`}</Typography>
            <Typography>{`Posted at: ${imagePost.publicationTime.toLocaleString()}`}</Typography>
            <Typography>{`Author: ${imagePost.author.firstName} ${imagePost.author.lastName}`}</Typography>


        </Grid>
    )
}

export default ImagePost