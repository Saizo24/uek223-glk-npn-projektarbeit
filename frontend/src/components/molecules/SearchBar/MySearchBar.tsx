import React from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'


type Props = {
    searchItem: string
    searchValue: string
    setSearchValue: Function;
}

const MySearchBar = ({ searchItem, searchValue, setSearchValue }: Props) => {
    return (
        <Box>
            <Paper>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={`Search for ${searchItem}`}
                    inputProps={{ "aria-label": "search name" }}
                    onChange={(newValue) => {
                        setSearchValue(newValue.target.value)
                    }}
                    value={searchValue}
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    )
}

export default MySearchBar