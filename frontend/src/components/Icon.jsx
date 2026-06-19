import React from 'react';
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

export const Icon = ({ name, className = "w-6 h-6", color = "currentColor" }) => {
    const LucideIcon = iconMap[name] || HelpCircle;
    return <LucideIcon className={className} style={{ color }} />;
};

export default Icon;
