import { DashboardRounded, GroupRounded, HomeRounded, PeopleRounded, SettingsRounded, ShoppingCartRounded, SupportRounded } from '@mui/icons-material';
import * as React from 'react';
import BaseSidebar from '../../components/BaseSidebar';

const AdminSidebar = () => {
    const menuItems = {
        main: [
            { title: "Anasayfa", link: "/admin", icon: <HomeRounded /> },
            {
                title: "Kullanıcılar",
                icon: <GroupRounded />,
                children: [ // Alt menüler
                    { title: "Yeni Hesap Oluştur", link: "/admin/profile" },
                    { title: "Kullanıcı Listesi", link: "/admin/kullanicilar" }
                ],
            },
            { title: "Mağaza Başvuruları", link: "/admin/magaza-basvuru", icon: <DashboardRounded /> },
        ],
        footer: [
            { title: "Destek Talepleri", icon: <SupportRounded />, link: "/support" },
            { title: "Ana Sayfaya Dön", icon: <PeopleRounded />, link: "/" },
        ]
    };

    return <BaseSidebar menuItems={menuItems} />;
}

export default AdminSidebar;
