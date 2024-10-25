import { AccountCircle, Add, Business } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardOverflow, Chip, Divider, FormControl, FormLabel, Grid, Input, Link, ListItemDecorator, Tab, tabClasses, TabList, TabPanel, Tabs, Textarea, Typography } from '@mui/joy'
import axios from 'axios'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, setUserData } from '../redux/userSlice'
import { useUI } from '../utils/UIContext'
import AddressCard from '../components/AddressCard'
import AddressForm from '../components/AddressForm'

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

    const handleVerifySend = async() => {
        await axios.post("/auth/resend-verification", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            showDoneSnackbar(res.data);
        }).catch((error) => {
            console.log(error);
            showErrorSnackbar(error.response.data);
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
                                            <Input placeholder="E-Mail" type='email' defaultValue={user?.email} readOnly
                                                endDecorator={user?.status === "UNVERIFIED"&&
                                                    <Button variant="soft" onClick={handleVerifySend}>
                                                        Onay Gönder
                                                    </Button>} />

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

export default UserProfile;
