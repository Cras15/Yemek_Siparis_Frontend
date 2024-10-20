import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { capitalize } from '@mui/material';
import MSidebarItems from './MSidebarItems';
import { BrightnessAutoRounded, LogoutRounded } from '@mui/icons-material';
import useUserLogout from '../hooks/useUserLogout';

const BaseSidebar = ({ menuItems, children }) => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const logout = useUserLogout();

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 1000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => {/* closeSidebar fonksiyonunu burada çağırabilirsiniz */ }}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRounded />
                </IconButton>
                <Typography level="title-lg">Ayağıma Gelsin</Typography>
            </Box>
            {/* Özel İçerikler (Autocomplete gibi) Buraya Gelebilir */}
            {children}
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    {menuItems.main.map((item) => (
                        <MSidebarItems
                            key={item.title}
                            title={item.title}
                            link={item.link}
                            icon={item.icon}
                            badge={item.badge}
                            children={item.children}
                            selected={location.pathname === item.link}
                        />
                    ))}
                </List>

                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        '--List-gap': '8px',
                    }}
                >
                    {menuItems.footer.map((item) => (
                        <MSidebarItems
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                            link={item.link}
                            selected={location.pathname === item.link}
                        />
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar variant="outlined" size="sm">
                    {user?.firstname.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">{`${capitalize(user.firstname)} ${user.lastname.charAt(0).toUpperCase()}.`}</Typography>
                    <Typography level="body-xs">{user.email}</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral" onClick={logout}>
                    <LogoutRounded />
                </IconButton>
            </Box>
        </Sheet>
    );
}

export default BaseSidebar;
