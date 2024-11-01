// src/components/UserSupportHeader.jsx
import React from 'react';
import { Stack, Typography, Avatar } from '@mui/joy';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const UserSupportHeader = ({ supportTicket }) => {
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
            {/* Normal kullanıcı için ekstra bir şey yok */}
        </Stack>
    );
};

UserSupportHeader.propTypes = {
    supportTicket: PropTypes.object.isRequired,
};

export default UserSupportHeader;
