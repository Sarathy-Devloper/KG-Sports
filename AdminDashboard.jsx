import React from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tabs,
  Tab,
  Typography,
  Modal,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  CardMedia,
  Chip, // Import Chip component
} from "@mui/material";

import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import {
  GridViewOutlined as GridViewIcon,
  DescriptionOutlined as DescriptionIcon,
  BusinessCenterOutlined as BusinessCenterIcon,
  PersonOutlineOutlined as PersonIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  GrassOutlined,
  PowerSettingsNew,
  FileUploadOutlined,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Styled Box with custom scrollbar
const StyledBox = styled(Box)({
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#272a34",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#454a58",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

// ---------------------- DARK THEME ------------------------
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e2129",
      paper: "#272a34",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
    primary: {
      main: "#6366f1",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
});

// Updated metrics to match JSX structure (title, value, change, changeType, data)
const metrics = [
  {
    title: "Users",
    value: 120,
    change: "+12%",
    changeType: "up",
    data: [
      { name: "Page A", v: 400 },
      { name: "Page B", v: 300 },
      { name: "Page C", v: 500 },
    ],
  },
  {
    title: "Bookings",
    value: 45,
    change: "-2%",
    changeType: "down",
    data: [
      { name: "Page A", v: 200 },
      { name: "Page B", v: 150 },
      { name: "Page C", v: 250 },
    ],
  },
  {
    title: "Revenue",
    value: "₹12,500",
    change: "+15%",
    changeType: "up",
    data: [
      { name: "Page A", v: 1000 },
      { name: "Page B", v: 800 },
      { name: "Page C", v: 1200 },
    ],
  },
];

const totalUsersData = [
  { name: "Jan", thisYear: 100, lastYear: 80 },
  { name: "Feb", thisYear: 200, lastYear: 150 },
  { name: "Mar", thisYear: 150, lastYear: 120 },
  { name: "Apr", thisYear: 250, lastYear: 200 },
  { name: "May", thisYear: 300, lastYear: 250 },
];

const deviceData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
];

export default function Dashboard() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [currentView, setCurrentView] = React.useState('overview'); // 'overview', 'myTurf', or 'bookings'
  const [turfs, setTurfs] = React.useState([]); // List of turfs
  const [bookings, setBookings] = React.useState([]);
  const [editingTurf, setEditingTurf] = React.useState(null); // For edit mode
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [turfToDelete, setTurfToDelete] = React.useState(null);
  const [formData, setFormData] = React.useState({
    turfName: "",
    turfLocation: "",
    turfType: "",
    turfPricing: "",
    rating: "",
    images: [],
  });

  const API_BASE = "http://localhost:5000/api/turfs";

  // Fetch turfs list
  const fetchTurfs = async () => {
    try {
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        setTurfs(data);
      } else {
        alert("Failed to fetch turfs.");
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
      alert("Error fetching turfs.");
    }
  };


  React.useEffect(() => {
    if (currentView === 'myTurf') {
      fetchTurfs();
    }
  }, [currentView]);

  // Inside your Dashboard function component
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings"); // Assuming your bookings API is at /api/bookings
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        alert("Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Error fetching bookings.");
    }
  };

  // Inside your Dashboard function component
  React.useEffect(() => {
    if (currentView === 'myTurf') {
      fetchTurfs();
    } else if (currentView === 'bookings') { // Add this condition
      fetchBookings();
    }
  }, [currentView]);

  // handle modal toggle
  const handleOpen = (turf = null) => {
    if (turf) {
      // Edit mode
      setEditingTurf(turf);
      setFormData({
        turfName: turf.turf_name,
        turfLocation: turf.turf_location,
        turfType: turf.turf_type,
        turfPricing: turf.turf_pricing,
        rating: turf.rating,
        images: [],
      });
    } else {
      // Create mode
      setEditingTurf(null);
      setFormData({
        turfName: "",
        turfLocation: "",
        turfType: "",
        turfPricing: "",
        rating: "",
        images: [],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTurf(null);
    // Fully reset form
    setFormData({
      turfName: "",
      turfLocation: "",
      turfType: "",
      turfPricing: "",
      rating: "",
      images: [],
    });
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files || []) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // submit handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length < 5 && !editingTurf) { // Only require 5 images for new turf creation
      alert("Please upload at least 5 images for a new turf.");
      return;
    }

    const submitData = new FormData();
    submitData.append("turf_name", formData.turfName);
    submitData.append("turf_type", formData.turfType);
    submitData.append("turf_pricing", formData.turfPricing);
    submitData.append("turf_location", formData.turfLocation);
    submitData.append("rating", formData.rating);
    formData.images.forEach((file) => {
      submitData.append("images", file);
    });

    try {
      let response;
      if (editingTurf) {
        // Update
        // For updates, we might only send images if new ones are selected
        // The backend should handle merging/replacing images.
        // For simplicity here, we're assuming sending new images replaces old ones.
        // You might need a more sophisticated approach on the backend.
        response = await fetch(`${API_BASE}/${editingTurf.id}`, { // Corrected URL: turf.id directly
          method: "PUT",
          body: submitData,
        });
      } else {
        // Create (backend will set status to 'pending')
        response = await fetch(API_BASE, {
          method: "POST",
          body: submitData,
        });
      }

      if (response.ok) {
        alert(editingTurf ? "Turf updated successfully!" : "Turf registered successfully! Awaiting Super Admin approval.");
        handleClose();
        if (currentView === 'myTurf') {
          fetchTurfs(); // Refetch list
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to save turf."}`);
      }
    } catch (error) {
      console.error("Error submitting turf:", error);
      alert("Error submitting turf. Please try again.");
    }
  };

  // Delete handlers
  const handleDeleteOpen = (turf) => {
    setTurfToDelete(turf);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setTurfToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!turfToDelete) return;

    try {
      const response = await fetch(`${API_BASE}/${turfToDelete.id}`, { // Corrected URL
        method: "DELETE",
      });

      if (response.ok) {
        alert("Turf deleted successfully!");
        handleDeleteClose();
        fetchTurfs(); // Refetch list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete turf."}`);
      }
    } catch (error) {
      console.error("Error deleting turf:", error);
      alert("Error deleting turf. Please try again.");
    }
  };

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

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

  // ------------------ LEFT SIDEBAR (Updated with My Turf) ------------------
  const renderLeftSidebar = () => (
    <StyledBox
      sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 2, overflowY: "auto" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <GrassOutlined sx={{ color: "#6366f1", fontSize: 32 }} />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
          KG Sports
        </Typography>
      </Box>

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              color: "#a0a0a0",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            FAVORITES
          </ListSubheader>
        }
      >
        <ListItemButton selected={currentView === 'overview'} onClick={() => setCurrentView('overview')}>
          <ListItemIcon>
            <GridViewIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </List>

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              color: "#a0a0a0",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            DASHBOARDS
          </ListSubheader>
        }
      >
        {/* Turf Register opens modal */}
        <ListItemButton onClick={() => handleOpen()}>
          <ListItemIcon>
            <FileUploadOutlined />
          </ListItemIcon>
          <ListItemText primary="Turf Register" />
        </ListItemButton>

        {/* New: My Turf - CRUD View */}
        <ListItemButton selected={currentView === 'myTurf'} onClick={() => setCurrentView('myTurf')}>
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="My Turf" />
        </ListItemButton>

        <ListItemButton selected={currentView === 'manualSlots'} onClick={() => setCurrentView('manualSlots')}>
          <ListItemIcon>
            <EditIcon /> {/* You can choose a different icon */}
          </ListItemIcon>
          <ListItemText primary="Manual Slots" />
        </ListItemButton>

      </List>



      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              color: "#a0a0a0",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            PAGES
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User Profile" onClick={() => (window.location.href = "/profile")} />
        </ListItemButton>
        <ListItemButton selected={currentView === 'bookings'} onClick={() => setCurrentView('bookings')}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItemButton>
      </List>

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              color: "#a0a0a0",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            OTHER
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary="Log Out" onClick={() => (window.location.href = "/register")} />
        </ListItemButton>
      </List>
    </StyledBox>
  );

  // ------------------ TURF REGISTER/EDIT MODAL ------------------
  const renderTurfRegisterModal = () => (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          width: 400,
          maxWidth: '90vw',
          boxShadow: 24,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>{editingTurf ? "Edit Turf" : "Register New Turf"}</Typography>
          <TextField
            label="Turf Name"
            name="turfName"
            placeholder="KG Sports"
            fullWidth
            margin="normal"
            value={formData.turfName}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Turf Type"
            name="turfType"
            placeholder="Football"
            fullWidth
            margin="normal"
            value={formData.turfType}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Turf Pricing"
            name="turfPricing"
            placeholder="800/hr"
            fullWidth
            margin="normal"
            value={formData.turfPricing}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Turf Location"
            name="turfLocation"
            placeholder="Chennai"
            fullWidth
            margin="normal"
            value={formData.turfLocation}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Rating"
            name="rating"
            placeholder="4.0"
            type="number"
            fullWidth
            margin="normal"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5, step: 0.1 }}
            required
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Images (Min 5 for new turf){editingTurf && " - New images will replace existing"}
            <input
              type="file"
              name="images"
              multiple
              hidden
              onChange={handleChange}
              accept="image/*"
            />
          </Button>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
            {formData.images.length > 0 ? `${formData.images.length} new files selected` :
              editingTurf ? "No new images selected (existing will be kept if not replaced)" : "No files selected"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {editingTurf ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );

  // ------------------ RETURN ------------------
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Left Sidebar */}
        <Box component="nav" sx={{ width: 250, flexShrink: 0, bgcolor: "background.paper" }}>
          {renderLeftSidebar()}
        </Box>

        {/* Main Content */}
        <StyledBox component="main" sx={{ flexGrow: 1, p: 3, height: "100vh", overflowY: "auto" }}>
          {currentView === 'overview' ? (
            <>
              <Typography variant="h5" gutterBottom>
                Overview
              </Typography>
              <Grid container spacing={3}>
                {metrics.map((metric, index) => ( // Added index for unique key
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* Added responsive grid item */}
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" color="text.secondary">{metric.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Box>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>{metric.value}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: metric.changeType === 'up' ? '#10b981' : '#f43f5e' }}>
                              {metric.changeType === 'up' ? <ArrowUpwardIcon sx={{ fontSize: '1rem' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1rem' }} />}
                              <Typography variant="body2" component="span" sx={{ fontWeight: 600, ml: 0.5 }}>{metric.change}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ width: 80, height: 40 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={metric.data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <Line type="monotone" dataKey="v" stroke={metric.changeType === 'up' ? '#10b981' : '#f43f5e'} strokeWidth={2} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

                {/* Total Users Chart */}
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Box>
                        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ minHeight: 'auto' }}>
                          <Tab label="Total Users" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
                          <Tab label="Total Projects" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
                          <Tab label="Operating Status" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
                        </Tabs>
                      </Box>
                      <Box sx={{ height: 300, mt: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={totalUsersData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#373a45" />
                            <XAxis dataKey="name" stroke="#a0a0a0" />
                            <YAxis stroke="#a0a0a0" />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#272a34', border: 'none' }} />
                            <Line type="monotone" dataKey="thisYear" name="This Year" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#a0a0a0" strokeWidth={2} strokeDasharray="5 5" />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Traffic by Device */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Traffic by Device</Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={deviceData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#a0a0a0" />
                            <Bar dataKey="value" fill="#6366f1" barSize={10} radius={[0, 10, 10, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Traffic by Location */}
              </Grid>
            </>
          ) : currentView === 'myTurf' ? (
            // My Turf CRUD View
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">My Turfs</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>
                  Add New Turf
                </Button>
              </Box>
              {turfs.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
                  Click "Add New Turf" to get started.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {turfs.map((turf) => (
                    <Grid item xs={12} sm={6} md={4} key={turf.id}>
                      <Card sx={{ maxWidth: 345, position: "relative" }}>

                        {/* Turf Image */}
                        {turf.images && turf.images.length > 0 ? (
                          <CardMedia
                            component="img"
                            height="180"
                            image={`http://localhost:5173/${turf.images[0]}`} // Ensure this path is correct for your setup
                            alt={turf.turf_name}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: 180,
                              backgroundColor: "grey.200",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: 'text.secondary',
                            }}
                          >
                            <Typography variant="body2" color="inherit">
                              No Image Available
                            </Typography>
                          </Box>
                        )}

                        {/* Status Chip (NEW) */}
                        {turf.status && (
                          <Chip
                            {...getStatusChipProps(turf.status)}
                            size="small"
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                          />
                        )}

                        {/* Turf Details */}
                        <CardContent>
                          <Typography variant="h6" gutterBottom>{turf.turf_name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Type: {turf.turf_type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Pricing: {turf.turf_pricing}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Location: {turf.turf_location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Rating: {turf.rating}/5
                          </Typography>

                          {/* Action Buttons */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              // Removed inline style for borderRadius, handled by theme or sx
                              onClick={() => handleOpen(turf)}
                              startIcon={<EditIcon />}
                              sx={{ flexGrow: 1, mr: 1 }} // Added flexGrow and margin for spacing
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteOpen(turf)}
                              startIcon={<DeleteIcon />}
                              sx={{ flexGrow: 1, ml: 1 }} // Added flexGrow and margin for spacing
                            >
                              Delete
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>

                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : currentView === 'bookings' ? (
            <>
              <Typography variant="h5" gutterBottom>
                All Bookings
              </Typography>
              {bookings.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
                  No bookings found.
                </Typography>
              ) : (
                <Card>
                  <CardContent>
                    <Box sx={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #373a45' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Turf Name</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Booked By</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Date</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Slot</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Game</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Email</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#a0a0a0' }}>Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} style={{ borderBottom: '1px solid #272a34' }}>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.turf_name}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.booked_by_name}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{new Date(booking.booking_date).toLocaleDateString()}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.booking_slot}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.booked_game || 'N/A'}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.booked_by_email}</td>
                              <td style={{ padding: '12px 16px', color: '#ffffff' }}>{booking.booked_by_number}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </>
          ) : null // Fallback if currentView is not recognized
          }
        </StyledBox>
      </Box>

      {/* Turf Register/Edit Modal */}
      {renderTurfRegisterModal()}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{turfToDelete?.turf_name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}