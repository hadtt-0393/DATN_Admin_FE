/** @format */

import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import HotelTableToolbar from "./hotel-table-toolbar";
import Scrollbar from "../../components/scrollbar";
import { emptyRows, applyFilter, getComparator } from "./utils";
import HotelTableRow from "./hotel-table-row";
import TableEmptyRows from "./table-empty-rows";
import TableNoData from "./table-no-data";
import HotelTableHead from "./hotel-table-head";
import { Hotel } from "../../models";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from "../../api/axios";

// ----------------------------------------------------------------------

export default function HotelPage() {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);

	const handleSort = (event: any, id: any) => {
		const isAsc = orderBy === id && order === "asc";
		if (id !== "") {
			setOrder(isAsc ? "desc" : "asc");
			setOrderBy(id);
		}
	};

	useEffect(() => {
		const fetchAllHotel = async () => {
            setLoading(true);
			const listHotel = await axiosInstance.get("/hotel/getAllHotel");
			setHotels(listHotel.data);
            setLoading(false);
		};
		fetchAllHotel();
	}, []);

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

	const handleChangeStatus = (id: string, value: string) => {
        setLoading(true);
		const changeStatusHotel = async () => {
		    const res = await axiosInstance.put("/hotel/update-status-hotel", {
                id,
                status: value,
            });
            reFetch();
            setLoading(false);
		}
		const timer = setTimeout(changeStatusHotel, 1000);
		return () => clearTimeout(timer);
	};

    const reFetch = () => {
        const fetchAllHotel = async () => {
            const listHotel = await axiosInstance.get("/hotel/getAllHotel");
            setHotels(listHotel.data);
        };
        fetchAllHotel();
    }

	return (
		<Container maxWidth="xl">
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				mb={5}
			>
				<Typography variant="h4">Danh sách khách sạn</Typography>
			</Stack>
			{loading ? (
				<Backdrop
					sx={{
						color: "#fff",
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={loading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<Card>
					<HotelTableToolbar
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ overflow: "unset" }}>
							<Table sx={{ minWidth: 800 }}>
								<HotelTableHead
									order={order}
									orderBy={orderBy}
									onRequestSort={handleSort}
									headLabel={[
										{ id: "name", label: "Tên khách sạn" },
										{ id: "email", label: "Email" },
										{ id: "phone", label: "Số điện thoại" },
										{ id: "city", label: "Thành phố" },
										{
											id: "rooms",
											label: "Số lượng phòng",
										},
										{
											id: "ratingAvg",
											label: "Đánh giá trung bình",
										},
										{ id: "actions", label: "Hành động" },
										{ id: "status", label: "Trạng thái" },
									]}
								/>
								<TableBody>
									{dataFiltered
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((hotel: Hotel) => (
											<HotelTableRow
												key={hotel._id}
												hotel={hotel}
												handleChangeStatus={
													handleChangeStatus
												}
											/>
										))}

									<TableEmptyRows
										height={77}
										emptyRows={emptyRows(
											page,
											rowsPerPage,
											hotels.length
										)}
									/>

									{notFound && (
										<TableNoData query={filterName} />
									)}
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
						labelRowsPerPage="Số hàng trên trang"
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} trong ${count}`
						}
					/>
				</Card>
			)}
		</Container>
	);
}
