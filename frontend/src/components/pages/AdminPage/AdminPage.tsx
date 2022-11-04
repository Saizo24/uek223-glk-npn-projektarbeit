import { Tabs, Tab } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import ImagePostBlog from '../../organisms/ImagePostBlog/ImagePostBlog'
import NavBar from '../../organisms/NavBar/NavBar'
import UserList from '../../organisms/UserList/UserList'

type Props = {}

const AdminPage = (props: Props) => {
    const [tab, setTab] = useState(AdminTab.BLOG)
    const [imagePosts, setImagePosts] = useState([])

    return (
        <Box>
            <NavBar pageName='Admininstration' />
            <Tabs>
                <Tab label="Blogs" />
                <Tab label="User" />
            </Tabs>
            <Box>
                {
                    tab === AdminTab.BLOG ? (
                        <ImagePostBlog imagePostList={imagePosts} postsEditable={true} />
                    ) : (
                        <UserList />
                    )
                }
            </Box>
        </Box>
    )
}

export default AdminPage

enum AdminTab {
    BLOG, USER
}