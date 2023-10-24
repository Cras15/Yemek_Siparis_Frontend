import React from 'react'
import { useParams } from 'react-router-dom';
import { ProductsCard } from '../components/ProductsCard';
import axios from 'axios';
import { AspectRatio, Card, CardContent, Skeleton, Stack, Typography } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';

export const Shops = () => {
  const [shop, setShop] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const { id } = useParams();

  const getShopsById = async (shopId) => {
    await setStatus('pending');
    await axios.get(`/shop/getProducts?shopId=${shopId}`).then((res) => {
      console.log(res);
      setShop(res.data);
      setStatus('success');
    }).catch((error) => {
      setStatus('error');
    })
  }

  React.useEffect(() => {
    getShopsById(id);
  }, []);

  return (
    <div className='mx-8 mt-4 md:m-16'>
      {status !== "pending" ?
        <Stack spacing={5} direction="row" flexWrap="wrap" useFlexGap>
          {shop != "" && shop.products.length > 0 ?
            shop.products.map((res) => (
              <ProductsCard data={res} key={res.productsId} />
            )) :
            <Typography startDecorator={<InfoOutlined />} justifyContent="center" textAlign="center" level="h3">Bu işletme henüz birşey eklememiş</Typography>}
        </Stack>
        :
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{ width: 320 }}>
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <Skeleton variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <CardContent>
            <Typography level="title-lg" id="card-description"><Skeleton>Lahmacun</Skeleton></Typography>
            <Typography level="body-sm" aria-describedby="card-description" mb={1}>
              <Typography><Skeleton>Seydişehir, Konya</Skeleton></Typography>
            </Typography>
            <Typography><Skeleton>123.0₺</Skeleton></Typography>
          </CardContent>
        </Card>}
    </div>
  )
}
