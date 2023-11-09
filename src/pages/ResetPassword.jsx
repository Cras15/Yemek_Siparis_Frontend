import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ErrorPage404 from './ErrorPage404';
import { Button, Card, CardContent, CircularProgress, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import { Key, Mail, Password, PasswordOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../redux/snackbarSlice';

const ResetPassword = () => {
    const [status, setStatus] = React.useState("loading");
    const [formStatus, setFormStatus] = React.useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateToken = async (token) => {
        setStatus("loading");
        await axios.get(`/auth/validateToken?token=${token}`).then((res) => {
            setStatus("success");
        }).catch((error) => {
            setStatus("error");
        })
    }

    const resetPassword = async (password) => {
        setFormStatus("loading");
        await axios.post(`/auth/resetPassword?token=${token}&password=${password}`).then((res) => {
            console.log(res);
            setFormStatus("success");
            navigate('/giris');
            dispatch(setSnackbar({ children: "Şire sıfırlandı", color: 'success' }));
        }).catch((error) => {
            console.log(error);
            setFormStatus("error");
            dispatch(setSnackbar({ children: "Bir hata oluştu tekrar deneyin", color: 'danger' }));
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        resetPassword(data.get('password'));
    };

    React.useEffect(() => {
        validateToken(token);
    }, []);
    return (
        <div>
            {status == "loading" ? <CircularProgress /> : (status == "success" ?
                <div className='mt-20 m-auto w-11/12 md:w-3/6 lg:5/12 xl:w-2/6 '>
                    <Card variant="outlined" sx={{ px: 4, py: 3 }}>
                        <CardContent>
                            <Typography level="h3" >Şifreyi sıfırla</Typography>
                            <Typography>Yeni şifreni oluşturarak hesabına tekrar giriş yapabilirsin.</Typography>
                            <form onSubmit={(event) => { handleSubmit(event) }}>
                                <FormControl required sx={{ mt: 3 }}>
                                    <FormLabel>Yeni şifre</FormLabel>
                                    <Input startDecorator={<Key />} size='lg' placeholder='Yeni şifre' type="password" name="password" />
                                </FormControl>
                                <Button size='lg' sx={{ mt: 2, mb: 4, width: '100%' }} type='submit' loading={formStatus == "loading"}>Şifreyi Sıfırla</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                : <ErrorPage404 />)
            }
        </div>
    )
}

export default ResetPassword