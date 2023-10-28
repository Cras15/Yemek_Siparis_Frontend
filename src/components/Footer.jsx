import React from 'react'
import { Grid, Paper, Stack } from "@mui/material";
import FooterLinks from './FooterLinks';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Divider, IconButton, Typography } from '@mui/joy';
import Copyright from './Copyright';
import AppStoreIcon from '../assets/AppStoreIcon';
import GooglePlayIcon from '../assets/GooglePlayIcon';
import HuaweiStoreIcon from '../assets/HuaweiStoreIcon';

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



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    textAlign: 'left',
    paddingTop: 15,
}));

const Footer = () => {
    const instaLink = "https://www.instagram.com/ayagima.gelsin";
    return (
        <div style={{ width: "100%" }} className='mt-16'>
            <Divider />
            {/* desktop part */}
            <section style={{ background: "white" }} >
                <section style={{ background: "white" }} className="hidden lg:flex w-full h-full items-center justify-between">
                    <Grid style={{ width: '80%', margin: 'auto' }}>
                        <div style={{ marginTop: 50, marginBottom: 50 }} className='grid gap-3 grid-flow-col'>
                            <FooterLinks title="Uygulamayı İndirin" data={indir} />
                            <FooterLinks title="Keşfet" data={kesfet} />
                            <FooterLinks title="Yardım" data={yardim} />
                            <FooterLinks title="Hakkımızda" data={bilgi} />
                        </div>
                        <div className='w-full text-left pb-4'>
                            <Divider sx={{ mb: 3 }} />
                            <div className='grid gap-3 grid-flow-col'>
                                <Copyright />
                                <div className='col-span-3 ml-auto my-auto'>
                                    <IconButton onClick={() => window.open('http://facebook.com', "_blank")} sx={{ "&:hover": { color: '#4267B2' } }}>
                                        <FacebookRoundedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => window.open('http://twitter.com', "_blank")} sx={{ "&:hover": { color: '#1DA1F2' } }}>
                                        <TwitterIcon />
                                    </IconButton>
                                    <IconButton onClick={() => window.open(instaLink, "_blank")} sx={{ "&:hover": { color: '#FD1D1D' } }}>
                                        <InstagramIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </section>


                {/* mobile */}
                <section className="flex items-center justify-between lg:hidden w-full h-full bg-white">
                    <Stack spacing={0} style={{ width: "100%" }}>
                        <div className='w-full'>
                            <AccordionGroup >
                                <Accordion>
                                    <AccordionSummary>Keşfet</AccordionSummary>
                                    <AccordionDetails>
                                        <FooterLinks title={""} data={kesfet} />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary>Yardım</AccordionSummary>
                                    <AccordionDetails>
                                        <FooterLinks title={""} data={yardim} />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary>Hakkımızda</AccordionSummary>
                                    <AccordionDetails>
                                        <FooterLinks title={""} data={bilgi} />
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionGroup>
                        </div>
                        <div className='w-full text-center pb-4'>
                            <Divider sx={{ mb: 3 }} />
                            <div className='grid gap-3 grid-flow-row'>
                                <Copyright />
                                <div>
                                    <IconButton onClick={() => window.open('http://facebook.com', "_blank")} sx={{ "&:hover": { color: '#4267B2' } }}>
                                        <FacebookRoundedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => window.open('http://twitter.com', "_blank")} sx={{ "&:hover": { color: '#1DA1F2' } }}>
                                        <TwitterIcon />
                                    </IconButton>
                                    <IconButton onClick={() => window.open(instaLink, "_blank")} sx={{ "&:hover": { color: '#FD1D1D' } }}>
                                        <InstagramIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </section>

            </section >
        </div >
    )
}

export default Footer;