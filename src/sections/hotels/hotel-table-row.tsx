import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Hotel } from '../../models';
import DetailHotel from './detail-hotel';

interface Prop {
    hotel: Hotel;
}


export default function HotelTableRow({
    hotel
}: Prop) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    const getBackgroundColor = (status: any) => {
        switch (status) {
            case '':
                return 'orange';
            case 1:
                return '#00Ab84';
            case 2:
                return '#DDD';
            default:
                return 'orange';
        }
    };
    return (
        <>
            <TableRow hover tabIndex={-1} >
                <TableCell>
                    <Stack
                        display="flex"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ overflow: "hidden", width: "250px" }}
                    >
                        <Avatar alt={hotel.hotelName} src={hotel.hotelName} />
                        <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {hotel.hotelName}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {hotel.email}
                </TableCell>

                <TableCell align="center">
                    {hotel.hotline}
                </TableCell>

                <TableCell align="center">
                    {hotel.city}
                </TableCell>

                <TableCell align="center">
                    {hotel.roomIds.length === 0 ? '0' : hotel.rooms.reduce((total, room) => total + room.quantity, 0)}
                </TableCell>

                <TableCell align="center">
                    {hotel.ratingAvg === 0 ? "Chưa có đánh giá" : `${hotel.ratingAvg}`}
                </TableCell>

                <TableCell align="center" >
                    <VisibilityIcon color='success' onClick={() => setOpen(true)} />
                </TableCell>

                <TableCell align="center">
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            hiddenLabel
                            displayEmpty
                            onChange={handleChange}
                            sx={{
                                backgroundColor: getBackgroundColor(status),
                                '&.Mui-disabled': {
                                    cursor: 'not-allowed',
                                    color: "white",
                                },
                            }}

                        >
                            <MenuItem value='' ><em>Chờ xác nhận</em></MenuItem>
                            <MenuItem value={1}>Chấp nhận</MenuItem>
                            <MenuItem value={2}>Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
            <DetailHotel isOpen={open} onClose={() => setOpen(false)} hotel={hotel}/>
        </>
    );
}
