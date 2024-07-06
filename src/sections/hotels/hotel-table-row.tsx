/** @format */

import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Hotel } from "../../models";
import DetailHotel from "./detail-hotel";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

interface Prop {
	hotel: Hotel;
    handleChangeStatus: (id: string, value: string) => void;
}

export default function HotelTableRow({ hotel, handleChangeStatus }: Prop) {
	const [open, setOpen] = useState(false);
	const handleChange = (id: string, value: string) => {
        handleChangeStatus(id, value);
	};
	const getBackgroundColor = (status: any) => {
		switch (status) {
			case "Đang chờ duyệt":
				return "orange";
			case "Đang hoạt động":
				return "#00Ab84";
			case "Không duyệt":
				return "#DDD";
		}
	};

	const statusOptions = [
		{
			value: "Đang chờ duyệt",
			label: "Đang chờ duyệt",
		},
		{
			value: "Đang hoạt động",
			label: "Chấp nhận",
		},
		{
			value: "Không duyệt",
			label: "Từ chối",
		},
	];
	return (
		<>
			<TableRow
				hover
				tabIndex={-1}
			>
				<TableCell>
					<Stack
						display="flex"
						direction="row"
						alignItems="center"
						spacing={2}
						sx={{ overflow: "hidden", width: "250px" }}
					>
						<Avatar
							alt={hotel.hotelName}
							src={hotel.hotelName}
						/>
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
				<TableCell align="center">{hotel.email}</TableCell>

				<TableCell align="center">{hotel.hotline}</TableCell>

				<TableCell align="center">{hotel.city}</TableCell>

				<TableCell align="center">
					{hotel.roomIds.length === 0
						? "0"
						: hotel.rooms.reduce(
								(total, room) => total + room.quantity,
								0
						  )}
				</TableCell>

				<TableCell align="center">
					{hotel.ratingAvg
						? hotel.ratingAvg
						: "Chưa có đánh giá"
                    }
				</TableCell>

				<TableCell align="center">
					<VisibilityIcon
						color="success"
						onClick={() => setOpen(true)}
					/>
				</TableCell>

				<TableCell align="center">
					<FormControl fullWidth>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={hotel.status}
							hiddenLabel
							displayEmpty
							onChange={(e: any) => handleChange(hotel._id, e.target.value)}
							sx={{
								backgroundColor: getBackgroundColor(hotel.status),
								"&.Mui-disabled": {
									cursor: "not-allowed",
									color: "white",
								},
							}}
							renderValue={(value) => {
								if (value === "Đang chờ duyệt") {
									return "Đang chờ duyệt";
								}
								if (value === "Đang hoạt động") {
									return "Đang hoạt động";
								}
								return "Không duyệt";
							}}
						>
							{statusOptions
								.filter((status) => {
                                    if (hotel.status === "Đang chờ duyệt"){
                                        return status.value !== "Đang chờ duyệt";
                                    }
                                    if (hotel.status === "Đang hoạt động"){
                                        return status.value !== "Đang hoạt động" && status.value !== "Đang chờ duyệt";
                                    }
                                    if (hotel.status === "Không duyệt"){
                                        return status.value !== "Không duyệt" && status.value !== "Đang chờ duyệt";
                                    }
                                })
								.map((status, key) => (
									<MenuItem
										key={key}
										value={status.value}
									>
										{status.label}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</TableCell>
			</TableRow>
			<DetailHotel
				isOpen={open}
				onClose={() => setOpen(false)}
				hotel={hotel}
			/>
		</>
	);
}
