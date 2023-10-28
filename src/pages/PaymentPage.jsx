import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { FormControl, FormLabel, Input, Stack, Box, Link, Button, Checkbox, Select, Option } from '@mui/joy';
import { CreditCard, Key, Mail, PersonOutline } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';

const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="0000 0000 0000 0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskAdapter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const PaymentPage = () => {
    const cardMount = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const cardYear = ["2023", "2024", "2025", "2026", "2027", "2028", "2030", "2031", "2032", "2033", "2034"];
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                <Box
                    sx={{
                        width:
                            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                        transition: 'width var(--Transition-duration)',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backdropFilter: 'blur(12px)',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '50dvh',
                            width:
                                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                            maxWidth: '100%',
                            px: 2,
                        }}>
                        <Box
                            component="main"
                            sx={{
                                my: 'auto',
                                py: 2,
                                pb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: 325,
                                maxWidth: '100%',
                                mx: 'auto',
                                borderRadius: 'sm',
                                '& form': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                },
                            }} >
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <form
                                    onSubmit={(event) => { handleSubmit(event) }}>
                                    <FormControl required>
                                        <FormLabel>Kart Üzerindeki İsim</FormLabel>
                                        <Input startDecorator={<PersonOutline />} placeholder='Ad Soyad' type="text" name="name" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Kart Numarası</FormLabel>
                                        <Input startDecorator={<CreditCard />} placeholder='Kart Numarası' type="text" name="cardNumber" slotProps={{ input: { component: TextMaskAdapter } }} />
                                    </FormControl>
                                    <Stack direction="row" spacing={1}>
                                        <FormControl required>
                                            <FormLabel>Ay</FormLabel>
                                            <Select defaultValue="01">
                                                {cardMount.map((data) => (
                                                    <Option value={data} key={data}>{data}</Option>
                                                ))}
                                            </Select>

                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>Yıl</FormLabel>
                                            <Select defaultValue="2023">
                                                {cardYear.map((data) => (
                                                    <Option value={data} key={data}>{data}</Option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>CCV</FormLabel>
                                            <Input sx={{ maxWidth: 150 }} placeholder="CCV" type="number" name="ccv" onChange={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                            }} />
                                        </FormControl>
                                    </Stack>
                                    <Button type="submit" fullWidth>
                                        Öde
                                    </Button>
                                </form>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default PaymentPage