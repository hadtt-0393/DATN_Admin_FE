import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';
import AppRevenueMonth from './app-revenue-month';
import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Star } from '@mui/icons-material';
export default function HomeView() {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Xin chào Quản trị viên
            </Typography>
            <Grid container spacing={5}>
                {/* <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Thành phố"
                        total={60}
                        icon={<img alt="icon" src="/assets/icons/city.png" />}
                    />
                </Grid> */}
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Khách sạn"
                        total={7}
                        icon={<img alt="icon" src="/assets/icons/hotel.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Người dùng"
                        total={13}
                        icon={<img alt="icon" src="/assets/icons/user.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Lượt đặt phòng/tháng"
                        total={17000}
                        icon={<img alt="icon" src="/assets/icons/city.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Doanh thu/tháng"
                        total={17000}
                        icon={<img alt="icon" src="/assets/icons/total_revenue.png" />}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={5} bgcolor="#FFF">
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
                            <TableRow >
                                <TableCell sx={{ display: "flex", gap: 2, p: "10px", width: "320px" }}>
                                    <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                                    <Box overflow="hidden">
                                        <Typography fontWeight={550} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Khách sạn Mường Thanh Khách sạn Mường Thanh Khách sạn Mường Thanh</Typography>
                                        <Typography fontSize={14} color="#7E7988" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                            Số 20 Nguyễn Xiển
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ p: "10px" }} align="center">
                                    <Typography>02435738964</Typography>
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
                                            5
                                        </Typography>
                                        <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>

                <Grid xs={12} md={6} lg={7} bgcolor="#FFF">
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
                                <TableCell sx={{ padding: "8px", width: "20%" }} align="center">
                                    <Typography>Doanh thu</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ display: "flex", gap: 2, p: "10px", width: "350px", flexDirection: "row" }}>
                                    <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                                    <Box display="flex" flexDirection="column" overflow="hidden">
                                        <Typography fontWeight={550} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >Khách sạn Mường Thanh Khách Mường Thanh Khách </Typography>
                                        <Typography fontSize={14} color="#7E7988" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >
                                            Số 20 Nguyễn Xiển Số 20 Nguyễn Xiển Số 20 Nguyễn Xiển Số 20 Nguyễn Xiển
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ p: "10px", width: "20%" }} align="center">
                                    <Typography>02435738964</Typography>
                                </TableCell>
                                <TableCell sx={{ p: "10px", width: "20%" }} align="center">
                                    <Typography>15</Typography>
                                </TableCell>
                                <TableCell sx={{ p: "10px", width: "20%" }}>
                                    <Box
                                        display="flex"
                                        borderRadius={10}
                                        bgcolor="orange"
                                        alignItems="center"
                                        justifyContent="center"
                                        p="4px"

                                        gap={0.5}
                                        m="auto"
                                    >
                                        <Typography fontWeight="600">
                                            20.000.000
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>

            </Grid>
        </Container >
    )
}