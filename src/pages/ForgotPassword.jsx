import { CheckCircleOutlined, InfoOutlined, Mail } from '@mui/icons-material'
import { Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Input, Link, Typography } from '@mui/joy'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../redux/snackbarSlice'

const ForgotPassword = () => {
    const [status, setStatus] = React.useState("");
    const dispatch = useDispatch();

    const sendMail = async (email) => {
        setStatus("loading");
        await axios.post(`/auth/forgotPassword?email=${email}`).then((res) => {
            console.log(res);
            setStatus("success");
            dispatch(setSnackbar({ children: res.data, color: 'success' }));
        }).catch((error) => {
            console.log(error);
            setStatus("error");
            dispatch(setSnackbar({ children: error.response.data, color: 'danger' }));
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        sendMail(data.get('email'));
    };

    return (
        <div className='mt-20 m-auto w-11/12 md:w-3/6 lg:5/12 xl:w-2/6 '>
            <Card variant="outlined" sx={{ px: 4, py: 3 }}>
                <CardContent>
                    <Typography level="h3" >Şifrenizi mi unuttunuz?</Typography>
                    <Typography>E-posta adresinizi girin. E-posta adresinize şifrenizi sıfırlamanız için bir bağlantı göndereceğiz.</Typography>
                    <form onSubmit={(event) => { handleSubmit(event) }}>
                        <FormControl required sx={{ mt: 3 }} error={status == "error"} >
                            <FormLabel>Email</FormLabel>
                            <Input color={(status == "success" && "success" || status == "error"&& "danger") || "neutral"} startDecorator={<Mail color={(status == "error" && 'error' || status == "success" && 'success') || "neutral"} />} size='lg' placeholder='E-Mail' type="email" name="email" />
                            {status == "success" &&
                                <FormHelperText about=''>
                                    <CheckCircleOutlined color='success'/>
                                    <Typography color='success'>Mail gönderildi!</Typography>
                                </FormHelperText>
                            }
                            {status == "error" && <FormHelperText about=''>
                                <InfoOutlined />
                                Mail gönderirken bir hata oluştu!
                            </FormHelperText>}
                        </FormControl>
                        <Button size='lg' sx={{ mt: 2, mb: 4, width: '100%' }} type='submit' loading={status == "loading"}>Şifreyi Sıfırla</Button>
                    </form>
                    <Link href='/giris'>Giriş Yap'a dön</Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword