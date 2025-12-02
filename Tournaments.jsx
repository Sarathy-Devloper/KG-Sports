import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

import HeroBanner from "../assets/tournaments-banner.jpg";
import logo from "../assets/logo.png";
import ProfileButton from "../components/ProfileButton";

const tournamentsData = [
  {
    id: 1,
    title: "Chennai Super League 2025",
    location: "Chennai, Tamil Nadu",
    date: "October 12, 2025",
    description: "A thrilling 5-a-side football tournament featuring city’s best teams.",
    image: "https://i-league.org/wp-content/uploads/2020/03/IMG_3025.jpg",
  },
  {
    id: 2,
    title: "Coimbatore Cricket Cup",
    location: "Coimbatore, Tamil Nadu",
    date: "October 20, 2025",
    description: "T20 format with local clubs competing for the championship.",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/402800/402881.jpg",
  },
  {
    id: 3,
    title: "Madurai Badminton Open",
    location: "Madurai, Tamil Nadu",
    date: "November 2, 2025",
    description: "Singles and doubles categories with exciting cash prizes.",
    image: "https://m.media-amazon.com/images/I/61J0nQGLXPL._UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "Trichy Volleyball Championship",
    location: "Tiruchirappalli, Tamil Nadu",
    date: "November 10, 2025",
    description: "Inter-college volleyball tournament under floodlights.",
    image: "https://media.istockphoto.com/id/1369998216/photo/volleyball-player-players-in-action.jpg?s=612x612&w=0&k=20&c=I0Fl0zgAFRIOq-kobRrkmdb7SmIOSA2SidCiSzoiUAc=",
  },
];

const Tournaments = () => {
  const [text] = useTypewriter({
    words: ['Tournaments'], // The word you want to type
    loop: 0, // Loop once, or set to 0 for infinite loop
    typeSpeed: 100, // Speed of typing
    deleteSpeed: 100, // Speed of deleting
    delaySpeed: 1000, // Delay before deleting
  });
  return (
    <div className="bg-light min-vh-100 d-grid gap-4">

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

            <h1 className="display-1 fw-bold mb-3 tournaments_h1  text-white" style={{ marginTop: '200px' }}>
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

      <hr />

      {/* TOURNAMENT CARDS SECTION */}
      <section className="container">
        <h2 className="text-center mb-4 fw-bold text-success">
          Upcoming Tournaments in Tamil Nadu
        </h2>
        <div className="row g-4">
          {tournamentsData.map((tournament) => (
            <div className="col-md-6 col-lg-4" key={tournament.id}>
              <motion.div
                className="card shadow border-0 h-100"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={tournament.image}
                  className="card-img-top"
                  alt={tournament.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{tournament.title}</h5>
                  <p className="card-text text-muted mb-1">
                    📍 {tournament.location}
                  </p>
                  <p className="card-text text-muted mb-2">
                    📅 {tournament.date}
                  </p>
                  <p className="card-text">{tournament.description}</p>
                  <a href="#" className="btn btn-success fw-bold">
                    Register Now
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
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

export default Tournaments;