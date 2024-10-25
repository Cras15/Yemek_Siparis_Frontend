import { Box, FormControl, FormLabel, Grid, Input, Textarea } from "@mui/joy";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import MaskedInput from "./MaskedInput";

const AddressForm = forwardRef(({ initialData, mode }, ref) => {
    const [formData, setFormData] = useState({
        addressLine: '',
        city: '',
        state: '',
        apartment: '',
        door: '',
        floor: '',
        addressTitle: '',
        phone: '',
        name: '',
        surname: '',
        postalCode: '',
        description: '',
        isDefault: false
    });

    useImperativeHandle(ref, () => ({
        getData: () => formData
    }));

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: '100%', md: 600, lg: 800 },
                p: 2,
            }}
        >
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Adres Başlığı</FormLabel>
                        <Input
                            placeholder="Örneğin: Ev, İş, Diğer"
                            name="addressTitle"
                            value={formData.addressTitle}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Ad</FormLabel>
                        <Input
                            placeholder="Örneğin: Ahmet"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Soyad</FormLabel>
                        <Input
                            placeholder="Örneğin: Yılmaz"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Telefon</FormLabel>
                        <Input
                            placeholder="(5XX) XXX-XXXX"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    component: MaskedInput,
                                    mask: '(#00) 000-0000',
                                    definitions: {
                                        '#': /[1-9]/,
                                    },
                                    name: 'phone',
                                },
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>İl</FormLabel>
                        <Input
                            placeholder="Örneğin: İstanbul"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>İlçe</FormLabel>
                        <Input
                            placeholder="Örneğin: Kadıköy"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Apartman No</FormLabel>
                        <Input
                            placeholder="Örneğin: 1"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Kapı No</FormLabel>
                        <Input
                            placeholder="Örneğin: 1"
                            name="door"
                            value={formData.door}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Kat</FormLabel>
                        <Input
                            placeholder="Örneğin: 1"
                            name="floor"
                            type="number"
                            value={formData.floor}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Posta Kodu</FormLabel>
                        <Input
                            placeholder="Örneğin: 34000"
                            name="postalCode"
                            type="number"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required>
                        <FormLabel>Adres</FormLabel>
                        <Textarea
                            placeholder="Mahalle, sokak"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleChange}
                            minRows={3}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
});
export default AddressForm;