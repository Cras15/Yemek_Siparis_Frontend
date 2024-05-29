import { Box, Card, CardContent, CardCover, Typography } from '@mui/joy'
import React from 'react';

const ManagerIndexPage = () => {
    
    return (
        <div className='w-9/12 m-auto mt-20'>
            <Box
                component="ul"
                sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', p: 0, m: 0 }}
            >
                <Card component="li" sx={{ minWidth: 300, flexGrow: 1, height: 300, "&:hover": { cursor: 'pointer' } }} onClick={() => navigate('/manager/magazalarim')}>
                    <CardCover>
                        <img
                            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </CardCover>
                    <CardContent>
                        <Typography
                            level="body-lg"
                            fontWeight="lg"
                            textColor="#fff"
                            mt="auto"
                        >
                            Marketlerim
                        </Typography>
                    </CardContent>
                </Card>
                <Card component="li" sx={{ minWidth: 300, flexGrow: 1, "&:hover": { cursor: 'pointer' } }} onClick={() => navigate('/manager/siparisler')}>
                    <CardCover>
                        <img
                            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </CardCover>
                    <CardContent>
                        <Typography
                            level="body-lg"
                            fontWeight="lg"
                            textColor="#fff"
                            mt="auto"
                        >
                            Siparişler
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ManagerIndexPage