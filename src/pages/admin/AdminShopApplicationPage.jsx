import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable';
import {
    Avatar,
    Box,
    Chip,
    Typography,
} from "@mui/joy";
import { Block, VerifiedOutlined, WarningAmberRounded, DeleteOutlineRounded, EditOutlined, VisibilityOutlined, Done } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useUI } from '../../utils/UIContext';

const AdminShopApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const { token } = useSelector((state) => state.user);
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();

    const getApplications = async () => {
        await axios.get(`/shop-applications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setApplications(response.data);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleCancelApplication = async (applicationId) => {
        await openModal({
            title: "Başvuru İptali",
            body: "Başvuruyu iptal etmek istediğine emin misin?",
            yesButton: "Başvuruyu iptal et",
            noButton: "Vazgeç",
            onAccept: () => {
                axios
                    .post(`/shop-applications/${applicationId}/reject`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar("Başvuru başarıyla iptal edildi.");
                        getApplications();
                        return response;
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message);
                    });
            },
        });
    };

    const handleApproveApplication = async (applicationId) => {
        await openModal({
            title: "Başvuru Onayı",
            body: "Başvuruyu onaylamak istediğine emin misin?",
            yesButton: "Başvuruyu Onayla",
            noButton: "Vazgeç",
            onAccept: () => {
                axios
                    .post(`/shop-applications/${applicationId}/approve`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar("Başvuru onaylandı.");
                        getApplications();
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
            divider: true,
            onClick: () => {
                // Sipariş detay sayfasına yönlendirme
                window.location.href = `/admin/magaza-basvuru/${row.applicationId}`;
            },
        },
        {
            label: "Başvuruyu Onayla",
            icon: <Done />,
            color: "success",
            disabled: row.status === "APPROVED" || row.status === "REJECTED",
            onClick: () => handleApproveApplication(row.applicationId),
        },
        {
            label: "Başvuruyu Reddet",
            icon: <DeleteOutlineRounded />,
            color: "danger",
            disabled: row.status === "APPROVED" || row.status === "REJECTED",
            onClick: () => handleCancelApplication(row.applicationId),
        },
    ];

    useEffect(() => {
        getApplications();
    }, []);

    return (
        <DataTable
            columns={columns}
            data={applications}
            rowKey="applicationId"
            filters={filters}
            defaultOrderBy="appliedAt"
            defaultOrder='desc'
            actions
            getRowActions={getRowActions}
        />
    )
}

export default AdminShopApplicationPage;

const columns = [
    {
        field: "applicationId",
        headerName: "ID",
        width: 30,
        sortable: true,
        renderCell: (row) => (
            <Typography level="body-xs">#{row.applicationId}</Typography>
        ),
    },
    {
        field: "shopName",
        headerName: "Mağaza Adı",
        width: 150,
        sortable: true,
        renderCell: (row) => (
            <Box display="flex" alignItems="center">
                <Avatar size='sm' color='primary' src={row.imageUrl} alt={(row?.shopName?.charAt(0)?.toUpperCase() || '')} />
                <Box sx={{ marginLeft: 1 }}>
                    <Typography fontWeight="500">
                        {row.shopName}
                    </Typography>
                </Box>
            </Box>),
    },
    {
        field: "shopDesc",
        headerName: "Mağaza Açıklaması",
        width: 150,
        sortable: true,
    },
    {
        field: "additionalInfo",
        headerName: "Ek Bilgiler",
        width: 100,
        sortable: true,
    },
    {
        field: "appliedAt",
        headerName: "Başvuru Tarihi",
        width: 150,
        sortable: true,
        renderCell: (row) => {
            const dateValue = row?.appliedAt ? new Date(row.appliedAt) : null;
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
                    row.status === "APPROVED"
                        ? <VerifiedOutlined />
                        : row.status === "REJECTED"
                            ? <Block />
                            : <WarningAmberRounded />
                }
                color={
                    row.status === "APPROVED"
                        ? "success"
                        : row.status === "REJECTED"
                            ? "danger"
                            : "warning"
                }
            >
                {row.status === "APPROVED"
                    ? "Onaylandı"
                    : row.status === "REJECTED"
                        ? "Reddedildi"
                        : "İncelemede"
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
            { value: "APPROVED", label: "Onaylandı" },
            { value: "PENDING", label: "İncelemede" },
            { value: "REJECTED", label: "Reddedildi" },
        ],
    },
];
