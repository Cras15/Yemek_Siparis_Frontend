import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const HomePage = () => {
  const fetchData = async () => {
    await axios.get('/api/manager/shop/getMyShop').then(function (res) {
      console.log(res);
    })
  }
  return (
    <div>
      <Button onClick={fetchData}>test</Button>
    </div>
  )
}

export default HomePage