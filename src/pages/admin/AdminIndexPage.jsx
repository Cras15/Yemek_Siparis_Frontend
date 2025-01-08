import { Grid } from '@mui/joy'
import React from 'react'
import DashboardItems from '../../components/DashboardItems'
import ProductsIcon from '../../assets/ProductsIcon'
import ShopIcon from '../../assets/ShopIcon'
import OrderIcon from '../../assets/OrderIcon'
import { People } from '@mui/icons-material'
import axios from 'axios'
import { useSelector } from 'react-redux'

const AdminIndexPage = () => {
  const [adminStats, setAdminStats] = React.useState([]);
  const { token } = useSelector((state) => state.user);

  const fetchAdminStats = async () => {
    try {
      const response = await axios.get('/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdminStats(response.data);
    } catch (error) {
      console.error('FetchAdminStats Error:', error);
    }
  }
  React.useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <DashboardItems
            title='Mağaza Başvuruları'
            value={adminStats?.shopApplicationCount || 0}
            icon={<ShopIcon />}
            child={`${adminStats?.shopApplicationCount || 0} Başvuru`}
            link='/admin/magaza-basvuru'
            color='success'
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <DashboardItems
            title='Kayıtlı Kullanıcılar'
            value={adminStats.userCount || 0}
            icon={<People />}
            child={`${adminStats?.userCount || 0} Üye`}
            color='primary'
            link='/admin/kullanicilar'
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminIndexPage