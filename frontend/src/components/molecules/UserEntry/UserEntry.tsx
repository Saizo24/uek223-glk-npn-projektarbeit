import { Card, CardActions, CardActionArea, CardContent, Chip, Typography, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../types/models/User.model'
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserPopUp from '../EditUserPopUp/EditUserPopUp';

type Props = {
    user: User
    deleteUser: (user: User) => void
}

/**
 * Card displaying the user in the userlist in the admin page. An admin can edit the email, first and last name of an user.
 * Clicking on it will navigate the admin to the profile page of the user.
 */
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
                    {user.roles.map((role) => {
                        return (<Chip label={role.name} color={role.name === "ADMIN" ? "primary" : undefined} variant={role.name === "ADMIN" ? "filled" : "outlined"}></Chip>)
                    })}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => { deleteUser(user) }}>
                    <DeleteIcon />
                </IconButton>
                <EditUserPopUp user={user} />
            </CardActions>
        </Card>
    )
}

export default UserEntry