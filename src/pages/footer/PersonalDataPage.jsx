import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const PersonalDataPage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level='h3'>Kişisel Verilerin Korunması </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    Ayağına Gelsin (“Platform”) olarak, kullanıcılarımızın kişisel verilerinin korunmasına büyük önem veriyoruz. Bu politika, kişisel verilerin işlenmesi ve korunması konularında şeffaflığı sağlamak amacıyla hazırlanmıştır.
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    1. Kişisel Verilerin Toplanması ve Kullanım Amacı
                </Typography>
                <Typography>
                    Toplanan kişisel veriler, şu amaçlarla işlenmektedir:
                    <ul>
                        <li>Hizmetlerimizi sunmak ve iyileştirmek,</li>
                        <li>Siparişlerinizi almak, işlemek ve teslimatını yapmak,</li>
                        <li>Kullanıcı destek hizmetlerini sağlamak,</li>
                        <li>Platform’un kullanımına ilişkin analitik çalışmalar yapmak,</li>
                        <li>Yasal yükümüllülüklerimizi yerine getirmek.</li>
                    </ul>
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    2. Toplanan Veriler
                </Typography>
                <Typography>
                    Toplanan kişisel veriler, kullanıcının verdiği bilgilerden oluşmaktadır:
                    <ul>
                        <li>Ad, soyad, e-posta adresi, telefon numarası,</li>
                        <li>Teslimat adresleri,</li>
                        <li>Ödeme bilgileri,</li>
                        <li>Platform kullanımına dair teknik veriler (IP adresi, çerez bilgileri, cihaz tipi).</li>
                    </ul>
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    3. Verilerin Paylaşılması
                </Typography>
                <Typography>
                    Kişisel veriler, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Ancak, hizmetlerin sunulabilmesi için aşağıdaki durumlarda paylaşım yapılabilir:
                    <ul>
                        <li>Teslimat hizmetlerini gerçekleştiren çözüm ortakları,</li>
                        <li>Ödeme altyapı hizmetleri sağlayıcıları,</li>
                        <li>Yasal zorunluluklar gereği yetkili kamu kurumları.</li>
                    </ul>
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    4. Verilerin Saklanması
                </Typography>
                <Typography>
                    Toplanan kişisel veriler, yasal mevzuatın öngördüğü süreler boyunca ya da işleme amacı ortadan kalkana dek saklanır. Süre sonunda veriler, anonimleştirilerek veya silinerek yok edilir.
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    5. Veri Sahibi Hakları
                </Typography>
                <Typography>
                    Kullanıcılar, Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında aşağıdaki haklara sahiptir:
                    <ul style={{listStyleType:'inherit', marginLeft:30}}>
                        <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
                        <li>Kişisel verileriyle ilgili bilgi talep etme,</li>
                        <li>Verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                        <li>Yanlış veya eksik işlenmiş verilerin düzeltilmesini isteme,</li>
                        <li>Kişisel verilerin silinmesini veya yok edilmesini talep etme,</li>
                        <li>Düzeltme, silme veya yok etme işlemlerinin, verilerin paylaşıldığı üçüncü kişilere bildirilmesini isteme,</li>
                        <li>Otomatik sistemler aracılığıyla işlenmesi nedeniyle ortaya çıkan sonuçlara itiraz etme,</li>
                        <li>Kanuna aykırı bir işleme sebebiyle zararın giderilmesini talep etme.</li>
                    </ul>
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    6. Veri Güvenliği
                </Typography>
                <Typography>
                    Platform, kişisel verilerin yetkisiz erişim, kayıp, manipülasyon veya ifşa edilmesini önlemek amacıyla gerekli teknik ve idari önlemleri alır.
                </Typography>

                <Typography level="h3" component="h2" sx={{ marginTop: 3 }}>
                    7. Değişiklikler
                </Typography>
                <Typography>
                    Bu politika, gerek duyulduğunda güncellenebilir. Güncellemeler, Platform üzerinden duyurulur ve yayınlandığı tarihten itibaren yürülüe girer.
                </Typography>

                <Typography sx={{ marginTop: 3 }}>
                    Kişisel verilerinizin korunması konusunda sorularınız varsa, bizimle iletisim@ayaginagelsin.com adresinden iletişime geçebilirsiniz.
                </Typography>
            </Box>
        </Box>
    )
}

export default PersonalDataPage