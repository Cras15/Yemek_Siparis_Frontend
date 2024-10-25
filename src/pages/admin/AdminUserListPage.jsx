import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable';
import {
    Avatar,
    Box,
    Chip,
    Typography,
} from "@mui/joy";
import { Block, VerifiedOutlined, WarningAmberRounded, DeleteOutlineRounded, EditOutlined, VisibilityOutlined, BlockOutlined } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { hr, tr } from 'date-fns/locale';
import { useUI } from '../../utils/UIContext';

const AdminUserListPage = () => {
    const [users, setUsers] = useState([]);
    const { token } = useSelector((state) => state.user);
    const { showDoneSnackbar, showErrorSnackbar, openModal } = useUI();

    const getUsers = async () => {
        await axios.get(`/admin/user/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUsers(response.data);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleVerifyMail = async (userId) => {
        await openModal({
            title: "Kullanıcı Doğrulama",
            body: "Kullanıcıyı doğrulamak istediğine emin misin?",
            yesButton: "Kullanıcıyı Doğrula",
            yesButtonColor: "success",
            noButton: "Vazgeç",
            onAccept: () => {
                axios
                    .post(`/admin/user/verify?id=${userId}`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar(response.data);
                        getUsers();
                        return response;
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message);
                    });
            },
        });
    };
    const handleUserBanned = async (userId) => {
        await openModal({
            title: "Kullanıcı Yasaklama",
            body: "Kullanıcıyı yasaklamak istediğine emin misin?",
            yesButton: "Kullanıcıyı Yasakla",
            noButton: "Vazgeç",
            onAccept: () => {
                axios
                    .post(`/admin/user/banned?id=${userId}`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar(response.data);
                        getUsers();
                        return response;
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message);
                    });
            },
        });
    };

    const getRowActions = (row) => [
        {
            label: "Görüntüle",
            icon: <VisibilityOutlined />,
            href: `/admin/kullanicilar/${row.userId}`,
        },
        {
            label: "Düzenle",
            icon: <EditOutlined />,
            divider: true,
            onClick: () => {
                console.log("Düzenle", row);
            },
        },
        {
            label: "Maili Doğrula",
            icon: <VerifiedOutlined />,
            color: "success",
            onClick: () => handleVerifyMail(row.userId),
            disabled: row.status !== "UNVERIFIED",
        },
        {
            label: row.status === "BANNED" ? "Yasağı Kaldır" : "Yasakla",
            icon: <BlockOutlined />,
            color: "danger",
            onClick: () => (handleUserBanned(row.userId)),
        },
    ];

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <DataTable
            columns={columns}
            data={users}
            rowKey="userId"
            filters={filters}
            defaultOrderBy="userId"
            actions
            getRowActions={getRowActions}
        />
    )
}

export default AdminUserListPage;

const columns = [
    {
        field: "userId",
        headerName: "ID",
        width: 30,
        sortable: true,
        renderCell: (row) => (
            <Typography level="body-xs">#{row.userId}</Typography>
        ),
    },
    {
        field: "firstname",
        headerName: "Ad Soyad",
        width: 150,
        sortable: true,
        renderCell: (row) => (
            <Box display="flex" alignItems="center">
                <Avatar size='sm' color='primary'>
                    {(row?.firstname?.charAt(0)?.toUpperCase() || '') + (row?.lastname?.charAt(0)?.toUpperCase() || '')}
                </Avatar>
                <Box sx={{ marginLeft: 1 }}>
                    <Typography fontWeight="500">
                        {row.firstname + " " + row.lastname}
                    </Typography>
                    <Typography level='body-xs' >
                        {row.email}
                    </Typography>
                </Box>
            </Box>),
    },
    {
        field: "phone",
        headerName: "Telefon",
        width: 100,
        sortable: true,
    },
    {
        field: "role",
        headerName: "Rol",
        width: 100,
        sortable: true,
        renderCell: (row) => (<Chip color={
            row.role === "ADMIN" ? "danger" :
                row.role === "MANAGER" ? "warning" :
                    row.role === "USER" ? "primary" : "neutral"
        }>{
                row.role === "ADMIN" ? "Admin" :
                    row.role === "MANAGER" ? "Mağaza Yetkilisi" :
                        row.role === "USER" ? "Üye" : "Rol Yok"}</Chip>

        ),
    },
    {
        field: "created",
        headerName: "Oluşturma Tarihi",
        width: 150,
        sortable: true,
        renderCell: (row) => {
            const dateValue = row?.created ? new Date(row.created) : null;
            return dateValue && !isNaN(dateValue.getTime())
                ? format(dateValue, "d MMMM yyyy, HH:mm", { locale: tr })
                : "Geçersiz tarih";
        },
    },
    {
        field: "status",
        headerName: "Durum",
        width: 100,
        sortable: true,
        renderCell: (row) => (
            <Chip
                startDecorator={
                    row.status === "VERIFIED"
                        ? <VerifiedOutlined />
                        : row.status === "UNVERIFIED"
                            ? <WarningAmberRounded />
                            : <Block />
                }
                color={
                    row.status === "VERIFIED"
                        ? "success"
                        : row.status === "UNVERIFIED"
                            ? "warning"
                            : "danger"
                }
            >
                {row.status === "VERIFIED"
                    ? "Doğrulandı"
                    : row.status === "UNVERIFIED"
                        ? "Doğrulanmadı"
                        : "Yasaklandı"
                }
            </Chip>
        ),
    },
];

const filters = [
    {
        field: "role",
        label: "Rol",
        placeholder: "Rol Seç",
        options: [
            { value: "all", label: "Tümü" },
            { value: "ADMIN", label: "Admin" },
            { value: "MANAGER", label: "Mağaza Yetkilisi" },
            { value: "USER", label: "Kullanıcı" },
        ],
    },
    {
        field: "status",
        label: "Durum",
        placeholder: "Durum Seç",
        options: [
            { value: "all", label: "Tümü" },
            { value: "UNVERIFIED", label: "Doğrulanmamış" },
            { value: "VERIFIED", label: "Doğrulanmış" },
            { value: "BANNED", label: "Yasaklı" },
        ],
    },
];