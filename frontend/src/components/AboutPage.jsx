import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const SectionReveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

const TechIcon = ({ name, label }) => (
    <div className="tech-icon-container group">
        <Icon name={name} className="w-8 h-8 text-gray-400 group-hover:text-brand-primary" />
        <div className="tech-tooltip">{label}</div>
    </div>
);

export const AboutPage = () => {
    const techStack = [
        { id: 1, name: 'TensorFlow', icon: 'zap', tooltip: 'Deep Learning Engine' },
        { id: 2, name: 'Keras', icon: 'layers', tooltip: 'Neural Network API' },
        { id: 3, name: 'Python', icon: 'code', tooltip: 'Backend Logic' },
        { id: 4, name: 'OpenCV', icon: 'eye', tooltip: 'Computer Vision' },
        { id: 5, name: 'Librosa', icon: 'activity', tooltip: 'Audio Processing' },
        { id: 6, name: 'React', icon: 'component', tooltip: 'UI Framework' },
        { id: 7, name: 'Tailwind', icon: 'palette', tooltip: 'Modern Styling' },
        { id: 8, name: 'FastAPI', icon: 'server', tooltip: 'High-Perf API' }
    ];

    const models = [
        {
            title: "Image Deepfake Detection",
            icon: "image",
            description: "Scans high-resolution static captures for pixel-level GAN and diffusion artifacts.",
            algo: "CNN (EfficientNet-B0 Hybrid)",
            dataset: "Deepfake-TIMIT / FaceForensics++",
            arch: "Maso-Inception Pipeline"
        },
        {
            title: "Video Detection Core",
            icon: "video",
            description: "Temporal analysis engine detecting inconsistencies between video frames and facial morphs.",
            algo: "CNN + RNN (LSTM)",
            dataset: "Celeb-DF / DFDC Dataset",
            arch: "Temporal Feature Extraction"
        },
        {
            title: "Audio Forensic Scanner",
            icon: "mic",
            description: "Spectrogram analysis used to detect voice clones and AI-synthesized robotic phonemes.",
            algo: "Dense NN + MFCC Analysis",
            dataset: "ASVspoof Challenge Data",
            arch: "Frequency Spectral Mapping"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <SectionReveal>
                <h2 className="font-tech text-4xl lg:text-6xl font-black mb-6 tracking-tight">OUR <span className="text-brand-primary text-gradient">AI REPOSITORY</span></h2>
                <p className="text-gray-400 max-w-2xl mb-20 text-lg">Exploring the underlying neural architectures and forensic technologies driving our multimodal detection engine.</p>
            </SectionReveal>

            {/* Model Grid with GPU-Optimized Fades */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {models.map((model, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="tech-card glow-border p-10 rounded-[32px] group"
                    >
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-primary/20 float-icon">
                            <Icon name={model.icon} className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-2xl font-tech font-bold mb-4 group-hover:text-brand-primary transition-colors">{model.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10">{model.description}</p>

                        <div className="space-y-4 pt-8 border-t border-white/5">
                            <div>
                                <span className="text-[10px] text-gray-600 uppercase block mb-1">Algorithm</span>
                                <span className="text-xs text-white font-mono">{model.algo}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-600 uppercase block mb-1">Architecture</span>
                                <span className="text-xs text-brand-primary font-mono">{model.arch}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Technology Stack Section */}
            <SectionReveal delay={0.1}>
                <div className="glass p-12 lg:p-20 rounded-[48px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-20 pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-4xl font-tech font-black mb-6">THE TECH <br/> <span className="text-brand-primary">DASHBOARD</span></h3>
                            <p className="text-gray-400 leading-relaxed mb-10">We utilize the absolute pinnacle of machine learning frameworks and signal processing libraries to ensure 99.8% detection reliability across all media types.</p>

                            <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
                                {techStack.map(tech => <TechIcon key={tech.id} name={tech.icon} label={tech.name} />)}
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-10 bg-brand-primary/10 blur-[80px] rounded-full animate-pulse"></div>
                            <div className="relative bg-black/40 rounded-3xl border border-white/10 p-10 flex flex-col items-center justify-center aspect-square">
                                <div className="w-32 h-32 bg-brand-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,242,96,0.2)]">
                                    <Icon name="cpu" className="w-16 h-16 text-brand-primary animate-pulse" />
                                </div>
                                <span className="text-xs font-tech font-bold text-gray-500 uppercase tracking-[0.5em] mb-2">Neural Engine</span>
                                <span className="text-sm font-tech font-black text-brand-primary mb-8 tracking-widest">ACTIVE_STATE</span>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,242,96,0.6)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
};

export default AboutPage;
