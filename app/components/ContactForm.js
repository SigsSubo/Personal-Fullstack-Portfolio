    "use client";

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // '', 'success', 'error'

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is invalid. Please enter a valid email address.';
    }
    if (!message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus(''); // Clear any previous global status
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrors({}); // Clear errors on new submission attempt

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/error for testing - replace with actual API call
    const randomSuccess = Math.random() > 0.2; // 80% chance of success

    if (randomSuccess) {
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
          <span className="font-medium">Success!</span> Your message has been sent. Thank you!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-medium">Error!</span> Something went wrong. Please try again later.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); setSubmitStatus(''); }}
          className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="John Doe"
          disabled={isSubmitting}
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); setSubmitStatus(''); }}
          className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="you@example.com"
          disabled={isSubmitting}
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="5"
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: '' })); setSubmitStatus(''); }}
          className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="Your message here..."
          disabled={isSubmitting}
          required
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
      </div>

      <div>
        <motion.button // Changed to motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          whileTap={{ scale: 0.95 }} // Added whileTap animation
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </div>
    </form>
  );
}
