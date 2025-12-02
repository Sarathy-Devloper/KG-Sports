import React from 'react';
import { Link } from 'react-router-dom';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import logo from '../assets/logo.png';

import { motion } from 'framer-motion';
import HeroBanner from '../assets/contact.jpg';

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0639736226593!2d80.2117036751352!3d13.082680790800634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d211b0e5b7%3A0x6f5d8a5f4e4c4e0!2sKG%20Sports!5e0!3m2!1sen!2sin!4v1700321234567!5m2!1sen!2sin';

const ContactUsPage = () => {
  const primaryColor = '#800080'; // Purple, based on header/footer
  const lightTextColor = '#FFFFFF';
  const darkTextColor = '#333333';
  const grayTextColor = '#666666';
  const lightGrayBg = '#F8F8F8';

  const commonInputStyle = {
    border: '1px solid #D9D9D9',
    borderRadius: '4px',
    padding: '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    color: darkTextColor,
  };

  const placeholderStyle = `
    ::placeholder {
      color: ${grayTextColor};
      opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: ${grayTextColor};
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: ${grayTextColor};
    }
  `;

    const [text] = useTypewriter({
      words: ['Contact Us'], // The word you want to type
      loop: 0, // Loop once, or set to 0 for infinite loop
      typeSpeed: 100, // Speed of typing
      deleteSpeed: 100, // Speed of deleting
      delaySpeed: 1000, // Delay before deleting
    });

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', margin: 0, padding: 0, backgroundColor: lightGrayBg }}>
      {/* Global placeholder for input styles if needed - best handled in a CSS file */}
      <style>{placeholderStyle}</style>

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
                  <ul className="navbar-nav mx-auto mt-0 gap-3 me-1 ">
                    <li className="nav-item">
                      <Link className="nav-link text-light fw-bold" to={"/dashboard"}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light fw-bold" to={"/aboutUs"}>
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light fw-bolder" to={"/sports"}>
                        Sports
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light fw-bolder" to={"/trainers"}>
                        Trainers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-light fw-bolder"
                        style={{ letterSpacing: "1px" }}
                        to={"/tournaments"}
                      >
                        Tournaments
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light fw-bolder" to={"/news"}>
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
                      {/* <div className="d-flex ms-auto gap-3">
                        <a href="/register" className="btn btn-success px-4 fw-bold">
                          Sign In
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
      
            {/* ======= Hero Banner ======= */}
            <section
              className="text-center text-white position-relative"
              style={{
                backgroundImage: `url(${HeroBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 15px",
              }}
            >
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
      
                  <h1 className="display-1 fw-bold mb-3  text-white" style={{ marginTop: '200px' }}>
                    {text}
                    <span className="text-light">
                      <Cursor cursorStyle='|' /> {/* Optional: add a blinking cursor */}
                    </span>
                  </h1>
      
                  {/* Search Bar */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="row justify-content-center gap-2 align-items-center"
                    style={{ maxWidth: 900, margin: "0 auto" }}
                    onSubmit={(e) => e.preventDefault()}
                    aria-label="Search turfs form"
                  >
                  </motion.form>
                </motion.div>
              </div>
            </section>

      {/* Stay Connected Section */}
      <section style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: lightTextColor }}>
        <h2 style={{ fontSize: '2em', color: darkTextColor, marginBottom: '20px', fontWeight: 'normal' }}>GET IN TOUCH WITH US</h2>
        <p style={{ color: grayTextColor, fontSize: '1.1em', maxWidth: '800px', margin: '0 auto 50px auto', lineHeight: '1.6' }}>
          Get in touch with us to explore our programs, events, and training sessions. Fill out the slot booking form below to reserve your preferred time for consultations, workshops, or sports sessions. Our team will confirm your booking promptly. For general inquiries, you can reach us at:
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px', // Increased gap for better spacing
          flexWrap: 'wrap',
        }}>

          <div style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2em', color: 'green', marginBottom: '10px' }}>ADDRESS</h3>
            <p style={{ color: grayTextColor, fontSize: '14px', lineHeight: '1.6' }}>No. 149/1, Ground Floor, Elango Street,
              Thiruvalleeswarar Nagar,
              Anna Nagar West,
              Chennai – 600040.
              Tamil Nadu, India.</p>
          </div>
          <div style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'green', fontSize: '1.2em', marginBottom: '10px' }}>EMAIL</h3>
            <p style={{ color: grayTextColor, fontSize: '0.9em' }}>hello@hellointech.com</p>
          </div>
          <div style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'green', fontSize: '1.2em', marginBottom: '10px' }}>PHONE NUMBER</h3>
            <p style={{ color: grayTextColor, fontSize: '0.9em' }}>+91 75989 59595</p>
          </div>
        </div>
      </section>

      {/* Drop Us A Line Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Align items to the top
        padding: '10px 5%',
        gap: '5%',
        flexWrap: 'wrap', // Allow wrapping for responsiveness
        backgroundColor: lightGrayBg,
      }}>
        <div style={{ flex: '1 1 40%', maxWidth: '500px', minWidth: '300px' }}> {/* Form container */}
          <h2 style={{ color: darkTextColor, fontSize: '2em', marginBottom: '20px', fontWeight: 'normal' }}>BOOK YOUR SLOT</h2>
          <p style={{ color: grayTextColor, fontSize: '1.1em', marginBottom: '40px', lineHeight: '1.6' }}>
            We’re here to assist you with personalized support and guidance. Book your slot today and take your first step toward growth and success with our foundation’s dedicated team.
          </p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <input type="text" placeholder="First Name" style={commonInputStyle} />
              <input type="text" placeholder="Last Name" style={commonInputStyle} />
            </div>
            <input type="email" placeholder="Email" style={commonInputStyle} />
            <input type="tel" placeholder="Mobile Number" style={commonInputStyle} />
            <textarea placeholder="Message" rows="5" style={{ ...commonInputStyle, resize: 'vertical' }}></textarea>
            <button type="submit" style={{
              color: lightTextColor,
              backgroundColor: 'green',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1em',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}>SUBMIT</button>
          </form>
        </div>
        <div style={{ flex: '1 1 45%', maxWidth: '600px', minWidth: '300px' }}> {/* Map container */}
          <div className="ratio ratio-16x9">
            <iframe src={mapUrl} title="map" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#004204ff", color: "white" }}>
        {/* Newsletter Section */}
        <div
          style={{
            backgroundColor: "#017628", // Darker blue for newsletter section
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "left", maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "600", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Stay Connected With Our Newsletter
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
              Subscribe to our newsletter to get more news
            </p>
          </div>
          <form
            style={{
              display: "flex",
              maxWidth: "400px",
              width: "100%",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter email address"
              style={{
                flex: 1,
                padding: "10px 6px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "4px 0 0 4px",
                outline: "none",
                backgroundColor: "#fff",
                color: "#333",
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#18cc00ff", // Blue subscribe button
                color: "white",
                border: "none",
                borderRadius: "0 4px 4px 0",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#165e28ff")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#18cc00ff")}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "15px auto",
            padding: "0 1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
            <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#ccc" }}>
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
          <p style={{ fontSize: "0.9rem", color: "#ccc", margin: 0 }}>
            Copyright © 2025 All Rights reserved by <span className="fw-bold" style={{ cursor: 'pointer' }}>KG Sports.com</span>  Designed & Developed by <span style={{ cursor: 'pointer' }} href="https://hellointech.com/" className="fw-bolder"><a style={{ color: 'white' }} target="_blank" href="https://hellointech.com/">Hellointech.com</a> </span>
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
};

export default ContactUsPage;