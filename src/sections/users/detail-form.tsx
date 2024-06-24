import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HouseIcon from '@mui/icons-material/House';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KingBedIcon from '@mui/icons-material/KingBed';
import PaidIcon from '@mui/icons-material/Paid';
import RoomIcon from '@mui/icons-material/Room';
import TodayIcon from '@mui/icons-material/Today';
import styled from 'styled-components';
const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`


export default function DetailForm({ isOpen, onClose }: any) {
    const navigate = useNavigate()


    function DetailUserCard({ name, phone, email, address, icon, color = 'primary', sx, ...other }: any) {
        return (
            <Box >
                 <Typography fontSize="18px" fontWeight="600" color="#13366E" m="20px 0 30px 0">Thông tin người dùng</Typography>
                 <Card
                component={Stack}
                spacing={3}
                sx={{
                    // boxShadow: "#ccc 1px 1px 1px 1px",
                    border: "1px #ccc solid",
                    // alignItems: 'center',
                    px: 3,
                    py: 3,
                    borderRadius: 2,
                    ...sx,
                }}
                {...other}
            >
               
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>
                    {icon &&
                        <Avatar
                            alt="Remy Sharp"
                            src={icon}
                            sx={{ width: 100, height: 100 }}
                        />
                    }
                    <Box display='flex' alignItems="start" justifyContent='space-between' flex={1}>
                        <Box flex={1} >
                            <Stack direction="row" justifyContent="start" gap={2} mb={3}>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }} noWrap>
                                    Tên người dùng:
                                </Typography>
                                <Typography noWrap >
                                    {name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="start" gap={2}>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                    Số điện thoại:
                                </Typography>
                                <Typography>{phone}</Typography>
                            </Stack>

                        </Box>
                        <Box flex={1}>
                            <Stack direction="row" justifyContent="start" gap={2} mb={3}>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                    Email:
                                </Typography>
                                <Typography>{email}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="start" gap={2}>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                    Địa chỉ:
                                </Typography>
                                <Typography>{address}</Typography>
                            </Stack>
                        </Box>
                        <Box flex={1}>
                            <Stack direction="row" justifyContent="start" gap={2} mb={3}>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                    Số lượng phòng đã đặt:
                                </Typography>
                                <Typography>9</Typography>
                            </Stack>
                        </Box>
                    </Box>

                </Box>
            </Card>
            </Box>
           
        );
    }

    function BookingList() {
        return (
            <Box width="100%" p={0} >
                <Box maxWidth="1224px" m="30px auto" display="flex" gap={3} flexDirection="column"  >
                    <Typography fontSize="18px" fontWeight="600" color="#13366E" >Danh sách phòng đã đặt</Typography>
                    <Box width="100%" m="10px auto">
                        <Grid container gap={5} maxWidth="1224px">
                            <Grid item xs={12}>
                                <Box border="1px solid #DDD" borderRadius="10px" display="flex" alignItems="start" justifyContent="space-between" bgcolor="#FFF" height="100%">
                                    <Box flex={1.5} overflow="hidden" borderRadius="10px" margin="auto 15px" borderRight="1px solid #DDD" display="flex" alignItems="center" justifyContent="center">
                                        <Image src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" />
                                    </Box>
                                    <Box flex={2} border="1px dashed #DDD" borderTop="none" borderBottom="none" height="100%">
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <HouseIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Thu Hà Hotel</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <RoomIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Tạ Quang Bửu - Hai Bà Trưng - Hà Nội</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <KingBedIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Phòng đơn</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <DoorBackIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >301</Typography>
                                            </Box>
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >302</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >300.000 VND</Typography>
                                        </Box>

                                    </Box>
                                    <Box flex={2}>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                <BoyIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="16px" ml="20px" >Người lớn: 4</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="start" ml="30px" alignItems="center">
                                                <ChildCareIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="16px" ml="20px" >Trẻ em : 2</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <TodayIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày nhận phòng: 02/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <InsertInvitationIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày trả phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <EditCalendarIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày đặt phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Box bgcolor="orange" borderRadius="5px" padding="4px 8px" ml="20px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >Thanh toán qua thẻ</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box border="1px solid #DDD" borderRadius="10px" display="flex" alignItems="start" justifyContent="space-between" bgcolor="#FFF" height="100%">
                                    <Box flex={1.5} overflow="hidden" borderRadius="10px" margin="auto 15px" borderRight="1px solid #DDD" display="flex" alignItems="center" justifyContent="center">
                                        <Image src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" />
                                    </Box>
                                    <Box flex={2} border="1px dashed #DDD" borderTop="none" borderBottom="none" height="100%">
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <HouseIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Thu Hà Hotel</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <RoomIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Tạ Quang Bửu - Hai Bà Trưng - Hà Nội</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <KingBedIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >Phòng đơn</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <DoorBackIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >301</Typography>
                                            </Box>
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >302</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="15px" >300.000 VND</Typography>
                                        </Box>

                                    </Box>
                                    <Box flex={2}>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                <BoyIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="16px" ml="20px" >Người lớn: 4</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="start" ml="30px" alignItems="center">
                                                <ChildCareIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="16px" ml="20px" >Trẻ em : 2</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <TodayIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày nhận phòng: 02/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <InsertInvitationIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày trả phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <EditCalendarIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="16px" ml="20px" >Ngày đặt phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Box bgcolor="#BB86FC" borderRadius="5px" padding="4px 8px" ml="20px">
                                                <Typography color="#FFF" fontSize="16px" fontWeight="600" >Thanh toán khi trả phòng</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>

                </Box>

            </Box>
        )
    }

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Thông tin chi tiết người dùng</DialogTitle>
            <DialogContent>
                <DetailUserCard
                    name="Le Minh Duc"
                    phone="0962757401"
                    total="10"
                    email="Lmduc9a101@gmail.com"
                    address="Ha Noi"
                    icon="/assets/images/avatars/avatar_4.jpg"
                />
                <BookingList />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' size='large'>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}