import axios from 'axios'
import React from 'react'
import ShopsCard from '../components/ShopsCard'
import { AspectRatio, Button, Card, CardActions, CardContent, Container, DialogContent, DialogTitle, Grid, Modal, ModalClose, ModalDialog, Skeleton, Stack, Typography } from '@mui/joy'
import { InfoOutlined, TuneRounded } from '@mui/icons-material'
import HomePageFilterModal from '../components/HomePageFilterModal'
import FilterChild from '../components/FilterChild'

const HomePage = () => {
  const [shops, setShops] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

  const getShops = async () => {
    setStatus('pending');
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
    // <div className='lg:grid lg:grid-flow-row-dense xl:grid-cols-5 lg:grid-cols-4'>
    <Grid container spacing={0}>
      <Grid xs={0} md={2}>
        <Card variant="outlined" invertedColors sx={{ boxShadow: 'xl', ml: 7, mt: 6.5, minWidth: 250, position: 'sticky', display: { lg: 'inherit', md: 'none', sm: 'none', xs: 'none' } }}>
          <CardContent orientation="horizontal">
            <Typography level="title-lg">Filtrele</Typography>
          </CardContent>
          <CardActions>
            <FilterChild />
          </CardActions>
          <Button sx={{ mt: 2, borderRadius: 'lg' }} size='md' onClick={() => getShops()}>Filteleri Uygula</Button>
        </Card>
      </Grid>
      <Button variant="solid" color="primary" sx={{ borderRadius: 'lg', mx: 4, mt: 4, display: { lg: 'none', md: 'inherit' } }} fullWidth onClick={() => setModalOpen(true)} startDecorator={<TuneRounded />}>Filtrele</Button>
      <Grid xs={12} md={12} lg={10}>
        <div className='mx-8 mt-4 md:mx-32 text-center bg-white xl:col-span-4 lg:col-span-3  '>
          {status !== 'pending' ?
            <div /*spacing={5} direction="row" flexWrap="wrap" useFlexGap */ className='grid gap-3 grid-flow-row-dense lg:grid-cols-3  sm:grid-cols-2  grid-cols-1'>
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
      </Grid>{/* // </div> */}
      <HomePageFilterModal open={modalOpen} setOpen={setModalOpen} />
    </Grid>
  )
}

export default HomePage