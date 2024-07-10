import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';
import AppRevenueMonth from './app-revenue-month';
import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Star } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { Hotel } from '../../models';
export default function HomeView() {
    const [usersForm, setUsersForm] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [forms, setForms] = useState([]);
    const [topTenRating, setTopTenRating] = useState<Hotel[]>([]);
    const [topTenHotelsByForms, setTopTenHotelsByForms] = useState<any>([]);
    useEffect(() => {
        const fetchAllForm = async () => {
            const usersForm = await axiosInstance.get('/user/getAllUser');
            setUsersForm(usersForm.data);
        }
        fetchAllForm();
    }, [])

    useEffect(() => {
        const fetchAllHotel = async () => {
            const listHotel = await axiosInstance.get("/hotel/getAllHotel");
            setHotels(listHotel.data);
        };
        fetchAllHotel();
    }, []);

    useEffect(() => {
        const fetchForm = async () => {
            const forms = await axiosInstance.get('/form/getAllFormByAdmin');
            setForms(forms.data);
        }
        fetchForm();
    }, [])

    useEffect(() => {
        const fetchTopTenRating = async () => {
            const topTenRating = await axiosInstance.get('/hotel/topTenRating');
            setTopTenRating(topTenRating.data);
        }
        fetchTopTenRating();
    }, [])

    useEffect(() => {
        const topTenHotelsByForms = async () => {
            const topTenHotelsByForms = await axiosInstance.get('/form/getTopTenHotelsByForms');
            setTopTenHotelsByForms(topTenHotelsByForms.data);
        }
        topTenHotelsByForms();
    }, [])

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Xin chào Quản trị viên
            </Typography>
            <Grid container spacing={5}>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Khách sạn"
                        total={hotels.length}
                        link="/hotels"
                        icon={<img alt="icon" src="/assets/icons/hotel.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Người dùng"
                        total={usersForm.length}
                        link="/users"
                        icon={<img alt="icon" src="/assets/icons/user.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Lượt đặt phòng"
                        total={forms.length}
                        icon={<img alt="icon" src="/assets/icons/city.png" />}
                        link="/forms"
                    />
                </Grid>

                {/* <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Doanh thu/tháng"
                        total={17000}
                        icon={<img alt="icon" src="/assets/icons/total_revenue.png" />}
                    />
                </Grid> */}

                <Grid xs={12} md={6} lg={6} bgcolor="#FFF" >
                    <Typography fontWeight="600" my="20px" fontSize="18px" color="#18458B">Top 10 khách sạn được đánh giá cao nhất</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: "8px", width: "320px" }}>
                                    <Typography>Tên khách sạn</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px" }} align="center">
                                    <Typography>Hotline</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px" }} align="center">
                                    <Typography>Đánh giá</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                topTenRating.length !== 0 && topTenRating.map((hotel, key): any => (
                                    <TableRow key={key} >
                                        <TableCell sx={{ display: "flex", gap: 2, p: "10px", width: "350px" }}>
                                            <Avatar src={hotel.images[0]}></Avatar>
                                            <Box overflow="hidden">
                                                <Typography fontWeight={550} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{hotel.hotelName}</Typography>
                                                <Typography fontSize={14} color="#7E7988" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                                    {hotel.address}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: "10px" }} align="center">
                                            <Typography>{hotel.hotline}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ p: "10px", width: "20%" }}>
                                            <Box
                                                display="flex"
                                                borderRadius={10}
                                                bgcolor="#E4F6D6"
                                                alignItems="center"
                                                justifyContent="center"
                                                p="4px"
                                                width="70%"
                                                gap={0.5}
                                                m="auto"
                                            >
                                                <Typography>
                                                    {hotel.ratingAvg}
                                                </Typography>
                                                <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )

                                )


                            }

                        </TableBody>
                    </Table>
                </Grid>

                <Grid xs={12} md={6} lg={6} bgcolor="#FFF" >
                    <Typography fontWeight="600" my="20px" fontSize="18px" color="#18458B">Top 10 khách sạn có lượt đặt phòng cao nhất</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: "8px", width: "40%" }}>
                                    <Typography>Tên khách sạn</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px", width: "20%" }} align="center">
                                    <Typography>Hotline</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px", width: "20%" }} align="center">
                                    <Typography>Lượt đặt phòng</Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topTenHotelsByForms.length !== 0 && topTenHotelsByForms.map((hotel: any, key: any) =>
                                <TableRow key={key} >
                                    <TableCell sx={{ display: "flex", gap: 2, p: "10px", width: "350px", flexDirection: "row" }}>
                                        <Avatar src={hotel.hotelInfo.images[0]}></Avatar>
                                        <Box display="flex" flexDirection="column" overflow="hidden">
                                            <Typography fontWeight={550} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >{hotel.hotelInfo.hotelName} </Typography>
                                            <Typography fontSize={14} color="#7E7988" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >
                                                {hotel.hotelInfo.address}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ p: "10px", width: "20%" }} align="center">
                                        <Typography>{hotel.hotelInfo.hotline}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ p: "10px", width: "20%" }} align="center">
                                        <Typography>{hotel.bookingCount}</Typography>
                                    </TableCell>
                                </TableRow>)}

                        </TableBody>
                    </Table>
                </Grid>

            </Grid>
        </Container >
    )
}