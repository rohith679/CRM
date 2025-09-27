import React from 'react';
import { motion } from 'framer-motion';

export const LoginHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
      >
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      </motion.div>
      <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
        Welcome to Dental CRM
      </h2>
      <p className="text-blue-100 text-lg">
        Sign in to access your dashboard
      </p>
    </motion.div>
  );
};