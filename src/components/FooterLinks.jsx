import { Link, List, ListItem, ListItemButton, ListSubheader } from '@mui/joy'
import React from 'react'

const FooterLinks = (props) => {
    return (
        <ListItem nested sx={{ width: { xs: '50%', md: props.md } }}>
            <ListSubheader sx={{ fontWeight: 'xl',color:'var(--variant-plainColor, rgba(var(--joy-palette-primary-mainChannel, 11 107 203) / 1))' }}>{props.title}</ListSubheader>
            <List sx={{ '--ListItemDecorator-size': '32px' }}>
                {props.data.map((row, i) => (
                    <ListItem key={i}>
                        <ListItemButton component={Link} underline='none' href={row.link}>{row.name}</ListItemButton>
                    </ListItem>

                ))}
            </List>
        </ListItem>
    )
}

export default FooterLinks