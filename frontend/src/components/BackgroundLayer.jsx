import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundLayer = ({ currentPath }) => {
    const [bgImage, setBgImage] = useState('/assets/hero_bg.png');

    useEffect(() => {
        const backgrounds = {
            'home': '/assets/hero_bg.png',
            'image-detection': '/assets/image_bg.png',
            'video-detection': '/assets/video_bg.png',
            'audio-detection': '/assets/audio_bg.png',
            'about': '/assets/hero_bg.png'
        };
        setBgImage(backgrounds[currentPath] || backgrounds['home']);
    }, [currentPath]);

    return (
        <div className="fixed inset-0 overflow-hidden -z-20">
            {/* Persistent background video player to avoid browser re-buffering spikes */}
            <div className="bg-video-container">
                <video className="bg-video" autoPlay muted loop playsInline>
                    <source src="/assets/cloudy.mp4" type="video/mp4" />
                </video>
            </div>
            
            {/* Smooth, lightweight opacity transition for the poster layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 bg-cover bg-center -z-30"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
            </AnimatePresence>
            
            <div className="bg-overlay"></div>
            <div className="neural-grid"></div>
        </div>
    );
};

export default BackgroundLayer;
