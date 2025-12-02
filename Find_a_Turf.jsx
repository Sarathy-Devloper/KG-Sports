import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import '../App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from 'react-simple-typewriter';


import BannerImage from "../assets/turf-banner.jpg";
import logo from '../assets/logo.png';
import ProfileButton from "../components/ProfileButton";

export default function Turfs() {
  const [fetchedTurfs, setFetchedTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ for search input
  const navigate = useNavigate(); // Initialize useNavigate

    const [text] = useTypewriter({
      words: ['Book a Turf'], // The word you want to type
      loop: 0, // Loop once, or set to 0 for infinite loop
      typeSpeed: 100, // Speed of typing
      deleteSpeed: 100, // Speed of deleting
      delaySpeed: 1000, // Delay before deleting
    });

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/turfs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFetchedTurfs(data);
      } catch (e) {
        console.error("Failed to fetch turfs:", e);
        setError("Failed to load turfs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTurfDetails();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
    }),
  };
  // Handler for booking button click
  const handleBookNowClick = (turfId) => {
    navigate(`/turf/${turfId}/book`); // Navigate to the new booking page
  };

  const handleFindNearby = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", latitude, longitude);

        try {
          const res = await axios.get(
            `http://localhost:5000/api/turfs/nearby?lat=${latitude}&lng=${longitude}`
          );
          setFetchedTurfs(res.data);
        } catch (err) {
          console.error("Error fetching nearby turfs:", err);
          setError("Failed to fetch nearby turfs.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Please allow location access to find nearby turfs.");
        setLoading(false);
      }
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 d-grid">

      <header
        className="position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "100vh",
          backgroundImage: `url(${BannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)"
          }}
        ></div>

        <motion.div
          className="position-relative px-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <h1 className="display-1 fw-bold mb-3 book_turf  text-white" style={{ marginTop: '200px' }}>
              {text}
              <span className="text-light">
                <Cursor cursorStyle='|' /> {/* Optional: add a blinking cursor */}
              </span>
            </h1>

        </motion.div>
      </header>
      <br />

      <motion.div
        className="position-relative d-flex flex-column explore_turfs align-items-center text-center px-3"
        style={{ zIndex: 10, maxWidth: 900, margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
          {["Chennai", "Madurai", "Coimbatore", "Trichy", "Erode", "Salem", "Thanjavur", "Tirupur", "Vellore", "Kanyakumari", "Dindigul", "Tiruvannamalai", "Namakkal",].map((item, idx) => (
            <button
              key={item}
              className={`btn btn-sm rounded-pill border${idx === 0 ? " btn-dark text-white" : " btn-outline-secondary text-secondary"}`}
              style={{ whiteSpace: "nowrap", fontWeight: idx === 0 ? "600" : "400" }}
            >
              {item}
            </button>
          ))}
        </div>

        <h1 className="fw-bold text-success" style={{ fontSize: '32px', maxWidth: '600px' }}>
          Explore Turfs and Games in KG Sports
        </h1>

        <p className="text-success mb-4" style={{ fontSize: '1.25rem' }}>
          The game is different on turf, "but it's the same for everybody"
        </p>

        <form
          onSubmit={handleFindNearby} // ✅ Call location-based fetch here
          className="d-flex align-items-center"
          style={{
            width: '100%',
            maxWidth: 500,
            border: '1px solid #10451D',
            borderRadius: '32px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '0.5rem 1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <input
            type="text"
            placeholder="Search for Location, Turf, and Sports"
            className="form-control border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              outline: 'none',
              boxShadow: 'none',
              fontSize: '1rem',
              background: 'transparent',
              paddingLeft: '1rem'
            }}
          />
          <button type="submit" className="btn btn-warning rounded-circle d-flex justify-content-center align-items-center ms-2" style={{ width: '38px', height: '38px' }}>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18" height="18">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </motion.div>

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
                <Link className="nav-link text-light fw-bold" to={"/dashboard"}  style={{textDecoration:'none'}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bold" to={"/aboutUs"} style={{textDecoration:'none'}}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/sports"}  style={{textDecoration:'none'}} >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/trainers"}  style={{textDecoration:'none'}} >
                  Trainers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light fw-bolder"
                  style={{ letterSpacing: "1px", textDecoration:'none' }}
                  to={"/tournaments"}
                >
                  Tournaments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/news"}  style={{textDecoration:'none'}} >
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
                      className="text-light fw-bolder btn btn-success" // Added dropdown-toggle
                      style={{borderRadius:'25px', padding:'8px', textDecoration:'none'}}
                      to={"/turfs"}
                      role="button"
                      aria-expanded="false"
                    >
                      Book a Turf
                    </Link>}
                  </li>
                </ul>
              </div>
              <ProfileButton />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* NEW SECTION: All Available Turfs */}
      <section className="p-5 bg-white shadow-sm rounded mx-4">
        <h2 className="text-3xl font-semibold mb-5 text-center text-success">All Available Turfs</h2>
        <div className="row justify-content-center">
          {fetchedTurfs.length > 0 ? (
            fetchedTurfs.map((turf, i) => (
              <motion.div
                key={turf.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="col-md-3 col-sm-4 mb-4"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden flex-grow-1 d-flex flex-column border">
                  <img
                    src={turf.images && turf.images.length > 0 ? `http://localhost:5000/${turf.images[0]}` : 'https://via.placeholder.com/300x160?text=No+Image'}
                    alt={turf.turf_name}
                    className="w-100"
                    style={{ height: '180px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                  />
                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="h5 mb-0 fw-bold text-dark">{turf.turf_name}</h3>
                        {turf.rating && <span className="badge bg-success">{turf.rating} ★</span>}
                      </div>
                      <p className="text-muted mb-2">{turf.turf_location}</p>
                      <p className="fw-semibold text-success" style={{ fontSize: '1.1rem' }}>{turf.turf_pricing}</p>
                    </div>
                    <button
                      className="btn btn-success mt-3 py-2 fw-bold"
                      onClick={() => navigate(`/singleTurfBooking/${turf.id}`)} // Use the new handler
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted">No turfs found. Check back later!</p>
          )}
        </div>
      </section>

      <section aria-label="Call to action" style={{
        position: "relative",
        backgroundSize: "cover",
        backgroundImage: `url(${BannerImage})`,
        backgroundPosition: "center",
        padding: "4rem 1rem",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
        textAlign: "center",
        overflow: "hidden",
      }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(15, 41, 19, 0.25)",
            zIndex: 0,
          }}
        />

        <div
          className="reg_button"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 800,
            width: "100%",
          }}
        >
          <h2 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "1.5rem" }}>
            Register your Turf now!
          </h2>

          <div style={{ display: "inline-flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              style={{
                backgroundColor: "#1A7431",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#155D27")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1A7431")}
              onClick={() => window.location.href = "/register"}
              type="button"
            >
              Register
            </button>

          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#004204ff", color: "white" }}>
        {/* Main Footer Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "15px auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            padding: "0 1rem",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          {/* HomePro Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>KG Sports</span>
            </div>
            <p className="footer_p1" style={{ fontSize: "14px", lineHeight: "1.5", color: "#ccc" }}>
              KG Sports is more than a name, It’s a movement that inspires energy, balance, and growth. We believe in creating a lifestyle built around wellness and togetherness. Every day is a new chance to move forward, stay positive, and feel alive. © KG Sports — Energize Your Everyday.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Sports</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/dashboard" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cricket</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Football</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Volleyball</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Badminton</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Pickleball</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Throwball</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Menus</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/aboutUs" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>About Us</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/sports" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Sports</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/trainers" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Trainers</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/tournaments" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Tournaments</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/contact" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Legal Menus</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/terms&conditions" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Terms & Conditions</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/privacy" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Privacy Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/refund" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Refund & Cancellation Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/disclaimer" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Disclaimer Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="copyrights" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Copyright Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/cookie" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Others</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Yoga</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Zumba</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Bharatanatyam</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Karate</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Silambam</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social Icons at the very bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1.5rem 1rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <p className="footer_caption" style={{ fontSize: "0.9rem", color: "#ccc", margin: 0 }}>
            Copyright © 2025 All Rights reserved by <span className="fw-bold text-light" style={{ cursor: 'pointer' }}>KG Sports.com</span>  Designed & Developed by <span style={{ cursor: 'pointer' }} href="https://hellointech.com/" className="fw-bolder"><a style={{ color: 'white' }} target="_blank" href="https://hellointech.com/">Hellointech.com</a> </span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Facebook" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Instagram" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Youtube" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/company/kalsun-groups/posts/?feedView=all" target="_blank" aria-label="LinkedIn" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Twitter" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Whatsapp" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
      </footer>
      {/* ======= Footer ======= */}
    </div>
  );
}