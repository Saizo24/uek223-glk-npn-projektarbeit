import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
    openPopUp: boolean
    setOpenPopUp: Function
}

const EditPostPopUp = ({ openPopUp, setOpenPopUp }: Props) => {
    return (
        <Box>
            <Typography>
                EditPostPopUp
            </Typography>
        </Box>
    )
}

export default EditPostPopUp