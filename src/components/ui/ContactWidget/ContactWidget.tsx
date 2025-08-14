import React from 'react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactWidget = () => {
  const whatsappNumber = '5511953528042';
  const linkedinUrl = 'https://www.linkedin.com/in/felipe-holandadev/';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </motion.a>
      
      <motion.a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="LinkedIn"
      >
        <FaLinkedin size={24} />
      </motion.a>
    </div>
  );
};

export default ContactWidget;
