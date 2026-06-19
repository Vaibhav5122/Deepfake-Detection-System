import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { detectMedia } from '../api/detection';

export const DetectionView = ({ type }) => {
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

        let progressInterval = null;

        try {
            // Simulate progress up to 90%
            progressInterval = setInterval(() => {
                setProgress(p => (p < 90 ? p + Math.random() * 12 : p));
            }, 400);

            // Call the Axios API service
            const data = await detectMedia(config.endpoint, file);

            // Stop progress timer immediately after response
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
            setProgress(100);

            setTimeout(() => {
                setResult(data);
                setAnalyzing(false);
            }, 600);

        } catch (err) {
            console.error("Analysis failed:", err);
            setError('System error: Unable to process media. Check backend connection.');
            setAnalyzing(false);
        } finally {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-12 flex justify-center"
                            >
                                <button
                                    onClick={runAnalysis}
                                    className="px-12 py-5 bg-brand-primary text-black font-tech font-bold rounded-full shadow-[0_0_30px_rgba(0,242,96,0.3)] hover:shadow-[0_0_50px_rgba(0,242,96,0.5)] transform hover:scale-102 transition-all flex items-center gap-3"
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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

                                <button onClick={reset} className="w-full py-4 bg-brand-primary text-black rounded-2xl text-xs font-bold hover:brightness-110 active:scale-98 transition-all shadow-lg">
                                    DETECT NEW
                                </button>
                            </div>

                            <div className="relative group h-full">
                                <div className="absolute -inset-2 bg-brand-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
                                <div className="relative glass rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-black/60 border border-white/10">
                                    {config.endpoint === 'image' && previewUrl && <img src={previewUrl} className="w-full h-full object-cover" alt="preview" />}
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

export default DetectionView;
