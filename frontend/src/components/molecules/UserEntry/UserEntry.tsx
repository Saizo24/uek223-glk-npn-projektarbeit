import { Card, CardActions, CardActionArea, CardContent, Chip, Typography, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../types/models/User.model'
import DeleteIcon from '@mui/icons-material/Delete';


type Props = {
    user: User
    deleteUser: (user: User) => void
}

const UserEntry = ({ user, deleteUser }: Props) => {
    const navigate = useNavigate()
    return (
        <Card>
            <CardActionArea onClick={() => {
                navigate(`/users/${user.id}`)
            }}>
                <CardContent>
                    <Typography>{user.firstName} {user.lastName}</Typography>
                    <Typography>{user.email}</Typography>
                    {user.roles.map((role) => { return (<Chip label={role.name} color={role.name === "ADMIN" ? "primary" : undefined} variant={role.name === "ADMIN" ? "filled" : "outlined"}></Chip>) })}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => { deleteUser(user) }}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default UserEntry