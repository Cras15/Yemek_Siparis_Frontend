import { Grid } from '@mui/joy'
import React from 'react'
import DashboardItems from '../../components/DashboardItems'
import ProductsIcon from '../../assets/ProductsIcon'
import ShopIcon from '../../assets/ShopIcon'
import OrderIcon from '../../assets/OrderIcon'
import { People } from '@mui/icons-material'

const AdminIndexPage = () => {
  const [adminStats, setAdminStats] = React.useState([]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <DashboardItems
            title='Mağaza'
            value={adminStats?.shopCount || 0}
            icon={<ShopIcon />}
            child={`${adminStats?.shopCount || 0} Tane`}
            color='success'
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <DashboardItems
            title='Kullanıcı'
            value={adminStats.totalProductCount || 0}
            icon={<People />}
            child={`${adminStats?.totalProductCount || 0} Üye`}
            color='primary'
            link='/manager/urunler'
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <DashboardItems
            title='Siparişler'
            value={adminStats?.totalOrderCount || 0}
            icon={<OrderIcon />}
            child={`${adminStats?.totalOrderCount || 0} Tane`}
            color='warning'
            link='/manager/siparisler'
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminIndexPage