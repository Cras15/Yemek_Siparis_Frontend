import { Checkbox, FormControl, FormLabel, List, ListItem, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/joy'
import React from 'react'

const FilterChild = () => {
    return (
        <Stack direction='column' spacing={2} sx={{ ml: 1 }}>
            <FormControl>
                <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
                    Sıralama
                </Typography>
                {/* <FormLabel>Sıralama</FormLabel> */}
                <RadioGroup defaultValue="smart" name="radio-buttons-group" >
                    <Radio value="smart" label="Akıllı Sıralama" variant="outlined" color='primary' />
                    <Radio value="time" label="Teslimat Süresi" variant="outlined" color='primary' />
                    <Radio value="km" label="Mesafe" variant="outlined" color='primary' />
                    <Radio value="score" label="Restoran Puanı" variant="outlined" color='primary' />
                </RadioGroup>
            </FormControl>
            <div>
                <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
                    Mutfaklar
                </Typography>
                <div role="group" aria-labelledby="sandwich-group">
                    <List size="sm">
                        <ListItem>
                            <Checkbox label="Burger" color='primary' />
                        </ListItem>
                        <ListItem>
                            <Checkbox label="Çiğ Köfte" color='primary' />
                        </ListItem>
                        <ListItem>
                            <Checkbox label="Döner" color='primary' />
                        </ListItem>
                    </List>
                </div>
            </div>
            <div>
                <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={4}>
                    Minimum Sepet Tutarı
                </Typography>
                <Slider valueLabelDisplay="on"
                    max={300}
                    step={30}
                    marks={[
                        {
                            value: 0,
                            label: '0TL',
                        },
                        {
                            value: 300,
                            label: 'Tümü',
                        },
                    ]} />
            </div>
        </Stack>
    )
}

export default FilterChild