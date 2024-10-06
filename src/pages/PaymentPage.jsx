import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { FormControl, FormLabel, Input, Stack, Box, Link, Button, Checkbox, Card, Typography, Divider, CardContent, CardActions, Grid } from '@mui/joy';
import { CreditCard, InfoOutlined, PersonOutline } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from 'react-redux';
import { getBasket, removeAllBasket } from '../redux/basketSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../utils/UIContext';

const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
    const { onChange, mask, blocks, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask={mask}
            blocks={blocks}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskAdapter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mask: PropTypes.string,
    blocks: PropTypes.object,
};

const PaymentPage = () => {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showDoneSnackbar, showErrorSnackbar } = useUI();

    const handlePurchase = () => {
        axios.post("/orders/purchase", {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            showDoneSnackbar(res.data);
            dispatch(getBasket());
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });

        //dispatch(removeAllBasket());
    }
    return (
        <Container component="main">
            <Grid container spacing={5}>
                <Grid xs={10} sm={8} lg={6} sx={{ m: 'auto' }}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            mt: 5,
                        }}
                    >
                        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                            Ödeme
                        </Typography>
                        <Divider inset="none" />
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>Kart Numarası</FormLabel>
                                <Input
                                    required
                                    endDecorator={<CreditCard />}
                                    placeholder='0000 0000 0000 0000'
                                    type="text"
                                    name="cardNumber"
                                    autocomplete="cc-number"
                                    slotProps={{
                                        input: {
                                            component: TextMaskAdapter,
                                            mask: "0000 0000 0000 0000",
                                            blocks: {}
                                        }
                                    }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Son Kullanma Tarihi</FormLabel>
                                <Input
                                    required
                                    endDecorator={<CreditCard />}
                                    placeholder='01/27'
                                    name='expire'
                                    autocomplete="cc-exp"
                                    slotProps={{
                                        input: {
                                            component: TextMaskAdapter,
                                            mask: "MM/YY",
                                            blocks: {
                                                MM: {
                                                    mask: IMask.MaskedRange,
                                                    from: 1,
                                                    to: 12,
                                                    maxLength: 2,
                                                },
                                                YY: {
                                                    mask: IMask.MaskedRange,
                                                    from: 22,
                                                    to: 39,
                                                    maxLength: 2,
                                                },
                                            },
                                        }
                                    }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>CVC/CVV</FormLabel>
                                <Input
                                    endDecorator={<InfoOutlined />}
                                    name='cvc'
                                    autocomplete="cc-csc"
                                    placeholder='321'
                                    slotProps={{ input: { component: TextMaskAdapter, mask: "000" } }} />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>Kart Üzerindeki İsim</FormLabel>
                                <Input
                                    placeholder="Ad Soyad"
                                    name="cardName"  // İsim belirtmek iyi bir uygulamadır
                                    autocomplete="cc-name" />
                            </FormControl>
                            <Checkbox label="Kartı Kaydet" sx={{ gridColumn: '1/-1', my: 1 }} />
                            <CardActions sx={{ gridColumn: '1/-1' }}>
                                <Button variant="solid" color="primary" onClick={handlePurchase}>
                                    Ödeme Yap
                                </Button>
                            </CardActions>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PaymentPage