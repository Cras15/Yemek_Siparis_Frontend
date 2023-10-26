import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import ShopsCard from '../components/ShopsCard'
import { AspectRatio, Card, Container, Skeleton, Stack, Typography } from '@mui/joy'
import { InfoOutlined } from '@mui/icons-material'

const HomePage = () => {
  const [shops, setShops] = React.useState([]);
  const [status, setStatus] = React.useState('');

  const getShops = async () => {
    await setStatus('pending');
    await axios.get("/shop/getAll").then((res) => {
      console.log(res);
      setShops(res.data);
      setStatus('success');
    }).catch((error) => {
      setStatus('error');
    })
  }

  React.useEffect(() => {
    getShops();
  }, []);
  return (
      <div className='mx-8 mt-4 md:mx-32  text-center bg-white'>
        {status !== 'pending' ?
          <div /*spacing={5} direction="row" flexWrap="wrap" useFlexGap */ className='grid gap-3 grid-flow-row-dense xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {shops.length != 0 ?
              shops.map((data, i) => (
                <ShopsCard key={i} data={data} />
              ))
              :
              <Typography startDecorator={<InfoOutlined />} justifyContent="center" textAlign="center" level="h3">Bu bölgede henüz hizmet veremiyoruz.</Typography>
            }
          </div> :
          <Card variant="outlined" sx={{ width: 343, display: 'flex', gap: 2 }}>
            <AspectRatio ratio="21/9">
              <Skeleton variant="overlay">
                <img
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                />
              </Skeleton>
            </AspectRatio>
            <Typography>
              <Skeleton>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and
                publishing industries.
              </Skeleton>
            </Typography>
          </Card>
        }
      </div>
  )
}

export default HomePage