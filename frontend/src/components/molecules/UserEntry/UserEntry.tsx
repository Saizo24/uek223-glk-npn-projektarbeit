import { Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../types/models/User.model'

type Props = {
    user: User
}

const UserEntry = ({ user }: Props) => {
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
        </Card>
    )
}

export default UserEntry