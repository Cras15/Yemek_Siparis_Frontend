import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import { closeSidebar } from '../../components/Utils';
import { useDispatch, useSelector } from 'react-redux';
import MSidebarItems from '../../components/MSidebarItems';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { userLogout } from '../../redux/userSlice';
import { PeopleRounded, RestaurantRounded } from '@mui/icons-material';
import { Autocomplete, AutocompleteOption, CircularProgress, ListItemDecorator } from '@mui/joy';
import { capitalize } from '@mui/material';
import { useUI } from '../../utils/UIContext';
import { setSelectedShop } from '../../redux/shopSlice';

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = React.useState(defaultExpanded)

    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: "0.2s ease",
                    "& > *": {
                        overflow: "hidden"
                    }
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    )
}

const ManagerSidebar = () => {
    const [shops, setShops] = React.useState([]);
    const [shopStatus, setShopStatus] = React.useState('idle');

    const { user, token } = useSelector((state) => state.user);
    const { selectedShop } = useSelector((state) => state.shop);
    const { showDoneSnackbar } = useUI();

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const logout = () => {
        dispatch(userLogout());
        showDoneSnackbar("Başarıyla çıkış yapıldı.");
        navigate('/');
    }

    React.useEffect(() => {
        setShopStatus('pending');
        const fetchData = async () => {
            try {
                const response = await axios.get("/manager/shop/getMyShop", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setShops(response.data);
                if (selectedShop === null)
                    dispatch(setSelectedShop(response.data[0]));
                setShopStatus('success');
            } catch (error) {
                console.log(error);
                setShopStatus('error');
            }
        };
        fetchData();
    }, []);

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
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRoundedIcon />
                </IconButton>
                <Typography level="title-lg">Ayağım Gelsin</Typography>
                {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
            </Box>
            <Autocomplete
                id="country-select-demo"
                placeholder="Restoran Seç"
                slotProps={{
                    input: {
                        autoComplete: 'new-password',
                    },
                }}
                sx={{ zIndex: 10001 }}
                options={shops}
                value={selectedShop}
                onChange={(_, newValue) => {
                    dispatch(setSelectedShop(newValue))
                }}
                isOptionEqualToValue={(option, value) => option.shopId === value.shopId}
                autoHighlight
                disableClearable
                getOptionLabel={(option) => option.shopName}
                loading={shopStatus === 'pending'}
                endDecorator={
                    shopStatus === 'pending' ? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                renderOption={(props, option) => (
                    <AutocompleteOption {...props} key={option.shopId}>
                        <ListItemDecorator>
                            <img
                                loading="lazy"
                                width="30"
                                style={{ borderRadius: 5 }}
                                src={`${option.imageUrl}`}
                                alt=""
                            />
                        </ListItemDecorator>
                        <ListItemContent sx={{ fontSize: 'sm' }}>
                            {option.shopName}
                            <Typography level="body-xs">
                                {option.shopDesc}
                            </Typography>
                        </ListItemContent>
                    </AutocompleteOption>
                )}
            />
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
                    <MSidebarItems selected={location.pathname === "/manager"}  title="Anasayfa" link="/manager" icon={<HomeRoundedIcon />} />
                    <MSidebarItems selected={location.pathname === "/manager/siparisler"}  title="Siparişler" link="/manager/siparisler" badge={4} icon={<ShoppingCartRoundedIcon />} />
                    <MSidebarItems selected={location.pathname === "/manager/urunler"} title="Ürünler" link="/manager/urunler" icon={<RestaurantRounded />} />
                </List>

                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        '--List-gap': '8px',
                        // mb: 2,
                    }}
                >
                    <MSidebarItems title="Destek" icon={<SupportRoundedIcon />} />
                    <MSidebarItems title="Ayarlar" icon={<SettingsRoundedIcon />} />
                    <MSidebarItems title="Ana Sayfaya Dön" icon={<PeopleRounded />} link="/" />
                </List>

            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                >
                    {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">{`${capitalize(user.firstname)} ${user.lastname.charAt(0).toUpperCase()}.`}</Typography>
                    <Typography level="body-xs">{user.email}</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral" onClick={() => logout()}>
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}

export default ManagerSidebar
