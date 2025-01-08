import { Box, Container, Divider, Stack, Typography } from '@mui/joy'
import React from 'react'

const features = [
    {
        title: 'Kolay Kullanım',
        description: 'Kullanıcı dostu arayüzümüz sayesinde siparişlerinizi sadece birkaç tıklamayla verebilirsiniz.',
    },
    {
        title: 'Hızlı Teslimat',
        description: 'Zamanınızın kıymetli olduğunu biliyoruz. Bu nedenle siparişlerinizi en kısa sürede kapınıza getiriyoruz.',
    },
    {
        title: 'Geniş Seçenekler',
        description: 'Yerel marketlerden sevdiğiniz restoranlara kadar geniş bir ağ ile çalışıyoruz.',
    },
    {
        title: 'Güvenilir Alışveriş',
        description: 'Güncel teknoloji altyapımız sayesinde ödemelerinizi güvenle yapabilirsiniz.',
    },
];

const AboutUsPage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level='h3'>Hakkımızda </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Ayağına Gelsin, hayatınızı kolaylaştırmak ve zamandan tasarruf etmenizi sağlamak için tasarlanmış bir market ve yemek sipariş platformudur. Teknolojiyi en etkili şekilde kullanarak, gündelik ihtiyaçlarınıza hızlı ve güvenilir çözümler sunmayı amaçlıyoruz.<br /><br />
                    Marketten temel gıda ürünlerinize kadar genşi bir ürün yelpazesiyle hizmet verirken, aynı zamanda sevdiğiniz restoranlardan en lezzetli yemekleri ayağınıza getiriyoruz.</Typography>
                <Typography level='title-lg' my={1}>Neden Ayağına Gelsin?</Typography>
                <ul style={{ listStyleType: 'initial', marginLeft: 30 }}>
                    <li><b>Kolay Kullanım:</b> Kullanıcı dostu arayüzümüz sayesinde siparişlerinizi sadece birkaç tıklamayla verebilirsiniz.</li>
                    <li><b>Hızlı Teslimat:</b> Zamanınızın kıymetli olduğunu biliyoruz. Bu nedenle siparişlerinizi en kısa sürede kapınıza getiriyoruz.</li>
                    <li><b>Geniş Seçenekler:</b> Yerel marketlerden sevdiğiniz restoranlara kadar genşi bir ağ ile çalışıyoruz.</li>
                    <li><b>Güvenilir Alışveriş:</b> Güncel teknoloji altyapımız sayesinde ödemelerinizi güvenle yapabilirsiniz.</li>
                </ul>
                <Typography mt={1}>Ayağına Gelsin, her anınıza değer katmayı hedefleyen bir ekip tarafından yönetilmektedir. Yerel şişirilmiş fiyatlar yerine adil fiyatlar ve özenli hizmet ile memnuniyetinizi öncelikli tutuyoruz.</Typography>
            </Box>
        </Box >
    )
}

export default AboutUsPage