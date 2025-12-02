import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaShower,
  FaParking,
  FaFirstAid,
  FaStore,
} from "react-icons/fa";
import "../App.css"; // You might need to add some custom CSS here
import logo from '../assets/logo.png'; // Ensure you have a logo image in the specified path

const SingleTurfBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking states
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Set initial state to today's date
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookerName, setBookerName] = useState("");
  const [bookerEmail, setBookerEmail] = useState("");
  const [bookerNumber, setBookerNumber] = useState("");
  const [bookedGame, setBookedGame] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookedSlotsForSelectedDate, setBookedSlotsForSelectedDate] = useState([]);


  // New state for the payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("full"); // "full" or "advance"
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newBooking", (data) => {
        console.log("New booking received via WebSocket:", data);
        // Optionally, you can show a toast notification or update the UI
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("slotBookedUpdate", (data) => {
        console.log("🔔 Received booking update:", data);

        // If this turf & date match the user’s current view, update booked slots
        if (data.turf_id === turf?.id && data.date === selectedDate) {
          setBookedSlotsForSelectedDate((prev) => [...prev, data.slot]);
        }
      });
    }

    return () => {
      if (socket) socket.off("slotBookedUpdate");
    };
  }, [socket, turf, selectedDate]);


  // Hardcoded available slots as per the original code
  const availableSlots = [
    "6 AM - 7 AM", "7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM",
    "10 AM - 11 AM", "11 AM - 12 PM", "12 PM - 1 PM", "1 PM - 2 PM",
    "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM",
    "6 PM - 7 PM", "7 PM - 8 PM", "8 PM - 9 PM", "9 PM - 10 PM", "10 PM - 11 PM", "11 PM - 12 AM", "12 AM - 1 AM", "1 AM - 2 AM", "2 AM - 3 AM", "3 AM - 4 AM", "4 AM - 5 AM", "5 AM - 6 AM"
  ];

  // Helper function to get full image URL
  const getImageUrl = (filename) => {
    // Assuming your backend serves static files from /uploads
    // and the filename doesn't already contain '/uploads/'
    if (!filename) return '';
    const baseUrl = "http://localhost:5000";
    // Check if the filename already contains 'uploads/' to avoid double adding
    if (filename.startsWith('uploads\\')) {
      return `${baseUrl}/${filename}`;
    }
    return `${baseUrl}/uploads/${filename}`;
  };

  // Turf fetching logic - Modified to include mock data for new UI sections
  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/turfs/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();

        // Ensure turf.images is always an array
        if (data.images && typeof data.images === 'string') {
          // If images is a comma-separated string, split it into an array
          data.images = data.images.split(',').map(img => img.trim()).filter(Boolean); // filter(Boolean) removes empty strings
        } else if (!Array.isArray(data.images)) {
          // If it's not a string or an array (null, undefined), default to an empty array
          data.images = [];
        }

        // ✨ MOCK DATA: To match the new UI, add this data to your backend response for each turf
        const mockData = {
          amenities: [
            { name: "Washroom", icon: <FaShower /> },
            { name: "Parking", icon: <FaParking /> },
            { name: "First Aid", icon: <FaFirstAid /> },
            { name: "Cafe", icon: <FaStore /> },
          ],
          reviews: [
            { id: 1, name: "Priya", rating: 5, comment: "Amazing ground, well maintained and great staff. Loved playing here!" },
            { id: 2, name: "Arun", rating: 4, comment: "Good facilities, but the lighting could be a bit better for late-night games." }
          ],
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2297001829843!2d80.19051017377856!3d13.084623787241226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264015578b8d3%3A0x71f692e0f66c04bf!2sKalsun%20Groups!5e0!3m2!1sen!2sin!4v1759903895604!5m2!1sen!2sin"
        };

        setTurf({ ...data, ...mockData });
      } catch (err) {
        console.error("Error fetching turf details:", err);
        setError("Failed to load turf details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  // Fetch booked slots for the selected date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (selectedDate && turf) {
        try {
          const res = await fetch(`http://localhost:5000/api/bookings/turf/${turf.id}/date/${selectedDate}`);
          if (!res.ok) throw new Error('Failed to fetch slots');
          const data = await res.json();
          setBookedSlotsForSelectedDate(data);
        } catch (err) {
          console.error("Error fetching booked slots:", err);
        }
      } else {
        setBookedSlotsForSelectedDate([]);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, turf]);

  // ... (inside SingleTurfBooking component)

useEffect(() => {
  const fetchBookedSlots = async () => {
    if (selectedDate && turf) {
      try {
        // Fetch actual booked slots from the 'bookings' table
        const bookingsRes = await fetch(`http://localhost:5000/api/bookings/turf/${turf.id}/date/${selectedDate}`);
        if (!bookingsRes.ok) throw new Error('Failed to fetch booked slots.');
        const bookedData = await bookingsRes.json();
        const bookedSlots = bookedData.map(b => b.booking_slot); // Extract just the slot strings

        // Fetch manual slots for the same turf and date
        const manualSlotsRes = await fetch(`http://localhost:5000/api/manual-slots/turf/${turf.id}?date=${selectedDate}`);
        // Note: You might need to adjust your backend /manual-slots/turf/:turfId route
        // to accept a query parameter for 'date' if you only want specific date's manual slots.
        // For now, I'll assume fetching all and filtering on frontend, or you adjust backend.
        if (!manualSlotsRes.ok) throw new Error('Failed to fetch manual slots.');
        const manualData = await manualSlotsRes.json();

        // Combine and process slots
        const combinedBooked = new Set(bookedSlots);
        manualData.forEach(manualSlot => {
          if (manualSlot.slot_date.split('T')[0] === selectedDate) { // Ensure date matches
            // If a slot is manually marked as 'booked', 'maintenance', or 'closed', it should be unavailable
            if (manualSlot.status === 'booked' || manualSlot.status === 'maintenance' || manualSlot.status === 'closed') {
              combinedBooked.add(manualSlot.slot_time);
            } else if (manualSlot.status === 'available' && combinedBooked.has(manualSlot.slot_time)) {
                // This scenario means a manual 'available' slot *overrides* a real booking.
                // This is less common but possible if your manual system is the absolute source of truth.
                // For typical cases, a real booking would take precedence over a manual 'available' status.
                // I'll assume real bookings take precedence for 'booked' status.
                // If manual 'available' should truly open a previously booked slot, you'd remove it.
                // For now, keep it simple: manual 'available' does NOT un-book a real booking.
            }
          }
        });

        setBookedSlotsForSelectedDate(Array.from(combinedBooked));

      } catch (err) {
        console.error("Error fetching slots:", err);
        // Consider showing an alert to the user
      }
    } else {
      setBookedSlotsForSelectedDate([]);
    }
  };

  fetchBookedSlots();
}, [selectedDate, turf]); // Re-run when selectedDate or turf changes

  // Validate form fields
  const validateForm = () => {
    if (!selectedDate || !selectedSlot || !bookerName || !bookerEmail || !bookerNumber || !bookedGame) {
      setBookingError("Please fill in all your details and select a date and time slot.");
      return false;
    }
    setBookingError(null);
    return true;
  }

  // Handle "Book Now" (Full Payment) click
  const handleBookNow = () => {
    if (!validateForm()) return;
    setPaymentType("full");
    setShowPaymentModal(true);
  };

  // Handle "Pay Advance" click
  const handlePayAdvance = () => {
    if (!validateForm()) return;
    setPaymentType("advance");
    setShowPaymentModal(true);
  };

  // Calculate advance amount (30%)
  const advanceAmount = turf ? (turf.turf_pricing * 0.30).toFixed(2) : 0;
  const currentPaymentAmount = paymentType === "full" ? turf?.turf_pricing : advanceAmount;

  // Step 2: Handle final booking submission after payment confirmation
  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turf_id: turf.id,
          turf_name: turf.turf_name,
          booked_by_name: bookerName,
          booked_by_email: bookerEmail,
          booked_by_number: bookerNumber,
          booking_date: selectedDate,
          booking_slot: selectedSlot,
          booked_game: bookedGame,
        }),
      });

      // ✅ Emit socket event
      socket.emit("slotBooked", {
        turf_id: turf.id,
        date: selectedDate,
        slot: selectedSlot,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed on the server.");
      }

      setBookingSuccess(true);
      setShowPaymentModal(false); // Close modal on success
      // Optionally, refetch booked slots to update UI immediately
      // This is important if a user books a slot and then tries to book another on the same date.
      if (selectedDate && turf) {
        const res = await fetch(`http://localhost:5000/api/bookings/turf/${turf.id}/date/${selectedDate}`);
        const data = await res.json();
        setBookedSlotsForSelectedDate(data);
      }
      setTimeout(() => navigate("/turfs"), 3000);
    } catch (e) {
      console.error("Failed to create booking:", e);
      setBookingError(e.message || "Failed to book turf. Please try again.");
      setShowPaymentModal(false); // Close modal on error too
    }
  };

  // Loading / error UI
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger" className="m-5 text-center">{error}</Alert>;
  }
  if (!turf) {
    return <Alert variant="warning" className="m-5 text-center">Turf not found.</Alert>;
  }

  // Helper to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />
      );
    }
    return stars;
  };

  // Create UPI link for QR Code
  // ⚠️ IMPORTANT: Replace 'your-upi-id@okhdfcbank' with your actual UPI ID.
  // The amount in the UPI link will now be dynamic based on paymentType
  const upiLink = `upi://pay?pa=sarudavid4422-1@okaxis&pn=DreamSports%20Booking&am=${currentPaymentAmount}&cu=INR&tn=${paymentType === "full" ? "Full Payment" : "Advance Payment"} for ${turf.turf_name}`;


  return (
    <div className="bg-light">
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
            <img src={logo} style={
              { height: '100px', marginTop: '-15px' }
            } alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-3 me-1">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/aboutUs">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/turfs">
                  Book a Turf
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/trainers">
                  Trainers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/tournaments">
                  Tournaments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/news">
                  News
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <a href="/register" className="btn btn-success px-4 fw-bold">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </motion.nav>
      <Container className="py-5 mt-5">
        <Row>
          {/* Left Column: Turf Details */}
          <Col lg={8}>

            {/* --- Header --- */}
            <div className="mb-4">
              <h1>
                {turf.turf_name}{" "}
                <FaCheckCircle color="green" title="Verified" />
              </h1>
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" /> {turf.turf_location}
                <span className="mx-3">|</span>
                <div className="d-flex align-items-center">
                  {renderStars(turf.rating)}
                  <span className="ms-2 fw-bold">{turf.rating}</span>
                </div>
              </div>
            </div>

            {/* --- Image Gallery --- */}
            <Row className="g-2 mb-4">
              {turf.images.length > 0 && (
                <Col md={12}>
                  <img
                    src={getImageUrl(turf.images[0])}
                    alt={turf.turf_name}
                    style={{ width: '100px', height: '100px',}}
                  />
                </Col>
              )}
              {turf.images.slice(1, 5).map((img, index) => (
                <Col key={index} md={3} xs={6}>
                  <img
                    src={getImageUrl(img)}
                    className="img-fluid"
                    alt={`${turf.turf_name} ${index}`}
                    style={{ width: '100px', height: '120px', objectFit: 'cover' }}
                  />
                </Col>
              ))}
              {turf.images.length === 0 && (
                <Col md={12}>
                  <Alert variant="info">No images uploaded for this turf yet.</Alert>
                </Col>
              )}
            </Row>

            {/* --- About Section --- */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title as="h3">About</Card.Title>
                <Card.Text>{turf.turf_description}</Card.Text>
              </Card.Body>
            </Card>

            {/* --- Amenities Section --- */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title as="h3">Amenities</Card.Title>
                <Row>
                  {turf.amenities.map(amenity => (
                    <Col md={3} xs={6} key={amenity.name} className="text-center p-3">
                      {React.cloneElement(amenity.icon, { size: "2em", className: "mb-2 text-success" })}
                      <p>{amenity.name}</p>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* --- Reviews Section --- */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title as="h3">Reviews</Card.Title>
                {turf.reviews.map(review => (
                  <div key={review.id} className="mb-3 border-bottom pb-3">
                    <img src={`https://i.pravatar.cc/50?u=${review.id}`} alt="avatar" className="rounded-circle me-3" />
                    <div>
                      <h6>{review.name}</h6>
                      <div>{renderStars(review.rating)}</div>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* --- Location Section --- */}
            <Card>
              <Card.Body>
                <Card.Title as="h3">Location</Card.Title>
                <div className="ratio ratio-16x9">
                  <iframe src={turf.mapUrl} title="map" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                </div>
              </Card.Body>
            </Card>

          </Col>

          {/* Right Column: Booking Form */}
          <Col lg={4}>
            <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
              <Card.Body className="p-4">
                <h3 className="text-center mb-2">Book Your Spot</h3>
                <p className="text-center h4 fw-bold text-success mb-4">₹{turf.turf_pricing} / slot</p>

                {bookingSuccess && (
                  <Alert variant="success">Booking successful! Redirecting...</Alert>
                )}
                {bookingError && (
                  <Alert variant="danger">{bookingError}</Alert>
                )}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Your Name" value={bookerName} onChange={(e) => setBookerName(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Your Email" value={bookerEmail} onChange={(e) => setBookerEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Your Phone Number" value={bookerNumber} onChange={(e) => setBookerNumber(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {/* Use Form.Select instead of a standard select tag */}
                    <Form.Select
                      value={bookedGame}
                      onChange={(e) => setBookedGame(e.target.value)}
                      required
                    >
                      <option value="">Select Game</option>
                      <option value="cricket">Cricket</option>
                      <option value="football">Football</option>
                      <option value="volleyball">Volleyball</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot(""); // Reset slot when date changes
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Choose a Time Slot</Form.Label>
                    <div className="time-slot-grid mb-3">
                      {availableSlots.map(slot => {
                        const isBooked = bookedSlotsForSelectedDate.includes(slot);
                        return (
                          <Button
                            key={slot}
                            // Apply different variant and potentially style for booked slots
                            variant={selectedSlot === slot ? 'success' : (isBooked ? 'secondary' : 'outline-secondary')}
                            onClick={() => {
                              if (!isBooked) {
                                setSelectedSlot(slot);
                              }
                            }}
                            disabled={isBooked || !selectedDate}
                            className="p-2"
                            style={isBooked ? { textDecoration: 'none' } : {}} // Ensure no strikethrough for disabled
                          >
                            {slot}
                          </Button>
                        );
                      })}
                    </div>
                  </Form.Group>

                  <div className="d-grid mt-4 gap-2">
                    <Button variant="success" size="lg" onClick={handleBookNow}>
                      Book Now (Full Payment - ₹{turf.turf_pricing})
                    </Button>
                    <Button variant="outline-success" size="lg" onClick={handlePayAdvance}>
                      Pay Advance (30% - ₹{advanceAmount})
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{paymentType === "full" ? "Complete Your Payment" : "Pay Advance"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>Scan QR Code to Pay ₹{currentPaymentAmount}</h5>
          {paymentType === "advance" && (
            <p className="text-muted">Remaining ₹{(turf.turf_pricing - advanceAmount).toFixed(2)} to be paid at the turf.</p>
          )}
          <p>Use any UPI app like GPay, PhonePe, Paytm</p>
          <div className="d-flex justify-content-center my-3">
            <QRCodeCanvas value={upiLink} size={200} />
          </div>
          <hr />
          <h6>Booking Details</h6>
          <p className="mb-1"><strong>Name:</strong> {bookerName}</p>
          <p className="mb-1"><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedSlot}</p>
          <p className="mb-1"><strong>Payment Type:</strong> {paymentType === "full" ? "Full Payment" : "Advance Payment"}</p>
          <p><strong>Amount:</strong> ₹{currentPaymentAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmBooking}>
            I have Paid, Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default SingleTurfBooking;