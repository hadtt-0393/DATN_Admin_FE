import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <AutoGraphOutlinedIcon />,
  },
  {
    title: 'Quản lý khách sạn',
    path: '/hotels',
    icon: <MeetingRoomIcon />,
  },
  {
    title: 'Quản lý người dùng ',
    path: '/users',
    icon: <ContactEmergencyIcon />,
  },
  {
    title: 'Quản lý đặt phòng',
    path: '/forms',
    icon: <ContactEmergencyIcon />,
  },

];

export default navConfig;
