'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-0 left-0 right-0 px-4 sm:px-5 xl:px-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm bg-white/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold tracking-wide text-[#031b4e]"
            >
              My<span className="">Doctor</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex space-x-4 lg:space-x-8 text-xs sm:text-sm uppercase font-medium tracking-wide">
              <Link href="/" className="text-black hover:text-[#031b4e] transition-colors duration-200 relative group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#031b4e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/About" className="text-black hover:text-[#031b4e] transition-colors duration-200 relative group">
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#031b4e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/Service" className="text-black hover:text-[#031b4e] transition-colors duration-200 relative group">
                Services
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#031b4e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/Contact" className="text-black hover:text-[#031b4e] transition-colors duration-200 relative group">
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#031b4e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/Dashboard" className="text-black hover:text-[#031b4e] transition-colors duration-200 relative group">
                Dashboard
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#031b4e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/Doctors" 
                className="ml-2 lg:ml-4 flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-full bg-[#031b4e] text-white text-xs sm:text-sm font-medium transition-colors duration-200 shadow-md"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Book Appointment</span>
                <span className="sm:hidden">Book</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#031b4e]" /> : <Menu className="w-6 h-6 text-[#031b4e]" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#031b4e] w-full rounded-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-3 sm:space-y-4">
              <Link 
                href="/" 
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base text-white hover:bg-cyan-700 transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/About" 
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base text-white hover:bg-cyan-700 transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                href="/Service" 
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base text-white hover:bg-cyan-700 transition-colors duration-200"
              >
                Services
              </Link>
              <Link 
                href="/Contact" 
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base text-white hover:bg-cyan-700 transition-colors duration-200"
              >
                Contact
              </Link>
              <Link 
                href="/Dashboard" 
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base text-white hover:bg-cyan-700 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/Doctors" 
                onClick={toggleMenu}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#00b1d2] text-white text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 mt-4"
              >
                <Phone className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;