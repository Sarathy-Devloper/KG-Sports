import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Snackbar, Alert, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { List, ListItem, ListItemIcon } from '@mui/material';

// --- Reusable Styled Card ---
const DashboardPaper = (props) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: '16px',
      bgcolor: '#1e293b',
      color: '#e2e8f0',
      border: '1px solid #334155',
      overflowX: 'auto'
    }}
    {...props}
  />
);

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- Left Sidebar Component (Copied from SuperAdminDashboard for consistency) ---
const Sidebar = () => {
  const navigate = useNavigate();

  const handleIconClick = (route) => {
    navigate(route);
  };

  const menuItems = [
    { icon: HomeIcon, route: '/superAdmin' }, // Main Dashboard
    { icon: DashboardIcon, route: '/turfManagement' }, // Turf Management
    { icon: PeopleIcon, route: '/userManagement' },   // User Management
    { icon: PowerSettingsNewIcon, route: '/register' }, // Logout - Adjust this route as needed for your actual logout page
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
            component="button" // FIX: Changed 'button' prop to 'component="button"'
            key={index}
            onClick={() => handleIconClick(item.route)}
            sx={{
              my: 1,
              display: 'flex',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: item.icon === PowerSettingsNewIcon ? '#475569' : 'transparent'
              },
              // Add these styles to make the ListItem behave more like a button visually
              width: '100%',
              borderRadius: '8px',
              padding: '8px 0',
              border: 'none', // Remove default button border
              background: 'none', // Remove default button background
              cursor: 'pointer',
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


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please log in to view users.', severity: 'error' });
      navigate('/userManagement'); // Redirect to login, not userManagement itself
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch users. Access denied or server error.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      // If error is 401 or 403, redirect to login
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/userManagement'); // Redirect to login
      }
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const token = localStorage.getItem('token');
      if (!token) {
        setSnackbar({ open: true, message: 'Authentication required for this action.', severity: 'error' });
        navigate('/userManagement'); // Redirect to login
        return;
      }
      try {
        await axios.delete(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        const errorMessage = error.response?.data?.message || 'Failed to delete user.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbar({ open: true, message: 'Authentication required for this action.', severity: 'error' });
      navigate('/userManagement'); // Redirect to login
      return;
    }

    try {
      // Assuming your backend expects a specific ID field, adjust if necessary (e.g., _id vs id)
      await axios.put(`${API_BASE_URL}/users/${currentUser.id}`, currentUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
      fetchUsers();
      handleEditDialogClose();
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, ml: '80px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 2, mb: 4 }}>
          User Management
        </Typography>

        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <DashboardPaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-root': { color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #334155' } }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id} sx={{ '& .MuiTableCell-root': { color: '#e2e8f0', borderBottom: '1px solid #334155' } }}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile || 'N/A'}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell align="right">
                          <IconButton color="info" size="small" onClick={() => handleEditClick(user)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" size="small" onClick={() => handleDeleteClick(user.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#94a3b8' }}>
                        No users found or failed to load users.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardPaper>
        </motion.div>

        {/* Edit User Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          PaperProps={{
            sx: {
              bgcolor: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid #334155',
              borderRadius: '16px'
            }
          }}
        >
          <DialogTitle sx={{ borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Edit User
            <IconButton onClick={handleEditDialogClose} sx={{ color: '#94a3b8' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ borderBottom: '1px solid #334155' }}>
            {currentUser && (
              <Box component="form" onSubmit={handleEditSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                <TextField
                  label="Name"
                  name="name"
                  value={currentUser.name || ''}
                  onChange={handleEditFormChange}
                  fullWidth
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{ sx: { color: '#e2e8f0' } }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' },
                    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#8884d8' }, // Focus color
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={currentUser.email || ''}
                  onChange={handleEditFormChange}
                  fullWidth
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{ sx: { color: '#e2e8f0' } }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' },
                    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#8884d8' },
                  }}
                />
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={currentUser.mobile || ''}
                  onChange={handleEditFormChange}
                  fullWidth
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{ sx: { color: '#e2e8f0' } }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' },
                    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#8884d8' },
                  }}
                />
                <TextField
                  label="Role"
                  name="role"
                  value={currentUser.role || ''}
                  onChange={handleEditFormChange}
                  fullWidth
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{ sx: { color: '#e2e8f0' } }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' },
                    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#8884d8' },
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid #334155', pt: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleEditDialogClose} sx={{ color: '#94a3b8' }}>Cancel</Button>
            <Button onClick={handleEditSubmit} sx={{ bgcolor: '#8884d8', color: '#fff', '&:hover': { bgcolor: '#7a76c7' } }}>Save Changes</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default UserManagement;