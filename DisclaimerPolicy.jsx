import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <motion.h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }} variants={itemVariants}>
                Disclaimer Policy
            </motion.h1>
            <motion.p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }} variants={itemVariants}>
                Effective Date: 01/11/2025
            </motion.p>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                Welcome to KG Sports. The information available on this website is provided in good faith and for general informational purposes only. While every effort is made to ensure accuracy, reliability, and timeliness, KG Sports makes no representations or warranties of any kind—express or implied—about the completeness, accuracy, reliability, suitability, or availability of any information, services, or related graphics contained on this website.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                1. General Information
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                All content on this website is intended for informational and promotional use. Any action you take based on the information you find on this site is strictly at your own risk. KG Sports will not be liable for any losses, damages, or consequences arising directly or indirectly from the use of this website or the reliance on its content.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                2. External Links
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                Our website may contain links to external websites for additional reference or resources. While we strive to link only to reputable and relevant sources, KG Sports has no control over the content, accuracy, or availability of these third-party sites. The inclusion of any link does not necessarily imply a recommendation or endorsement of the views expressed within them. Users are advised to review the respective terms and privacy policies of external websites before engaging with them.
            </motion.p>

            <motion.h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                3. Services and Programs
            </motion.h4>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                The details of services, activities, and sessions displayed on the KG Sports website are for general information only. Service availability, timing, and content may vary based on schedule, demand, and operational requirements. KG Sports reserves the right to modify, update, or discontinue any service or program without prior notice. The website does not constitute a legal, medical, or professional advisory platform of any kind.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                4. User Responsibility
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                By accessing and using our website, users acknowledge that they are responsible for ensuring that any services, information, or activities accessed through this platform meet their specific needs. KG Sports is not responsible for any misuse, misunderstanding, or misinterpretation of information provided herein.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                5. Limitation of Liability
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                In no event shall KG Sports, its team members, associates, or affiliates be held liable for any loss or damage, including but not limited to indirect or consequential loss or damage, arising from the use of this website. This includes but is not limited to interruptions, inaccuracies, or delays beyond our control.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                6. Consent
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                By using this website, you hereby consent to this Disclaimer Policy and agree to its terms in full.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                7. Updates
            </motion.h2>
            <motion.p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                KG Sports reserves the right to amend or update this Disclaimer Policy at any time. Any such modifications will be reflected with an updated “Last Revised” date. Users are encouraged to review this page periodically to stay informed about any changes.
            </motion.p>

            <motion.h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }} variants={itemVariants}>
                8. Contact Information
            </motion.h2>
            <motion.p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }} variants={itemVariants}>
                If you have any questions, concerns, or feedback regarding this Disclaimer Policy, please reach out to us at:
            </motion.p>
            <motion.ul style={{ listStyleType: 'none', paddingLeft: '0' }} variants={itemVariants}>
                <motion.li style={{ marginBottom: '0.5rem' }}>
                    📧 Email: <a href="mailto:info@kgsports.in" style={{ color: '#007bff', textDecoration: 'none' }}>info@kgsports.in</a>
                </motion.li>
                <motion.li style={{ marginBottom: '0.5rem' }}>
                    📞 Phone: <a href="tel:7598959595" style={{ color: '#007bff', textDecoration: 'none' }}>7598959595</a>
                </motion.li>
                <motion.li>
                    🏢 Address:<br />
                    No.149/1, Ground Floor, Elango Street,<br />
                    Tiruvalleeswarar Nagar,<br />
                    Anna Nagar West,<br />
                    Chennai - 600040, Tamil Nadu, India
                </motion.li>
            </motion.ul>

            <motion.p style={{ marginTop: '2rem', lineHeight: '1.6', textAlign: 'center', color: '#666' }} variants={itemVariants}>
                Our team is happy to assist you with your inquiries and ensure that your experience with KG Sports remains transparent, safe, and satisfying.
            </motion.p>
        </motion.div>
    );
}

export default Disclaimer;