// src/pages/SupportViewPage.jsx
import React from 'react';
import SupportTicketView from '../components/SupportTicketView';
import UserSupportHeader from '../components/UserSupportHeader';

const SupportViewPage = () => {
    return (
        <SupportTicketView HeaderComponent={UserSupportHeader} />
    );
};

export default SupportViewPage;
