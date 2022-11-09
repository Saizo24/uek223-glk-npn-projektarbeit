
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { ImagePost } from '../../../types/models/ImagePost.model'

type Props = {
    imagePost: ImagePost
    editable: boolean
}

const ImagePostEntry = ({ imagePost, editable }: Props) => {

    const [imageURL, setImageURL] = useState<string>("")

    const publicationDateTime = new Date(imagePost.publicationTime.toString())

    useEffect(() => {
        setImageURL(imagePost.imageURL)
    }, [imagePost])

    return (
        <Grid item >
            <img src={imageURL} alt={imagePost.description} style={{ minWidth: "400px", height: "200px", objectFit: "contain", backgroundColor: "#000000" }} />
            <textarea style={{ resize: 'none' }}>{imagePost.description}</textarea>
            <Typography>{`Author: ${imagePost.author.firstName} ${imagePost.author.lastName}`}</Typography>
            <Typography>{`Posted on: ${publicationDateTime.toLocaleDateString()} at ${publicationDateTime.toLocaleTimeString()}`}</Typography>
            <Typography>{`Likes: ${imagePost.likes.length} ${imagePost.author.lastName}`}</Typography>
        </Grid>
    )
}

export default ImagePostEntry