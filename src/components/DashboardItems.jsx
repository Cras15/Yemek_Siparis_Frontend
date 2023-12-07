import { ArrowForward } from '@mui/icons-material'
import { AspectRatio, Button, Card, CardActions, CardContent, CircularProgress, Divider, IconButton, Stack, SvgIcon, Typography } from '@mui/joy'
import React from 'react'

const DashboardItems = ({ icon, title, child }) => {
    return (
        <Card variant="solid" color="" invertedColors
            sx={{ maxWidth: 750, boxShadow: 'lg', borderRadius: 'xl' }}>
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', py: 2 }}>
                <CircularProgress size="lg" determinate value={60}>
                    {icon}
                </CircularProgress>
                <CardContent>
                    <Typography level="body-md">{title}</Typography>
                    <Typography level="h2">{child}</Typography>
                </CardContent>
            </CardContent>
            <Divider />
            <CardActions>
                <IconButton
                    variant="plain"
                    size="md"
                    sx={{ alignSelf: 'flex-start', borderRadius: 'xl', p: 1.3, mr: -1, my: -1 }}>
                    Daha Fazla Ayrıntı &nbsp;<ArrowForward />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default DashboardItems