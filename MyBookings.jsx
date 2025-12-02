import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MyBookings.css';
import logo from '../assets/logo.png';
import BookingDetailsModal from './BookingDetailsModal.jsx'; // Adjust path as needed
import ProfileButton from '../components/ProfileButton'; // Import the new component


// Import a library for displaying notifications (e.g., react-toastify)
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('Upcoming');

  // State for the action menu
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null); // Ref for detecting clicks outside the menu

  // State for Edit/Cancel Modals (you'll implement these later)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // To store booking being edited/cancelled

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();

    // Event listener for clicks outside the action menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null); // Close menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const sortedBookings = data.sort((a, b) => {
        const dateA = new Date(`${a.booking_date} ${a.booking_slot.split('-')[0]}`);
        const dateB = new Date(`${b.booking_date} ${b.booking_slot.split('-')[0]}`);
        return dateA - dateB;
      });
      setBookings(sortedBookings);
    } catch (err) {
      setError(err.message);
      // toast.error(`Failed to fetch bookings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getBookingStatus = (bookingDate, bookingSlot, isCancelled) => {
    if (isCancelled) return 'Cancelled'; // Check cancelled status first

    const [startTimeStr, endTimeStr] = bookingSlot.split('-');
    // Assuming bookingDate format is "Mon, Jul 10" and we need current year
    const currentYear = new Date().getFullYear();
    const datePart = bookingDate.substring(bookingDate.indexOf(',') + 2); // "Jul 10"
    const bookingDateTime = new Date(`${datePart} ${currentYear} ${startTimeStr}`);
    const now = new Date();

    if (bookingDateTime > now) {
      return 'Upcoming';
    } else {
      return 'Completed';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const status = getBookingStatus(booking.booking_date, booking.booking_slot, booking.is_cancelled);
    if (filterStatus === 'Completed') return status === 'Completed';
    if (filterStatus === 'On Going') return false; // Needs more complex logic, possibly backend support
    if (filterStatus === 'Cancelled') return status === 'Cancelled';
    return true; // For 'All' or no specific filter
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- Action Menu Functions ---
  const toggleActionMenu = (bookingId) => {
    setActiveMenuId(activeMenuId === bookingId ? null : bookingId);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
    setActiveMenuId(null); // Close the menu
    // Here you would open a modal or navigate to an edit page
    console.log('Editing booking:', booking.id);
    // For now, let's just log and you'll integrate a modal later
    alert(`Edit Booking ID: ${booking.id}. (Modal/Page not implemented yet)`);
  };

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setIsCancelConfirmOpen(true); // Open confirmation modal
    setActiveMenuId(null); // Close the menu
    console.log('Cancelling booking:', booking.id);
  };

  const confirmCancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${selectedBooking.id}/cancel`, {
        method: 'PATCH', // Or PUT, depending on your API design for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed if just updating a status flag
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the local state to reflect the cancellation
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b.id === selectedBooking.id ? { ...b, is_cancelled: true } : b
        )
      );
      // toast.success('Booking cancelled successfully!');
      alert('Booking cancelled successfully!');
      setIsCancelConfirmOpen(false);
      setSelectedBooking(null);
      // Re-fetch bookings to ensure data consistency, or update local state more robustly
      fetchBookings();

    } catch (err) {
      console.error('Error cancelling booking:', err);
      // toast.error(`Failed to cancel booking: ${err.message}`);
      alert(`Failed to cancel booking: ${err.message}`);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm(`Are you sure you want to delete booking ID: ${bookingId}? This cannot be undone.`)) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the booking from the local state
      setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
      // toast.success('Booking deleted successfully!');
      alert('Booking deleted successfully!');
      setActiveMenuId(null); // Close the menu
    } catch (err) {
      console.error('Error deleting booking:', err);
      // toast.error(`Failed to delete booking: ${err.message}`);
      alert(`Failed to delete booking: ${err.message}`);
    }
  };

  // NEW FUNCTION to handle showing details
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking); // Set the booking to be displayed
    setIsDetailsModalOpen(true); // Open the details modal
  };

  if (loading) return <div className="my-bookings-container">Loading bookings...</div>;
  if (error) return <div className="my-bookings-container">Error: {error}</div>;

  return (
    <div className="my-bookings-page-wrapper">
      {/* <ToastContainer /> */} {/* Add this if using react-toastify */}
      <div className="dashboard-content-area">
        <motion.nav
          id="navbar"
          className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 top-0 start-0"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ zIndex: 100 }}
        >
      {/* ======= Navbar ======= */}
      <motion.nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 top-0 start-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ zIndex: 100 }}
      >
        <div className="container" style={{ alignItems: "start" }}>
          <a className="navbar-brand fw-bold text-success" href="/dashboard">
            <img
              className="main-logo"
              src={logo}
              style={{ height: "100px", marginTop: "-15px" }}
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button btn-bg-light"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mt-0 me-1">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to={"/dashboard"}  style={{textDecoration:'none', color:'green'}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to={"/aboutUs"} style={{textDecoration:'none', color:'green'}}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to={"/sports"}  style={{textDecoration:'none', color:'green'}} >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to={"/trainers"}  style={{textDecoration:'none', color:'green'}} >
                  Trainers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bolder"
                  style={{ letterSpacing: "1px", textDecoration:'none', color:'green' }}
                  to={"/tournaments"}
                >
                  Tournaments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to={"/news"}  style={{textDecoration:'none', color:'green !important'}} >
                  News
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto gap-3">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto mt-0 gap-3 me-1 ">
                  <li className="nav-item dropdown">
                    {" "}
                    {/* Added dropdown class here */}
                    {<Link
                      className="text-light fw-bolder btn btn-success dropdown-toggle" // Added dropdown-toggle
                      style={{borderRadius:'25px', padding:'8px', textDecoration:'none',}}
                      to={"/turfs"}
                      id="bookTurfDropdown" // Unique ID for the dropdown
                      role="button"
                      data-bs-toggle="dropdown" // Enables dropdown functionality
                      aria-expanded="false"
                    >
                      Book a Turf
                    </Link>}
                    <ul
                      className="dropdown-menu dropdown-menu-dark" // Added dropdown-menu-dark for better contrast
                      aria-labelledby="bookTurfDropdown"
                      style={{ backgroundColor: "rgba(0,0,0,0.7)" }} // Optional: for a semi-transparent dark background
                    >
                      <li>
                        <Link className="dropdown-item text-light" to={"/turfs"}>
                          View All Turfs
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-light" to={"/my-bookings"}>
                          My Bookings
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <ProfileButton />
            </div>
          </div>
        </div>
      </motion.nav>
        </motion.nav>

        <div className="my-bookings-main-panel">

          <div className="booking-management-card mt-5">
            <div className="card-header">
              <h2 className="card-title">My Bookings</h2>
              <p className="card-subtitle">Manage and track all your upcoming court bookings.</p>
            </div>

            <div className="booking-filters">
              <div className="status-tabs">
                {['Completed', 'On Going', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    className={filterStatus === status ? 'active' : ''}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="right-filters">
                <select className="dropdown">
                  <option>This Week</option>
                  {/* Add other time filter options */}
                </select>
                <select className="dropdown">
                  <option>Relevance</option>
                  {/* Add other sort options */}
                </select>
                <input type="text" placeholder="Search" className="search-input" />
                <button className="button-primary">Courts</button>
                <button className="button-secondary">Coach</button>
              </div>
            </div>

            <div className="bookings-table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Court Name</th>
                    <th>Date & Time</th>
                    <th>Slot</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((booking) => (
                      <tr key={booking.id}>
                        <td className="court-name-cell">
                          <div className="court-info">
                            <span>{booking.turf_name}</span>
                          </div>
                        </td>
                        <td>{booking.booking_date}</td>
                        <td>{booking.booking_slot}</td>
                        <td> {booking.payment_amount || 'N/A'}</td>
                        <td>
                          <span className={`status-badge ${getBookingStatus(booking.booking_date, booking.booking_slot, booking.is_cancelled).toLowerCase().replace(' ', '-')}`}>
                            {getBookingStatus(booking.booking_date, booking.booking_slot, booking.is_cancelled)}
                          </span>
                        </td>
                        <td>
                          <button className="view-details-button" onClick={() => handleViewDetails(booking)}>
                            <i className="fas fa-eye"></i> View Details
                          </button>
                        </td>
                        <td className="action-cell"> {/* Added a class for styling */}
                          <div className="action-menu-wrapper" ref={activeMenuId === booking.id ? menuRef : null}>
                            <i className="fas fa-ellipsis-h" onClick={() => toggleActionMenu(booking.id)}></i>
                            {activeMenuId === booking.id && (
                              <motion.div
                                className="action-dropdown"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {getBookingStatus(booking.booking_date, booking.booking_slot, booking.is_cancelled) === 'Upcoming' && (
                                  <>
                                    <button onClick={() => handleCancelBooking(booking)}>
                                      <i className="fas fa-arrow-left"></i> Cancel Booking
                                    </button>
                                    <button onClick={() => handleEditBooking(booking)}>
                                      <i className="fas fa-edit"></i> Edit
                                    </button>
                                  </>
                                )}
                                <button onClick={() => handleDeleteBooking(booking.id)}>
                                  <i className="fas fa-trash-alt"></i> Delete
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No bookings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="show-entries">
                Show
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                entries
              </div>
              <div className="pagination">
                <button onClick={() => paginate(1)} disabled={currentPage === 1}>&lt;&lt;</button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {isCancelConfirmOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Cancellation</h3>
            <p>Are you sure you want to cancel the booking for <strong>{selectedBooking.turf_name}</strong> on <strong>{selectedBooking.booking_date}</strong> at <strong>{selectedBooking.booking_slot}</strong>?</p>
            <div className="modal-actions">
              <button className="button-secondary" onClick={() => setIsCancelConfirmOpen(false)}>No, Keep Booking</button>
              <button className="button-primary" onClick={confirmCancelBooking}>Yes, Cancel It</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal (Placeholder - you'll fill this in) */}
      {isEditModalOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Booking for {selectedBooking.turf_name}</h3>
            {/* Your edit form would go here. For now, just a message. */}
            <p>This is where you'd put a form to edit booking details.</p>
            <p>Booking ID: {selectedBooking.id}</p>
            <button onClick={() => setIsEditModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* NEW: Booking Details Modal */}
      {isDetailsModalOpen && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

    </div>
  );
};

export default MyBookings;