import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ProfileButton from "../components/ProfileButton";

import logo from '../assets/logo.png';
import HeroBanner from '../assets/aboutUs.png';

// Sample Images (replace with actual image paths)
import MissionImage from '../assets/mission.jpg';
import SpaceConceptImage from '../assets/space-concept.jpg';
import ExperienceImage from '../assets/experience.jpg';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const [text] = useTypewriter({
    words: ['About Us'], // The word you want to type
    loop: 0, // Loop once, or set to 0 for infinite loop
    typeSpeed: 100, // Speed of typing
    deleteSpeed: 100, // Speed of deleting
    delaySpeed: 1000, // Delay before deleting
  });

  return (
    <div className="bg-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
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
        className="text-center text-white img-fluid w-100 position-relative"
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
      {/* ======= Hero Banner ======= */}

      <motion.div
        className="container py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="row mb-5">
          <div className="col-lg-10 mx-auto text-center">
            <h2 className="display-4 fw-bold text-dark mb-4">Passion. Purpose. Play.</h2>
            <p className="lead text-secondary">
              Every great game begins with a spark — a love for movement, teamwork, and joy. That spark is what inspired the creation of KG Sports — a space built not just for playing but for belonging. We wanted to create a place where people could step away from screens, rediscover outdoor energy, and experience the thrill of sports again.
            </p>
            <p className="lead text-secondary">
              What started as a simple idea — bringing sports lovers together — has now grown into a vibrant community of athletes, learners, and fitness enthusiasts. At KG Sports, we celebrate every kind of player — the early risers, the weekend warriors, and the dreamers who live for the game.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="row featurette align-items-center mb-5">
          <div className="col-md-7 order-md-1">
            <h3 className="fw-bold text-success mb-3">Our Mission</h3>
            <p className="lead text-secondary">
              Our mission is simple: to keep people active and connected through the power of sport. We believe that every individual, regardless of skill or age, deserves a space to move freely, compete confidently, and grow personally. KG Sports provides that space — an environment designed to encourage participation, passion, and performance.
            </p>
            <p className="lead text-secondary">
              By blending modern turf facilities with community-focused activities, we make fitness a lifestyle and not just a routine.
            </p>
          </div>
          <motion.div
            variants={itemVariants}
            className="col-md-5 order-md-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {<img className="img-fluid rounded shadow-lg" src={MissionImage} alt="Our Mission" />}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="row featurette align-items-center mb-5">
          <div className="col-md-7 order-md-2">
            <h3 className="fw-bold text-success mb-3">Our Space & Concept</h3>
            <p className="lead text-secondary">
              KG Sports follows an advanced turf-based concept — giving players the power to choose, book, and play at their preferred time. But what truly makes us different is how we transform these turfs into interactive zones of energy — where every corner encourages engagement.
            </p>
            <p className="lead text-secondary">
              Our spaces are designed not just for sport but for social connection and learning. From guided sessions to open-play formats, we make sure everyone finds their rhythm, whether they’re kicking a football, practicing yoga, or trying a traditional Indian game for the first time.
            </p>
          </div>
          <motion.div
            variants={itemVariants}
            className="col-md-5 order-md-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img className="img-fluid rounded shadow-lg" src={SpaceConceptImage} alt="Our Space & Concept" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="row featurette align-items-center mb-5">
          <div className="col-md-7 order-md-1">
            <h3 className="fw-bold text-success mb-3">The KG Experience</h3>
            <p className="lead text-secondary">
              KG Sports isn’t just about facilities — it’s about experiences that last. Morning yoga sessions that calm your mind. Zumba classes that make fitness fun. Team matches that bring out your spirit. Every visit is a reminder that movement brings happiness.
            </p>
            <p className="lead text-secondary">
              Our coaches, coordinators, and community members work together to keep the space positive, inclusive, and alive — where every win counts, and every player matters.
            </p>
          </div>
          <motion.div
            variants={itemVariants}
            className="col-md-5 order-md-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img className="img-fluid rounded shadow-lg" src={ExperienceImage} alt="The KG Experience" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="row text-center">
          <div className="col-lg-10 mx-auto">
            <h3 className="fw-bold text-success mb-3">Moving Forward Together</h3>
            <p className="lead text-secondary mb-4">
              We’re not building just a sports center — we’re building a movement. A movement that believes in teamwork, wellness, and active living. When you step into KG Sports, you’re not just entering a turf; you’re entering a place that believes in you.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <img className="img-fluid rounded shadow-lg mb-4" src={TogetherImage} alt="Moving Forward Together" /> */}
            </motion.div>
            <h2 className="fw-bold text-dark">KG Sports – Where Passion Finds Its Playground.</h2>
          </div>
        </motion.div>
      </motion.div>
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
            margin: "10px auto",
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
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#ccc" }}>
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
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/turfs" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Book a Turf</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/sports" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Sports</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/trainers" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Trainers</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/tournaments" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Tournaments</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/contact" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Terms & Conditions</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Privacy Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Refund & Cancellation Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Disclaimer Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Copyright Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Intellectual Property Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Security Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Others</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Yoga</a></li>
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
            Copyright © 2024 All Rights reserved by <span className="fw-bold" style={{ cursor: 'pointer' }}>HelloIntech.com</span>  Designed & Developed by <span style={{ cursor: 'pointer' }} href="https://hellointech.com/" className="fw-bolder">HelloInTech.com </span>
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
export default AboutUs;