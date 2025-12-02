import React from 'react'; // Import React
// ... other imports
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Box, Typography, Paper, TextField, InputAdornment, IconButton, Avatar, Badge, List, ListItem, ListItemIcon, Button, CardMedia, Card, CardContent, Grid, Chip, ListItemButton } from '@mui/material';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'; // Added Legend
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For accept
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; // For decline
import ManualSlotManagement from './manualSlotManagement';
import { Edit } from '@mui/icons-material';


// --- Reusable Styled Card ---
const DashboardCard = (props) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      height: '100%',
      borderRadius: '16px',
      bgcolor: '#1e293b',
      color: '#e2e8f0',
      border: '1px solid #334155'
    }}
    {...props}
  />
);

// --- Framer Motion Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// Helper to get Chip color based on status
const getStatusChipProps = (status) => {
  switch (status) {
    case 'accepted':
      return { label: 'Accepted', color: 'success', variant: 'outlined' };
    case 'declined':
      return { label: 'Declined', color: 'error', variant: 'outlined' };
    case 'pending':
    default:
      return { label: 'Pending', color: 'warning', variant: 'outlined' };
  }
};


// --- Left Sidebar Component (Updated) ---
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get current path for highlighting

  const handleIconClick = (route) => {
    navigate(route);
  };

  const menuItems = [
    { icon: HomeIcon, route: '/superAdmin' }, // Main Dashboard
    { icon: DashboardIcon, route: '/turfManagement' }, // Turf Management (Changed route for consistency)
    { icon: PeopleIcon, route: '/userManagement' },   // User Management
    { icon: PowerSettingsNewIcon, route: '/register' }, // Logout
    { icon: Edit, route: '/manual-slots' }, // NEW: Manual Slots
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
          <ListItemButton
            key={index}
            onClick={() => handleIconClick(item.route)}
            sx={{
              my: 1,
              display: 'flex',
              justifyContent: 'center',
              bgcolor: location.pathname === item.route ? '#334155' : 'transparent',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: item.icon === PowerSettingsNewIcon ? '#475569' : '#334155'
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <item.icon sx={{ color: item.icon === PowerSettingsNewIcon ? '#ef4444' : '#94a3b8' }} />
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

// --- Top Header Component ---
const Header = () => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <TextField
      variant="outlined"
      placeholder="Search here..."
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          backgroundColor: '#1e293b',
          borderColor: '#334155',
          color: '#e2e8f0',
          '& fieldset': { borderColor: '#334155' },
          '&:hover fieldset': { borderColor: '#475569' },
          '&.Mui-focused fieldset': { borderColor: '#8884d8' },
        },
        '& .MuiInputBase-input': { color: '#e2e8f0' },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#94a3b8' }} />
          </InputAdornment>
        ),
      }}
    />
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconButton sx={{ color: '#94a3b8' }}>
        <Badge badgeContent={3} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton sx={{ color: '#94a3b8' }}>
        <SettingsIcon />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar alt="Zara Wardani" src="/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Super Admin</Typography>
          <Typography variant="caption" color="#94a3b8">Admin</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

// --- Stat Card Component ---
const StatCard = ({ title, value }) => (
  <DashboardCard>
    <Typography variant="body2" color="#94a3b8">{title}</Typography>
    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
  </DashboardCard>
);

// --- Visitors Chart Component ---
const VisitorsChart = () => {
  const data = [{ uv: 400 }, { uv: 300 }, { uv: 500 }, { uv: 450 }, { uv: 600 }, { uv: 500 }, { uv: 700 }];
  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="body2" color="#94a3b8">Total Users</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>4,375</Typography>
        </div>
        <Box sx={{ width: '120px', height: '50px' }}>
          <ResponsiveContainer><AreaChart data={data}><Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} itemStyle={{ color: '#e2e8f0' }} /><Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" strokeWidth={2} /></AreaChart></ResponsiveContainer>
        </Box>
      </Box>
    </DashboardCard>
  );
};

// --- Monthly Growth Chart Component ---
const MonthlyGrowthChart = () => {
  const data = [{ n: 'Jan', v: 12 }, { n: 'Feb', v: 19 }, { n: 'Mar', v: 15 }, { n: 'Apr', v: 25 }, { n: 'May', v: 22 }, { n: 'Jun', v: 35 }, { n: 'Jul', v: 28 }, { n: 'Aug', v: 18 }, { n: 'Sep', v: 24 }, { n: 'Oct', v: 20 }, { n: 'Nov', v: 30 }, { n: 'Dec', v: 26 }];
  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <div>
          <Typography variant="body2" color="#94a3b8">Total Customers</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>345,678</Typography>
        </div>
        <div>
          <Typography variant="body2" color="#94a3b8">New User</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>49</Typography>
        </div>
        <div>
          <Typography variant="body2" color="#94a3b8">Growth</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#10b981' }}>+10%</Typography>
        </div>
      </Box>
      <Box sx={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <XAxis dataKey="n" tickLine={false} axisLine={false} stroke="#94a3b8" />
            <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
            <Tooltip cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} contentStyle={{ backgroundColor: '#334155', border: 'none' }} />
            <Bar dataKey="v" radius={[10, 10, 0, 0]}>{data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.n === 'Jun' ? '#8884d8' : '#334155'} />))}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </DashboardCard>
  );
};

// --- User Profile Donut Chart Component ---
const UserProfileChart = () => {
  const data = [{ name: 'Male', value: 55 }, { name: 'Female', value: 45 }];
  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
  return (
    <DashboardCard>
      <Typography variant="h6">User Profile</Typography>
      <Box sx={{ height: 180, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
            </Pie>
            <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingBottom: '10px' }}
              formatter={(value, entry, index) => <span style={{ color: '#e2e8f0' }}>{entry.payload.name} ({entry.payload.value}%)</span>} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </DashboardCard>
  );
};

// --- Weekly Statistic Line Chart Component ---
const WeeklyStatisticChart = () => {
  const data = [{ n: '0', uv: 30, pv: 20 }, { n: '20', uv: 40, pv: 50 }, { n: '40', uv: 35, pv: 30 }, { n: '60', uv: 60, pv: 70 }, { n: '80', uv: 50, pv: 60 }, { n: '100', uv: 75, pv: 65 }, { n: '120', uv: 60, pv: 80 }];
  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <Typography variant="h6">Statistic</Typography>
        </div>
        <div>
          <Typography variant="body2" sx={{ color: '#10b981' }}>This Week: +20%</Typography>
          <Typography variant="body2" color="#94a3b8">Last Week: +13%</Typography>
        </div>
      </Box>
      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
            <XAxis dataKey="n" stroke="#94a3b8" axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} />
            <Line type="monotone" dataKey="pv" stroke="#FFBB28" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </DashboardCard>
  );
};

// --- Turf Management Component (NEW) ---
const TurfManagement = () => {
  const [pendingTurfs, setPendingTurfs] = React.useState([]);
  const [approvedTurfs, setApprovedTurfs] = React.useState([]);

  const API_BASE = "http://localhost:5000/api/turfs";
  const SUPER_ADMIN_API_BASE = "http://localhost:5000/api/superadmin/turfs"; // Adjust as per your backend

  const fetchTurfs = async () => {
    try {
      // Fetch all turfs, then filter them by status
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        setPendingTurfs(data.filter(turf => turf.status === 'pending'));
        setApprovedTurfs(data.filter(turf => turf.status === 'accepted'));
      } else {
        alert("Failed to fetch turfs.");
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
      alert("Error fetching turfs.");
    }
  };

  React.useEffect(() => {
    fetchTurfs();
  }, []);

  const updateTurfStatus = async (turfId, status) => {
    try {
      const response = await fetch(`${SUPER_ADMIN_API_BASE}/${turfId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Turf ${status} successfully!`);
        fetchTurfs(); // Re-fetch to update lists
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || `Failed to ${status} turf.`}`);
      }
    } catch (error) {
      console.error(`Error updating turf status to ${status}:`, error);
      alert("Error updating turf status. Please try again.");
    }
  };

  const handleAccept = (turfId) => {
    updateTurfStatus(turfId, 'accepted');
  };

  const handleDecline = (turfId) => {
    updateTurfStatus(turfId, 'declined');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
          Turf Management
        </Typography>
      </motion.div>

      {/* Pending Turfs Section */}
      <motion.div variants={itemVariants}>
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Turfs Awaiting Approval</Typography>
        {pendingTurfs.length === 0 ? (
          <Typography variant="body1" color="text.secondary">No turfs currently pending approval.</Typography>
        ) : (
          <Grid container spacing={3}>
            {pendingTurfs.map((turf) => (
              <Grid item xs={12} sm={6} md={4} key={turf.id}>
                <Card sx={{ maxWidth: 345, position: "relative" }}>
                  {turf.images && turf.images.length > 0 ? (
                    <CardMedia
                      component="img"
                      height="180"
                      image={`http://localhost:5173/${turf.images[0]}`}
                      alt={turf.turf_name}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <Box sx={{ height: 180, backgroundColor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center", color: 'text.secondary' }}>
                      <Typography variant="body2" color="inherit">No Image Available</Typography>
                    </Box>
                  )}
                  {turf.status && (
                    <Chip
                      {...getStatusChipProps(turf.status)}
                      size="small"
                      sx={{ position: 'absolute', top: 10, right: 10 }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{turf.turf_name}</Typography>
                    <Typography variant="body2" color="text.secondary">Type: {turf.turf_type}</Typography>
                    <Typography variant="body2" color="text.secondary">Pricing: {turf.turf_pricing}</Typography>
                    <Typography variant="body2" color="text.secondary">Location: {turf.turf_location}</Typography>
                    <Typography variant="body2" color="text.secondary">Rating: {turf.rating}/5</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => handleAccept(turf.id)}
                        sx={{ flexGrow: 1, mr: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={() => handleDecline(turf.id)}
                        sx={{ flexGrow: 1, ml: 1 }}
                      >
                        Decline
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>

      {/* Approved Turfs Section */}
      <motion.div variants={itemVariants}>
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>Approved Turfs</Typography>
        {approvedTurfs.length === 0 ? (
          <Typography variant="body1" color="text.secondary">No turfs have been approved yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {approvedTurfs.map((turf) => (
              <Grid item xs={12} sm={6} md={4} key={turf.id}>
                <Card sx={{ maxWidth: 345, position: "relative" }}>
                  {turf.images && turf.images.length > 0 ? (
                    <CardMedia
                      component="img"
                      height="180"
                      image={`http://localhost:5173/${turf.images[0]}`}
                      alt={turf.turf_name}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <Box sx={{ height: 180, backgroundColor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center", color: 'text.secondary' }}>
                      <Typography variant="body2" color="inherit">No Image Available</Typography>
                    </Box>
                  )}
                  {turf.status && (
                    <Chip
                      {...getStatusChipProps(turf.status)}
                      size="small"
                      sx={{ position: 'absolute', top: 10, right: 10 }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{turf.turf_name}</Typography>
                    <Typography variant="body2" color="text.secondary">Type: {turf.turf_type}</Typography>
                    <Typography variant="body2" color="text.secondary">Pricing: {turf.turf_pricing}</Typography>
                    <Typography variant="body2" color="text.secondary">Location: {turf.turf_location}</Typography>
                    <Typography variant="body2" color="text.secondary">Rating: {turf.rating}/5</Typography>
                    {/* Optionally, you can add an option to "Decline" or "Remove" approved turfs here */}
                    {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleDecline(turf.id)}>Remove</Button>
                    </Box> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </motion.div>
  );
};


// --- Main Dashboard Component ---
const AnalyticsDashboard = () => {
  const location = useLocation(); // Hook to get the current URL path

  const renderContent = () => {
    if (location.pathname === '/superAdmin/turfManagement') {
      return <TurfManagement />;
    }
    if (location.pathname === '/superAdmin/manualSlots') {
      return <ManualSlotManagement isAdminDashboard={false} />; // Super Admin manages all turfs, so no specific turfId prop here

    }
    // Default to the main overview dashboard
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <div className="row">
          <motion.div className="col-12" variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
              Overview
            </Typography>
          </motion.div>
        </div>

        <div className="row g-4">
          <motion.div className="col-xl-2 col-md-4 col-sm-6" variants={itemVariants}><StatCard title="Total Turfs" value="32" /></motion.div>
          <motion.div className="col-xl-2 col-md-4 col-sm-6" variants={itemVariants}><StatCard title="Pending" value="28" /></motion.div>
          <motion.div className="col-xl-2 col-md-4 col-sm-6" variants={itemVariants}><StatCard title="Bookings" value="100" /></motion.div>
          <motion.div className="col-xl-2 col-md-4 col-sm-6" variants={itemVariants}><StatCard title="Un registered" value="18" /></motion.div>
          <motion.div className="col-xl-4 col-md-8 col-sm-12" variants={itemVariants}><VisitorsChart /></motion.div>
        </div>

        <div className="row mt-4">
          <motion.div className="col-12" variants={itemVariants}><MonthlyGrowthChart /></motion.div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-xl-8">
            <div className="row g-4">
              <motion.div className="col-lg-5 col-md-6" variants={itemVariants}><UserProfileChart /></motion.div>
              <motion.div className="col-lg-7 col-md-6" variants={itemVariants}><WeeklyStatisticChart /></motion.div>
            </div>
          </div>
          <div className="col-xl-4">
            {/* You can add more cards/charts here for the main dashboard */}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#0f172a', color: '#e2e8f0' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '80px' }}> {/* Margin left for fixed sidebar */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Header />
            </div>
          </div>
          {renderContent()}
        </div>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;