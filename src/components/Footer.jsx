import * as React from 'react';

import { AspectRatio, Box, IconButton, Card, CardContent, Divider, Input, List, ListSubheader, ListItem, ListItemButton, Typography, Sheet, Stack, useColorScheme } from '@mui/joy';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import SendIcon from '@mui/icons-material/Send';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { Instagram, Twitter } from '@mui/icons-material';
import AppStoreIcon from '../assets/AppStoreIcon';
import GooglePlayIcon from '../assets/GooglePlayIcon';
import HuaweiStoreIcon from '../assets/HuaweiStoreIcon';
import FooterLinks from './FooterLinks';
import Copyright from './Copyright';

function createData(name, link) {
    return { name, link };
}
const indir = [
    createData(<AppStoreIcon />, "#"),
    createData(<GooglePlayIcon />, "#"),
    createData(<HuaweiStoreIcon />, "#"),
];

const kesfet = [
    createData("Hakkımızda", "/hakkimizda"),
    //createData("Kariyer", "#"),
    //createData("Teknoloji Kariyeri", "#"),
    createData("Mağaza Başvurusu", "/magaza-basvuru"),
];

const yardim = [
    createData("Sıkça Sorulan Sorular", "#"),
    createData("Kişisel Verilerin Korunması", "#"),
    createData("Gizlilik ve Çerez Politikası", "#"),
    createData("Kullanıcı Sözleşmesi", "#"),
    createData("Kullanım Koşulları", "#"),
    createData("İade ve İptal Koşulları", "#"),
    createData("Çerez Politikası", "#"),
];

const bilgi = [
    createData("Kullanıcı Sözleşmesi", "#"),
    createData("Kişisel Verilerin Korunması", "#"),
    createData("Gizlilik ve Çerez Politikası", "#"),
];


export default function Footer() {
    const [color, setColor] = React.useState('neutral');
    const instaLink = "https://www.instagram.com/ayagima.gelsin";
    const { mode, setMode } = useColorScheme();

    const toggleTheme = () => {
        console.log(mode);
        if (mode === 'dark') setMode('light');
        else setMode('dark');
    };

    return (
        <Sheet
            variant="plain"
            color="primary"
            invertedColors
            sx={{
                flexGrow: 1,
                p: 2,
                borderRadius: { xs: 0, sm: 'sm' },
                mt: 5,
            }}
        >
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <IconButton
                    variant="soft"
                    size="sm"
                    onClick={toggleTheme}
                >
                    <ColorLensRoundedIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" />
                <IconButton variant="plain" color='primary'>
                    <FacebookRoundedIcon />
                </IconButton>
                <IconButton variant="plain" color='danger' onClick={() => window.open(instaLink, "_blank")} sx={{ "&:hover": { color: '#FD1D1D' } }}>
                    <Instagram />
                </IconButton>
                <IconButton variant="plain" color='primary'>
                    <Twitter />
                </IconButton>
                {/*<Input
                    variant="soft"
                    placeholder="Ara"
                    type="email"
                    name="email"
                    endDecorator={
                        <IconButton variant="soft" aria-label="subscribe">
                            <SendIcon />
                        </IconButton>
                    }
                    sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
                />*/}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'flex-start' },
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <div className='m-auto '>
                    <List
                        size="sm"
                        orientation="horizontal"
                        wrap
                        sx={{ flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '0px', }}>
                        <div className='hidden lg:block mr-32'>
                            <Typography level='h4' color='primary' mb={2}>Uygulamayı İndirin</Typography>
                            <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
                                <div onClick={() => window.open("https://www.apple.com/tr/app-store/", "_blank")}><AppStoreIcon /></div>
                                <div onClick={() => window.open("https://play.google.com/", "_blank")}><GooglePlayIcon /></div>
                                <div onClick={() => window.open("https://consumer.huawei.com/tr/mobileservices/appgallery/", "_blank")}><HuaweiStoreIcon /></div>
                            </Stack>
                        </div>
                        <FooterLinks title="Keşfet" data={kesfet} md={180} />
                        <FooterLinks title="Hakkımızda" data={bilgi} md={240} />
                        <FooterLinks title="Yardım" data={yardim} md={240} />
                    </List>
                </div>

            </Box><Divider sx={{ mb: 3, mt: 2 }} />
            <Copyright />
        </Sheet>
    );
}