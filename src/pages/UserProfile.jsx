import { AccountCircle, Add, Business } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardOverflow, Chip, Divider, FormControl, FormLabel, Grid, Input, ListItemDecorator, Tab, tabClasses, TabList, TabPanel, Tabs, Textarea, Typography } from '@mui/joy'
import axios from 'axios'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, setUserData } from '../redux/userSlice'
import { useUI } from '../utils/UIContext'

const UserProfile = () => {
    const [index, setIndex] = React.useState(0)
    const [addresses, setAddresses] = React.useState([])
    const { user, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();
    const addressFormRef = useRef();

    const getAddresses = async () => {
        await axios.get("/address/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setAddresses(res.data);
        }).catch((error) => {
            console.log(error);
            showErrorSnackbar(error.message);
        });
    }

    const handleChangeIndex = (index) => {
        setIndex(index);
        if (index === 0) dispatch(getUserProfile()).then((res) => {
            dispatch(setUserData(res.payload.data));
        });
        if (index === 1) getAddresses();
    }
    const handleProfileUpdate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.put("/auth/user/profile", {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            phone: data.get('phone')
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(setUserData(res.data));
            showDoneSnackbar('Profil güncellendi');
        }).catch((error) => {
            console.log(error);
            showErrorSnackbar(error.message);
        })
    }

    const handleAddressDelete = (addressId) => {
        openModal({
            title: 'Adres Silme',
            body: 'Adresi silmek istediğinize emin misiniz?',
            yesButton: 'Adresi Sil',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios.delete(`/address?id=${addressId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    showDoneSnackbar(res.data);
                    getAddresses();
                }).catch((error) => {
                    showErrorSnackbar(error.message);
                });
            },
        });
    }

    const handleAddressAdd = () => {
        openModal({
            title: 'Adres Ekle',
            body: <AddressForm ref={addressFormRef} mode="add" />,
            yesButton: 'Adresi Ekle',
            noButton: 'Vazgeç',
            yesButtonColor: 'success',
            onAccept: () => {
                const data = addressFormRef.current.getData();
                console.log('Yeni Adres:', data);
                axios.post("/address", JSON.stringify(data), { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                    showDoneSnackbar(res.data);
                    getAddresses();
                }).catch((error) => {
                    showErrorSnackbar(error.message);
                });
            }
        });
    }

    const handleAddressEdit = (address) => {
        openModal({
            title: 'Adres Düzenle',
            body: <AddressForm ref={addressFormRef} mode="edit" initialData={address} />,
            yesButton: 'Adresi Güncelle',
            noButton: 'Vazgeç',
            yesButtonColor: 'primary',
            onAccept: () => {
                const data = addressFormRef.current.getData();
                axios.put(`/address/${address.addressId}`, JSON.stringify(data), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        showDoneSnackbar(res.data.message || 'Adres başarıyla güncellendi.');
                        getAddresses();
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.response?.data?.message || error.message);
                    });
            }
        });
    }

    return (
        <Box sx={{ width: { sm: "95%", md: "80%", lg: "70%" }, m: 'auto', mt: 5, borderRadius: 10, background: 'transparent' }}>
            <Tabs
                aria-label="Pipeline"
                value={index}
                sx={{ bgcolor: 'transparent' }}
                onChange={(event, value) => handleChangeIndex(value)}
            >
                <TabList
                    sx={{
                        pt: 1,
                        justifyContent: 'start',
                        [`&& .${tabClasses.root}`]: {
                            flex: 'initial',
                            bgcolor: 'transparent',
                            '&:hover': {
                                bgcolor: 'transparent',
                            },
                            [`&.${tabClasses.selected}`]: {
                                color: 'primary.plainColor',
                                '&::after': {
                                    height: 2,
                                    borderTopLeftRadius: 3,
                                    borderTopRightRadius: 3,
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                    <Tab >
                        <ListItemDecorator>
                            <AccountCircle />
                        </ListItemDecorator>
                        Profil
                    </Tab>
                    <Tab >
                        <ListItemDecorator>
                            <Business />
                        </ListItemDecorator>
                        Adreslerim
                    </Tab>
                </TabList>
                <Box sx={{ background: 'transparent' }}>
                    <TabPanel value={0}>
                        <form onSubmit={handleProfileUpdate}>
                            <Box sx={{ display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 2, p: 2 }}>
                                <Typography level='title-lg'>Kullanıcı Bilgileri</Typography>
                                <Grid container spacing={3}>
                                    <Grid xs={12} sm={6}>
                                        <FormControl required>
                                            <FormLabel>Ad</FormLabel>
                                            <Input placeholder="Ad" defaultValue={user?.firstname} name='firstname' />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <FormControl required>
                                            <FormLabel>Soyad</FormLabel>
                                            <Input placeholder="Soyad" defaultValue={user?.lastname} name='lastname' />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <FormControl required>
                                            <FormLabel>Mail Adresi</FormLabel>
                                            <Input placeholder="E-Mail" type='email' defaultValue={user?.email} disabled />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <FormControl required>
                                            <FormLabel>Telefon</FormLabel>
                                            <Input placeholder="Telefon" defaultValue={user?.phone} name='phone' />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Button type='submit'>Güncelle</Button>
                            </Box>
                        </form>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Card sx={{ display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 2, p: 2, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography level='title-lg'>Adreslerim</Typography>
                                <Button startDecorator={<Add />} variant='plain' color='primary' onClick={handleAddressAdd}>Adres Ekle</Button>
                            </Box>
                        </Card>
                        <Card sx={{ display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 2, p: 2 }}>
                            <Grid container spacing={3}>
                                {addresses && addresses.map((address) =>
                                    <AddressCard address={address} key={address.addressId} handleAddressDelete={handleAddressDelete} handleAddressEdit={handleAddressEdit} />
                                )}
                            </Grid>

                        </Card>
                    </TabPanel>
                </Box>
            </Tabs>
        </Box>
    )
}

const AddressCard = ({ address, handleAddressDelete, handleAddressEdit }) => {
    return (
        <Grid xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                    <CardContent orientation="horizontal">
                        <Typography
                            level="title-md"
                            textColor="text.secondary"
                            sx={{
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {address.addressTitle}
                        </Typography>
                    </CardContent>
                    <Divider inset="context" />
                </CardOverflow>
                <CardContent>
                    <Typography level="body-md" mb={1} gutterBottom>{address.name} {address.surname}</Typography>
                    <Typography level="title-sm" fontSize={12}>{address.addressLine} no:{address.apartment}/{address.door} {address.state}/{address.city}</Typography>
                    <Typography level="title-sm" fontSize={12} my={1}>{address.phone}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant='plain' color='danger' onClick={() => handleAddressDelete(address.addressId)}>Sil</Button>
                        <Button variant='outlined' color='primary' sx={{ ml: 'auto' }} onClick={() => handleAddressEdit(address)}>Düzenle</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default UserProfile;

const AddressForm = forwardRef(({ initialData, mode }, ref) => {
    const [formData, setFormData] = useState({
        addressLine: '',
        city: '',
        state: '',
        apartment: '',
        door: '',
        floor: '',
        addressTitle: '',
        phone: '',
        name: '',
        surname: '',
        postalCode: '',
        description: '',
        isDefault: false
    });

    useImperativeHandle(ref, () => ({
        getData: () => formData
    }));

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: '100%', md: 600, lg: 800 },
                p: 2,
            }}
        >
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Adres Başlığı</FormLabel>
                        <Input
                            placeholder="Adres Başlığı"
                            name="addressTitle"
                            value={formData.addressTitle}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Ad</FormLabel>
                        <Input
                            placeholder="Ad"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Soyad</FormLabel>
                        <Input
                            placeholder="Soyad"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Telefon</FormLabel>
                        <Input
                            placeholder="Telefon"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>İl</FormLabel>
                        <Input
                            placeholder="Şehir"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>İlçe</FormLabel>
                        <Input
                            placeholder="İlçe"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Apartman No</FormLabel>
                        <Input
                            placeholder="Apartman No"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Kapı No</FormLabel>
                        <Input
                            placeholder="Kapı No"
                            name="door"
                            value={formData.door}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Kat</FormLabel>
                        <Input
                            placeholder="Kat"
                            name="floor"
                            type="number"
                            value={formData.floor}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Posta Kodu</FormLabel>
                        <Input
                            placeholder="Posta Kodu"
                            name="postalCode"
                            type="number"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Adres</FormLabel>
                        <Textarea
                            placeholder="Mahalle, sokak"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleChange}
                            minRows={3}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
});
