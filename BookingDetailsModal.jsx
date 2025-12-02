import React from 'react';
import './BookingDetailsModal.css'; // We'll create this CSS file

const BookingDetailsModal = ({ booking, onClose, courtDetails }) => {
  if (!booking) return null;

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to extract time
  const formatTime = (slot) => {
    const [startTime, endTime] = slot.split('-');
    return `${startTime} - ${endTime}`;
  };

  const getBookingStatus = (bookingDate, bookingSlot, isCancelled) => {
    if (isCancelled) return 'Cancelled';

    const [startTimeStr] = bookingSlot.split('-');
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

  const status = getBookingStatus(booking.booking_date, booking.booking.slot, booking.is_cancelled);

  return (
    <div className="modal-overlay-details">
      <div className="booking-details-modal">
        <div className="modal-header-details">
          <h3 className="modal-title-details">Court Booking Details <span className={`status-badge-details ${status.toLowerCase()}`}>{status}</span></h3>
          <button className="close-button-details" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content-details">
          {/* Appointment Information */}
          <div className="section-card">
            <h4>Appointment Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <label>Court Name</label>
                <span>{booking.turf_name}</span>
              </div>
              <div className="info-item">
                <label>Booked On</label>
                <span>{formatDate(booking.booking_date)}</span> {/* Use actual booking creation date if available */}
              </div>
              <div className="info-item">
                <label>Price Per Guest</label>
                <span>${booking.payment_amount / (booking.number_of_guests || 1) || 15}</span> {/* Placeholder or calculated */}
              </div>
              <div className="info-item">
                <label>Maximum Number of Guests</label>
                <span>{booking.number_of_guests || 2}</span> {/* Placeholder */}
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="section-card">
            <h4>Booking Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <label>Booked On</label>
                <span>{formatDate(booking.booking_date)}</span> {/* This refers to the actual day of play */}
              </div>
              <div className="info-item">
                <label>Date & Time</label>
                <span>{formatDate(booking.booking_date)} {formatTime(booking.booking_slot)}</span>
              </div>
              <div className="info-item">
                <label>Total Number of Hours</label>
                <span>1</span> {/* Assuming each slot is 1 hour */}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="section-card">
            <h4>Payment Details</h4>
            <div className="info-grid">
              <div className="info-item">
                <label>Court Booking Amount</label>
                <span>${booking.payment_amount || 150}</span> {/* Use actual amount */}
              </div>
              <div className="info-item">
                <label>Additional Guests</label>
                <span>${booking.additional_guests_amount || 30}</span> {/* Placeholder */}
              </div>
              <div className="info-item">
                <label>Service Charge</label>
                <span>${booking.service_charge || 20}</span> {/* Placeholder */}
              </div>
              <div className="info-item">
                <label>Total Amount Paid</label>
                <span className="fw-bold">${booking.total_paid_amount || 180}</span> {/* Placeholder */}
              </div>
              <div className="info-item">
                <label>Paid On</label>
                <span>{formatDate(booking.paid_on_date || booking.booking_date)}</span> {/* Placeholder */}
              </div>
              <div className="info-item">
                <label>Transaction ID</label>
                <span>{booking.transaction_id || 'N/A'}</span> {/* Placeholder */}
              </div>
              <div className="info-item">
                <label>Payment Type</label>
                <span>{booking.payment_type || 'Wallet'}</span> {/* Placeholder */}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer-details">
          <button className="cancel-button-details" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;