import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const PrivicyAndPolicyPage = () => {
    return (
        <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
            <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
                <Typography level="h3" component="h1" gutterBottom>
                    Gizlilik ve Çerez Politikası
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography>
                    Ayağına Gelsin (“Platform”) olarak gizliliğinizi önemsiyoruz. Bu politika, Platform kullanımı sırasında toplanan kişisel bilgilerinizin ve çerezlerin (“cookies”) nasıl kullanıldığını açıklamaktadır.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    1. Gizlilik Politikası
                </Typography>
                <Typography>
                    Platform, kullanıcıların gizliliğini korumak için yasalara uygun olarak kişisel bilgilerinizi toplar, saklar ve işler. Bu bilgiler şu amaçlarla kullanılabilir:
                    <ul>
                        <li>Hizmet sunumunu sağlamak,</li>
                        <li>Platform performansını iyileştirmek,</li>
                        <li>Size özel teklifler sunmak,</li>
                        <li>Yasal zorunlulukları yerine getirmek.</li>
                    </ul>
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    2. Çerez Politikası
                </Typography>
                <Typography>
                    Platform, kullanıcı deneyimini iyileştirmek ve hizmetlerimizi optimize etmek amacıyla çerezler kullanır. Çerezler, tarayıcınıza kaydedilen küçük metin dosyalarıdır ve şu amaçlarla kullanılabilir:
                    <ul>
                        <li>Kullanıcı tercihlerinizi hatırlamak,</li>
                        <li>Platform performansını analiz etmek,</li>
                        <li>Reklam ve pazarlama çalışmaları yapmak,</li>
                        <li>Güvenliğinizi sağlamak.</li>
                    </ul>
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    3. Çerez Türleri
                </Typography>
                <Typography>
                    Platformda kullanılan çerez türleri şunlardır:
                    <ul>
                        <li><strong>Zorunlu Çerezler:</strong> Platformun çalışması için gereklidir ve devre dışı bırakılamaz.</li>
                        <li><strong>Performans Çerezleri:</strong> Kullanım şeklinizi analiz ederek Platform’u iyileştirmemize yardımcı olur.</li>
                        <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlayarak size daha iyi bir deneyim sunar.</li>
                        <li><strong>Reklam Çerezleri:</strong> Size uygun reklamlar gösterilmesini sağlar.</li>
                    </ul>
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    4. Çerezleri Nasıl Yönetebilirsiniz?
                </Typography>
                <Typography>
                    Tarayıcı ayarlarınızı kullanarak çerezleri devre dışı bırakabilir veya silebilirsiniz. Ancak, bu durum Platform’un bazı özelliklerinin işlevselliğini etkileyebilir.
                </Typography>

                <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
                    5. Değişiklikler
                </Typography>
                <Typography>
                    Bu politika, gerek duyulduğunda güncellenebilir. Güncellemeler, Platform üzerinden duyurulur ve yayınlandığı tarihten itibaren yürülüe girer.
                </Typography>

                <Typography sx={{ marginTop: 3 }}>
                    Daha fazla bilgi için bizimle iletisim@ayaginagelsin.tr adresinden iletişime geçebilirsiniz.
                </Typography>
            </Box>
        </Box>
    )
}

export default PrivicyAndPolicyPage