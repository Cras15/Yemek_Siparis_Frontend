import * as React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { userLogout } from '../../redux/userSlice';
import { Autocomplete, AutocompleteOption, CircularProgress, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import { capitalize } from '@mui/material';
import { useUI } from '../../utils/UIContext';
import { setSelectedShop } from '../../redux/shopSlice';
import BaseSidebar from '../../components/BaseSidebar';

const ManagerSidebar = () => {
    const [shops, setShops] = React.useState([]);
    const [shopStatus, setShopStatus] = React.useState('idle');
    const dispatch= useDispatch();

    const { token } = useSelector((state) => state.user);
    const { selectedShop } = useSelector((state) => state.shop);

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
    }, [token, dispatch, selectedShop]);

    const menuItems = {
        main: [
            { title: "Anasayfa", link: "/manager", icon: <HomeRoundedIcon /> },
            { title: "Siparişler", link: "/manager/siparisler", badge: 4, icon: <ShoppingCartRoundedIcon /> },
            { title: "Ürünler", link: "/manager/urunler", icon: <RestaurantRoundedIcon /> },
        ],
        footer: [
            //{ title: "Destek", icon: <SupportRoundedIcon />, link: "/support" },
            //{ title: "Ayarlar", icon: <SettingsRoundedIcon />, link: "/settings" },
            { title: "Ana Sayfaya Dön", icon: <PeopleRoundedIcon />, link: "/" },
        ]
    };

    return (
        <BaseSidebar menuItems={menuItems}>
            <Autocomplete
                id="shop-select"
                placeholder="Restoran Seç"
                options={shops}
                value={selectedShop}
                onChange={(_, newValue) => {
                    dispatch(setSelectedShop(newValue))
                }}
                isOptionEqualToValue={(option, value) => option.shopId === value.shopId}
                getOptionLabel={(option) => option.shopName}
                loading={shopStatus === 'pending'}
                disableClearable
                autoHighlight
                renderOption={(props, option) => (
                    <AutocompleteOption {...props} key={option.shopId}>
                        <ListItemDecorator>
                            <img
                                loading="lazy"
                                width="30"
                                style={{ borderRadius: 5 }}
                                src={`${option.imageUrl}`}
                                alt={option.shopName}
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
                endDecorator={
                    shopStatus === 'pending' ? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                sx={{ zIndex: 10001 }}
            />
        </BaseSidebar>
    );
}

export default ManagerSidebar;
