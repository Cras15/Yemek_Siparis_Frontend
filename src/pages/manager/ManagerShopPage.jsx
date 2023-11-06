import { Avatar, Box, Chip, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ManagerShopPage = () => {
    const [shops, setShops] = React.useState([]);

    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.user);

    React.useEffect(() => {
        if (user.role == "USER")
            navigate("/");

        const fetchData = async () => {
            await axios.get("/manager/shop/getMyShop", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                console.log(response)
                setShops(response.data);
            });
        }
        fetchData();
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
                mt: 10,
                minWidth: 300,
            }}>
            <div>
                <List
                    variant="outlined"
                    aria-labelledby="ellipsis-list-demo"
                    sx={{
                        minWidth: 240,
                        borderRadius: 'sm',
                        '--ListItemDecorator-size': '56px',
                    }}>
                    {shops.map((data, i) => (
                        <div key={i}>
                            <ListItem sx={{ "&:hover": { cursor: 'pointer' } }} onClick={() => navigate(`/manager/magaza/${data.shopId}`)}>
                                <ListItemDecorator>
                                    <Avatar size='lg' src="https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;" />
                                </ListItemDecorator>
                                <ListItemContent>
                                    <Typography level="title-sm">{data.shopName}</Typography>
                                    <Stack direction='row' >
                                        <Typography level="body-sm" noWrap mr={3}>
                                            {data.shopDesc ? data.shopDesc : "Açıklama yok"}
                                        </Typography>
                                        <Chip sx={{ ml: 'auto' }}
                                            color={data.verify ? "success" : "danger"}
                                            variant="outlined"
                                        >
                                            {data.verify ? "Onaylı" : "Onaysız"}
                                        </Chip>
                                    </Stack>
                                </ListItemContent>

                            </ListItem>
                            {i != shops.length - 1 && <ListDivider inset="gutter" />}
                        </div>
                    ))}
                </List>
            </div>
        </Box >
    )
}

export default ManagerShopPage