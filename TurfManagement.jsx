import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardActions, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Snackbar, Alert, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // For API calls

const DashboardCard = (props) => (
  <Card
    elevation={0}
    sx={{
      p: 2, // Adjusted padding for card content
      height: '100%',
      borderRadius: '16px',
      bgcolor: '#1e293b',
      color: '#e2e8f0',
      border: '1px solid #334155'
    }}
    {...props}
  />
);

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const TurfManagement = () => {
  const [turfs, setTurfs] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentTurf, setCurrentTurf] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const API_BASE_URL = 'http://localhost:5000/api/turfs'; // Assuming your turfRouter is mounted at /api/turfs

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTurfs(response.data);
    } catch (error) {
      console.error('Error fetching turfs:', error);
      setSnackbar({ open: true, message: 'Failed to fetch turfs', severity: 'error' });
    }
  };

  const handleEditClick = (turf) => {
    setCurrentTurf({ ...turf, images: null }); // Don't pre-fill images for simplicity of edit form
    setOpenEditDialog(true);
  };

  const handleDeleteClick = async (turfId) => {
    if (window.confirm('Are you sure you want to delete this turf?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${turfId}`);
        setSnackbar({ open: true, message: 'Turf deleted successfully!', severity: 'success' });
        fetchTurfs(); // Refresh the list
      } catch (error) {
        console.error('Error deleting turf:', error);
        setSnackbar({ open: true, message: 'Failed to delete turf.', severity: 'error' });
      }
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCurrentTurf(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setCurrentTurf({ ...currentTurf, images: files });
    } else {
      setCurrentTurf({ ...currentTurf, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentTurf) return;

    try {
      const formData = new FormData();
      formData.append('turf_name', currentTurf.turf_name);
      formData.append('turf_type', currentTurf.turf_type);
      formData.append('turf_pricing', currentTurf.turf_pricing);
      formData.append('turf_location', currentTurf.turf_location);
      formData.append('rating', currentTurf.rating);

      // Append new images if selected
      if (currentTurf.images && currentTurf.images.length > 0) {
        for (let i = 0; i < currentTurf.images.length; i++) {
          formData.append('images', currentTurf.images[i]);
        }
      }

      await axios.put(`${API_BASE_URL}/${currentTurf.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnackbar({ open: true, message: 'Turf updated successfully!', severity: 'success' });
      fetchTurfs(); // Refresh the list
      handleEditDialogClose();
    } catch (error) {
      console.error('Error updating turf:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update turf.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 2, mb: 4 }}>
        Turf Management
      </Typography>

      <Grid container spacing={4}>
        {turfs.map((turf) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={turf.id}>
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{turf.turf_name}</Typography>
                  <Typography variant="body2" color="#94a3b8">Type: {turf.turf_type}</Typography>
                  <Typography variant="body2" color="#94a3b8">Pricing: ₹{turf.turf_pricing}/hour</Typography>
                  <Typography variant="body2" color="#94a3b8">Location: {turf.turf_location}</Typography>
                  <Typography variant="body2" color="#94a3b8">Rating: {turf.rating}</Typography>
                  {turf.images && turf.images.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', overflowX: 'auto', gap: 1 }}>
                      {turf.images.map((imagePath, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000/${imagePath}`} // Assuming 'uploads/' is served statically from your backend
                          alt={`Turf image ${idx + 1}`}
                          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ color: '#8884d8' }}
                    onClick={() => handleEditClick(turf)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ color: '#ef4444' }}
                    onClick={() => handleDeleteClick(turf.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </DashboardCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Edit Turf Dialog */}
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
          Edit Turf
          <IconButton onClick={handleEditDialogClose} sx={{ color: '#94a3b8' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderBottom: '1px solid #334155' }}>
          {currentTurf && (
            <Box component="form" onSubmit={handleEditSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Turf Name"
                name="turf_name"
                value={currentTurf.turf_name || ''}
                onChange={handleEditFormChange}
                fullWidth
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { color: '#e2e8f0' } }}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' } }}
              />
              <TextField
                label="Turf Type"
                name="turf_type"
                value={currentTurf.turf_type || ''}
                onChange={handleEditFormChange}
                fullWidth
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { color: '#e2e8f0' } }}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' } }}
              />
              <TextField
                label="Turf Pricing"
                name="turf_pricing"
                value={currentTurf.turf_pricing || ''}
                onChange={handleEditFormChange}
                type="number"
                fullWidth
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { color: '#e2e8f0' } }}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' } }}
              />
              <TextField
                label="Turf Location"
                name="turf_location"
                value={currentTurf.turf_location || ''}
                onChange={handleEditFormChange}
                fullWidth
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { color: '#e2e8f0' } }}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' } }}
              />
              <TextField
                label="Rating"
                name="rating"
                value={currentTurf.rating || ''}
                onChange={handleEditFormChange}
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                fullWidth
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { color: '#e2e8f0' } }}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#334155' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#475569' } }}
              />
              <input
                type="file"
                name="images"
                multiple
                onChange={handleEditFormChange}
                style={{ color: '#e2e8f0', border: '1px solid #334155', borderRadius: '8px', padding: '10px' }}
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
  );
};

export default TurfManagement;