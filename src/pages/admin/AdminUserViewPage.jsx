import { Add, EditOutlined, HomeOutlined, MoreHorizOutlined, PeopleRounded, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, IconButton, Input, TextField, Typography } from '@mui/joy';
import axios from 'axios';
import { format, set } from 'date-fns';
import { tr } from 'date-fns/locale';
import React, { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { OrderStatus, OrderStatusColor } from '../../components/Utils';
import AddressCard from '../../components/AddressCard';
import { useUI } from '../../utils/UIContext';
import AddressForm from '../../components/AddressForm';
import MaskedInput from '../../components/MaskedInput';

const AdminUserViewPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [editedInfo, setEditedInfo] = useState({
        firstname: userInfo?.firstname,
        lastname: userInfo?.lastname,
        email: userInfo?.email,
        phone: userInfo?.phone,
    });
    const { token } = useSelector((state) => state.user);
    const id = useParams().id;
    const { showDoneSnackbar, showErrorSnackbar, openModal } = useUI();
    const addressFormRef = useRef();

    const getUserInfo = async (userId) => {
        await axios.get(`/admin/user?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUserInfo(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    const totalAmount = useMemo(() => {
        return userInfo?.orders?.reduce((acc, order) => acc + order.finalPrice, 0) || 0;
    }, [userInfo]);

    const latestOrder = useMemo(() => {
        if (!userInfo?.orders || userInfo.orders.length === 0) return null;
        return userInfo.orders.reduce((latest, order) => {
            return new Date(order.orderDate) > new Date(latest.orderDate) ? order : latest;
        }, userInfo.orders[0]);
    }, [userInfo]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setSaveLoading(true);
        const editedInfoCopy = { ...editedInfo };
        editedInfoCopy.userId = userInfo.userId;
        axios.put(`/admin/user`, JSON.stringify(editedInfoCopy), {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                showDoneSnackbar('Kullanıcı bilgileri başarıyla güncellendi.');
                getUserInfo(id);
                setIsEditing(false);
                setSaveLoading(false);
            })
            .catch((error) => {
                showErrorSnackbar(error.response?.data || error.message);
                getUserInfo(id);
                setIsEditing(false);
                setSaveLoading(false);
            });
    };

    // İptal butonuna tıklandığında
    const handleCancelClick = () => {
        // Değişiklikleri geri al
        if (userInfo) {
            setEditedInfo({
                firstname: userInfo?.firstname,
                lastname: userInfo?.lastname,
                email: userInfo?.email,
                phone: userInfo?.phone,
            });
            setIsEditing(false);
        }
    };

    // Input alanlarındaki değişiklikleri yönetmek için
    const handleChange = (field) => (event) => {
        setEditedInfo({
            ...editedInfo,
            [field]: event.target.value,
        });
    };

    const handleAddressDelete = (addressId) => {
        openModal({
            title: 'Adres Silme',
            body: 'Adresi silmek istediğinize emin misiniz?',
            yesButton: 'Adresi Sil',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios.delete(`/address/admin?id=${addressId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    showDoneSnackbar(res.data);
                    getUserInfo(id);
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
                axios.post(`/address/admin?userId=${userInfo?.userId}`, JSON.stringify(data), { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                    showDoneSnackbar(res.data);
                    getUserInfo(id);
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
                axios.put(`/address/admin/${address.addressId}`, JSON.stringify(data), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        showDoneSnackbar(res.data.message || 'Adres başarıyla güncellendi.');
                        getUserInfo(id);
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.response?.data?.message || error.message);
                    });
            }
        });
    }

    const infoRows = (title, value, fields = [], isEditable = false, divider = true) => (
        <>
            <Typography level="body-sm">{title}</Typography>
            {isEditing && isEditable && fields.length > 0 ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {fields.map((field) => (
                        <Input
                            key={field}
                            value={editedInfo[field]}
                            onChange={handleChange(field)}
                            variant="outlined"
                            size="sm"
                            fullWidth
                        />
                    ))}
                </Box>
            ) : (
                <Typography level="body-md" fontWeight={500}>
                    {value}
                </Typography>
            )}
            {divider && <Divider sx={{ my: 1 }} />}
        </>
    );

    React.useEffect(() => {
        getUserInfo(id)
    }, []);

    React.useEffect(() => {
        setEditedInfo({
            firstname: userInfo?.firstname,
            lastname: userInfo?.lastname,
            email: userInfo?.email,
            phone: userInfo?.phone,
        });
    }, [userInfo]);
    return (
        <>
            {userInfo && (
                <Box>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={4}>
                            <Card sx={{ boxShadow: 'sm' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Typography level='title-md' fontWeight="bold" >
                                        <PersonOutlineOutlined sx={{ mr: 1 }} />
                                        Kullanıcı Bilgileri
                                    </Typography>
                                    {isEditing ? (
                                        <Box>
                                            <Button variant="solid" color="primary" onClick={handleSaveClick} sx={{ mr: 1 }} loading={saveLoading}>
                                                Kaydet
                                            </Button>
                                            <Button variant="plain" color="neutral" onClick={handleCancelClick}>
                                                İptal
                                            </Button>
                                        </Box>
                                    ) : (
                                        <IconButton onClick={handleEditClick}>
                                            <EditOutlined />
                                        </IconButton>
                                    )}
                                </Box>
                                <CardContent>
                                    {infoRows("Kullanıcı ID", "#" + userInfo.userId)}
                                    {infoRows(
                                        "Ad Soyad",
                                        `${editedInfo.firstname} ${editedInfo.lastname}`,
                                        ["firstname", "lastname"],
                                        true
                                    )}
                                    {infoRows("E-Mail", editedInfo.email, ['email'], true)}
                                    <>
                                        <Typography level="body-sm">Telefon</Typography>
                                        {isEditing ? (
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Input
                                                    key="phone"
                                                    placeholder="(5XX) XXX-XXXX"
                                                    size='sm'
                                                    fullWidth
                                                    value={editedInfo['phone']}
                                                    onChange={handleChange(['phone'])}
                                                    slotProps={{
                                                        input: {
                                                            component: MaskedInput,
                                                            mask: '(#00) 000-0000',
                                                            definitions: {
                                                                '#': /[1-9]/,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            <Typography level="body-md" fontWeight={500}>
                                                {editedInfo.phone}
                                            </Typography>
                                        )}
                                        <Divider sx={{ my: 1 }} />
                                    </>
                                    {infoRows("Son Giriş Tarihi", dateConverter(userInfo.last_login))}
                                    {infoRows("Son Güncellenme Tarihi", dateConverter(userInfo.updated_at))}
                                    {infoRows("Kayıt Tarihi", dateConverter(userInfo.created), null, false, false)}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={12} md={8}>
                            <Card sx={{ boxShadow: 'sm' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Typography level='title-md' fontWeight="bold" >
                                        <ShoppingCartOutlined sx={{ mr: 1 }} />
                                        Son Siparişler
                                    </Typography>
                                    <IconButton>
                                        <MoreHorizOutlined />
                                    </IconButton>
                                </Box>
                                <CardContent>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'neutral.300',
                                            borderRadius: 8,
                                            p: 2,
                                            mb: 3,
                                            bgcolor: 'neutral.50',
                                        }}
                                    >
                                        <Box textAlign="left" flex={1}>
                                            <Typography level="body-sm">
                                                TOPLAM SİPARİŞ
                                            </Typography>
                                            <Typography level="body-md" sx={{ fontWeight: 'bold', mt: 1 }}>{userInfo.orders.length}</Typography>
                                        </Box>
                                        <Divider orientation="vertical" />
                                        <Box textAlign="center" flex={1}>
                                            <Typography level="body-sm">
                                                SİPARİŞ DEĞERİ
                                            </Typography>
                                            <Typography level="body-md" sx={{ fontWeight: 'bold', mt: 1 }}>{totalAmount.toFixed(2)} TL</Typography>
                                        </Box>
                                        <Divider orientation="vertical" />
                                        <Box textAlign="end" flex={1}>
                                            <Typography level="body-sm">
                                                SON SİPARİŞ
                                            </Typography>
                                            <Typography level="body-md" sx={{ fontWeight: 'bold', mt: 1 }}>
                                                {latestOrder
                                                    ? `${latestOrder.finalPrice.toFixed(2)} TL`
                                                    : 'Yok'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {userInfo.orders.length !== 0 &&
                                        <DataTable
                                            columns={columns}
                                            data={userInfo?.orders}
                                            rowKey="orderId"
                                            search={false} />
                                    }
                                </CardContent>
                            </Card>
                            <Card sx={{ mt: 4, boxShadow: 'sm' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Typography level='title-md' fontWeight="bold" >
                                        <HomeOutlined sx={{ mr: 1 }} />
                                        Adresler
                                    </Typography>
                                    <IconButton onClick={handleAddressAdd}>
                                        <Add /> Adres Ekle
                                    </IconButton>
                                </Box>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        {userInfo?.addresses && userInfo?.addresses.map((address) =>
                                            <AddressCard address={address} key={address.addressId} sm={6} md={6} handleAddressDelete={handleAddressDelete} handleAddressEdit={handleAddressEdit} />
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default AdminUserViewPage

const dateConverter = (date) => {
    const dateValue = date ? new Date(date) : null;
    return dateValue && !isNaN(dateValue.getTime())
        ? format(dateValue, "d MMMM yyyy, HH:mm", { locale: tr })
        : "Geçersiz tarih";
}

const columns = [
    {
        field: "orderId",
        headerName: "Sipariş No",
        width: 60,
        renderCell: (row) => (`#${row.orderId}`),
    },
    {
        field: "shopName",
        headerName: "Mağaza Adı",
        width: 150,
    },
    {
        field: "finalPrice",
        headerName: "Sipariş Tutarı",
        width: 100,
        renderCell: (row) => (`${row.finalPrice.toFixed(2)} TL`),
    },
    {
        field: "orderDate",
        headerName: "Sipariş Tarihi",
        width: 130,
        renderCell: (row) => (dateConverter(row.orderDate)),
    },
    {
        field: "status",
        headerName: "Durum",
        width: 100,
        renderCell: (row) => (
            <Chip color={OrderStatusColor[row.status]}>
                {OrderStatus[row.status]}
            </Chip>
        ),
    },
];