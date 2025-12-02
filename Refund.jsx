import React from 'react';
import { motion } from 'framer-motion';

const Refund = () => {
  // Animation variants for sections to stagger their appearance
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2 // Children elements will animate with a delay
      }
    }
  };

  // Animation variants for individual text elements within sections
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="container my-5">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-4"
      >
        Refund & Cancellation Policy
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="text-muted"
      >
        Effective Date: 01/11/2025
      </motion.p>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants}>At KG Sports, we strive to provide our customers with a seamless and satisfying experience. This Refund & Cancellation Policy outlines the terms and conditions under which bookings, sessions, or memberships can be canceled, modified, or refunded. We believe in maintaining transparency and fairness in every transaction to ensure complete customer trust.</motion.p>
        <motion.p variants={itemVariants}>By making a booking or purchase on our platform, you agree to the terms stated below.</motion.p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>1. Booking Confirmation</motion.h2>
        <motion.p variants={itemVariants}>All bookings or service registrations made through our website, mobile platform, or in person are confirmed only after successful payment. Once a booking is confirmed, you will receive an email or SMS notification containing details of your scheduled session, time slot, or program.</motion.p>
        <motion.p variants={itemVariants}>Please ensure that all details provided during booking are accurate, as changes after confirmation may not always be possible.</motion.p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>2. Cancellation by User</motion.h2>
        <motion.p variants={itemVariants}>Users may cancel or reschedule bookings under the following terms:</motion.p>
        <motion.ul>
          <motion.li variants={itemVariants}>Cancellations made at least 24 hours before the scheduled session are eligible for rescheduling or partial refund, as applicable.</motion.li>
          <motion.li variants={itemVariants}>Cancellations made less than 24 hours before the session are non-refundable.</motion.li>
          <motion.li variants={itemVariants}>Failure to attend a scheduled booking without prior notice will be considered a “no-show”, and no refund or rescheduling will be permitted.</motion.li>
          <motion.li variants={itemVariants}>All cancellation requests must be made through official communication channels or the online booking system.</motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>3. Cancellation by KG Sports</motion.h2>
        <motion.p variants={itemVariants}>In rare cases, KG Sports may cancel or reschedule a session due to unforeseen circumstances, including maintenance, safety issues, or management requirements.</motion.p>
        <motion.p variants={itemVariants}>In such cases, users will be:</motion.p>
        <motion.ul>
          <motion.li variants={itemVariants}>Offered an alternative slot or date of convenience, or</motion.li>
          <motion.li variants={itemVariants}>Provided with a full refund of the amount paid for the canceled session.</motion.li>
        </motion.ul>
        <motion.p variants={itemVariants}>We aim to inform users promptly of any cancellations or changes via email, phone, or SMS.</motion.p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>4. Refund Policy</motion.h2>
        <motion.p variants={itemVariants}>Refunds, where applicable, will be processed in the following manner:</motion.p>
        <motion.ul>
          <motion.li variants={itemVariants}>Eligible refunds will be initiated within 7–10 working days from the date of approval.</motion.li>
          <motion.li variants={itemVariants}>Refunds will be made using the same mode of payment used during the original transaction.</motion.li>
          <motion.li variants={itemVariants}>Any applicable transaction fees, payment gateway charges, or taxes may be deducted from the total refund amount.</motion.li>
          <motion.li variants={itemVariants}>KG Sports reserves the right to deny a refund if the terms of cancellation or usage policy are violated.</motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h4 variants={itemVariants}>5. Memberships, Packages & Subscriptions</motion.h4>
        <motion.p variants={itemVariants}>For ongoing memberships or package bookings, refund eligibility depends on usage status:</motion.p>
        <motion.ul>
          <motion.li variants={itemVariants}>Unused or partially used memberships may be eligible for partial refunds, after deducting administrative fees.</motion.li>
          <motion.li variants={itemVariants}>Expired or fully utilized packages are not refundable.</motion.li>
          <motion.li variants={itemVariants}>All subscription cancellations must be submitted in writing or through the account dashboard before the next billing cycle.</motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h4 variants={itemVariants}>6. Non-Refundable Services</motion.h4>
        <motion.p variants={itemVariants}>Certain services, offers, or promotional bookings may be labeled as non-refundable at the time of purchase. These are clearly mentioned on the booking or payment page and cannot be canceled once confirmed.</motion.p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>7. Force Majeure</motion.h2>
        <motion.p variants={itemVariants}>KG Sports shall not be held responsible for cancellations, delays, or unfulfilled services caused by circumstances beyond our control, including natural disasters, pandemics, government restrictions, or technical failures. In such cases, alternative arrangements or credit vouchers may be offered.</motion.p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <motion.h2 variants={itemVariants}>8. Contact Information</motion.h2>
        <motion.p variants={itemVariants}>For all refund or cancellation requests, please contact us with your booking reference number and payment details:</motion.p>
        <motion.p variants={itemVariants}>📧 Email: <a href="mailto:info@kgsports.in">info@kgsports.in</a></motion.p>
        <motion.p variants={itemVariants}>📞 Phone: 7598959595</motion.p>
        <motion.p variants={itemVariants}>🏢 Address:<br/>
        No.149/1, Ground Floor, Elango Street,<br/>
        Tiruvalleeswarar Nagar,<br/>
        Anna Nagar West,<br/>
        Chennai - 600040, Tamil Nadu, India</motion.p>
        <motion.p variants={itemVariants}>Our customer support team will respond promptly and guide you through the process.</motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className="mt-5 text-center text-muted"
      >
        © KG Sports — All Rights Reserved.<br/>
        Fair Policy. Clear Process. Customer-First Always.
      </motion.p>
    </div>
  );
};

export default Refund;