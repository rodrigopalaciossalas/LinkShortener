import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            // 1. Register User
            await api.post('/auth/register', {
                email: email,
                password: password
            });

            // 2. Auto Login after Registration
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const loginResponse = await api.post('/auth/token', formData, {
                 headers: { 'Content-Type': 'multipart/form-data' }
            });

            localStorage.setItem('token', loginResponse.data.access_token);
            navigate('/dashboard');

        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.detail || 'Failed to register. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
            {/* Left Side - Form Area */}
            <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 border-r border-gray-800 z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/30">
                            L
                        </div>
                        <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">LinkShortener</span>
                    </div>
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Start managing your links today.
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && (
                        <div className="p-4 mb-6 text-sm text-red-200 rounded-lg bg-red-900/40 border border-red-800/50 flex items-center" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email address"
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            id="confirmString"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="primary">
                            Create account
                        </Button>
                        
                         <div className="relative flex items-center justify-center text-sm">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-700"></span>
                            </div>
                            <span className="relative z-10 px-2 bg-gray-900 text-gray-400">Or continue with</span>
                        </div>

                        <Button type="button" variant="outline" className="flex items-center justify-center gap-2" onClick={() => alert('Google Register implementation coming soon!')}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                           Sign up with Google
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-violet-400 hover:text-violet-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Hero / Visuals (Hidden on Mobile) */}
            <div className="hidden md:flex w-1/2 relative overflow-hidden bg-slate-900 justify-center items-center">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-blue-600/30 blur-3xl"></div>
                
                <div className="relative z-10 text-center px-12 max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-6">Join thousands of creators</h2>
                    <p className="text-lg text-gray-300">
                        Create account to access advanced analytics, custom links, and team collaboration features.
                    </p>
                    
                     {/* Visual Card Mockup for Register - Maybe a Team/User card */}
                    <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                         <div className="flex items-center space-x-4">
                             <div className="flex -space-x-4">
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gray-600"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gray-500"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gray-400"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gray-800 flex items-center justify-center text-xs text-white">+5k</div>
                             </div>
                             <div className="text-left">
                                 <div className="text-white font-bold">Community</div>
                                 <div className="text-violet-400 text-sm">Join the network</div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
