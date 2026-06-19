import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DetectionView from './components/DetectionView';
import AboutPage from './components/AboutPage';

const App = () => {
    const [path, setPath] = useState('home');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    useEffect(() => {
        if (window.tsParticles) {
            // Highly optimized particle configuration (30 particles, links disabled to save CPU)
            window.tsParticles.load("tsparticles", {
                fpsLimit: 40,
                particles: {
                    number: { value: 30, density: { enable: true, area: 800 } },
                    color: { value: "#00F260" },
                    shape: { type: "circle" },
                    opacity: { value: 0.1, random: true },
                    size: { value: { min: 1, max: 2.5 } },
                    links: { enable: false }, // Disabled distance linkages to avoid O(N^2) CPU lag
                    move: { enable: true, speed: 0.8 }
                }
            });
        }
    }, []);

    return (
        <div className="relative min-h-screen">
            <BackgroundLayer currentPath={path} />
            <Navbar currentPath={path} setPath={setPath} />
            <main>
                <AnimatePresence mode="wait">
                    {path === 'home' && (
                        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <Hero onStart={setPath} />
                        </motion.div>
                    )}
                    {path === 'image-detection' && (
                        <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <DetectionView type="image-detection" />
                        </motion.div>
                    )}
                    {path === 'video-detection' && (
                        <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <DetectionView type="video-detection" />
                        </motion.div>
                    )}
                    {path === 'audio-detection' && (
                        <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <DetectionView type="audio-detection" />
                        </motion.div>
                    )}
                    {path === 'about' && (
                        <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <AboutPage />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs">
                <p className="mb-2">© 2026 DEEPSIGHT AI FORENSICS. ALL RIGHTS RESERVED.</p>
                <div className="flex justify-center gap-6 items-center">
                    <a href="#" className="hover:text-brand-primary">PRIVACY TERMS</a>
                    <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    <a href="#" className="hover:text-brand-primary">API DOCS</a>
                    <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    <a href="#" className="hover:text-brand-primary">ENTERPRISE</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
