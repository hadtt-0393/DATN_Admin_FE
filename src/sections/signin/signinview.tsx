import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from '../../components/logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'

import { useNavigate } from 'react-router-dom';
import { bgGradient } from '../../theme/css';


// ----------------------------------------------------------------------

export default function SigninView() {
    const theme = useTheme();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/');
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email" />
                <TextField
                    name="Mật khẩu"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Box display="flex" justifyContent='center' alignItems='center' mt="50px">
                <Button variant="contained" onClick={handleClick} sx={{ textTransform: "uppercase" }} size='large'>Đăng nhập</Button>
            </Box>
        </>
    );

    return (
        <Box
            sx={{
                // ...bgGradient({
                //     color: alpha(theme.palette.background.default, 0.1),
                //     imgUrl: '/assets/background/overlay_4.jpg',
                // }),
                height: 1,
                bgcolor:"#13366E"
            }}
        >
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
                style={{
                    height: "35px", width: "133px", cursor: "pointer", position: 'fixed',
                    top: "50px",
                    left: "40px",
                }} onClick={() => navigate("/")} />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 500,
                    }}
                >
                    <Box display="flex" justifyContent='center' alignItems='center'>
                        <Typography variant="h4" textTransform="uppercase" mb="30px">Đăng nhập</Typography>
                    </Box>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
