import React from 'react'
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, AspectRatio, Card, CardContent, Chip, Divider, Link, Stack, Typography } from '@mui/joy'
import { format, parseISO } from 'date-fns'
import tr from 'date-fns/locale/tr'
import { OrderStatus, OrderStatusColor } from './Utils'
import { ArrowDownward, LocationOnOutlined } from '@mui/icons-material'

const OrderCard = ({ data }) => {
    const convertDate = (date) => {
        const dates = parseISO(date); // Tarihi ISO formatından Date objesine çevirir

        return format(dates, "d MMMM EEE HH:mm", { locale: tr });
    }
    return (
        <Card
            variant="outlined"
            orientation="vertical"
            key={data.orderId * 10}
            sx={{
                minWidth: 220,
                width: 'auto',
                maxWidth: 600,
                m: 'auto',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <Stack direction="row" spacing={2}>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src="https://images.deliveryhero.io/image/fd-tr/LH/layn-listing.jpg?width=235&height=170"
                        srcSet="https://images.deliveryhero.io/image/fd-tr/LH/layn-listing.jpg?width=235&height=170 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <div className='grid grid-flow-col-dense '>
                        <Typography level="h3" id="card-description">
                            {data.shopName}
                        </Typography>
                        <Typography level="title-lg" aria-describedby="card-description" mb={1} ml="auto" mr={2} sx={{ fontWeight: 'bold' }}>
                            {(data.finalPrice - data.discount).toFixed(2)} TL
                        </Typography>
                    </div>
                    <Stack direction="row">
                        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                            {convertDate(data.orderDate)} tarihinde sipariş edildi.
                        </Typography>
                        <Chip
                            variant="soft"
                            color={OrderStatusColor[data.status] || "danger"}
                            size="md"
                            sx={{ pointerEvents: 'none', ml: 'auto', height: 20 }}>
                            {OrderStatus[data.status] || "Durum bilinmiyor"}
                        </Chip>
                    </Stack>
                    {data.orderItems.map((item, i) => (
                        i < 3 &&
                        <Typography level="body-md" aria-describedby="card-description" key={i * item.unit}>
                            {item.unit} x {item.orderName} {(i == 2 && data.orderItems.length != i + 1) && "..."}
                        </Typography>
                    ))}

                </CardContent>
            </Stack>
            <Divider />
            <AccordionGroup disableDivider>
                <Accordion >
                    <AccordionSummary>Ayrıntıları Gör</AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row" spacing={1}>
                            <div className='grid grid-flow-row gap-0'>

                                <LocationOnOutlined color='primary' />
                                <Divider orientation="vertical" sx={{ mx: 'auto', height: 'auto', bgcolor: 'var(--variant-plainColor, rgba(var(--joy-palette-primary-mainChannel, 11 107 203) / 1))' }} />
                                <LocationOnOutlined color='primary' sx={{ mt: 'auto' }} />
                            </div>
                            <div>
                                <Typography level="body-xs" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>Siparişin Verildiği Yer:</Typography>
                                <Typography level="body-md" aria-describedby="card-description">{data.shopName}</Typography>
                                <ArrowDownward sx={{ mt: 1, ml: 'auto', width: 100 }} color='primary' />
                                <Typography level="body-xs" aria-describedby="card-description" sx={{ fontWeight: 'bold', mt: 2 }}>Teslim edildiği yer:</Typography>
                                <Typography level="body-md" aria-describedby="card-description">{data.address}</Typography>
                            </div>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        {data.orderItems.map((item, i) => (
                            <div className='grid grid-flow-col' key={i * 13}>
                                <Typography level="body-sm" aria-describedby="card-description">
                                    {item.unit} x {item.orderName}
                                </Typography>
                                <Typography level="body-sm" aria-describedby="card-description" sx={{ ml: 'auto' }}> {(item.price * item.unit).toFixed(2)} TL</Typography>
                            </div>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <div className='grid grid-flow-col'>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                                Ara Toplam:
                            </Typography>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                                {(data.finalPrice).toFixed(2)} TL
                            </Typography>
                        </div>
                        <div className='grid grid-flow-col'>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                                İndirim:
                            </Typography>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                                {(data.discount).toFixed(2)} TL
                            </Typography>
                        </div>
                        <div className='grid grid-flow-col'>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold' }}>
                                Toplam:
                            </Typography>
                            <Typography level="body-md" aria-describedby="card-description" sx={{ fontWeight: 'bold', ml: 'auto' }}>
                                {(data.finalPrice - data.discount).toFixed(2)} TL
                            </Typography>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </AccordionGroup>
        </Card>

    )
}

export default OrderCard