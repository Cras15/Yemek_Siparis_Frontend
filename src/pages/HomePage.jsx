import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const HomePage = () => {
  const fetchData = async () => {
    let data = JSON.stringify({
      "username": "asda@asd.asd",
      "password": "123"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.ayagimagelsin.com.tr/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Button onClick={fetchData}>test</Button>
    </div>
  )
}

export default HomePage