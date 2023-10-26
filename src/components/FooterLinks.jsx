import React from 'react'
import { Grid, Stack, Box } from "@mui/material";
import { Link, Typography } from '@mui/joy';

const FooterLinks = (props) => {

    return (
        <Grid xs={3} item={true}>
            <Typography level='h4' color='primary'>{props.title}</Typography>
            <Box sx={{ width: '100%', marginTop: 2, fontSize: "15px", lineHeight: "22px", fontWeight: "500px" }}>
                <Stack spacing={1}>
                    {props.data.map((row,i) => (
                        <Link key={i} href={row.link} style={{ color: 'rgb(82, 82, 82)', fontSize: "14px", lineHeight: "22px" }} underline="none">{row.name}</Link>
                    ))}
                </Stack>
            </Box>
        </Grid>
    )
}

export default FooterLinks;