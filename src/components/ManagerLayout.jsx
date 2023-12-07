import React from 'react'
import ManagerSidebar from '../pages/manager/ManagerSidebar'
import { Outlet, useLocation } from 'react-router-dom'
import ManagerHeader from '../pages/manager/ManagerHeader'
import { Box, Breadcrumbs, Button, CssVarsProvider, Link, Typography } from '@mui/joy'
import { CssBaseline, capitalize } from '@mui/material'
import { ChevronRightRounded, DownloadRounded, HomeRounded } from '@mui/icons-material'

const ManagerLayout = () => {
    const location = useLocation();
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <ManagerHeader />
                <ManagerSidebar />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100%',
                        gap: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRounded fontSize="sm" />}
                            sx={{ pl: 0 }}
                        >
                            <Link
                                underline="none"
                                color="neutral"
                                href="/manager"
                                aria-label="Home"
                            >
                                <HomeRounded />
                            </Link>
                            {location.pathname.split('/').map((item, index) => (
                                index != 0 && (index != location.pathname.split('/').length - 1 ? < Link
                                    underline="hover"
                                    color="neutral"
                                    href={`/${location.pathname.split('/').slice(1, index + 1).join('/')}`}
                                    aria-label="Home"
                                    key={index}
                                >
                                    {capitalize(item)}
                                </Link> : <Typography key={index} color="text.primary">{capitalize(item)}</Typography>
                                )))}
                        </Breadcrumbs>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography level="h2" component="h1">
                            Anasayfa
                        </Typography>
                        {/* <Button
                            color="primary"
                            startDecorator={<DownloadRounded />}
                            size="sm"
                        >
                            Download PDF
                        </Button> */}
                    </Box>
                    <Outlet />
                </Box>
            </Box>
        </CssVarsProvider >
    )
}

export default ManagerLayout