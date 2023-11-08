import * as React from 'react';

import { AspectRatio, Box, IconButton, Card, CardContent, Divider, Input, List, ListSubheader, ListItem, ListItemButton, Typography, Sheet, Stack } from '@mui/joy';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import SendIcon from '@mui/icons-material/Send';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { Instagram, Twitter } from '@mui/icons-material';
import AppStoreIcon from '../assets/AppStoreIcon';
import GooglePlayIcon from '../assets/GooglePlayIcon';
import HuaweiStoreIcon from '../assets/HuaweiStoreIcon';
import FooterLinks2 from './FooterLinks2';
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
    createData("Hakkımızda", "#"),
    createData("Kariyer", "#"),
    createData("Teknoloji Kariyeri", "#"),
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


export default function Footer2() {
    const [color, setColor] = React.useState('neutral');
    const instaLink = "https://www.instagram.com/ayagima.gelsin";

    return (
        <Sheet
            variant="plain"
            color="primary"
            invertedColors
            sx={{
                bgcolor: "#fff",
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
                    onClick={() => {
                        const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];
                        const nextColorIndex = colors.indexOf(color) + 1;
                        setColor(colors[nextColorIndex] ?? colors[0]);
                    }}
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
                <Input
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
                />
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
                        <div className='cursor-pointer  hidden lg:block mr-32'>
                            <Typography level='h4' color='primary' mb={2}>Uygulamayı İndirin</Typography>
                            <Stack spacing={0.5}>
                                <AppStoreIcon />
                                <GooglePlayIcon />
                                <HuaweiStoreIcon />
                            </Stack>
                        </div>
                        <FooterLinks2 title="Keşfet" data={kesfet} md={180} />
                        <FooterLinks2 title="Hakkımızda" data={bilgi} md={240} />
                        <FooterLinks2 title="Yardım" data={yardim} md={240} />
                    </List>
                </div>

            </Box><Divider sx={{ mb: 3 }} />
            <Copyright />
        </Sheet>
    );
}