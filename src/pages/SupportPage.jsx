import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Chip, IconButton, Link, Typography } from '@mui/joy';
import { Add, Block, QueryBuilder, VerifiedOutlined, VisibilityOutlined, WarningAmberRounded } from '@mui/icons-material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import DataTable from '../components/DataTable';

const SupportPage = () => {
    const [tickets, setTickets] = useState([]);
    const token = useSelector((state) => state.user.token);

    const getTickets = async () => {
        await axios.get(`/support-tickets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setTickets(response.data);
            return response;
        }).catch((error) => {
            console.log(error.response.data || error.message);
        });
    }
    useEffect(() => {
        getTickets();
    }
        , []);

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
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
                <IconButton sx={{ width: { xs: "100%", sm: 150 }, mt: { xs: 3, md: 1, lg: 0 }, ml: 'auto' }} color='danger' variant='soft'
                    component={Link} underline="none" href="destek-olustur">
                    <Add />
                    Talep Oluştur
                </IconButton>
                <DataTable
                    columns={columns}
                    data={tickets}
                    rowKey='id'
                />
            </Box>
        </Box>
    )
}

export default SupportPage;

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 30,
        sortable: true,
        renderCell: (row) => (
            <Typography level="body-xs">#{row.id}</Typography>
        ),
    },
    {
        field: "title",
        headerName: "Destek Konusu",
        width: 100,
        sortable: true,
    },
    {
        field: "name",
        headerName: "Destek İsteyen",
        width: 100,
        sortable: true,
        renderCell: (row) => (<Typography level="body-xs">{row.requester?.firstname} {row.requester?.lastname}</Typography>),
    },
    {
        field: "status",
        headerName: "Durum",
        width: 70,
        sortable: true,
        renderCell: (row) => (
            <Chip
                startDecorator={
                    row.status === "OPEN"
                        ? <VerifiedOutlined />
                        : row.status === "PENDING"
                            ? <QueryBuilder />
                            : <Block />
                }
                color={
                    row.status === "OPEN"
                        ? "success"
                        : row.status === "PENDING"
                            ? "warning"
                            : "danger"
                }
            >
                {row.status === "OPEN"
                    ? "Açık"
                    : row.status === "PENDING"
                        ? "Beklemede"
                        : "Kapandı"
                }
            </Chip>
        ),
    },
    {
        field: "createdAt",
        headerName: "Oluşturma Tarihi",
        width: 90,
        sortable: true,
        renderCell: (row) => {
            const dateValue = row?.createdAt ? new Date(row.createdAt) : null;
            return dateValue && !isNaN(dateValue.getTime())
                ? format(dateValue, "d MMMM yyyy, HH:mm", { locale: tr })
                : "Geçersiz tarih";
        },
    },
    {
        field: "updatedAt",
        headerName: "Son Güncellenme Tarihi",
        width: 90,
        sortable: true,
        renderCell: (row) => {
            const dateValue = row?.updatedAt ? new Date(row.updatedAt) : null;
            return dateValue && !isNaN(dateValue.getTime())
                ? format(dateValue, "d MMMM yyyy, HH:mm", { locale: tr })
                : "Geçersiz tarih";
        },
    },
    {
        field: "",
        headerName: "",
        width: 30,
        sortable: false,
        renderCell: (row) => (
            <IconButton color='primary' component={Link} underline="none" href={`destek/${row.id}`}>
                <VisibilityOutlined />
            </IconButton>
        ),
    }

];