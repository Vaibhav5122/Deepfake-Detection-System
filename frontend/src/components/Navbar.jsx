import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

export const Navbar = ({ currentPath }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Home', path: 'home', icon: 'home' },
        { label: 'Image', path: 'image-detection', icon: 'image' },
        { label: 'Video', path: 'video-detection', icon: 'video' },
        { label: 'Audio', path: 'audio-detection', icon: 'mic' },
        { label: 'Technology', path: 'about', icon: 'cpu' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
            {/* Logo Link */}
            <Link to="/" className="flex items-center gap-3 cursor-pointer" onClick={() => setIsOpen(false)}>
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,242,96,0.4)]">
                    <Icon name="shield-check" className="w-6 h-6 text-black" />
                </div>
                <span className="font-tech text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    DEEPSIGHT <span className="text-brand-primary">AI</span>
                </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-8">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path === 'home' ? '/' : `/${item.path}`}
                        className="relative group py-2"
                    >
                        <span className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPath === item.path ? 'text-brand-primary' : 'text-gray-400 group-hover:text-white'}`}>
                            <Icon name={item.icon} className="w-4 h-4" />
                            {item.label}
                        </span>
                        {currentPath === item.path && (
                            <motion.div
                                layoutId="nav-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary shadow-[0_0_10px_rgba(0,242,96,0.6)]"
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Actions & Responsive Menu Toggle */}
            <div className="flex items-center gap-4">
                <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-brand-primary/50 transition-all text-xs font-semibold text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                    SYSTEM LIVE
                </button>
                
                {/* Mobile Hamburger Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden cursor-pointer p-2 rounded-lg border border-white/10 hover:border-brand-primary/30 text-gray-400 hover:text-white transition-colors"
                >
                    <Icon name={isOpen ? "x" : "menu"} className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Dropdown Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 glass border-b border-white/10 px-6 py-4 flex flex-col gap-3 md:hidden z-40"
                    >
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path === 'home' ? '/' : `/${item.path}`}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
                                    currentPath === item.path
                                        ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <Icon name={item.icon} className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
