import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard'; // For Turf Management
import PeopleIcon from '@mui/icons-material/People';     // For User Management
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Edit } from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleIconClick = (route) => {
    navigate(route);
  };

  const menuItems = [
    { icon: HomeIcon, route: '/superAdmin' }, // Main Dashboard
    { icon: DashboardIcon, route: '/superAdmin/turfs' }, // Turf Management
    { icon: PeopleIcon, route: '/superAdmin/users' },   // User Management
    { icon: PowerSettingsNewIcon, route: '/register' }, // Logout
    { icon: Edit, route: '/superAdmin/manual-slots' }, // NEW: Manual Slots Management
  ];

  return (
    <Box
      sx={{
        width: 80,
        height: '100vh',
        bgcolor: '#1e293b',
        borderRight: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        position: 'fixed',
        cursor: 'pointer'
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleIconClick(item.route)}
            sx={{
              my: 1,
              display: 'flex',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: item.icon === PowerSettingsNewIcon ? '#475569' : 'transparent'
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <item.icon sx={{ color: item.icon === PowerSettingsNewIcon ? '#ef4444' : '#94a3b8' }} />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;