import { motion } from "framer-motion";
import logo from '../assets/logo.png';
import HeroBanner from '../assets/faq.jpg';
import { Link } from "react-router-dom";
import { useTypewriter } from 'react-simple-typewriter';
import { useState } from "react";

const faqs = [
  {
    question: "Why should I book a turf online with KG Sports?",
    answer:
      "Booking a turf online with KG Sports saves time and ensures you get your preferred slot without waiting. You can compare prices, check availability instantly, and avoid last-minute hassles, all through our convenient platform.",
  },
  {
    question: "Is there a preview or free trial available for KG Sports turfs?",
    answer:
      "Most turfs listed on KG Sports do not offer free trials, but you can visit the turf in person before booking to check the facilities. Some turf partners may also allow a short demo play session. Please check individual turf details.",
  },
  {
    question: "Where can I book a turf with KG Sports?",
    answer:
      "You can book a turf directly through the KG Sports turf booking platform on our website, our mobile app, or by contacting the specific turf management team (details available on our platform).",
  },
  {
    question: "What are the recent updates in KG Sports turf facilities?",
    answer:
      "KG Sports continuously strives to partner with turfs that offer the best facilities. Recent updates across our partner network include better lighting for night matches, new artificial grass installation, upgraded washrooms, and enhanced seating arrangements for players and spectators.",
  },
  {
    question: "How do I confirm my turf booking with KG Sports?",
    answer:
      "You can confirm your booking by selecting the date and time slot on our platform, making the payment online, and receiving an instant confirmation message or email from KG Sports.",
  },
  {
    question: "Can I book a turf through KG Sports for tournaments or commercial events?",
    answer:
      "Yes, turfs available on KG Sports can be booked for tournaments, corporate matches, and other commercial events. Pricing may vary based on duration and specific requirements, and special arrangements can often be made through our platform.",
  },
  {
    question: "What payment methods does KG Sports accept for turf bookings?",
    answer:
      "KG Sports accepts various secure online payment methods including credit/debit cards, net banking, and popular digital wallets for your convenience.",
  },
  {
    question: "Can I cancel or reschedule a booking made through KG Sports?",
    answer:
      "Yes, cancellation and rescheduling policies vary by turf partner. Please refer to the specific turf's policy details on our platform before booking. You can manage your bookings through your KG Sports account.",
  },
  {
    question: "Are there any membership benefits when booking with KG Sports?",
    answer:
      "KG Sports often offers exclusive discounts, early access to new turf listings, and special promotions for our loyal users and members. Stay tuned to our announcements and check your profile for available benefits!",
  },
  {
    question: "How can I contact KG Sports customer support?",
    answer:
      "You can contact KG Sports customer support via the 'Contact Us' section on our website, email us at support@kgsports.com, or reach out through our social media channels. We're here to help!",
  },
];

const Faq = () => {
    const [text] = useTypewriter({
      words: ['FAQ'], // The word you want to type
      loop: 1, // Loop once, or set to 0 for infinite loop
      typeSpeed: 100, // Speed of typing
      deleteSpeed: 100, // Speed of deleting
      delaySpeed: 1000, // Delay before deleting
    });

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    // Animation variants for accordion items
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

  return (
    <div>
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
                    </span>
                  </h1>
      
                  {/* Search Bar (kept for structure, no functionality here) */}
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

            {/* ======= FAQ Section ======= */}
            <section id="faq" className="faq section-bg py-5" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="container">
                <motion.div
                  className="section-title text-center mb-5"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="fw-bold text-success">Frequently Asked Questions</h2>
                  <p className="text-muted">Find answers to the most common questions about KG Sports and our services.</p>
                </motion.div>

                <div className="accordion accordion-flush" id="faqAccordion">
                  {faqs.map((faq, index) => (
                    <motion.div
                      className="accordion-item shadow-sm mb-3 rounded"
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ border: '1px solid #e9ecef' }}
                    >
                      <h2 className="accordion-header" id={`flush-heading-${index}`}>
                        <button
                          className={`accordion-button ${activeIndex === index ? '' : 'collapsed'} fw-semibold`}
                          type="button"
                          onClick={() => toggleAccordion(index)}
                          aria-expanded={activeIndex === index ? 'true' : 'false'}
                          aria-controls={`flush-collapse-${index}`}
                          style={{ color: '#212529', backgroundColor: activeIndex === index ? '#e9f2ee' : '#ffffff', borderBottom: activeIndex === index ? '1px solid #dee2e6' : 'none' }}
                        >
                           <i className="bi bi-question-circle me-2 text-success"></i> {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse-${index}`}
                        className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                        aria-labelledby={`flush-heading-${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body text-secondary" style={{ backgroundColor: '#fcfdff' }}>
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
    </div>
  );
}
export default Faq;