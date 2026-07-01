import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import Icon from './Icon';
import client from '../api/client';

export const SignupView = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await client.post('/api/auth/register', {
                email,
                username,
                password,
            });

            // Store credentials
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Trigger navbar update by dispatching custom storage event
            window.dispatchEvent(new Event('auth-change'));

            // Redirect to home dashboard
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            const msg = err.response?.data?.detail || 'Registration failed. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 md:p-10 rounded-3xl border border-white/10 max-w-md w-full relative overflow-hidden shadow-2xl"
            >
                {/* Glow Effects */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-secondary/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,96,0.3)]">
                        <Icon name="user" className="w-6 h-6 text-black" />
                    </div>
                </div>

                <h2 className="font-tech text-white text-2xl font-bold mb-2 text-center tracking-wide uppercase">
                    Initialize Terminal
                </h2>
                <p className="text-gray-400 text-sm text-center mb-8">
                    Create secure credentials for DeepSight AI access.
                </p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 px-4 py-3 rounded-xl border border-status-fake/20 bg-status-fake/10 flex items-center gap-3 text-status-fake text-xs font-medium"
                    >
                        <Icon name="alert-octagon" className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                            Security Handle (Username)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Icon name="user" className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                required
                                minLength={3}
                                maxLength={50}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="operator_agent"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:border-brand-primary focus:bg-white/10 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                            Security Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Icon name="mail" className="w-4 h-4" />
                            </span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@security.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:border-brand-primary focus:bg-white/10 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                            Credentials Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Icon name="lock" className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:border-brand-primary focus:bg-white/10 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 bg-brand-primary text-black font-tech font-bold rounded-xl shadow-[0_0_20px_rgba(0,242,96,0.2)] hover:shadow-[0_0_30px_rgba(0,242,96,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            loading ? 'opacity-50 cursor-wait' : ''
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                REGISTERING USER...
                            </>
                        ) : (
                            <>
                                CREATE ACCOUNT
                                <Icon name="arrow-right" className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-500 border-t border-white/5 pt-6">
                    Already registered?
                    <Link to="/login" className="text-brand-primary hover:text-white transition-colors ml-1.5 font-bold">
                        Authenticate Here
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupView;
