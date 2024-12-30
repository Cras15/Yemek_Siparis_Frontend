import { Box, Container, Typography } from '@mui/joy'
import React from 'react'

const AboutUsPage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level='title-lg'>Hakkımızda </Typography>
                <Typography></Typography>
            </Box>
        </Box>
    )
}

export default AboutUsPage