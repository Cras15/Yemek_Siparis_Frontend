import { Avatar, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const DOrdersListItems = ({ title, child, time }) => {
    return (
        <ListItem>
            <ListItemButton sx={{ borderRadius: 'xl', py: 1.3 }}>
                <ListItemDecorator>
                    <Avatar  />
                </ListItemDecorator>

                <ListItemContent>
                    <Typography level="title-sm">{title}</Typography>
                    <Typography level="body-sm" noWrap>
                        {child}
                    </Typography>
                </ListItemContent>
                <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>{time} dk önce</Typography>
            </ListItemButton>
        </ListItem>
    )
}

export default DOrdersListItems