import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

export const Hero = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>

                <h2 className="font-tech text-brand-primary text-sm font-bold tracking-[0.3em] mb-6 uppercase">
                    Forensic Artificial Intelligence
                </h2>
                <h1 className="font-tech text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                    DETECT THE <br />
                    <span className="text-gradient">UNSEEN TRUTH</span>
                </h1>
                <p className="max-w-2xl text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
                    The world's most advanced multimodal deepfake detection dashboard.
                    Instantly analyze Images, Videos, and Audio with neural forensic precision.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                        onClick={() => onStart('image-detection')}
                        className="px-10 py-4 bg-brand-primary text-black font-tech font-bold rounded-full shadow-[0_0_30px_rgba(0,242,96,0.3)] hover:shadow-[0_0_50px_rgba(0,242,96,0.5)] transform hover:scale-105 transition-all flex items-center gap-3 justify-center"
                    >
                        START DETECTION
                        <Icon name="arrow-right" className="w-5 h-5" />
                    </button>
                    <button onClick={() => onStart('about')} className="px-10 py-4 glass text-white font-tech font-bold rounded-full hover:bg-white/10 transform hover:scale-105 transition-all">
                        OUR TECHNOLOGY
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 text-gray-500"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-tech text-white text-3xl">99.8%</span>
                    <span className="text-xs uppercase tracking-widest">Accuracy Rate</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="font-tech text-white text-3xl">30ms</span>
                    <span className="text-xs uppercase tracking-widest">Inference Time</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="font-tech text-white text-3xl">Multi</span>
                    <span className="text-xs uppercase tracking-widest">Model Analysis</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
