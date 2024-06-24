import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { FormControlLabel } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../api/axios';
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constant';
import { Hotel } from '../../models/hotel';

const Image = styled.img`
width: 100%;
objectFit: cover;
height: 100%;
borderRadius:5px;
transition: transform 0.5s ease-in-out;
ZIndex:2;
&:hover{
    transform: scale(1.2);
    cursor: pointer;
},`

export default function DetailHotel({ isOpen, onClose }: any) {

    function ProfileView() {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;

        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        const services = [
            'Airport shuttle',
            'Spa and wellness centre',
            'Fitness centre',
            'Room service',
            'Parking',
            'Free WiFi',
            'Beachfront',
            'Facilities for disabled guests',
            'Family rooms',
            'Good breakfast',
            'Restaurant',
            'Pets allowed',
            '24-hour front desk',
            'Non-smoking rooms',
            'Electric vehicle charging station',
            'Swimming Pool',
            'Air conditioning',
        ]

        const provinces = [
            "Hà Nội",
            "Hồ Chí Minh",
            "Đà Nẵng",
            "Hải Phòng",
            "Cần Thơ",
            "Bà Rịa - Vũng Tàu",
            "Bắc Giang",
            "Bắc Kạn",
            "Bạc Liêu",
            "Bắc Ninh",
            "Bến Tre",
            "Bình Định",
            "Bình Dương",
            "Bình Phước",
            "Bình Thuận",
            "Cà Mau",
            "Cao Bằng",
            "Đắk Lắk",
            "Đắk Nông",
            "Điện Biên",
            "Đồng Nai",
            "Đồng Tháp",
            "Gia Lai",
            "Hà Giang",
            "Hà Nam",
            "Hà Tĩnh",
            "Hải Dương",
            "Hậu Giang",
            "Hòa Bình",
            "Hưng Yên",
            "Khánh Hòa",
            "Kiên Giang",
            "Kon Tum",
            "Lai Châu",
            "Lâm Đồng",
            "Lạng Sơn",
            "Lào Cai",
            "Long An",
            "Nam Định",
            "Nghệ An",
            "Ninh Bình",
            "Ninh Thuận",
            "Phú Thọ",
            "Quảng Bình",
            "Quảng Nam",
            "Quảng Ngãi",
            "Quảng Ninh",
            "Quảng Trị",
            "Sóc Trăng",
            "Sơn La",
            "Tây Ninh",
            "Thái Bình",
            "Thái Nguyên",
            "Thanh Hóa",
            "Thừa Thiên Huế",
            "Tiền Giang",
            "Trà Vinh",
            "Tuyên Quang",
            "Vĩnh Long",
            "Vĩnh Phúc",
            "Yên Bái"
        ];

        function getStyles(name: string, personName: readonly string[], theme: Theme) {
            return {
                fontWeight:
                    personName.indexOf(name) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,
            };
        }

        const theme = useTheme();
        const [service, setService] = React.useState<string[]>([]);
        const [files, setFiles] = useState<any>(null);

        const handleChange = (event: SelectChangeEvent<typeof service>) => {
            const {
                target: { value },
            } = event;
            setService(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        };

        const handleclose = () => {
            handleChangeHotel({ services: service })
        }

        function ImagesList({ images }: any) {
            return (
                <ImageList cols={2} gap={5} rowHeight='auto'>
                    {images && images.map((image: any) => (
                        <ImageListItem key={image.img}>
                            <img
                                src={image}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
        }

        const VisuallyHiddenInput = styled('input')({
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
        });

        const [loading, setLoading] = useState(false);
        const [hotel, setHotel] = useState<Partial<Hotel>>({});

        useEffect(() => {
            setLoading(true);
            const getProfile = async () => {
                const res = await axiosInstance.get('/hotel/get-detail');
                setHotel(res.data);
                setService(res.data.services)
                setLoading(false);
            }
            const timer = setTimeout(getProfile, 1000);
            return () => clearTimeout(timer);
        }, []);

        const uploadImg = async (file: any) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "stndhxae");

            return axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData).then((response) => {
                const data = response.data;
                const fileURL = data.url;
                return fileURL as string;
            });
        };


        const save = async () => {
            setLoading(true);
            const saveProfile = async () => {
                if (files) {
                    const uploaders = Array.from(files).map(uploadImg);
                    const data = await axios.all(uploaders);
                    setHotel(prevHotel => ({
                        ...prevHotel,
                        images: data,
                    }));

                }
                const res = await axiosInstance.put('/hotel/update-detail-hotel', hotel);
                setHotel(res.data);
                setLoading(false);
            }
            const timer = setTimeout(saveProfile, 1000);
            return () => clearTimeout(timer);
        }

        const handleChangeHotel = (values: Partial<Hotel>) => {
            setHotel({
                ...hotel,
                ...values,
            });
        }


        const handleFileChange = (e: any) => {
            const files = e.target.files
            console.log(files)
            if (files.length > 6) {
                alert('You can only upload up to 6 images.');
                e.target.value = null; // Clear the selected files
            }
            else {
                setFiles(e.target.files)
            }
        }

        return (
            <Box>
                <Box >
                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                        Chi tiết khách sạn
                    </Typography>
                </Box>
                <Container maxWidth="xl" >
                    {loading ? (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : (
                        <>
                            <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                                <Box display="flex" flexDirection="row" alignItems='start' marginLeft={2} >
                                    <Box flex={0.8} sx={{ mr: 2 }}>
                                        <ImagesList images={hotel.images} />

                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Stack spacing={3} flex={1} sx={{ margin: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Tên khách sạn:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.username}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Thành phố:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.city}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Địa chỉ:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.address}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Cách trung tâm thành phố:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.distance} km</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Mô tả chung:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.description}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Giá rẻ nhất:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.cheapestPrice} VND</Typography>

                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Giá đắt nhất:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.highestPrice} VND</Typography>

                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Giảm giá:
                                            </Typography>
                                            <Typography sx={{ flex: 1 }}>{hotel?.discount} %</Typography>

                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="start">
                                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                                Dịch vụ khách sạn:
                                            </Typography>
                                            <ul style={{ listStyleType: "none", padding: "0px", color: "black", flex: "1", margin: "0" }}>
                                                {hotel?.services?.map(
                                                    (service, key) => (
                                                        <li style={{ display: "inline-block", marginRight: "10px" }} key={key} >{service},</li>
                                                    )
                                                )
                                                }
                                            </ul>

                                        </Stack>

                                    </Stack>
                                </Box>
                            </Box>
                        </>)}
                </Container>
            </Box>
        );
    }

    function RoomList() {
        return (
            <Box bgcolor="white" borderRadius="5px" pb="30px">
                <Box borderBottom="#EEE 1px solid">
                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                        Chi tiết phòng khách sạn
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                    <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 30px 0" display="flex" alignItems="start" justifyContent="space-between">
                        <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                            <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                        </Box>
                        <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                        <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" mt={1.5} flex={1}>
                                            <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                            <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                            <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                            <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center" mt={1.5}>
                                            <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                            <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                    <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>

                                </Box>
                                <Box borderBottom="#CCC 1px dashed" padding="20px 0" width="100%">

                                    <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                        <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 30px 0" display="flex" alignItems="start" justifyContent="space-between">
                        <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                            <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                        </Box>
                        <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                        <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1} mt={1.5}>
                                            <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                            <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                        </Box>

                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                            <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                            <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center" mt={1.5}>
                                            <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                            <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                    <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>

                                </Box>
                                <Box borderBottom="#CCC 1px dashed" padding="20px 0" width="100%">

                                    <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                        <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 30px 0" display="flex" alignItems="start" justifyContent="space-between">
                        <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                            <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                        </Box>
                        <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                        <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1} mt={1.5}>
                                            <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                            <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                        <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                            <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                            <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center" mt={1.5}>
                                            <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                            <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                    <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>
                                </Box>
                                <Box borderBottom="#CCC 1px dashed" padding="20px 0" width="100%">

                                    <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                        <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                            <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
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
            <DialogTitle>Thông tin chi tiết khách sạn</DialogTitle>
            <DialogContent>
                <ProfileView />
                <RoomList />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' size='large'>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}