import { Box, Button, Card, CardContent, CardOverflow, Divider, Grid, Typography } from "@mui/joy";

const AddressCard = ({ address, handleAddressDelete, handleAddressEdit, xs=12, sm=6, md=4 }) => {
    return (
        <Grid xs={xs} sm={sm} md={md}>
            <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                    <CardContent orientation="horizontal">
                        <Typography
                            level="title-md"
                            textColor="text.secondary"
                            sx={{
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {address.addressTitle}
                        </Typography>
                    </CardContent>
                    <Divider inset="context" />
                </CardOverflow>
                <CardContent>
                    <Typography level="body-md" mb={1} gutterBottom>{address.name} {address.surname}</Typography>
                    <Typography level="title-sm" fontSize={12}>{address.addressLine} no:{address.apartment}/{address.door} {address.state}/{address.city}</Typography>
                    <Typography level="title-sm" fontSize={12} my={1}>{address.phone}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant='plain' color='danger' onClick={() => handleAddressDelete(address.addressId)}>Sil</Button>
                        <Button variant='outlined' color='primary' sx={{ ml: 'auto' }} onClick={() => handleAddressEdit(address)}>Düzenle</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}
export default AddressCard;