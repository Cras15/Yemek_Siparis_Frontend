import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const ReturnAndCollectionPage = () => {
  return (
    <Box sx={{ justifyContent: 'center', justifyItems: 'center', width: "100%", height: "100%" }}>
      <Box sx={{ boxShadow: 'lg', width: "80%", mt: 5, p: 2, borderRadius: 'lg', bgcolor: 'background.level1' }}>
        <Typography level="h3" component="h1" gutterBottom>
          İptal ve İade Koşulları
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography>
          Ayağına Gelsin (“Platform”) olarak, kullanıcılarımızın memnuniyetini önemsiyoruz. İptal ve iade koşullarımız, kullanıcılarımıza daha iyi bir deneyim sunmak amacıyla belirlenmiştir.
        </Typography>

        <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
          1. İptal Koşulları
        </Typography>
        <Typography>
          Siparişinizi aşağıdaki koşullar dahilinde iptal edebilirsiniz:
          <ul>
            <li>Sipariş, hazırlık veya teslimat sürecinde değilse, iptal edilebilir.</li>
            <li>Hazırlık sürecine giren siparişler, iptal edilemez ancak destek ekibimizle iletişime geçebilirsiniz.</li>
          </ul>
        </Typography>

        <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
          2. İade Koşulları
        </Typography>
        <Typography>
          İade talepleriniz şu durumlarda kabul edilir:
          <ul>
            <li>Eksik veya hatalı ürün teslimatlarında,</li>
            <li>Bozulmuş veya kullanılamaz durumda olan ürünlerde,</li>
            <li>Süre aşımı nedeniyle teslim edilmeyen siparişlerde.</li>
          </ul>
          İade talebiniz, teslimattan itibaren 24 saat içinde destek ekibimize iletilmelidir.
        </Typography>

        <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
          3. Geri Ödeme Süreci
        </Typography>
        <Typography>
          Onaylanan iade taleplerinde geri ödeme, orijinal ödeme yönteminize 5-7 iş günü içerisinde yapılacaktır. Geri ödemeler, Platform’un ödeme altyapısı üzerinden gerçekleştirilecektir.
        </Typography>

        <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
          4. İstisnalar
        </Typography>
        <Typography>
          Aşağıdaki durumlarda iade veya iptal talepleri kabul edilmez:
          <ul>
            <li>Yanlış adres veya iletişim bilgisi nedeniyle teslim edilemeyen siparişler,</li>
            <li>Kullanılmış veya tahrip edilmiş ürünler,</li>
            <li>Kışiye özel hazırlanmış ürünlerde.</li>
          </ul>
        </Typography>

        <Typography level="h4" component="h2" sx={{ marginTop: 3 }}>
          5. Destek
        </Typography>
        <Typography>
          İptal veya iade talepleriniz için bizimle iletisim@ayaginagelsin.tr adresinden ya da Platform’daki destek formunu kullanarak iletişime geçebilirsiniz.
        </Typography>
      </Box>
    </Box>
  )
}

export default ReturnAndCollectionPage