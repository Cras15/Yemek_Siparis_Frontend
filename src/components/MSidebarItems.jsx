import { Chip, ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy'
import React from 'react'

const MSidebarItems = ({ title, icon, selected, link, badge }) => {
    return (
        <ListItem>
            <ListItemButton selected={selected} href={link} role="menuitem"
                component="a">
                {icon}
                <ListItemContent>
                    <Typography level="title-sm">{title}</Typography>
                </ListItemContent>
                {badge &&
                    <Chip size="sm" color="primary" variant="solid">
                        {badge}
                    </Chip>
                }
            </ListItemButton>
        </ListItem>
    )
}

export default MSidebarItems