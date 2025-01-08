import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const TermsOfUsePage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level="h3" component="h1" gutterBottom>
                    Kullanım Koşulları
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography>
                    Bu Kullanım Koşulları (“Koşullar”), Ayağına Gelsin (“Platform”) tarafından sunulan hizmetlerin kullanımını düzenlemektedir. Platformu kullanmadan önce lütfen bu Koşulları dikkatlice okuyunuz.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    1. Hizmet Tanımı
                </Typography>
                <Typography>
                    Ayağına Gelsin, kullanıcılara market ve restoranlardan ürün ve yemek siparişi verme hizmeti sunar. Bu hizmet, Platform aracılığıyla kullanıcılara ulaştırılmaktadır.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    2. Kullanıcı Yükümlülükleri
                </Typography>
                <Typography>
                    Kullanıcılar, Platform’u aşağıdaki kurallara uygun olarak kullanmayı taahhüt eder:
                    <ul>
                        <li>Doğru ve eksiksiz bilgi sağlamak,</li>
                        <li>Yasalara ve etik kurallara uygun davranmak,</li>
                        <li>Platform’u amacı dışında kullanmamak,</li>
                        <li>Diğer kullanıcılara zarar vermemek.</li>
                    </ul>
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    3. Fiyatlandırma ve Ödeme
                </Typography>
                <Typography>
                    Platformda sunulan ürün ve hizmetlerin fiyatlandırması, sipariş anında belirtilir. Ödemeler, güvenli ödeme altyapısı kullanılarak gerçekleştirilir.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    4. Sipariş ve Teslimat
                </Typography>
                <Typography>
                    Kullanıcı, sipariş esnasında doğru adres ve iletişim bilgilerini sağlamakla yükümüldür. Teslimat süresi, olağan şartlarda belirtilen zaman diliminde tamamlanır.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    5. Gizlilik
                </Typography>
                <Typography>
                    Kullanıcı bilgilerinin korunması ve gizliliğinin sağlanması konusunda, Kişisel Verilerin Korunması Politikamıza uygun hareket edilir.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    6. Sorumluluk Sınırlandırması
                </Typography>
                <Typography>
                    Platform, kullanımından kaynaklanan doğrudan veya dolaylı zararlar için sorumlu tutulamaz. Kullanıcılar, Platform’u kendi sorumluluklarında kullanır.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    7. Değişiklikler
                </Typography>
                <Typography>
                    Ayağına Gelsin, bu Koşulları her zaman değiştirme hakkını saklı tutar. Değişiklikler, Platformda yayınlandığı tarihte yürülüe girer.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    8. Uygulanacak Hukuk ve Yetki
                </Typography>
                <Typography>
                    Bu Koşullar, Türk hukuku kurallarına tabidir. Taraflar arasında doğabilecek ihtilaflarda, İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                </Typography>

                <Typography sx={{ marginTop: 3 }}>
                    Daha fazla bilgi için bizimle iletisim@ayaginagelsin.tr adresinden iletişime geçebilirsiniz.
                </Typography>
            </Box>
        </Box>
    )
}

export default TermsOfUsePage