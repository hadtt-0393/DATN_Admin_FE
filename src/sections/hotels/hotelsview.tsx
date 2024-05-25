import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { hotels } from '../../mock/hotels';
import HotelTableToolbar from './hotel-table-toolbar';
import Scrollbar from '../../components/scrollbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import HotelTableRow from './hotel-table-row';
import TableEmptyRows from './table-empty-rows';
import TableNoData from './table-no-data';
import HotelTableHead from './hotel-table-head';
import { AlignHorizontalCenter } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function HotelPage() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (event: any, id: any) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };


    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event: any) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: hotels,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container maxWidth='xl'>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Danh sách khách sạn</Typography>
            </Stack>

            <Card>
                <HotelTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <HotelTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: 'name', label: 'Tên khách sạn' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'phone', label: 'Số điện thoại' },
                                    { id: 'city', label: 'Thành phố', },
                                    { id: 'rooms', label: 'Số lượng phòng', },
                                    { id: 'ratingAvg', label: 'Đánh giá trung bình' },
                                    { id: 'actions', label: 'Hành động' },
                                    { id: 'status', label: 'Trạng thái'}
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any) => (
                                        <HotelTableRow
                                            key={row.id}
                                            avatarUrl={row.avatarUrl}
                                            name={row.name}
                                            email={row.email}
                                            phone={row.phone}
                                            city={row.city}
                                            rooms={row.rooms}
                                            ratingAvg={row.ratingAvg}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, hotels.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={hotels.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
