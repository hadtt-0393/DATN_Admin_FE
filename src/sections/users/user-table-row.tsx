import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { UserForm } from '../../models';
import DetailForm from './detail-form';

interface Prop {
    userForm: UserForm;
}


export default function UserTableRow({
    userForm
}: Prop) {
    const [open, setOpen] = useState(false);
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                mr: 1, width: "40px", height: "40px", fontSize: "16px"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <TableRow hover tabIndex={-1} >
                <TableCell >
                    <Stack direction="row" alignItems="center" spacing={2} >
                        <Avatar  {...stringAvatar(userForm.username)} />
                        <Typography variant="subtitle2" noWrap>
                            {userForm.username}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {userForm.email}
                </TableCell>
                <TableCell align="center">
                    {userForm.phoneNumber}
                </TableCell>
                <TableCell align="center">
                    {userForm.city}
                </TableCell>
                <TableCell align="center">
                    {userForm.forms.length}
                </TableCell>
                <TableCell align="center">
                    <VisibilityIcon color='success' onClick={() => setOpen(true)} />
                </TableCell>
            </TableRow>
            <DetailForm isOpen={open} onClose={() => setOpen(false)} userForm={userForm} />
        </>
    );
}
