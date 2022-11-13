import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../../Services/UserService'
import { User } from '../../../types/models/User.model'
import SearchBar from '../../molecules/SearchBar/SearchBar'
import UserEntry from '../../molecules/UserEntry/UserEntry'

type Props = {
    users: User[]
    deleteUser: (user: User) => void
}

const UserList = ({ users, deleteUser }: Props) => {
    const navigate = useNavigate()

    const [userList, setUserList] = useState(users)
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setUserList(users)
    }, [users])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
            mb: 1,
        }}>
            <SearchBar
                searchItem="User"
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                sx={{
                    width: "450px",
                    position: "sticky",
                    top: "72px",
                    left: 0,
                    display: "flex",
                    zIndex: 10,
                }}
            />
            {userList.map((user, index) => {
                return <UserEntry key={index} user={user} deleteUser={deleteUser} />
            })}
        </Box>
    )
}

export default UserList