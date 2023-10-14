import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }} >
            {'Copyright © '}
            <Link color="inherit" href="https://ayagimagelsin.com.tr/">
                Ayağıma Gelsin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright