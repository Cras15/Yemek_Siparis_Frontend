export const pageTitles = {
    '/manager': 'Anasayfa',
    '/manager/siparisler': 'Siparişler',
    '/manager/urunler': 'Ürünler',
    '/manager/destek': 'Destek',
    '/manager/ayarlar': 'Ayarlar'
};
export const currentTitle = (path) => pageTitles[path] || 'Ayağıma Gelsin';