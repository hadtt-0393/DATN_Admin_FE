import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, link, color = 'primary', sx, ...other }: any) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>

        <Box display="flex" flexDirection="row" alignItems="center" gap={25}>
          <Typography variant="h4">{total}</Typography>
          {link && <Link to={link} style={{ textDecoration: "none", color: "black", fontStyle: "italic" }}>
            Xem chi tiết
          </Link>}
        </Box>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
