import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

export const Navbar = ({ currentPath, setPath }) => {
    const navItems = [
        { label: 'Home', path: 'home', icon: 'home' },
        { label: 'Image', path: 'image-detection', icon: 'image' },
        { label: 'Video', path: 'video-detection', icon: 'video' },
        { label: 'Audio', path: 'audio-detection', icon: 'mic' },
        { label: 'Technology', path: 'about', icon: 'cpu' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPath('home')}>
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,242,96,0.4)]">
                    <Icon name="shield-check" className="w-6 h-6 text-black" />
                </div>
                <span className="font-tech text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    DEEPSIGHT <span className="text-brand-primary">AI</span>
                </span>
            </div>

            <div className="hidden md:flex gap-8">
                {navItems.map(item => (
                    <button
                        key={item.path}
                        onClick={() => setPath(item.path)}
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
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-brand-primary/50 transition-all text-xs font-semibold text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                    SYSTEM LIVE
                </button>
                <div className="md:hidden cursor-pointer" onClick={() => setPath('about')}>
                    <Icon name="menu" className="w-6 h-6" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
