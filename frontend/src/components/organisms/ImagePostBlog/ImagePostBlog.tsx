import React, { useEffect, useState } from 'react'
import { ImagePost } from '../../../types/models/ImagePost.model'
import Box from '@mui/material/Box'
import ImagePostEntry from '../../molecules/imagePost/ImagePostEntry'

type Props = {
    imagePostList: ImagePost[]
    postsEditable: boolean
}

const ImagePostBlog = ({ imagePostList, postsEditable }: Props) => {
    const [imagePosts, setImagePosts] = useState(imagePostList)

    useEffect(() => {
        setImagePosts(imagePostList)
    }, [imagePostList])

    return (
        <Box>
            {
                imagePosts.map((post) => {
                    return (
                        <ImagePostEntry imagePost={post} editable={postsEditable} />
                    )
                })
            }
        </Box>
    )
}

export default ImagePostBlog