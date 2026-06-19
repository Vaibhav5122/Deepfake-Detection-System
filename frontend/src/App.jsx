import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
import {
    Home, Image as ImageIcon, Video, Mic, Cpu, ShieldCheck, Menu, ArrowRight,
    UploadCloud, FileText, X, Zap, CheckCircle, AlertOctagon,
    Activity, Search, Music, Layers, Code, Eye, Component, Palette, Server, HelpCircle
} from 'lucide-react';

const iconMap = {
    'home': Home,
    'image': ImageIcon,
    'video': Video,
    'mic': Mic,
    'cpu': Cpu,
    'shield-check': ShieldCheck,
    'menu': Menu,
    'arrow-right': ArrowRight,
    'upload-cloud': UploadCloud,
    'file-text': FileText,
    'x': X,
    'zap': Zap,
    'check-circle': CheckCircle,
    'alert-octagon': AlertOctagon,
    'activity': Activity,
    'search': Search,
    'music': Music,
    'layers': Layers,
    'code': Code,
    'eye': Eye,
    'component': Component,
    'palette': Palette,
    'server': Server
};

const Icon = ({ name, className = "w-6 h-6", color = "currentColor" }) => {
    const LucideIcon = iconMap[name] || HelpCircle;
    return <LucideIcon className={className} style={{ color }} />;
};

const SectionReveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
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

// --- Navbar Component ---
const Navbar = ({ currentPath, setPath }) => {
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
                <div className="md:hidden">
                    <Icon name="menu" className="w-6 h-6" />
                </div>
            </div>
        </nav>
    );
};

// --- Hero Section ---
const Hero = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
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
                transition={{ delay: 1, duration: 1 }}
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

// --- Detection Template ---
const DetectionView = ({ type }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const config = {
        'image-detection': { label: 'Image', icon: 'image', accept: 'image/*', color: 'emerald', endpoint: 'image', indicator: 'Pixel Artifact' },
        'video-detection': { label: 'Video', icon: 'video', accept: 'video/*', color: 'blue', endpoint: 'video', indicator: 'Temporal Noise' },
        'audio-detection': { label: 'Audio', icon: 'mic', accept: 'audio/*', color: 'purple', endpoint: 'audio', indicator: 'Spectral Phase' }
    }[type];

    useEffect(() => {
        if (!file) {
            setPreviewUrl('');
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    useEffect(() => {
        setFile(null);
        setResult(null);
        setAnalyzing(false);
        setProgress(0);
        setError(null);
    }, [type]);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setResult(null);
            setError(null);
        }
    };

    const runAnalysis = async () => {
        if (!file) return;
        setAnalyzing(true);
        setResult(null);
        setError(null);
        setProgress(10);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const interval = setInterval(() => {
                setProgress(p => (p < 90 ? p + Math.random() * 10 : p));
            }, 500);

            const response = await fetch(`${API_BASE_URL}/api/detect/${config.endpoint}`, {
                method: 'POST',
                body: formData
            });

            clearInterval(interval);
            setProgress(100);

            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();

            setTimeout(() => {
                setResult(data);
                setAnalyzing(false);
            }, 800);

        } catch (err) {
            console.error(err);
            setError('System error: Unable to process media. Check backend connection.');
            setAnalyzing(false);
        }
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setAnalyzing(false);
        setProgress(0);
        setError(null);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30">
                        <Icon name={config.icon} className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div>
                        <h2 className="font-tech text-3xl font-bold uppercase tracking-tight">
                            {config.label} <span className="text-brand-primary">Detection</span>
                        </h2>
                        <p className="text-gray-400 text-sm">Upload {config.label.toLowerCase()} for deepfake neural forensic analysis.</p>
                    </div>
                </div>

                {!result && !analyzing ? (
                    <>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-brand-primary/50', 'bg-brand-primary/5'); }}
                            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-brand-primary/50', 'bg-brand-primary/5'); }}
                            onDrop={(e) => { e.preventDefault(); handleFileChange({ target: { files: e.dataTransfer.files } }); }}
                            className="relative group cursor-pointer border-2 border-dashed border-white/10 rounded-3xl p-16 flex flex-col items-center justify-center bg-white/5 transition-all hover:border-brand-primary/30 hover:bg-brand-primary/5 overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="scan-line"></div>
                            </div>
                            <Icon name="upload-cloud" className="w-16 h-16 text-gray-500 mb-6 group-hover:text-brand-primary transition-colors float-icon" />
                            <h3 className="text-xl font-bold text-gray-300 mb-2">Drag and drop files here</h3>
                            <p className="text-gray-500 text-sm mb-8">Limit 50MB per file • {config.accept}</p>
                            <button className="px-8 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl font-semibold hover:bg-brand-primary/20 transition-all text-brand-primary">
                                Browse Files
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept={config.accept} onChange={handleFileChange} />
                            {file && (
                                <div className="mt-8 p-4 glass rounded-2xl w-full max-w-md flex items-center justify-between border-brand-primary/20 animate-pulse" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center gap-3">
                                        <Icon name="file-text" className="text-brand-primary" />
                                        <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                                    </div>
                                    <button onClick={e => { e.stopPropagation(); setFile(null); }} className="text-gray-500 hover:text-red-500">
                                        <Icon name="x" className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {file && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-12 flex justify-center"
                            >
                                <button
                                    onClick={runAnalysis}
                                    className="px-12 py-5 bg-brand-primary text-black font-tech font-bold rounded-full shadow-[0_0_30px_rgba(0,242,96,0.3)] hover:shadow-[0_0_50px_rgba(0,242,96,0.5)] transform hover:scale-105 transition-all flex items-center gap-3"
                                >
                                    START ANALYSIS
                                    <Icon name="zap" className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </>
                ) : analyzing ? (
                    <div className="glass rounded-3xl p-16 flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-12">
                            <div className="absolute inset-0 border-4 border-brand-primary/10 rounded-full"></div>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="46" fill="none" stroke="#00F260" strokeWidth="4" strokeDasharray={`${progress * 2.89}, 1000`} strokeLinecap="round" className="transition-all duration-300" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-tech font-bold">{Math.round(progress)}%</span>
                                <span className="text-[10px] text-brand-primary tracking-widest uppercase">Analyzing</span>
                            </div>
                        </div>
                        <h3 className="font-tech text-xl text-brand-primary mb-4">PROCESSING NEURAL FORENSICS</h3>
                        <div className="w-full max-w-sm h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                            <div className="absolute inset-y-0 left-0 bg-brand-primary transition-all duration-300 shadow-[0_0_10px_rgba(0,242,96,0.6)]" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                ) : result ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden mb-8"
                    >
                        <div className={`absolute top-0 left-0 w-full h-2 ${result.prediction.toLowerCase() === 'real' ? 'bg-status-real' : 'bg-status-fake'}`}></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <h3 className="text-xs font-tech text-gray-500 tracking-[0.3em] mb-4 uppercase">Forensic Report</h3>

                                <div className="flex items-end gap-3 mb-6">
                                    <h4 className={`text-6xl font-tech font-black ${result.prediction.toLowerCase() === 'real' ? 'text-status-real' : 'text-status-fake'}`}>
                                        {result.prediction.toUpperCase()}
                                    </h4>
                                    <div className={`mb-2 p-2 ${result.prediction.toLowerCase() === 'real' ? 'bg-status-real/20 text-status-real' : 'bg-status-fake/20 text-status-fake'} rounded-lg`}>
                                        <Icon name={result.prediction.toLowerCase() === 'real' ? 'check-circle' : 'alert-octagon'} className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-2xl p-6 border border-white/5 mb-6">
                                    <div className="flex justify-between items-center mb-4 text-sm">
                                        <span className="text-gray-500 font-tech">Confidence Score</span>
                                        <span className="text-white font-tech font-bold">{result.confidence}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${result.prediction.toLowerCase() === 'real' ? 'bg-status-real' : 'bg-status-fake'} transition-all duration-1000`} style={{ width: `${result.confidence}%` }}></div>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1"><Icon name="activity" className="text-brand-primary w-4 h-4" /></div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            <span className="font-bold text-white block mb-1">AI Analysis Summary</span>
                                            {result.prediction.toLowerCase() === 'real'
                                                ? 'Target shows high consistency with organic capture signatures. No generative AI patterns identified.'
                                                : 'Neural scan detected high-probability synthetic synthesis markers.'}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1"><Icon name="search" className="text-brand-primary w-4 h-4" /></div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            <span className="font-bold text-white block mb-1">Reasoning Behind Detection</span>
                                            {result.reason}
                                        </p>
                                    </div>
                                </div>

                                <button onClick={reset} className="w-full py-4 bg-brand-primary text-black rounded-2xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg">
                                    DETECT NEW
                                </button>
                            </div>

                            <div className="relative group h-full">
                                <div className="absolute -inset-2 bg-brand-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
                                <div className="relative glass rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-black/60 border border-white/10">
                                    {config.endpoint === 'image' && previewUrl && <img src={previewUrl} className="w-full h-full object-cover" />}
                                    {config.endpoint === 'video' && previewUrl && <video src={previewUrl} className="w-full h-full object-cover" autoPlay muted loop />}
                                    {config.endpoint === 'audio' && <Icon name="music" className="w-16 h-16 text-brand-primary animate-pulse" />}
                                    <div className="scan-line"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : null}

                {error && (
                    <div className="mt-6 p-4 bg-red-950/50 border border-red-500/30 text-red-400 rounded-2xl text-center text-sm">
                        {error}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// --- About Page (Revamped) ---
const AboutPage = () => {
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

            {/* Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {models.map((model, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
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

            {/* Technology Stack */}
            <SectionReveal delay={0.2}>
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

// --- Background Layer Component ---
const BackgroundLayer = ({ currentPath }) => {
    const [bgSource, setBgSource] = useState({ video: '', image: '' });

    useEffect(() => {
        const backgrounds = {
            'home': { video: '/assets/cloudy.mp4', image: '/assets/hero_bg.png' },
            'image-detection': { video: '/assets/cloudy.mp4', image: '/assets/image_bg.png' },
            'video-detection': { video: '/assets/cloudy.mp4', image: '/assets/video_bg.png' },
            'audio-detection': { video: '/assets/cloudy.mp4', image: '/assets/audio_bg.png' },
            'about': { video: '/assets/cloudy.mp4', image: '/assets/hero_bg.png' }
        };
        setBgSource(backgrounds[currentPath] || backgrounds['home']);
    }, [currentPath]);

    return (
        <div className="fixed inset-0 overflow-hidden -z-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgSource.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <div className="bg-video-container">
                        <video key={bgSource.video} className="bg-video" autoPlay muted loop playsInline poster={bgSource.image}>
                            <source src={bgSource.video} type="video/mp4" />
                        </video>
                    </div>
                    <div className="fixed inset-0 bg-cover bg-center -z-30 opacity-50" style={{ backgroundImage: `url(${bgSource.image})` }}></div>
                    <div className="bg-overlay"></div>
                </motion.div>
            </AnimatePresence>
            <div className="neural-grid"></div>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
    const [path, setPath] = useState('home');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    useEffect(() => {
        if (window.tsParticles) {
            window.tsParticles.load("tsparticles", {
                fpsLimit: 60,
                particles: {
                    number: { value: 60, density: { enable: true, area: 800 } },
                    color: { value: "#00F260" },
                    shape: { type: "circle" },
                    opacity: { value: 0.1, random: true },
                    size: { value: { min: 1, max: 3 } },
                    links: { enable: true, distance: 150, color: "#00F260", opacity: 0.1, width: 1 },
                    move: { enable: true, speed: 1 }
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
                        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Hero onStart={setPath} />
                        </motion.div>
                    )}
                    {path === 'image-detection' && (
                        <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <DetectionView type="image-detection" />
                        </motion.div>
                    )}
                    {path === 'video-detection' && (
                        <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <DetectionView type="video-detection" />
                        </motion.div>
                    )}
                    {path === 'audio-detection' && (
                        <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <DetectionView type="audio-detection" />
                        </motion.div>
                    )}
                    {path === 'about' && (
                        <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
