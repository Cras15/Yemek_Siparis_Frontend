import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const UserAgreementPage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level='h3'>Kullanıcı Sözleşmesi </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    Bu Kullanıcı Sözleşmesi (“Sözleşme”), Ayağına Gelsin (“Platform”) tarafından sunulan hizmetleri kullanan tüm bireyler (“Kullanıcı”) ile Ayağına Gelsin arasında akdedilmektedir. Platformu kullanmadan önce bu Sözleşme'yi dikkatlice okuyunuz.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    1. Taraflar ve Kabul
                </Typography>
                <Typography>
                    Bu Sözleşme, Ayağına Gelsin’in sahip olduğu ve işlettiği platform ile Kullanıcı arasında akdedilir. Platformu kullanarak bu Sözleşme'yi kabul ettiğinizi beyan edersiniz.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    2. Hizmet Tanımı
                </Typography>
                <Typography>
                    Ayağına Gelsin, kullanıcılara market ve restoranlardan ürün veya yemek siparişi verme hizmeti sunar. Bu hizmet, online platform aracılığıyla tüm kullanıcılara ulaştırılmaktadır.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    3. Kullanıcı Yükümlülükleri
                </Typography>
                <Typography>
                    Kullanıcı, Platform’da paylaştığı tüm bilgilerin doğruluğunu taahhüt eder. Kullanıcı, Platform’un yasalara uygun bir şekilde kullanılmasından sorumludur. Kullanıcı, Platform’da belirtilen ödeme ve iptal politikalarına uymayı kabul eder.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    4. Platformun Yükümlülükleri
                </Typography>
                <Typography>
                    Platform, sunulan hizmetlerin doğruluğu ve teslimatların zamanında yapılması konusunda azami özeni gösterir. Platform, kullanıcı verilerinin gizliliğini ve güvenliğini sağlamak için gerekli tüm önlemleri alır.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    5. Sipariş ve Teslimat Koşulları
                </Typography>
                <Typography>
                    Kullanıcı, sipariş esnasında adres ve iletişim bilgilerini doğru bir şekilde sağlamakla yükümüldür. Platform, teslimat süresinde meydana gelebilecek olağanüstü durumlardan dolayı sorumluluk kabul etmez.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    6. Fiyatlandırma ve Ödeme
                </Typography>
                <Typography>
                    Platform üzerinden verilen tüm siparişler, belirtilen fiyatlar üzerinden işlem görür. Ödemeler, Platform’da sunulan güvenli ödeme yöntemleriyle gerçekleştirilir.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    7. Gizlilik ve Veri Koruma
                </Typography>
                <Typography>
                    Platform, kullanıcı verilerini yürürlükteki gizlilik yasalarına uygun olarak saklar ve üçüncü kişilerle paylaşmaz. Kullanıcı, veri işleme politikalarımız hakkında ayrıntılı bilgiye Gizlilik Politikamızdan ulaşabilir.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    8. Sözleşmenin Feshi
                </Typography>
                <Typography>
                    Kullanıcı, istediği zaman Platform’u kullanmayı bırakabilir ve hesabını silebilir. Platform, Kullanıcı’nın Sözleşme’ye aykırı davranması durumunda hizmete erişimini durdurma hakkını saklı tutar.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    9. Değişiklikler
                </Typography>
                <Typography>
                    Platform, bu Sözleşme'de her zaman değişiklik yapma hakkını saklı tutar. Değişiklikler, Platform üzerinden ilan edildikten sonra yürülüe girer.
                </Typography>

                <Typography level="title-lg" component="h2" sx={{ marginTop: 3 }}>
                    10. Uygulanacak Hukuk ve Yetki
                </Typography>
                <Typography>
                    Bu Sözleşme, yürürlükteki Türk hukuku kurallarına tabidir. Taraflar arasındaki ihtilaflarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                </Typography>

                <Typography sx={{ marginTop: 3 }}>
                    Ayağına Gelsin’i tercih ettiğiniz için teşekkür ederiz. Keyifli alışverişler dileriz!
                </Typography>
            </Box>
        </Box >
    )
}

export default UserAgreementPage