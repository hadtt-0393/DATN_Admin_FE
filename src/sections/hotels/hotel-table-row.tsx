import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Label from '../../components/label';
import DetailHotel from './detail-hotel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// ----------------------------------------------------------------------

export default function HotelTableRow({
    name,
    avatarUrl,
    email,
    phone,
    city,
    rooms,
    address,
    ratingAvg,

}: any) {
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
                {/* <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell> */}

                <TableCell>
                    <Stack
                        display="flex"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ overflow: "hidden", width: "250px" }}
                    >
                        <Avatar alt={name} src={avatarUrl} />
                        <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {email}
                </TableCell>

                <TableCell align="center">
                    {phone}
                </TableCell>

                <TableCell align="center">
                    {city}
                </TableCell>

                <TableCell align="center">
                    {rooms}
                </TableCell>

                <TableCell align="center">
                    {ratingAvg}
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
                                // color:"white",
                                '&.Mui-disabled': {
                                    cursor: 'not-allowed',
                                    color:"white",
                                },
                            }}
                            // disabled={status !== ''}

                        >
                            <MenuItem value='' ><em>Chờ xác nhận</em></MenuItem>
                            <MenuItem value={1}>Cháp nhận</MenuItem>
                            <MenuItem value={2}>Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
            <DetailHotel isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}
