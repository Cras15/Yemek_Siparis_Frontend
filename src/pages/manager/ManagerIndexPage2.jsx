import React from 'react'
import ManagerSidebar from './ManagerSidebar'
import DashboardItems from '../../components/DashboardItems'
import { ProfitIcon } from '../../assets/ProfitIcon'
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Stack, Typography } from '@mui/joy'
import { ArrowForward, ChevronRight } from '@mui/icons-material'
import DOrdersListItems from '../../components/DOrdersListItems'
import DOrdersInfoTab from '../../components/DOrdersInfoTab'
import { ListItemIcon, ListItemText } from '@mui/material'



const ManagerIndexPage2 = () => {
    return (
        <div>
            <div className='grid gap-10 grid-flow-row-dense xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                <DashboardItems title="Marketlerim" icon={<ProfitIcon />} child={`1 Tane`} />
                <DashboardItems title="Ürünlerim" icon={<ProfitIcon />} child="
                10 Tane"/>
                <DashboardItems title="Siparişler" icon={<ProfitIcon />} child="500 Adet" />
            </div>
            <div className='grid gap-10 grid-flow-row-dense xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-10'>
                <div className='col-span-2'>
                    <Box sx={{ boxShadow: 'xl', borderRadius: 'xl', p: 3 }}>
                        <Typography
                            id="ellipsis-list-demo"
                            level="body-xs"
                            textTransform="uppercase"
                            sx={{ letterSpacing: '0.15rem', mb: 1 }}
                        >
                            Son Siparişler
                        </Typography>
                        <List
                            aria-labelledby="ellipsis-list-demo"
                            sx={{ '--ListItemDecorator-size': '56px' }}
                        >
                            <DOrdersListItems title="Lahmacun Menü" child="Anabağlar mah. prof. dr. necmettin erbakan caddesi no:23" time={5} />
                            <DOrdersListItems title="Döner, Ayran..." child="Anabağlar mah. prof. dr. necmettin erbakan caddesi no:23" time={10} />
                            <DOrdersListItems title="Hamburger, Patates, Ayran..." child="Anabağlar mah. prof. dr. necmettin erbakan caddesi no:23" time={43} />
                            <Divider sx={{ my: 2 }} />
                            <IconButton
                                variant="plain"
                                size="md"
                                sx={{ alignSelf: 'flex-start', borderRadius: 'xl', p: 1.3, mr: -1, my: -1 }}>
                                Tüm siparişleri gör &nbsp;<ArrowForward />
                            </IconButton>
                        </List>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ManagerIndexPage2