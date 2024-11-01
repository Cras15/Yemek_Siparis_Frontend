// src/components/AdminSupportHeader.jsx
import React from 'react';
import { Stack, Button, IconButton, Typography, Avatar, Link, Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator, ListDivider } from '@mui/joy';
import { LockOpenOutlined, LockOutlined, MoreVertRounded, QueryBuilderOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useUI } from '../utils/UIContext';
import axios from 'axios';

const AdminSupportHeader = ({ supportTicket }) => {
    const { user,token } = useSelector((state) => state.user);
    const isAdmin = user?.role === 'ADMIN';
    const {showDoneSnackbar, showErrorSnackbar, openModal} = useUI();

    const handleTicketStatusChange = async (status) => {
        openModal({
            title: "Talep Durumu Değiştir",
            body: `Talebi ${status === "OPEN" ? "açmak" : status === "PENDING" ? "beklemeye almak" : "kapatmak"} istediğinize emin misiniz?`,
            yesButton: "Evet",
            yesButtonColor: status === "CLOSED" ?"danger":"success",
            noButton: "Hayır",
            onAccept: async () => {
                try {
                    await axios.put(`/support-tickets/${supportTicket.id}`, { assigneeId: user.userId, status }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    showDoneSnackbar("Talep durumu başarıyla güncellendi.");
                    window.location.reload();
                } catch (error) {
                    showErrorSnackbar(error.response?.data || error.message);
                }
            },
        });
    }
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.body',
                flexShrink: 0,
            }}
        >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar src={supportTicket.user?.avatar} alt={supportTicket.user?.name} />
                <div>
                    <Typography component="h2" noWrap sx={{ fontWeight: 'lg', fontSize: 'lg' }}>
                        {supportTicket.title || 'Yok'}
                    </Typography>
                    <Typography level="body-sm" color="text.secondary">
                        {(supportTicket.requester?.firstname + " " + supportTicket.requester?.lastname) || 'kullaniciadi'}
                    </Typography>
                </div>
            </Stack>
            {isAdmin && (
                <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                    <Button
                        color="neutral"
                        variant="outlined"
                        component={Link}
                        underline="none"
                        href={`/admin/kullanicilar/${supportTicket.requester?.userId}`}
                        sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                    >
                        Profil Görüntüle
                    </Button>
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                        >
                            <MoreVertRounded />
                        </MenuButton>
                        <Menu size='sm'>
                            <MenuItem color='success' sx={{ borderRadius: "sm", mx: 1 }} disabled={supportTicket.status === "OPEN"} onClick={()=>handleTicketStatusChange("OPEN")}>
                                <ListItemDecorator><LockOpenOutlined /></ListItemDecorator>
                                Talebi Aç
                            </MenuItem>
                            <MenuItem color='warning' sx={{ borderRadius: "sm", mx: 1 }} disabled={supportTicket.status === "PENDING"} onClick={()=>handleTicketStatusChange("PENDING")}>
                                <ListItemDecorator><QueryBuilderOutlined /></ListItemDecorator>
                                Beklemeye Al
                            </MenuItem>
                            <MenuItem color='danger' sx={{ borderRadius: "sm", mx: 1 }} disabled={supportTicket.status === "CLOSED"} onClick={()=>handleTicketStatusChange("CLOSED")}>
                                <ListItemDecorator><LockOutlined /></ListItemDecorator>
                                Talebi Kapat
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Stack>
            )}
        </Stack>
    );
};

AdminSupportHeader.propTypes = {
    supportTicket: PropTypes.object.isRequired,
};

export default AdminSupportHeader;
