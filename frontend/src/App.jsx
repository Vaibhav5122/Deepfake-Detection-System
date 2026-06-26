import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';

const App = () => {
    const location = useLocation();
    
    // Map URL pathname to path names expected by background and navbar components
    let currentPath = 'home';
    if (location.pathname === '/image-detection') {
        currentPath = 'image-detection';
    } else if (location.pathname === '/video-detection') {
        currentPath = 'video-detection';
    } else if (location.pathname === '/audio-detection') {
        currentPath = 'audio-detection';
    } else if (location.pathname === '/about') {
        currentPath = 'about';
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

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
            <BackgroundLayer currentPath={currentPath} />
            <Navbar currentPath={currentPath} />
            <main>
                <Outlet />
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
