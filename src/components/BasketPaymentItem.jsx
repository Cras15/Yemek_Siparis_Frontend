import { Check } from '@mui/icons-material'
import { ListItem, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const BasketPaymentItem = ({title, price}) => {
    return (
        <ListItem>
            <ListItemDecorator>
                <Check />
            </ListItemDecorator>
            <Typography sx={{ mr: 'auto' }}> {title}</Typography>
            <Typography>{price}</Typography>
        </ListItem>
    )
}

export default BasketPaymentItem