import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import "../pages/Register.css";
import '../App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // only bundle, not both min.js and bundle.min.js
import "bootstrap-icons/font/bootstrap-icons.css";

import logo from '../assets/logo.png';
import HeroBanner from '../assets/Hero-banner.jpeg';
import ProfileButton from '../components/ProfileButton'; // Import the new component

const testimonialsData = [
  {
    name: "Arjun Kumar",
    role: "Cricket Enthusiast",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Booking turfs through KG Sports has made playing cricket so easy and enjoyable. The fields are always top-notch, and the booking process is seamless!",
  },
  {
    name: "Meena Raj",
    role: "Badminton Player",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love how quick and hassle-free booking is. KG Sports helped me find the best badminton arenas near me, and the experience has been fantastic.",
  },
  {
    name: "Vikram Singh",
    role: "Football Coach",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/51.jpg",
    text: "The ratings and reviews helped me pick great turfs for my football team. KG Sports is a must-have app for turf booking enthusiasts!",
  },
];

const Testimonials = () => {
  return (
    <section
      aria-label="Testimonials from turf booked players"
      style={{
        backgroundColor: "#2DC653",
        color: "#10451D",
        padding: "4rem 2rem",
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        minHeight: "fit-content",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          What Our Turf Players Say
        </h2>

        {testimonialsData.map((t, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              backgroundColor: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              marginBottom: 60,
              padding: "1.8rem 2.5rem 2rem 2.5rem",
              borderRadius: 6,
              maxWidth: 800,
              marginLeft: idx % 2 === 1 ? "auto" : 0,
              // stagger left-right positioning
              width: "fit-content",
            }}
          >
            {/* User Info Card */}
            <div
              className="testimonial_1"
              style={{
                position: "absolute",
                top: -40,
                left: idx % 2 === 1 ? "auto" : -150,
                right: idx % 2 === 1 ? -150 : "auto",
                background: "black",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                gap: "1rem",
                minWidth: 250,
                fontSize: "0.85rem",
                fontWeight: "600",
                userSelect: "none",
                zIndex: 5,
              }}
            >
              <img
                src={t.img}
                alt={`${t.name} - turf player`}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontWeight: "700", fontSize: "1rem" }}>{t.name}</div>
                <div style={{ fontWeight: "400", fontSize: "0.8rem", opacity: 0.7, marginBottom: 6 }}>
                  {t.role}
                </div>
                <div style={{ color: "#f2c94c", fontSize: "1.1rem" }}>
                  {"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#f0f0f0",
                  cursor: "default",
                  userSelect: "none",
                }}
              >
              </div>
            </div>

            {/* Testimonial Text */}
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.5,
                marginTop: 40,
                paddingLeft: 12,
                paddingRight: 12,
                position: "relative",
                userSelect: "text",
              }}
            >
              {t.text}
            </p>

            {/* Large Quote Mark */}
            <span
              aria-hidden="true"
              style={{
                fontSize: "4.5rem",
                fontWeight: "900",
                lineHeight: 0,
                position: "absolute",
                bottom: -10,
                left: -10,
                color: "#000",
                opacity: 0.1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              “
            </span>
          </div>
        ))}
      </div>

      {/* Black corner shapes mimic the image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          backgroundColor: "black",
          borderBottomRightRadius: "120px",
          opacity: 0.4,
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 200,
          height: 200,
          backgroundColor: "black",
          borderTopLeftRadius: "150px",
          opacity: 0.3,
          zIndex: 1,
        }}
      />
    </section>
  );
};

const featuredTurfs = [
  {
    name: "Chennai Cricket Ground",
    location: "Chennai",
    sport: "Cricket",
    rating: 5,
    price: 1200,
    img: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1738650204021.webp&w=828&q=75",
  },
  {
    name: "Coimbatore Badminton Arena",
    location: "Coimbatore",
    sport: "Badminton",
    rating: 4,
    price: 1300,
    img: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1741465706525.webp&w=640&q=75",
  },
  {
    name: "Madurai Football Field",
    location: "Madurai",
    sport: "Football",
    rating: 4,
    price: 1400,
    img: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1680696726315.webp&w=1920&q=75",
  },
];

// FAQ Data
const faqs = [
  {
    question: "Why should I book a turf online?",
    answer:
      "Booking a turf online saves time and ensures you get your preferred slot without waiting. You can compare prices, check availability instantly, and avoid last-minute hassles.",
  },
  {
    question: "Is there a preview or free trial available?",
    answer:
      "Most turfs do not offer free trials, but you can visit the turf in person before booking to check the facilities. Some turfs may also allow a short demo play session.",
  },
  {
    question: "Where can I book a turf?",
    answer:
      "You can book a turf directly through our turf booking platform, mobile app, or by contacting the turf management team.",
  },
  {
    question: "What are the recent updates in the turf facilities?",
    answer:
      "Recent updates include better lighting for night matches, new artificial grass installation, upgraded washTurfs, and enhanced seating arrangements for players and spectators.",
  },
  {
    question: "How do I confirm my turf booking?",
    answer:
      "You can confirm your booking by selecting the date and time slot, making the payment online, and receiving an instant confirmation message or email.",
  },
  {
    question: "Can I book a turf for tournaments or commercial events?",
    answer:
      "Yes, turfs can be booked for tournaments, corporate matches, and other commercial events. Pricing may vary based on duration and requirements.",
  },
];


const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        borderRadius: "10px",
        padding: "15px 20px",
        marginBottom: 12,
        cursor: "pointer",
        color: "#f0f0f0",
        userSelect: "none",
      }}
      onClick={onClick}
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{question}</strong>
        <span style={{ fontSize: "1.5rem" }}>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <p style={{ marginTop: 10, fontWeight: 400, lineHeight: 1.5, color: "#ccc" }}>{answer}</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function getTurf() {
    const [Turf, setTurf] = useState([])

  }

  const [text] = useTypewriter({
    words: ['KG Sports'], // The word you want to type
    loop: 0, // Loop once, or set to 0 for infinite loop
    typeSpeed: 100, // Speed of typing
    deleteSpeed: 100, // Speed of deleting
    delaySpeed: 1000, // Delay before deleting
  });

  return (
    <div className="bg-light" style={{ fontFamily: "'Poppins', sans-serif" }}>

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
            <h6 className="text-light" style={{ fontWeight: 700, fontSize: '1.0rem' }}>
              Book your Turf in Tamil Nadu
            </h6>

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

      {/* ======= How It Works ======= */}
      <section className="how-it-works-section py-5">
        <div className="container text-center">
          <h2 className="mb-3 fw-bold">How it works</h2>
          <p className="mb-5 text-muted" style={{ maxWidth: 600, margin: "0 auto" }}>
            Mobile banking differs from mobile payments, which involves the use of a mobile device
          </p>

          <div className="steps-wrapper d-flex justify-content-center align-items-center position-relative">

            {/* Step 1 */}
            <div className="step-item text-center px-4">
              <div className="icon-card shadow-sm mb-3">
                <div className="icon-small text-white rounded-circle p-2 mb-1" style={{ backgroundColor: '#208B3A' }} >
                  <i className="bi bi-person-badge-fill"></i>
                </div>
                <div className="card-mockup red-card-step1"></div>
              </div>
              <h5 className="fw-semibold">Create Account</h5>
              <p className="text-muted">
                Register your information<br />
                ensure your details<br />
                safe and more secure
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-item text-center px-4">
              <div className="icon-card shadow-sm mb-3">
                <div className="icon-small text-white rounded-circle p-2 mb-1" style={{ backgroundColor: '#208B3A' }}>
                  <i className="bi bi-bar-chart-fill"></i>
                </div>
                <div className="card-mockup red-card-step2"></div>
              </div>
              <h5 className="fw-semibold">Register your Turf</h5>
              <p className="text-muted">
                Sending money faster &<br />
                easier with end to end<br />
                encryption.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-item text-center px-4">
              <div className="icon-card shadow-sm mb-3">
                <div className="icon-small text-white rounded-circle p-2 mb-1" style={{ backgroundColor: '#208B3A' }}>
                  <i className="bi bi-credit-card-fill"></i>
                </div>
                <div className="card-mockup red-card-step3"></div>
              </div>
              <h5 className="fw-semibold">Add Players</h5>
              <p className="text-muted">
                Add multiple cards and<br />
                track your daily expense<br />
                with quality interface
              </p>
            </div>

            {/* Connecting dotted curved line */}
            <svg className="connecting-curve" viewBox="0 0 800 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 130 C260 10, 530 10, 780 130" stroke="#999" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* ======= FAQ Section ======= */}
      <section
        style={{ backgroundColor: "#212121", color: "#f0f0f0", padding: "15px 1rem" }}
        aria-label="Frequently Asked Questions"
      >
        <div className="container" style={{ maxWidth: 800 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.875rem",
              backgroundColor: "#333",
              padding: "6px 12px",
              borderRadius: 20,
              marginBottom: 20,
              userSelect: "none",
            }}
          >
            <i className="bi bi-question-circle" style={{ fontSize: "1.25rem" }}></i>
            <span>FAQs</span>
          </div>
          <h2 className="fw-bold">Frequently Asked Questions</h2>
          <p style={{ color: "#25A244", maxWidth: 800 }}>
            Find questions and answers related to the design system, purchase, updates, and support.
          </p>

          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => toggleFAQ(idx)}
            />
          ))}

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <button
              className="btn btn-outline-light fw-bold"
              style={{ borderRadius: 30, padding: "10px 30px" }}
              onClick={() => window.location.href = "/faq"}
            >
              See All FAQs &nbsp; &rarr;
            </button>
          </div>

          <p
            style={{
              marginTop: 40,
              fontSize: "0.875rem",
              color: "#777",
              textAlign: "center",
            }}
          >
            Contact us at {""}
            <a href="mailto:info@kgsports.in" style={{ color: "#4caf50", textDecoration: "none" }}>
              info@kgsports.in
            </a>{" "}
            via email!
          </p>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#004204ff", color: "white", padding: "10px 0" }}>
        {/* Newsletter Section */}
        {/* <div
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
        </div> */}

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
              
              <span style={{ fontWeight: "bold", fontSize: "1.5rem", }}>KG Sports</span>
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
            Copyright © 2025 All rights reserved by <span className="fw-bold text-light" style={{ cursor: 'pointer' }}>KG Sports</span>  Designed & Developed by <span style={{ cursor: 'pointer' }} href="https://hellointech.com/" className="fw-bolder"><a style={{ color: 'white' }} target="_blank" href="https://hellointech.com/">HelloInTech.com</a> </span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#" target="_blank" aria-label="Facebook" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" target="_blank" aria-label="Instagram" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" target="_blank" aria-label="Youtube" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-youtube"></i>
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#" target="_blank" aria-label="Twitter" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" target="_blank" aria-label="Whatsapp" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
      </footer>
      {/* ======= Footer ======= */}
    </div>
  );
};

export default Dashboard;