import { Avatar, Chip, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Stack, Typography } from '@mui/joy'
import React from 'react'
import { OrderStatus, OrderStatusColor, timeAgo } from './Utils'

const DOrdersListItems = ({ order, onClick }) => {
    return (
        <ListItem>
            <ListItemButton sx={{ borderRadius: 'xl', py: 1.3 }} onClick={onClick}>
                <ListItemDecorator>
                    <Avatar />
                </ListItemDecorator>

                <ListItemContent>
                    <Typography level="title-sm">{order?.orderItems?.map((oitems, j) => (oitems.orderName + (j != order?.orderItems?.length - 1 ? ', ' : '')))}</Typography>
                    <Typography level="body-sm" noWrap>
                        {order?.address}
                    </Typography>
                </ListItemContent>
                <Typography level="body-xs" sx={{ color: 'text.tertiary', ml: 'auto' }}>{timeAgo(order?.orderDate)} önce</Typography>
            </ListItemButton>
        </ListItem>
    )
}

export default DOrdersListItems