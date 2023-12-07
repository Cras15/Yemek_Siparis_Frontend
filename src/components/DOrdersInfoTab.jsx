import { CloseRounded, EditRounded } from '@mui/icons-material'
import { AspectRatio, Box, Button, Divider, IconButton, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import React from 'react'

const DOrdersInfoTab = () => {
    return (
        <Sheet
            sx={{
                display: { xs: 'none', sm: 'initial' },
                borderLeft: '1px solid',
                borderColor: 'divider',
                width: 320,
                right: 0,
                ml: 'auto',
                mr: 0,
                pr:0,
                height: '100%',
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Typography level="title-md" sx={{ flex: 1 }}>
                    torres-del-paine.png
                </Typography>
                <IconButton component="span" variant="plain" color="neutral" size="sm">
                    <CloseRounded />
                </IconButton>
            </Box>
            <Divider />
            <Box
                sx={{
                    gap: 2,
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    '& > *:nth-child(odd)': { color: 'text.secondary' },
                }}
            >
                <Typography level="title-sm">Type</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    Image
                </Typography>
                <Typography level="title-sm">Size</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    3,6 MB (3,258,385 bytes)
                </Typography>
                <Typography level="title-sm">Location</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    Travel pictures
                </Typography>
                <Typography level="title-sm">Owner</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    Michael Scott
                </Typography>
                <Typography level="title-sm">Modified</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    26 October 2016
                </Typography>
                <Typography level="title-sm">Created</Typography>
                <Typography level="body-sm" textColor="text.primary">
                    5 August 2016
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ py: 2, px: 1 }}>
                <Button variant="plain" size="sm" endDecorator={<EditRounded />}>
                    Add a description
                </Button>
            </Box>
        </Sheet>
    )
}

export default DOrdersInfoTab