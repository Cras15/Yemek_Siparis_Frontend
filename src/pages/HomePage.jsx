import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const HomePage = () => {
  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "asda@asd.asd",
      "password": "123"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("https://api.ayagimagelsin.com.tr/auth/login", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <Button onClick={fetchData}>test</Button>
    </div>
  )
}

export default HomePage